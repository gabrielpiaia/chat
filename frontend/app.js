require('dotenv').config();

// app.js
const express = require('express');
const path = require('path');

const app = express();
const FRONTEND_PORT = process.env.FRONTEND_PORT || 8081; // Permitir configuração da porta via variáveis de ambiente
const FRONTEND_IP = process.env.FRONTEND_IP || localhost; // Permitir configuração da porta via variáveis de ambiente

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Rota principal para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            res.status(err.status).send('Arquivo não encontrado!');
        }
    });
});

// Inicia o servidor
app.listen(FRONTEND_PORT, () => {
    console.log(`Servidor rodando em http://${FRONTEND_IP}:${FRONTEND_PORT}`);
});
