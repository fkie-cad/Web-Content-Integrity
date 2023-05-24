import pickle
from argparse import ArgumentParser
from platform import system
from urllib.parse import urlparse

from selenium import webdriver
from selenium.webdriver.firefox.service import Service


def setup(with_addon=False, with_nop=False, with_listen_nop=False, with_browser_cache=False):
    option = webdriver.FirefoxOptions()

    # option.add_argument("-headless")  # Uncomment this line to run without GUI

    # firefox binary location
    os = system()
    if os == "Linux":
        option.binary_location = "../../firefox-devl/firefox"  # You need to change this path
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
            "../../wci_firefox_extensions/firefox-extension/web-ext-artifacts/wci_check-1.0.0.zip",
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


def run_test(driver, scenario, test_case, runs=1):
    performance = []
    absolute_timings = []
    results = []

    case, url = test_case

    for _ in range(runs):
        driver.get(url)
        js_perf = driver.execute_script(
            f"return performance.getEntriesByName('http://localhost:3000/sample_{case.split('_', 2)[-1]}.js')[0];",
        )
        performance.append(
            (driver.execute_script(f"return performance.getEntriesByName('{url}')[0];"), js_perf)
        )

    driver.quit()
    results.append(
        {
            "scenario": scenario,
            "case": case,
            "url": urlparse(url).path,
            "data": performance,
            "absolute_timings": absolute_timings,
        }
    )

    return results


def save_results_to_file(perfs, test_case):
    filename = f"results_sri_{test_case}.bin"
    with open(filename, "wb") as file:
        pickle.dump(perfs, file)


def main(args):
    runs = 1000
    with_browser_cache = args.with_browser_cache
    test_cases = {
        "with_sri_extra_small": "http://localhost:3000/with-sri_extra_small.html",
        "with_sri_small": "http://localhost:3000/with-sri_small.html",
        "with_sri_medium": "http://localhost:3000/with-sri_medium.html",
        "with_sri_large": "http://localhost:3000/with-sri_large.html",
        "with_sri_extra_large": "http://localhost:3000/with-sri_extra_large.html",
    }

    for test_case in test_cases.items():
        print(f"Running test case: {test_case}")
        perfs = run_test(
            setup(with_browser_cache=with_browser_cache),
            "Without Browser Cache",
            test_case,
            runs=runs,
        )

        save_results_to_file(perfs, test_case[0])


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        "--with-browser-cache", "-b", action="store_true", help="Run tests with browser cache"
    )
    args = parser.parse_args()
    main(args)
