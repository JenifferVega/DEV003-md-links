/*const { mdLinks } = require('../index');
const { existPath } = require('../function');

jest.mock('https');

  describe('mdLinks', () => {
    test('should be a function', () => {
      expect(typeof mdLinks).toBe('function');
    });

  test('should return an error if the path does not exist', () => {
    const path = 'nonexistent/file.md';
    const options = {};

    return expect(mdLinks(path, options)).rejects.toEqual('The path does not exist');
  });
});

it('debería resolver una promesa con una matriz de objetos de enlace', () => {
  const archivoConEnlacesValidos = './files/demo.md';
  return mdLinks(archivoConEnlacesValidos).then((links) => {
    expect(Array.isArray(links)).toBe(true);
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
    });
  });
});

it('debería resolver una promesa con una matriz de objetos de enlace que contienen información de estado y mensaje si la opción validate es verdadera', () => {
  const archivoConEnlacesValidos = './files/demo.md';
  return mdLinks(archivoConEnlacesValidos, { validate: true }).then((links) => {
    expect(Array.isArray(links)).toBe(true);
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
      expect(link).toHaveProperty('status');
      expect(link).toHaveProperty('message');
    });
  });
});

describe('existPath', () => {
  test('should return true if the path exists', () => {
    const path = './files/demo.md';
    const result = existPath(path);
    expect(result).toBe(true);
  });

  test('should return false if the path does not exist', () => {
    const path = './nonexistent/path';
    const result = existPath(path);
    expect(result).toBe(false);
  });
});

*/

const { mdLinks } = require("../index");
const {
  absolutePathRoute,
  existPath,
  validExtension,
  readFilePromise,
  validateLink,
} = require("../function");

const pathModule = require("path");

// Ruta relativa para pruebas
const relativePath = "./files/demo.md";

// Ruta absoluta para pruebas
const absolutePath = pathModule.resolve(__dirname, `.${relativePath}`);

// Caso de prueba 1: Comprobar si la ruta relativa se convierte en una ruta absoluta
test("Convert relative path to absolute path", () => {
  const result = absolutePathRoute(relativePath);
  expect(result).toBe(absolutePath);
});

// Caso de prueba 2: Comprobar si la ruta existe
test("Check if path exists", () => {
  const result = existPath(absolutePath);
  expect(result).toBe(true);
});

// Caso de prueba 3: Validar la extensión del archivo
test("Validate file extension", () => {
  const parsed = pathModule.parse(absolutePath);
  const result = validExtension(parsed);
  expect(result).toBe(true);
});

// Caso de prueba 4: Leer el archivo y devolver su contenido
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

// Caso de prueba 5: Validar enlace
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

// Caso de prueba 6: Probar la función mdLinks
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
