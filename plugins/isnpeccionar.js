let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Validar que se ha proporcionado un enlace
    if (!text) {
        return conn.reply(m.chat, `*Uso correcto:* ${usedPrefix}${command} https://whatsapp.com/channel/0029Va6InNBFCCoM9xzKFG3G`, m);
    }

    // Validar el formato del enlace del canal
    const channelRegex = /https:\/\/whatsapp\.com\/channel\/([0-9A-Za-z]+)/i;
    const match = text.match(channelRegex);

    if (!match) {
        return conn.reply(m.chat, `*Enlace inválido:* Por favor, proporciona un enlace de canal de WhatsApp válido.`, m);
    }

    const channelId = match[1];

    try {
        // Obtener metadatos del canal usando la API de WhatsApp
        const info = await conn.newsletterMetadata("invite", channelId);

        // Formatear la fecha de creación
        const creationDate = new Date(info.creation_time * 1000);
        const formattedDate = creationDate.toLocaleDateString("es-ES", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Construir el mensaje de respuesta con la información del canal
        let responseText = `
*╭┈┈┈「 🌿 Información del Canal 🌿 」┈┈┈╮*
*┆*
*┆ 📝 Nombre:* ${info.name || 'No disponible'}
*┆ 🆔 ID:* ${info.id || 'No disponible'}
*┆ 📍 Estado:* ${info.state || 'No disponible'}
*┆ 🗓️ Creado:* ${formattedDate}
*┆ 🔗 Enlace:* https://whatsapp.com/channel/${info.invite || 'No disponible'}
*┆ 👥 Seguidores:* ${info.subscribers || 0}
*┆ ✅ Verificado:* ${info.verified ? "Sí" : "No"}
*┆*
*┆ 📄 Descripción:* *┆* ${info.description || "Sin descripción disponible."}
*┆*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯*
        `.trim();

        // Enviar el mensaje con la información
        await conn.reply(m.chat, responseText, m);
        m.react("✅"); // Reaccionar al mensaje indicando éxito

    } catch (error) {
        console.error("Error al obtener información del canal:", error);
        await conn.reply(m.chat, `*Error al procesar la solicitud:* No se pudo obtener la información del canal. Asegúrate de que el enlace sea correcto y el canal exista. Detalle: ${error.message}`, m);
    }
};

handler.command = ["infocanal", "channelinfo", "canalinfo"];
handler.help = ["infocanal <link>"];
handler.tags = ["tools"];

export default handler;
