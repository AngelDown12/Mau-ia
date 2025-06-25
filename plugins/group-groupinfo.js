let handler = async (m, { conn, participants, groupMetadata}) => {
  try {
    const chat = global.db.data.chats[m.chat] || {};
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del} = chat;

    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `  ${i + 1}. @${v.id.split('@')[0]}`).join('\n');
    const ownerId = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    const text = `
╭━━━〔 *📋 INFORMACIÓN DEL GRUPO* 〕━━━╮
┃👥 *Nombre:* ${groupMetadata.subject}
┃🆔 *ID:* ${groupMetadata.id}
┃👤 *Creador:* @${ownerId.split('@')[0]}
┃👪 *Miembros:* ${participants.length}
┃🛠️ *Administradores:*
┃${listAdmin}
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 ⚙️ *CONFIGURACIONES* 〕──╮
┃🚫 *Baneado:* ${isBanned? '✅': '❎'}
┃👋 *Bienvenida:* ${welcome? '✅': '❎'}
┃🕵️ *Detector:* ${detect? '✅': '❎'}
┃🗑️ *Anti Delete:* ${!del? '✅': '❎'}
┃🔗 *Anti Link:* ${antiLink? '✅': '❎'}
╰──────────────────────────╯

╭──〔 📨 *MENSAJES PERSONALIZADOS* 〕──╮
┃👋 *Bienvenida:* ${sWelcome || '-'}
┃👋 *Despedida:* ${sBye || '-'}
┃📈 *Promociones:* ${sPromote || '-'}
┃📉 *Degradaciones:* ${sDemote || '-'}
╰────────────────────────────────────╯

📜 *Descripción:*
${groupMetadata.desc?.toString() || 'Sin descripción definida.'}
`.trim();

    await conn.sendMessage(m.chat, { text, mentions: [...groupAdmins.map(v => v.id), ownerId]}, { quoted: m});

} catch (e) {
    console.error(e);
    conn.reply(m.chat, '⚠️ Ocurrió un error al obtener la información del grupo.', m);
}
};

handler.help = ['infogp'];
handler.tags = ['group'];
handler.command = ['infogrupo', 'groupinfo', 'infogp'];
handler.group = true;

export default handler;
