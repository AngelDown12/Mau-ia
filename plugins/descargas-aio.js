/*

 Any Downloader By KenisawaDev

*/
import * as cheerio from 'cheerio';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) throw m.reply(`✧ Ejemplo: ${usedPrefix}${command} <url>
*LISTA DE MEDIOS SOPORTADOS*

\`\`\`9GAG Video Downloader
Bandcamp Music Downloader
Bilibili Video Downloader
Bitchute Video Downloader
Blogger Video Downloader
Bluesky Video/Photo Downloader
BluTV Video Downloader
Buzzfeed Video Downloader
CapCut Video Downloader
Chingari Video Downloader
Dailymotion Video Downloader
Douyin Video Downloader
ESPN Video Downloader
Facebook Video Downloader
Febspot Video Downloader
Flickr Video Downloader
Gaana Music Downloader
Ifunny Video Downloader
IMDB Video Downloader
Imgur Video Downloader
Instagram Video/Photo Downloader
Izlesene Video Downloader
Kickstarter Video Downloader
Kinemaster Video Downloader
Kuaishou Video/Audio Downloader
Kwai Video Downloader
Lemon8 Video Downloader
Likee Video Downloader
LinkedIn Video Downloader
Loom Video Downloader
Mashable Video Downloader
Mastodon Video Downloader
Mixcloud Music Downloader
Moj Video Downloader
MxTakatak Video Downloader
Ok.ru(Odnoklassniki) Video Downloader
Odysee Video Downloader
Pinterest Video/Photo Downloader
PuhuTV Video Downloader
Reddit Video Downloader
Rumble Video Downloader
ShareChat Video Downloader
Snapchat Video Downloader
Soundcloud Music Downloader
Streamable Video Downloader
Substack Video Downloader
Suno AI Music Downloader
TED Video Downloader
Telegram Video Downloader
Threads Video/Photo Downloader
Tiktok Video Downloader
Tumblr Video Downloader
Twitch Video Downloader
X(Twitter) Video/Photo Downloader
Vimeo Video Downloader
VK(VKontakte) Video Downloader
Xiaohongshu(RedNote) Video/Photo Downloader\`\`\``);
 try {
            if (!args[0]) return m.reply("[✧] Por favor envía el enlace del la plataforma que deseas descargar!")
            const keni = await rednoteDownloader.download(args[0]);
            console.log(JSON.stringify(keni, null, 2));
            let { result, source } = keni;
            let { title, duration } = result;
            let { url, quality } = result.downloadUrls[1];
            if (!keni.result || !result.downloadUrls) {
                return m.reply("[✧] No se pudo descargar el contenido de TikTok");
            }
            const caption = `*💎 ANY VIDEO DOWNLOADER 💎*

  ✧ : \`titulo;\` ${title || 'no encontrado'}
  ✧ : \`plataforma;\` ${source || 'no encontrado'}
  ✧ : \`calidad;\` ${quality || 'no encontrado'}
  ✧ : \`duracion;\` ${duration || 'no encontrado'}

> url: ${args[0]}
> ${wm}`

            if (keni.result.downloadUrls[1].extension === "mp4") {
                const videoUrl = keni.result.downloadUrls[1].url
                await conn.sendMessage(
        m.chat,
        {
          video: { url: url },
          mimetype: 'video/mp4',
          fileName: title + " • " + source + '.mp4',
          caption: caption,
          mentions: [m.sender],
        },
        { quoted: m }
      );
            } else {
                m.reply("[✧] Formato de contenido no reconocido");
            }
      if (keni.result.downloadUrls[2].extension === "mp3") {
            const AudioUrl = keni.result.downloadUrls[2].url

                await conn.sendMessage(
        m.chat,
        {
          audio: { url: AudioUrl },
          mimetype: 'audio/mp4',
          fileName: title + " • " + source + '.mp3',
          mentions: [m.sender],
        },
        { quoted: m }
      );
      }
        } catch (err) {
            console.log(err)
        }
}
handler.help = ['anydownloaser <url>'];
handler.tags = ['descargas'];
handler.command = ["aio","anydownloaser","allinone"];

export default handler

const rednoteDownloader = {
  getToken: async function () {
    const req = await fetch("https://anydownloader.com/en/xiaohongshu-videos-and-photos-downloader");
    if (!req.ok) return null;

    const res = await req.text();
    const $ = cheerio.load(res);
    const token = $("#token").val();

    return {
      token
    };
  },

  calculateHash: function (url, salt) {
    return btoa(url) + (url.length + 1_000) + btoa(salt)
  },

  download: async function (url) {
    const conf = await rednoteDownloader.getToken();
    if (!conf) return { error: "No se pudo obtener el token de la web.", result: {} };

    const { token } = conf;

    const hash = rednoteDownloader.calculateHash(url, "aio-dl");

    const data = new URLSearchParams();
    data.append('url', url);
    data.append('token', token);
    data.append('hash', hash);

    const req = await fetch(`https://anydownloader.com/wp-json/aio-dl/video-data/`, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7,as;q=0.6",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Dnt": "1",
        "Origin": "https://anydownloader.com",
        "Referer": "https://anydownloader.com/en/xiaohongshu-videos-and-photos-downloader",
        "Sec-Ch-Ua": `"Not-A.Brand";v="99", "Chromium";v="124"`,
        "Sec-Ch-Ua-Mobile": "?1",
        "Sec-Ch-Ua-Platform": `"Android"`,
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: data
    });

    if (!req.ok) return { error: "Se produjo un error al realizar la solicitud", result: {} };

    let json;
    try {
      json = await req.json();
    } catch (e) {
      console.error(e);
      return { error: e.message, result: {} };
    }

    return {
      input_url: url,
      source: json.source,
      result: {
        title: json.title,
        duration: json.duration,
        thumbnail: json.thumbnail,
        downloadUrls: json.medias
      },
      error: null
    };
  }
};
