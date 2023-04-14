#!/usr/bin/env node
/*
const chalk = require('chalk');

const message = 'Bienvenido a la herramienta MD-Links!';
const maxLength = process.stdout.columns ; // Restamos 1 para que el mensaje no se corte al final de la línea
const textSize = 1; // Tamaño de letra, puedes ajustarlo según tus necesidades

const formattedMessage = chalk.blue.bold(message.substring(0, maxLength)).padEnd(maxLength, ' ');

console.log(chalk.keyword('orange').bgWhiteBright.bold(formattedMessage.split('').map(c => c.padEnd(textSize, ' ')).join('')));



const args = process.argv.slice(2);
const { mdLinks } = require("./index.js");
const path = args[0];
const action = args[1] || "";
const action2 = args[2] || "";

console.log(path, action, action2);

mdLinks(path, { validate: action === "--v" || action2 === "--v" })
  .then((links) => {
    //console.log(links);
    const totalAction = action + action2;

    for (let i = 0; i < links.length; i++) {
      if (totalAction?.includes("--v")) {
        console.log(
          `${path} ${links[i].href} ${links[i].status} ${links[i].message} ${links[i].text}`
        );
      } else {
        console.log(`${path} ${links[i].href} ${links[i].text}`);
      }
    }

    if (totalAction?.includes("--s")) {
      const totalLinks = links.length;
      const uniqueLinks = new Set(links.map((link) => link.href)).size;
      console.log(`Total: ${totalLinks}`);
      console.log(`Unique: ${uniqueLinks}`);
    }
    if (totalAction?.includes("--v")) {
      const brokenLinks = links.filter((link) => link.status !== 200).length;
      console.log(`Broken: ${brokenLinks}`);
    }
  })
  .catch((error) => {
    console.log("error", error);
  });
*/


const chalk = require("chalk");

const message = "Bienvenido a la herramienta MD-Links!";
const maxLength = process.stdout.columns; // Restamos 1 para que el mensaje no se corte al final de la línea
const textSize = 1; // Tamaño de letra, puedes ajustarlo según tus necesidades

const formattedMessage = chalk
  .blue
  .bold(message.substring(0, maxLength))
  .padEnd(maxLength, " ");

console.log(
  chalk
    .keyword("orange")
    .bgWhiteBright
    .bold(
      formattedMessage
        .split("")
        .map((c) => c.padEnd(textSize, " "))
        .join("")
    )
);

const args = process.argv.slice(2);
const { mdLinks } = require("./index.js");
const path = args[0];
const action = args[1] || "";
const action2 = args[2] || "";

console.log(path, action, action2);



mdLinks(path, { validate: action === "--v" || action2 === "--v" })
  .then((links) => {
    //console.log(links);
    const totalAction = action + action2;

    if (totalAction?.includes("--help")) {
      console.log("Los siguientes comandos están disponibles:");
      console.log("md-links RutaMDCompleta --v: Valida los links encontrados en el archivo Markdown");
      console.log("md-links RutaMDCompleta --s: Muestra estadísticas de los links encontrados en el archivo Markdown");
      console.log("md-links RutaMDCompleta --v --s: Valida los links y muestra estadísticas con sus enlaces rotos");
      return;
    }
    //console.log("totalAction", totalAction)

    for (let i = 0; i < links.length; i++) {
      if (totalAction?.includes("--v")) {
        console.log(
          `${path} ${links[i].href} ${links[i].status} ${links[i].message} ${links[i].text}`
        );
      } else {
        console.log(`${path} ${links[i].href} ${links[i].text}`);
      }
    }

    if (totalAction?.includes("--s")) {
      const totalLinks = links.length;
      const uniqueLinks = new Set(links.map((link) => link.href)).size;
      console.log(`Total: ${totalLinks}`);
      console.log(`Unique: ${uniqueLinks}`);
    }
    if (totalAction?.includes("--v")) {
      const brokenLinks = links.filter((link) => link.status !== 200).length;
      console.log(`Broken: ${brokenLinks}`);
    }
  })
  .catch((error) => {
    console.log("error", error);
  });
