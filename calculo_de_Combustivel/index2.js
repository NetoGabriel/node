function combustivel(distancia, tipo) {
    if (typeof distancia !== 'number' || distancia < 0) {
        throw new Error('A distância deve ser um número inteiro não negativo.');
    }

    if (tipo !== 'gasolina' && tipo !== 'etanol') {
        throw new Error('O tipo de combustível deve ser "gasolina" ou "etanol".');
    }

    const distanciaKm = distancia / 1000;
    let consumoPorKm;

    if (tipo === 'gasolina') {
        consumoPorKm = 1 / 16;
    } else if (tipo === 'etanol') {
        consumoPorKm = 1 / 11;
    }

    const litrosNecessarios = distanciaKm * consumoPorKm;
    return Math.ceil(litrosNecessarios);
}

module.exports = combustivel;