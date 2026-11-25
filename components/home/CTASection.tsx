'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import InquiryModal from '@/components/shared/InquiryModal'

export default function CTASection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <section style={{ padding: '96px 0', background: '#08090B', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(212,168,83,0.08), rgba(212,168,83,0.03), rgba(212,168,83,0.08))', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,168,83,0.1)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 999, padding: '8px 20px', marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, background: '#D4A853', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#D4A853', fontSize: 14 }}>Free Consultation Available</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', marginBottom: 20, fontFamily: 'Georgia, serif', lineHeight: 1.3 }}>
              Ready to Build Your<br />
              <span style={{ background: 'linear-gradient(135deg,#D4A853,#E8C57A,#B8902A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Dream Project?
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, marginBottom: 40, lineHeight: 1.7 }}>
              Get a free consultation and detailed quote from our experts. No obligation, just honest advice for your construction project.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              <button
                onClick={() => setShowModal(true)}
                className="btn-gold"
                style={{ padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
              >
                Get a Free Consultation <ArrowRight size={20} />
              </button>
              <a
                href="tel:+919999999999"
                className="btn-outline-gold"
                style={{ padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
              >
                <Phone size={20} /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <InquiryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
