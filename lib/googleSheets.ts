import { google } from 'googleapis'

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
const SHEET_NAME = 'Construction Orders'

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) throw new Error('Google credentials not configured')
  return new google.auth.JWT(email, undefined, key, ['https://www.googleapis.com/auth/spreadsheets'])
}

export async function appendInquiry(data: Record<string, string>) {
  if (!SPREADSHEET_ID) throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID not set')

  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  // Ensure header row exists
  try {
    const check = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:N1`,
    })
    if (!check.data.values || check.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            'Order ID', 'Submission Date', 'Customer Name', 'Phone Number',
            'Email', 'Service Type', 'Project Type', 'Project Location',
            'Construction Area', 'Estimated Budget', 'Number of Floors',
            'Preferred Start Date', 'Project Description', 'Order Status',
          ]],
        },
      })
    }
  } catch { /* sheet may not exist yet */ }

  const row = [
    data.orderId,
    data.submittedAt,
    data.fullName,
    data.phone,
    data.email || '',
    data.serviceType,
    data.projectType || '',
    data.location,
    data.area || '',
    data.budget,
    data.floors || '',
    data.startDate || '',
    data.description,
    'New',
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:N`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
}
