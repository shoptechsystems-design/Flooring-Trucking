import * as THREE from 'three'

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** Procedural oak / LVP plank grain, drawn once on a canvas. */
export function makeWoodTexture() {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 128
  const g = c.getContext('2d')
  const r = rng(42)
  g.fillStyle = '#c69a6b'
  g.fillRect(0, 0, 512, 128)
  for (let i = 0; i < 70; i++) {
    const y = r() * 128
    const a = 0.05 + r() * 0.18
    g.strokeStyle = r() > 0.5 ? `rgba(90,54,26,${a})` : `rgba(255,232,196,${a * 0.8})`
    g.lineWidth = 0.6 + r() * 2.2
    g.beginPath()
    g.moveTo(0, y)
    for (let x = 0; x <= 512; x += 32) g.lineTo(x, y + Math.sin(x * 0.02 + i) * (1.5 + r() * 3))
    g.stroke()
  }
  for (let i = 0; i < 5; i++) {
    const x = r() * 512
    const y = 20 + r() * 88
    const grd = g.createRadialGradient(x, y, 0, x, y, 9 + r() * 9)
    grd.addColorStop(0, 'rgba(70,40,18,.55)')
    grd.addColorStop(1, 'rgba(70,40,18,0)')
    g.fillStyle = grd
    g.fillRect(x - 24, y - 24, 48, 48)
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

/** Rough plywood subfloor, seams included. */
export function makeSubfloorTexture() {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 512
  const g = c.getContext('2d')
  const r = rng(7)
  g.fillStyle = '#b39468'
  g.fillRect(0, 0, 512, 512)
  for (let i = 0; i < 260; i++) {
    g.strokeStyle = `rgba(80,55,28,${0.04 + r() * 0.1})`
    g.lineWidth = 1 + r() * 2
    const y = r() * 512
    g.beginPath()
    g.moveTo(0, y)
    g.bezierCurveTo(140, y + r() * 14 - 7, 360, y + r() * 14 - 7, 512, y)
    g.stroke()
  }
  g.strokeStyle = 'rgba(40,28,14,.55)'
  g.lineWidth = 3
  g.strokeRect(0, 0, 512, 512)
  g.beginPath()
  g.moveTo(256, 0)
  g.lineTo(256, 512)
  g.stroke()
  for (let i = 0; i < 40; i++) {
    g.fillStyle = 'rgba(50,50,50,.55)'
    g.fillRect(r() * 500 + 4, r() * 500 + 4, 3, 3)
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.anisotropy = 8
  return t
}

/** Worn carpet look for the "before" floor. */
export function makeCarpetTexture() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const g = c.getContext('2d')
  const r = rng(99)
  g.fillStyle = '#5d5f58'
  g.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 5000; i++) {
    const v = 70 + r() * 50
    g.fillStyle = `rgba(${v},${v},${v - 6},${0.25 + r() * 0.4})`
    g.fillRect(r() * 256, r() * 256, 1.5, 1.5)
  }
  for (let i = 0; i < 6; i++) {
    const x = r() * 256
    const y = r() * 256
    const grd = g.createRadialGradient(x, y, 0, x, y, 30 + r() * 30)
    grd.addColorStop(0, 'rgba(30,26,20,.45)')
    grd.addColorStop(1, 'rgba(30,26,20,0)')
    g.fillStyle = grd
    g.fillRect(0, 0, 256, 256)
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/** Branding printed on the vehicle sides. */
export function makeBrandTexture(kind = 'truck') {
  const w = 1400
  const h = 420
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const draw = () => {
    const g = c.getContext('2d')
    g.clearRect(0, 0, w, h)
    g.fillStyle = '#14161a'
    g.font = '800 190px "Bricolage Grotesque", "Arial Black", Arial, sans-serif'
    g.textBaseline = 'middle'
    g.fillText('LIL MAN', 60, 130)
    g.fillStyle = '#c98a2b'
    g.fillText('BIG VAN', 60, 310)
    g.fillStyle = '#14161a'
    g.font = '600 46px "JetBrains Mono", "Courier New", monospace'
    const lines = kind === 'truck' ? ['FREIGHT & FLOORING', 'WINSTON-SALEM, NC'] : ['FREIGHT & FLOORING', '(336) 955-6193']
    g.fillText(lines[0], 900, 110)
    g.fillText(lines[1], 900, 180)
    g.fillStyle = 'rgba(20,22,26,.55)'
    g.font = '500 36px "JetBrains Mono", monospace'
    g.fillText('USDOT 4327224', 900, 300)
    g.fillText('MC-1689088', 900, 350)
  }
  draw()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      draw()
      t.needsUpdate = true
    })
  }
  return t
}

/** Road-side sign for the freight scene. */
export function makeSignTexture(text, sub = '') {
  const c = document.createElement('canvas')
  c.width = 768
  c.height = 288
  const g = c.getContext('2d')
  const draw = () => {
    g.clearRect(0, 0, 768, 288)
    g.fillStyle = '#16181c'
    g.fillRect(0, 0, 768, 288)
    g.strokeStyle = '#d99a3d'
    g.lineWidth = 8
    g.strokeRect(14, 14, 740, 260)
    g.fillStyle = '#f2ede4'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.font = '800 88px "Bricolage Grotesque", Arial, sans-serif'
    g.fillText(text, 384, sub ? 118 : 144)
    if (sub) {
      g.fillStyle = '#d99a3d'
      g.font = '500 38px "JetBrains Mono", monospace'
      g.fillText(sub, 384, 210)
    }
  }
  draw()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      draw()
      t.needsUpdate = true
    })
  }
  return t
}
