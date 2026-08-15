# 🚀 Zenith — Redo Hero + Navbar v2 (fix HUD panel + kode-generated visuals)

> Lanjutan dari `zenith-hero-redo-guide.md`. Iterasi v1 GAGAL di 2 hal spesifik meski laporannya bilang sukses — dokumen ini isinya cuma fix 2 hal itu, jangan redesign ulang dari nol.

## 0. Apa yang gagal di v1 (verifikasi dari screenshot langsung, bukan laporan teks)

1. **Panel "PILOT: ZX" (Class/Sector/Status/Hull Integrity bar) MASIH ADA**, identik pixel-demi-pixel dengan versi sebelum v1 dijalankan — padahal ini eksplisit dilarang di Bagian 2 guide v1. Laporan v1 klaim ini sudah dihapus; itu salah. Kemungkinan besar panel ini dirender dari komponen LAIN (bukan `Hero.tsx`), sehingga edit ke `Hero.tsx` tidak menyentuhnya sama sekali.
2. **Komposisi warna masih terasa gelap-dominan**, aksen hangat cuma jadi titik kecil — perlu direbalance supaya kehangatan mendominasi porsi frame yang lebih besar, bukan cuma aksen.
3. **Sprite roket & planet (raster PNG)** terasa kurang memadai — dan ternyata ini file yang SAMA dari versi Vite original (`assets.rocket`, `assets.planet`), tidak pernah diganti sepanjang migrasi. Solusinya bukan reposisi ulang, tapi ganti pendekatan total: generate via kode (SVG/CSS), bukan raster image.

## 1. Fix #1 — Cari dan hapus panel Pilot HUD

```
Cari komponen yang me-render panel "PILOT: ZX" (avatar, Class, Sector, Status,
Hull Integrity bar hijau) di halaman Home — kemungkinan bukan di Hero.tsx,
tapi component terpisah yang di-render di page.tsx atau layout.tsx sejajar
dengan Hero. Grep string "PILOT" atau "Hull Integrity" atau "SYS_ENG" di
seluruh folder components/ untuk menemukannya persis.

Setelah ketemu: HAPUS render panel itu dari halaman Home sepenuhnya (bukan
cuma disembunyikan via CSS — hapus dari JSX). Simpan dulu file komponennya
kalau ada logic lain yang masih dipakai di tempat lain, tapi jangan
ditampilkan lagi di Hero/Home.
```

## 2. Fix #2 — Rebalance komposisi warna (lebih hangat mendominasi)

```
Ubah background Hero dari void gelap yang mendominasi hampir seluruh frame,
menjadi gradient yang lebih hangat: campuran nebula (#3E2A63) ke arah warm
glow (blend comet #FF8B4C dan star #FFC857 dengan opacity rendah) yang
menyebar lebih luas, terutama di area horizon/bawah — bukan cuma glow kecil
di sekitar planet. Void (#1B1235) tetap dipakai tapi porsi visualnya
dikurangi, jangan jadi warna dominan tunggal di 80% frame.

Tujuannya: saat dilihat sekilas, kesan pertama adalah "hangat" bukan
"gelap/teknis" — cek ini sendiri di screenshot sebelum lapor selesai.
```

## 3. Fix #3 — Ganti sprite raster dengan elemen ter-generate kode

```
Hapus dependency ke assets.rocket dan assets.planet (file PNG raster lama).
Ganti dengan elemen yang di-generate lewat SVG + CSS/Framer Motion langsung
di kode, dengan detail berikut:

ROKET: bentuk geometris sederhana via SVG (segitiga badan + sirip kecil +
lingkaran jendela kokpit), warna dari token (starchart untuk badan, comet
untuk aksen/sirip), API/thruster berupa gradient oranye-kuning kecil di
belakang dengan animasi pulse/flicker halus. Animasi gerak: pertahankan pola
"float-slow" dari versi lama (bob naik-turun pelan, ~4-6 detik per siklus,
easing halus) — itu detail lama yang sudah bagus, jangan diubah.

PLANET: lingkaran dengan radial-gradient (base color dari star/comet),
ring/cincin tipis melengkung di depannya (elips SVG dipotong sebagian),
soft glow di sekelilingnya (box-shadow blur lembut warna comet). Animasi:
pulse glow pelan, opsional sedikit rotasi sangat lambat.

HEADLINE: tambahkan kembali efek layered pixel-shadow dari versi lama
(text-shadow bertingkat, mis. 2px 2px 0 <shade1>, 4px 4px 0 <shade2>, dst
menggunakan shade dari void/nebula, bukan hitam polos) — ini detail retro
yang hilang saat migrasi ke Next.js, bagus untuk dikembalikan.

Jangan pakai gambar/GIF dari luar (hak cipta, tidak match warna) — semua
elemen di atas HARUS berupa kode (SVG/CSS), bukan file gambar diimpor.
```

## 4. Setelah selesai

Build (`npm run build:next`), commit **satu kali**: `zenith: fix Hero v2 - remove Pilot HUD, warmer palette, code-generated visuals`. **STOP total setelah ini**, sama seperti aturan di guide v1 Bagian 6 — tunggu saya lihat screenshot sebelum lanjut apa pun, termasuk sebelum `git push`.
