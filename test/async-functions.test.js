// pruebas de forma asincrona con la carpeta functions
const {
    absolutePathRoute,
    validExtension,
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
});