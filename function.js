const pathModule = require("path");
const fs = require("fs");
const https = require("https");

const absolutePathRoute = (pathRoute) => pathModule.resolve(pathRoute);

const existPath = (pathRoute) => fs.existsSync(pathRoute);

const validateLink = (link) => {
  return new Promise((resolve) => {
    https.get(link.href, (response) => {
      link.status = response.statusCode;
      if (response.statusCode === 200) {
        link.message = "OK";
      } else if (response.statusCode === 404) {
        link.message = "Not Found";
      } else {
        link.message = "Other";
      }
      resolve(link);
    }).on("error", () => {
      link.status = "N/A";
      link.message = "ok";
      resolve(link);
    });
  });
};

const getLinksFromFile = (absolutePath, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(absolutePath, (error, data) => {
      if (error) {
        reject(error);
      } else {
        const regex = /\[(.+?)\]\((http[s]?:\/\/[^\s]+)\)/g;
        const links = [];
        let match;
        while ((match = regex.exec(data.toString())) !== null) {
          const link = {
            href: match[2],
            text: match[1],
            file: absolutePath,
            status: null,
            message: null,
          };
          if (options && options.validate) {
            links.push(validateLink(link));
          } else {
            links.push(link);
          }
        }
        Promise.all(links).then((links) => {
          resolve(links);
        });
      }
    });
  });
};

module.exports = {
  absolutePathRoute,
  existPath,
  validateLink,
  getLinksFromFile,
};
