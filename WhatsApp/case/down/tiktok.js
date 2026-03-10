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

export const info = {
  name: "Tiktok Downloader",

  menu: ["Tiktok"],
  case: ["tt", "ttdl", "tiktok"],

  description: "Downloader TikTok",
  hidden: false,

  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,

  allowPrivate: false,
};

export default async function handler(lenwy) {
  const { command, q, LenwyText, LenwyWait, LenwyVideo } = lenwy;

  const tiktokRegex = /^(https?:\/\/)?(www\.|vt\.|vm\.)?tiktok\.com\/.+/i;

  switch (command) {
    case "tt":
    case "ttdl":
    case "tiktok": {
      if (!q) return LenwyText("⚠ *Mana Link Tiktoknya?*");

      if (!tiktokRegex.test(q))
        return LenwyText("❌ *Link TikTok Tidak Valid.*");

      LenwyWait();

      try {
        const encodedUrl = encodeURIComponent(q.trim());
        const apiUrl = `https://api.fromscratch.web.id/v1/api/down/tiktok?url=${encodedUrl}`;

        const { data: response } = await axios.get(apiUrl);

        if (response.status !== 200 || !response.data?.no_watermark)
          return LenwyText("❌ Gagal mengunduh video.");

        const videoUrl = response.data.no_watermark;

        await LenwyVideo(
          videoUrl,
          `*🎁 Lenwy Tiktok Downloader*\n*[+] Powered by api.fromscratch.web.id*`,
        );
      } catch (error) {
        console.error("TTDL Error:", error?.response?.data || error.message);
        LenwyText("❌ Gagal mengunduh video TikTok.");
      }
      break;
    }
  }
}
