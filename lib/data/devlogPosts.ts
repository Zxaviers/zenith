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
    title: 'From Sensor to Screen: ESP32-Based Vehicle Alignment System with ADS1115 & MPU6050',
    date: '2026-07-28',
    readTime: '4 min read',
    category: 'IoT & Embedded',
    excerpt:
      'Technical notes on integrating the ADS1115 precision sensor (16-bit ADC) and MPU6050 (6-DoF IMU) with an ESP32 microcontroller to compute real-time simulated vehicle wheel toe and camber.',
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
      text: 'Use the external 16-bit ADS1115 ADC instead of the ESP32 internal ADC to avoid voltage non-linearity below 0.5V and above 2.8V.',
    },
    content: [
      'One of the most in-depth embedded-systems research projects I worked on at Universitas Brawijaya was designing a microcontroller-based vehicle alignment (toe and camber) simulation system using the ESP32.',
      'The system combines an MPU6050 accelerometer and gyroscope sensor for spatial orientation angles with an ADS1115 module (16-bit I2C ADC) for reading linear potentiometer voltage with millimeter precision.',
      'The biggest challenge was filtering mechanical vibration noise while the sensors read dynamic angles. By applying a simple complementary filter on the microcontroller, the data sent via Wi-Fi/MQTT to the React dashboard became highly stable and responsive without lag.',
    ],
  },
  {
    slug: 'showcase-pcb-custom-malang',
    title: 'Building a Client Showcase: From Custom PCB Design to CI/CD Pipeline',
    date: '2026-06-15',
    readTime: '3 min read',
    category: 'Web Engineering',
    excerpt:
      'Case study on designing the client-facing pcb-custom-malang.web.app website using React, Tailwind CSS, and automated deployment with GitHub Actions and Netlify.',
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
      text: 'The website is designed so prospective electronics-manufacturing clients can instantly view layer specs, FR4 materials, and fabrication time estimates.',
    },
    content: [
      'The PCB Custom Malang project started from a real need among local hardware-fabrication businesses in Malang for a clear, trustworthy professional digital presence.',
      'The main focus of the site is information clarity: a catalog of single/double-layer PCB printing services, copper thickness estimates (1oz/2oz), and a concise ordering path.',
      'With a modular React component architecture and Tailwind CSS utility-first styling, the site loads pages instantly (98+ Lighthouse score) and is easy to update through an automated CI/CD pipeline on every catalog change.',
    ],
  },
  {
    slug: 'fisika-suara-void-miner',
    title: 'Zero-G Inertia and Procedural Audio: Designing the Void Miner Arcade Game for the Browser',
    date: '2026-08-14',
    readTime: '5 min read',
    category: 'Game & Audio',
    excerpt:
      'How to implement Newtonian thrust inertia physics, twin-wingtip laser particles, and pure-synthesizer retro sound effects using the Web Audio API with no external libraries.',
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
      text: 'All ship, laser-shot, shrapnel-explosion, and quantum-crystal sound effects are generated 100% procedurally via native oscillators with no external audio files.',
    },
    content: [
      'When designing the Void Miner game for this portfolio Arcade zone, the goal was not just another shoot-em-up, but a spacecraft control experience with inertia physics (momentum, thrust, and vacuum drag).',
      'The starfighter is designed with an aerodynamic needle nose, striped delta wings, and twin wingtip laser cannons firing accurate twin plasma beams.',
      'For audio, instead of weighing down the web bundle with large MP3 files, all sounds are synthesized in real time with the Web Audio API — delivering instant 0ms-latency response and an authentic 8-bit retro arcade feel.',
    ],
  },
]
