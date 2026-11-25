import { NextRequest, NextResponse } from 'next/server'
import { appendInquiry } from '@/lib/googleSheets'

function generateOrderId(): string {
  const prefix = 'LC'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

function sanitize(str: string): string {
  return str.replace(/[<>'";&]/g, '').trim().substring(0, 500)
}

const recentSubmissions = new Map<string, number>()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { fullName, phone, email, serviceType, projectType, location, area, budget, description, floors, plotSize, startDate } = body

    // Validate required fields
    if (!fullName?.trim()) return NextResponse.json({ success: false, message: 'Full name is required' }, { status: 400 })
    if (!phone?.trim()) return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 })
    if (!/^[6-9]\d{9}$/.test(phone.trim())) return NextResponse.json({ success: false, message: 'Invalid Indian mobile number' }, { status: 400 })
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ success: false, message: 'Invalid email address' }, { status: 400 })
    if (!serviceType) return NextResponse.json({ success: false, message: 'Service type is required' }, { status: 400 })
    if (!location?.trim()) return NextResponse.json({ success: false, message: 'Project location is required' }, { status: 400 })
    if (!budget) return NextResponse.json({ success: false, message: 'Budget range is required' }, { status: 400 })
    if (!description?.trim()) return NextResponse.json({ success: false, message: 'Project description is required' }, { status: 400 })

    // Duplicate submission check (same phone within 60 seconds)
    const now = Date.now()
    const key = phone.trim()
    const lastSubmit = recentSubmissions.get(key)
    if (lastSubmit && now - lastSubmit < 60000) {
      return NextResponse.json({ success: false, message: 'Duplicate submission detected. Please wait a moment.' }, { status: 429 })
    }
    recentSubmissions.set(key, now)
    // Clean up old entries
    for (const [k, v] of recentSubmissions) {
      if (now - v > 300000) recentSubmissions.delete(k)
    }

    const orderId = generateOrderId()
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    const data = {
      orderId,
      submittedAt,
      fullName: sanitize(fullName),
      phone: phone.trim(),
      email: email ? sanitize(email) : '',
      serviceType: sanitize(serviceType),
      projectType: projectType ? sanitize(projectType) : '',
      location: sanitize(location),
      area: area ? sanitize(area) : '',
      budget: sanitize(budget),
      floors: floors ? sanitize(floors) : '',
      startDate: startDate || '',
      description: sanitize(description),
    }

    await appendInquiry(data)

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Inquiry submitted successfully',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Inquiry API Error]:', message)

    // Check if it's a Google Sheets config issue
    if (message.includes('credentials') || message.includes('SPREADSHEET_ID')) {
      return NextResponse.json({
        success: false,
        message: 'Server configuration issue. Please contact us directly on phone or WhatsApp.',
      }, { status: 503 })
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to save inquiry. Please try again or contact us directly.',
    }, { status: 500 })
  }
}
