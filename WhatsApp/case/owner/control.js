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

const pluginStatePath = path.join(
  process.cwd(),
  "WhatsApp",
  "database",
  "system",
  "plugins.json",
);

if (!fs.existsSync(pluginStatePath)) {
  fs.mkdirSync(path.dirname(pluginStatePath), { recursive: true });
  fs.writeFileSync(
    pluginStatePath,
    JSON.stringify({ disable: [], maintenance: [] }, null, 2),
  );
}

function readPluginState() {
  try {
    return JSON.parse(fs.readFileSync(pluginStatePath));
  } catch {
    return { disable: [], maintenance: [] };
  }
}

function savePluginState(data) {
  fs.writeFileSync(pluginStatePath, JSON.stringify(data, null, 2));
}

export const info = {
  name: "Plugin Control",

  menu: ["Plugins", "Enable", "Disable", "Main", "Unmain"],
  case: ["plugins", "enable", "disable", "main", "unmain"],

  description: "Enable / Disable / Maintenance Plugin",
  hidden: false,

  owner: true,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,

  allowPrivate: true,
};

export default async function handler(leni) {
  const { command, q, LenwyText, isLenwy } = leni;

  if (!isLenwy) return LenwyText(globalThis.mess.creator);

  const target = q?.toLowerCase();
  const commands = globalThis.commands;

  if (!commands)
    return LenwyText("❌ System Error: Commands Map Tidak Ditemukan.");

  const state = readPluginState();

  state.disable = state.disable || [];
  state.maintenance = state.maintenance || [];

  switch (command) {
    case "enable": {
      if (!target) return LenwyText("*Contoh: Enable Tiktok");

      const pluginData = commands.get(target);
      if (!pluginData) return LenwyText("❌ Plugin Tidak Ditemukan.");

      state.disable = state.disable.filter((v) => v !== target);
      state.maintenance = state.maintenance.filter((v) => v !== target);

      savePluginState(state);

      return LenwyText(`🎁 Plugin *${target}* Berhasil Diaktifkan.`);
    }

    case "disable": {
      if (!target) return LenwyText("*Contoh: Disable Tiktok*");

      const pluginData = commands.get(target);
      if (!pluginData) return LenwyText("❌ Plugin Tidak Ditemukan.");

      if (!state.disable.includes(target)) {
        state.disable.push(target);
      }

      state.maintenance = state.maintenance.filter((v) => v !== target);

      savePluginState(state);

      return LenwyText(`🚫 Plugin *${target}* Berhasil Dinonaktifkan.`);
    }

    case "main": {
      if (!target) return LenwyText("*Contoh: Main Tiktok");

      const pluginData = commands.get(target);
      if (!pluginData) return LenwyText("❌ Plugin Tidak Ditemukan.");

      if (!state.maintenance.includes(target)) {
        state.maintenance.push(target);
      }

      savePluginState(state);

      return LenwyText(`🛠 Plugin *${target}* Memasuki Pemeliharaan.`);
    }

    case "unmain": {
      if (!target) return LenwyText("*Contoh: Unmain Tiktok*");

      const pluginData = commands.get(target);
      if (!pluginData) return LenwyText("❌ Plugin Tidak Ditemukan.");

      state.maintenance = state.maintenance.filter((v) => v !== target);

      savePluginState(state);

      return LenwyText(`🎁 Plugin *${target}* Keluar Dari Pemeliharaan.`);
    }

    case "plugins": {
      const printed = new Set();

      const totalList = [];
      const disableList = [...state.disable];
      const maintenanceList = [...state.maintenance];

      for (let [cmd, data] of commands) {
        const mainCmd = data.info.menu?.[0]?.toLowerCase();
        if (!mainCmd || printed.has(mainCmd)) continue;

        printed.add(mainCmd);
        totalList.push(mainCmd);
      }

      // SORT A-Z
      totalList.sort((a, b) => a.localeCompare(b));
      disableList.sort((a, b) => a.localeCompare(b));
      maintenanceList.sort((a, b) => a.localeCompare(b));

      let text = `📦 *PLUGIN STATUS (${totalList.length})*\n\n`;

      text += `*[+] Maintenance (${maintenanceList.length})*\n`;
      text += maintenanceList.length
        ? maintenanceList.map((v) => ` - ${v}`).join("\n")
        : "Tidak Ada";
      text += `\n\n`;

      text += `*[+] Disable (${disableList.length})*\n`;
      text += disableList.length
        ? disableList.map((v) => ` - ${v}`).join("\n")
        : "Tidak Ada";

      if (disableList.length === 0 && maintenanceList.length === 0) {
        text += `\n\n☘️ *Semua Fitur Dalam Kondisi Aktif*`;
      }

      return LenwyText(text);
    }
  }
}
