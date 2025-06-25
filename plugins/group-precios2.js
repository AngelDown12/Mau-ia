// Código Hecho Por •          𝐌𝐚𝐮/ 𝟑𝟑𝟑
let handler = async (m, { conn }) => {
    // React con un emoji al mensaje
    await m.react('⭐');

    // Mensaje que se enviará
    const message = `
*¡AQUÍ ESTÁN LOS PRECIOS!*

1 BOT = 3$
2 BOT = 6$
3 BOT = 9$
4 BOT = 12$
5 BOT = 15$

> Bot Para Grupos ⭐`;

    if (m.isGroup) {
        // URL de la imagen
        const imageUrl ='https://qu.ax/iVZTn.jpg'; // Cambia esta URL por la de la imagen que deseas enviar

        // Envía la imagen con el mensaje
        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
    }
}

handler.help = ['precios2'];
handler.tags = ['main'];
handler.group = true;
handler.command = ['precios2', 'p2'];

export default handler;
