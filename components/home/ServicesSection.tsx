'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Building2, Hammer, Palette, PenTool, HardHat, ArrowRight } from 'lucide-react'
import InquiryModal from '@/components/shared/InquiryModal'

const services = [
  { icon: Home,      title: 'Residential Construction', desc: 'Dream homes built with precision and quality craftsmanship, from foundation to finishing.' },
  { icon: Building2, title: 'Commercial Construction',  desc: 'Modern office buildings, malls, and commercial spaces designed for success.' },
  { icon: Hammer,    title: 'Home Renovation',          desc: 'Transform your existing space with expert renovation and remodeling services.' },
  { icon: Palette,   title: 'Interior Design',          desc: 'Beautiful interiors that reflect your personality and maximize functionality.' },
  { icon: PenTool,   title: 'Architectural Planning',   desc: 'Expert architectural designs and planning for every type of project.' },
  { icon: HardHat,   title: 'Structural Engineering',   desc: 'Robust structural solutions ensuring safety and longevity of your construction.' },
]

export default function ServicesSection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <section id="services" style={{ padding: '96px 0', background: '#08090B' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>What We Do</span>
            <h2 style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '12px 0 16px', fontFamily: 'Georgia, serif' }}>Our Services</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, margin: '0 auto 20px' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              From concept to completion, we offer comprehensive construction services tailored to your needs.
            </p>
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background: 'rgba(17,19,24,0.75)',
                  border: '1px solid rgba(212,168,83,0.2)',
                  borderRadius: 20, padding: 28,
                  transition: 'border-color 0.3s, transform 0.3s',
                  cursor: 'default',
                }}
                whileHover={{ y: -4, borderColor: 'rgba(212,168,83,0.5)' } as never}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'rgba(212,168,83,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <s.icon size={28} color="#D4A853" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: '#D4A853', fontSize: 14, fontWeight: 500,
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  }}
                >
                  Get Quote <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link
              href="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '2px solid #D4A853', color: '#D4A853',
                padding: '14px 32px', borderRadius: 12,
                fontSize: 15, fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <InquiryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
