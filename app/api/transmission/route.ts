import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    let body: any
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid request body.' },
        { status: 400 }
      )
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload.' },
        { status: 400 }
      )
    }

    const { name, email, message, botcheck } = body

    // 1. Bot honeypot protection
    if (botcheck) {
      return NextResponse.json(
        { success: false, message: 'Bot detected.' },
        { status: 400 }
      )
    }

    // 2. Input validation & length limits
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Name is required.' },
        { status: 400 }
      )
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { success: false, message: 'Name must be 100 characters or fewer.' },
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
    if (email.trim().length > 254) {
      return NextResponse.json(
        { success: false, message: 'Email address must be 254 characters or fewer.' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 5 characters.' },
        { status: 400 }
      )
    }
    if (message.trim().length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message must be 5000 characters or fewer.' },
        { status: 400 }
      )
    }

    // 3. Web3Forms key check
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    const isMissingKey = !accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY'

    if (isMissingKey) {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            message: "The contact form isn't available right now. Please email me directly.",
          },
          { status: 503 }
        )
      }

      // Development mode fallback: log only timestamp and message length
      console.log('[TRANSMISSION RECEIVED (DEV)]', {
        timestamp: new Date().toISOString(),
        messageLength: message.trim().length,
      })

      return NextResponse.json({
        success: true,
        message: 'Transmission received and logged to the system!',
      })
    }

    // 4. Web3Forms Forwarding
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
  } catch (error: any) {
    console.error('[TRANSMISSION_ERROR]', error)
    return NextResponse.json(
      {
        success: false,
        message: 'A system error occurred while sending the transmission.',
      },
      { status: 500 }
    )
  }
}
