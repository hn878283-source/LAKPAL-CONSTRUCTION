'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'
import InquiryModal from '@/components/shared/InquiryModal'

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !sceneRef.current) return

    const mount = sceneRef.current
    let animFrameId: number
    let cleanupFn: (() => void) | null = null

    // Dynamically load Three.js scene only on client
    import('@/components/3d/BuildingScene').then((mod) => {
      // BuildingScene is a React component — render it via its own canvas logic
      // We'll just signal it's ready; actual rendering happens inside BuildingScene
      cleanupFn = null
    }).catch(() => {
      // silently fail — fallback shown below
    })

    return () => {
      if (cleanupFn) cleanupFn()
    }
  }, [mounted])

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>

      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#08090B',
      }}>
        {/* Backgrounds */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#08090B 0%,#111318 50%,#08090B 100%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(to left,rgba(212,168,83,0.05),transparent)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 384, height: 384, background: 'rgba(212,168,83,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '100px 24px 80px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

            {/* ── LEFT: Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,168,83,0.1)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 999, padding: '8px 18px', marginBottom: 24 }}>
                <span style={{ width: 8, height: 8, background: '#D4A853', borderRadius: '50%', display: 'inline-block' }} />
                <span style={{ color: '#D4A853', fontSize: 13, fontWeight: 500 }}>Premium Construction Services</span>
              </div>

              {/* Heading */}
              <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 20, fontFamily: 'Georgia, serif' }}>
                Building Your{' '}
                <span style={{ display: 'block', background: 'linear-gradient(135deg,#D4A853,#E8C57A,#B8902A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dreams,</span>
                Creating Your{' '}
                <span style={{ display: 'block', background: 'linear-gradient(135deg,#D4A853,#E8C57A,#B8902A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Future.</span>
              </h1>

              {/* Subtitle */}
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
                Lakpal Construction delivers premium residential and commercial construction services with unmatched quality, transparency, and on-time delivery.
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-gold"
                  style={{ padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
                >
                  Start Your Project <ArrowRight size={18} />
                </button>
                <a
                  href="#services"
                  className="btn-outline-gold"
                  style={{ padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
                >
                  <Play size={16} /> Explore Services
                </a>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {[
                  { value: '500+', label: 'Projects Done' },
                  { value: '10+',  label: 'Years Experience' },
                  { value: '100%', label: 'Client Satisfaction' },
                ].map(s => (
                  <div key={s.label}>
                    <p style={{ fontSize: 26, fontWeight: 700, color: '#D4A853', fontFamily: 'Georgia, serif' }}>{s.value}</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: 3D Scene ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: 520, position: 'relative' }}
            >
              {mounted ? (
                <ThreeScene />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 56, height: 56, border: '3px solid rgba(212,168,83,0.25)', borderTopColor: '#D4A853', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                </div>
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(212,168,83,0.03)', borderRadius: 24, filter: 'blur(40px)', zIndex: -1, pointerEvents: 'none' }} />
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10, pointerEvents: 'none' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={18} style={{ color: 'rgba(212,168,83,0.5)' }} />
        </motion.div>
      </section>

      <InquiryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

// Pure Three.js scene — no React Three Fiber
function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let THREE: typeof import('three')
    let frameId: number
    let renderer: import('three').WebGLRenderer

    import('three').then((mod) => {
      THREE = mod

      const scene = new THREE.Scene()
      const width = mount.clientWidth || 500
      const height = mount.clientHeight || 520

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
      camera.position.set(6, 3, 6)
      camera.lookAt(0, 0, 0)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      mount.appendChild(renderer.domElement)

      // Materials
      const goldMat  = new THREE.MeshStandardMaterial({ color: '#D4A853', metalness: 0.8, roughness: 0.2 })
      const glassMat = new THREE.MeshStandardMaterial({ color: '#88BBDD', metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.6 })
      const concrMat = new THREE.MeshStandardMaterial({ color: '#2a2d35', metalness: 0.1, roughness: 0.8 })
      const darkMat  = new THREE.MeshStandardMaterial({ color: '#1a1d24', metalness: 0.2, roughness: 0.6 })

      const building = new THREE.Group()

      function add(geo: import('three').BufferGeometry, mat: import('three').Material, x: number, y: number, z: number) {
        const m = new THREE.Mesh(geo, mat)
        m.position.set(x, y, z)
        m.castShadow = true
        m.receiveShadow = true
        building.add(m)
        return m
      }

      add(new THREE.BoxGeometry(2, 6, 2), concrMat, 0, 1, 0)
      add(new THREE.ConeGeometry(1.2, 1.5, 4), goldMat, 0, 4.5, 0)
      add(new THREE.BoxGeometry(1.6, 5.4, 0.05), glassMat, 0, 1, 1.01)
      add(new THREE.BoxGeometry(1.6, 5.4, 0.05), glassMat, 0, 1, -1.01)
      add(new THREE.BoxGeometry(0.05, 5.4, 1.6), glassMat, 1.01, 1, 0)
      add(new THREE.BoxGeometry(0.05, 5.4, 1.6), glassMat, -1.01, 1, 0)
      ;[-1, 0, 1, 2].forEach(y => add(new THREE.BoxGeometry(2.1, 0.08, 2.1), goldMat, 0, y * 1.4, 0))
      add(new THREE.BoxGeometry(2, 2.5, 1.5), darkMat, -2.2, -1, 0)
      add(new THREE.BoxGeometry(2, 2.5, 1.5), darkMat, 2.2, -1, 0)
      add(new THREE.BoxGeometry(2.1, 0.08, 1.6), goldMat, -2.2, 0, 0)
      add(new THREE.BoxGeometry(2.1, 0.08, 1.6), goldMat, 2.2, 0, 0)
      add(new THREE.BoxGeometry(7, 0.3, 4), concrMat, 0, -2.8, 0)
      ;[-0.6, 0.6].forEach(x => add(new THREE.CylinderGeometry(0.08, 0.1, 2.5, 8), goldMat, x, -0.5, 1.2))
      add(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 6), goldMat, 0, 5.5, 0)
      add(new THREE.SphereGeometry(0.08, 8, 8), goldMat, 0, 6.3, 0)

      scene.add(building)

      // Particles
      const count = 80
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 15
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const pMat = new THREE.PointsMaterial({ size: 0.06, color: '#D4A853', transparent: true, opacity: 0.5 })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.4))
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
      dirLight.position.set(5, 10, 5)
      dirLight.castShadow = true
      scene.add(dirLight)
      const goldLight = new THREE.PointLight(0xD4A853, 0.8)
      goldLight.position.set(-3, 3, -3)
      scene.add(goldLight)
      const blueLight = new THREE.PointLight(0x4488BB, 0.5)
      blueLight.position.set(3, -1, 3)
      scene.add(blueLight)

      // Mouse drag
      let isDragging = false
      let prevX = 0
      let autoRotateY = 0

      const onMouseDown = (e: MouseEvent) => { isDragging = true; prevX = e.clientX }
      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        autoRotateY += (e.clientX - prevX) * 0.01
        prevX = e.clientX
      }
      const onMouseUp = () => { isDragging = false }
      mount.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)

      const clock = new THREE.Clock()
      const animate = () => {
        frameId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()
        if (!isDragging) autoRotateY += 0.004
        building.rotation.y = autoRotateY
        building.position.y = Math.sin(t * 0.8) * 0.15
        particles.rotation.y = t * 0.03
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      // Store cleanup
      ;(mount as any)._cleanup = () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('resize', onResize)
        mount.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement)
        }
      }
    }).catch(() => {
      // Three.js failed to load — show fallback
    })

    return () => {
      if ((mount as any)._cleanup) {
        (mount as any)._cleanup()
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', cursor: 'grab' }}
    />
  )
}
