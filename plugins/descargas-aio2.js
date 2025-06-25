/*

 - Any Downloader By KenisawaDev

*/
 import axios from "axios";
 import { URL } from "url";
 import path from "path";

let handler = async (m, { conn, args, text, usedPrefix, command }) => {

 try {
 const url = args[0];
 if (!url) {
 return m.reply(`❓ El comando está incompleto. Introduce la URL que quieres descargar.

*☆ Ejemplo:*
.dl https://www.tiktok.com/...

✨ *Servicios soportados:* ✨

- 🎵 TikTok (Video & Foto)
- 📸 Instagram (Foto & Video)
- 📘 Facebook
- 🐦 Twitter / X
- 📌 Pinterest
- ☁️ SoundCloud
- 🔥 MediaFire
- 📦 Terabox
- 🎥 YouTube (Video & Audio)

*Para YouTube, utilice el formato:*
 • \`.dl <url>\` *(para video, predeterminado)*
 • \`.dl <url> mp3\` *(para audio)*

...y otros enlaces de descarga directa!`);
 }

 const botName = "Waguri-Ai";

 // --- FUNGSI HELPER
 function formatDuration(seconds) {
 if (isNaN(seconds) || seconds < 0) return "N/A";
 // Nama variabel 'minutes' dan 'secs' ditambahkan
 const minutes = Math.floor(seconds / 60);
 const secs = Math.floor(seconds % 60);
 return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
 }

 // --- RUTE UTAMA BERDASARKAN URL ---

 // YouTube (Video & Audio)
 if (url.includes("youtube.com") || url.includes("youtu.be")) {
 const format = args[1]?.toLowerCase() || 'video';
 if (format === 'mp3' || format === 'audio') {
 await m.reply("⏳ Obteniendo audio (MP3) de YouTube...");
 const apiUrl = `https://zenz.biz.id/downloader/ytmp3?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 if (!apiResponse.status || !apiResponse.download_url) throw new Error("La API de Zenz ytmp3 no devuelve resultados válidos.");
 const { title, author, lengthSeconds, views, thumbnail, download_url } = apiResponse;
 const caption = `╭─── 「 YOUTUBE AUDIO 」\n│\n├─ 🎵 *Título:* ${title}\n├─ 👤 *Canal:* ${author}\n├─ ⏱️ *Duración:* ${formatDuration(lengthSeconds)}\n├─ ▶️ *Vistas:* ${views.toLocaleString('es-AR')}\n│\n╰─── 「 ${botName} 」`;
 await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: caption }, { quoted: m });
 await conn.sendMessage(m.chat, { audio: { url: download_url }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m });
 } else {
 await m.reply("⏳ Obteniendo video (MP4) de YouTube...");
 const apiUrl = `https://zenz.biz.id/downloader/ytmp4?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 if (!apiResponse.status || !apiResponse.download_url) throw new Error("La API de Zenz ytmp4 no devuelve resultados válidos.");
 const { title, author, lengthSeconds, views, thumbnail, download_url } = apiResponse;
 const caption = `╭─── 「 YOUTUBE VIDEO 」\n│\n├─ 🎬 *Título:* ${title}\n├─ 👤 *Canal:* ${author}\n├─ ⏱️ *Duración:* ${formatDuration(lengthSeconds)}\n├─ ▶️ *Vistas:* ${views.toLocaleString('es-AR')}\n│\n╰─── 「 ${botName} 」`;
 await conn.sendMessage(m.chat, {
 video: { url: download_url },
 caption: caption,
 mimetype: 'video/mp4',
 jpegThumbnail: (await axios.get(thumbnail, { responseType: 'arraybuffer' })).data
 }, { quoted: m });
 }

 // TikTok
 } else if (url.includes("tiktok.com")) {
 await m.reply("⏳ Obteniendo datos de vídeo de TikTok...");
 const apiUrl = `https://zenz.biz.id/downloader/tiktok?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 const videoData = apiResponse?.result?.data;
 if (!apiResponse.status || !videoData) throw new Error("La API de TikTok Zenz no proporciona datos de video válidos.");
 if (!videoData.play && (!videoData.images || videoData.images.length === 0)) throw new Error("No se encontraron videos ni imágenes multimedia.");
 if (videoData.images && videoData.images.length > 0) {
 const { title, author, music_info, images, music } = videoData;
 const caption = `╭─── 「 TIKTOK IMAGEN 」\n│\n├─ 💬 *Título:* ${title}\n├─ 👤 *Publicador:* ${author?.nickname || 'N/A'}\n├─ 🎵 *Sonido:* ${music_info?.title || 'Original Sound'}\n│\n╰─── 「 ${botName} 」`;
 await m.reply(caption);
 for (const imageUrl of images) {
 await conn.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });
 await new Promise(resolve => setTimeout(resolve, 1000));
 }
 if (music) {
 await m.reply(`🎵 Enviando sonido de TikTok...`);
 await conn.sendMessage(m.chat, { audio: { url: music }, mimetype: 'audio/mpeg' }, { quoted: m });
 }
 } else {
 const { title, play: videoUrl, author, music_info, digg_count, play_count } = videoData;
 const caption = `╭─── 「 TIKTOK VIDEO 」\n│\n├─ 💬 *Título:* ${title}\n├─ 👤 *Publicador:* ${author?.nickname || 'N/A'}\n├─ ❤️ *Likes:* ${digg_count?.toLocaleString('es-AR') || 0}\n├─ ▶️ *Vistas:* ${play_count?.toLocaleString('es-AR') || 0}\n│\n╰─── 「 ${botName} 」`;
 await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption }, { quoted: m });
 }

 // Instagram
 } else if (url.includes("instagram.com")) {
 await m.reply("⏳ Obteniendo medios de Instagram...");
 const apiUrl = `https://zenz.biz.id/downloader/instagram?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 const result = apiResponse.result;
 if (!apiResponse.status || !result) throw new Error("La API de Instagram de Zenz no devuelve resultados válidos.");
 const { name: postCaption, username, images, videos } = result;
 const mediaUrls = [...(images || []), ...(videos || [])];
 if (mediaUrls.length === 0) throw new Error("Tidak ada media yang ditemukan di postingan Instagram.");
 const caption = `╭─── 「 INSTAGRAM DOWNLOAD 」\n│\n├─ 💬 *Título:* ${postCaption || 'Sin texto'}\n├─ 👤 *Usuario:* @${username || 'N/A'}\n│\n╰─── 「 ${botName} 」`;
 let isFirstMedia = true;
 for (const mediaUrl of mediaUrls) {
 const isVideo = (new URL(mediaUrl).pathname).endsWith('.mp4');
 await conn.sendMessage(m.chat, { [isVideo ? 'video' : 'image']: { url: mediaUrl }, caption: isFirstMedia ? caption : '' }, { quoted: m });
 isFirstMedia = false;
 }

 // Facebook
 } else if (url.includes("facebook.com") || url.includes("fb.watch")) {
 await m.reply("⏳ Obteniendo videos de Facebook...");
 const apiUrl = `https://zenz.biz.id/downloader/facebook?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 if (!apiResponse.status || !apiResponse.videos) throw new Error("La API de Facebook Zenz no devuelve resultados válidos.");
 const { title = "Video Facebook", videos } = apiResponse;
 const videoData = videos.hd || videos.sd;
 if (!videoData || !videoData.url) throw new Error("Enlace de descarga de vídeo no encontrado.");
 const caption = `╭─── 「 FACEBOOK DOWNLOAD 」\n│\n├─ 🎬 *Título:* ${title}\n├─ ✨ *Calidad:* ${videos.hd ? 'HD' : 'SD'}\n├─ 📦 *Tamaño:* ${videoData.size}\n│\n╰─── 「 ${botName} 」`;
 await conn.sendMessage(m.chat, { video: { url: videoData.url }, caption: caption }, { quoted: m });

 // Twitter / X
 } else if (url.includes("twitter.com") || url.includes("x.com")) {
 await m.reply("⏳ Obteniendo medios de Twitter/X...");
 const apiUrl = `https://zenz.biz.id/downloader/twitter?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 const result = apiResponse.result;
 if (!apiResponse.status || !result?.media) throw new Error("La API de Twitter de Zenz no devuelve resultados válidos.");
 const { title: tweetText = 'Sin texto', author } = result.tweet;
 const allMedia = [...result.media.photos, ...result.media.videos];
 if (allMedia.length === 0) throw new Error("No hay medios en este tweet.");
 const caption = `╭─── 「 TWITTER DOWNLOAD 」\n│\n├─ 💬 *Tweet:* ${tweetText}\n├─ 👤 *Autor:* @${author || 'N/A'}\n│\n╰─── 「 ${botName} 」`;
 let isFirst = true;
 for (const media of allMedia) {
 await conn.sendMessage(m.chat, { [media.type.startsWith('video') ? 'video' : 'image']: { url: media.url }, caption: isFirst ? caption : '' }, { quoted: m });
 isFirst = false;
 }

 // Pinterest
 } else if (url.includes("pinterest.com")) {
 await m.reply("⏳ Obteniendo los medios de Pinterest...");
 const apiUrl = `https://zenz.biz.id/downloader/pinterest?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 const results = apiResponse.result;
 if (!apiResponse.status || !Array.isArray(results) || results.length === 0) throw new Error("La API de Pinterest Zenz no devuelve resultados válidos.");
 const bestResult = results[0];
 const mediaType = bestResult.tag === 'video' ? 'video' : 'image';
 const caption = `╭─── 「 PINTEREST DOWNLOAD 」\n│\n├─ ✨ *Calidad:* ${bestResult.quality || 'Mejor'}\n├─ 🎞️ *Tipo:* ${mediaType.toUpperCase()}\n│\n╰─── 「 ${botName} 」`;
 await conn.sendMessage(m.chat, { [mediaType]: { url: bestResult.direct }, caption: caption }, { quoted: m });

 // SoundCloud
 } else if (url.includes("soundcloud.com")) {
 await m.reply("⏳ Obteniendo audio de SoundCloud...");
 const apiUrl = `https://zenz.biz.id/downloader/soundcloud?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 if (!apiResponse.status || !apiResponse.audio_url) throw new Error("La API de SoundCloud Zenz no devuelve resultados válidos.");
 const { title = 'SoundCloud Audio', author = 'N/A', duration = 'N/A', thumbnail, audio_url } = apiResponse;
 const caption = `╭─── 「 SOUNDCLOUD DOWNLOAD 」\n│\n├─ 🎵 *Titulo:* ${title}\n├─ 👤 *Artista:* ${author}\n├─ ⏱️ *Duración:* ${duration}\n│\n╰─── 「 ${botName} 」`;
 await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: caption }, { quoted: m });
 await conn.sendMessage(m.chat, { audio: { url: audio_url }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m });

 // MediaFire
 } else if (url.includes("mediafire.com")) {
 await m.reply("⏳ Obteniendo archivos de MediaFire...");
 const apiUrl = `https://zenz.biz.id/downloader/mediafire?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 const result = apiResponse.result;
 if (!apiResponse.status || !result?.download) throw new Error("La API de MediaFire Zenz no devuelve resultados válidos.");
 const { filename, size, created, mimetype, download: link } = result;
 const uploadDate = new Date(created || Date.now()).toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' });
 const caption = `╭─── 「 MEDIAFIRE DOWNLOAD 」\n│\n├─ 📂 *Nombre:* ${filename || 'file'}\n├─ 📦 *Tamaño:* ${size || 'N/A'}\n├─ 📅 *Subido:* ${uploadDate}\n├─ 📑 *Tipo:* ${mimetype || 'application/octet-stream'}\n│\n╰─── 「 ${botName} 」`;
 await conn.sendMessage(m.chat, { document: { url: link }, mimetype: mimetype, fileName: filename, caption: caption }, { quoted: m });

 // Terabox
 } else if (url.includes("terabox.com")) {
 await m.reply("⏳ Obteniendo archivos de Terabox...");
 const apiUrl = `https://zenz.biz.id/downloader/terabox?url=${encodeURIComponent(url)}`;
 const { data: apiResponse } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
 const result = apiResponse.result;
 if (!apiResponse.status || !result?.direct_url) throw new Error("La API de Terabox Zenz no devuelve resultados válidos.");
 const { filename = 'terabox_video.mp4', size, thumb, direct_url: link } = result;
 const sizeInMB = size ? (parseInt(size) / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A';
 const caption = `╭─── 「 TERABOX DOWNLOAD 」\n│\n├─ 📂 *Título:* ${filename}\n├─ 📦 *Tamaño:* ${sizeInMB}\n│\n╰─── 「 ${botName} 」`;
 await conn.sendMessage(m.chat, { image: { url: thumb }, caption: caption }, { quoted: m });
 await conn.sendMessage(m.chat, { video: { url: link }, mimetype: 'video/mp4', fileName: filename }, { quoted: m });

 } else {
 // Fallback untuk link lain
 await m.reply("⏳ Enlace no reconocido, intentando descargar como archivo genérico...");
 const { data: fileBuffer, headers } = await axios.get(url, { responseType: 'arraybuffer', headers: { 'User-Agent': 'Mozilla/5.0' } });
 const mimeType = headers['content-type'] || 'application/octet-stream';
 const fileName = path.basename(new URL(url).pathname) || `downloaded_file`;
 const caption = `╭─── 「 FILE DOWNLOAD 」\n│\n├─ 📂 *Nombre:* ${fileName}\n├─ 📑 *Tipo:* ${mimeType}\n│\n╰─── 「 Descarga directa 」`;
 await conn.sendMessage(m.chat, { document: fileBuffer, mimetype: mimeType, fileName: fileName, caption: caption }, { quoted: m });
 }

 } catch (error) {
 console.error("Error en el comando:", error);
 m.reply(`❌ No se pudo procesar la solicitud.\n\n*Razón:* ${error.message}`);
 }
}
handler.help = ['anydownloader2 <url>'];
handler.tags = ['descargas'];
handler.command = ["aio2","anydownloader2","allinone2"];

export default handler
}
