// Real authentic Devlog data based on Rizky Mardhani's projects, hardware research, and web engineering.

export interface DevlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  category: 'IoT & Embedded' | 'Web Engineering' | 'Game & Audio'
  excerpt: string
  tags: string[]
  codeSnippet?: {
    language: string
    code: string
  }
  callout?: {
    type: 'tip' | 'note' | 'highlight'
    text: string
  }
  content: string[]
}

export const devlogPosts: DevlogPost[] = [
  {
    slug: 'sistem-alignment-esp32',
    title: 'Dari Sensor ke Layar: Sistem Alignment Kendaraan Berbasis ESP32, ADS1115 & MPU6050',
    date: '2026-07-28',
    readTime: '4 min read',
    category: 'IoT & Embedded',
    excerpt:
      'Catatan teknis integrasi sensor presisi ADS1115 (16-bit ADC) dan MPU6050 (6-DoF IMU) dengan mikrokontroler ESP32 untuk kalkulasi simulasi toe & camber roda kendaraan secara real-time.',
    tags: ['IoT', 'ESP32', 'ADS1115', 'MPU6050', 'React'],
    codeSnippet: {
      language: 'cpp',
      code: `// Kalkulasi Sudut Camber menggunakan ESP32 & MPU6050
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_ADS1X15.h>

Adafruit_MPU6050 mpu;
Adafruit_ADS1115 ads;

float calculateCamberAngle() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  
  // Hitung sudut kemiringan vertikal (Roll/Camber)
  float roll = atan2(a.acceleration.y, a.acceleration.z) * 180.0 / PI;
  return roll;
}`,
    },
    callout: {
      type: 'tip',
      text: 'Gunakan ADC eksternal ADS1115 16-bit daripada ADC internal ESP32 untuk menghindari non-linearitas tegangan di bawah 0.5V dan di atas 2.8V.',
    },
    content: [
      'Salah satu proyek riset yang paling mendalam di bidang embedded systems yang saya kerjakan di Universitas Brawijaya adalah rancang bangun sistem simulasi alignment (toe dan camber) kendaraan berbasis mikrokontroler ESP32.',
      'Sistem ini menggabungkan sensor accelerometer & gyroscope MPU6050 untuk mengukur sudut orientasi spasial dan modul ADS1115 (ADC 16-bit I2C) untuk membaca tegangan potensiometer linier dengan presisi milimeter.',
      'Tantangan terbesarnya adalah memfilter derau (noise) getaran mekanik saat sensor membaca sudut dinamis. Dengan menerapkan complementary filter sederhana pada mikrokontroler, data yang dikirimkan via Wi-Fi/MQTT ke dashboard React menjadi sangat stabil dan responsif tanpa lag.',
    ],
  },
  {
    slug: 'showcase-pcb-custom-malang',
    title: 'Membangun Showcase Klien: Dari Desain PCB Custom hingga CI/CD Pipeline',
    date: '2026-06-15',
    readTime: '3 min read',
    category: 'Web Engineering',
    excerpt:
      'Studi kasus perancangan website client-facing pcb-custom-malang.web.app menggunakan React, Tailwind CSS, dan otomatisasi deployment dengan GitHub Actions & Netlify.',
    tags: ['Web Dev', 'React', 'Tailwind CSS', 'CI/CD', 'Netlify'],
    codeSnippet: {
      language: 'yaml',
      code: `# GitHub Actions Deployment Pipeline
name: Deploy Production
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: './dist'
          production-branch: main`,
    },
    callout: {
      type: 'note',
      text: 'Website dirancang agar calon klien manufaktur elektronika dapat melihat spesifikasi layer, material FR4, dan estimasi waktu fabrikasi secara instan.',
    },
    content: [
      'Proyek PCB Custom Malang berawal dari kebutuhan nyata industri fabrikasi hardware lokal di Malang untuk memiliki representasi digital profesional yang jelas dan terpercaya.',
      'Fokus utama pada website ini adalah kejelasan informasi: katalog layanan cetak single/double layer PCB, estimasi ketebalan tembaga (1oz/2oz), serta jalur pemesanan yang ringkas.',
      'Dengan arsitektur komponen React yang modular dan utility-first styling dari Tailwind CSS, website dapat memuat halaman secara instan (Lighthouse score 98+) dan diperbarui dengan mudah melalui pipeline CI/CD otomatis setiap kali ada update katalog.',
    ],
  },
  {
    slug: 'fisika-suara-void-miner',
    title: 'Zero-G Inertia & Procedural Audio: Merancang Game Arcade Void Miner di Browser',
    date: '2026-08-14',
    readTime: '5 min read',
    category: 'Game & Audio',
    excerpt:
      'Bagaimana mengimplementasikan fisika dorong inersia Newtonian, partikel laser ganda ujung sayap, dan efek suara retro synthesizer murni menggunakan Web Audio API tanpa library eksternal.',
    tags: ['Game Dev', 'Canvas 2D', 'Web Audio API', 'TypeScript', 'Physics'],
    codeSnippet: {
      language: 'typescript',
      code: `// Procedural Web Audio API Laser Synthesizer
playLaser() {
  const ctx = this.getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(880, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.12)
  
  gain.gain.setValueAtTime(0.2, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)
  
  osc.connect(gain).connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.12)
}`,
    },
    callout: {
      type: 'highlight',
      text: 'Seluruh efek suara pesawat, tembakan laser, ledakan shrapnel, dan kristal kuantum dibuat 100% secara prosedural via oscillator native tanpa mengunduh file audio eksternal.',
    },
    content: [
      'Ketika merancang game Void Miner untuk zona Arcade di portofolio ini, tujuannya bukan sekadar game tembak-menembak biasa, melainkan menghadirkan kontrol pesawat luar angkasa dengan fisika inersia (momentum, thrust, dan drag vakum).',
      'Pesawat tempur dirancang dengan moncong aerodinamis jarum, sayap delta bergaris, dan meriam laser ganda di ujung sayap yang menembakkan berkas plasma kembar secara akurat.',
      'Untuk audio, daripada membebani bundle web dengan file MP3 yang besar, seluruh suara disintesis secara real-time dengan Web Audio API—menghasilkan respons instan 0ms latency dan nuansa retro arcade 8-bit otentik.',
    ],
  },
]
