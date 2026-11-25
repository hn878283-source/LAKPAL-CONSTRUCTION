import { Metadata } from 'next'
import Footer from '@/components/shared/Footer'
import { Target, Eye, Heart, Award, Users, HardHat } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us – Lakpal Construction',
  description: 'Learn about Lakpal Construction – our story, vision, mission, and commitment to quality construction.',
}

const values = [
  { icon: Award,   title: 'Excellence', desc: 'We set the highest standards in every project we undertake.' },
  { icon: Heart,   title: 'Integrity',  desc: 'Honest pricing, transparent communication, ethical practices.' },
  { icon: Users,   title: 'Teamwork',   desc: 'Skilled professionals working together for outstanding results.' },
  { icon: HardHat, title: 'Safety',     desc: 'Strict safety protocols on every construction site, no compromise.' },
]
const team = [
  { name: '[Team Member Name]', role: 'Founder & CEO',       exp: '[X]+ Years Experience' },
  { name: '[Team Member Name]', role: 'Chief Architect',     exp: '[X]+ Years Experience' },
  { name: '[Team Member Name]', role: 'Project Manager',     exp: '[X]+ Years Experience' },
  { name: '[Team Member Name]', role: 'Structural Engineer', exp: '[X]+ Years Experience' },
]

const card: React.CSSProperties = { background: 'rgba(17,19,24,0.75)', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 20, padding: 28 }

export default function AboutPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', background: '#08090B', paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: '80px 0', background: '#111318', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(212,168,83,0.05), transparent)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
            <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Who We Are</span>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', margin: '12px 0 20px', fontFamily: 'Georgia, serif', lineHeight: 1.3 }}>About Lakpal Construction</h1>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, marginBottom: 20 }} />
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 680 }}>
              Lakpal Construction is a premium construction company dedicated to turning your dreams into reality. With a decade of expertise, we have delivered hundreds of residential and commercial projects with precision, quality, and integrity.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section style={{ padding: '80px 0', background: '#08090B' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24, marginBottom: 64 }}>
              <div style={{ ...card, borderLeft: '4px solid #D4A853' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Target size={24} color="#D4A853" />
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif' }}>Our Mission</h2>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  To deliver high-quality, affordable construction services that exceed client expectations — using the best materials, modern techniques, and a passionate team.
                </p>
              </div>
              <div style={{ ...card, borderLeft: '4px solid #D4A853' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Eye size={24} color="#D4A853" />
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif' }}>Our Vision</h2>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  To become the most trusted construction partner in India, known for quality craftsmanship, transparent business practices, and creating spaces that endure for generations.
                </p>
              </div>
            </div>

            {/* Values */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Our Foundation</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#fff', margin: '12px 0 16px', fontFamily: 'Georgia, serif' }}>Core Values</h2>
              <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, margin: '0 auto' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginBottom: 64 }}>
              {values.map(v => (
                <div key={v.title} style={{ ...card, textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <v.icon size={28} color="#D4A853" />
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Team */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Our People</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#fff', margin: '12px 0 12px', fontFamily: 'Georgia, serif' }}>Meet Our Team</h2>
              <div style={{ width: 60, height: 3, background: 'linear-gradient(135deg,#D4A853,#E8C57A)', borderRadius: 2, margin: '0 auto 12px' }} />
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontStyle: 'italic' }}>* Team details will be updated with actual member information</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
              {team.map((m, i) => (
                <div key={i} style={{ ...card, textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(212,168,83,0.1)', border: '2px solid rgba(212,168,83,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24, fontWeight: 700, color: '#D4A853' }}>T</div>
                  <h3 style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ color: '#D4A853', fontSize: 14, marginBottom: 4 }}>{m.role}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{m.exp}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
