/*  

  Made By Lenwy
  Base : Lenwy
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/ilenwy
  Youtube : @Lenwy

  Channel : https://whatsapp.com/channel/0029VaGdzBSGZNCmoTgN2K0u

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

import axios from "axios";
import path from "path";
import fs from "fs";

export const info = {
  name: "Youtube Downloader",

  menu: ["Ytmp4"],
  case: ["yt", "ytmp4"],

  description: "Penjelasan Singkat Fitur",
  hidden: false,

  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,

  allowPrivate: false,
};

// Handler Utama
export default async function handler(leni) {
  const { command, q, lenwy, len, replyJid, LenwyText, LenwyWait } = leni;

  const youtubeRegex = /(?:youtu\.be\/|v=|v\/|embed\/|shorts\/)([\w-]{11})/i;

  switch (command) {
    case "yt":
    case "ytmp4":
      {
        if (!q) return LenwyText(`⚠ *Mana Link YouTube-nya?*`);

        if (!youtubeRegex.test(q))
          return LenwyText("❌ *Link YouTube Tidak Valid.*");

        const tempDir = path.join(process.cwd(), "temp");
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        LenwyWait();

        try {
          const apiUrl = `https://api.fromscratch.web.id/v1/api/down/youtube?url=${encodeURIComponent(q)}&type=mp4&format=720`;
          const { data: response } = await axios.get(apiUrl);

          if (response.status !== 200 || !response.data) {
            return LenwyText("❌ *Terjadi Masalah*");
          }

          const { title, thumbnail, quality, download_url } = response.data;
          // const captionText = `*🎁 Lenwy YouTube Downloader (Video)*`;

          // await lenwy.sendMessage(replyJid, {
          //     image: { url: thumbnail },
          //     caption: captionText
          // }, { quoted: len });

          const videoRes = await axios.get(download_url, {
            responseType: "arraybuffer",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            },
          });

          const fileName = `yt_${Date.now()}.mp4`;
          const filePath = path.join(tempDir, fileName);
          fs.writeFileSync(filePath, Buffer.from(videoRes.data));

          await lenwy.sendMessage(
            replyJid,
            {
              video: fs.readFileSync(filePath),
              mimetype: "video/mp4",
              fileName: `${title}.mp4`,
              caption: `*🎁 Lenwy YouTube Downloader (Video)*`,
            },
            { quoted: len },
          );
        } catch (error) {
          console.error("Error YTMP4:", error);
          LenwyText(`❌ *Error:*\n${error.message}`);
        }
      }
      break;
  }
}
