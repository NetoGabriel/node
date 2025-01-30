const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credentials.json');
const arquivo = require('./arquivo.json');

async function GetDoc() {
    try {
        const doc = new GoogleSpreadsheet(arquivo.id);
        await doc.useServiceAccountAuth({
            client_email: credenciais.client_email,
            private_key: credenciais.private_key.replace(/\\n/g, '\n'),
        });
        await doc.loadInfo();
        return doc;
    } catch (error) {
        console.error('Erro ao carregar o documento:', error);
        throw error;
    }
}

async function ReadWorkSheet() {
    try {
        let sheet = (await GetDoc()).sheetsByIndex[0];
        let rows = await sheet.getRows();
        let users = rows.map(row => row.toObject());
        return users;
    } catch (error) {
        console.error('Erro ao ler a planilha:', error);
        throw error;
    }
}

async function addUsers(data = {}) {
    try {
        const response = await fetch('https://apigenerator.dronahq.com/api/_NNA4dS-/Dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.error('Erro ao adicionar usuários:', error);
        throw error;
    }
}

async function TrackData() {
    try {
        let data = await ReadWorkSheet();
        data.map(async (user) => {
            let response = await addUsers(user);
            console.log(response);
        });
        console.log('Dados enviados com sucesso');
    } catch (error) {
        console.error('Erro ao rastrear dados:', error);
        throw error;
    }
}

module.exports = { TrackData };