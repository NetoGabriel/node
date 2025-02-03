const calculador = require("./calculador");

test('somar um mais um e igual a dois', () => {
    expect(calculador.somar(1, 2)).toBe(3);
  });

test('subtrair dois menos dois e igual a um', () => {
    expect(calculador.subtrair(2, 2)).toBe(0);
  });

test('somar um mais um e igual a dois', () => {
    expect(calculador.multiplicar(1, 2)).toBe(2);
  });

test('dividir dois por dois e igual a zero', () => {
    expect(calculador.dividir(2, 2)).toBe(1);
});
