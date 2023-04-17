const pathModule = require("path");
const {
  absolutePathRoute,
  existPath,
  validExtension,
  readFilePromise,
  validateLink,
} = require("./function");

const mdLinks = (path, options) => {

  return new Promise((resolve, reject) => {
    // Convertir la ruta relativa en una ruta absoluta
    const absolutePath = absolutePathRoute(path);

    // Validar si la ruta existe//
    if (!existPath(absolutePath)) {
      reject("The path does not exist");
      return;
    }

    // Validar la extensión del archivo
    const parsed = pathModule.parse(absolutePath);
    if (validExtension(parsed)) {
      readFilePromise(absolutePath).then((data) => {
        const regex = /\[(.+?)\]\((http[s]?:\/\/[^\s]+)\)/g;
        const links = [];
        let match;
        const numMatches = (data.toString().match(regex) || []).length;
        while ((match = regex.exec(data.toString())) !== null) {
          const link = {
            href: match[2],
            text: match[1],
            file: absolutePath,
            status: null,
            message: null,
          };
          validateLink(link)
            .then((result) => {
              if (options && options.validate) {
                link.status = result.status;
                link.message = result.message;
              }
              links.push(link);
              if (links.length === numMatches) {
                resolve(links);
              }
            })
            .catch((error) => {
              if (options && options.validate) {
                link.status = error.status;
                link.message = error.message;
              }
              links.push(link);
              if (links.length === numMatches) {
                resolve(links);
              }
            });
        }
      });
    } else {
      reject(new Error("Extension is invalid"));
    }
  });
};

module.exports = {
  mdLinks,
};
