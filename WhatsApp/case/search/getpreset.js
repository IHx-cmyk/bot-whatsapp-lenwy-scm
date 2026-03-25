/*

  Fitur  : Random Preset Alight Motion
  Author : Lenwy
  NumpangNama: @Sakanaa
  
*/

import axios from "axios";
import fs from "fs";
import path from "path";
import os from "os";

const RAW_JSON_URL = "https://raw.githubusercontent.com/SakanaaDesuKa/AlightMotionPreset-Metadata/refs/heads/main/preset.json";

export const info = {
  name: "Random Preset Alight Motion",
  menu: ["preset"],
  case: ["preset", "priset", "getpreset"],
  description: "Ambil preset Alight Motion secara random",
  hidden: false,
  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,
  allowPrivate: true,
};

function cleanTitle(title = "") {
  const cleaned = title.split("#")[0].trim();
  return cleaned || null;
}

export default async function handler(leni) {
  const { LenwyText, LenwyWait, replyJid, lenwy, len } = leni;

  await LenwyWait();

  let tmpPath = null;

  try {
    let presetList;
    try {
      const { data } = await axios.get(RAW_JSON_URL, { timeout: 10000 });
      presetList = data.filter((p) => typeof p.id !== "undefined");
    } catch {
      return LenwyText("⚠️ Gagal Mengambil Data.");
    }

    if (!presetList.length) return LenwyText("⚠️ Daftar preset kosong.");


    const preset = presetList[Math.floor(Math.random() * presetList.length)];

    const editby     = preset.editby      || "KurangTau";
    const presetLink = preset.preset_link || "";
    const xmlLink    = preset.xml_link    || "";
    const sourceUrl  = preset.source      || "";

    if (!sourceUrl) return LenwyText("😎 Preset ini tidak memiliki source video.");

    let ttData;
    try {
      const ttRes = await axios.get(
        `https://api.fromscratch.web.id/v1/api/down/tiktok?url=${encodeURIComponent(sourceUrl)}`,
        { timeout: 15000 }
      );

      if (ttRes.data?.status !== 200) throw new Error(ttRes.data?.message || "API error");
      ttData = ttRes.data.data;
    } catch (e) {
      return LenwyText(`⚠️ Gagal Mengambil Video.\n${e.message}`);
    }

    const videoUrl = ttData.watermark || ttData.no_watermark;
    if (!videoUrl) return LenwyText("⚠️ URL video tidak tersedia.");
    
    const title = cleanTitle(ttData.title);
    
    tmpPath = path.join(os.tmpdir(), `lenwy_preset_${Date.now()}.mp4`);

    const videoRes = await axios.get(videoUrl, {
      responseType: "arraybuffer",
      timeout: 60000,
    });

    fs.writeFileSync(tmpPath, Buffer.from(videoRes.data));

    let caption = `*Random Preset Alight Motion*\n\n`;
    if (title) caption += `*${title}*\n\n`;
    caption += `*Creadit :* ${editby}\n`;
    caption += `*Preset 5mb/5mb+ :* ${presetLink}\n\n`;
    if (xmlLink) caption += `*XML :* ${xmlLink}\n\n`;
    caption += `*Source :* ${sourceUrl}\n`;
    caption += `> Harap Mencantumkan Nama Kreator Preset Jika Ingin MengUpload Hasilnya Ke Media Sosial`;
    
    await lenwy.sendMessage(
      replyJid,
      {
        video: fs.readFileSync(tmpPath),
        caption,
        mimetype: "video/mp4",
      },
      { quoted: len }
    );

  } catch (err) {
    console.error("[PRESET ERROR]", err);
    LenwyText(`⚠️ *Terjadi Kesalahan*\n${err.message}`);
  } finally {
    if (tmpPath && fs.existsSync(tmpPath)) {
      try {
        fs.unlinkSync(tmpPath);
      } catch {
      }
    }
  }
}
