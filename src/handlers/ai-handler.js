// 1. Muat variabel dari file .env
require('dotenv').config();

// 2. Impor dan siapkan library Google AI
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateResponse = async (userMessage) => {
    const businessContext = `... (konteks bisnis Anda tetap di sini) ...`;

    const prompt = `
        Anda adalah asisten CS cerdas. Tugas Anda adalah mengubah pertanyaan pengguna menjadi serangkaian aksi dalam format JSON.
        Setiap aksi adalah sebuah objek dengan "type" dan "payload".
        Type yang valid: "text", "image", "buttons".

        - Jika sapaan, balas dengan "text".
        - Jika bertanya tentang promo, balas dengan "image" berisi URL gambar promo, lalu "text" berisi detail promo, dan terakhir "buttons" untuk opsi.
        - Jika di luar konteks, balas dengan "text" berisi pesan penolakan.

        --- KONTEKS ---
        ${businessContext}
        URL Gambar Promo: ./assets/DataEntry.png 
        ---

        Pertanyaan Pengguna: "${userMessage}"

        Balas HANYA dengan array JSON, jangan ada teks lain.
        Contoh balasan untuk "halo":
        [
            { "type": "text", "payload": { "message": "Halo juga! Ada yang bisa saya bantu?" } }
        ]
        Contoh balasan untuk "promo apa hari ini?":
        [
            { "type": "image", "payload": { "path": "./assets/DataEntry.png" } },
            { "type": "text", "payload": { "message": "🎉 PROMO SPESIAL! 🎉 Dapatkan diskon 25% untuk semua produk kami." } },
        ]
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;

        // Bersihkan output AI agar hanya tersisa JSON, lalu parse
        const jsonString = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error saat mem-parsing JSON dari AI:", error);
        return [{ type: 'text', payload: { message: "Maaf, sistem AI kami sedang ada kendala." } }];
    }
};

module.exports = { generateResponse };