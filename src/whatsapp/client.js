const qrcode = require('qrcode');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const sharedEmitter = require('../utils/eventEmitter');


const initializeWhatsAppClient = () => {
    client.on('qr', (qr) => {
        const qrCodeImage = qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Error generating QR code:', err);
            } else {
                console.log('QR Code generated:', url);

                sharedEmitter.emit('qr', qrCodeImage);
                sharedEmitter.emit('statusUpdate', 'Silakan pi  dai QR Code...');
            }
        });

    });

    client.on('ready', () => {
        console.log('WhatsApp client is ready!');
        sharedEmitter.emit('status_client', 'ready', true);
    });

    client.initialize()
};

module.exports = { initializeWhatsAppClient };