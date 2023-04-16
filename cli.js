#!/usr/bin/env node

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

const args = process.argv.slice(2);//obtendo los argumentos que pasan en la linea de comandos y el slice elimina los 2 primeros argumentos que no son relevantes
//console.log("args", args);
const { mdLinks } = require("./index.js");
const path = args[0]; //´primer argumento de  la variable path
//console.log(path, "path")
const action = args[1] || "";// guarda el segundo argumento y si no hay segundo argumento guardo una cadena vacia en su lugar
const action2 = args[2] || "";// guarda 3er argumento

//console.log(path, action, action2);

mdLinks(path, { validate: action === "--v" || action2 === "--v" })// llamo a la funcion con el arg path y la prop validate valida si ambos son true
  .then((links) => {// encadeno con el metodo then para manejar el resultado de la promesa devuelta por mdlinks
    //console.log(links);
    const totalAction = action + action2; //concateno el valor action y action en una sola variable
    //console.log("totalAction", totalAction)

    if (totalAction?.includes("--help")) {// linea de comandos
      console.log("Los siguientes comandos están disponibles:");
      console.log("md-links RutaMDCompleta --v: Valida los links encontrados en el archivo Markdown");
      console.log("md-links RutaMDCompleta --s: Muestra estadísticas de los links encontrados en el archivo Markdown");
      console.log("md-links RutaMDCompleta --v --s: Valida los links y muestra estadísticas con sus enlaces rotos");
      return;
    }

    for (let i = 0; i < links.length; i++) {//en este bucle itero sobre cada uno de los enlaces que se encuentran en el archivo
      if (totalAction?.includes("--v")) {//aqui verifico si esta incluido en el totalAction
       // console.log("totalAction", totalAction)
        console.log({//si esta imprimo el objeto
          path,
          href: links[i].href,
          status: links[i].status,
          message: links[i].message,
          text: links[i].text
        });
      } else {//si no imprime 3 objeto que tiene estos 3 parametros
          console.log({
            path,
            href: links[i].href,
            text: links[i].text
          });
        }
      }

    if (totalAction?.includes("--s")) {
      const totalLinks = links.length;// si esta incluido en totalactions aqui guardo el numero total de enlaces encontrados en la variable totallinks
      const uniqueLinks = new Set(links.map((link) => link.href)).size;// mediante el set obtengo el numero de enlaces unicos encontrados
      console.log(`Total: ${totalLinks}`);
      console.log(`Unique: ${uniqueLinks}`);
    }
    if (totalAction?.includes("--v")) {
      const brokenLinks = links.filter((link) => link.status !== 200).length;// traera como rotos todos los enlaces por filtro que sean diferentes de 200
      console.log(`Broken: ${brokenLinks}`);
    }
  })
  .catch((error) => {
    console.log("error", error);
  });
