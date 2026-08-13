# 🗺️ Zenith Rework — Master Playbook untuk Zed Agent

> Peran saya di sini: **mind master** yang menyusun brief + prompt. Eksekusi teknis (edit file, install package, commit) dilakukan oleh Agent Panel di Zed. Tempel tiap blok "PROMPT UNTUK ZED" secara berurutan, review diff-nya, baru lanjut ke fase berikutnya — jangan tempel semua sekaligus, karena migrasi Vite→Next.js + rebranding + reskin sekaligus terlalu besar untuk satu pass agent yang reliable.

**Catatan soal daftar skill yang kamu lampirkan:** itu terbaca seperti katalog skill gaya *Google Antigravity*, bukan sistem skill Zed. Zed Agent tidak "memanggil" skill dengan nama seperti itu — dia hanya membaca instruksi di prompt/context yang kamu berikan. Jadi saya sudah **menenun keahlian dari skill-skill yang relevan langsung ke dalam prompt di bawah**, supaya tetap jalan di Zed tanpa bergantung pada sistem skill itu. Kalau ternyata kamu *juga* punya skill/rules file custom di dalam project untuk Zed (`.rules`, `AGENTS.md`, dst), sebut nama skill relevan (`claude-frontend-design`, `impeccable`, `framer-motion-expert`, `a11y-auditor`, `stitch-google`, `react-performance-optimizer`, `vercel-v0`) di awal prompt supaya agent Zed ikut membacanya sebagai konteks tambahan.

---

## 0. Temuan Audit Cepat

Saya cek repo dan situs live-nya dulu sebelum menulis brief:

- Repo `Zxaviers/Zxaviers` bukan cuma profile-README — isinya juga source code situs: `src/`, `public/`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, `.prettierrc`, `.github/workflows`. Artinya stack saat ini **Vite + React + Tailwind**, dideploy lewat GitHub Actions (kemungkinan besar ke GitHub Pages).
- ⚠️ **Perhatian penting**: nama repo `Zxaviers/Zxaviers` (sama dengan username) itu repo spesial GitHub — isinya otomatis tampil di halaman profil `github.com/Zxaviers`. Kalau kamu rebrand ke Zenith dan ganti nama repo, kamu **kehilangan fitur profile-README otomatis** itu. Rekomendasi: buat repo baru khusus situs, misal `zenith` atau `zenith-portfolio`, dan biarkan `Zxaviers/Zxaviers` tetap jadi profile README (atau update juga kontennya belakangan, terpisah dari kode situs).
- Situs live saat ini: *"Zxaviers | Computer Engineering Student & Web Developer"* — portfolio Rizky Mardhani, fokus web dev + IoT/embedded (ESP32, Arduino, sensor).
- Codedex.io: brand identitasnya adalah "coding sebagai petualangan fantasi" — pixel art, XP, region yang di-unlock, badge koleksi. Ini yang jadi acuan *vibe*, bukan untuk ditiru palet warnanya mentah-mentah (biar Zenith tidak terasa seperti clone).

**Asumsi awal saya** (sebagian sudah dikoreksi oleh audit Fase 0 — lihat 0.1 di bawah):
1. Bahasa konten tetap **Inggris** (situs asli sudah Inggris, portfolio internasional). ✅ masih berlaku.
2. Identitas personal (nama asli, email, Instagram) tetap dipertahankan sebagai kredit "crafted by", yang di-rebrand adalah *brand/nama proyek* dari "Zxaviers" → "Zenith". ✅ masih berlaku, dipertegas di 0.1.
3. Domain: tetap pakai `zxaviers.site` dulu. ✅ dikonfirmasi.
4. ~~Hosting: Vercel.~~ ❌ **salah** — audit menemukan situs live di **Netlify** (`public/_redirects`, mention eksplisit di kode). Lihat 0.1.

## 0.1 Keputusan setelah audit Fase 0 (berdasarkan laporanmu)

| Pertanyaan terbuka dari audit | Keputusan |
|---|---|
| Hosting target? | **Netlify** (bukan Vercel/GitHub Pages). Pakai `@netlify/plugin-nextjs` — support penuh App Router, SSR, ISR, image optimization, dynamic OG image. Tidak perlu static export. |
| Repo yang sama atau split? | **Split.** Buat repo baru `zenith`, push branch kerja ke sana. `Zxaviers/Zxaviers` dibiarkan utuh sebagai profile README GitHub. Detail eksekusi di Fase 0.5. |
| Devlog & SecretGame easter egg? | **Dipertahankan keduanya.** Selaras dengan brief "hangat & playful", bukan penyimpangan. SecretGame boleh dikuatkan jadi easter egg tersembunyi di starfield (nice-to-have). |
| Garis personal vs brand? | Handle GitHub/Instagram/email = identitas personal, **tidak berubah**. Wordmark/judul/heading/OG image = brand proyek, **jadi "Zenith"**. Dialog `About.jsx` dipertahankan formatnya, tapi framing-nya: Zxaviers = operator/pilot, Zenith = nama misi. |
| Domain? | Tetap `zxaviers.site` untuk sekarang. |

Konsekuensi: **ini evolusi, bukan rebuild dari nol.** `Skills.jsx` (grid skill grouped), `Experience.jsx` ("AGENT STATUS", heading "Mission Log"), `About.jsx` (dialog Headquarters↔Zxaviers), dan starfield/pixel-panel CSS yang sudah ada jadi **basis** untuk Fase 4, bukan dibuang dan ditulis ulang dari nol.

---

## 1. Skill yang perlu diaktifkan/dipakai dari daftarmu

| Skill | Kenapa relevan |
|---|---|
| `stitch-google` | Menerjemahkan *vibe* Codedex jadi spesifikasi desain terstruktur — dipakai di Fase 2. |
| `claude-frontend-design` / `impeccable` / `design-taste-frontend` | Eksekusi & polish komponen React/Tailwind supaya tidak terasa template generik. |
| `vercel-v0` | Konvensi Next.js + Tailwind + Shadcn yang idiomatis. |
| `framer-motion-expert` | Semua micro-interaction bergaya game (hover sprite, path reveal, boot sequence). |
| `a11y-auditor` | Wajib — palet gelap + font pixel rawan masalah kontras & keterbacaan. |
| `react-performance-optimizer` | Next.js tetap React di baliknya; jaga performa walau banyak aset pixel/animasi. |
| `accidental-data-loss-prevention` | Aktifkan saja sebagai jaring pengaman selama migrasi (banyak file lama akan dihapus/diganti). |

## 2. Skill tambahan yang saya rekomendasikan kamu tambahkan

Tidak ada di daftarmu yang secara spesifik menutup area berikut. Kalau sistem skill-mu (Antigravity atau lainnya) bisa install skill baru, ini yang paling bernilai untuk project ini — urut prioritas:

1. **Next.js App Router / Server Components specialist** — migrasi Vite→Next.js punya jebakan spesifik (routing, metadata API, `next/image`, client vs server component) yang tidak dicover skill React generik.
2. **Pixel-art & retro game UI specialist** — soal teknis 9-slice panel, sprite sheet, `image-rendering: pixelated`, grid pixel-perfect scaling — beda kelas dari desain frontend biasa.
3. **Technical SEO / Core Web Vitals auditor** — penting karena kamu ganti brand + kemungkinan struktur URL; perlu sitemap, structured data, dan Lighthouse budget yang dijaga ketat.
4. **Game-narrative copywriting** — supaya copy "quest/adventure" tidak terasa cringe atau template; ini beda skill dari desain visual.

Kalau tidak ada skill siap pakai untuk keempat ini, tidak masalah — instruksinya sudah saya tulis langsung di dalam prompt Fase 3–6 di bawah, jadi Zed Agent tetap bisa jalan.

---

## 3. Design Brief — "Zenith: Warm Nebula" (tema space, dipertahankan dari identitas asli)

Kamu benar, saya koreksi: identitas asli Zxaviers memang **space-themed** ("Pixel-art & Space-themed UI lover", "Powered by Pixel Art & Space Vibes 🚀") — itu harus dipertahankan, bukan diganti tema gunung. Kabar baiknya, ini malah lebih pas: secara astronomi **"zenith"** adalah titik tertinggi di langit tepat di atas pengamat — jadi nama brand dan tema space nyambung secara alami, tanpa harus meniru "desa fantasi" ala Codedex. Yang saya ambil dari Codedex cuma *vibe*-nya: hangat, santai, pixel, terasa seperti sedang berpetualang — bukan palet warnanya.

### Token warna — "Warm Nebula"
| Nama | Hex | Peran |
|---|---|---|
| Comet Orange | `#FF8B4C` | Aksen utama, CTA, ekor komet/api roket |
| Star Gold | `#FFC857` | Aksen sekunder, badge/XP/glow bintang |
| Void Indigo | `#1B1235` | Background dasar (ruang angkasa gelap) |
| Nebula Violet | `#3E2A63` | Layer kartu/panel — awan nebula di atas background |
| Star Chart Cream | `#F5E9D6` | Teks terang & panel gaya "peta bintang" kertas astronom lama |
| Aurora Green | `#6FCF97` | Status sukses/"level up", dipakai sangat sedikit |

*(Ini tetap palet gelap-hangat dengan aksen oranye-emas yang sama seperti sebelumnya — cuma pemaknaannya sekarang eksplisit ruang angkasa: nebula, komet, bintang, aurora — bukan gunung/senja.)*

### Tipografi
- **Display/pixel** (dipakai terbatas — judul hero, label section, badge): `Press Start 2P` atau `Silkscreen`, self-hosted via `next/font/local`.
- **Body** (untuk keterbacaan panjang): sans hangat dan rounded — `Nunito` atau `Quicksand`, bukan pixel font, supaya paragraf tetap nyaman dibaca.
- **Angka/stat/tag** (Lv., XP, tech-tag): monospace ringan — `JetBrains Mono` atau `VT323` — dipakai kecil saja untuk sentuhan game tanpa merusak keterbacaan.

### Layout & signature element
- Section bukan navbar biasa, tapi **peta bintang/navigasi (star map)**: About = *Mission Control*, Skills = *Constellation*, Projects = *Mission Log*, Experience = *Flight Path*, Contact = *Send a Transmission*. Titik-titik bintang terhubung garis putus pixel yang "tergambar" saat discroll, seperti menghubungkan rasi bintang.
- **Elemen signature (satu-satunya yang paling berani, sisanya tenang)**: **Constellation Skill Tree** di section Skills — tiap skill jadi bintang pixel, dikelompokkan per kategori (Web, IoT/Embedded, Tools) membentuk rasi bintang yang saling terhubung, hover/tap menampilkan tooltip "Lv." dan bintangnya menyala lebih terang. Ini menjawab "petualangan interaktif" secara nyata sekaligus tetap 100% tema space.
- Kartu bergaya panel HUD kokpit / peta bintang astronom: border pixel 9-slice, sudut bertakik gaya cockpit display, drop shadow keras (offset, bukan blur) — bukan `shadow-xl` blur khas Tailwind default.
- Hero: parallax starfield multi-layer (bintang dekat bergerak cepat, nebula jauh bergerak lambat saat scroll/mouse-move) + sprite kecil astronaut/roket pixel dengan idle-bob animation, tombol CTA bergaya tombol "launch" konsol (turun 2px + shadow snap saat diklik).
- Motion dipakai secukupnya: boot-sequence loading singkat bergaya "ignition/launch countdown" (±1 detik, auto-skip jika `prefers-reduced-motion`), reveal jalur rasi bintang saat scroll, idle-sprite animation di hero. Hindari animasi bertebaran di semua elemen — itu yang membuat desain terasa AI-generated.

---

## 4. Rencana Migrasi Teknis (ringkas)

`Vite + React (JS)` → `Next.js 15 App Router + TypeScript + Tailwind` (Tailwind config dan hampir semua komponen React bisa dipertahankan strukturnya, yang berubah: routing, entry point, metadata, image handling).

Struktur folder target:
```
app/
  layout.tsx
  page.tsx
  sitemap.ts
  robots.ts
  opengraph-image.tsx
components/
  hero/
  sections/ (mission-control, constellation, mission-log, flight-path, transmission)
  ui/ (pixel-panel, pixel-button, star-node, starfield-background)
lib/
public/
  sprites/
  fonts/
```

---

## 5. Prompt Siap Pakai untuk Zed Agent

Tempel satu blok per fase. Setelah tiap fase selesai, **review diff, jalankan `pnpm dev`/`npm run dev`, commit**, baru lanjut fase berikutnya.

### FASE 0 — Audit & Branch

```
Kamu bekerja di repo Zxaviers/Zxaviers (Vite + React + Tailwind), portfolio pribadi.
Tugas fase ini HANYA audit, jangan ubah kode dulu:

1. Buat branch baru: feature/zenith-nextjs-rework
2. Scan seluruh repo (src/, public/, index.html, package.json, README.md,
   .github/workflows) dan buat daftar SEMUA kemunculan string "zxaviers",
   "Zxaviers", "ZXAVIERS" (case-insensitive) beserta file dan barisnya.
3. Identifikasi semua file/section komponen yang merepresentasikan: Hero,
   About, Skills, Projects/Portfolio, Experience/Timeline (jika ada), Contact,
   Footer, Navbar.
4. Cek deployment: apakah .github/workflows men-deploy ke GitHub Pages atau
   platform lain? Cek base path / homepage di package.json atau vite.config.js.
5. Rangkum semua temuan di atas dalam bentuk checklist markdown
   (REBRAND_AUDIT.md di root repo) tapi JANGAN commit dulu — tampilkan isinya
   ke saya dulu untuk saya konfirmasi sebelum lanjut ke fase migrasi.
```

### FASE 0.5 — Split Repo (baru, hasil keputusan pasca-audit)

```
Sebelum scaffold Next.js dimulai, pisahkan kerja ini dari repo profile-README:

1. Buat repo baru KOSONG di akun yang sama bernama "zenith" (via GitHub CLI
   `gh repo create zenith --private --source=. ` atau lewat web lalu tambahkan
   sebagai remote — pilih cara yang tersedia).
2. Tambahkan remote baru, misal:
   git remote add zenith-origin git@github.com:<username>/zenith.git
3. Push branch feature/zenith-nextjs-rework saat ini ke remote baru sebagai
   main-nya:
   git push zenith-origin feature/zenith-nextjs-rework:main
4. Konfirmasikan ke saya bahwa repo baru sudah berisi branch ini sebagai main,
   lalu SEMUA fase berikutnya (Fase 1 dst) dikerjakan dengan remote origin
   diarahkan ke repo "zenith" ini, BUKAN lagi ke Zxaviers/Zxaviers.
5. JANGAN hapus, force-push, atau ubah apa pun di remote asli Zxaviers/Zxaviers
   — repo itu tetap harus berfungsi sebagai profile README GitHub tanpa
   terganggu oleh migrasi ini.
```

### FASE 1 — Scaffold Next.js baru

```
Konteks penting: ini EVOLUSI dari implementasi yang sudah cukup matang, bukan
rebuild dari nol. Sebelum menulis komponen baru, baca dulu implementasi yang
sudah ada: Skills.jsx (grid skill grouped web/iot/tools, connector lines,
tooltip, level coloring), Experience.jsx ("AGENT STATUS" stat card, heading
"Mission Log"), About.jsx (dialog Headquarters↔Zxaviers), starfield background
+ pixel-panel CSS yang sudah ada, devlog (/devlog), dan SecretGame easter egg
tersembunyi. Semua itu DIPERTAHANKAN kontennya, hanya migrasi bentuk teknisnya
ke Next.js/TypeScript di fase-fase berikutnya — jangan didesain ulang dari nol.

Sekarang mulai migrasi ke Next.js (di repo "zenith" hasil Fase 0.5):

1. Inisialisasi Next.js 15 (App Router, TypeScript, Tailwind CSS, ESLint)
   di dalam repo yang sama (boleh di folder sementara lalu dipindah, atau
   langsung di root — pilih pendekatan yang paling minim risiko merusak
   file lama sebelum migrasi selesai).
2. Install dependency tambahan: framer-motion, lucide-react, clsx,
   tailwind-merge, @netlify/plugin-nextjs.
3. Migrasikan tailwind.config.js ke tailwind.config.ts, sesuaikan content
   paths untuk struktur app/.
4. Pindahkan aset dari public/ lama ke public/ Next.js, pertahankan struktur
   yang masih relevan, termasuk public/_redirects (sesuaikan isinya nanti
   di Fase 6 kalau ada rule yang konflik dengan routing Next.js).
5. Pastikan route /devlog dan trigger SecretGame easter egg tetap dipetakan
   di struktur app/ baru — jangan sampai hilang saat migrasi routing.
6. Buat app/layout.tsx dan app/page.tsx kosong yang bisa jalan (npm run dev
   tanpa error) sebelum kita isi kontennya di fase berikutnya.
7. Jangan hapus source Vite lama dulu — biarkan koeksis di branch ini sampai
   migrasi selesai dan tervalidasi, baru dihapus di fase terakhir.
```

### FASE 2 — Design System "Warm Nebula" (tema space)

```
Implementasikan design token berikut sebagai fondasi Tailwind + CSS variables
(jangan mulai bangun section dulu di fase ini):

Warna (tambahkan ke tailwind.config.ts sebagai custom colors):
- comet: #FF8B4C
- star: #FFC857
- void: #1B1235
- nebula: #3E2A63
- starchart: #F5E9D6
- aurora: #6FCF97

Tipografi (pakai next/font/local, self-host, subset karakter yang dipakai saja):
- --font-display: Press Start 2P (atau Silkscreen) — untuk judul hero & label
  section saja, JANGAN dipakai untuk paragraf panjang (keterbacaan buruk).
- --font-body: Nunito atau Quicksand — untuk seluruh body text.
- --font-stat: VT323 atau JetBrains Mono — untuk angka Lv./XP/tag teknologi.

Bangun komponen UI dasar reusable di components/ui/:
- PixelPanel: panel dengan border pixel 9-slice style + drop shadow keras
  (offset x/y, bukan blur), sudut bertakik gaya cockpit HUD, varian warna
  nebula/starchart.
- PixelButton: tombol dengan efek "tekan tombol launch" (translate-y-[2px]
  + shadow snap) saat :active, fokus keyboard yang jelas (outline pixel,
  bukan default browser outline blur).
- StarNode: titik peta bintang kecil (circle pixel bercahaya) dengan state
  locked/unlocked/active, dipakai nanti di navigasi dan constellation
  skill tree.
- StarfieldBackground: layer bintang + nebula parallax reusable, dengan
  prop intensity supaya bisa dipakai beda-beda kepadatan di tiap section
  (hero lebih ramai, section lain lebih halus).

Buat halaman /style-guide sementara yang menampilkan semua token dan
komponen di atas supaya bisa direview visual sebelum dipakai di section asli.
```

### FASE 3 — Rebranding Konten

```
Ganti seluruh identitas brand dari "Zxaviers" ke "Zenith" berdasarkan
REBRAND_AUDIT.md fase 0:

1. metadata di app/layout.tsx: title "Zenith | Computer Engineering Student
   & Web Developer", description turunan dari deskripsi lama tapi disebut
   sebagai Zenith.
2. package.json name, README.md judul & isi (tapi biarkan kredit nama asli
   Rizky Mardhani sebagai "Crafted by" — JANGAN hapus identitas personal,
   yang berubah adalah nama brand/proyeknya).
3. favicon, manifest.json/site.webmanifest, og-image — buat ulang dengan
   wordmark "Zenith" bergaya pixel (pakai --font-display).
4. Tulis ulang copy tiap section dengan gaya "navigasi luar angkasa" tapi
   TETAP jelas dan tidak berlebihan (hindari jargon game yang memaksa):
   - Navbar/section label: Mission Control (About), Constellation (Skills),
     Mission Log (Projects), Flight Path (Experience),
     Send a Transmission (Contact)
   - Gunakan active voice, kalimat pendek, tanpa filler kata sesuai prinsip
     copywriting produk (bukan menjual diri secara berlebihan, tapi
     menjelaskan dengan jelas apa yang bisa dilihat pengunjung).
5. JANGAN ubah email, handle Instagram, atau link sosial lain kecuali saya
   minta eksplisit.
```

### FASE 4 — Bangun Section & Signature Component

```
Bangun tiap section di components/sections/ menggunakan PixelPanel,
PixelButton, StarNode, StarfieldBackground, dan token dari Fase 2:

1. Hero: StarfieldBackground intensity tinggi (multi-layer parallax bintang
   + awan nebula, beda kecepatan scroll pakai framer-motion useScroll),
   sprite astronaut/roket kecil dengan idle-bob animation di foreground,
   CTA utama pakai PixelButton gaya "launch", headline pakai --font-display
   secukupnya (satu baris pendek saja).
2. Mission Control/About: layout seperti "character stat card" RPG ringan
   (mission dashboard) — TETAP dibaca sebagai bio profesional biasa, jangan
   sampai substansinya hilang demi tema.
3. Constellation/Skills (SIGNATURE COMPONENT — kerjakan paling teliti):
   tiap skill jadi StarNode yang saling terhubung garis membentuk rasi
   bintang, grouping berdasarkan kategori (Web, IoT/Embedded, Tools),
   hover/tap menampilkan tooltip level & bintang menyala lebih terang.
   Ini elemen paling "berani" di halaman — section lain harus lebih tenang
   supaya ini yang diingat.
4. Mission Log/Projects: kartu proyek pakai PixelPanel gaya cockpit HUD,
   tag stack teknologi pakai --font-stat, link live-demo & repo sebagai
   dua tombol kecil.
5. Flight Path/Experience (jika ada datanya): garis vertikal path dengan
   StarNode di tiap milestone, reveal saat discroll pakai whileInView
   framer-motion.
6. Send a Transmission/Contact: form dengan styling panel dialog gaya
   radio transmisi, validasi dasar, states loading/success/error jelas
   dan to-the-point.
7. SecretGame easter egg: pertahankan trigger yang sudah ada. Kalau bisa
   tanpa banyak effort, bungkus jadi "shooting star tersembunyi" langka di
   StarfieldBackground (klik/tap untuk trigger) — kalau itu terlalu banyak
   kerja untuk fase ini, biarkan dulu trigger lama apa adanya, jangan
   dihapus.
8. Devlog (/devlog): migrasikan apa adanya ke struktur app/ baru, tidak
   perlu direstyle ulang di fase ini kecuali untuk konsistensi token warna
   dasar (font/warna ikut Fase 2), isi & strukturnya tidak perlu diubah.
9. Terapkan prefers-reduced-motion: semua animasi non-esensial (parallax
   starfield, boot sequence, idle sprite) harus punya fallback statis
   (starfield tetap tampil tapi diam, tidak dihilangkan total).
```

### FASE 5 — Aksesibilitas & Performa

```
Audit dan perbaiki:

1. Cek rasio kontras WCAG AA untuk semua kombinasi teks-di-atas-background
   yang dipakai (terutama comet/star di atas void/nebula) — sesuaikan
   shade jika ada yang gagal AA, catat perubahan apa saja yang dilakukan.
2. Semua elemen interaktif (StarNode, constellation node, tombol) harus
   bisa diakses keyboard (tab order logis, :focus-visible jelas bergaya
   pixel selection, bukan dihilangkan).
3. Semua sprite/ikon pixel wajib punya alt text deskriptif atau
   aria-hidden jika dekoratif murni.
4. Lazy-load section di bawah fold, pakai next/image untuk semua aset
   visual, pastikan --font-display di-subset agar file font kecil.
5. Jalankan build production lokal dan laporkan ukuran bundle per route.
```

### FASE 6 — SEO, Metadata, Deployment (Netlify)

```
1. Implementasikan Next.js Metadata API lengkap: title template, OG image
   dinamis (app/opengraph-image.tsx) bertema Warm Nebula dengan wordmark
   Zenith, sitemap.ts, robots.ts, JSON-LD schema Person + WebSite.
2. Setup deployment Netlify:
   - Install & konfigurasi @netlify/plugin-nextjs di netlify.toml
     (build command, publish directory sesuai plugin, plugin block).
   - Review public/_redirects yang lama: aturan redirect Vite-era yang
     konflik dengan routing Next.js App Router harus disesuaikan atau
     dihapus (Next.js punya mekanisme redirect/rewrite sendiri di
     next.config kalau perlu, gunakan itu untuk hal yang sifatnya
     route-level, sisakan _redirects hanya untuk hal yang memang
     Netlify-specific).
   - Pastikan environment/domain custom (zxaviers.site) tetap terhubung
     ke site Netlify yang sama, jangan buat site Netlify baru dari nol
     kalau bisa reuse yang sudah ada.
3. Update workflow .github/workflows (ci.yml) supaya lint/test/build tetap
   jalan untuk struktur Next.js yang baru.
4. Setelah semua fase tervalidasi dan situs baru jalan mulus, baru hapus
   source code Vite lama (src/ lama, vite.config.js, index.html lama) dan
   file REBRAND_AUDIT.md.
```

### FASE 7 — QA Checklist Final

```
Sebelum merge ke main, jalankan checklist ini dan laporkan hasilnya:

1. grep seluruh repo untuk "zxaviers"/"Zxaviers" yang tidak sengaja
   tertinggal (di luar kredit personal yang memang dipertahankan).
2. Lighthouse (mobile) untuk Performance, Accessibility, Best Practices,
   SEO — target semua ≥90, catat skor sebelum & sesudah.
3. Test manual: prefers-reduced-motion aktif → pastikan animasi non-esensial
   nonaktif tapi konten tetap utuh dan fungsional.
4. Test responsive di breakpoint mobile (360px), tablet, desktop — khususnya
   Constellation dan Star Map yang paling kompleks layoutnya.
5. Validasi semua link (repo, live demo, sosial media) masih benar setelah
   rebranding.
6. Validasi route /devlog dan trigger SecretGame easter egg masih berfungsi
   di struktur Next.js yang baru.
```

---

## 6. Cara pakai

1. Buka repo di Zed, buat branch baru, tempel **Fase 0** ke Agent Panel. *(sudah selesai kamu jalankan)*
2. Review `REBRAND_AUDIT.md` yang dihasilkan — sudah dikonfirmasi lewat 0.1 di atas.
3. Jalankan **Fase 0.5** (split repo) sebelum lanjut ke scaffold Next.js.
4. Lanjut Fase 1–7 satu per satu, commit tiap fase, dengan remote origin sudah diarahkan ke repo `zenith`.
5. **Ingin jalan otomatis tanpa menunggu tiap fase?** Lihat Section 7 — Mode Otonom.

---

## 7. Mode Otonom

Supaya Zed Agent bisa menjalankan sisa migrasi (Fase 0.5–7) tanpa menunggu konfirmasi manual di setiap fase — penting kalau sesi kamu (baik sesi ini maupun sesi Zed) mepet limit.

### Langkah 1 — Simpan playbook ini ke dalam repo
Copy seluruh isi file ini ke repo sebagai `ZENITH_PLAYBOOK.md` di root, commit. Ini jadi satu-satunya sumber kebenaran yang dibaca agent — supaya saya tidak perlu menulis ulang isi tiap fase di setiap prompt.

### Langkah 2 — Setting Zed
Tambahkan snippet `tool_permissions` di atas ke `settings.json` supaya agent tidak berhenti minta izin di tiap tool call, tapi tetap ada guardrail untuk aksi destruktif.

### Langkah 3 — Tempel prompt kickoff ini sekali

```
Kamu sekarang beroperasi dalam MODE OTONOM untuk sisa migrasi Zenith.

Baca ZENITH_PLAYBOOK.md di root repo ini secara PENUH sebagai konteks utama.
Semua keputusan desain, brand, dan hosting sudah final di bagian 0.1 dokumen
itu — JANGAN tanya ulang hal-hal yang sudah diputuskan di sana.

Jalankan Fase 0.5 → 1 → 2 → 3 → 4 → 5 → 6 → 7 (isi lengkap tiap fase ada di
ZENITH_PLAYBOOK.md bagian 5) secara BERURUTAN dan OTOMATIS tanpa menunggu
konfirmasi saya di antara fase, KECUALI kondisi stop di bawah terpenuhi.

Setelah tiap fase selesai:
1. Jalankan build/lint/dev check yang relevan untuk fase itu. Kalau ada
   error, perbaiki sendiri (maksimal 3 percobaan perbaikan per error
   sebelum berhenti dan melapor sebagai blocker).
2. Commit dengan pesan: "zenith: fase <N> - <ringkasan singkat>".
3. Update/append PROGRESS.md di root berisi: fase yang baru selesai,
   keputusan kecil yang kamu ambil sendiri selama fase itu (yang tidak
   tercakup di 0.1), dan fase berikutnya yang akan dikerjakan — supaya
   kalau sesi ini terputus, sesi baru bisa langsung lanjut tanpa
   kehilangan konteks.
4. Lanjut ke fase berikutnya tanpa berhenti.

Untuk hal-hal detail yang BELUM dibahas di ZENITH_PLAYBOOK.md (bukan yang
sudah diputuskan di 0.1) — putuskan sendiri dengan opsi yang paling
reversible, catat keputusannya di PROGRESS.md, lalu lanjut. Jangan berhenti
hanya karena ada detail kecil yang ambigu.

STOP dan tunggu saya HANYA jika salah satu ini terjadi:
1. Butuh kredensial/autentikasi yang belum tersedia di environment ini
   (mis. `gh` CLI belum login, Netlify CLI belum login/site belum di-link).
2. Tindakan destruktif yang tidak bisa dibatalkan: force-push, git reset
   --hard yang membuang commit, atau apa pun yang mengubah/menghapus
   remote maupun isi repo Zxaviers/Zxaviers yang asli.
3. Menemukan sesuatu yang BERTENTANGAN LANGSUNG dengan keputusan final di
   bagian 0.1 ZENITH_PLAYBOOK.md (bukan sekadar detail baru).
4. Error yang sama gagal diperbaiki setelah 3 percobaan.
5. Semua Fase 0.5–7 sudah selesai — laporkan ringkasan akhir: apa saja
   yang berubah, skor Lighthouse dari Fase 7, dan daftar blocker (jika ada)
   yang butuh keputusan saya.
```

### Catatan
- Ini bukan "fire and forget" total — tetap cek `PROGRESS.md` dan commit log sesekali, terutama kalau kamu jauh dari komputer lama.
- Kalau agent berhenti di kondisi stop #1 (kredensial), itu wajar dan bukan kegagalan — tinggal login/link service-nya lalu lanjutkan dengan pesan singkat "lanjutkan dari PROGRESS.md".
- Kalau butuh audit ulang setelah semua fase selesai, cukup minta agent membaca PROGRESS.md dan Fase 7 checklist lagi, tidak perlu saya buatkan prompt baru untuk itu.
