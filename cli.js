const { mdLinks } = require("./index.js");
const chalk = require("chalk");
const yargs = require("yargs");

const message = "Bienvenido a la herramienta MD-Links!";
const maxLength = process.stdout.columns;
const textSize = 1;

const formattedMessage = chalk.blue
  .bold(message.substring(0, maxLength))
  .padEnd(maxLength, " ");

console.log(
  chalk.keyword("orange").bgWhiteBright.bold(
    formattedMessage
      .split("")
      .map((c) => c.padEnd(textSize, " "))
      .join("")
  )
);

const options = yargs
  .usage("Usage: md-links <path> [options]")
  .command(
    "$0 <path>",
    "Find links in markdown files",
    (yargs) => {
      yargs.positional("path", {
        describe: "Path to the markdown file or directory",
        type: "string",
      });
    },
    (argv) => {
      mdLinks(argv.path, argv)
        .then((links) => {
          const { validate, stats } = argv;
          if (validate && stats) {
            const totalLinks = links.length;
            const uniqueLinks = new Set(links.map((link) => link.href)).size;
            const brokenLinks = links.filter((link) => link.status !== 200).length;
            console.log(`Total: ${totalLinks}\nUnique: ${uniqueLinks}\nBroken: ${brokenLinks}`);
          } else if (validate) {
            links.forEach((link) => {
              if (link.status === 200) {
                console.log(`href: ${link.href}\ntext: ${link.text}\nfile: ${link.file}\nstatus: ${link.status}\nmessage: ${link.message}\n`);
              } else {
                console.log(`href: ${link.href}\ntext: ${link.text}\nfile: ${link.file}\nstatus: ${link.status}\nmessage: ${link.message}\n`);
              }
            });
          } else if (stats) {
            const totalLinks = links.length;
            const uniqueLinks = new Set(links.map((link) => link.href)).size;
            console.log(`Total: ${totalLinks}\nUnique: ${uniqueLinks}`);
          } else {
            links.forEach((link) => {
              console.log(`href: ${link.href}\ntext: ${link.text}\nfile: ${link.file}\n`);
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  )
  .options({
    v: {
      alias: "validate",
      describe: "Validate links",
      type: "boolean",
    },
    s: {
      alias: "stats",
      describe: "Show link stats",
      type: "boolean",
    },
    h: {
      alias: "help",
      describe: "Show help",
      type: "boolean",
    },
  })
  .help()
  .alias("help", "h").argv;
