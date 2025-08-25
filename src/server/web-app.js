const express = require('express');
const app = express();
const sharedEmitter = require('../utils/eventEmitter');
const port = 3002;

let qrImage = '';
let clientStatus = 'Mohon Menunggu...';
let isClientReady = false;

const WebAppInterface = () => {

    sharedEmitter.on('InfoClient', (data) => {
        qrImage = data.qrImage;
        clientStatus = data.clientStatus;
        isClientReady = data.isClientReady;
    });

    app.listen(port, () => {
        console.log(`Web app listening at http://localhost:${port}`);
    });

    app.get('/', (req, res) => {
        res.send(`
            <html>
            <head>
                <title>WhatsApp Gateway</title>
                <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                </style>
            </head>
            <body>
                <h2>${clientStatus}</h2>
                ${qrImage ? `<img src="${qrImage}" alt="QR Code" />` : ''}
            </body>
            </html>
        `);
    });

}

module.exports = { WebAppInterface };