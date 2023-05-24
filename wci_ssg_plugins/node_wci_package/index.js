#!/usr/bin/env node

const fs = require("fs");
const path = require("node:path");
const { generateWci } = require("./wci.js");

const main = () => {
    const buildPath = process.argv.slice(2);
    if (buildPath.length !== 1) {
        console.log(`WCI: Please supply only one path. (${buildPath.length})`);
        return;
    }

    const wciResult = generateWci(buildPath[0]);

    fs.writeFileSync(
        path.format({ dir: buildPath[0], base: "wci.txt" }),
        wciResult
    );
};

main();
