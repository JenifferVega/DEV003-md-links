const { mdLinks } = require("./index.js");

const path = process.argv[2];
console.log("path", path);

mdLinks(path, {})
  .then((value) => {
    console.log("value", value);
  })
  .catch((error) => {
    console.log("error", error);
  });
