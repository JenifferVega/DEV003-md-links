const pathModule = require("path");
//console.log("pathModule", pathModule)
const fs = require("fs");
const https = require("https");
const  {absolutePathRoute , existPath} = require("./function");


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Convertir la ruta relativa en una ruta absoluta
    const absolutePath = absolutePathRoute(path);

    // Validar si la ruta existe
    if (!existPath(absolutePath)) {
      reject("The path does not exist");
      return;
    }

    // Validar la extensión del archivo
    const parsed = pathModule.parse(absolutePath);
    if (parsed.ext && parsed.dir && parsed.base) {//intentar implementar recursividad
      if (parsed.ext === ".md") {
        fs.readFile(absolutePath, (error, data) => {
          if (error) {
            reject(error);
          } else {
            const regex = /\[(.+?)\]\((http[s]?:\/\/[^\s]+)\)/g;
            const links = [];
            //console.log("links", links)
            let match;
            while ((match = regex.exec(data.toString())) !== null) {
              const link = {
                href: match[2],
                text: match[1],
                file: absolutePath,
                status: null,
                message: null,
              };
              //if (options && options.validate)
                links.push(
                new Promise((resolve, reject) => {
                  https
                    .get(link.href, (response) => {
                      link.status = response.statusCode;
                      if (response.statusCode === 200) {
                        link.message = "OK";
                      } else if (response.statusCode === 404) {
                        link.message = "Not Found";
                      } else {
                        link.message = "Other";
                      }
                      resolve(link);
                    })
                    .on("error", (error) => {
                      link.status = "N/A";
                      //console.log("link.status", link)
                      link.message = "ok";
                      resolve(link);
                    });
                })
              );
            }
            Promise.all(links).then((links) => {
             // console.log("link", links)
              resolve(links);
            });
          }
        });
      } else {
        reject("Extension is invalid");
      }
    } else {
      reject("The path is invalid");
    }
  });
};


//const test = () => console.log("hola mundo");

module.exports = {
  mdLinks,
};

