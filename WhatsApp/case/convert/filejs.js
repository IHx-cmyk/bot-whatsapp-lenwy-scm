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

export const info = {
  name: "File JavaScript",

  menu: ["Filejs"],
  case: ["filejs"],

  description: "Ubah Teks Kode Menjadi File JavaScript",
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
  const { command, q, lenwy, msg, replyJid, LenwyText, LenwyWait } = leni;

  switch (command) {
    case "filejs":
      {
        const quoted = msg.message?.extendedTextMessage?.contextInfo;
        const quotedMsg = quoted?.quotedMessage;

        if (!quotedMsg || !quotedMsg.conversation) {
          return LenwyText(
            "⚠️ Harap *Reply* Pesan Yang Ingin Anda Buat Menjadi File .js",
          );
        }
        const fileContent =
          quotedMsg.conversation || quotedMsg.extendedTextMessage?.text || "";

        if (fileContent.length === 0) {
          return LenwyText(
            "❌ Pesan Yang Direply Tidak Mengandung Teks (kode) Untuk Dibuat File.",
          );
        }
        let fileName = q ? q.trim() : "Lenwy_JS";

        fileName = fileName.replace(/[^\w\s-]/g, "").trim();

        if (fileName.length === 0) {
          fileName = "Lenwy_JS";
        }

        LenwyWait();

        try {
          const fileBuffer = Buffer.from(fileContent, "utf-8");

          await lenwy.sendMessage(
            replyJid,
            {
              document: fileBuffer,
              fileName: `${fileName}.js`,
              mimetype: "application/javascript",
              caption: `🎁 *File JavaScript Berhasil Dibuat!*`,
            },
            { quoted: msg },
          );
        } catch (error) {
          console.error("Error Make File JS:", error);
          LenwyText(globalThis.mess.error);
        }
      }
      break;
  }
}
