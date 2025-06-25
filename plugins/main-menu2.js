let handler = async (m, { isPrems, conn }) => {
  let img = 'https://files.catbox.moe/ltq7ph.jpg';
  let texto = `🎧 *M E N Ú   D E   A U D I O S* 🎧

🎵 _Tunometecabrasaramambiche_
🕵️ _Me Anda Buscando Anonymous_
😂 _Se Están Riéndo de Mí_
🔥 _Esto Va Ser Épico Papus_
📜 _En Caso De Una Investigación_
🎭 _Elmo Sabe Dónde Vives_
💉 _Diagnosticado Con Gay_
📢 _Esto Va Para Ti_
🎉 _Feliz Cumpleaños_
😡 _Maldito Teni_
🧔 _Conoces a Miguel_
🙈 _Usted es Feo_
🫶 _Como Están_
💔 _Verdad Que Te Engañe_
🦍 _Hermoso Negro_
💍 _Vivan Los Novios_
🚓 _Usted Está Detenido_
🧠 _Su Nivel De Pendejo_
🤖 _¿Quién Es Tu Botsito?_
🚫 _No Digas Eso Papus_
⚔️ _No Me Hagas Usar Esto_
🙉 _No Me Hables_
🧃 _No Chúpala_
❓ _Nadie Te Preguntó_
🗑️ _Mierda De Bot_
🌈 _Marica Tú_
📣 _Ma Ma Masivo_
📿 _La Oración_
🩹 _Lo Paltimos_
🙏 _Jesucristo_
🤓 _Juicioso_
🍜 _Homero Chino_
⏱️ _Hora De Sexo_
😳 _Gemidos_
🎤 _Gaspi Y La Minita_
🎙️ _Gaspi Frase_
🥵 _Goku Pervertido_
🧐 _Fino Señores_
🎄 _Feliz Navidad_
🐸 _El Pepe_
💔 _El Tóxico_
🎬 _Corte Corte_
📱 _Cámbiate A Movistar_
🌙 _Buenas Noches_
📞 _Bueno Sí_
☀️ _Buenos Días_
👋 _Bienvenido Wey_
🧠 _Bien Pensado Woody_
🚫 _Baneado_
💯 _Basado_
😼 _Ara Ara_
👾 _Amongos_
🙄 _A Nadie Le Importa_
🔞 _Audio Hentai_
⏳ _Aguanta_
😱 _OMG_
🍭 _Onichan_
💬 _Órale_
📦 _Pasa Pack_
⚡ _Pikachu_
🎮 _Pokémon_
🧪 _Potasio_
🐯 _Rawr_
⚽ _Siuuu_
💃 _Takataka_
🤡 _Tarado_
❤️ _Te Amo_
📲 _TKA_
🦆 _Un Pato_
😵 _WTF_
🛑 _Yamete_
🤷 _Yokese_
🦖 _Yoshi_
💤 _ZZZZ_
👶 _Bebesita_
🙊 _Calla Fan De BTS_
😆 _Chiste_
📝 _Contexto_
💩 _Cagaste_
🍕 _Delivery_
🔍 _Dónde Está_
😠 _Enojado_
🚪 _Entrada_
🎊 _Es Viernes_
😢 _Estoy Triste_
🇦🇷 _Feriado_
🔥 _Free Fire_
📨 _Háblame_
👀 _Hey_
🎧 _In Your Area_
🗯️ _Joder_
😅 _Me Olvidé_
😬 _Me Pican Los Cocos_
🏃 _Me Voy_
🤔 _Mmmm_
😂 _Momento XDS_
📈 _Motivación_
🎶 _Nico Nico_
😔 _No Estés Tite_
🎸 _No Rompas Más_
🧠 _Qué Onda_
🤮 _Se Pudrió_
🎼 _Temazo_
🩲 _Tengo Los Calzones_
👗 _Tráiganle Una Falda_
❓ _Una Pregunta_
🚷 _Vete A La VRG_
🎭 _:V_`;

  // It's generally better to define fkontak directly within the handler if it's dynamic
  // based on the current message sender.
  const fkontak = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Halo',
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
    participant: '0@s.whatsapp.net',
  };

  await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak);

  // Ensure global.db.data.users[m.sender] exists before trying to assign to it.
  // This prevents potential errors if the user isn't in the database yet.
  if (global.db && global.db.data && global.db.data.users) {
    global.db.data.users[m.sender] = global.db.data.users[m.sender] || {}; // Initialize if undefined
    global.db.data.users[m.sender].lastcofre = new Date() * 1;
  } else {
    console.warn("Warning: global.db.data.users is not accessible. 'lastcofre' might not be saved.");
  }
};

handler.help = ['menuaudios2'];
handler.tags = ['main'];
handler.command = ['menuaudios2', 'menu2'];

export default handler;
