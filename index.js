const pathModule = require("path");
const fs = require("fs");
const {
  absolutePathRoute,
  existPath,
  validateLink,
  getLinksFromFile,
} = require("./function");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = absolutePathRoute(path);
    if (!existPath(absolutePath)) {
      reject("The path does not exist");
      return;
    }
    const parsed = pathModule.parse(absolutePath);
    if (parsed.ext && parsed.dir && parsed.base) {
      if (parsed.ext === ".md") {
        if (fs.statSync(absolutePath).isDirectory()) {
          fs.readdir(absolutePath, (err, files) => {
            if (err) {
              reject(err);
              return;
            }
            const links = [];
            files.forEach((file) => {
              const newPath = pathModule.join(absolutePath, file);
              links.push(mdLinks(newPath, options));
            });
            Promise.all(links).then((results) => {
              const flattenedLinks = results.flat();
              resolve(flattenedLinks);
            });
          });
        } else {
          getLinksFromFile(absolutePath, options)
            .then((links) => {
              resolve(links);
            })
            .catch((error) => {
              reject(error);
            });
        }
      } else {
        reject(new Error("Extension is invalid"));
      }
    } else {
      reject(new Error("The path is invalid"));
    }
  });
};

module.exports = {
  mdLinks,
};
