**This project is provided by: https://github.com/SiegeEngineers/website**

In this work, it is used to demonstrate the gatsby plug-in integration of the WCI framework.
The plug-in is located in the `plugins` directory.

---

<h1 align="center">SiegeEngineers.org Website</h1>

The main Siege Engineers website.

Requires Node 14+

## Commands
```sh
# Install Gatsby CLI
npm install -g gatsby-cli

# install dependencies
npm install

# Development
gatsby develop

# Production Build
gatsby build

# Serve the build locally
gatsby serve
```

## Other Commands
```sh
# working locally
npm run dev

# generate build
npm run build

# format code
npm run format

# lint code
npm run lint

# deploy
rsync -avh ./public/ aoe2se:~/html/ --delete
```
