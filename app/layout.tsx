import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Lakpal Construction – Premium Construction Company',
  description: 'Lakpal Construction – Residential & Commercial Construction, Home Renovation, Interior Design. Expert builders delivering dream projects across India.',
  keywords: 'construction company, home construction, commercial building, renovation, interior design, Lakpal Construction',
  openGraph: {
    title: 'Lakpal Construction – Premium Construction Company',
    description: 'Building Dreams, Creating Futures. Expert residential & commercial construction services.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  )
}
