import axios from 'axios';

const handler = async (m, { conn, args, usedPrefix, command}) => {
  if (!args[0]) {
    return conn.reply(m.chat, `❌ *Uso incorrecto:*\n${usedPrefix + command} <término de búsqueda>\n\nEjemplo:\n${usedPrefix + command} miku kawaii`, m);
}

  const query = encodeURIComponent(args.join(" "));
  const apiUrl = `https://api.siputzx.my.id/api/s/pinterest?query=${query}`;

  try {
    await m.react("🔍");
    const response = await axios.get(apiUrl);
    const data = response.data.data;

    if (!data || data.length === 0) {
      return conn.reply(m.chat, `⚠️ *No se encontraron imágenes para:* ${args.join(" ")}`, m);
}

    // Elegir 5 imágenes aleatorias únicas
    const randomImages = [];
    const usedIndices = new Set();

    while (randomImages.length < 5 && usedIndices.size < data.length) {
      const index = Math.floor(Math.random() * data.length);
      if (!usedIndices.has(index)) {
        usedIndices.add(index);
        randomImages.push(data[index].images_url);
}
}

    for (let i = 0; i < randomImages.length; i++) {
      await conn.sendMessage(m.chat, {
        image: { url: randomImages[i]},
        caption: `📌 *Resultado ${i + 1}/5 para:* _${args.join(" ")}_`,
}, { quoted: m});
}

    await m.react("✅");

} catch (error) {
    await m.react("💥");
    console.error("❌ Error al obtener imágenes de Pinterest:", error);
    await conn.reply(m.chat, "🚫 *Hubo un problema al buscar en Pinterest. Intenta de nuevo más tarde.*", m);
}
};

handler.command = ["pin"];
export default handler;
