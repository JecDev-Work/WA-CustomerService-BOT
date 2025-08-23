const handlerMessage = (message) => {
    const messageReceived = message.body.toLowerCase();

    const listResponses = {
        "halo": "Halo! Ada yang bisa saya bantu?",
        "help": "Tentu! Silakan beri tahu saya apa yang Anda butuhkan.",
    }

    const messageResponse = listResponses[messageReceived] || "Saya tidak mengerti pesan Anda.";

    if (messageResponse) {
        message.reply(messageResponse);
    }
}

module.exports = { handlerMessage };