const handler = async (m, { conn, args}) => {
  if (!args[0]) {
    return m.reply(`📌 Ingresa el enlace de invitación de una comunidad o canal.\n\nEjemplo:\n.ins https://chat.whatsapp.com/xxxxx`);
}

  const url = args[0];
  const code = url.split("/").pop().trim();

  if (!code || code.length < 6) return m.reply("❌ Enlace inválido.");

  try {
    await conn.groupAcceptInvite(code);
    await new Promise(r => setTimeout(r, 3000)); // tiempo para que se actualicen los chats

    const chats = conn.chats;
    const candidatos = Object.entries(chats).filter(([id, data]) =>
      (data?.inviteCode === code) ||
      id.includes("g.us") && (data?.name || "").toLowerCase().includes("newsletter") ||
      id.includes("nestewall") ||
      data?.subject?.toLowerCase().includes("canal") ||
      data?.subject?.toLowerCase().includes("comunidad")
);

    if (!candidatos.length) return m.reply("⚠️ No se pudo identificar el ID. El bot puede no tener acceso completo aún.");

    const [id, info] = candidatos[0];
    const name = info?.name || info?.subject || "Sin nombre";
    const tipo = id.includes("nestewall")? "📢 Canal (Newsletter)"
: id.startsWith("120363")? "👥 Comunidad"
: "👤 Grupo común";

    return m.reply(`🔎 *Resultado de inspección:*

📛 *Nombre:* ${name}
🆔 *ID:* ${id}
📌 *Tipo:* ${tipo}`);
} catch (e) {
    console.error("❌ Error inspeccionando:", e);
    return m.reply("❌ No se pudo unir o extraer el ID. Verifica que el enlace esté activo y que el bot tenga permisos.");
}
};

handler.command = ["ins"];
handler.help = ["ins <enlace de invitación>"];
handler.tags = ["tools"];
export default handler;
