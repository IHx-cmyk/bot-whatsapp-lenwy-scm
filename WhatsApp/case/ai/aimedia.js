/*  

  Made By Ditzzy
  Base : Lenwy
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/ilenwy
  Youtube : @Lenwy

  Channel : https://whatsapp.com/channel/0029VaGdzBSGZNCmoTgN2K0u

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

import axios from "axios";
import FormData from "form-data";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";

export const info = {
  name: "AI Media",

  menu: ["Hd"],
  case: ["hd", "remini"],

  description: "AI Untuk Media Seperti Photo",
  hidden: false,

  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,

  allowPrivate: false,
};

async function enhancer(buffer, { method = 1, size = "low" } = {}) {
  const availableSizes = ["low", "medium", "high"];

  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error("Image buffer is required");
  }

  if (method < 1 || method > 4) {
    throw new Error("Available methods: 1, 2, 3, 4");
  }

  if (!availableSizes.includes(size)) {
    throw new Error(`Available sizes: ${availableSizes.join(", ")}`);
  }

  const form = new FormData();
  form.append("method", method.toString());
  form.append("is_pro_version", "false");
  form.append("is_enhancing_more", "false");
  form.append("max_image_size", size);
  form.append("file", buffer, `${Date.now()}.jpg`);

  try {
    const response = await axios.post(
      "https://ihancer.com/api/enhance",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "accept-encoding": "gzip",
          host: "ihancer.com",
          "user-agent": "Dart/3.5 (dart:io)",
        },
        responseType: "arraybuffer",
      }
    );

    return Buffer.from(response.data);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}

async function downloadImage(message) {
  const stream = await downloadContentFromMessage(message, "image");

  let buffer = Buffer.from([]);

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  return buffer;
}

export default async function handler(leni) {
  const { command, msg, lenwy, replyJid, LenwyText } = leni;

  switch (command) {
    case "hd":
    case "remini":
      {
        const quoted = msg.message?.extendedTextMessage?.contextInfo;
        const quotedMsg = quoted?.quotedMessage;

        if (!quotedMsg?.imageMessage) {
          return LenwyText("⚠️ Reply Gambar Dengan *hd* atau *remini*");
        }

        try {
          const buffer = await downloadImage(quotedMsg.imageMessage);

          const enhancedImage = await enhancer(buffer, { method: 1, size: "high" });

          await lenwy.sendMessage(replyJid, {
            image: enhancedImage,
            caption: "🎁 Gambar Berhasil Ditingkatkan",
          });
        } catch (err) {
          console.error("Enhancer Error:", err);
          return LenwyText("❌ Gagal Meningkatkan Gambar.");
        }
      }
      break;
  }
}
