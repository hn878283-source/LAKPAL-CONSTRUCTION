'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, LogOut, RefreshCw, Users, FileText, Clock, CheckCircle, HardHat } from 'lucide-react'

interface Inquiry {
  orderId: string
  submittedAt: string
  fullName: string
  phone: string
  email: string
  serviceType: string
  projectType: string
  location: string
  area: string
  budget: string
  floors: string
  startDate: string
  description: string
  status: string
}

const statusColors: Record<string, string> = {
  New: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Quotation Sent': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'In Progress': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  Cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const statusOptions = ['New', 'Contacted', 'Quotation Sent', 'In Progress', 'Completed', 'Cancelled']

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filtered, setFiltered] = useState<Inquiry[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/inquiries')
      if (res.status === 401) { window.location.href = '/admin'; return }
      const data = await res.json()
      if (data.success) { setInquiries(data.inquiries); setFiltered(data.inquiries) }
      else setError('Failed to load inquiries')
    } catch { setError('Network error') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  useEffect(() => {
    let list = inquiries
    if (search) list = list.filter(i =>
      i.fullName.toLowerCase().includes(search.toLowerCase()) ||
      i.phone.includes(search) ||
      i.orderId.toLowerCase().includes(search.toLowerCase())
    )
    if (statusFilter !== 'All') list = list.filter(i => i.status === statusFilter)
    setFiltered(list)
  }, [search, statusFilter, inquiries])

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      })
      setInquiries(p => p.map(i => i.orderId === orderId ? { ...i, status: newStatus } : i))
      if (selected?.orderId === orderId) setSelected(p => p ? { ...p, status: newStatus } : null)
    } catch { alert('Failed to update status') }
  }

  const exportCSV = () => {
    const headers = ['Order ID', 'Date', 'Name', 'Phone', 'Email', 'Service', 'Location', 'Budget', 'Status']
    const rows = filtered.map(i => [i.orderId, i.submittedAt, i.fullName, i.phone, i.email, i.serviceType, i.location, i.budget, i.status])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'lakpal-inquiries.csv'; a.click()
  }

  const logout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/admin' }

  const counts = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'New').length,
    inProgress: inquiries.filter(i => i.status === 'In Progress').length,
    completed: inquiries.filter(i => i.status === 'Completed').length,
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <div className="bg-charcoal border-b border-gold/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
            <HardHat className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-white font-bold">Lakpal Construction</h1>
            <p className="text-white/40 text-xs">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchData} className="p-2 text-white/50 hover:text-gold transition-colors" title="Refresh">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={logout} className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors text-sm">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: FileText, label: 'Total Inquiries', value: counts.total, color: 'text-blue-400' },
            { icon: Clock, label: 'New Inquiries', value: counts.new, color: 'text-gold' },
            { icon: RefreshCw, label: 'In Progress', value: counts.inProgress, color: 'text-orange-400' },
            { icon: CheckCircle, label: 'Completed', value: counts.completed, color: 'text-green-400' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <p className="text-white/50 text-sm">{s.label}</p>
              </div>
              <p className="text-3xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, order ID..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl input-dark text-sm" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl input-dark text-sm appearance-none cursor-pointer">
              <option value="All">All Status</option>
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 btn-outline-gold px-5 py-2.5 rounded-xl text-sm font-medium">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40">No inquiries found</p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/10">
                    {['Order ID', 'Date', 'Customer', 'Phone', 'Service', 'Location', 'Budget', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3.5 text-white/40 font-medium text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq, i) => (
                    <motion.tr
                      key={inq.orderId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                      onClick={() => setSelected(inq)}
                    >
                      <td className="px-4 py-3 text-gold font-mono text-xs">{inq.orderId}</td>
                      <td className="px-4 py-3 text-white/50 whitespace-nowrap">{inq.submittedAt?.split(',')[0] || '-'}</td>
                      <td className="px-4 py-3 text-white font-medium">{inq.fullName}</td>
                      <td className="px-4 py-3 text-white/70">{inq.phone}</td>
                      <td className="px-4 py-3 text-white/70 max-w-32 truncate">{inq.serviceType}</td>
                      <td className="px-4 py-3 text-white/70">{inq.location}</td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap">{inq.budget}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[inq.status] || statusColors.New}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <select value={inq.status} onChange={e => updateStatus(inq.orderId, e.target.value)}
                          className="bg-white/5 border border-white/10 text-white/70 text-xs px-2 py-1.5 rounded-lg cursor-pointer">
                          {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gold/20 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white">{selected.fullName}</h2>
                <p className="text-gold font-mono text-sm">{selected.orderId}</p>
              </div>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${statusColors[selected.status] || statusColors.New}`}>
                {selected.status}
              </span>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                ['Phone', selected.phone],
                ['Email', selected.email || '—'],
                ['Service', selected.serviceType],
                ['Location', selected.location],
                ['Budget', selected.budget],
                ['Area', selected.area || '—'],
                ['Floors', selected.floors || '—'],
                ['Start Date', selected.startDate || '—'],
                ['Project Type', selected.projectType || '—'],
                ['Submitted', selected.submittedAt],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-white/40 text-xs mb-0.5">{label}</p>
                  <p className="text-white text-sm">{value}</p>
                </div>
              ))}
              <div className="col-span-2">
                <p className="text-white/40 text-xs mb-0.5">Description</p>
                <p className="text-white/80 text-sm leading-relaxed">{selected.description}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gold/20">
              <p className="text-white/40 text-xs mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map(s => (
                  <button key={s} onClick={() => updateStatus(selected.orderId, s)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selected.status === s ? 'bg-gold text-black border-gold' : 'border-white/20 text-white/60 hover:border-gold/50'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
