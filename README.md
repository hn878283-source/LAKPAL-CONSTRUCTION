# 🏗️ Lakpal Construction — Premium Construction Company Website

A modern, full-stack construction company website built with **Next.js 15**, featuring a stunning dark gold theme, 3D interactive building, inquiry management system, and admin dashboard.

---

## 🌟 Live Preview

> Deploy on Vercel for live URL — see deployment guide below.

---

## 📸 Features

- ⚡ **Next.js 15** App Router with TypeScript
- 🎨 **Dark Gold Premium UI** — custom Tailwind CSS theme
- 🏢 **Interactive 3D Building** — built with Three.js (drag to rotate)
- 📋 **Inquiry Form** — leads saved directly to Google Sheets
- 📊 **Admin Dashboard** — view, filter, update & export inquiries
- 💬 **WhatsApp Integration** — floating chat button
- 🎞️ **Framer Motion** animations throughout
- 📱 **Fully Responsive** — mobile, tablet, desktop
- 🔒 **Admin Auth** — cookie-based session (8 hours)

---

## 🗂️ Project Structure

```
├── app/
│   ├── page.tsx                  # Home page
│   ├── about/page.tsx            # About Us
│   ├── services/page.tsx         # Services
│   ├── projects/page.tsx         # Projects Portfolio
│   ├── contact/page.tsx          # Contact
│   ├── admin/page.tsx            # Admin Login
│   ├── admin/dashboard/page.tsx  # Admin Dashboard
│   └── api/
│       ├── inquiry/route.ts      # Submit inquiry → Google Sheets
│       └── admin/
│           ├── login/route.ts    # Admin login
│           ├── logout/route.ts   # Admin logout
│           └── inquiries/route.ts # Get/Update inquiries
│
├── components/
│   ├── 3d/BuildingScene.tsx      # Three.js 3D building
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   └── shared/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── InquiryModal.tsx
│       └── WhatsAppButton.tsx
│
├── lib/
│   └── googleSheets.ts           # Google Sheets API integration
│
└── public/
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Three.js | 3D interactive building |
| Google Sheets API | Database for inquiries |
| Lucide React | Icons |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hn878283-source/LAKPAL-CONSTRUCTION.git
cd LAKPAL-CONSTRUCTION
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory:

```env
# Google Sheets — for saving inquiries
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourStrongPassword@2024

# WhatsApp number (with country code, no +)
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Google Sheets API**
4. Create a **Service Account** → download JSON key
5. Copy `client_email` → paste in `GOOGLE_SERVICE_ACCOUNT_EMAIL`
6. Copy `private_key` → paste in `GOOGLE_PRIVATE_KEY`
7. Create a Google Sheet named **"Construction Orders"**
8. Share the sheet with your service account email (Editor access)
9. Copy the Sheet ID from URL → paste in `GOOGLE_SHEETS_SPREADSHEET_ID`

---

## 🔐 Admin Dashboard

Access the admin panel at `/admin`

| Feature | Description |
|---|---|
| View Inquiries | See all submitted leads from Google Sheets |
| Search & Filter | Filter by name, phone, order ID, status |
| Update Status | New → Contacted → Quotation Sent → In Progress → Completed |
| Export CSV | Download all inquiries as CSV file |
| Detail View | Click any row to see full inquiry details |

**Default credentials** (change in `.env.local`):
```
Username: admin
Password: Lakpal@2024
```

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, Services, Why Us, Process, Stats, Testimonials, CTA |
| About | `/about` | Mission, Vision, Values, Team |
| Services | `/services` | Detailed service cards with features & benefits |
| Projects | `/projects` | Portfolio with category filter |
| Contact | `/contact` | Contact form, details, WhatsApp, business hours |
| Admin | `/admin` | Login page |
| Dashboard | `/admin/dashboard` | Inquiry management |

---

## 🌐 Deploy on Vercel

1. Push code to GitHub ✅ *(already done)*
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import `LAKPAL-CONSTRUCTION` repository
4. Add all environment variables from `.env.local`
5. Click **Deploy**

---

## 📞 Contact Details to Update

Before going live, update these placeholder values in the codebase:

- **Phone:** `+91 99999 99999` → your real number
- **Email:** `info@lakpalconstruction.com` → your real email
- **Address:** `Your City, State, PIN` → your real address
- **WhatsApp:** Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`

Files to update:
- `components/shared/Footer.tsx`
- `app/contact/page.tsx`
- `components/home/CTASection.tsx`

---

## 📝 License

This project is private. All rights reserved © 2024 Lakpal Construction.
