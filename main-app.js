const { WebAppInterface } = require('./src/server/web-app');
const { initializeWhatsAppClient } = require('./src/whatsapp/client');

// Initialize WhatsApp client
initializeWhatsAppClient();

// Start the web application
WebAppInterface();