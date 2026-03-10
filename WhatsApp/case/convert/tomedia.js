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

import sharp from "sharp";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";

export const info = {
  name: "Toimage",
  menu: ["Toimage"],
  case: ["toimg", "toimage"],
  description: "Mengubah Sticker Menjadi Gambar",
  hidden: false,
  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,
  allowPrivate: true,
};

async function downloadSticker(message) {
  const stream = await downloadContentFromMessage(message, "sticker");

  let buffer = Buffer.from([]);

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  return buffer;
}

export default async function handler(leni) {
  const { command, msg, lenwy, replyJid, LenwyText } = leni;

  switch (command) {
    case "toimg":
    case "toimage":
      {
        const quoted = msg.message?.extendedTextMessage?.contextInfo;
        const quotedMsg = quoted?.quotedMessage;

        if (!quotedMsg?.stickerMessage) {
          return LenwyText("⚠️ Reply Sticker Dengan *Toimg*");
        }

        try {
          const buffer = await downloadSticker(quotedMsg.stickerMessage);

          const image = await sharp(buffer).png().toBuffer();

          await lenwy.sendMessage(replyJid, {
            image,
            caption: "🎁 Sticker Berhasil Diubah Menjadi Gambar",
          });
        } catch (err) {
          console.error("ToImg Error:", err);
          return LenwyText("❌ Gagal Convert Sticker.");
        }
      }
      break;
  }
}
