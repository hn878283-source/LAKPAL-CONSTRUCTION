'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Award, IndianRupee, Clock, Cpu, Heart } from 'lucide-react'

const reasons = [
  { icon: ShieldCheck, title: 'Quality Construction',     desc: 'Premium materials and strict quality standards on every project.' },
  { icon: Award,       title: 'Experienced Professionals',desc: '10+ years of expertise in residential and commercial construction.' },
  { icon: IndianRupee, title: 'Transparent Pricing',      desc: 'No hidden costs. Clear, detailed quotations before any work begins.' },
  { icon: Clock,       title: 'Timely Delivery',          desc: 'We commit to deadlines and deliver projects on schedule, every time.' },
  { icon: Cpu,         title: 'Modern Technology',        desc: 'Latest construction techniques and technology for superior results.' },
  { icon: Heart,       title: 'Customer First',           desc: 'Your satisfaction is our priority. We work closely with you at every step.' },
]

export default function WhyChooseUs() {
  return (
    <section style={{ padding: '96px 0', background: '#111318', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 300, height: 300, background: 'rgba(212,168,83,0.04)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* Left text */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Why Us</span>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#fff', margin: '12px 0 16px', fontFamily: 'Georgia, serif', lineHeight: 1.3 }}>
              Why Choose<br />Lakpal Construction?
            </h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, marginBottom: 20 }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 32 }}>
              We combine decades of expertise with modern techniques to deliver exceptional construction projects.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {[{ n: '500+', l: 'Projects' }, { n: '10+', l: 'Years' }, { n: '100%', l: 'Satisfaction' }].map(s => (
                <div key={s.l} style={{ background: 'rgba(8,9,11,0.5)', border: '1px solid rgba(212,168,83,0.15)', borderRadius: 14, padding: '20px 12px', textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 700, color: '#D4A853', fontFamily: 'Georgia, serif' }}>{s.n}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: 'rgba(17,19,24,0.75)',
                  border: '1px solid rgba(212,168,83,0.15)',
                  borderRadius: 16, padding: 20,
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <r.icon size={22} color="#D4A853" />
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{r.title}</h4>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
