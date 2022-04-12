const functions = require('../functions.js')
const route1 = 'files/test.md';
const route2 = 'files/test.txt';
const route3 = 'lala';



// Test checkRoute
describe('La funcion checkRoute', () => {
  it('devuelve true si el path existe', () => {

    expect(functions.checkRoute(route1)).toBe(true);
  })
  it('devuelve false si el path no existe', () => {

    expect(functions.checkRoute(route3)).toBe(false);
  })
});


//Test absolutePath
describe('La funcion absolutePath', () => {

  it('Transforma una ruta relativa ${route1} en absoluta', () => {

    expect(functions.absolutePath(route1)).toBe('/Users/aylinzuan/SCL019-md-links/files/test.md');
  })

});


//Test extensionValidate
describe('La función extensionValidate ', () => {

  it('Devuelve true si la extension del archivo es .md', () => {
    
    expect(functions.extensionValidate(route1)).toBe(true);
  })

  it('Devuelve false si la extension del archivo no es .md', () => {
    

    expect(functions.extensionValidate(route2)).toBe(false);
  })
});









