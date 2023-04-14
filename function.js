const pathModule = require("path");
//console.log("pathModule", pathModule)
const fs = require("fs");
//const https = require("https");

const absolutePathRoute = (pathRoute) => pathModule.resolve(pathRoute);

const existPath = (pathRoute) => fs.existsSync(pathRoute);

module.exports = {
  absolutePathRoute,
  existPath,
};
