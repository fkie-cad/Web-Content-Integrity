const listener = async (details) => {
    const currentUrl = new URL(details.url);
    performance.mark("wci-start");
    performance.mark("wci-end");

    let postFix = "";
    if (currentUrl.pathname === "/index.html") {
        postFix = "-index";
    }

    performance.measure(`wci-time-complete${postFix}`, "wci-start", "wci-end");
};

browser.webRequest.onHeadersReceived.addListener(
    listener,
    {
        urls: ["<all_urls>"],
    },
    ["blocking"]
);
