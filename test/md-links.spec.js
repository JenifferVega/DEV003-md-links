/*const mdLinks = require('../index');
//const pathModule = require("path");
//const fs = require("fs");
//const https = require("https");
//const  {absolutePathRoute , existPath} = require("./function");


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('deberia devolver una promesa', () =>{
    expect(mdLinks()).toBe(typeof Promise );
  });

});
//console.log
*/

const assert = require('assert');
const pathModule = require('path');
const fs = require('fs');
const { absolutePathRoute, existPath } = require('./index');

describe('Testing absolutePathRoute function', () => {
  it('should return an absolute path', () => {
    const relativePath = './index.js';
    const absolutePath = absolutePathRoute(relativePath);
    assert.strictEqual(pathModule.isAbsolute(absolutePath), true);
  });

  it('should return the same path if it is already absolute', () => {
    const absolutePath = '/home/user/index.js';
    const result = absolutePathRoute(absolutePath);
    assert.strictEqual(result, absolutePath);
  });
});

describe('Testing existPath function', () => {
  it('should return true if the path exists', () => {
    const path = './index.js';
    const result = existPath(path);
    assert.strictEqual(result, true);
  });

  it('should return false if the path does not exist', () => {
    const path = './no-exist.js';
    const result = existPath(path);
    assert.strictEqual(result, false);
  });
});
