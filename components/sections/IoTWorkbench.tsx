'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { PixelButton } from '@/components/ui/PixelButton'
import { portfolioSounds } from '@/lib/audio/retroSounds'
import { cn } from '@/lib/utils'
import { Cpu, Activity, Wifi, Terminal, Code2, Copy, Check, Radio } from 'lucide-react'

type SensorModule = 'esp32' | 'dht22' | 'hcsr04' | 'ldr' | 'servo'

interface SensorConfig {
  id: SensorModule
  name: string
  label: string
  icon: string
  subtitle: string
  defaultValues: Record<string, number>
  controls: {
    key: string
    label: string
    min: number
    max: number
    step: number
    unit: string
  }[]
  codeSnippet: string
  getMqttPayload: (values: Record<string, number>) => object
}

const MODULES: Record<SensorModule, SensorConfig> = {
  esp32: {
    id: 'esp32',
    name: 'ESP32 Node MCU',
    label: 'Core CPU & Telemetry',
    icon: '📡',
    subtitle: 'Xtensa Dual-Core 32-bit @ 240MHz · Wi-Fi 802.11 b/g/n · BLE 4.2',
    defaultValues: { freq: 240, heap: 284, rssi: -58 },
    controls: [
      { key: 'freq', label: 'CPU Clock Speed', min: 80, max: 240, step: 80, unit: 'MHz' },
      { key: 'heap', label: 'Free SRAM Heap', min: 120, max: 320, step: 4, unit: 'KB' },
      { key: 'rssi', label: 'Wi-Fi Signal (RSSI)', min: -90, max: -30, step: 1, unit: 'dBm' },
    ],
    codeSnippet: `// ESP32 System Telemetry Node
#include <WiFi.h>
#include <PubSubClient.h>

void publishTelemetry() {
  uint32_t freeHeap = ESP.getFreeHeap() / 1024;
  int8_t rssi = WiFi.RSSI();
  
  StaticJsonDocument<128> doc;
  doc["cpu_freq_mhz"] = getCpuFrequencyMhz();
  doc["free_heap_kb"] = freeHeap;
  doc["wifi_rssi_dbm"] = rssi;
  
  char buffer[128];
  serializeJson(doc, buffer);
  mqttClient.publish("zenith/esp32/status", buffer);
}`,
    getMqttPayload: (v) => ({
      device: 'ESP32-WROOM-32D',
      core: 'Xtensa-LX6-DualCore',
      cpu_freq_mhz: v.freq,
      free_heap_kb: v.heap,
      wifi_rssi_dbm: v.rssi,
      status: 'SYSTEM_NOMINAL',
    }),
  },
  dht22: {
    id: 'dht22',
    name: 'DHT22 / AM2302',
    label: 'Climate & Atmosphere',
    icon: '🌡️',
    subtitle: 'Capacitive humidity sensor & thermistor · 0.1°C resolution · 0-100% RH',
    defaultValues: { temp: 28.4, humidity: 62.5 },
    controls: [
      { key: 'temp', label: 'Ambient Temperature', min: 10, max: 50, step: 0.5, unit: '°C' },
      { key: 'humidity', label: 'Relative Humidity', min: 20, max: 95, step: 1, unit: '%' },
    ],
    codeSnippet: `// DHT22 High-Precision Environmental Readout
#include "DHTesp.h"
DHTesp dht;

void readClimateSensor() {
  TempAndHumidity data = dht.getTempAndHumidity();
  if (dht.getStatus() == DHTesp::ERROR_NONE) {
    char payload[160];
    snprintf(payload, sizeof(payload),
      "{\\"temp_c\\":%.2f,\\"humidity_pct\\":%.2f,\\"heat_index\\":%.2f}",
      data.temperature, data.humidity,
      dht.computeHeatIndex(data.temperature, data.humidity)
    );
    mqttClient.publish("zenith/sensors/climate", payload);
  }
}`,
    getMqttPayload: (v) => ({
      sensor: 'DHT22_AM2302',
      temp_c: v.temp,
      temp_f: +(v.temp * 1.8 + 32).toFixed(1),
      humidity_pct: v.humidity,
      dew_point_c: +(v.temp - (100 - v.humidity) / 5).toFixed(2),
      comfort_index: v.temp > 32 ? 'WARM' : v.temp < 20 ? 'COOL' : 'OPTIMAL',
    }),
  },
  hcsr04: {
    id: 'hcsr04',
    name: 'HC-SR04 Ultrasonic',
    label: 'Acoustic Rangefinder',
    icon: '🧭',
    subtitle: '40kHz Ultrasound transceiver · 2cm to 400cm range · 3mm precision',
    defaultValues: { distance: 48 },
    controls: [
      { key: 'distance', label: 'Proximity Distance', min: 2, max: 250, step: 1, unit: 'cm' },
    ],
    codeSnippet: `// HC-SR04 Microsecond Sonic Ping Driver
const int TRIG_PIN = 5;
const int ECHO_PIN = 18;

float measureDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long durationUs = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout
  float distanceCm = (durationUs * 0.0343) / 2.0;
  return distanceCm;
}`,
    getMqttPayload: (v) => ({
      sensor: 'HC-SR04_ULTRASONIC',
      distance_cm: v.distance,
      distance_inches: +(v.distance / 2.54).toFixed(2),
      echo_flight_us: +(v.distance * 58.3).toFixed(1),
      zone: v.distance < 20 ? 'CRITICAL_PROXIMITY' : v.distance < 80 ? 'DETECTION_RANGE' : 'CLEAR',
    }),
  },
  ldr: {
    id: 'ldr',
    name: 'Photoresistor & Lux ADC',
    label: 'Ambient Optical Sensor',
    icon: '💡',
    subtitle: 'Cadmium-Sulfide photo-cell with 12-bit ADC voltage divider network',
    defaultValues: { lux: 420 },
    controls: [
      { key: 'lux', label: 'Illuminance Light Level', min: 0, max: 1000, step: 10, unit: 'lx' },
    ],
    codeSnippet: `// 12-bit ADC Optical Sensor Calibration
const int LDR_ADC_PIN = 34; // ADC1_CH6
const float ADC_REF_V = 3.3;

uint16_t readLux() {
  uint16_t rawAdc = analogRead(LDR_ADC_PIN); // 0 - 4095
  float voltage = (rawAdc / 4095.0) * ADC_REF_V;
  float ldrResistance = (10000.0 * (ADC_REF_V - voltage)) / voltage;
  float lux = 500.0 / (ldrResistance / 1000.0);
  return (uint16_t)lux;
}`,
    getMqttPayload: (v) => ({
      sensor: 'GL5528_LDR_PHOTOCELL',
      ambient_lux: v.lux,
      adc_raw_12bit: Math.round((v.lux / 1000) * 4095),
      voltage_v: +((v.lux / 1000) * 3.3).toFixed(2),
      photoperiod: v.lux > 500 ? 'BRIGHT_DAY' : v.lux > 80 ? 'DUSK_INDOOR' : 'NIGHT_VOID',
    }),
  },
  servo: {
    id: 'servo',
    name: 'SG90 Micro PWM Servo',
    label: 'Tactile Motion Actuator',
    icon: '🎛️',
    subtitle: '50Hz PWM frequency · 500µs to 2400µs pulse width · 180° rotation',
    defaultValues: { angle: 90 },
    controls: [
      { key: 'angle', label: 'Actuator Target Angle', min: 0, max: 180, step: 5, unit: '°' },
    ],
    codeSnippet: `// ESP32 LEDC Hardware PWM Servo Control
#include <ESP32Servo.h>
Servo microServo;

void setServoAngle(int angle) {
  microServo.attach(13, 500, 2400); // GPIO 13, 500-2400us
  microServo.write(constrain(angle, 0, 180));
  
  char logMsg[64];
  snprintf(logMsg, sizeof(logMsg), "SERVO_POS:%d_DEG", angle);
  mqttClient.publish("zenith/actuator/servo", logMsg);
}`,
    getMqttPayload: (v) => ({
      actuator: 'SG90_MICRO_SERVO',
      angle_deg: v.angle,
      pwm_pulse_us: Math.round(500 + (v.angle / 180) * 1900),
      duty_cycle_pct: +((500 + (v.angle / 180) * 1900) / 20000 * 100).toFixed(2),
      status: 'HOLDING_TORQUE',
    }),
  },
}

export function IoTWorkbench() {
  const [activeModuleId, setActiveModuleId] = useState<SensorModule>('esp32')
  const [sensorValues, setSensorValues] = useState<Record<string, number>>(MODULES.esp32.defaultValues)
  const [copied, setCopied] = useState(false)
  const [packetCount, setPacketCount] = useState(142)
  const [lastTxTime, setLastTxTime] = useState('0.12s ago')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion() ?? false

  const activeModule = MODULES[activeModuleId]

  const handleModuleSelect = (id: SensorModule) => {
    portfolioSounds.playSelect()
    setActiveModuleId(id)
    setSensorValues(MODULES[id].defaultValues)
  }

  const handleSliderChange = (key: string, val: number) => {
    portfolioSounds.playBlip(500 + val * 2)
    setSensorValues((prev) => ({ ...prev, [key]: val }))
    setPacketCount((p) => p + 1)
    setLastTxTime('Just now')
  }

  const handleCopyCode = () => {
    portfolioSounds.playStarSparkle()
    navigator.clipboard.writeText(activeModule.codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Periodic simulated packet ping
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketCount((p) => p + 1)
      setLastTxTime('0.05s ago')
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Live Oscilloscope Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let phase = 0

    const render = () => {
      animId = requestAnimationFrame(render)
      phase += 0.05

      const w = canvas.width
      const h = canvas.height

      // Clear & Draw grid
      ctx.fillStyle = '#130d1a'
      ctx.fillRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(255, 200, 87, 0.1)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Draw primary waveform modulated by active sensor values
      ctx.strokeStyle = '#6fcf97'
      ctx.lineWidth = 2
      ctx.shadowColor = '#6fcf97'
      ctx.shadowBlur = 8

      ctx.beginPath()
      const midY = h / 2

      // Frequency / amplitude modulation based on active values
      let freqFactor = 0.04
      let ampFactor = 25

      if (activeModuleId === 'esp32') {
        freqFactor = (sensorValues.freq || 240) * 0.0003
        ampFactor = 28
      } else if (activeModuleId === 'dht22') {
        freqFactor = 0.03
        ampFactor = (sensorValues.temp || 28) * 0.9
      } else if (activeModuleId === 'hcsr04') {
        freqFactor = 0.06
        ampFactor = Math.min(38, Math.max(8, (sensorValues.distance || 50) * 0.3))
      } else if (activeModuleId === 'ldr') {
        freqFactor = 0.02 + (sensorValues.lux || 500) * 0.00008
        ampFactor = 30
      } else if (activeModuleId === 'servo') {
        freqFactor = 0.05
        ampFactor = (sensorValues.angle || 90) * 0.22
      }

      for (let x = 0; x < w; x++) {
        const noise = (Math.sin(x * 0.5 + phase * 2) + Math.cos(x * 0.2)) * 1.5
        const y = midY + Math.sin(x * freqFactor + phase) * ampFactor + noise
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [activeModuleId, sensorValues])

  const payloadJson = JSON.stringify(
    {
      topic: `zenith/node-01/${activeModule.id}`,
      timestamp_utc: Math.floor(Date.now() / 1000),
      telemetry: activeModule.getMqttPayload(sensorValues),
    },
    null,
    2
  )

  return (
    <section id="iot-workbench" className="relative px-4 sm:px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--color-star)]/30 bg-[var(--color-nebula)]/40 font-stat text-xs text-[var(--color-star)] shadow-[0_0_12px_rgba(255,200,87,0.25)]">
            <Cpu className="h-3.5 w-3.5" />
            <span>INTERACTIVE HARDWARE LAB</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-[var(--color-starchart)]">
            IoT Telemetry Workbench
          </h2>
          <p className="mt-2 font-body text-base md:text-lg text-[var(--color-ink-muted)]">
            Simulate real ESP32 microcontroller sensor inputs, live signal waveforms, and MQTT packet streams
          </p>
        </motion.div>

        <PixelPanel variant="nebula" className="shadow-[6px_6px_0_0_#000] p-4 md:p-8">
          {/* Module Selector Tabs */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-5">
            {(Object.keys(MODULES) as SensorModule[]).map((key) => {
              const mod = MODULES[key]
              const isActive = activeModuleId === key
              return (
                <motion.button
                  key={key}
                  onClick={() => handleModuleSelect(key)}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2 rounded-md font-display text-xs transition-all cursor-pointer select-none',
                    isActive
                      ? 'bg-[var(--color-star)] text-[var(--color-void)] font-bold shadow-[2px_2px_0_0_#000,0_0_14px_rgba(255,200,87,0.4)] border-2 border-[var(--color-star)]'
                      : 'bg-[var(--color-void-deep)] text-[var(--color-starchart)] border border-white/10 hover:border-white/25'
                  )}
                  whileHover={reducedMotion ? {} : { scale: isActive ? 1 : 1.04 }}
                  whileTap={reducedMotion ? {} : { scale: 0.96 }}
                >
                  <span className="text-base">{mod.icon}</span>
                  <span>{mod.name}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Module Banner Description */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--color-void-deep)] p-3 border border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{activeModule.icon}</span>
              <div>
                <h3 className="font-display text-xs md:text-sm text-[var(--color-star)]">
                  {activeModule.name} · {activeModule.label}
                </h3>
                <p className="font-body text-xs text-[var(--color-ink-muted)]">
                  {activeModule.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 font-stat text-xs text-[var(--color-ink-muted)]">
              <div className="flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-[var(--color-aurora)] animate-pulse" />
                <span className="text-[var(--color-aurora)] font-bold">TX ONLINE</span>
              </div>
              <div>
                <span>PACKETS: </span>
                <span className="text-[var(--color-star)] font-bold">{packetCount}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ── Left Column: Interactive Controls & Oscilloscope (7 cols) ── */}
            <div className="lg:col-span-7 space-y-6">
              {/* Interactive Hardware Dials */}
              <div className="rounded-lg bg-[var(--color-void-deep)] p-4 md:p-5 border border-white/10 shadow-[inner_0_0_15px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2.5">
                  <span className="font-display text-xs text-[var(--color-star)] flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5" />
                    HARDWARE SENSOR INJECTION
                  </span>
                  <span className="font-stat text-[11px] text-[var(--color-ink-muted)]">
                    Adjust dials to mutate telemetry
                  </span>
                </div>

                <div className="space-y-4">
                  {activeModule.controls.map((ctrl) => {
                    const val = sensorValues[ctrl.key] ?? ctrl.min
                    return (
                      <div key={ctrl.key} className="space-y-1.5">
                        <div className="flex justify-between font-stat text-xs">
                          <span className="text-[var(--color-starchart)]">{ctrl.label}</span>
                          <span className="text-[var(--color-star)] font-bold">
                            {val} {ctrl.unit}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={ctrl.min}
                          max={ctrl.max}
                          step={ctrl.step}
                          value={val}
                          onChange={(e) => handleSliderChange(ctrl.key, parseFloat(e.target.value))}
                          className="w-full h-2 rounded-lg bg-[var(--color-nebula)] appearance-none cursor-pointer accent-[var(--color-star)] focus:outline-none"
                        />
                      </div>
                    )
                  })}
                </div>

                {/* Animated Physical Servo Blade Simulation when Servo is active */}
                {activeModuleId === 'servo' && (
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-6">
                    <div className="text-center font-stat text-xs text-[var(--color-ink-muted)]">
                      <span>ACTUATOR SHAFT ROTATION:</span>
                    </div>
                    <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-[var(--color-star)]/40 flex items-center justify-center bg-[var(--color-void)]">
                      <div
                        className="w-1.5 h-8 bg-[var(--color-comet)] rounded-full origin-bottom shadow-[0_0_8px_rgba(255,139,76,0.8)] transition-transform duration-150"
                        style={{ transform: `rotate(${sensorValues.angle - 90}deg)` }}
                      />
                      <div className="absolute w-3 h-3 rounded-full bg-[var(--color-star)]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Live Signal Oscilloscope */}
              <div className="rounded-lg bg-[var(--color-void-deep)] p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2 font-stat text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-aurora)] animate-ping" />
                    <span className="text-[var(--color-aurora)] font-bold">ADC OSCILLOSCOPE (CHANNEL 1)</span>
                  </div>
                  <span className="text-[var(--color-ink-muted)]">50 MS/DIV · 3.3V P-P</span>
                </div>

                <div className="relative overflow-hidden rounded border border-white/10">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={120}
                    className="w-full h-[120px] block"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                      background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
                      backgroundSize: '100% 4px',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Right Column: Live MQTT Packet Stream & C++ Firmware (5 cols) ── */}
            <div className="lg:col-span-5 space-y-6">
              {/* MQTT Packet Terminal */}
              <div className="rounded-lg bg-[var(--color-void-deep)] p-4 border border-white/10 font-stat text-xs">
                <div className="flex items-center justify-between mb-2.5 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5 text-[var(--color-star)] font-bold">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>LIVE MQTT PACKET STREAM</span>
                  </div>
                  <span className="text-[10px] text-[var(--color-aurora)]">QoS 1 · BROKER READY</span>
                </div>

                <pre className="p-3 rounded bg-[#0f0917] border border-black text-[var(--color-starchart)] overflow-x-auto text-[11px] leading-relaxed font-mono">
                  <code>{payloadJson}</code>
                </pre>

                <div className="mt-2.5 flex items-center justify-between text-[10px] text-[var(--color-ink-muted)]">
                  <span>LAST TRANSMIT: {lastTxTime}</span>
                  <span className="text-[var(--color-star)]">PROTO: MQTT/TCP 1883</span>
                </div>
              </div>

              {/* Embedded C++ Firmware Snippet */}
              <div className="rounded-lg bg-[var(--color-void-deep)] p-4 border border-white/10 font-stat text-xs">
                <div className="flex items-center justify-between mb-2.5 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5 text-[var(--color-comet)] font-bold">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>EMBEDDED C++ DRIVER</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    type="button"
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--color-nebula)] border border-white/15 text-[var(--color-starchart)] hover:text-[var(--color-star)] transition-colors cursor-pointer text-[10px]"
                  >
                    {copied ? <Check className="h-3 w-3 text-[var(--color-aurora)]" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="p-3 rounded bg-[#0f0917] border border-black text-[var(--color-starchart)] overflow-x-auto text-[10px] leading-relaxed font-mono max-h-[160px] overflow-y-auto">
                  <code>{activeModule.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
  )
}
