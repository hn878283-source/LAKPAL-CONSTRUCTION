'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BuildingScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene setup ──
    const scene = new THREE.Scene()
    const width = mount.clientWidth
    const height = mount.clientHeight

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(6, 3, 6)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    // ── Materials ──
    const goldMat   = new THREE.MeshStandardMaterial({ color: '#D4A853', metalness: 0.8, roughness: 0.2 })
    const glassMat  = new THREE.MeshStandardMaterial({ color: '#88BBDD', metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.6 })
    const concrMat  = new THREE.MeshStandardMaterial({ color: '#2a2d35', metalness: 0.1, roughness: 0.8 })
    const darkMat   = new THREE.MeshStandardMaterial({ color: '#1a1d24', metalness: 0.2, roughness: 0.6 })

    const building = new THREE.Group()

    // Helper to add a mesh
    function add(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number) {
      const m = new THREE.Mesh(geo, mat)
      m.position.set(x, y, z)
      m.castShadow = true
      m.receiveShadow = true
      building.add(m)
      return m
    }

    // Main tower
    add(new THREE.BoxGeometry(2, 6, 2),   concrMat, 0, 1,   0)
    // Top cone
    add(new THREE.ConeGeometry(1.2, 1.5, 4), goldMat, 0, 4.5, 0)
    // Glass panels
    add(new THREE.BoxGeometry(1.6, 5.4, 0.05), glassMat,  0,    1,  1.01)
    add(new THREE.BoxGeometry(1.6, 5.4, 0.05), glassMat,  0,    1, -1.01)
    add(new THREE.BoxGeometry(0.05, 5.4, 1.6), glassMat,  1.01, 1,  0)
    add(new THREE.BoxGeometry(0.05, 5.4, 1.6), glassMat, -1.01, 1,  0)
    // Gold floor trims
    ;[-1, 0, 1, 2].forEach(y => add(new THREE.BoxGeometry(2.1, 0.08, 2.1), goldMat, 0, y * 1.4, 0))
    // Side wings
    add(new THREE.BoxGeometry(2, 2.5, 1.5), darkMat, -2.2, -1, 0)
    add(new THREE.BoxGeometry(2, 2.5, 1.5), darkMat,  2.2, -1, 0)
    // Wing roofs
    add(new THREE.BoxGeometry(2.1, 0.08, 1.6), goldMat, -2.2, 0, 0)
    add(new THREE.BoxGeometry(2.1, 0.08, 1.6), goldMat,  2.2, 0, 0)
    // Base
    add(new THREE.BoxGeometry(7, 0.3, 4), concrMat, 0, -2.8, 0)
    // Pillars
    ;[-0.6, 0.6].forEach(x => add(new THREE.CylinderGeometry(0.08, 0.1, 2.5, 8), goldMat, x, -0.5, 1.2))
    // Antenna
    add(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 6), goldMat, 0, 5.5, 0)
    add(new THREE.SphereGeometry(0.08, 8, 8),            goldMat, 0, 6.3, 0)

    scene.add(building)

    // ── Particles ──
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

    // ── Lights ──
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

    // ── Mouse drag / auto-rotate ──
    let isDragging = false
    let prevX = 0
    let autoRotateY = 0

    const onMouseDown = (e: MouseEvent) => { isDragging = true; prevX = e.clientX }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const delta = e.clientX - prevX
      autoRotateY += delta * 0.01
      prevX = e.clientX
    }
    const onMouseUp = () => { isDragging = false }
    mount.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // ── Animation ──
    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Auto rotate
      if (!isDragging) autoRotateY += 0.004
      building.rotation.y = autoRotateY
      // Float
      building.position.y = Math.sin(t * 0.8) * 0.15

      particles.rotation.y = t * 0.03

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize ──
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ──
    return () => {
      frameId && cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', cursor: 'grab', pointerEvents: 'auto' }}
    />
  )
}
