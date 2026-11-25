'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HardHat, Lock, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        window.location.href = '/admin/dashboard'
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-2xl p-8 relative"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center mx-auto mb-4">
            <HardHat className="w-9 h-9 text-black" />
          </div>
          <h1 className="text-2xl font-bold font-display text-white">Admin Login</h1>
          <p className="text-white/40 text-sm mt-1">Lakpal Construction Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                required
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl input-dark"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl input-dark"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Logging in...</> : 'Login to Dashboard'}
          </button>
        </form>
        <p className="text-white/25 text-xs text-center mt-6">
          Protected area. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  )
}
