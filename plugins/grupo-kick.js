let handler = async (m, { conn, args, usedPrefix, command }) => {
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : false);

    if (!user) {
        return m.reply(`*⚠️ Por favor, menciona a la persona que deseas expulsar o cita su mensaje.*\n\nEjemplo: *${usedPrefix + command} @usuario*`);
    }
    if (user === conn.user.jid) {
        return m.reply('❌ ¡No puedo expulsarme a mí mismo! Soy indispensable aquí.');
    }
    try {
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
        m.reply(`✅ *${user.split('@')[0]}* ha sido expulsado del grupo.`);
    } catch (e) {
        console.error(e);

        m.reply('⛔️ Ocurrió un error al intentar expulsar al usuario. Asegúrate de que tengo permisos de administrador y el usuario no es un administrador.');
    }
}

handler.help = ['kick @user', 'expulsar @user'];
handler.tags = ['group'];
handler.command = ['kick', 'expulsar', 'fuera'];
handler.admin = true;        // Solo administradores del grupo pueden usarlo
handler.group = true;        // Solo funciona en grupos
handler.botAdmin = true;     // El bot debe ser administrador para ejecutarlo

export default handler;
