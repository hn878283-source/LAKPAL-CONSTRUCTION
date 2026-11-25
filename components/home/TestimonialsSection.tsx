'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  { name: '[Client Name]', location: 'Delhi',   service: 'Home Construction', rating: 5, text: 'Lakpal Construction built our dream home beautifully. Quality work, transparent pricing, and delivered on time. Highly recommended!' },
  { name: '[Client Name]', location: 'Noida',   service: 'Commercial Project', rating: 5, text: 'Professional team, excellent communication throughout the project. The commercial building exceeded our expectations.' },
  { name: '[Client Name]', location: 'Gurgaon', service: 'Home Renovation',   rating: 5, text: 'Complete home renovation done flawlessly. The interior design team has great taste and the work quality is top-notch.' },
]

export default function TestimonialsSection() {
  return (
    <section style={{ padding: '96px 0', background: '#111318', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: 'rgba(212,168,83,0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Testimonials</span>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '12px 0 16px', fontFamily: 'Georgia, serif' }}>What Our Clients Say</h2>
          <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, margin: '0 auto 12px' }} />
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontStyle: 'italic' }}>* Sample testimonials — will be replaced with real client reviews</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 20, padding: 28 }}
            >
              {/* Quote mark */}
              <div style={{ fontSize: 48, color: 'rgba(212,168,83,0.2)', lineHeight: 1, marginBottom: 16, fontFamily: 'Georgia, serif' }}>"</div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>{t.text}</p>
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} color="#D4A853" fill="#D4A853" />
                ))}
              </div>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A853', fontWeight: 700, fontSize: 16 }}>C</div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{t.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>{t.service} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
