# 🚀 Zenith — Redo Hero + Navbar (Codedex-relaxed direction)

> **Cakupan dokumen ini CUMA Hero + Navbar.** Bukan Constellation, bukan Mission Control, bukan Mission Log, bukan Transmission, bukan Devlog. Section lain TIDAK BOLEH disentuh sampai ada instruksi baru dari saya secara eksplisit.

## 0. Kenapa diulang

Redesign sebelumnya ("Cosmic Retrograde") melenceng jauh dari brief lewat serangkaian "rewrite from scratch" berulang tanpa checkpoint yang benar-benar dihormati, menghasilkan tampilan dashboard-kokpit sci-fi (SYS_OK, hull integrity bar, PilotSideDock, CRT scanlines) yang jauh dari brief asli: **hangat, santai, playful, terasa seperti codedex.io — tapi tetap bertema space** (karena brand-nya Zenith). Dokumen ini menggantikan arah itu, dengan scope sengaja dipersempit ke satu section dulu supaya bisa divalidasi sebelum menyebar ke section lain.

## 1. Keputusan final (jangan tanya ulang, sudah diputuskan)

- **Nama section tetap istilah space** (Mission Control, Constellation, Flight Path, Mission Log, Transmission, Devlog) — yang berubah VISUALNYA, bukan namanya.
- **Konsep level/skill boleh tetap ada** (mis. "Lv. 20", progress EXP), TAPI gayanya harus jadi **badge/lencana game yang playful** (seperti achievement badge di game platformer) — BUKAN panel dashboard/kokpit/telemetry.
- **Scope eksekusi kali ini: Hero + Navbar SAJA.** Setelah ini selesai dan di-review, baru lanjut section lain satu per satu.

## 2. DAFTAR LARANGAN EKSPLISIT (pelajaran dari insiden sebelumnya — jangan hasilkan apa pun dari daftar ini)

```
DILARANG memasukkan elemen berikut, dalam bentuk apa pun:
- Panel status teknis (mis. "SYS_OK", "SYS_INTEGRITY: 100% NOMINAL", "LIVE")
- Progress bar bergaya "hull integrity" atau gauge teknis/mekanis
- Terminal/console readout, teks monospace bergaya command-line di UI dekoratif
- CRT scanline effect, screen-glitch effect, atau efek "layar rusak"
- Side-dock/sidebar panel bergaya kokpit pesawat
- Arcade marquee / lampu berjalan
- Duplikasi informasi yang sama di dua tempat berbeda di layar yang sama
  (mis. data "Class/Sector/EXP" JANGAN ditampilkan dua kali dalam layout
  berbeda — pilih satu representasi saja)

Kalau ragu apakah sebuah elemen termasuk "terlalu teknis/kokpit" atau tidak,
pilih yang lebih sederhana dan hangat, bukan yang lebih rumit dan mekanis.
```

## 3. Referensi gaya "codedex-relaxed" (apa yang justru DIINGINKAN)

```
Rujukan: codedex.io — situs itu terasa santai dan hangat meskipun temanya
fantasi/petualangan, karena: banyak ruang kosong yang dipakai dengan nyaman
(bukan kosong-terasa-belum-selesai, tapi kosong-yang-lapang), ilustrasi
pixel-art dengan proporsi membulat/friendly (bukan tajam/mekanis/militeristik),
tombol besar dan mengundang dengan sudut lembut, warna hangat dipakai
mencolok tapi tidak agresif, dan nada teks yang ramah/personal — bukan
formal/teknis.

Terjemahkan itu ke tema space-nya Zenith:
- Ilustrasi (roket, planet) boleh tetap ada, tapi buat terasa jadi BAGIAN
  dari satu adegan yang koheren (mis. lewat jejak orbit halus, atau
  penempatan yang mengikuti alur baca mata), bukan elemen dekoratif lepas.
- Badge skill/level (poin di atas): bentuk lencana bulat/pixel-star dengan
  label playful ("Lv. 20 Explorer", bukan "SYS_INTEGRITY: NOMINAL").
- Tombol: sudut membulat lembut ala pixel (border-radius kecil, BUKAN
  kotak tajam siku 90 derajat penuh), ukuran cukup besar untuk terasa
  ramah disentuh/diklik.
- Copy/teks: nada personal dan hangat ("Hello, I'm Zxaviers — nice to have
  you here" gaya, bukan "OPERATOR // ZXAVIERS | MISSION // ZENITH").
```

## 4. Token desain (WAJIB, salin persis — jangan buat sistem warna baru/nama baru seperti "Cosmic Retrograde")

```
Warna:
- Background dasar: #1B1235 (void)
- Panel/card: #3E2A63 (nebula)
- Aksen utama: #FF8B4C (comet) — CTA & highlight
- Aksen sekunder: #FFC857 (star) — badge, glow, state aktif
- Teks terang: #F5E9D6 (starchart)
- Aksen sukses (dipakai sedikit): #6FCF97 (aurora)

Tipografi: font pixel/8-bit untuk headline & label pendek SAJA, sans-serif
hangat & rounded untuk semua body text.

Kontras tombol (keras, tidak bisa dinegosiasi): teks gelap (#1B1235) di
atas fill terang (comet/star), teks terang (#F5E9D6) di atas fill gelap
(void/nebula). Tidak pernah teks hilang/invisible/kontras rendah.

Starfield: bintang tersebar organik (sudah benar di iterasi sebelumnya,
pertahankan pendekatan itu — jangan diubah jadi pola grid lagi).
```

## 5. Alur eksekusi

### Tahap 1 — Generate via MCP Stitch (satu kali, style + Hero + Navbar digabung dalam satu sesi Stitch supaya konsisten)
```
Design the Hero + Navbar for Zenith. Style: warm, relaxed, playful
interactive-adventure with a space theme — like codedex.io's cozy,
inviting game-adventure feel, translated into a night-sky/nebula palette
instead of a daytime fantasy village. NOT a sci-fi cockpit/dashboard —
avoid any mission-control telemetry readouts, status gauges, or terminal
styling.

[Tempelkan isi Bagian 4 — Token desain — persis di sini]

Navbar: logo "Zenith" top-left, links: Home, Mission Control, Constellation,
Flight Path, Mission Log, Transmission, Devlog. Soft rounded pixel-panel
style, friendly not militaristic.

Hero: headline "Hello, I'm Zxaviers", subtitle "Web Enthusiast & IoT
Embedded Explorer", one primary CTA "Launch into Mission Log" (filled,
comet) and one secondary CTA "Send a Transmission" (outlined). If a
skill-level badge is shown, style it as a rounded playful game badge
(e.g. "Lv. 20 Explorer" with a small star icon), NOT a technical stat
panel — and show it in ONE place only, not duplicated.

Illustrations (rocket, planet) should feel like one cohesive scene, not
scattered stickers — a soft orbit trail or consistent depth/parallax
sense connecting them.
```

### Tahap 2 — Checkpoint (WAJIB, satu-satunya jeda)
Tampilkan hasil Stitch (screenshot/export) ke saya. **BERHENTI DI SINI. Jangan lanjut ke Tahap 3 tanpa persetujuan eksplisit saya**, walau ada checkpoint/ringkasan otomatis dari sistem Antigravity sendiri yang muncul — itu bukan izin untuk lanjut.

### Tahap 3 — Implementasi (setelah disetujui)
Port ke `Navbar.tsx` dan `Hero.tsx` yang sudah ada. Konsistenkan ke token Tailwind yang sudah ada di `tailwind.config.ts` (`comet`, `star`, `void`, `nebula`, `starchart`, `aurora`) — jangan buat nama token warna baru. Build (`npm run build:next`), commit SATU KALI: `zenith: redo Hero+Navbar - codedex-relaxed direction`.

## 6. ATURAN STOP KERAS (beda dari sebelumnya — ini yang gagal dihormati kemarin)

```
SETELAH Tahap 3 selesai dan commit sekali:
- BERHENTI TOTAL. Jangan mulai "polish lagi", jangan "improve further",
  jangan sentuh section lain, jangan buat commit tambahan apa pun terkait
  desain, walau merasa ada yang bisa "ditingkatkan".
- Checkpoint/ringkasan otomatis dari sistem BUKAN sinyal untuk melanjutkan
  pekerjaan apa pun — itu cuma laporan status, bukan instruksi baru.
- Tunggu pesan eksplisit berikutnya dari saya (via user) sebelum
  mengerjakan section lain atau melakukan perubahan desain apa pun lagi.
```

Kondisi stop lain (tetap berlaku seperti biasa): butuh kredensial yang belum ada, tindakan destruktif tak bisa dibatalkan, atau menyentuh remote `Zxaviers/Zxaviers` untuk hal SELAIN yang sudah eksplisit disetujui.
