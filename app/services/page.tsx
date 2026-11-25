'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, Hammer, Palette, PenTool, HardHat, Check, ArrowRight } from 'lucide-react'
import Footer from '@/components/shared/Footer'
import InquiryModal from '@/components/shared/InquiryModal'

const services = [
  { icon: Home,      title: 'Residential Construction', desc: 'From budget-friendly homes to luxury villas, we build residential spaces perfectly matching your lifestyle.', features: ['Custom floor plans','3D visualization','Premium materials','Vastu compliance','Turnkey delivery'], benefits: ['Lifetime structural warranty','Post-completion support','Quality material guarantee'] },
  { icon: Building2, title: 'Commercial Construction',  desc: 'Professional commercial spaces designed for functionality, aesthetics, and business success.', features: ['Modern designs','Smart infrastructure','Energy efficient','Fire safety compliance','Parking solutions'], benefits: ['On-time delivery','Cost optimization','Modern amenities'] },
  { icon: Hammer,    title: 'Home Renovation',          desc: 'Transform your existing home with expert renovation services. Kitchen, bathroom, full house makeovers.', features: ['Minimal disruption','Modern upgrades','Structural repairs','Plumbing & electrical','Painting & flooring'], benefits: ['Quick turnaround','Dust-free work','Fixed price guarantee'] },
  { icon: Palette,   title: 'Interior & Exterior Design',desc: 'Beautiful, functional spaces designed by experts. From minimalist modern to traditional Indian styles.', features: ['3D design preview','Modular furniture','False ceilings','Custom lighting','Smart home integration'], benefits: ['Personal designer assigned','Material selection help','Budget management'] },
  { icon: PenTool,   title: 'Architectural Planning',   desc: 'Expert architectural designs balancing aesthetics, functionality, and compliance.', features: ['Site analysis','Concept design','Structural drawings','MEP planning','Approval assistance'], benefits: ['RERA compliant designs','Municipal approval support','BIM modeling available'] },
  { icon: HardHat,   title: 'Civil & Structural Work',  desc: 'Robust civil and structural engineering solutions ensuring safety, stability, and longevity.', features: ['Foundation work','RCC structures','Waterproofing','Retaining walls','Site development'], benefits: ['IS code compliance','Soil testing','Load calculation'] },
]

const card: React.CSSProperties = { background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 20, padding: 28 }

export default function ServicesPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div style={{ minHeight: '100vh', background: '#08090B', paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: '80px 0', background: '#111318', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(212,168,83,0.05), transparent)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
            <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>What We Offer</span>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', margin: '12px 0 16px', fontFamily: 'Georgia, serif' }}>Our Services</h1>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, margin: '0 auto 20px' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              Comprehensive construction services from planning to handover. Every project backed by our quality guarantee.
            </p>
          </div>
        </section>

        {/* Services */}
        <section style={{ padding: '64px 0', background: '#08090B' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(500px,1fr))', gap: 24 }}>
              {services.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 20, padding: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon size={28} color="#D4A853" />
                    </div>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h2>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div>
                      <p style={{ color: '#D4A853', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Features</p>
                      {s.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                          <Check size={13} color="#D4A853" />
                          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{ color: '#D4A853', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Benefits</p>
                      {s.benefits.map(b => (
                        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                          <Check size={13} color="#4ade80" />
                          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setShowModal(true)}
                    className="btn-gold"
                    style={{ width: '100%', padding: '12px', borderRadius: 12, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    Request a Quote <ArrowRight size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <InquiryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
