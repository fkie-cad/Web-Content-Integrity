const fs = require('fs');
const path = require('path');
const { generateWci } = require('@wci/wci-gen/wci.js');

exports.onPostBuild = (_, options) => {
    const wciResult = generateWci('public');

    fs.writeFileSync(path.format({ dir: 'public', base: 'wci.txt' }), wciResult);
};
