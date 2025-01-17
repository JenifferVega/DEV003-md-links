const { mdLinks } = require("../index");
const fs = require("fs");
//sconst { expect } = require('chai');
//expect(actual).to.deep.equal(expected);

const {
  absolutePathRoute,
  existPath,
  validExtension,
  readFilePromise,
  validateLink,
  extractLinks,
} = require("../function");

const pathModule = require("path");

// Ruta relativa para pruebas
const relativePath = "./files/demo.md";

// Ruta absoluta para pruebas
const absolutePath = pathModule.resolve(__dirname, `.${relativePath}`);

describe("mdLinks function", () => {
  test("should export a function", () => {
    expect(typeof mdLinks).toBe("function");
  });
  test("should return a Promise", () => {
    expect(mdLinks("./files/demo.md")).toBeInstanceOf(Promise);
  });


// Comprobar si la ruta relativa se convierte en una ruta absoluta
test("Convert relative path to absolute path", () => {
  const result = absolutePathRoute(relativePath);
  expect(result).toBe(absolutePath);
});

//  Comprobar si la ruta existe
test("Check if path exists", () => {
  const result = existPath(absolutePath);
  expect(result).toBe(true);
});

//  Validar la extensión del archivo
test("Validate file extension", () => {
  const parsed = pathModule.parse(absolutePath);
  const result = validExtension(parsed);
  expect(result).toBe(true);
});

//  Leer el archivo y devolver su contenido
test("Read file and return content", (done) => {
  readFilePromise(absolutePath)
    .then((data) => {
      expect(data).toBeDefined();
      done();
    })
    .catch((error) => {
      done(error);
    });
});

//  Validar enlace
test("Validate link", (done) => {
  const link = {
    href: "https://www.example.com",
    text: "Example",
    file: absolutePath,
    status: null,
    message: null,
  };
  validateLink(link)
    .then((result) => {
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("message");
      done();
    })
    .catch((error) => {
      done(error);
    });
}, 5000);

// Probar la función mdLinks
test("mdLinks function test", (done) => {
  const options = { validate: true };
  mdLinks(relativePath, options)
    .then((result) => {
      expect(result).toBeDefined();
      done();
    })
    .catch((error) => {
      done(error);
    });
});
});

describe('extractLinks', () => {
  it('should extract links from a file', () => {
    const filePath = './files/demo.md'
    const data = fs.readFileSync(filePath);
    const expectedLinks = [
      { href: 'https://www.google.com/', text: 'Google', file: filePath, status: null, message: null },
      { href: 'https://en.wikipedia.org/wiki/Main_Page', text: 'Wikipedia', file: filePath, status: null, message: null },
      { href: 'https://soyunarutaprueba2342/', text: 'GitHub', file: filePath, status: null, message: null },
    ];
    const actualLinks = extractLinks(data, filePath);
    expect(actualLinks).toEqual(expectedLinks);
  });
});