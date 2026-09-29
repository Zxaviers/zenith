// @vitest-environment node
import { describe, it, expect, vi, afterEach } from 'vitest'
import { POST } from '@/app/api/transmission/route'

function createRequest(body: unknown) {
  return new Request('http://localhost:3000/api/transmission', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/transmission route handler', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('missing key + production -> 503', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('WEB3FORMS_ACCESS_KEY', '')

    const req = createRequest({
      name: 'Explorer Rizky',
      email: 'explorer@zenith.space',
      message: 'Transmission test payload from orbital relay.',
    })

    const res = await POST(req)
    expect(res.status).toBe(503)

    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.message).toBe("The contact form isn't available right now. Please email me directly.")
  })

  it('placeholder key + production -> 503', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('WEB3FORMS_ACCESS_KEY', 'YOUR_WEB3FORMS_ACCESS_KEY')

    const req = createRequest({
      name: 'Explorer Rizky',
      email: 'explorer@zenith.space',
      message: 'Transmission test payload from orbital relay.',
    })

    const res = await POST(req)
    expect(res.status).toBe(503)

    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.message).toBe("The contact form isn't available right now. Please email me directly.")
  })

  it('honeypot (botcheck true) -> 400', async () => {
    const req = createRequest({
      name: 'SpamBot 9000',
      email: 'bot@spammer.net',
      message: 'Click this spam link now!',
      botcheck: true,
    })

    const res = await POST(req)
    expect(res.status).toBe(400)

    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.message).toBe('Bot detected.')
  })

  it('invalid email -> 400', async () => {
    const req = createRequest({
      name: 'Explorer Rizky',
      email: 'not-a-valid-email',
      message: 'Transmission test payload from orbital relay.',
    })

    const res = await POST(req)
    expect(res.status).toBe(400)

    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.message).toBe('Invalid email address.')
  })

  it('valid input + key + mocked successful Web3Forms response -> 200 and fetch called once', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('WEB3FORMS_ACCESS_KEY', 'valid_test_access_key')

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Message queued successfully' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const req = createRequest({
      name: 'Explorer Rizky',
      email: 'explorer@zenith.space',
      message: 'Valid transmission payload meeting all length limits.',
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.message).toBe('Transmission sent straight to the inbox!')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    )
  })

  it('valid input + mocked failed response -> 500 with the generic message', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('WEB3FORMS_ACCESS_KEY', 'valid_test_access_key')

    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Secret gateway failure details' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const req = createRequest({
      name: 'Explorer Rizky',
      email: 'explorer@zenith.space',
      message: 'Valid transmission payload meeting all length limits.',
    })

    const res = await POST(req)
    expect(res.status).toBe(500)

    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.message).toBe('A system error occurred while sending the transmission.')
    expect(data.message).not.toContain('Secret gateway failure details')
  })

  it('rejects payloads exceeding length limits with 400', async () => {
    // Name > 100 characters
    const longNameReq = createRequest({
      name: 'A'.repeat(101),
      email: 'explorer@zenith.space',
      message: 'Valid transmission payload.',
    })
    const resName = await POST(longNameReq)
    expect(resName.status).toBe(400)
    const dataName = await resName.json()
    expect(dataName.message).toContain('100 characters')

    // Email > 254 characters (246 + 9 = 255 chars)
    const longEmailReq = createRequest({
      name: 'Explorer',
      email: `${'a'.repeat(246)}@test.com`,
      message: 'Valid transmission payload.',
    })
    const resEmail = await POST(longEmailReq)
    expect(resEmail.status).toBe(400)

    // Message > 5000 characters
    const longMsgReq = createRequest({
      name: 'Explorer',
      email: 'explorer@zenith.space',
      message: 'A'.repeat(5001),
    })
    const resMsg = await POST(longMsgReq)
    expect(resMsg.status).toBe(400)
    const dataMsg = await resMsg.json()
    expect(dataMsg.message).toContain('5000 characters')
  })

  it('rejects null, array, or non-object payloads with 400', async () => {
    // null body in JSON
    const nullReq = createRequest(null)
    const resNull = await POST(nullReq)
    expect(resNull.status).toBe(400)
    const dataNull = await resNull.json()
    expect(dataNull.success).toBe(false)
    expect(dataNull.message).toBe('Invalid payload.')

    // Array body in JSON
    const arrayReq = createRequest(['invalid', 'array'])
    const resArray = await POST(arrayReq)
    expect(resArray.status).toBe(400)
    const dataArray = await resArray.json()
    expect(dataArray.message).toBe('Invalid payload.')

    // Empty/missing name
    const missingNameReq = createRequest({
      email: 'explorer@zenith.space',
      message: 'Hello, this is a test transmission.',
    })
    const resMissingName = await POST(missingNameReq)
    expect(resMissingName.status).toBe(400)
    const dataMissingName = await resMissingName.json()
    expect(dataMissingName.message).toBe('Name is required.')
  })
})

