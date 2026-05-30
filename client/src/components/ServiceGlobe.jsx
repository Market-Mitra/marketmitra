import { useEffect, useRef } from "react"
import * as THREE from "three"

const SERVICES = [
  {
    label: "Web Dev",
    color: "#1D9E75",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
  {
    label: "Branding",
    color: "#F5A623",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  },
  {
    label: "Meta Ads",
    color: "#F5A623",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  },
  {
    label: "AI",
    color: "#1D9E75",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="12" y1="16" x2="12" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>`,
  },
  {
    label: "SEO",
    color: "#F4F3EF",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F4F3EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  },
  {
    label: "Backend",
    color: "#1D9E75",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/><line x1="6" y1="5" x2="6.01" y2="5"/><line x1="6" y1="12" x2="6.01" y2="12"/><line x1="6" y1="19" x2="6.01" y2="19"/></svg>`,
  },
  {
    label: "Social",
    color: "#F5A623",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/><path d="M7 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/><path d="M17 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  },
  {
    label: "Database",
    color: "#F4F3EF",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F4F3EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  },
  {
    label: "Perf Mktg",
    color: "#F5A623",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  },
  {
    label: "Strategy",
    color: "#1D9E75",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
  {
    label: "Analytics",
    color: "#F4F3EF",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F4F3EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  },
  {
    label: "IT Consult",
    color: "#1D9E75",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  },
]

function makeTexture(label, color, svgString) {
  const size = 128
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")

  // Circular background with subtle glow
  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
  gradient.addColorStop(0, color + "33")
  gradient.addColorStop(1, color + "00")
  ctx.beginPath()
  ctx.arc(size/2, size/2, size/2 - 2, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()

  // Soft border
  ctx.beginPath()
  ctx.arc(size/2, size/2, size/2 - 3, 0, Math.PI * 2)
  ctx.strokeStyle = color + "66"
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Draw SVG via Image
  return new Promise((resolve) => {
    const img = new Image()
    const blob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      const iconSize = size * 0.5
      const offset = (size - iconSize) / 2 - 4
      ctx.drawImage(img, offset, offset, iconSize, iconSize)
      URL.revokeObjectURL(url)

      // Label
      ctx.fillStyle = color + "cc"
      ctx.font = `600 10px Inter, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "alphabetic"
      ctx.fillText(label, size / 2, size - 6)

      resolve(new THREE.CanvasTexture(canvas))
    }
    img.onerror = () => {
      resolve(new THREE.CanvasTexture(canvas))
    }
    img.src = url
  })
}

export default function ServiceGlobe() {
  const mountRef = useRef(null)
  const stateRef = useRef({ isDragging: false, prevX: 0, prevY: 0 })
  const sceneRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return
    const SIZE = 480

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(SIZE, SIZE)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 5.5)

    const group = new THREE.Group()
    scene.add(group)

    // No wireframe, no rings — just pure floating icons
    const R = 2.0
    const sprites = []

    // Build all textures async then add sprites
    Promise.all(
      SERVICES.map((svc, i) => makeTexture(svc.label, svc.color, svc.svg).then(tex => ({ tex, i })))
    ).then(results => {
      results.forEach(({ tex, i }) => {
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
          sizeAttenuation: true,
        })
        const sprite = new THREE.Sprite(mat)

        // Fibonacci sphere distribution
        const phi   = Math.acos(-1 + (2 * i) / SERVICES.length)
        const theta = Math.sqrt(SERVICES.length * Math.PI) * phi
        const x = R * Math.sin(phi) * Math.cos(theta)
        const y = R * Math.sin(phi) * Math.sin(theta)
        const z = R * Math.cos(phi)

        sprite.position.set(x, y, z)
        sprite.scale.set(0.6, 0.6, 1)
        group.add(sprite)
        sprites.push({ sprite })
      })

      sceneRef.current = { renderer, scene, camera, group, sprites, raf: 0 }

      const animate = () => {
        if (!sceneRef.current) return
        sceneRef.current.raf = requestAnimationFrame(animate)
        const s = stateRef.current
        const t = Date.now() * 0.001

        if (!s.isDragging) {
          group.rotation.y += 0.003
          group.rotation.x = Math.sin(t * 0.18) * 0.06
        }

        // Depth-based opacity + scale
        sprites.forEach(({ sprite }) => {
          const worldPos = new THREE.Vector3()
          sprite.getWorldPosition(worldPos)
          const camDir = camera.position.clone().normalize()
          const dot = worldPos.clone().normalize().dot(camDir)
          const norm = (dot + 1) / 2
          sprite.material.opacity = 0.15 + norm * 0.85
          const sc = 0.38 + norm * 0.28
          sprite.scale.set(sc, sc, 1)
        })

        renderer.render(scene, camera)
      }
      animate()
    })

    // Drag
    const el = renderer.domElement
    const onDown = (e) => { stateRef.current.isDragging = true; stateRef.current.prevX = e.clientX; stateRef.current.prevY = e.clientY }
    const onUp   = () => { stateRef.current.isDragging = false }
    const onMove = (e) => {
      if (!stateRef.current.isDragging) return
      const dx = e.clientX - stateRef.current.prevX
      const dy = e.clientY - stateRef.current.prevY
      if (sceneRef.current) {
        sceneRef.current.group.rotation.y += dx * 0.007
        sceneRef.current.group.rotation.x += dy * 0.005
      }
      stateRef.current.prevX = e.clientX
      stateRef.current.prevY = e.clientY
    }
    el.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)
    document.addEventListener("mousemove", onMove)

    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.raf)
        sceneRef.current = null
      }
      el.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
      document.removeEventListener("mousemove", onMove)
      renderer.dispose()
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ cursor: "grab", width: 480, height: 480 }}
      className="select-none"
    />
  )
}