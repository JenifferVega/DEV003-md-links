#!/usr/bin/env node
/*
console.log("Bienvenido a la herramienta MD-Links!");
const args = process.argv.slice(2);
const { mdLinks } = require("./index.js");
const action = args[0];
const path = args[1];

if (action.includes("--v")) {
  mdLinks(path, {})
    .then((links) => {
      console.log(links);
    })
    .catch((error) => {
      console.log("error", error);
    });
} else if (action === "--s") {
  console.log("stats")

} else if(action === "--validate--stats"){
  const options = {
    validate_stats: true,
  };
  mdLinks(path, options)
  //console.log("path", path)
    .then((links) => {
      //console.log("links", links)
      const totalLinks = links.length;
      //console.log("totalLinks", totalLinks)
      const uniqueLinks = new Set(links.map((link) => link.href)).size;
      //console.log("uniqueLinks", uniqueLinks)
      const brokenLinks = links.filter((link) => link.status !== 200).length;
      //console.log("brokenLinks", brokenLinks)
      console.log(`Total: ${totalLinks}`);
      console.log(`Unique: ${uniqueLinks}`);
      console.log(`Broken: ${brokenLinks}`);
    })
    .catch((error) => {
      console.log("error", error);
    });
}

console.log("Bienvenido a la herramienta MD-Links!");
const args = process.argv.slice(2);
const { mdLinks } = require("./index.js");
const action = args[0];
const path = args[1];

if (action === "--v") {
  mdLinks(path, { })
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.log("error", error);
  });
} else if (action === "--s") {
  mdLinks(path, { })

} else if (action === "--vstats") {
  console.log("action", action)
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
*/

console.log("Bienvenido a la herramienta MD-Links!");
const args = process.argv.slice(2);
const { mdLinks } = require("./index.js");
const action = args[0];
const path = args[1];

if (action.includes("--v")) {
  mdLinks(path, { validate: true })
    .then((links) => {
      console.log(links);
    })
    .catch((error) => {
      console.log("error", error);
    });
} else if (action.includes("--s")) {
  mdLinks(path, { validate: false })
    .then((links) => {
      const linksData = links.map((link) => {
        return {
          href: link.href,
          text: link.text,
          file: link.file,
        };
      });
      console.log(linksData);
    })
    .catch((error) => {
      console.log("error", error);
    });
} else if (action.includes("--validate--stats")) {
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
