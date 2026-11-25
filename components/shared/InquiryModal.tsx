'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  fullName: string; phone: string; email: string; serviceType: string
  projectType: string; location: string; area: string; budget: string
  description: string; floors: string; plotSize: string; startDate: string
}

const initForm: FormData = {
  fullName: '', phone: '', email: '', serviceType: '', projectType: '',
  location: '', area: '', budget: '', description: '', floors: '', plotSize: '', startDate: '',
}

const serviceOptions = ['New House Construction','Residential Building Construction','Commercial Construction','Office Construction','Shop Construction','Home Renovation','Interior Design','Other']
const budgetOptions  = ['Below ₹5 Lakh','₹5–10 Lakh','₹10–20 Lakh','₹20–50 Lakh','₹50 Lakh–₹1 Crore','Above ₹1 Crore','Not Decided Yet']

// Shared input style
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 14,
  background: 'rgba(17,19,24,0.9)', border: '1px solid rgba(212,168,83,0.3)',
  color: '#fff', outline: 'none', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6, fontWeight: 500 }
const errorStyle: React.CSSProperties = { color: '#f87171', fontSize: 12, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [form, setForm] = useState<FormData>(initForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [orderId, setOrderId] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k: keyof FormData, v: string) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: '' }))
  }

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = 'Enter valid 10-digit Indian mobile number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter valid email'
    if (!form.serviceType) e.serviceType = 'Please select a service'
    if (!form.location.trim()) e.location = 'Project location is required'
    if (!form.budget) e.budget = 'Please select a budget range'
    if (!form.description.trim()) e.description = 'Project description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) { setOrderId(data.orderId); setStatus('success'); setForm(initForm) }
      else { setErrorMsg(data.message || 'Submission failed.'); setStatus('error') }
    } catch { setErrorMsg('Network error. Please try again.'); setStatus('error') }
  }

  const handleClose = () => { setStatus('idle'); setErrors({}); setErrorMsg(''); onClose() }

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              position: 'relative', width: '100%', maxWidth: 640,
              maxHeight: '90vh', overflowY: 'auto',
              background: '#111318', border: '1px solid rgba(212,168,83,0.25)',
              borderRadius: 20,
            }}
          >
            {/* Header */}
            <div style={{
              position: 'sticky', top: 0, background: '#111318',
              borderBottom: '1px solid rgba(212,168,83,0.15)',
              padding: '18px 24px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', borderRadius: '20px 20px 0 0', zIndex: 1,
            }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif' }}>Get a Free Quote</h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Fill the form, we will contact you soon</p>
              </div>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24 }}>
              {/* Success */}
              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '32px 0' }}>
                  <CheckCircle size={64} color="#4ade80" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Inquiry Submitted!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 20, lineHeight: 1.6 }}>
                    Thank You! Your construction inquiry has been submitted successfully.<br />Our team will contact you soon.
                  </p>
                  <div style={{ background: 'rgba(212,168,83,0.08)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 14, padding: '16px 24px', marginBottom: 24 }}>
                    <p style={{ color: 'rgba(212,168,83,0.6)', fontSize: 13, marginBottom: 6 }}>Your Order ID</p>
                    <p style={{ color: '#D4A853', fontSize: 24, fontWeight: 700, fontFamily: 'Georgia, serif' }}>{orderId}</p>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>Save this for future reference</p>
                  </div>
                  <button onClick={handleClose} className="btn-gold" style={{ padding: '12px 32px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: 15 }}>
                    Close
                  </button>
                </motion.div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {status === 'error' && (
                    <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10 }}>
                      <AlertCircle size={18} color="#f87171" style={{ flexShrink: 0, marginTop: 1 }} />
                      <p style={{ color: '#f87171', fontSize: 14 }}>{errorMsg}</p>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Full Name <span style={{ color: '#D4A853' }}>*</span></label>
                      <input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Rahul Kumar" style={{ ...inputStyle, borderColor: errors.fullName ? '#f87171' : 'rgba(212,168,83,0.3)' }} />
                      {errors.fullName && <p style={errorStyle}><AlertCircle size={12} />{errors.fullName}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Mobile Number <span style={{ color: '#D4A853' }}>*</span></label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9876543210" style={{ ...inputStyle, borderColor: errors.phone ? '#f87171' : 'rgba(212,168,83,0.3)' }} />
                      {errors.phone && <p style={errorStyle}><AlertCircle size={12} />{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" style={{ ...inputStyle, borderColor: errors.email ? '#f87171' : 'rgba(212,168,83,0.3)' }} />
                    {errors.email && <p style={errorStyle}><AlertCircle size={12} />{errors.email}</p>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Service Type <span style={{ color: '#D4A853' }}>*</span></label>
                      <select value={form.serviceType} onChange={e => set('serviceType', e.target.value)}
                        style={{ ...inputStyle, borderColor: errors.serviceType ? '#f87171' : 'rgba(212,168,83,0.3)', cursor: 'pointer' }}>
                        <option value="">Select Service</option>
                        {serviceOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {errors.serviceType && <p style={errorStyle}><AlertCircle size={12} />{errors.serviceType}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Project Location <span style={{ color: '#D4A853' }}>*</span></label>
                      <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Delhi, Noida, etc." style={{ ...inputStyle, borderColor: errors.location ? '#f87171' : 'rgba(212,168,83,0.3)' }} />
                      {errors.location && <p style={errorStyle}><AlertCircle size={12} />{errors.location}</p>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Project Type</label>
                      <input value={form.projectType} onChange={e => set('projectType', e.target.value)} placeholder="e.g. 3BHK House" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Construction Area (sq.ft)</label>
                      <input value={form.area} onChange={e => set('area', e.target.value)} placeholder="e.g. 1500" style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Estimated Budget <span style={{ color: '#D4A853' }}>*</span></label>
                    <select value={form.budget} onChange={e => set('budget', e.target.value)}
                      style={{ ...inputStyle, borderColor: errors.budget ? '#f87171' : 'rgba(212,168,83,0.3)', cursor: 'pointer' }}>
                      <option value="">Select Budget Range</option>
                      {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {errors.budget && <p style={errorStyle}><AlertCircle size={12} />{errors.budget}</p>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Number of Floors</label>
                      <input value={form.floors} onChange={e => set('floors', e.target.value)} placeholder="e.g. 2" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Preferred Start Date</label>
                      <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Project Description <span style={{ color: '#D4A853' }}>*</span></label>
                    <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)}
                      placeholder="Describe your construction requirements in detail..."
                      style={{ ...inputStyle, resize: 'none', borderColor: errors.description ? '#f87171' : 'rgba(212,168,83,0.3)' }} />
                    {errors.description && <p style={errorStyle}><AlertCircle size={12} />{errors.description}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-gold"
                    style={{ width: '100%', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'loading' ? 0.7 : 1 }}
                  >
                    {status === 'loading' ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />Submitting...</> : 'Submit Inquiry'}
                  </button>

                  <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
                    By submitting, you agree to be contacted by our team.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
