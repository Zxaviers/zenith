import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message, botcheck } = body

    // 1. Bot honeypot protection
    if (botcheck) {
      return NextResponse.json(
        { success: false, message: 'Bot detected.' },
        { status: 400 }
      )
    }

    // 2. Input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Name/callsign is required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: 'Transmission message must be at least 5 characters.' },
        { status: 400 }
      )
    }

    // 3. Web3Forms Forwarding (if access key is provided)
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY

    if (accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `[Zenith Portfolio] New Transmission from ${name.trim()}`,
          from_name: 'Zenith Transmission Uplink',
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send transmission via the email gateway.')
      }

      return NextResponse.json({
        success: true,
        message: 'Transmission sent straight to the inbox!',
      })
    }

    // 4. Fallback in development or when no external key is configured
    console.log('[TRANSMISSION RECEIVED]', {
      timestamp: new Date().toISOString(),
      name,
      email,
      message,
    })

    return NextResponse.json({
      success: true,
      message: 'Transmission received and logged to the system!',
    })
  } catch (error: any) {
    console.error('[TRANSMISSION_ERROR]', error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'A system error occurred while sending the transmission.',
      },
      { status: 500 }
    )
  }
}
