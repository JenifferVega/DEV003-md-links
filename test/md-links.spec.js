const { mdLinks } = require('../index');
const { existPath, absolutePathRoute } = require('../function');
const pathModule = require("path");
const fs = require("fs");

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
