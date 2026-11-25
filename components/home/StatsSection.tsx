'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Users, Calendar, Briefcase } from 'lucide-react'

const stats = [
  { icon: Trophy, value: 500, suffix: '+', label: 'Projects Completed' },
  { icon: Users,  value: 450, suffix: '+', label: 'Happy Clients' },
  { icon: Calendar, value: 10, suffix: '+', label: 'Years of Experience' },
  { icon: Briefcase, value: 50, suffix: '+', label: 'Professional Team' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (2000 / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsSection() {
  return (
    <section style={{ padding: '80px 0', background: '#111318', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(212,168,83,0.05), transparent, rgba(212,168,83,0.05))', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: 'rgba(212,168,83,0.1)',
                border: '1px solid rgba(212,168,83,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <stat.icon size={32} color="#D4A853" />
              </div>
              <div style={{ fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: 'Georgia, serif' }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 32 }}>
          * Figures are approximate and will be updated with actual company data
        </p>
      </div>
    </section>
  )
}
