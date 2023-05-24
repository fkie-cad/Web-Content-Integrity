import pickle

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

plt.rcParams.update({"figure.max_open_warning": 0})
sns.set_theme(style="darkgrid")

case_to_label = {
    "with_sri_extra_small": "extra small",
    "with_sri_small": "small",
    "with_sri_medium": "medium",
    "with_sri_large": "large",
    "with_sri_extra_large": "extra large",
    "sri_with_sri_extra_small_wci": "extra small",
    "sri_with_sri_small_wci": "small",
    "sri_with_sri_medium_wci": "medium",
    "sri_with_sri_large_wci": "large",
    "sri_with_sri_extra_large_wci": "extra large",
}


def sri_vs_wci(mega_perfs):
    df_sri = pd.DataFrame(columns=["file_type", "case", "duration"])
    for perf in mega_perfs[:5]:
        for testcase in perf:
            for datapoints in testcase["data"]:
                for datapoint in datapoints:
                    df_sri.loc[len(df_sri.index)] = [
                        "HTML" if datapoint["name"].split(".")[-1] == "html" else "JavaScript",
                        testcase["case"],
                        datapoint["duration"],
                    ]
    df_means_sri = df_sri.groupby(["case", "file_type"]).mean().reset_index()
    df_means_sri.case = pd.Categorical(
        df_means_sri.case,
        [
            "with_sri_extra_small",
            "with_sri_small",
            "with_sri_medium",
            "with_sri_large",
            "with_sri_extra_large",
        ],
        ordered=True,
    )
    df_means_sri.sort_values("case", inplace=True)
    df_means_sri = df_means_sri[df_means_sri.file_type == "HTML"]
    df_means_sri = df_means_sri.assign(scenario="SRI")
    df_means_sri_final = df_means_sri[df_means_sri.columns[[0, 2, 3]]]

    df_wci = pd.DataFrame(columns=["file_type", "case", "duration"])
    for perfs in mega_perfs[5:]:
        for perf in perfs:
            for testcase in perf:
                for datapoints in testcase["data"]:
                    df_wci.loc[len(df_wci.index)] = [
                        "HTML" if datapoints["name"].split(".")[-1] == "html" else "JavaScript",
                        testcase["case"],
                        datapoints["duration"],
                    ]
    df_means_wci = df_wci.groupby(["case", "file_type"]).mean().reset_index()
    df_means_wci.case = pd.Categorical(
        df_means_wci.case,
        [
            "sri_with_sri_extra_small_wci",
            "sri_with_sri_small_wci",
            "sri_with_sri_medium_wci",
            "sri_with_sri_large_wci",
            "sri_with_sri_extra_large_wci",
        ],
        ordered=True,
    )
    df_means_wci.sort_values("case", inplace=True)
    df_means_wci = df_means_wci[df_means_wci.file_type == "HTML"]
    df_means_wci = df_means_wci.assign(scenario="WCI")
    df_means_wci_final = df_means_wci[df_means_wci.columns[[0, 2, 3]]]

    df_means_final = pd.concat([df_means_sri_final, df_means_wci_final], axis=0)
    df_means_final["case"] = df_means_final["case"].map(case_to_label)
    print(df_means_final)

    df = df_means_final.round(3)
    g = sns.catplot(
        y="duration",
        x="case",
        data=df,
        kind="bar",
        palette=["#179c7d", "#fe8220"],
        hue="scenario",
        height=5,
        aspect=3,
        legend=False,
        errorbar=None,
    )
    names = ["SRI", "WCI"]
    legend = [
        f"{name}" for name, i in zip(names, enumerate(plt.gca().get_legend_handles_labels()[1]))
    ]
    font_size = 22
    plt.legend(legend, loc="upper left", fontsize=font_size)
    for i in range(len(names)):
        for ax in g.axes.flat:
            labels = [f"{height.get_height():.2f}" for height in ax.containers[i]]
            ax.bar_label(ax.containers[i], labels=labels, fontsize=font_size)
    plt.gcf().set_size_inches(16, 9)
    g.set_xlabels("Sizes", fontsize=font_size)
    g.set_ylabels("Time (ms)", fontsize=font_size)
    xtick_labels = [
        "1 KiB",
        "10 KiB",
        "100 KiB",
        "1000 KiB",
        "10000 KiB",
    ]
    g.set_xticklabels(xtick_labels, fontsize=font_size)
    plt.yticks(range(0, int(df["duration"].max() + 30), 20), fontsize=font_size)
    plt.tight_layout()
    g.fig.set_figwidth(14)

    plt.savefig(
        "sri-vs-wci.pdf",
    )


def load_results_from_file(test_case):
    filename = f"result-files-sri-vs-wci/results_sri_{test_case}.bin"
    with open(filename, "rb") as file:
        return pickle.load(file)


def main():
    test_cases = {
        "with_sri_extra_small": "http://localhost:3000/with-sri_extra_small.html",
        "with_sri_small": "http://localhost:3000/with-sri_small.html",
        "with_sri_medium": "http://localhost:3000/with-sri_medium.html",
        "with_sri_large": "http://localhost:3000/with-sri_large.html",
        "with_sri_extra_large": "http://localhost:3000/with-sri_extra_large.html",
        "with_sri_extra_small_wci": "http://localhost:3000/with-sri_extra_small-wci.html",
        "with_sri_small_wci": "http://localhost:3000/with-sri_small-wci.html",
        "with_sri_medium_wci": "http://localhost:3000/with-sri_medium-wci.html",
        "with_sri_large_wci": "http://localhost:3000/with-sri_large-wci.html",
        "with_sri_extra_large_wci": "http://localhost:3000/with-sri_extra_large-wci.html",
    }

    perfs = []

    for test_case in test_cases.items():
        print(f"Reading test case: {test_case}")
        perfs.append(load_results_from_file(test_case[0]))

    sri_vs_wci(perfs)

    plt.close("all")


if __name__ == "__main__":
    main()
