const { mdLinks } = require('../index');
const { existPath, absolutePathRoute } = require('../function');

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

  test('should reject with an error if the extension is not .md', async () => {
    const path = './test/fixtures/test.txt';
    const options = { validate: false };
    await expect(mdLinks(path, options)).rejects.toThrow('Extension is invalid');
  });

  test('should reject with an error if the path is invalid', async () => {
    const path = './invalid/path/';
    const options = { validate: false };
    await expect(mdLinks(path, options)).rejects.toThrow('The path is invalid');
  });

  test('should return an array of links with status and message properties if validate option is set', async () => {
    const path = './files/demo.md';
    const options = { validate: true };
    const result = await mdLinks(path, options);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('status');
    expect(result[0]).toHaveProperty('message');
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
