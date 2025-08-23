// src/handlers/message-handler.js

const { MessageMedia, Buttons } = require('whatsapp-web.js');
const path = require('path'); // Impor modul 'path' bawaan Node.js

const handlerMessage = async (client, message) => {
    // Abaikan pesan dari status atau grup
    if (message.from === 'status@broadcast' || message.isGroup) {
        return;
    }

    try {
        console.log(`[DEBUG] Menerima pesan: "${message.body}"`);
        const userMessage = message.body.toLowerCase();
        const userNumber = message.from;

        if (userMessage.includes('halo') || userMessage.includes('helo')) {
            console.log("✅ [STEP 1] Kondisi 'halo/helo' terpenuhi.");

            // Aksi 1: Kirim gambar dari file lokal
            try {
                // Tentukan path file secara absolut untuk menghindari kebingungan
                const imagePath = path.join(__dirname, '../../assets/DataEntry.png');
                console.log(`[DEBUG] Mencari gambar di path: ${imagePath}`);
                
                const localImage = MessageMedia.fromFilePath(imagePath);
                await client.sendMessage(userNumber, localImage);
                console.log("✅ [STEP 2] Gambar lokal terkirim.");
            } catch (err) {
                console.error("❌ [ERROR di STEP 2] Gagal mengirim gambar lokal:", err);
            }
            
            // Aksi 2: Kirim teks promosi
            try {
                const promoText = "🎉 PROMO SPESIAL! 🎉\nDapatkan diskon 25% untuk semua produk kami.";
                await client.sendMessage(userNumber, promoText);
                console.log("✅ [STEP 3] Teks promosi terkirim.");
            } catch (err) {
                console.error("❌ [ERROR di STEP 3] Gagal mengirim teks promo:", err);
            }


            // Aksi 3: Kirim tombol opsi/CTA
            try {
                const buttonBody = {
                    body: 'Apa yang ingin Anda ketahui lebih lanjut?',
                    buttons: [{ body: 'Lihat Produk' }, { body: 'Tanya CS' }],
                    title: 'Pilih Opsi'
                };
                const buttonsReply = new Buttons(buttonBody.body, buttonBody.buttons, buttonBody.title);
                await client.sendMessage(userNumber, buttonsReply);
                console.log("✅ [STEP 4] Tombol terkirim.");
            } catch (err) {
                console.error("❌ [ERROR di STEP 4] Gagal mengirim tombol:", err);
            }

        } else {
            console.log("-> Kondisi tidak terpenuhi, tidak ada balasan dikirim.");
        }
    } catch (error) {
        console.error("❌ [ERROR FATAL] Terjadi error di dalam handlerMessage:", error);
    }
};

module.exports = { handlerMessage };