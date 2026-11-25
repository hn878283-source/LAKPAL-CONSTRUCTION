import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
const SHEET_NAME = 'Construction Orders'

function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get('lakpal_admin_session')?.value
  return !!token
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) throw new Error('Google credentials not configured')
  return new google.auth.JWT(email, undefined, key, ['https://www.googleapis.com/auth/spreadsheets'])
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!SPREADSHEET_ID) {
      // Return empty demo data if not configured
      return NextResponse.json({ success: true, inquiries: [] })
    }

    const auth = getAuth()
    const sheets = google.sheets({ version: 'v4', auth })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:N`,
    })

    const rows = response.data.values || []
    if (rows.length <= 1) return NextResponse.json({ success: true, inquiries: [] })

    const headers = rows[0]
    const inquiries = rows.slice(1).map((row) => ({
      orderId: row[0] || '',
      submittedAt: row[1] || '',
      fullName: row[2] || '',
      phone: row[3] || '',
      email: row[4] || '',
      serviceType: row[5] || '',
      projectType: row[6] || '',
      location: row[7] || '',
      area: row[8] || '',
      budget: row[9] || '',
      floors: row[10] || '',
      startDate: row[11] || '',
      description: row[12] || '',
      status: row[13] || 'New',
    })).reverse() // Latest first

    return NextResponse.json({ success: true, inquiries })
  } catch (err) {
    console.error('[Admin Inquiries GET Error]:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { orderId, status } = await req.json()
    if (!orderId || !status) {
      return NextResponse.json({ success: false, message: 'Missing orderId or status' }, { status: 400 })
    }

    if (!SPREADSHEET_ID) {
      return NextResponse.json({ success: true, message: 'Updated (demo mode)' })
    }

    const auth = getAuth()
    const sheets = google.sheets({ version: 'v4', auth })

    // Find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    })
    const orderIds = response.data.values || []
    const rowIndex = orderIds.findIndex(r => r[0] === orderId)

    if (rowIndex === -1) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 })
    }

    // Update status in column N (index 14, row is 1-indexed)
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!N${rowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[status]] },
    })

    return NextResponse.json({ success: true, message: 'Status updated' })
  } catch (err) {
    console.error('[Admin Inquiries PATCH Error]:', err)
    return NextResponse.json({ success: false, message: 'Failed to update status' }, { status: 500 })
  }
}
