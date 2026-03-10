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
  name: "Kick Member",

  menu: ["Kick"],
  case: ["kick"],

  description: "Penjelasan Singkat Fitur",
  hidden: false,

  owner: false,
  premium: false,
  group: true,
  private: false,
  admin: true,
  botAdmin: false,

  allowPrivate: false,
};

// Handler Utama
export default async function handler(leni) {
  const { command, lenwy, msg, len, replyJid, LenwyText } = leni;

  switch (command) {
    case "kick":
      {
        const quoted = msg.message?.extendedTextMessage?.contextInfo;
        if (!quoted?.participant)
          return LenwyText(
            "❌ *Gagal. Reply Pesan Anggota Yang Ingin Anda Keluarkan.*",
          );

        const targetJid = quoted.participant;

        const targetMention = `@${targetJid.split("@")[0]}`;

        try {
          await lenwy.groupParticipantsUpdate(replyJid, [targetJid], "remove");

          await lenwy.sendMessage(
            replyJid,
            {
              text: `🎁 *Berhasil Mengeluarkan ${targetMention} dari Grup.*`,
              mentions: [targetJid],
            },
            { quoted: len },
          );
        } catch (err) {
          console.error("Kick Error:", err);
          LenwyText(
            "⚠️ *Gagal. Pastikan Saya Adalah Admin di Grup Ini dan Anggota Tersebut Bukan Pembuat Grup.*",
          );
        }
      }
      break;
  }
}
