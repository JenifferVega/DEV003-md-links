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
