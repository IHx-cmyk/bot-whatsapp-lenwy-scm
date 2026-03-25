/*

     Create: Shannyie
     Telegram: t.me/Shannyiee

*/

export const info = {
  name: "Add Member",

  menu: ["Add"],
  case: ["add", "tambah", "invite"],

  description: "Tambahkan Anggota ke Dalam Grup",
  hidden: false,

  owner: false,
  premium: false,
  group: true,
  private: false,
  admin: true,
  botAdmin: true,   // bot harus admin

  allowPrivate: false,
};

export default async function handler(leni) {
  const { command, q, msg, lenwy, replyJid, LenwyText } = leni;

  switch (command) {
    case "add":
    case "tambah":
    case "invite": {

      if (!q)
        return LenwyText("👻 Masukkan nomor yang ingin ditambahkan.\n*Contoh:* .add 6281234567890");

      // Normalisasi nomor
      let number = q.replace(/[^0-9]/g, "");
      if (number.startsWith("0")) number = "62" + number.slice(1);
      const target = number + "@s.whatsapp.net";

      // Cek apakah sudah ada di grup
      const groupMetadata = await lenwy.groupMetadata(replyJid);
      const participants = groupMetadata.participants;

      const isParticipant = participants.some((p) => p.id === target);
      if (isParticipant)
        return LenwyText(`👻 Nomor @${number} sudah ada di dalam grup ini!`);

      try {
        await lenwy.groupParticipantsUpdate(replyJid, [target], "add");

        await lenwy.sendMessage(
          replyJid,
          {
            text: `╭─「 *ADD SYSTEM* 」\n│ 👻 *Target:* @${number}\n│ ➕ *Status:* Berhasil Ditambahkan\n╰─────────────────────────\n\nSelamat datang!`,
            mentions: [target],
          },
          { quoted: msg }
        );

      } catch (err) {
        console.error("Add Error:", err);
        LenwyText("👻 Gagal menambahkan. Kemungkinan privasi nomor tersebut menolak undangan otomatis.");
      }

      break;
    }
  }
}
