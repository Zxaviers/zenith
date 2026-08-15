# 🌐 Zenith — Propagasi Global Palet A + Bersihkan Sisa HUD Lama

> Palet warna SUDAH final (Palet A — Void Teal, dipilih di iterasi sebelumnya). Guide ini BUKAN soal pilih warna lagi — ini soal menyebarkan yang sudah divalidasi ke section yang belum tersentuh, plus fix bug spesifik.

## 0. Konteks (dari review PDF full-site, bukan tebakan)

Hero sudah oke secara struktur, tapi 6 section lain (Mission Control, Constellation, Flight Path, Mission Log, Transmission) + Footer masih pakai:
- Warna panel lama (brown/rust, `~#5a3a28`-ish) yang tidak pernah diganti ke token Palet A
- Copy bergaya telemetry/HUD ("FREQ 142.85 MHz", "SIGNAL: 98.8%", "LOG [1/3]", "NODE_ID: GIT", "UPLINK STATUS") — kontradiksi dengan brief codedex-relaxed
- Panel "Operator Profile" (Lv/Class/Sector/Status) di Flight Path — ini konsep yang oke, cuma visual & bahasanya perlu diubah

## 1. Ganti SEMUA panel brown/rust ke token Palet A

```
Cari SEMUA pemakaian warna panel brown/rust lama (grep hex yang mendekati
#5a3a28 atau class custom terkait "brown"/"amber-panel"/sejenisnya) di
SELURUH components/sections/ — bukan cuma Hero. Ganti ke token dari
globals.css yang sudah ada: bg-surface / bg-mid untuk background panel,
teal/teal-dim untuk aksen, pink untuk aksen sekunder (sudah didefinisikan
saat Bagian 3 guide v3 kemarin).

Section yang perlu dicek satu-satu: Mission Control (panel Headquarters),
Constellation (kartu detail skill), Flight Path (panel "Operator Profile"
dan grid "Unlocked Badges"), Mission Log (kartu "Encrypted Artifact").
```

## 2. Lunakkan copy bergaya telemetry (pertahankan nama section, ubah isinya)

```
Nama section TETAP (Mission Control, Constellation, Flight Path, Mission
Log, Transmission — sudah final, jangan diganti). Yang diubah teks ISI di
dalamnya, dari gaya militer/teknis jadi lebih hangat/personal:

- "FREQ 142.85 MHz // CH-01 SIGNAL: 98.8%" -> hapus atau ganti jadi sesuatu
  yang lebih ringan (mis. cukup nama + role, tanpa angka teknis palsu)
- "LOG [1/3]" -> boleh dihapus, atau jadi indikator dialog biasa (mis. titik
  progres sederhana, bukan label "LOG")
- "NODE_ID: GIT / STATUS: CALIBRATED" -> hapus label teknis ini, cukup
  deskripsi skill dan level biasa
- "COM-CHANNEL // OPEN UPLINK", "CALLSIGN (YOUR NAME)", "RETURN FREQUENCY
  (YOUR EMAIL)", "TRANSMISSION PAYLOAD" -> boleh tetap sedikit tema (mis.
  "Send a signal" framing), tapi label form field kembali ke bahasa wajar
  ("Your Name", "Your Email", "Message") supaya tetap mudah diisi, jangan
  sampai bentuk form yang harus diisi orang lain terasa seperti teka-teki
- "UPLINK STATUS: ACTIVE & NOMINAL" di Flight Path -> ganti jadi bahasa
  natural (mis. cukup "Available for work" atau semacamnya)

Prinsip: nama besar section boleh tetap bertema space, tapi copy detail di
dalamnya harus terbaca personal dan hangat, bukan seperti membaca readout
mesin.
```

## 3. Harmonisasi warna sprite raster (ship & planet)

```
Sprite kapal (ship-base.png) dan planet (planet-earth.png) dari Foozle Void
pack punya warna baku sendiri di file PNG-nya (tidak ikut berubah walau
token CSS diganti). Untuk menyelaraskan ke Palet A Void Teal, terapkan CSS
filter pada elemen img/div yang menampilkan sprite tersebut:

filter: hue-rotate(Ndeg) saturate(0.8-1.2) brightness(1.0-1.1);

Cari nilai hue-rotate yang membuat warna sprite condong ke teal/cyan/biru
(bukan pink/orange dominan seperti sekarang). Uji beberapa nilai, ambil
screenshot tiap percobaan untuk verifikasi visual sebelum commit ke nilai
final. Kalau setelah dicoba tetap tidak harmonis, sebagai alternatif: cek
apakah paket Void - Environment Pack/Main Ship punya varian warna lain
(kadang asset pack punya beberapa skin warna) yang lebih dekat ke teal
secara natural, pakai itu daripada filter paksa.
```

## 4. Fix bug spesifik (dari review PDF)

```
1. Thumbnail project "PCM" (putih polos) — tambahkan border/frame gelap
   dari token bg-surface di sekitarnya, atau overlay gradient tipis supaya
   tidak kontras kasar dengan tema gelap sekitarnya.
2. Ikon sosial di footer (LinkedIn, Instagram) — bungkus dalam badge
   bulat/persegi kecil bergaya pixel-border yang konsisten (seperti ikon
   GitHub di sebelahnya), supaya tidak terasa seperti ikon brand generik
   yang ditempel asal.
3. Area kosong hitam besar di paling bawah halaman (setelah Footer) — cek
   apakah ini bug (elemen dengan height berlebih, atau section kosong yang
   ke-render) atau memang padding yang disengaja. Kalau bug, perbaiki;
   kalau disengaja, kurangi supaya tidak terasa seperti halaman "belum
   selesai".
```

## 5. Setelah selesai

Build (`npm run build:next`), commit **satu kali**: `zenith: propagate Void Teal palette site-wide + fix sprite harmony + cleanup HUD copy`. **STOP TOTAL** — screenshot semua section (boleh full-page seperti PDF sebelumnya), kirim ke saya, **jangan `git push`** sampai saya konfirmasi.
