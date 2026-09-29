# 🎮 Zenith — Pilot: Layout Baru + Interaktif untuk Mission Log

> Scope: **HANYA Mission Log** (section Projects). Ini pilot/uji coba — kalau hasilnya oke, pola yang sama disebar ke section lain di guide terpisah nanti. JANGAN sentuh section lain di guide ini.

## 0. Kenapa Mission Log

Sejak versi Vite paling awal sampai sekarang, struktur section selalu sama: grid kartu statis berjajar. Section lain (Hero, Constellation, Flight Path) baru saja stabil setelah proses panjang — jangan diutak-atik lagi. Mission Log paling aman dijadikan pilot karena paling "generic grid" dan perubahannya akan paling kentara untuk dinilai.

## 1. Konsep layout baru — "Mission Selector"

```
Ganti grid 3-kolom statis di Mission Log jadi HORIZONTAL SCROLL-SNAP
CAROUSEL bergaya "pemilih misi" di game:

- Satu kartu "featured" besar di tengah viewport, kartu sebelah kiri/kanan
  terlihat sebagian (peek) — kasih kesan ada lebih banyak untuk dijelajah.
- Gunakan CSS scroll-snap (scroll-snap-type: x mandatory di container,
  scroll-snap-align: center di tiap kartu) sebagai basis navigasi —
  JANGAN implementasi drag custom dari nol pakai JS, scroll-snap native
  browser jauh lebih robust dan otomatis dukung touch-swipe + mouse-drag
  + trackpad tanpa bug tambahan.
- Tombol panah kiri/kanan di sisi carousel untuk scroll terprogram
  (scrollIntoView atau scrollBy), sebagai alternatif untuk yang tidak
  swipe/drag.
- Indikator posisi kecil di bawah carousel (dots atau garis putus
  menghubungkan titik-titik, bukan sekadar dots generik — selaras dengan
  motif "star map" yang sudah dipakai di section lain).
```

## 2. Animasi & interaksi (kombinasi, sesuai arahan)

```
1. Scroll-reveal: saat section Mission Log pertama kali masuk viewport,
   kartu-kartu muncul dengan stagger (satu-satu, delay singkat antar
   kartu) pakai framer-motion whileInView — bukan langsung semua muncul
   bersamaan.
2. Hover/focus kartu: scale up halus (1.0 -> 1.03), glow ring warna teal
   di border, dan tambahkan elemen "targeting reticle" kecil di sudut
   kartu (garis L di 4 sudut, gaya game "target lock") yang muncul saat
   hover — detail kecil tapi memperkuat kesan interaktif/game.
3. Badge "Live"/"Coming soon": animasi pulse halus (opacity/scale looping
   lambat), bukan statis.
4. Tag chip teknologi: hover memberi efek bounce kecil (translateY -2px
   lalu kembali, spring animation).
5. "Read full case study" -> JANGAN navigasi ke halaman terpisah dulu di
   pilot ini. Buat EXPAND jadi panel detail overlay di tempat yang sama,
   pakai framer-motion layoutId (shared element transition) supaya kartu
   terasa "membesar" jadi panel detail, bukan potong-tempel. Panel detail
   berisi deskripsi lebih lengkap + tombol close (kembali ke carousel).
6. Progress indicator (dari poin 1 Bagian 1) ikut update dengan animasi
   halus saat carousel di-scroll ke kartu lain.
```

## 3. Constraint wajib (jangan sampai regresi)

```
- Aksesibilitas: carousel harus bisa dinavigasi keyboard (arrow kiri/kanan
  saat container di-focus, atau tombol panah yang sudah ada bisa di-tab
  dan di-Enter). Focus-visible state jelas di kartu aktif.
- prefers-reduced-motion: matikan animasi scale/pulse/bounce/stagger
  (ganti ke fade sederhana atau langsung tampil), tapi carousel tetap
  harus bisa di-scroll manual (scroll-snap tetap jalan, cuma animasi
  dekoratifnya yang dimatikan).
- Data project (judul, deskripsi, tag, link) TIDAK BOLEH berubah, cuma
  cara tampilnya. Jangan hardcode ulang data yang sudah ada di file
  data/projects.
- Token warna: PAKAI yang sudah ada di globals.css (teal/teal-dim/pink/
  void-deep/void-surface/ink/ink-muted). JANGAN bikin token warna baru.
```

## 4. Skill & verifikasi (wajib sesuai aturan §8 playbook)

```
Sebelum mengedit kode: baca SKILL.md dari `framer-motion-expert` (untuk
animasi/interaksi) dan `claude-frontend-design` atau `impeccable` (untuk
kualitas visual keseluruhan) — kalau tersedia di environment ini. Di
laporan akhir, cantumkan path file yang dibaca + satu prinsip konkret
dari tiap skill yang diterapkan ke implementasi ini.

Build (npm run build:next), commit SATU KALI:
"zenith: pilot - Mission Log interactive carousel layout".
```

## 5. STOP

Setelah selesai: screenshot Mission Log dari beberapa state (default, hover kartu, panel detail terbuka), **jangan push**, jangan lanjut ke section lain — tunggu review saya dulu sebelum pola ini disebar lebih luas.
