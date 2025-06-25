import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    let grupos = "*Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad* ⭐\n\n" +
                 "1-•          𝐌𝐚𝐮/ 𝟑𝟑𝟑\n" +
                 "*✰* https://chat.whatsapp.com/CBuLXuVZcg9FEfCSHiY6b0" +
                 "*─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ*\n\n" +
                 "➠ Enlace anulado? entre aquí! \n\n" +
                 "⭐ Canal :\n" +
                 "*✰*https://whatsapp.com/channel/0029Vb8kvXUBfxnzYWsbS81I" +
                 "> By •          𝐌𝐚𝐮/ 𝟑𝟑𝟑";

    // Asegúrate de definir 'imagen2' correctamente antes de usarlo
    let imagen2 = 'https://qu.ax/Mvhfa.jpg';

    // Define los emojis que quieres usar
    let emojis = '🍁';

    await conn.sendFile(m.chat, imagen2, "ian.jpg", grupos, m, null, );
    await m.react(emojis);
}

handler.help = ['grupos'];
handler.tags = ['main'];
handler.command = ['grupos', 'iangrupos', 'gruposian'];

export default handler;
