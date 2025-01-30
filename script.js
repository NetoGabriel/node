class Carro {
    Marca
    Modelo
    Ano
    Categoria
    Quilometragem
    Valor

    constructor(Marca, Modelo, Ano, Categoria, Quilometragem, Valor) {
        this.Marca = Marca
        this.Modelo = Modelo
        this.Ano = Ano
        this.Categoria = Categoria
        this.Quilometragem = Quilometragem
        this.Valor = Valor
    }
}

function Get() {
    return fetch('https://retoolapi.dev/TN06vL/Modelo')
    .then(response => response.json())
    .then(data => { console.log(data) })
}

async function PostData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return response.json()
}

PostData('https://retoolapi.dev/TN06vL/Modelo', {
    Marca: 'Fiat',
    Modelo: 'Uno',
    Ano: 2025,
    Categoria: 'Hatch',
    Quilometragem: 0,
    Valor: 30000
})
.then(data => {
    console.log(data)
})