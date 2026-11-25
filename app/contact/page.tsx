'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Loader2, CheckCircle } from 'lucide-react'
import Footer from '@/components/shared/Footer'

const inputS: React.CSSProperties = { width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 14, background: 'rgba(17,19,24,0.9)', border: '1px solid rgba(212,168,83,0.3)', color: '#fff', outline: 'none', boxSizing: 'border-box' }
const labelS: React.CSSProperties = { display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6, fontWeight: 500 }
const card: React.CSSProperties = { background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 16, padding: 20, display: 'flex', gap: 14 }

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <>
      <div style={{ minHeight: '100vh', background: '#08090B', paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: '80px 0', background: '#111318', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(212,168,83,0.05), transparent)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
            <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Get In Touch</span>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', margin: '12px 0 16px', fontFamily: 'Georgia, serif' }}>Contact Us</h1>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, margin: '0 auto 16px' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>Have a project in mind? Reach out and our team will respond within 24 hours.</p>
          </div>
        </section>

        <section style={{ padding: '64px 0', background: '#08090B' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 48 }}>

              {/* Left — info */}
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 24, fontFamily: 'Georgia, serif' }}>Our Contact Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                  {[
                    { icon: Phone,  label: 'Phone',   value: '+91 99999 99999', hint: 'Mon–Sat, 9 AM–7 PM', href: 'tel:+919999999999' },
                    { icon: Mail,   label: 'Email',   value: 'info@lakpalconstruction.com', hint: 'We reply within 24 hours', href: 'mailto:info@lakpalconstruction.com' },
                    { icon: MapPin, label: 'Address', value: 'Your Company Address, City, State', hint: 'Visit us anytime', href: '#' },
                  ].map(c => (
                    <div key={c.label} style={card}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <c.icon size={22} color="#D4A853" />
                      </div>
                      <div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginBottom: 2 }}>{c.label}</p>
                        <a href={c.href} style={{ color: '#fff', fontWeight: 500, fontSize: 14, textDecoration: 'none', display: 'block' }}>{c.value}</a>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>{c.hint}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hours */}
                <div style={{ background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Clock size={18} color="#D4A853" />
                    <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Business Hours</h3>
                  </div>
                  {[['Monday – Friday','9:00 AM – 7:00 PM'],['Saturday','10:00 AM – 5:00 PM'],['Sunday','Closed']].map(([d,t]) => (
                    <div key={d} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{d}</span>
                      <span style={{ color: t === 'Closed' ? '#f87171' : '#D4A853', fontWeight: 500 }}>{t}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp */}
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.3)', borderRadius: 16, padding: 16, textDecoration: 'none' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={22} color="#fff" />
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Chat on WhatsApp</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 2 }}>Get instant replies</p>
                  </div>
                </a>
              </div>

              {/* Right — form */}
              <div>
                <div style={{ background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 20, padding: 32 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 24, fontFamily: 'Georgia, serif' }}>Send Us a Message</h2>
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                      <CheckCircle size={56} color="#4ade80" style={{ margin: '0 auto 16px' }} />
                      <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Message Sent!</h3>
                      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>We will get back to you within 24 hours.</p>
                      <button onClick={() => { setStatus('idle'); setForm({ name:'', phone:'', email:'', message:'' }) }}
                        className="btn-gold" style={{ padding: '12px 28px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: 14 }}>
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                          <label style={labelS}>Your Name *</label>
                          <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rahul Kumar" style={inputS} />
                        </div>
                        <div>
                          <label style={labelS}>Phone Number *</label>
                          <input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9876543210" style={inputS} />
                        </div>
                      </div>
                      <div>
                        <label style={labelS}>Email Address</label>
                        <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" style={inputS} />
                      </div>
                      <div>
                        <label style={labelS}>Your Message *</label>
                        <textarea required rows={5} value={form.message} onChange={e => set('message', e.target.value)}
                          placeholder="Tell us about your project..." style={{ ...inputS, resize: 'none' }} />
                      </div>
                      <button type="submit" disabled={status === 'loading'} className="btn-gold"
                        style={{ padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'loading' ? 0.7 : 1 }}>
                        {status === 'loading' ? <><Loader2 size={18} />Sending...</> : <><Send size={18} />Send Message</>}
                      </button>
                    </form>
                  )}
                </div>

                {/* Map placeholder */}
                <div style={{ background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 16, marginTop: 20, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={36} color="rgba(212,168,83,0.3)" style={{ marginBottom: 8 }} />
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Google Maps Embed</p>
                  <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 4 }}>Add your Google Maps API key to enable map</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
