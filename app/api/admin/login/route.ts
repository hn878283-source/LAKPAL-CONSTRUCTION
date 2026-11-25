import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Lakpal@2024'

const SESSION_TOKEN = 'lakpal_admin_session'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      const response = NextResponse.json({ success: true })
      response.cookies.set(SESSION_TOKEN, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      })
      return response
    }

    return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
