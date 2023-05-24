const listener = async (details) => {
    const currentUrl = new URL(details.url);
    performance.mark("wci-start");
    performance.mark("wci-setup-complete");
    let filter = browser.webRequest.filterResponseData(details.requestId);

    filter.ondata = (event) => {
        filter.write(event.data);
    };

    filter.onstop = async (_event) => {
        performance.mark("wci-enter-onstop");
        filter.disconnect();
        performance.mark("wci-end");

        // collect timings

        let postFix = "";
        if (currentUrl.pathname === "/index.html") {
            postFix = "-index";
        }

        performance.measure(
            `wci-duration-start-setup${postFix}`,
            "wci-start",
            "wci-setup-complete"
        );
        performance.measure(
            `wci-duration-setup-onstop${postFix}`,
            "wci-setup-complete",
            "wci-enter-onstop"
        );
        performance.measure(
            `wci-duration-onstop-end${postFix}`,
            "wci-enter-onstop",
            "wci-end"
        );
        performance.measure(
            `wci-time-complete${postFix}`,
            "wci-start",
            "wci-end"
        );
    };
};

browser.webRequest.onHeadersReceived.addListener(
    listener,
    {
        urls: ["<all_urls>"],
    },
    ["blocking"]
);
