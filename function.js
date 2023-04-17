const pathModule = require("path");
const fs = require("fs");
const https = require("https");

const absolutePathRoute = (pathRoute) => pathModule.resolve(pathRoute);

const existPath = (pathRoute) => fs.existsSync(pathRoute);

const validExtension = (parsed) => {
  if (parsed.ext === ".md") {
    return true;
  }
  return false;
};

const readFilePromise = (absolutePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(absolutePath, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const validateLink = (link) => {
  return new Promise((resolve) => {
    try {
      https
        .get(link.href, (response) => {
          link.status = response.statusCode;
          if (response.statusCode < 400) {
            link.message = "OK";
          } else if (response.statusCode >= 400) {
            link.message = "Not Found";
          } else {
            link.message = "Other";
          }
          resolve(link);
        })
        .on("error", () => {
          link.status = "N/A";
          link.message = "ok";
          resolve(link);
        });
    } catch (error) {
      link.status = "N/A";
      link.message = "ok";
      resolve(link);
    }
  });
};

const extractLinks = (data, filePath) => {
  const regex = /\[(.+?)\]\((http[s]?:\/\/[^\s]+)\)/g;
  const links = [];
  let match = regex.exec(data.toString());
  while (match !== null) {
    const link = {
      href: match[2],
      text: match[1],
      file: filePath,
      status: null,
      message: null,
    };
    links.push(link);
    match = regex.exec(data.toString());
  }

  return links;
};

module.exports = {
  absolutePathRoute,
  existPath,
  readFilePromise,
  validExtension,
  validateLink,
  extractLinks,
};
