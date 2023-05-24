"use strict";

// DNS DATA //
const DNS_RECORD = "wci1 sha256:5GGIeOq58CTfZ1Mji5DR4HyYr6ln8Vy4oNQ/dnFxOFI=";
// DNS DATA END //

const parseDnsRecord = () => {
    const dnsRecord = DNS_RECORD.split(" ");
    const wciVersion = dnsRecord[0];
    const cipherParts = dnsRecord[1].split(":");
    const cipherType = cipherParts[0];
    if (cipherType !== "sha256") {
        throw new Error(`Unsupported cipher type: ${cipherType}`);
    }
    const wciHash = cipherParts[1];
    const domain = "http://localhost:3000";
    return { wciVersion, wciHash, domain };
};

const parseWCI = (wci) => {
    let wciContent = {};
    const wciGen = wci[Symbol.iterator]();
    for (let line of wciGen) {
        if (line == "#REDIRECTS") {
            wciContent.redirects = new Map();
            for (let redirect of wciGen) {
                if (redirect.startsWith("#")) {
                    line = redirect;
                    break;
                }
                const [from, to] = redirect.split('":"');
                wciContent.redirects[from.replaceAll('"', "")] = to.replaceAll(
                    '"',
                    ""
                );
            }
        }
        if (line == "#WILDCARDS") {
            wciContent.wildcards = new Map();
            for (let wildcard of wciGen) {
                if (wildcard.startsWith("#")) {
                    break;
                }
                const [from, to] = wildcard.split('":"');
                wciContent.wildcards[from.replaceAll('"', "")] = to.replaceAll(
                    '"',
                    ""
                );
            }
        }
        if (line == "#PATHS") {
            wciContent.paths = new Map();
            for (let path of wciGen) {
                const [resource, hash] = path.split(":");
                wciContent.paths[resource.replaceAll('"', "")] = hash;
            }
        }
    }
    return wciContent;
};

class WCICache {
    constructor() {
        this.cache = new Map();
    }

    get(url) {
        return this.cache.get(url);
    }

    set(url, wci) {
        this.cache.set(url, wci);
    }

    remove(url) {
        this.cache.delete(url);
    }

    clear() {
        this.cache.clear();
    }
}

const WCI_CACHE = new WCICache();
window.WCI_CACHE = WCI_CACHE;

const getHash = async (data) => {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const removeMultipleSlashes = (pathname) => pathname.replace(/(\/)\/+/g, "$1");

const digestToBase64 = (digest) =>
    btoa(String.fromCharCode(...new Uint8Array(digest)));

const addIndexHtml = (pathname) =>
    pathname.endsWith("/") ? pathname + "index.html" : pathname;

const modifyPathname = (pathname) => {
    let finalPathName = removeMultipleSlashes(pathname);
    finalPathName = addIndexHtml(finalPathName);

    if (pathname !== finalPathName) {
        console.debug(`${pathname} -> ${finalPathName}`);
    }

    return finalPathName;
};

const checkPathname = (pathname, wciContent) => {
    const pathnames = new Map(Object.entries(wciContent["paths"]));
    return pathnames.has(pathname);
};

const checkHash = async (hash, wciHash) => {
    return hash === wciHash;
};

const verifyWciHash = async (wciHash, wciFile) => {
    const wciFileHash = digestToBase64(
        await crypto.subtle.digest("SHA-256", new TextEncoder().encode(wciFile))
    );
    if (wciHash === wciFileHash) {
        return true;
    }
    console.log("Invalid hash");
    return false;
};

const getWciConfigFromCache = (url) => {
    const wci = WCI_CACHE.get(url);
    if (wci) {
        return wci;
    }
    return false;
};

const getWciConfigFromRemote = async (url) => {
    const wciResponse = await fetch(url + "/wci.txt", {
        cache: "no-store",
    });
    if (wciResponse.status === 200) {
        const rawWci = await wciResponse.text();
        const wci = parseWCI(rawWci.split("\n"));
        return { wci, rawWci };
    }
    return false;
};

const getWciConfig = async (url) => {
    const { wciVersion, wciHash, domain } = parseDnsRecord();

    if (domain !== url) {
        console.log(`WCI not applicable for: ${url}`);
        return false;
    } else if (wciVersion !== "wci1") {
        console.log(`Wrong WCI version: ${wciVersion}`);
    }

    let wci = getWciConfigFromCache(url);

    if (wci) {
        console.debug("wci from cache", wci);
        return wci;
    }

    performance.mark("wci-from-remote-start");

    const remoteResult = await getWciConfigFromRemote(url);
    wci = remoteResult.wci;
    const rawWci = remoteResult.rawWci;

    performance.mark("wci-from-remote-end");
    if (wci) {
        performance.mark("wci-validate-hash-start");

        const validHash = await verifyWciHash(wciHash, rawWci);

        performance.mark("wci-validate-hash-end");
        if (!validHash) {
            return { error: "Invalid hash" };
        }
        WCI_CACHE.set(url, wci);
        console.debug("wci from remote", wci);
        return wci;
    }
    return { error: "General error" };
};

const getWarningPage = async (url, reason) => {
    let warningPage = await (
        await fetch(browser.runtime.getURL("unsafe_connection_page.html"))
    ).text();
    warningPage = warningPage
        .replace("{{url}}", url)
        .replace("{{reason}}", reason);
    return new TextEncoder().encode(warningPage);
};
const listener = async (details) => {
    const currentUrl = new URL(details.url);
    if (currentUrl.pathname === "/wci.txt") {
        console.debug("Not going to process this request", currentUrl.href);
        return {};
    }

    performance.mark("wci-start");
    const wciStart = Date.now();

    let wci = await getWciConfig(currentUrl.origin);
    if (wci === false) {
        console.debug(`Exit early (wci not valid): ${currentUrl.href}`);
        return {};
    }

    performance.mark("wci-setup-complete");

    console.log(currentUrl.href, details.statusCode);

    let filter = browser.webRequest.filterResponseData(details.requestId);

    let data = [];
    filter.ondata = (event) => {
        data.push(event.data);
    };

    filter.onstop = async (_event) => {
        const wciEnterOnstop = Date.now();
        performance.mark("wci-enter-onstop");
        if (data.length === 0) {
            console.debug(`Exit early (no data): ${currentUrl.href}`);
            filter.disconnect();
            return {};
        }

        if ("error" in wci) {
            filter.write(await getWarningPage(currentUrl.href, wci.error));
            filter.disconnect();
            console.debug(`Exit early (wci error): ${currentUrl.href}`);
            return {};
        }

        const siteData = await new Blob(data).arrayBuffer();
        const modifiedPathname = modifyPathname(currentUrl.pathname);

        const wciValidator = {
            wciHash: true,
            path: false,
            hash: false,
        };

        wciValidator.path = checkPathname(modifiedPathname, wci);
        let siteDataHash = "";

        if (wciValidator.path) {
            siteDataHash = await getHash(siteData);
            console.debug(siteDataHash, modifiedPathname);

            wciValidator.hash = await checkHash(
                siteDataHash,
                wci["paths"][modifiedPathname]
            );
        }

        if (!wciValidator.path || !wciValidator.hash) {
            console.log("RETRY", wciValidator);
            WCI_CACHE.remove(currentUrl.origin);
            wci = await getWciConfig(currentUrl.origin);
            wciValidator.path = checkPathname(modifiedPathname, wci);
            if (wciValidator.path) {
                if (siteDataHash === "") {
                    siteDataHash = await getHash(siteData);
                }
                wciValidator.hash = await checkHash(
                    siteDataHash,
                    wci["paths"][modifiedPathname]
                );
            }
        }

        if (Object.keys(wciValidator).some((k) => !wciValidator[k])) {
            filter.write(
                await getWarningPage(
                    currentUrl.href,
                    Object.keys(wciValidator)
                        .map((k) => `${k}: ${wciValidator[k]}`)
                        .join(" | ")
                )
            );
        } else {
            filter.write(siteData);
        }

        filter.disconnect();
        performance.mark("wci-end");
        const wciEnd = Date.now();

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
        performance.measure(
            `wci-time-from-remote${postFix}`,
            "wci-from-remote-start",
            "wci-from-remote-end"
        );
        performance.measure(
            `wci-time-validate-signature${postFix}`,
            "wci-validate-hash-start",
            "wci-validate-hash-end"
        );

        window.wciLog = {
            wciStart,
            wciEnterOnstop,
            wciEnd,
        };
    };
};

browser.webRequest.onHeadersReceived.addListener(
    listener,
    {
        urls: ["<all_urls>"],
    },
    ["blocking"]
);
