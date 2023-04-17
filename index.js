// index.js

const pathModule = require("path");
const {
  absolutePathRoute,
  existPath,
  validExtension,
  readFilePromise,
  validateLink,
  extractLinks
} = require("./function");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = absolutePathRoute(path);
    if (!existPath(absolutePath)) {
      reject("The path does not exist");
      return;
    }

    const parsed = pathModule.parse(absolutePath);
    if (validExtension(parsed)) {
      readFilePromise(absolutePath).then((data) => {
        const links = extractLinks(data, absolutePath);
        const numMatches = links.length;
        links.forEach((link) => {
          validateLink(link)
            .then((result) => {
              if (options && options.validate) {
                link.status = result.status;
                link.message = result.message;
              }
              if (links.filter((link) => link.status !== null).length === numMatches) {
                resolve(links);
              }
            })
            .catch((error) => {
              if (options && options.validate) {
                link.status = error.status;
                link.message = error.message;
              }
              if (links.filter((link) => link.status !== null).length === numMatches) {
                resolve(links);
              }
            });
        });
      });
    } else {
      reject(new Error("Extension is invalid"));
    }
  });
};

module.exports = {
  mdLinks,
};
