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

import fs from "fs";
import path from "path";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";

const caseDir = path.join(process.cwd(), "WhatsApp", "case");
const trashDir = path.join(process.cwd(), "temp");

function formatSize(bytes) {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

export const info = {
  name: "Manajemen Fitur Via Command",

  menu: [
    "Addfitur",
    "Delfitur",
    "Getfitur",
    "Listtemp",
    "Restore",
    "Cleartemp",
  ],
  case: [
    "addfitur",
    "delfitur",
    "getfitur",
    "listtemp",
    "restore",
    "cleartemp",
  ],

  description: "Manajemen Fitur Via Command",
  hidden: false,

  owner: true,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,

  allowPrivate: false,
};

export default async function handler(leni) {
  const { command, q, msg, LenwyText, lenwy, replyJid } = leni;

  switch (command) {
    case "addfitur":
      {
        if (!q)
          return LenwyText(
            "*Contoh: .Addfitur [Kategori] [Nama]*\n\n*Harap Reply Pesan Berisikan Kode*",
          );

        const args = q.split(" ");
        const kategori = args[0]?.toLowerCase();
        let fileName = args[1];

        if (!kategori) return LenwyText("❌ Masukkan Kategori.");

        const existingFolders = fs
          .readdirSync(caseDir)
          .filter((folder) =>
            fs.statSync(path.join(caseDir, folder)).isDirectory(),
          )
          .map((f) => f.toLowerCase());

        if (!existingFolders.includes(kategori)) {
          return LenwyText(
            `❌ *Kategori Tidak Ditemukan.*\n\n*[+] Kategori Tersedia:*\n - ${existingFolders.join(
              "\n - ",
            )}`,
          );
        }

        const kategoriPath = path.join(caseDir, kategori);

        const quoted = msg.message?.extendedTextMessage?.contextInfo;
        const quotedMsg = quoted?.quotedMessage;

        if (!quotedMsg) return LenwyText("❌ *Harap Reply Kode atau File.js*");

        let code = "";

        if (quotedMsg.documentMessage) {
          const doc = quotedMsg.documentMessage;

          if (!doc.fileName.endsWith(".js"))
            return LenwyText("❌ *File Harus .js*");

          fileName = doc.fileName.replace(".js", "");

          const stream = await downloadContentFromMessage(doc, "document");

          let buffer = Buffer.from([]);
          for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
          }

          code = buffer.toString("utf-8");
        } else {
          code =
            quotedMsg.conversation || quotedMsg.extendedTextMessage?.text || "";

          if (!code) return LenwyText("❌ Pesan Reply Tidak Mengandung Teks.");

          if (!fileName) return LenwyText("❌ Masukkan Nama File.");
        }

        fileName = fileName
          .toLowerCase()
          .replace(/[^a-z0-9_-]/g, "")
          .trim();

        if (!fileName) fileName = "lenwy_plugin";

        const fullPath = path.join(kategoriPath, `${fileName}.js`);

        if (fs.existsSync(fullPath)) return LenwyText("⚠️ (File Sudah Ada.*");

        try {
          fs.writeFileSync(fullPath, code);

          await LenwyText(
            `🎁 *Fitur Berhasil Ditambahkan*\n📁 *${kategori}/${fileName}.js*`,
          );
        } catch (err) {
          console.error(err);
          return LenwyText("❌ Gagal Membuat Fitur.");
        }
      }
      break;

    case "delfitur":
      if (!q) return LenwyText("*Contoh: .Delfitur ai4chat.js*");

      let targetFile = q.trim();

      targetFile = targetFile.replace(/[^a-zA-Z0-9_.-]/g, "");

      if (!targetFile.endsWith(".js"))
        return LenwyText("❌ *Hanya Bisa Menghapus File.js*");

      let foundPath = null;

      const folders = fs.readdirSync(caseDir).filter((folder) => {
        const full = path.join(caseDir, folder);
        return (
          fs.statSync(full).isDirectory() && folder.toLowerCase() !== "temp"
        );
      });

      for (const folder of folders) {
        const folderPath = path.join(caseDir, folder);
        const files = fs.readdirSync(folderPath);

        for (const file of files) {
          if (file.toLowerCase() === targetFile.toLowerCase()) {
            foundPath = path.join(folderPath, file);
            break;
          }
        }

        if (foundPath) break;
      }

      if (!foundPath)
        return LenwyText("❌ *File Tidak Ditemukan Di Dalam Folder Case.*");

      try {
        if (!fs.existsSync(trashDir)) {
          fs.mkdirSync(trashDir);
        }

        const newPath = path.join(trashDir, targetFile);

        let finalPath = newPath;
        if (fs.existsSync(newPath)) {
          const timestamp = Date.now();
          finalPath = path.join(
            trashDir,
            `${targetFile.replace(".js", "")}_${timestamp}.js`,
          );
        }

        fs.renameSync(foundPath, finalPath);

        await LenwyText(
          `📁 *Fitur Berhasil Dihapus*\n🗑️ *${path.relative(caseDir, finalPath)}*`,
        );
      } catch (err) {
        console.error(err);
        return LenwyText("❌ *Gagal Menghapus Fitur&.");
      }
      break;

    case "getfitur":
      if (!q) return LenwyText("*Contoh: Getfitur ai*");

      const targetCase = q.trim().toLowerCase();

      let foundFile = null;

      try {
        const folders = fs
          .readdirSync(caseDir)
          .filter((folder) =>
            fs.statSync(path.join(caseDir, folder)).isDirectory(),
          );

        for (const folder of folders) {
          const folderPath = path.join(caseDir, folder);
          const files = fs
            .readdirSync(folderPath)
            .filter((file) => file.endsWith(".js"));

          for (const file of files) {
            const fullPath = path.join(folderPath, file);
            const content = fs.readFileSync(fullPath, "utf-8");

            const match = content.match(/case\s*:\s*\[(.*?)\]/s);

            if (match) {
              const caseList = match[1]
                .split(",")
                .map((c) => c.replace(/['"`\s]/g, "").toLowerCase());

              if (caseList.includes(targetCase)) {
                foundFile = fullPath;
                break;
              }
            }
          }

          if (foundFile) break;
        }

        if (!foundFile) return LenwyText("❌ Fitur Tidak Ditemukan.");

        const fileBuffer = fs.readFileSync(foundFile);

        await lenwy.sendMessage(
          replyJid,
          {
            document: fileBuffer,
            fileName: path.basename(foundFile),
            mimetype: "application/javascript",
          },
          { quoted: msg },
        );
      } catch (err) {
        console.error(err);
        return LenwyText("❌ Gagal Mengambil Fitur.");
      }
      break;

    case "listtemp":
      try {
        if (!fs.existsSync(trashDir)) {
          return LenwyText("📂 *Folder temp Belum Ada.*");
        }

        const files = fs.readdirSync(trashDir);

        if (files.length === 0) {
          return LenwyText("🗑️ *Folder Temp Kosong.*");
        }

        const grouped = {};
        let totalSize = 0;

        for (const file of files) {
          const fullPath = path.join(trashDir, file);
          const stats = fs.statSync(fullPath);

          if (!stats.isFile()) continue;

          const ext =
            path.extname(file).toLowerCase().replace(".", "") || "other";

          if (!grouped[ext]) {
            grouped[ext] = {
              files: [],
              size: 0,
            };
          }

          grouped[ext].files.push(file);
          grouped[ext].size += stats.size;
          totalSize += stats.size;
        }

        const sortedExt = Object.keys(grouped).sort((a, b) => {
          if (a === "js") return -1;
          if (b === "js") return 1;
          return a.localeCompare(b);
        });

        let teks = "📂 *Isi Folder Temp*\n\n";
        let totalFile = 0;

        for (const ext of sortedExt) {
          const data = grouped[ext];
          totalFile += data.files.length;

          teks += `*[+] ${ext.toUpperCase()} (${data.files.length}) — ${formatSize(data.size)}*\n`;

          for (const file of data.files) {
            teks += ` - *${file}*\n`;
          }

          teks += "\n";
        }

        teks += "━━━━━━━━━━━━━━\n";
        teks += `*[+] Total File: ${totalFile}*\n`;
        teks += `*[+] Total Size: ${formatSize(totalSize)}*`;

        await LenwyText(teks);
      } catch (err) {
        console.error(err);
        return LenwyText("❌ Gagal Membaca Folder Temp.");
      }
      break;

    case "restore":
      if (!q) return LenwyText("*Contoh: .Restore ai4chat.js*");

      if (!fs.existsSync(trashDir))
        return LenwyText("📂 *Folder Temp Belum Ada.*");

      let fileName = q.trim().replace(/[^a-zA-Z0-9_.-]/g, "");

      const fullPath = path.join(trashDir, fileName);

      if (!fs.existsSync(fullPath))
        return LenwyText("❌ *File Tidak Ditemukan Di Temp.*");

      const ext = path.extname(fileName).toLowerCase();
      const fileBuffer = fs.readFileSync(fullPath);

      try {
        if ([".jpg", ".jpeg", ".png"].includes(ext)) {
          await lenwy.sendMessage(
            replyJid,
            {
              image: fileBuffer,
              caption: `📦 Restore: ${fileName}`,
            },
            { quoted: msg },
          );
        } else if (ext === ".mp3") {
          await lenwy.sendMessage(
            replyJid,
            {
              audio: fileBuffer,
              mimetype: "audio/mpeg",
              fileName,
            },
            { quoted: msg },
          );
        } else if (ext === ".mp4") {
          await lenwy.sendMessage(
            replyJid,
            {
              video: fileBuffer,
              caption: `📦 Restore: ${fileName}`,
            },
            { quoted: msg },
          );
        } else {
          await lenwy.sendMessage(
            replyJid,
            {
              document: fileBuffer,
              fileName,
              mimetype: "application/javascript",
            },
            { quoted: msg },
          );
        }

        fs.unlinkSync(fullPath);

        await LenwyText(`📂 *File Berhasil Direstore dan Dihapus Dari Temp.*`);
      } catch (err) {
        console.error(err);
        return LenwyText("❌ *Gagal Mengirim File. File Tetap Aman Di Temp.*");
      }
      break;

    case "cleartemp":
      try {
        if (!fs.existsSync(trashDir)) {
          return LenwyText("📂 *Folder Temp Belum Ada.*");
        }

        const files = fs.readdirSync(trashDir);

        if (files.length === 0) {
          return LenwyText("🗑️ *Folder Temp Sudah Kosong.*");
        }

        let deleted = 0;

        for (const file of files) {
          const fullPath = path.join(trashDir, file);
          const stats = fs.statSync(fullPath);

          if (stats.isFile()) {
            fs.unlinkSync(fullPath);
            deleted++;
          }
        }

        await LenwyText(`🧹 *Berhasil Menghapus ${deleted} File Dari Temp.*`);
      } catch (err) {
        console.error(err);
        return LenwyText("❌ Gagal Membersihkan Temp.");
      }
      break;
  }
}
