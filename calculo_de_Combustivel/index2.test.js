const combustivel = require('./index2');

test('Calcula corretamente o consumo de gasolina', () => {
    expect(combustivel(16000, 'gasolina')).toBe(1 );
});

test('Calcula corretamente o consumo de etanol', () => {
    expect(combustivel(11000, 'etanol')).toBe(1);
});

test('Lança erro para distância negativa', () => {
    expect(() => combustivel(-1000, 'gasolina')).toThrow('A distância deve ser um número inteiro não negativo.');
});

test('Lança erro para tipo de combustível inválido', () => {
    expect(() => combustivel(1000, 'diesel')).toThrow('O tipo de combustível deve ser "gasolina" ou "etanol".');
});