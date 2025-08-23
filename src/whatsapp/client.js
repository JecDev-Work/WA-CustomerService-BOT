const qrCode = require('qrcode');
const { Client } = require('whatsapp-web.js');
const { handlerMessage } = require('../handlers/message-handler');
const sharedEmitter = require('../utils/eventEmitter');

const client = new Client();

const initializeWhatsAppClient = () => {
    client.on('qr', (qr) => {
        qrCode.toDataURL(qr, (err, url) => {
            if (err) {
                console.log('Error generating QR code:', err);
            } else {
                console.log('QR Code generated:', url);

                sharedEmitter.emit('InfoClient', {
                    qrImage: url,
                    clientStatus: 'Silakan pindai QR Code...',
                    isClientReady: false
                });
            }
        });
    });

    client.on('ready', () => {
        console.log('WhatsApp client is ready!');
        sharedEmitter.emit('InfoClient', {
            qrImage: null,
            clientStatus: 'Client is ready!',
            isClientReady: true
        });
    });

    client.on('message', (message) => {
        handlerMessage(client, message);
    });
    
    client.initialize()
};

module.exports = { initializeWhatsAppClient };