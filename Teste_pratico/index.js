import { GoogleSpreadsheet } from 'google-spreadsheet';
import { readFileSync } from 'fs';

const credenciais = JSON.parse(readFileSync('./teste-planilha-449701-238bb12150d3.json', 'utf8'));
const arquivo = { id: '1exCNm8MN8tPUnaCbdS_bUwLaAH7gd0ib7LZ_IEiO95Y' }; // Atualize com o ID da sua planilha

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
        const doc = await GetDoc();
        const sheet = doc.sheetsByIndex[0]; // Acessa a primeira planilha
        const rows = await sheet.getRows(); // Obtém todas as linhas

        const data = rows.map(row => {
            return {
                nome: row.nome,
                email: row.email,
                idade: row.idade
            };
        });

        console.log('Dados da planilha:', data);
        return data;
    } catch (error) {
        console.error('Erro ao ler a planilha:', error);
        throw error;
    }
}

async function AddUser(data = {}) {
    try {
        const response = await fetch('https://apigenerator.dronahq.com/api/80QJxO0A/testeplanilha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.error('Erro ao adicionar usuários:', error);
        throw error;
    }
}

async function AddRowToSheet(data) {
    try {
        const sheet = (await GetDoc()).sheetsByIndex[0];
        await sheet.addRow(data);
        console.log('Linha adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar linha à planilha:', error);
        throw error;
    }
}

async function TrackData() {
    try {
        const users = await ReadWorkSheet();
        for (const user of users) {
            await AddUser(user);
            await AddRowToSheet(user);
        }
        console.log('Dados enviados com sucesso!');
    } catch (error) {
        console.error('Erro ao rastrear dados:', error);
        throw error;
    }
}

async function AddUserToSheet(user) {
    try {
        const sheet = (await GetDoc()).sheetsByIndex[0];
        await sheet.loadHeaderRow();
        if (sheet.headerValues.length === 0) {
            await sheet.setHeaderRow(Object.keys(user));
        }
        await AddRowToSheet(user);
        console.log('Usuário adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar usuário à planilha:', error);
        throw error;
    }
}

const newUser = {
    nome: 'Exemplo',
    email: 'jg@example.com',
    idade: 30
};

AddUserToSheet(newUser);

TrackData();