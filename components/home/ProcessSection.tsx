'use client'
import { motion } from 'framer-motion'
import { MessageSquare, PenTool, Calculator, HardHat, CheckSquare, Key } from 'lucide-react'

const steps = [
  { icon: MessageSquare, step: '01', title: 'Consultation',       desc: 'Free initial consultation to understand your vision and requirements.' },
  { icon: PenTool,       step: '02', title: 'Planning & Design',  desc: 'Detailed architectural plans and 3D designs tailored to your needs.' },
  { icon: Calculator,    step: '03', title: 'Cost Estimation',    desc: 'Transparent, itemized quotation with no hidden costs.' },
  { icon: HardHat,       step: '04', title: 'Construction',       desc: 'Expert construction with premium materials and skilled professionals.' },
  { icon: CheckSquare,   step: '05', title: 'Final Inspection',   desc: 'Thorough quality inspection before project handover.' },
  { icon: Key,           step: '06', title: 'Project Handover',   desc: 'Smooth handover with complete documentation and after-service support.' },
]

export default function ProcessSection() {
  return (
    <section style={{ padding: '96px 0', background: '#08090B' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>How We Work</span>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '12px 0 16px', fontFamily: 'Georgia, serif' }}>Our Work Process</h2>
          <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, margin: '0 auto' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(17,19,24,0.75)',
                border: '1px solid rgba(212,168,83,0.2)',
                borderRadius: 20, padding: 28,
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: 'rgba(212,168,83,0.12)', lineHeight: 1, fontFamily: 'Georgia, serif' }}>{s.step}</span>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <s.icon size={24} color="#D4A853" />
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
