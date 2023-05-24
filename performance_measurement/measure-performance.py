import pickle
import random
import re
from argparse import ArgumentParser
from platform import system
from time import sleep
from urllib.parse import urlparse

from selenium import webdriver
from selenium.webdriver.firefox.service import Service


def setup(with_addon=False, with_nop=False, with_listen_nop=False, with_browser_cache=False):
    option = webdriver.FirefoxOptions()

    # option.add_argument("-headless")  # Uncomment this line to run without GUI

    # firefox binary location
    os = system()
    if os == "Linux":
        option.binary_location = "../firefox-devl/firefox"  # You need to change this path
    else:
        raise SystemExit()
    if with_browser_cache:
        option.set_preference("network.http.use-cache", True)
        option.set_preference("browser.cache.disk.enable", True)
        option.set_preference("browser.cache.memory.enable", True)
        option.set_preference("browser.cache.offline.enable", True)
    else:
        option.set_preference("network.http.use-cache", False)
        option.set_preference("browser.cache.disk.enable", False)
        option.set_preference("browser.cache.memory.enable", False)
        option.set_preference("browser.cache.offline.enable", False)
    option.set_preference("browser.chrome.site_icons", False)
    option.set_preference("privacy.reduceTimerPrecision", False)

    driver_service = Service()
    driver = webdriver.Firefox(service=driver_service, options=option)

    if with_addon:
        driver.__dict__["wci_extension"] = driver.install_addon(
            "../wci_firefox_extensions/firefox-extension/web-ext-artifacts/wci_check-1.0.0.zip",
            temporary=True,
        )
    elif with_nop:
        driver.__dict__["wci_extension"] = driver.install_addon(
            "../wci_firefox_extensions/firefox-extension-nop/web-ext-artifacts/wci_check_nop-1.0.0.zip",
            temporary=True,
        )
    elif with_listen_nop:
        driver.__dict__["wci_extension"] = driver.install_addon(
            "../wci_firefox_extensions/firefox-extension-nop-only-listen/web-ext-artifacts/wci_check_nop_only_listen-1.0.0.zip",
            temporary=True,
        )

    if with_addon or with_nop or with_listen_nop:
        driver.get(f"about:devtools-toolbox?id={driver.wci_extension}&type=extension")
        sleep(1)
        html_text = driver.page_source
        extension_url = re.findall(r">(moz-extension://.*.html)</span", html_text)[0]
        driver.get(extension_url)
        driver.execute_script("window.open();")
        driver.switch_to.window(driver.window_handles[1])

    return driver


def run_test(
    scenario,
    test_case,
    runs,
    with_addon=False,
    with_nop=False,
    with_listen_nop=False,
    with_browser_cache=False,
):
    print(f" => {scenario}")

    performance = []
    absolute_timings = []
    results = []

    wci_data = []
    time_invervals = [
        "wci-duration-start-setup",
        "wci-duration-setup-onstop",
        "wci-duration-onstop-end",
        "wci-time-complete",
    ]

    driver = setup(with_addon, with_nop, with_listen_nop, with_browser_cache)

    case, url = test_case
    restart_after = 50
    restarts = (runs // restart_after) - 1
    restart_counter = 0

    for i in range(runs):
        sleep(1)
        if i % restart_after == 0 and i != 0:
            restart_counter += 1
            print(f"  Restart... {restart_counter}/{restarts}")
            driver.quit()
            driver = setup(with_addon, with_nop, with_listen_nop, with_browser_cache)

        driver.get(url)
        performance.append(
            driver.execute_script(f"return performance.getEntriesByName('{url}')[0];")
        )
        absolute_timings.append(driver.execute_script("return performance.timing;"))

        if len(driver.window_handles) > 1:
            sleep(0.1)
            driver.switch_to.window(driver.window_handles[0])
            wci_absolute_timings = driver.execute_script("return window.wciLog;")
            if wci_absolute_timings:
                absolute_timings[-1] = absolute_timings[-1] | wci_absolute_timings

            wci_timings = {}
            for time_inverval in time_invervals:
                if case == "complete_site" and scenario != "Without Addon":
                    wci_timing = driver.execute_script(
                        f"return performance.getEntriesByName('{time_inverval}-index');"
                    )
                else:
                    wci_timing = driver.execute_script(
                        f"return performance.getEntriesByName('{time_inverval}');"
                    )
                if wci_timing:
                    assert len(wci_timing) == 1
                    wci_timings[time_inverval] = wci_timing[0]["duration"]

            driver.execute_script("performance.clearMarks();")
            driver.execute_script("performance.clearMeasures();")
            wci_data.append(wci_timings)

            if scenario == "With Addon (with cache)":
                pass
            elif scenario == "With Addon (without cache)":
                driver.execute_script("return window.WCI_CACHE.cache.clear();")
            elif scenario == "With Addon (with cache and retry)":
                domain, resource = url.rsplit("/", 1)
                site_hash = driver.execute_script(
                    f"return window.WCI_CACHE.cache.get('{domain}').paths['/{resource}'];"
                )
                site_hash_modified = (
                    site_hash[:41]
                    + random.choice([x for x in "0123456789abcdef" if x != site_hash[41]])
                    + site_hash[42:]
                )
                driver.execute_script(
                    f"window.WCI_CACHE.cache.get('{domain}').paths['/{resource}'] = '{site_hash_modified}';"
                )

            driver.switch_to.window(driver.window_handles[1])

    driver.quit()
    results.append(
        {
            "scenario": scenario,
            "case": case,
            "url": urlparse(url).path,
            "data": performance,
            "wci": wci_data,
            "absolute_timings": absolute_timings,
        }
    )

    return results


def save_results_to_file(perfs, test_case):
    filename = f"results_{test_case}.bin"
    with open(filename, "wb") as file:
        pickle.dump(perfs, file)


def main(args):
    runs = 1021
    with_browser_cache = args.with_browser_cache
    test_cases = {
        "html_file": "http://localhost:3000/simple-sample.html",
        "html_css_js_file": "http://localhost:3000/sample.html",
        "complete_site": "http://localhost:3000/index.html",
        "small_image_file": "http://localhost:3000/small.jpg",
        "medium_image_file": "http://localhost:3000/medium.jpg",
        "large_image_file": "http://localhost:3000/large.jpg",
    }

    for test_case in test_cases.items():
        print(f"Running test case: {test_case}")
        perfs = []

        perfs.append(
            run_test("Without Addon", test_case, runs=runs, with_browser_cache=with_browser_cache)
        )
        perfs.append(
            run_test(
                "With Listen NOP Addon",
                test_case,
                runs=runs,
                with_listen_nop=True,
                with_browser_cache=with_browser_cache,
            )
        )
        perfs.append(
            run_test(
                "With NOP Addon",
                test_case,
                runs=runs,
                with_nop=True,
                with_browser_cache=with_browser_cache,
            )
        )
        perfs.append(
            run_test(
                "With Addon (with cache)",
                test_case,
                runs=runs,
                with_addon=True,
                with_browser_cache=with_browser_cache,
            )
        )
        perfs.append(
            run_test(
                "With Addon (without cache)",
                test_case,
                runs=runs,
                with_addon=True,
                with_browser_cache=with_browser_cache,
            )
        )
        perfs.append(
            run_test(
                "With Addon (with cache and retry)",
                test_case,
                runs=runs,
                with_addon=True,
                with_browser_cache=with_browser_cache,
            )
        )

        save_results_to_file(perfs, test_case[0])


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        "--with-browser-cache", "-b", action="store_true", help="Run tests with browser cache"
    )
    args = parser.parse_args()
    main(args)
