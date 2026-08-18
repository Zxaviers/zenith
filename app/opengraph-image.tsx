import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Zenith — Portfolio of Rizky Mardhani'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'radial-gradient(circle at 50% 30%, #3e2a63 0%, #1b1235 55%, #1b1235 100%)',
          padding: '48px 56px',
          fontFamily: 'sans-serif',
          position: 'relative',
          border: '12px solid #ffc857',
        }}
      >
        {/* Subtle Background Star Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #ffc857 2px, transparent 3px), radial-gradient(circle at 80% 40%, #ff8b4c 2px, transparent 3px), radial-gradient(circle at 40% 80%, #f5e9d6 2px, transparent 3px)',
            opacity: 0.35,
          }}
        />

        {/* Header HUD Bar */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid rgba(255, 200, 87, 0.4)',
            paddingBottom: '16px',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#ffc857',
                boxShadow: '0 0 12px #ffc857',
              }}
            />
            <span
              style={{
                color: '#ffc857',
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.15em',
              }}
            >
              MISSION CONTROL // LIVE TELEMETRY
            </span>
          </div>

          <span
            style={{
              color: '#f5e9d6',
              fontSize: '18px',
              opacity: 0.8,
              letterSpacing: '0.1em',
            }}
          >
            FREQ: 142.85 MHz // SECURE
          </span>
        </div>

        {/* Central Core Title & Operator Badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '104px',
              fontWeight: 900,
              color: '#f5e9d6',
              letterSpacing: '0.08em',
              textShadow: '0 0 30px rgba(255, 200, 87, 0.6), 0 0 60px rgba(255, 139, 76, 0.3)',
              marginBottom: '12px',
            }}
          >
            ZENITH
          </div>

          <div
            style={{
              fontSize: '28px',
              color: '#ff8b4c',
              letterSpacing: '0.15em',
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            SYSTEMS & WEB ENGINEERING // IOT TELEMETRY
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(27, 18, 53, 0.9)',
              border: '2px solid #ffc857',
              borderRadius: '8px',
              padding: '10px 28px',
              boxShadow: '8px 8px 0 0 rgba(0, 0, 0, 0.6)',
            }}
          >
            <span
              style={{
                color: '#f5e9d6',
                fontSize: '22px',
                letterSpacing: '0.05em',
              }}
            >
              OPERATOR:{' '}
              <span style={{ color: '#ffc857', fontWeight: 'bold' }}>
                RIZKY MARDHANI
              </span>
            </span>
          </div>
        </div>

        {/* Footer Tech Stacks & Domain */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(255, 200, 87, 0.3)',
            paddingTop: '16px',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            {['REACT', 'NEXT.JS 15', 'ESP32 / IOT', 'TAILWIND', 'TYPESCRIPT'].map((tech) => (
              <div
                key={tech}
                style={{
                  background: '#3e2a63',
                  border: '1px solid rgba(255, 200, 87, 0.4)',
                  color: '#ffc857',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '4px',
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <span
            style={{
              color: '#ffc857',
              fontSize: '20px',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
            }}
          >
            zenithcode.my.id
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
