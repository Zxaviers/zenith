# 🤖 Zenith — Handoff Otonom (Opus 4.8) untuk Verifikasi Final + Push

> Dijalankan tanpa supervisi turn-by-turn dari sesi Claude sebelumnya (limit tercapai). Baca prompt ini SAMPAI HABIS sebelum mulai — ada SATU gerbang wajib di Bagian 4 yang tidak boleh dilewati otomatis oleh AI manapun.

## 0. Konteks singkat (detail lengkap ada di 3 file ini, baca itu untuk lengkapnya)

Baca `ZENITH_PLAYBOOK.md` + `PROGRESS.md` + `git log --oneline -30` dulu. Ringkasnya: migrasi Vite→Next.js portofolio "Zxaviers" jadi "Zenith" (tema space "Warm Nebula"/"Void Teal"), sudah lewat banyak fase, terakhir baru selesai rework layout+animasi 7 section (`zenith-full-interactive-rework.md`) + pilot Mission Log. Semua kerja itu ter-commit lokal di branch `main` (HEAD `88924fe`), **belum pernah di-push**. Build & test sudah dikonfirmasi hijau sebelumnya. Yang tersisa: verifikasi visual, lalu push kalau aman.

## 1. Cek prasyarat sebelum mulai

```
git status
git log --oneline -5
git remote -v
```
Konfirmasi: branch `main`, HEAD di `88924fe` (atau lebih baru kalau ada commit tambahan sejak ini ditulis — kalau beda jauh dari yang diharapkan, STOP dan laporkan, jangan asumsikan lanjut).

## 2. Build & test ulang (jangan percaya hasil lama, verifikasi sendiri)

```
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run build:next 2>&1
npm run test 2>&1
```
Kalau ada error yang tidak ada sebelumnya (bandingkan ke `PROGRESS.md`), STOP, laporkan, jangan lanjut ke verifikasi visual.

## 3. Verifikasi visual mandiri (SELF-REVIEW, ini yang beda dari sesi sebelumnya)

```
npm run dev:next
```

Kalau environment ini punya kapabilitas screenshot/browser (Playwright atau sejenisnya) yang BERFUNGSI (test dulu dengan satu screenshot percobaan) — pakai itu untuk REVIEW SENDIRI, jangan cuma generate lalu serahkan ke user tanpa dilihat dulu:

1. Screenshot semua section (Hero, Mission Control, Constellation, Flight Path,
   Mission Log, Transmission, Devlog, Secret Level) kondisi default — cek
   sendiri: tidak ada yang kosong/pecah/element overflow aneh.
2. Zoom ke area planet di Hero — pastikan tidak ada tanda flicker/patah di
   screenshot berurutan (ambil 2-3 frame berjarak, bandingkan).
3. Trigger hover di 2-3 node Constellation, screenshot — konfirmasi ada
   perubahan visual nyata dari kondisi default (bandingkan piksel).
4. Klik salah satu tombol Mission Control ("About Me"/dst), screenshot
   SEBELUM teks selesai muncul penuh — konfirmasi ada state transisi
   (bukan langsung teks penuh).
5. Klik untuk mulai Secret Level, cek console error BARU yang cuma muncul
   saat interaksi (bukan cuma idle).
6. Cek OS-level: pastikan Reduced Motion di Windows dalam keadaan OFF
   sebelum menilai animasi (`Settings > Accessibility > Visual effects`).

**Kalau screenshot tool TIDAK berfungsi** (Playwright gagal seperti sesi-sesi sebelumnya): generate screenshot sebisanya untuk USER (bukan untuk saya — sesi saya sudah tidak aktif), simpan ke folder jelas (mis. `verification-screenshots/`), dan di laporan akhir eksplisit minta USER yang review manual sebelum lanjut ke Bagian 4. JANGAN membuat keputusan go/no-go sendiri kalau tidak benar-benar bisa melihat hasilnya.

## 4. 🛑 GERBANG WAJIB — bukan otomatis, harus persetujuan eksplisit user

**INI TIDAK BOLEH DILEWATI OTOMATIS, oleh AI manapun (Opus 4.8 termasuk).** Ini bukan soal "limit tercapai" — ini batas yang sudah ditetapkan dari awal proyek karena salah satu target push adalah `zxaviers-origin` (repo profil GitHub asli, sudah pernah kejadian insiden overwrite sebelumnya).

Tampilkan ringkasan hasil Bagian 2-3 ke USER, lalu TULIS PERSIS kalimat ini dan BERHENTI (jangan lanjut ke Bagian 5 dalam respons yang sama):

```
Verifikasi build/test/visual selesai — ringkasan di atas. Saya TIDAK akan
push tanpa konfirmasi eksplisit kamu. Balas "push" (atau instruksi lain)
untuk saya lanjutkan ke Bagian 5, atau kasih tahu kalau ada yang perlu
diperbaiki dulu.
```

## 5. Push (HANYA setelah user eksplisit bilang "push" atau setara)

```
git branch backup-interactive-rework-pre-push
git push origin main:main
git push zxaviers-origin main:main

# verifikasi:
git log origin/main --oneline -3
git log zxaviers-origin/main --oneline -3
# keduanya harus menunjuk ke commit yang sama (88924fe atau HEAD terbaru)

git branch --set-upstream-to=origin/main main
```

Setelah push, update `PROGRESS.md`: catat commit yang di-push, tanggal, dan bahwa README.md di `main` sengaja tetap versi profile-README (bukan versi Fase 3) — supaya klaim lama di PROGRESS.md yang sudah usang soal README ikut dikoreksi.

## 6. Setelah push — laporan akhir untuk user

Ringkas: apa yang berubah di situs live, link ke commit di kedua repo, dan daftar apa pun yang di-skip/blocker (kalau ada) selama proses ini.
