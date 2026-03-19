<div align="center">

![Lenwy SCM Banner](https://files.catbox.moe/qwtejb.jpg)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/Lenwyy/bot-whatsapp-lenwy-scm)

</div>

# ☘️ **Lenwy SCM - ESM Version**

**Lenwy SCM (Lenwy Switch Case Modular)** adalah starter-kit bot WhatsApp berbasis **Node.js** yang dirancang menggunakan arsitektur **ESM (ECMAScript Modules)**. Base ini menggunakan pustaka **Baileys** yang ringan, modular, dan mudah dikembangkan untuk berbagai kebutuhan bot.

Dengan memecah sistem **switch case** menjadi modul-modul terpisah, struktur kode menjadi lebih rapi, mudah dibaca, dan lebih mudah dikelola.

---

## 📚 **Table of Contents**

* [Instalasi](#-instalasi)
  * [[A] Install FFmpeg](#a-install-ffmpeg)
  * [[B] Clone Repositori](#b-clone-repositori)
  * [[C] Masuk Ke Direktori](#c-masuk-ke-direktori)
  * [[D] Install Dependencies](#d-install-dependencies)
  * [[E] Jalankan Script](#e-jalankan-script)
* [Update](#-update)
  * [[A] Update Semua File](#a-update-semua-file-tanpa-menghapus-file-yang-dikembangkan)
  * [[B] Update File Tertentu Saja](#b-update-file-tertentu-saja)
* [Struktur Folder](#-struktur-folder)
* [Bagaimana Cara Kerjanya](#-bagaimana-cara-kerjanya)
  * [[A] Cara Memanggil Menu](#a-cara-memanggil-menu)
  * [[B] Bagaimana Fitur Ditampilkan](#b-bagaimana-fitur-ditampilkan)
  * [[C] Filter Label](#c-bot-juga-akan-melakukan-beberapa-filter)
* [Fitur Utama](#-fitur-utama)
  * [1. Modular Architecture](#-1--modular-architecture)
  * [2. Multi-Platform Ready](#-2--multi-platform-ready)
  * [3. Pairing Code Login](#-3--pairing-code-login)
  * [4. Global Variable Management](#-4--global-variable-management)
  * [5. Session Manager](#-5--session-manager)
  * [6. Dynamic Command Registry](#-6--dynamic-command-registry)
  * [7. Metadata Driven](#-7--metadata-driven)
  * [8. Helper Function System](#-8--helper-function-system)
  * [9. Label System](#-9--label-system)
  * [10. Struktur Fitur](#-10--struktur-fitur)
* [Informasi Developer](#-informasi-developer)
* [Kontribusi](#-kontribusi)

---

## 📑 **Instalasi**

Pastikan anda sudah menginstall Node.js (versi LTS direkomendasikan). Jika belum, unduh di [nodejs.org](https://nodejs.org).

### [A] Install FFmpeg
Bot ini membutuhkan FFmpeg untuk fitur sticker. Install sesuai environment kamu:

**Termux (Android)**
```
pkg install ffmpeg
```
**Linux (Ubuntu/Debian)**
```
sudo apt install ffmpeg
```
> **Catatan:** Lewati langkah ini jika kamu menjalankan bot melalui Pterodactyl Panel, karena FFmpeg sudah tersedia di dalam container secara default.
> 

#### **[B] Clone Repositori**

Salin repositori ini ke komputer atau server kamu:
```
git clone https://github.com/Lenwyy/bot-whatsapp-lenwy-scm
```

#### **[C] Masuk Ke Direktori**

Setelah clone selesai, masuk ke folder yang baru dibuat:
```
cd bot-whatsapp-lenwy-scm
```

#### **[D] Install Dependencies**

Install semua package yang dibutuhkan oleh bot:
```
npm install
```

> **Catatan:** Proses ini membutuhkan koneksi internet. Tunggu hingga selesai sebelum melanjutkan ke langkah berikutnya.

#### **[E] Jalankan Script**

Setelah semua dependencies terpasang, jalankan bot dengan perintah berikut:
```
npm start
```

> **Catatan:** Saat pertama kali dijalankan, bot akan meminta nomor WhatsApp untuk proses login menggunakan pairing code. Masukkan nomor yang diawali dengan `62` (tanpa tanda `+`).

---

## 📑 **Update**

Ada dua skenario update yang perlu dibedakan, tergantung dari kebutuhan kamu.

#### **[A] Update Semua File (Tanpa Menghapus File yang Dikembangkan)**

Gunakan perintah ini jika ingin mengambil semua perubahan terbaru dari repositori, namun tetap mempertahankan file-file tambahan yang sudah kamu buat sendiri.

Pastikan kamu sudah berada di dalam direktori **bot-whatsapp-lenwy-scm** terlebih dahulu:
```
cd bot-whatsapp-lenwy-scm
```

Kemudian jalankan:
```
git pull origin main
```

> **Catatan:** `git pull` hanya akan memperbarui file yang memang ada di repositori ini. File baru yang kamu tambahkan sendiri (seperti fitur custom di folder `case/`) **tidak akan terhapus atau tertimpa**.
>
> Namun jika kamu telah **mengedit file yang sama** dengan yang diupdate di repositori, Git akan meminta kamu menyelesaikan *merge conflict* secara manual.

---

#### **[B] Update File Tertentu Saja**

Gunakan cara ini jika hanya ingin mengambil update dari satu atau beberapa file spesifik tanpa menyentuh file lainnya.

Pastikan kamu sudah berada di dalam direktori **bot-whatsapp-lenwy-scm** terlebih dahulu:
```
cd bot-whatsapp-lenwy-scm
```

**Langkah 1 — Ambil info update terbaru dari remote:**
```
git fetch origin
```

**Langkah 2 — Ambil file yang ingin diupdate:**
```
git checkout origin/main -- WhatsApp/lenwy.js
```

Untuk beberapa file sekaligus, pisahkan dengan spasi:
```
git checkout origin/main -- WhatsApp/lenwy.js WhatsApp/index.js
```

> **Catatan:** Perintah ini akan **langsung menimpa** file lokal kamu dengan versi terbaru dari repositori. Pastikan tidak ada perubahan penting di file tersebut sebelum menjalankannya, atau backup terlebih dahulu.

---

## 📂 **Struktur Folder**

Berikut adalah gambaran keseluruhan struktur folder pada repositori ini:

```
├── 📁 LenwySesi            # Folder Sesi
│
├── 📁 WhatsApp
│   ├── 📁 case             # Daftar Fitur
│   │   │
│   │   ├── 📁 ai           # Kategori AI
│   │   │   ├── 📄 ai4chat.js
│   │   │   └── 📄 webpilot.js
│   │   │
│   │   ├── 📁 convert      # Kategori Convert
│   │   │   ├── 📄 brat.js
│   │   │   ├── 📄 filejs.js
│   │   │   ├── 📄 quote.js
│   │   │   ├── 📄 sticker.js
│   │   │   └── 📄 tomedia.js
│   │   │
│   │   ├── 📁 down         # Kategori Downloader
│   │   │   ├── 📄 tiktok.js
│   │   │   └── 📄 ytmp4.js
│   │   │
│   │   ├── 📁 group        # Kategori Group
│   │   │   └── 📄 kick.js
│   │   │
│   │   ├── 📁 owner        # Kategori Owner
│   │   │   ├── 📄 control.js
│   │   │   ├── 📄 direktori.js
│   │   │   └── 📄 fitur.js
│   │   │
│   │   └── 📄 Template.js  # Template Struktur
│   │
│   ├── 📁 database         # Database
│   │   ├── 📁 Menu
│   │   │   └── 📄 LenwyMenu.js
│   │   ├── 📁 image
│   │   │   └── 🖼️ lenwy.jpeg
│   │   ├── 📁 system
│   │   │   └── ⚙️ plugins.json
│   │   ├── ⚙️ creator.json # Daftar Nomor Creator
│   │   └── ⚙️ premium.json # Daftar Nomor Premium
│   │
│   ├── 📁 lib              # Library
│   │   ├── 📄 exif.js
│   │   └── 📄 sticker.js
│   │
│   ├── 📁 scrape           # Scraper
│   │   └── 📄 Ai4Chat.js
│   ├── 📄 index.js
│   ├── 📄 len.js
│   └── 📄 lenwy.js
├── 📄 LenwySet.js
├── 📝 README.md
├── ⚙️ package-lock.json
└── ⚙️ package.json
```

> **Catatan:** Folder `LenwySesi` akan dibuat secara otomatis saat bot pertama kali dijalankan. Folder ini menyimpan data sesi WhatsApp dan **tidak perlu diedit secara manual**.

---

## 🎁 **Bagaimana Cara Kerjanya?**

Sistem menu pada bot ini bersifat **Dynamic Category Menu**. Bot akan secara otomatis membaca seluruh folder yang berada di dalam direktori `case`:

```
./WhatsApp/case/ # dynamic menu
```

Setiap folder yang ditemukan di dalamnya akan dianggap sebagai sebuah kategori menu. Artinya, kamu cukup membuat folder baru untuk menambahkan kategori baru tanpa perlu mengubah kode utama bot.

**[+] Contoh struktur folder:**
```
case/
 ├── ai/
 ├── down/
 └── group/
```

**[+] Maka kategori menu yang otomatis tersedia adalah:**
```
.AIMENU
.DOWNMENU
.GROUPMENU
```

---

#### **[A] Cara Memanggil Menu**

Untuk membuka menu dari sebuah kategori, cukup tambahkan kata **menu** di belakang nama kategori:

```
.Aimenu
.Downmenu
.Groupmenu
```

---

#### **[B] Bagaimana Fitur Ditampilkan?**

Setiap fitur yang terdaftar pada sebuah kategori akan otomatis muncul di menu sesuai dengan kategorinya. Tidak perlu mendaftarkan fitur secara manual.

**[+] Contoh tampilan menu:**

![kategori](https://files.catbox.moe/864f6s.jpg "Lenwy SCM Category")

---

#### **[C] Bot Juga Akan Melakukan Beberapa Filter**

Tidak semua fitur ditampilkan apa adanya. Bot akan menyesuaikan tampilan menu berdasarkan status masing-masing fitur:

* Fitur dengan status *hidden* tidak akan ditampilkan di menu, meskipun tetap bisa digunakan
* Fitur dengan status *maintenance* akan diberi tanda `[Main]` sebagai peringatan
* Fitur yang dinonaktifkan oleh owner akan diberi tanda `[Off]`

**[+] Contoh tampilan label:**

![label](https://files.catbox.moe/pmvd05.png "Lenwy SCM Label")

Dengan sistem ini, developer tidak perlu lagi menuliskan daftar menu secara manual. Setiap fitur baru yang ditambahkan ke dalam folder kategori akan otomatis muncul di menu.

---

## 🌟 **Fitur Utama**

### **[ 1 ] Modular Architecture**

Logika bot dibagi menjadi beberapa bagian yang terpisah sehingga lebih mudah dikelola dan dikembangkan. Koneksi, pesan, dan fitur masing-masing memiliki tempatnya sendiri:

```
├── 📁 WhatsApp
│   ├── 📁 case         # Tempat semua fitur bot disimpan
│   │   ├── 📁 ai
│   │   │   ├── 📄 ai4chat.js
│   │   │   └── 📄 webpilot.js
│   │
│   ├── 📁 scrape       # Tempat fungsi scraping disimpan
│   │   └── 📄 Ai4Chat.js
│   │
│   └── 📄 index.js     # File utama koneksi ke WhatsApp
└── ⚙️ package.json
```

#### **[A] index.js (The Core Connection)**

File `index.js` adalah inti dari bot ini. File ini menangani seluruh alur koneksi ke server WhatsApp, mulai dari autentikasi menggunakan multi-file auth state hingga mendukung login via pairing code.

---

### **[ 2 ] Multi-Platform Ready**

Bot ini dirancang agar bisa menjalankan lebih dari satu platform secara bersamaan. Semua pengaturan platform dikendalikan melalui satu file, yaitu `LenwySet.js`:

```
├── 📁 WhatsApp
├── 📄 LenwySet.js  # Gerbang utama multi-platform
└── ⚙️ package.json
```

Di dalam file ini, kamu bisa mengaktifkan atau menonaktifkan platform menggunakan nilai `true` atau `false`:

```js
const config = {
  whatsapp: true,
  telegram: false // tahap pengembangan
};
```

Jika `whatsapp` bernilai `true`, sistem akan otomatis memanggil dan menjalankan `WhatsApp/index.js`. Pengaturan ini memudahkan pengembangan di masa depan tanpa perlu mengubah struktur utama bot.

---

### **[ 3 ] Pairing Code Login**

Bot ini mendukung login WhatsApp tanpa perlu scan QR. Cukup masukkan nomor telepon, dan sistem akan memberikan kode pairing yang bisa langsung digunakan:

```js
// ./WhatsApp/index.js

if (usePairingCode && !lenwy.authState.creds.registered) {
  try {
    const phoneNumber = await question(
      "☘️ Masukan Nomor Yang Diawali Dengan 62 :\n",
    );
    const code = await lenwy.requestPairingCode(phoneNumber.trim());
    console.log(`🎁 Pairing Code : ${code}`);
  } catch (err) {
    console.error("Failed to get pairing code:", err);
  }
}
```

> **Catatan:** Masukkan nomor dengan format `62xxxxxxxxxx` tanpa spasi atau tanda hubung. Kode pairing yang muncul di terminal hanya berlaku beberapa detik, jadi segera masukkan ke aplikasi WhatsApp.

---

### **[ 4 ] Global Variable Management**

Semua konfigurasi umum bot seperti prefix, pesan respon, dan path aset dikelola menggunakan `globalThis` di dalam file `len.js`. Ini memudahkan developer untuk mengubah pengaturan bot dari satu tempat tanpa perlu mencari satu per satu di berbagai file:

```js
// ./WhatsApp/len.js

// Custom Credit Sticker
globalThis.spackname = "Lenwy SCM"; // Ganti Sesuai Keinginan
globalThis.sauthor = "Youtube : Lenwy\nBot: 0856-2497-5232"; // Ganti Sesuai Keinginan

// Custom Prefix
globalThis.prefix = ["#"]; // Bisa diisi lebih dari satu prefix
globalThis.noprefix = false; // True = Tanpa Prefix, False = Pakai Prefix

// Custom Menu Image
globalThis.MenuImage = path.join(__dirname, "./database/image/lenwy.jpeg"); // Ganti dengan path gambar kamu

// Custom Message
globalThis.mess = {
  wait: "☕ *One Moment, Please*",
  error: "⚠ *Gagal Saat Melakukan Proses*",
  default: "📑 *Perintah Tidak Dikenali*",
  admin: "⚠️ Fitur Ini Khusus Admin Grup.",
  botadmin: "⚠️ Bot Harus Menjadi Admin Terlebih Dahulu.",
  group: "⚠️ Fitur Ini Hanya Bisa Digunakan Di Grup.",
  private: "⚠️ Fitur Ini Hanya Bisa Digunakan Di Private Chat.",
  premium: "⚠️ Fitur Ini Khusus User Premium.",
  order: "⚠ *Kamu Hanya Bisa Melakukan Pembayaran Di Private Chat.*",
  creator: "⚠️ Fitur ini khusus Owner.",
  disable: "🚫 Fitur Ini Sedang Dinonaktifkan Oleh Lenwy.",
  maintenance: "🛠 Fitur Ini Sedang Dalam Perbaikan.",
};
```

> **Catatan:** Kamu cukup mengedit file `len.js` untuk menyesuaikan identitas dan pesan bot tanpa perlu menyentuh file lainnya.

---

### **[ 5 ] Session Manager**

Sesi WhatsApp disimpan secara otomatis di folder `LenwySesi` yang berada di luar folder `WhatsApp`. Pemisahan ini dilakukan agar data sesi tetap aman dan tidak ikut tertimpa saat ada update pada file bot:

```
├── 📁 LenwySesi    # Folder sesi — dibuat otomatis saat pertama kali login
├── 📁 WhatsApp
└── ⚙️ package.json
```

#### **[A] Manajemen Autentikasi**

Berikut adalah konfigurasi path penyimpanan sesi yang digunakan:

```js
// ./WhatsApp/index.js

const { state, saveCreds } = await useMultiFileAuthState(
  path.resolve(__dirname, "../LenwySesi"),
);
```

> **Catatan:** Jangan hapus folder `LenwySesi` kecuali kamu ingin melakukan login ulang. Menghapus folder ini akan membuat bot meminta pairing code baru saat dijalankan kembali.

---

### **[ 6 ] Dynamic Command Registry**

Setiap kali bot dijalankan, sistem secara otomatis membaca dan mendaftarkan semua command dari seluruh file fitur yang ada. Tidak perlu mendaftarkan command secara manual ke dalam daftar apapun.

Dengan sistem ini, bot mengetahui secara otomatis:
* Nama command yang tersedia
* Kategori dari setiap command
* Status aktif, nonaktif, atau maintenance
* Apakah fitur disembunyikan dari menu atau tidak

**[+] Berikut alur kerja dari fitur hingga tampil di menu:**

```
┌───────────────┐
  Feature file
  tiktok.js
└───────┬───────┘
        │
        ▼
┌─────────────────┐
  Folder category
  case/down/
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
  Command registry
  Categories map
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
   Menu generator
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
    Menu output
    .Downmenu
    [+] .Tiktok
└─────────────────┘
```

---

### **[ 7 ] Metadata Driven**

Setiap fitur menggunakan sistem **Metadata Driven**, yaitu seluruh pengaturan fitur ditentukan melalui sebuah objek bernama `info` yang berada di setiap file fitur.

Dengan sistem ini, kamu bisa mengatur nama, tampilan, command, hak akses, dan visibilitas fitur hanya dari satu tempat tanpa perlu menyentuh sistem utama bot:

```js
import Ai4Chat from "../../scrape/Ai4Chat.js";

export const info = {
  name: "AI4Chat",

  menu: ["AI"],
  case: ["ai"],

  description: "Tanyakan Apa Saja!",
  hidden: false,

  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,

  allowPrivate: false,
};
```

---

### **[+] Penjelasan Struktur Metadata**

#### **[A] Identitas Fitur**

```js
name: "AI4Chat"
```

Nama fitur yang digunakan sebagai identitas internal. Nama ini juga akan tampil di beberapa bagian sistem seperti log dan plugin status.

---

#### **[B] Menu Name**

```js
menu: ["AI"]
```

Menentukan bagaimana fitur ini akan ditampilkan di menu. Nilai ini disesuaikan dengan `Case`.

---

#### **[C] Command Case**

```js
case: ["ai"]
```

Menentukan command yang digunakan untuk menjalankan fitur. Satu fitur bisa memiliki lebih dari satu command sekaligus:

```js
case: ["ai", "chatgpt", "ask"]
```

**[+] Contoh penggunaan oleh user:**
```
.ai apa itu artificial intelligence?
.chatgpt apa itu artificial intelligence?
.ask apa itu artificial intelligence?
```

Semua command di atas akan menjalankan fitur yang sama.

---

#### **[D] Sistem Visibility**

```js
hidden: false
```

Menentukan apakah fitur akan ditampilkan di menu atau tidak. Jika diatur ke `true`, fitur tetap bisa digunakan namun tidak akan muncul di daftar menu.

---

### **[+] Sistem Hak Akses (Access Control)**

Metadata juga menentukan siapa saja yang boleh menggunakan fitur tersebut. Cukup ubah nilai properti berikut menjadi `true` untuk mengaktifkan pembatasan akses:

| Property | Keterangan |
|---|---|
| `owner` | Hanya owner bot yang dapat menggunakan fitur ini |
| `premium` | Hanya user premium yang dapat menggunakan fitur ini |
| `group` | Fitur hanya dapat digunakan di dalam grup |
| `private` | Fitur hanya bisa digunakan di chat pribadi |
| `admin` | Hanya admin grup yang dapat menggunakan fitur ini |
| `botAdmin` | Bot harus berstatus admin di grup agar fitur bisa berjalan |
| `allowPrivate` | Mengizinkan fitur yang biasanya hanya untuk grup agar bisa digunakan di chat pribadi |

> **Catatan:** Jika semua properti bernilai `false`, fitur dapat digunakan oleh siapa saja.

---

### **[ 8 ] Helper Function System**

Bot menyediakan beberapa helper function sebagai shortcut dari `lenwy.sendMessage`, sehingga developer tidak perlu menulis ulang parameter yang sama setiap kali mengirim pesan atau media.

> **Catatan:** Helper bersifat opsional. Kamu tetap bisa menggunakan `lenwy.sendMessage` secara langsung jika membutuhkan kontrol yang lebih fleksibel atas pengiriman pesan.

---

### **[+] Jenis Helper Yang Tersedia**

#### **[A] Send Text**

Digunakan untuk mengirim pesan teks biasa sebagai reply dari pesan user:

```js
const LenwyText = (text) =>
  lenwy.sendMessage(replyJid, { text }, { quoted: len });
```

**[+] Contoh penggunaan:**
```js
LenwyText("Halo, Ini Lenwy!");
```

---

#### **[B] Wait Message**

Digunakan untuk mengirim pesan loading saat bot sedang memproses sebuah perintah. Sebaiknya dipanggil sebelum proses yang memakan waktu seperti request ke API:

```js
const LenwyWait = () => lenwyreply(globalThis.mess.wait);
```

**[+] Contoh penggunaan:**
```js
export default async function handler(leni) {
  const { command, q, LenwyText, LenwyWait } = leni;

  switch (command) {
    case "ai": {
      if (!q) return LenwyText("☘️ *Contoh:* .ai Apa itu JavaScript?");

      LenwyWait(); // Kirim pesan loading sebelum proses dimulai

      try {
        const lenai = await Ai4Chat(q);
        if (!lenai) return LenwyText("⚠️ AI Tidak Merespon.");
        await LenwyText(`*Lenwy AI*\n\n${lenai}`);
      } catch (error) {
        console.error("Error AI:", error);
        LenwyText(globalThis.mess.error);
      }
      break;
    }
  }
}
```

---

#### **[C] Send Image**

Digunakan untuk mengirim gambar dari URL beserta caption opsional:

```js
const LenwyImage = (url, caption = "") =>
  lenwy.sendMessage(replyJid, { image: { url }, caption }, { quoted: len });
```

**[+] Contoh penggunaan:**
```js
LenwyImage("https://example.com/gambar.jpg", "Ini Gambarnya");
```

---

#### **[D] Send Video**

Digunakan untuk mengirim video dari URL beserta caption opsional:

```js
const LenwyVideo = (url, caption = "") =>
  lenwy.sendMessage(replyJid, { video: { url }, caption }, { quoted: len });
```

**[+] Contoh penggunaan:**
```js
LenwyVideo("https://example.com/video.mp4", "Ini Videonya");
```

---

#### **[E] Send Audio**

Digunakan untuk mengirim audio dari URL. Parameter `ptt` menentukan apakah audio akan ditampilkan sebagai voice note atau file audio biasa:

```js
const LenwyAudio = (url, ptt = false) =>
  lenwy.sendMessage(
    replyJid,
    { audio: { url }, mimetype: "audio/mpeg", ptt },
    { quoted: len },
  );
```

**[+] Contoh penggunaan:**
```js
LenwyAudio("https://example.com/audio.mp3", true);  // true  = tampil sebagai voice note
LenwyAudio("https://example.com/audio.mp3", false); // false = tampil sebagai file audio
```

---

#### **[F] Send File**

Digunakan untuk mengirim file atau dokumen dalam bentuk buffer:

```js
const LenwyFile = (buffer, fileName, mime) =>
  lenwy.sendMessage(
    replyJid,
    { document: buffer, fileName, mimetype: mime },
    { quoted: len },
  );
```

**[+] Contoh penggunaan:**
```js
LenwyFile(buffer, "Lenwy.pdf", "application/pdf");
```

---

### **[ 9 ] Label System**

Bot menggunakan label system untuk menandai setiap fitur berdasarkan hak akses yang dibutuhkan. Label ini akan otomatis muncul di samping nama fitur saat menu ditampilkan, sehingga pengguna langsung tahu siapa yang bisa menggunakan fitur tersebut.

#### **[A] Label Generator**

Fungsi berikut membaca metadata fitur dan menentukan label yang sesuai berdasarkan prioritas:

```js
function getLabel(info) {
  if (info.owner) return "Owner";
  if (info.premium) return "Premium";
  if (info.admin) return "Admin";
  if (info.botAdmin) return "BotAdmin";
  if (info.group) return "Group";
  if (info.private) return "Private";
  return "Public";
}
```

**[+] Contoh hasil label yang tampil di menu:**

```
[+] .Lenwy   [Owner]
[+] .Kick    [Admin]
[+] .Add     [BotAdmin]
[+] .Twitter [Premium]
[+] .Sticker
```

---

#### **[B] Label Priority System**

Sistem label menggunakan urutan prioritas untuk menentukan label mana yang ditampilkan jika sebuah fitur memiliki lebih dari satu batasan akses:

```js
const labelPriority = {
  Public: 0,
  Owner: 1,
  Premium: 2,
  Admin: 3,
  BotAdmin: 4,
  Group: 5,
  Private: 6,
};
```

Sistem prioritas ini juga digunakan untuk mengurutkan tampilan fitur di menu dan mengelompokkannya berdasarkan level permission, sehingga menu terlihat lebih rapi dan terstruktur.

---

### **[ 10 ] Struktur Fitur**

Setiap fitur pada bot dibangun menggunakan template yang terdiri dari dua bagian utama, yaitu **metadata** (`info`) dan **handler function**. Template ini membuat penambahan fitur baru menjadi sangat mudah tanpa perlu mengubah sistem utama bot.

---

#### **[A] Metadata Feature**

Metadata mendefinisikan seluruh identitas fitur, mulai dari nama, kategori menu, command yang digunakan, hingga hak akses pengguna:

```js
export const info = {
  name: "Tiktok Downloader",

  menu: ["Tiktok"],
  case: ["tt", "ttdl", "tiktok"],

  description: "Downloader TikTok",
  hidden: false,

  owner: false,
  premium: false,
  group: false,
  private: false,
  admin: false,
  botAdmin: false,

  allowPrivate: false,
};
```

---

#### **[B] Handler Function**

Handler adalah fungsi utama yang akan dijalankan ketika command dipanggil oleh user. Semua data yang dibutuhkan tersedia melalui parameter `leni`:

```js
export default async function handler(leni) {
  // logika fitur di sini
}
```

Kamu bisa mengambil data yang diperlukan dari `leni` menggunakan destructuring:

```js
const { command, q, LenwyText, LenwyWait, LenwyVideo } = leni;
```

Di mana `command` adalah perintah yang dipanggil user, `q` adalah teks setelah command, dan sisanya adalah helper function yang sudah tersedia.

---

#### **[C] Template Dengan Switch Case**

Gunakan template ini jika satu file fitur menangani beberapa command dengan logika yang berbeda-beda:

```js
switch (command) {
  case "tt":
  case "ttdl":
  case "tiktok": {
    // logika fitur
    break;
  }
}
```

**[+] Contoh implementasi lengkap:**
```js
// ./WhatsApp/case/owner/control.js

switch (command) {
  case "enable": {
    if (!target) return LenwyText("*Contoh: .Enable tiktok*");

    const pluginData = commands.get(target);
    if (!pluginData) return LenwyText("❌ Plugin Tidak Ditemukan.");

    state.disable = state.disable.filter((v) => v !== target);
    state.maintenance = state.maintenance.filter((v) => v !== target);

    savePluginState(state);
    return LenwyText(`🎁 Plugin *${target}* Berhasil Diaktifkan.`);
  }

  case "disable": {
    if (!target) return LenwyText("*Contoh: .Disable tiktok*");

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
    if (!target) return LenwyText("*Contoh: .Main tiktok*");

    const pluginData = commands.get(target);
    if (!pluginData) return LenwyText("❌ Plugin Tidak Ditemukan.");

    if (!state.maintenance.includes(target)) {
      state.maintenance.push(target);
    }

    savePluginState(state);
    return LenwyText(`🛠 Plugin *${target}* Memasuki Pemeliharaan.`);
  }

  case "unmain": {
    if (!target) return LenwyText("*Contoh: .Unmain tiktok*");

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
```

**[+] Keuntungan menggunakan switch case:**
* Cocok untuk fitur dengan banyak command dalam satu file
* Logika setiap command bisa dipisahkan dengan rapi
* Struktur lebih terorganisir untuk fitur yang kompleks

---

#### **[D] Template Tanpa Switch Case**

Gunakan template ini jika semua command dalam file tersebut menjalankan logika yang sama. Karena command sudah ditentukan oleh metadata, handler cukup ditulis sekali:

```js
export default async function handler(leni) {
  const { q, LenwyText, LenwyWait, LenwyVideo } = leni;

  // logika fitur langsung di sini
}
```

**[+] Contoh implementasi lengkap:**
```js
// ./WhatsApp/case/owner/direktori.js

export default async function handler(leni) {
  const { q, LenwyText } = leni;

  let targetPath = q.trim() || process.cwd();
  if (targetPath.includes("..")) {
    return LenwyText("❌ *Akses Direktori Di Luar Batas.*");
  }

  const resolvedPath = path.resolve(targetPath);

  try {
    if (!fs.existsSync(resolvedPath)) {
      return LenwyText(`❌ *Direktori atau File Tidak Ditemukan:* \`${targetPath}\``);
    }

    const stats = fs.statSync(resolvedPath);

    if (stats.isFile()) {
      const fileName = path.basename(resolvedPath);

      if (
        fileName.toLowerCase().includes(".env") ||
        fileName.toLowerCase().endsWith(".pem") ||
        fileName.toLowerCase().endsWith(".key")
      ) {
        return LenwyText("🚫 Akses Diblokir: File Ini Mengandung Kredensial Sensitif.");
      }

      const fileContent = fs.readFileSync(resolvedPath, "utf-8");
      await LenwyText(fileContent);
      return;
    }

    if (stats.isDirectory()) {
      const items = fs.readdirSync(resolvedPath, { withFileTypes: true });

      let response = `*[+] Direktori/File:*\n\n \`${targetPath}\`\n\n`;
      let folders = [];
      let files = [];

      items.forEach((item) => {
        if (item.name.toLowerCase() === ".env") return;
        if (item.isDirectory()) {
          folders.push(`📁 ${item.name}`);
        } else {
          files.push(`📄 ${item.name}`);
        }
      });

      if (folders.length > 0) {
        response += `*Folders (${folders.length}):*\n${folders.join("\n")}\n\n`;
      }
      if (files.length > 0) {
        response += `*Files (${files.length}):*\n${files.join("\n")}`;
      }
      if (folders.length === 0 && files.length === 0) {
        response += "*(Direktori kosong atau hanya berisi file tersembunyi)*";
      }

      await LenwyText(response);
      return;
    }

    LenwyText(`❌ Tipe path tidak didukung. Harap tentukan File atau Folder.`);
  } catch (error) {
    console.error("Error DIR Command:", error);
    LenwyText(`❌ Gagal membaca path. Pastikan path benar dan bot memiliki izin.\nDetail: ${error.message}`);
  }
}
```

**[+] Keuntungan metode ini:**
* Kode lebih pendek dan mudah dibaca
* Cocok untuk fitur dengan logika tunggal

Kedua template sepenuhnya kompatibel dengan sistem bot. Developer bebas memilih metode yang paling sesuai dengan kebutuhan fitur yang dibuat — keduanya tidak akan menyebabkan error.

---

## 🎁 **Informasi Developer**

**Author :** Lenwy  
**Youtube :** Lenwy  
**Instagram :** @ilenwy_

---

## 🤝 **Kontribusi**

Kontribusi selalu terbuka! Jika anda ingin meningkatkan base ini, silakan lakukan fork pada repositori ini dan ajukan pull request dengan perubahan yang kamu buat.

---

## 📄 **License**

MIT License

Copyright (c) 2026 Lenwy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#### **Copyright © 2026 Lenwy**
