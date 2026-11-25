'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import InquiryModal from './InquiryModal'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(8,9,11,0.97)' : 'rgba(8,9,11,0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(212,168,83,0.15)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image
                src="/logo.png"
                alt="Lakpal Consultants Logo"
                width={130}
                height={60}
                style={{ objectFit: 'contain', height: 60, width: 'auto' }}
                priority
              />
            </Link>

            {/* Desktop Nav links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: pathname === link.href ? '#D4A853' : 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    position: 'relative',
                    padding: '4px 0',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span style={{
                      position: 'absolute', bottom: -2, left: 0, right: 0,
                      height: 2, background: '#D4A853', borderRadius: 2,
                    }} />
                  )}
                </Link>
              ))}
              <button
                onClick={() => setShowModal(true)}
                className="btn-gold"
                style={{
                  padding: '10px 22px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: '#111318',
                borderTop: '1px solid rgba(212,168,83,0.2)',
                overflow: 'hidden',
              }}
              className="md:hidden"
            >
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 0',
                      fontSize: 16,
                      fontWeight: 500,
                      color: pathname === link.href ? '#D4A853' : 'rgba(255,255,255,0.8)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => { setShowModal(true); setIsOpen(false) }}
                  className="btn-gold"
                  style={{
                    width: '100%', marginTop: 12,
                    padding: '14px', borderRadius: 10,
                    fontSize: 15, fontWeight: 600,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Get a Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <InquiryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
