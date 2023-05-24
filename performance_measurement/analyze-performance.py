import pickle
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

plt.rcParams.update({"figure.max_open_warning": 0})
sns.set_theme(style="darkgrid")


def wci_extension_events(mega_perfs):
    relevant_scenarios = [
        "With Addon (with cache)",
        "With Addon (without cache)",
        "With Addon (with cache and retry)",
    ]
    dfs = []
    for perf in mega_perfs[0]:
        for testcase in perf:
            df = []
            if testcase["scenario"] not in relevant_scenarios:
                break
            for i, data in enumerate(testcase["wci"]):
                if i % 50 == 0:
                    continue
                df.append(pd.DataFrame([data]))
            df = pd.concat(df)

            print(df.describe())

            dfs.append(
                df.mean()
                .reset_index()
                .rename(columns={"index": "event", 0: "time"})
                .assign(name=testcase["scenario"])
            )

    df = pd.concat(dfs, axis=0)
    df = df.round(3)
    df = df.drop(df[df.event == "wci-time-validate-signature"].index)
    df = df.drop(df[df.event == "wci-time-from-remote"].index)
    print(df)
    g = sns.catplot(
        y="time",
        x="event",
        data=df,
        kind="bar",
        palette=["#179c7d", "#fe8220", "#005b7f"],
        hue="name",
        height=5,
        aspect=3,
        legend=False,
        errorbar=None,
    )
    plt.title("WCI section duration for 'complete_site'")
    names = ["Extension with Cache", "Extension no Cache", "Extension with Retry"]
    legend = [
        f"(S{i[0]+2}) {name}"
        for name, i in zip(names, enumerate(plt.gca().get_legend_handles_labels()[1]))
    ]
    font_size = 24
    plt.legend(legend, loc="upper left", fontsize=font_size)
    for i in range(len(relevant_scenarios)):
        for ax in g.axes.flat:
            labels = [f"{height.get_height():.2f}" for height in ax.containers[i]]
            ax.bar_label(ax.containers[i], labels=labels, fontsize=font_size)
    plt.gcf().set_size_inches(16, 9)
    g.set_xlabels("Processing step", fontsize=font_size)
    g.set_ylabels("Time (ms)", fontsize=font_size)
    xtick_labels = ["WCI setup", "Fetch response", "Verify content", "Complete WCI\nprocessing"]
    g.set_xticklabels(xtick_labels, fontsize=font_size)
    plt.yticks(range(0, int(df["time"].max() + 4), 1), fontsize=font_size)
    plt.tight_layout()
    g.fig.set_figwidth(14)

    plt.savefig(
        "results/wci-extension-events.pdf",
    )


def mean_loading_time(mega_perfs):
    dfs = pd.DataFrame()
    relevant_filetype = "complete_site"
    excluded_scenario = [
        "With Addon (clear cache every second time)",
        "Without Addon",
        "With Listen NOP Addon",
    ]

    for perfs in mega_perfs:
        for perf in perfs:
            for testcase in perf:
                if (
                    testcase["case"] != relevant_filetype
                    or testcase["scenario"] in excluded_scenario
                ):
                    break
                durations = []
                for i, p in enumerate(testcase["data"]):
                    if i % 50 == 0:
                        continue
                    durations.append(p["duration"])
                dfs[testcase["scenario"]] = durations

    x = dfs.mean().reset_index().rename(columns={"index": "scenario", 0: "duration"})
    duration_delta = x["duration"].diff().to_list()
    print(duration_delta)
    b = x.to_dict("records")

    assert min(duration_delta[1:]) >= 0

    g = sns.catplot(
        data=dfs,
        kind="bar",
        palette=["#a6bbc8", "#179c7d", "#fe8220", "#005b7f"],
        height=5,
        aspect=2.9,
        errorbar=None,
    )
    for ax in g.axes.flat:
        for i, height in enumerate(ax.containers[0]):
            ax.containers[0][i].set_height(round(height.get_height(), 3))
        heights = [height.get_height() for height in ax.containers[0]]
        labels = [f"{heights[0]:.2f}"]
        for height in heights[1:]:
            labels.append(f"{height:.2f}")
        ax.bar_label(ax.containers[0], labels=labels)

    labels = [item.get_text() for item in g.axes[0][0].get_xticklabels()]
    labels_wrapped = ["\n(".join(l.split("(")) if "(" in l else l for l in labels]
    names = ["NOP Extension", "Extension with Cache", "Extension no Cache", "Extension with Retry"]
    labels_wrapped_id = [
        f"(S{i[0]+1}) {name}" for name, i in zip(names, enumerate(labels_wrapped))
    ]

    g.set_xticklabels(labels_wrapped_id)
    plt.gcf().set_size_inches(16, 9)
    g.set_xlabels("Scenario")
    g.set_ylabels("Time (ms)")

    bottom = 0
    plt.yticks(range(bottom, int(b[-1]["duration"]) + 5, 5))
    ax = plt.gca()
    ax.set_ylim(bottom=bottom)

    plt.title(f"Mean loading time for '{relevant_filetype}'")

    plt.savefig(
        "results/mean-loading-time.pdf",
    )


def resources_nop_cache(mega_perfs):
    relevant_scenarios = ["With NOP Addon", "With Addon (with cache)"]
    _, axs = plt.subplots(ncols=3, nrows=2, figsize=(18, 15))
    col_counter = 0
    row_counter = 0
    for perfs in mega_perfs:
        dfs = pd.DataFrame()
        case = ""
        for perf in perfs:
            for testcase in perf:
                if testcase["scenario"] not in relevant_scenarios:
                    break
                case = testcase["case"]
                durations = []
                for i, p in enumerate(testcase["data"]):
                    if i % 50 == 0:
                        continue
                    durations.append(p["duration"])
                dfs[testcase["scenario"]] = durations

        print(case)
        if col_counter == 3:
            col_counter = 0
            row_counter += 1

        print(col_counter, row_counter)
        print(dfs)
        g = sns.boxplot(
            data=dfs,
            palette=["#a6bbc8", "#179c7d"],
            ax=axs[row_counter, col_counter],
            flierprops={"markersize": 3},
        )

        case_to_id = {
            "html_file": "html",
            "html_css_js_file": "html-inline",
            "complete_site": "full-site",
            "small_image_file": "jpeg-240",
            "medium_image_file": "jpeg-522",
            "large_image_file": "jpeg-1017",
        }

        means = dfs.mean().to_list()
        print(case, means)
        axs[row_counter][col_counter].title.set_text(
            f"{case_to_id[case]}",
        )
        new_labels = [
            item.get_text()
            .replace(
                "With NOP Addon",
                "(S1) NOP Extension",
            )
            .replace("With Addon (with cache)", "(S2) Extension with Cache")
            for item in g.get_xticklabels()
        ]
        font_size = 14
        g.set_xticklabels(new_labels, fontsize=font_size, ha="center")

        g.set_ylabel("Time (ms)", fontsize=font_size)
        axs[row_counter][col_counter].set_ylim(bottom=0)
        axs[row_counter][col_counter].set_yticks(range(0, 115 + 5, 5))
        for lable in g.get_yticklabels():
            lable.set_fontsize(font_size)
        col_counter += 1

    plt.suptitle("Loading times per case")
    plt.tight_layout()
    plt.gcf().set_size_inches(15, 18)
    plt.subplots_adjust(hspace=0.15)
    plt.subplots_adjust(wspace=0.18)

    plt.savefig(
        "results/resources-nop-cache.pdf",
    )


def resources_nop_no_cache(mega_perfs):
    relevant_scenarios = ["With NOP Addon", "With Addon (without cache)"]
    _, axs = plt.subplots(ncols=3, nrows=2, figsize=(18, 15))
    col_counter = 0
    row_counter = 0
    for perfs in mega_perfs:
        dfs = pd.DataFrame()
        case = ""
        for perf in perfs:
            for testcase in perf:
                if testcase["scenario"] not in relevant_scenarios:
                    break
                case = testcase["case"]
                durations = []
                for i, p in enumerate(testcase["data"]):
                    if i % 50 == 0:
                        continue
                    durations.append(p["duration"])
                dfs[testcase["scenario"]] = durations

        print(case)
        if col_counter == 3:
            col_counter = 0
            row_counter += 1

        print(col_counter, row_counter)
        g = sns.boxplot(
            data=dfs,
            palette=["#a6bbc8", "#fe8220"],
            ax=axs[row_counter, col_counter],
            flierprops={"markersize": 3},
        )
        case_to_id = {
            "html_file": "html",
            "html_css_js_file": "html-inline",
            "complete_site": "full-site",
            "small_image_file": "jpeg-240",
            "medium_image_file": "jpeg-522",
            "large_image_file": "jpeg-1017",
        }

        means = dfs.mean().to_list()
        print(case, means)
        axs[row_counter][col_counter].title.set_text(f"{case_to_id[case]}")
        new_labels = [
            item.get_text()
            .replace(
                "With NOP Addon",
                "(S1) NOP Extension",
            )
            .replace("With Addon (without cache)", "(S3) Extension no Cache")
            for item in g.get_xticklabels()
        ]
        font_size = 14
        g.set_xticklabels(new_labels, fontsize=font_size, ha="center")

        g.set_ylabel("Time (ms)")
        axs[row_counter][col_counter].set_ylim(bottom=0)
        axs[row_counter][col_counter].set_yticks(range(0, 120 + 5, 5))
        for lable in g.get_yticklabels():
            lable.set_fontsize(font_size)
        col_counter += 1

    plt.suptitle("Loading times per case")
    plt.tight_layout()
    plt.gcf().set_size_inches(15, 18)
    plt.subplots_adjust(hspace=0.15)
    plt.subplots_adjust(wspace=0.18)

    plt.savefig(
        "results/resources-nop-no-cache.pdf",
    )


def load_results_from_file(test_case):
    filename = f"result-files/results_{test_case}.bin"
    with open(filename, "rb") as file:
        return pickle.load(file)


def main():
    test_cases = {
        "html_file": "http://localhost:3000/simple-sample.html",
        "html_css_js_file": "http://localhost:3000/sample.html",
        "complete_site": "http://localhost:3000/",
        "small_image_file": "http://localhost:3000/small.jpg",
        "medium_image_file": "http://localhost:3000/medium.jpg",
        "large_image_file": "http://localhost:3000/large.jpg",
    }

    base_path = Path(Path(__file__).parent / "results")
    base_path.mkdir(exist_ok=True)

    mega_perfs = []
    for test_case in test_cases.items():
        print(f"Reading test case: {test_case}")

        perfs = load_results_from_file(test_case[0])
        mega_perfs.append(perfs)

    resources_nop_cache(mega_perfs)
    resources_nop_no_cache(mega_perfs)
    mean_loading_time(mega_perfs)
    wci_extension_events(mega_perfs)


if __name__ == "__main__":
    main()
