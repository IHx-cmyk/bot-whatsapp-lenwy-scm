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
import { writeExif } from "../../lib/exif.js";

export const info = {
  name: "Brat",

  menu: ["Brat"],
  case: ["brat"],

  description: "Brat Sticker",
  hidden: false,

  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,

  allowPrivate: false,
};

export default async function handler(leni) {
  const { command, q, lenwy, len, replyJid, LenwyText } = leni;

  switch (command) {
    case "brat":
      {
        if (!q)
          return LenwyText(
            "⚠ *Masukkan Teks Yang Ingin Diubah.*\n\nContoh : *.brat Lenwy Keren*",
          );

        try {
          const encodedText = encodeURIComponent(q.trim());
          const apiUrl = `https://api.fromscratch.web.id/v1/api/generate/brat?text=${encodedText}`;

          const { data: response } = await axios.get(apiUrl);

          if (response.status !== 200 || !response.data?.imageUrl) {
            console.error("API Brat Error Response:", response);
            return LenwyText(
              `❌ *Gagal Membuat Brat:*\nStatus: ${response.message || "Error tidak diketahui"}`,
            );
          }

          const imageUrl = response.data.imageUrl;

          const { data: imageBuffer } = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });

          if (!imageBuffer || imageBuffer.length === 0) {
            return LenwyText("❌ Gagal Mengunduh Gambar Hasil Brat.");
          }

          const stickerPath = await writeExif(
            {
              mimetype: "image/jpeg",
              data: imageBuffer,
            },
            { packname: globalThis.spackname, author: globalThis.sauthor },
          );

          await lenwy.sendMessage(
            replyJid,
            { sticker: { url: stickerPath } },
            { quoted: len },
          );
        } catch (error) {
          console.error("Error Brat Generator via API:", error.message);
          LenwyText(`❌ *Terlalu Banyak Request, Harap Memberi Jeda.*`);
        }
      }
      break;
  }
}
