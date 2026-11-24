import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { FLIPPED_COLOR, type LampColor } from '../lib/lamp'

type Props = {
  /** Glow colour while upright */
  color: LampColor
  /** Fires when the lamp crosses between upright and upside down */
  onFlipChange?: (upsideDown: boolean) => void
  /** Increment to trigger an animated 180° flip */
  flipTick?: number
  autoRotate?: boolean
  className?: string
  label?: string
}

const R = 0.55 // body radius
const GLASS_R = 0.52
const GLASS_H = 1.27
const SEG = 96

const glowVertex = /* glsl */ `
  varying float vY;
  void main() {
    vY = position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
// Pale at the top of the glass, deeper colour towards the bottom.
const glowFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uAlpha;
  uniform float uHeight;
  varying float vY;
  void main() {
    float t = clamp(vY / uHeight + 0.5, 0.0, 1.0);
    vec3 deep = uColor * 0.8;
    vec3 pale = mix(uColor, vec3(1.0), 0.5);
    vec3 c = mix(deep, pale, smoothstep(0.2, 1.0, t));
    gl_FragColor = vec4(c, uAlpha);
    #include <colorspace_fragment>
  }
`

const WHITE = new THREE.Color(1, 1, 1)

/** Procedural lamp that matches the reference renders. */
function buildLamp(current: THREE.Color) {
  const group = new THREE.Group()
  const geos: THREE.BufferGeometry[] = []
  const mats: THREE.Material[] = []

  const track = <T extends THREE.Material>(m: T) => { mats.push(m); return m }
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, y: number, rotX = 0) => {
    geos.push(geo)
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.y = y
    mesh.rotation.x = rotX
    group.add(mesh)
  }
  const cyl = (r: number, h: number, open = false) => new THREE.CylinderGeometry(r, r, h, SEG, 1, open)

  const body = track(new THREE.MeshStandardMaterial({ color: 0x1a1a1d, roughness: 0.4, metalness: 0.25 }))
  const lidMat = track(new THREE.MeshStandardMaterial({ color: 0x55565a, roughness: 0.5, metalness: 0.3 }))
  const glass = (alpha: number, side: THREE.Side, transparent: boolean) =>
    track(new THREE.ShaderMaterial({
      uniforms: { uColor: { value: current }, uAlpha: { value: alpha }, uHeight: { value: GLASS_H } },
      vertexShader: glowVertex, fragmentShader: glowFragment, side, transparent, depthWrite: !transparent,
    }))
  const ringMat = track(new THREE.MeshBasicMaterial({ color: current }))
  const discMat = track(new THREE.MeshBasicMaterial({ color: current }))
  const lipMat = track(new THREE.MeshBasicMaterial({ color: current }))

  // bottom band, glowing ring and lid disc (mirror of the top)
  add(cyl(R, 0.55), body, -1.025)
  add(new THREE.RingGeometry(0.42, 0.5, SEG), ringMat, -1.302, Math.PI / 2)
  add(cyl(0.43, 0.05), lidMat, -1.325)
  // glass: opaque back wall + faint front wall so the floor disc shows through
  add(cyl(GLASS_R, GLASS_H, true), glass(1, THREE.BackSide, false), -0.115)
  add(cyl(GLASS_R, GLASS_H, true), glass(0.35, THREE.FrontSide, true), -0.115)
  // glowing circle at the bottom of the glass
  add(new THREE.CircleGeometry(GLASS_R, SEG), discMat, -0.738, -Math.PI / 2)
  add(new THREE.RingGeometry(0.5, 0.56, SEG), lipMat, -0.744, -Math.PI / 2)
  // top band, glowing ring and lid disc
  add(cyl(R, 0.78), body, 0.91)
  add(new THREE.RingGeometry(0.42, 0.5, SEG), ringMat, 1.302, -Math.PI / 2)
  add(cyl(0.43, 0.05), lidMat, 1.325)

  return {
    group,
    tint(c: THREE.Color) {
      ringMat.color.copy(c)
      discMat.color.copy(c).lerp(WHITE, 0.12)
      lipMat.color.copy(c).multiplyScalar(0.4)
    },
    dispose() {
      geos.forEach((g) => g.dispose())
      mats.forEach((m) => m.dispose())
    },
  }
}

export default function LampViewer({
  color, onFlipChange, flipTick = 0, autoRotate = true, className = '',
  label = 'Interactive 3D Excuse Me Lamp',
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const colorRef = useRef(color)
  const cbRef = useRef(onFlipChange)
  const autoRef = useRef(autoRotate)
  const flipRef = useRef<(() => void) | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    colorRef.current = color
    cbRef.current = onFlipChange
    autoRef.current = autoRotate
  })

  useEffect(() => {
    if (flipTick > 0) flipRef.current?.()
  }, [flipTick])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      setFailed(true)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    const canvas = renderer.domElement
    canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;cursor:grab'
    canvas.setAttribute('aria-hidden', 'true')
    mount.appendChild(canvas)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = envRT.texture
    scene.environmentIntensity = 0.35

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a1e, 0.45))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(3, 4, 5)
    const rim = new THREE.DirectionalLight(0xffffff, 0.9)
    rim.position.set(-4, 2, -3)
    const glowLight = new THREE.PointLight(0xffffff, 5, 7, 2)
    glowLight.position.set(0, 0.2, 1.6)
    scene.add(key, rim, glowLight)

    const current = new THREE.Color(colorRef.current.hex)

    // Soft floor glow
    const gc = document.createElement('canvas')
    gc.width = gc.height = 128
    const gx = gc.getContext('2d')!
    const grad = gx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    gx.fillStyle = grad
    gx.fillRect(0, 0, 128, 128)
    const glowTex = new THREE.CanvasTexture(gc)
    glowTex.colorSpace = THREE.SRGBColorSpace
    const glowMat = new THREE.MeshBasicMaterial({
      map: glowTex, color: current, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 5.5), glowMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1.36
    scene.add(floor)

    // rig = user rotation, lamp inside
    const rig = new THREE.Group()
    const lamp = buildLamp(current)
    rig.add(lamp.group)
    scene.add(rig)
    rig.quaternion.setFromEuler(new THREE.Euler(0, -0.55, 0))

    // ---- interaction state
    const up = new THREE.Vector3()
    const X = new THREE.Vector3(1, 0, 0)
    const Y = new THREE.Vector3(0, 1, 0)
    const dq = new THREE.Quaternion()
    const qx = new THREE.Quaternion()
    let vx = 0, vy = 0, dragging = false, lastX = 0, lastY = 0
    let flipped = false
    let anim: { t: number; from: THREE.Quaternion; to: THREE.Quaternion } | null = null

    const rotate = (dx: number, dy: number) => {
      dq.setFromAxisAngle(Y, dx).premultiply(qx.setFromAxisAngle(X, dy))
      rig.quaternion.premultiply(dq).normalize()
    }
    const doFlip = () => {
      if (anim) return
      const from = rig.quaternion.clone()
      const to = new THREE.Quaternion().setFromAxisAngle(X, Math.PI).multiply(from)
      if (reduce) { rig.quaternion.copy(to); return }
      vx = vy = 0
      anim = { t: 0, from, to }
    }
    flipRef.current = doFlip

    const onDown = (e: PointerEvent) => {
      dragging = true; anim = null
      lastX = e.clientX; lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      vx = (e.clientX - lastX) * 0.011
      vy = (e.clientY - lastY) * 0.011
      lastX = e.clientX; lastY = e.clientY
      rotate(vx, vy)
    }
    const onUp = () => { dragging = false; canvas.style.cursor = 'grab' }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)

    const onKey = (e: KeyboardEvent) => {
      const step = 0.2
      const map: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
      }
      if (map[e.key]) { e.preventDefault(); anim = null; rotate(...map[e.key]) }
      else if (e.key === 'f' || e.key === 'F' || e.key === ' ') { e.preventDefault(); doFlip() }
    }
    mount.addEventListener('keydown', onKey)

    // ---- sizing / visibility
    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      const dist = 9 / Math.min(1, camera.aspect * 1.15)
      camera.position.set(0, dist * 0.34, dist * 0.94) // looks slightly down, like the renders
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    let visible = true
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(mount)

    // ---- loop
    const clock = new THREE.Clock()
    const target = new THREE.Color()
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(clock.getDelta(), 0.05)
      if (!visible) return

      if (anim) {
        anim.t = Math.min(1, anim.t + dt / 0.9)
        const t = anim.t
        const c1 = 1.4, c3 = c1 + 1
        const eased = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) // easeOutBack
        rig.quaternion.slerpQuaternions(anim.from, anim.to, eased)
        if (t >= 1) anim = null
      } else if (!dragging) {
        if (Math.abs(vx) + Math.abs(vy) > 0.0005) {
          rotate(vx, vy)
          const k = Math.pow(0.04, dt)
          vx *= k; vy *= k
        } else if (autoRef.current && !reduce) {
          rotate(dt * 0.35, 0)
        }
      }

      up.copy(Y).applyQuaternion(rig.quaternion)
      if (flipped && up.y > 0.1) { flipped = false; cbRef.current?.(false) }
      else if (!flipped && up.y < -0.1) { flipped = true; cbRef.current?.(true) }

      target.set(flipped ? FLIPPED_COLOR.hex : colorRef.current.hex)
      current.lerp(target, 1 - Math.pow(0.0008, dt))
      lamp.tint(current)
      glowMat.color.copy(current)
      glowLight.color.copy(current)

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      mount.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      flipRef.current = null
      lamp.dispose()
      floor.geometry.dispose()
      glowMat.dispose(); glowTex.dispose()
      envRT.dispose(); pmrem.dispose(); renderer.dispose()
      canvas.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      tabIndex={0}
      role="group"
      aria-roledescription="3D viewer"
      aria-label={`${label}. Drag or use arrow keys to rotate. Press F or Space to flip it upside down.`}
      className={`relative select-none outline-offset-[-4px] ${className}`}
    >
      {failed && (
        <img src="/ExcusemeLamp1.png" alt="Excuse Me Lamp glowing warm yellow" className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  )
}