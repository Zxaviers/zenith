import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Zenith'
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
          background: '#1b1235', // void
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '16px solid #3e2a63', // nebula
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(245, 233, 214, 0.05)', // starchart/5
            padding: '40px 80px',
            border: '4px solid #ffc857', // star
            boxShadow: '16px 16px 0 0 rgba(0, 0, 0, 0.55)',
          }}
        >
          <div
            style={{
              fontSize: 100,
              color: '#f5e9d6', // starchart
              fontFamily: 'monospace',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            ZENITH
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#ff8b4c', // comet
              fontFamily: 'sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            Mission Control / Portfolio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
