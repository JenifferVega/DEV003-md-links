

const {
    absolutePathRoute,
    validExtension,
    readFilePromise,
    validateLink,
  } = require("../function");


describe('absolutePathRoute', () => {
  test('should return the absolute path of a given route', (done) => {
    const result = absolutePathRoute('.');
    expect(result).toMatch("C:\\Users\\jenif\\Desktop\\DEV003-md-links");
    done();
  });
});


describe('validExtension', () => {
  test('should return true for a .md file', (done) => {
    const parsed = { ext: '.md' };
    const result = validExtension(parsed);
    expect(result).toBeTruthy();
    done();
  });

  test('should return false for a non-.md file', (done) => {
    const parsed = { ext: '.txt' };
    const result = validExtension(parsed);
    expect(result).toBeFalsy();
    done();
  });
});/*

describe('readFilePromise', () => {
  test('should return the content of a file as a string', (done) => {
    readFilePromise('./files/demo.md', (err, result) => {
      expect(err).toBeNull();
      expect(result.toString()).toBe('# Test\n');
      done();
    });
  },10000);

  test('should return an error for a non-existing file', (done) => {
    readFilePromise('./testFiles/non-existing.md', (err, result) => {
      expect(err).toBeTruthy();
      expect(result).toBeUndefined();
      done();
    });
  },10000);
});

describe('validateLink', () => {
  test('should validate a link with a 200 status code', (done) => {
    const link = { href: 'https://jsonplaceholder.typicode.com/posts/1' };
    validateLink(link, (result) => {
      expect(result.status).toBe(200);
      expect(result.message).toBe('OK');
      done();
    });
  },10000);

  test('should validate a link with a 404 status code', (done) => {
    const link = { href: 'https://jsonplaceholder.typicode.com/non-existing' };
    validateLink(link, (result) => {
      expect(result.status).toBe(404);
      expect(result.message).toBe('Not Found');
      done();
    });
  },10000);

  test('should handle an error when validating a link', (done) => {
    const link = { href: 'https://non-existing-website.com' };
    validateLink(link, (result) => {
      expect(result.status).toBe('N/A');
      expect(result.message).toBe('ok');
      done();
    });
  },10000);
});
*/