# Lakpal Construction – Setup Guide

## Website: http://localhost:3000

---

## Google Sheets Setup (Inquiry Form Ko Connect Karne Ke Liye)

### Step 1: Google Cloud Project Banao
1. https://console.cloud.google.com par jao
2. "New Project" click karo → Name: "Lakpal Construction"
3. Project select karo

### Step 2: Google Sheets API Enable Karo
1. Left menu → "APIs & Services" → "Library"
2. "Google Sheets API" search karo
3. Click karke "Enable" karo

### Step 3: Service Account Banao
1. "APIs & Services" → "Credentials"
2. "+ Create Credentials" → "Service Account"
3. Name: "lakpal-sheets" → "Create and Continue" → "Done"
4. Service account par click karo → "Keys" tab
5. "Add Key" → "Create new key" → JSON → Download

### Step 4: Google Sheet Banao
1. https://sheets.google.com par jao
2. New spreadsheet banao: "Lakpal Construction Orders"
3. Sheet tab ka naam "Construction Orders" karo (bottom mein)
4. URL se Spreadsheet ID copy karo:
   `https://docs.google.com/spreadsheets/d/[YE_HAI_SPREADSHEET_ID]/edit`

### Step 5: Service Account Ko Permission Do
1. Google Sheet open karo
2. "Share" button click karo
3. Downloaded JSON file mein "client_email" copy karo
4. Us email ko "Editor" access do

### Step 6: .env.local File Update Karo
```
GOOGLE_SHEETS_SPREADSHEET_ID=aapka_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=aapka_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\naapki_private_key\n-----END PRIVATE KEY-----\n"
```
> **Note:** JSON file mein `private_key` field ka value copy karo as-is.

---

## Admin Dashboard

- URL: http://localhost:3000/admin
- Username: **admin**
- Password: **Lakpal@2024**

> Password badalne ke liye `.env.local` mein `ADMIN_PASSWORD` update karo

---

## Company Details Update Karo

`.env.local` file mein:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210   # Apna number
NEXT_PUBLIC_COMPANY_PHONE=+91 98765 43210
NEXT_PUBLIC_COMPANY_EMAIL=info@yourcompany.com
NEXT_PUBLIC_COMPANY_ADDRESS=Complete address here
```

---

## Development Server Chalao

```bash
npm run dev
```
Website: http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

---

## Website Pages

| Page | URL |
|------|-----|
| Homepage | / |
| About Us | /about |
| Services | /services |
| Projects | /projects |
| Contact | /contact |
| Admin Login | /admin |
| Admin Dashboard | /admin/dashboard |
