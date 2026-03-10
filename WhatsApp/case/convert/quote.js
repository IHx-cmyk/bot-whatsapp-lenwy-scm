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
  name: "Quote Sticker",
  menu: ["Quote"],
  case: ["qc", "quote"],
  description: "Membuat Sticker Quote",
  hidden: false,
  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,
  allowPrivate: true,
};

export default async function handler(leni) {
  const { command, msg, lenwy, replyJid, args, LenwyText } = leni;

  switch (command) {
    case "qc":
    case "quote":
      {
        const text = args.join(" ");

        if (!text) {
          return LenwyText("*Contoh: .Qc Halo Lenwy*");
        }

        try {
          const sender = msg.key.participant || msg.key.remoteJid;
          const name = msg.pushName || "Lenwy User";

          let ppUrl;

          try {
            ppUrl = await lenwy.profilePictureUrl(sender, "image");
          } catch {
            ppUrl =
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
          }

          const payload = {
            type: "quote",
            format: "png",
            backgroundColor: "#ffffff",
            width: 512,
            height: 768,
            scale: 2,
            messages: [
              {
                entities: [],
                avatar: true,
                from: {
                  id: 1,
                  name: name,
                  photo: { url: ppUrl },
                },
                text: text,
                replyMessage: {},
              },
            ],
          };

          const res = await axios.post(
            "https://bot.lyo.su/quote/generate",
            payload,
            {
              headers: { "Content-Type": "application/json" },
            },
          );

          const buffer = Buffer.from(res.data.result.image, "base64");

          await lenwy.sendImageAsSticker(replyJid, buffer, msg, {
            packname: globalThis.spackname,
            author: globalThis.sauthor,
          });
        } catch (err) {
          console.error("QC Error:", err);
          return LenwyText("❌ Gagal Membuat Quote Sticker.");
        }
      }
      break;
  }
}
