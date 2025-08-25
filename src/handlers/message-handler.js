const { MessageMedia } = require('whatsapp-web.js');
const { generateResponse } = require('./ai-handler.js');

const handlerMessage = async (client, message) => {
    if (message.from === 'status@broadcast' || message.isGroup) {
        return;
    }

    try {
        const userMessage = message.body;
        const userNumber = message.from;
        console.log(`💬 Menerima pesan dari ${userNumber}: "${userMessage}"`);

        const actions = await generateResponse(userMessage);

        for (const action of actions) {
            console.log(`⚡ Mengeksekusi aksi tipe: ${action.type}`);
            switch (action.type) {
                case 'text':
                    await client.sendMessage(userNumber, action.payload.message);
                    break;
                case 'image':
                    const media = MessageMedia.fromFilePath(action.payload.path);
                    await client.sendMessage(userNumber, media);
                    break;
            }
        }

    } catch (error) {
        console.error("❌ Terjadi error fatal di dalam handlerMessage:", error);
        await client.sendMessage(message.from, "Maaf, terjadi kesalahan di sistem kami. Silakan coba lagi nanti.");
    }
};

module.exports = { handlerMessage };