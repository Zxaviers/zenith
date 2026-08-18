# 🌌 Zenith — Rombak Total: Layout + Animasi Semua Section

> Pola teknis (scroll-snap native, shared-element transition via `layoutId`, skill-read wajib, token warna existing, `prefers-reduced-motion` fallback) sudah TERVALIDASI di Mission Log — pakai pola yang sama di semua section berikut, jangan improvisasi elemen baru di luar yang diminta (pelajaran dari insiden "Cosmic Retrograde").

## 0. Fix dulu: bug animasi planet di Hero

```
Cek ulang komponen VoidPlanet di Hero.tsx. Sebelumnya diinstruksikan pakai
filter hue-rotate(160deg) untuk harmonisasi warna ke teal — tapi itu tidak
efektif (planet Earth-like punya beberapa hue berbeda sekaligus, rotasi
tunggal tidak bisa menyatukan semuanya) dan sekarang dilaporkan ada bug
animasi (bukan cuma warna).

1. Periksa animasi steps(154) pada spritesheet planet — apakah frame
   rate/timing-nya menyebabkan flicker, stutter, atau lompatan aneh saat
   dikombinasikan dengan filter CSS. Kalau ya, cek apakah filter di-apply
   di elemen yang salah (mis. di parent yang animasinya juga jalan,
   menyebabkan filter dihitung ulang tiap frame -> berat/patah-patah).
   Filter idealnya di elemen statis di luar elemen yang di-animate step.
2. Untuk warna: JANGAN paksa hue-rotate lagi. Cek isi folder
   environment-pack apakah ada varian planet lain (moon, gas giant, dsb)
   yang secara natural lebih dekat ke ungu/teal, pakai itu sebagai
   pengganti Earth-like planet. Kalau tidak ada varian cocok, biarkan
   planet dengan warna aslinya (biru-hijau-coklat) sebagai aksen warna
   tunggal yang sengaja kontras — itu lebih baik daripada dipaksa
   recolor yang malah bikin bug animasi.
3. Screenshot Hero (khusus area planet, zoom in) sebelum lanjut ke
   bagian-bagian berikutnya, verifikasi animasi mulus dan tidak ada
   glitch.
```

## 1. Mission Control (About)

```
Saat ini: dialog box + 3 tombol ("About Me"/"What I Study"/"Right Now")
yang mengganti isi dialog saat diklik.

Tambahkan: saat tombol diklik, teks jawaban baru muncul dengan efek
TYPEWRITER (karakter muncul satu-satu, bukan langsung full text) didahului
indikator "typing..." singkat (3 titik animasi loading) selama ~400ms
sebelum teks mulai muncul. Tombol yang aktif dapat highlight jelas (bukan
cuma teks berubah warna — beri background/border yang jelas beda dari
tombol tidak aktif). Avatar/badge "LIVE" boleh dapat animasi pulse halus
kalau belum ada.
```

## 2. Constellation (Skills) — hati-hati, section paling kompleks

```
Saat ini: tab kategori (Web/IoT/Tools) + diagram hub-spoke (semua node
terhubung ke satu titik pusat) + panel detail di kanan.

Tambahkan (JANGAN restrukturisasi total, cukup ini):
1. Transisi antar tab: saat pindah kategori, diagram lama fade-out +
   sedikit scale-down, diagram baru fade-in + scale-up (bukan potong
   langsung).
2. Tiap star node: hover memberi glow lebih terang + sedikit membesar
   (scale 1.15), garis penghubung ke pusat ikut menyala lebih terang
   saat node terhubung di-hover.
3. Level badge (PROFICIENT/FAMILIAR) muncul dengan animasi pop-in kecil
   saat pertama kali section masuk viewport (stagger, seperti Mission Log).
```

## 3. Flight Path (Experience)

```
Saat ini: timeline vertikal dengan titik-titik (dots) di rail kiri, badge
"Operator Profile" + "Badges Unlocked" di kanan.

Tambahkan:
1. Rail progress: warna rail (garis vertikal) terisi/menyala secara
   bertahap mengikuti posisi scroll — bagian rail yang sudah "dilewati"
   scroll berwarna teal terang, bagian yang belum masih redup. Pakai
   framer-motion useScroll + scaleY atau background-position berbasis
   scroll progress.
2. Tiap entry timeline: saat masuk viewport, dot rail "menyala" (scale +
   glow pop) tepat sebelum konten kartunya fade-in.
3. Badge di "Badges Unlocked": hover memberi efek tilt/scale kecil.
```

## 4. Send a Transmission (Contact)

```
Saat ini: form statis (Name/Email/Message) + tombol submit.

Tambahkan:
1. Input field: saat focus, border glow teal + label kecil di atas
   field ikut berubah warna (bukan cuma border browser default).
2. Tombol "Send Message"/"Dispatch Transmission": saat diklik, animasi
   singkat menyerupai "mengirim sinyal" (mis. tombol berubah jadi
   progress/pulse ~800ms) sebelum menampilkan status sukses/gagal —
   JANGAN buat ini blocking asli (form masih boleh functional/mailto
   atau apa pun backend-nya sekarang, ini murni animasi UI feedback).
```

## 5. Devlog

```
Cek dulu struktur halaman Devlog yang sudah ada (route /devlog). Tambahkan
animasi stagger-reveal untuk daftar post (sama pola dengan Mission Log:
whileInView, delay bertahap per item), dan hover-lift halus (translateY
-4px + shadow) di tiap card post. Jangan ubah struktur data/konten devlog.
```

## 6. Secret Level (game arcade)

```
Ini BUKAN mengubah game logic (kaboom.js tetap seperti sekarang) — yang
diubah PRESENTASI di sekitarnya:

1. Saat section Secret Level masuk viewport (sebelum di-klik/dimainkan):
   tambahkan animasi "power-on" pada frame/border arcade cabinet-nya
   (border menyala bertahap, seperti mesin arcade baru dinyalakan).
2. Overlay sebelum game dimulai ("Press SPACE to Start"): teks itu
   berikan animasi blink/pulse pelan (khas arcade "PRESS START").
3. Border/frame di sekeliling canvas: tambahkan efek scanline halus atau
   vignette ringan di pinggiran (opsional, kalau tidak menyebabkan
   masalah performa) untuk kesan layar arcade tua — tapi PASTIKAN ini
   tidak mengganggu keterbacaan gameplay/teks skor.
```

## 7. Aturan wajib di setiap section (sama seperti Mission Log)

```
- Baca SKILL.md relevan (framer-motion-expert untuk animasi, claude-
  frontend-design/impeccable untuk kualitas visual) SEBELUM edit kode
  tiap section — cantumkan path + prinsip yang diterapkan di laporan.
- Token warna: HANYA yang sudah ada (teal/teal-dim/pink/void-*/ink-*).
  JANGAN buat token baru.
- prefers-reduced-motion: semua animasi dekoratif baru WAJIB punya
  fallback (nonaktif/instant), konten & fungsi tetap utuh.
- Data/konten section TIDAK BOLEH berubah, cuma cara tampil & interaksi.
- Kerjakan section SATU PER SATU (0 -> 1 -> 2 -> ... -> 6), build +
  commit terpisah tiap section: "zenith: interactive layout - <nama
  section>". Kalau satu section error dan gagal diperbaiki setelah 3
  percobaan, SKIP section itu (jangan hapus section-nya, biarkan versi
  lama), lanjut ke section berikutnya, laporkan sebagai blocker di akhir.
```

## 8. STOP setelah semua selesai

Setelah section 0-6 selesai (atau di-skip dengan laporan blocker): jalankan build penuh, screenshot/export PDF seluruh halaman (top to bottom, sama seperti sebelumnya) — **jangan push**. Saya review semuanya sekaligus sebelum kamu deploy.
