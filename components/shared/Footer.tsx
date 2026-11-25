import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export default function Footer() {
  const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12 }
  const link: React.CSSProperties = { color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 8 }

  return (
    <footer style={{ background: '#08090B', borderTop: '1px solid rgba(212,168,83,0.15)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <Image
                src="/logo.png"
                alt="Lakpal Consultants Logo"
                width={150}
                height={70}
                style={{ objectFit: 'contain', height: 70, width: 'auto' }}
              />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Building dreams with quality, precision, and trust. Your vision, our expertise.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(212,168,83,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A853', textDecoration: 'none' }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 2, background: '#D4A853', display: 'inline-block' }} />
              Quick Links
            </h4>
            <div style={col}>
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/projects', 'Projects'], ['/contact', 'Contact']].map(([href, label]) => (
                <Link key={href} href={href} style={link}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(212,168,83,0.5)', flexShrink: 0 }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 2, background: '#D4A853', display: 'inline-block' }} />
              Services
            </h4>
            <div style={col}>
              {['Residential Construction', 'Commercial Construction', 'Home Renovation', 'Interior Design', 'Architectural Planning', 'Structural Engineering'].map(s => (
                <Link key={s} href="/services" style={link}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(212,168,83,0.5)', flexShrink: 0 }} />
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 2, background: '#D4A853', display: 'inline-block' }} />
              Contact Us
            </h4>
            <div style={col}>
              {[
                { Icon: Phone,  label: 'Phone',   value: '+91 99999 99999', href: 'tel:+919999999999' },
                { Icon: Mail,   label: 'Email',   value: 'info@lakpalconstruction.com', href: 'mailto:info@lakpalconstruction.com' },
                { Icon: MapPin, label: 'Address', value: 'Your City, State, PIN', href: '#' },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: 12 }}>
                  <Icon size={18} color="#D4A853" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginBottom: 2 }}>{label}</p>
                    <a href={href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textDecoration: 'none' }}>{value}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(212,168,83,0.1)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>© 2024 Lakpal Construction. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'none' }}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
