'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight, Building2, Home } from 'lucide-react'
import Footer from '@/components/shared/Footer'

const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Interior']

const projects = [
  { id: 1, title: '[Project Name]', category: 'Residential', location: 'Delhi',    type: 'Luxury Villa',     desc: '4BHK luxury villa with modern amenities, landscaped garden, and smart home features.', area: '3200 sq.ft', status: 'Completed' },
  { id: 2, title: '[Project Name]', category: 'Commercial',  location: 'Noida',    type: 'Office Complex',   desc: 'G+5 commercial office building with modern interiors, ample parking, and 24/7 security.', area: '12000 sq.ft', status: 'Completed' },
  { id: 3, title: '[Project Name]', category: 'Residential', location: 'Gurgaon',  type: 'Apartment Block',  desc: 'Premium residential apartment complex with 24 units, rooftop garden, and clubhouse.', area: '28000 sq.ft', status: 'Completed' },
  { id: 4, title: '[Project Name]', category: 'Commercial',  location: 'Faridabad', type: 'Shopping Complex', desc: 'Modern shopping complex with 40+ retail shops, food court, and multiplex.', area: '35000 sq.ft', status: 'Completed' },
  { id: 5, title: '[Project Name]', category: 'Renovation',  location: 'Delhi',    type: 'Home Renovation',  desc: 'Complete renovation of a 25-year-old bungalow — structural repairs, modern interiors.', area: '2800 sq.ft', status: 'Completed' },
  { id: 6, title: '[Project Name]', category: 'Interior',    location: 'Noida',    type: 'Office Interior',  desc: 'Contemporary office interior design — open workspaces, meeting rooms, lounge.', area: '5000 sq.ft', status: 'Completed' },
]

const catColors: Record<string, string> = { Residential: '#3b82f6', Commercial: '#a855f7', Renovation: '#f97316', Interior: '#ec4899', All: '#D4A853' }

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const filtered = projects.filter(p => active === 'All' || p.category === active)

  return (
    <>
      <div style={{ minHeight: '100vh', background: '#08090B', paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: '80px 0', background: '#111318', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(212,168,83,0.05), transparent)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
            <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Our Portfolio</span>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', margin: '12px 0 16px', fontFamily: 'Georgia, serif' }}>Our Projects</h1>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, margin: '0 auto 16px' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto 12px', lineHeight: 1.7 }}>A showcase of our finest work across residential, commercial, and renovation projects.</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontStyle: 'italic' }}>* Sample demo projects — will be replaced with actual completed projects</p>
          </div>
        </section>

        {/* Filter */}
        <section style={{ padding: '32px 0', background: 'rgba(17,19,24,0.5)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  padding: '8px 20px', borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                  background: active === cat ? '#D4A853' : 'transparent',
                  color: active === cat ? '#08090B' : 'rgba(255,255,255,0.7)',
                  border: `1px solid ${active === cat ? '#D4A853' : 'rgba(212,168,83,0.3)'}`,
                }}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section style={{ padding: '48px 0', background: '#08090B' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 24 }}>
              <AnimatePresence>
                {filtered.map(p => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 20, overflow: 'hidden' }}>
                    {/* Image placeholder */}
                    <div style={{ height: 200, background: `linear-gradient(135deg, ${catColors[p.category]}22, rgba(17,19,24,0.9))`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {p.category === 'Commercial' ? <Building2 size={56} color="rgba(212,168,83,0.3)" /> : <Home size={56} color="rgba(212,168,83,0.3)" />}
                      <div style={{ position: 'absolute', top: 14, left: 14, background: '#D4A853', color: '#08090B', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>{p.category}</div>
                      <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>{p.status}</div>
                    </div>
                    <div style={{ padding: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 8 }}>
                        <MapPin size={12} /> {p.location} · {p.area}
                      </div>
                      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{p.title}</h3>
                      <p style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, marginBottom: 10 }}>{p.type}</p>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#D4A853', fontSize: 13, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        View Details <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
