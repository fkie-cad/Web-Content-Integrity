const path = require("node:path");
const fs = require("fs");
const crypto = require("crypto");

const getAllFiles = (dirPath, arrayOfFiles) => {
    let files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const filePath = path.format({ dir: dirPath, base: file });
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            arrayOfFiles.push(
                path.join(path.format({ dir: dirPath, base: file }))
            );
        }
    });

    return arrayOfFiles;
};

const generateHash = (filename) => {
    let hash = crypto.createHash("sha256");
    const fileStream = fs.readFileSync(filename);
    hash.update(fileStream);
    return hash.digest("hex");
};

const fixPath = (baseDir, filePath) => {
    let parsedFilePath = path.parse(filePath);
    parsedFilePath.dir = parsedFilePath.dir.replace(baseDir, "");
    parsedFilePath.root = "/";
    return path.format(parsedFilePath);
};

const generateWciFile = (files, site_dir) => {
    const hashMap = new Map();
    files.forEach((file) => {
        const fileHash = generateHash(file);
        const stripped_file = fixPath(site_dir, file);

        hashMap.set(stripped_file, fileHash);
    });

    return hashMap;
};

const generateDnsString = (wciVersion, wciResult) => {
    const dnsStringPath = "./wci/dns_string";
    let wciHash = crypto
        .createHash("sha256")
        .update(wciResult)
        .digest("base64");
    const dnsString = `${wciVersion} sha256:${wciHash}`;
    fs.writeFileSync(dnsStringPath, dnsString);
};

const createWciConfigDir = () => {
    const wciContentPath = path.format({ dir: ".", base: "wci" });
    if (!fs.existsSync(wciContentPath)) {
        console.log(
            `WCI: Creating new config directory ${path.resolve(wciContentPath)}`
        );
        fs.mkdirSync(wciContentPath);
    }
    return wciContentPath;
};

const getEntriesFromFile = (filePath) => {
    let fileContent = "";
    if (!fs.existsSync(filePath)) {
        return [];
    }
    fileContent = fs.readFileSync(filePath, "utf8").split("\n");
    const entries = new Map();
    fileContent.forEach((line) => {
        const [key, val] = line.split(" ");
        entries.set(key, val);
    });
    return entries;
};

const generateWci = (basePath, isKeyRotation = false) => {
    console.log(`WCI: Processing files in ${path.resolve(basePath)}`);
    const files = getAllFiles(basePath);
    const paths = generateWciFile(files, basePath);
    const wciContentPath = createWciConfigDir();
    const redirects = getEntriesFromFile("./wci/redirects");
    const wildcards = getEntriesFromFile("./wci/wildcards");

    let wciResult = "";

    if (redirects.size > 0) {
        wciResult += "#REDIRECTS\n";
        redirects.forEach((value, key) => {
            wciResult += `"${key}":"${value}"\n`;
        });
    }

    if (wildcards.size > 0) {
        wciResult += "#WILDCARDS\n";
        wildcards.forEach((value, key) => {
            wciResult += `"${key}":"${value}"\n`;
        });
    }

    wciResult += "#PATHS\n";
    paths.forEach((value, key) => {
        wciResult += `"${key}":${value}\n`;
    });
    wciResult = wciResult.slice(0, -1);

    fs.writeFileSync(
        path.format({ dir: wciContentPath, base: "wci.txt" }),
        wciResult
    );
    generateDnsString("wci1", wciResult);

    return wciResult;
};

exports.generateWci = generateWci;
