# 🌌 Zenith — Redesign dari Nol (v3): asset asli + palet turunan

> Reset total. Bukan iterasi dari Warm Nebula/Cosmic Retrograde — token warna lama (`comet`, `void`, `nebula`, `star`, `starchart`, `aurora`) DITINGGALKAN. Palet baru ditentukan dari asset asli di Bagian 2, bukan ditentukan di sini.

## 0. Kenapa reset total

Dua iterasi sebelumnya sama-sama gagal secara visual meski secara teknis "berhasil" (build lolos, test lolos) — akar masalahnya bukan cuma bug (panel HUD kelewat), tapi **palet ungu-oranye itu sendiri tidak disukai**, dan sprite raster lama (roket/planet) ternyata file yang sama dari awal, tidak pernah benar-benar bagus. Solusinya bukan retune warna lagi dari kepala, tapi mulai dari referensi visual nyata yang sudah terbukti bagus.

## 1. Asset yang dipakai (WAJIB, sudah diverifikasi — CC0, gratis untuk komersial)

```
Download dan pakai:
1. Void - Main Ship — https://foozlecc.itch.io/void-main-ship
   (sprite sheet roket dengan animasi engine/shield)
2. Void - Environment Pack — https://foozlecc.itch.io/void-environment-pack
   (background luar angkasa berlapis + planet & asteroid teranimasi)

Lisensi: CC0 (Creative Commons Zero) — bebas dipakai & dimodifikasi untuk
proyek komersial, atribusi TIDAK wajib. Tapi tetap tambahkan baris kecil di
footer situs: "Space assets by Foozle (foozle.io)" — praktik baik meski
tidak diwajibkan lisensinya.

Simpan file-nya di public/sprites/void/ (buat folder baru, jangan campur
dengan sprite lama).
```

## 2. Turunkan palet warna dari asset (CHECKPOINT — jangan lewati)

```
Sebelum membuat komponen apa pun: analisis warna dominan dari sprite sheet
dan background yang baru didownload di Bagian 1 (boleh pakai script kecil,
mis. Python PIL/Pillow ambil warna paling sering muncul, atau inspeksi
manual tiap frame).

Dari situ, susun 2-3 KANDIDAT palet (bukan langsung satu final):
- Warna background utama (diambil dari nuansa environment pack)
- 1-2 warna aksen hangat yang match natural dengan warna ship/environment
  (JANGAN paksa jadi oranye/ungu kalau warna asli asset-nya condong ke arah
  lain, mis. teal/biru/hijau — ikuti apa yang benar-benar ada di asset)
- Satu warna terang untuk teks (kontras terjamin AA di atas background utama)

Tampilkan 2-3 kandidat itu sebagai swatch warna sederhana (boleh HTML kecil
sekadar kotak warna + hex code, tidak perlu komponen lengkap) — STOP DI SINI,
tunggu saya pilih salah satu sebelum lanjut ke Bagian 3.
```

## 3. Setelah palet dipilih — definisikan token baru

```
Update tailwind.config.ts: HAPUS token lama (comet, void, nebula, star,
starchart, aurora) dari config, ganti dengan token baru sesuai palet yang
saya pilih di Bagian 2 (beri nama yang deskriptif ke palet baru, bukan
warisan nama lama).

Aturan kontras tetap berlaku (tidak berubah dari sebelumnya): teks gelap di
atas fill terang, teks terang di atas fill gelap, tidak pernah kontras
rendah/teks hilang.
```

## 4. Redesign Hero + Navbar dengan asset & palet baru

```
Gunakan sprite sheet Void - Main Ship (animasi engine asli, bukan CSS
float-slow buatan sendiri lagi) dan Void - Environment Pack (background +
planet asli) sebagai pengganti total elemen visual sebelumnya.

Aturan konten (tidak berubah dari guide sebelumnya):
- TIDAK ADA panel HUD/dashboard/status teknis dalam bentuk apa pun.
- TIDAK ADA duplikasi info yang sama di dua tempat.
- Badge skill/level (jika ada) dalam bentuk lencana bulat playful, satu
  tempat saja.
- Navbar: logo "Zenith" + link (Home, Mission Control, Constellation,
  Flight Path, Mission Log, Transmission, Devlog), panel rounded lembut.
- Headline "Hello, I'm Zxaviers" + subtitle "Web Enthusiast & IoT Embedded
  Explorer" + 2 CTA (Launch into Mission Log / Send a Transmission).
- Pertahankan efek layered pixel-shadow di headline dari iterasi sebelumnya
  (itu detail yang sudah bagus), sesuaikan warnanya ke palet baru.
- Footer/credit kecil: "Space assets by Foozle (foozle.io)".

Build (npm run build:next), commit satu kali:
"zenith: redesign v3 from scratch - Void CC0 assets + derived palette".
```

## 5. Aturan stop (tetap sama)

STOP TOTAL setelah Bagian 4 selesai — tunggu saya review screenshot sebelum lanjut ke section lain atau `git push` apa pun. Checkpoint otomatis sistem bukan izin lanjut.
