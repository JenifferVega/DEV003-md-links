#!/usr/bin/env node

console.log("Bienvenido a la herramienta MD-Links!");
const args = process.argv.slice(2);
const { mdLinks } = require("./index.js");
const action = args[0];
const path = args[1];

if (action === "--v") {
  mdLinks(path, { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.log("error", error);
  });
} else if (action === "--s") {
  mdLinks(path, { validate: false })
  .then((links) => {
    const totalLinks = links.length;
    const uniqueLinks = new Set(links.map((link) => link.href)).size;
    console.log(`Total: ${totalLinks}`);
    console.log(`Unique: ${uniqueLinks}`);
  })
  .catch((error) => {
    console.log("error", error);
  });
}
 else if (action === "--v--s") {
  mdLinks(path, { validateStats: true })
    .then((links) => {
      const totalLinks = links.length;
      const uniqueLinks = new Set(links.map((link) => link.href)).size;
      const brokenLinks = links.filter((link) => link.status !== 200).length;
      console.log(`Total: ${totalLinks}`);
      console.log(`Unique: ${uniqueLinks}`);
      console.log(`Broken: ${brokenLinks}`);
    })
    .catch((error) => {
      console.log("error", error);
    });
}