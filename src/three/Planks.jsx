import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { makeWoodTexture } from './textures'

const TINTS = ['#ffffff', '#f3e2cc', '#e8d0b0', '#fbeedd', '#e0c4a0', '#f7e9d6'].map((c) => new THREE.Color(c))
export const clamp01 = (t) => Math.min(Math.max(t, 0), 1)
export const easeOut = (t) => 1 - Math.pow(1 - clamp01(t), 3)
const tmp = new THREE.Object3D()

export function buildPlanks({ cols, rows, w, d, hw }) {
  const list = []
  let s = 11
  const rnd = () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
  const totalW = cols * w
  const stagger = [0, 0.37, 0.71]
  for (let r = 0; r < rows; r++) {
    const off = stagger[r % 3] * w
    for (let c = -1; c <= cols; c++) {
      const cx = c * w + off - totalW / 2 + w / 2
      // clip the staggered end planks to the floor edge, like a real install
      const left = Math.max(cx - w / 2, -hw)
      const right = Math.min(cx + w / 2, hw)
      const width = right - left
      if (width < 0.15) continue
      list.push({
        x: (left + right) / 2,
        sx: width / w,
        z: (r - rows / 2 + 0.5) * d,
        row: r,
        tint: Math.floor(rnd() * TINTS.length),
        rx: (rnd() - 0.5) * 2,
        rz: (rnd() - 0.5) * 2,
        ry: (rnd() - 0.5) * 3,
        h: 1.5 + rnd() * 2.5,
        jitter: rnd(),
      })
    }
  }
  return list
}

/**
 * LVP planks that drop into place. `progress` is a ref (0..1).
 * Rows land back-to-front, which reads as an installer working across a room.
 */
export function AnimatedPlanks({ cols = 4, rows = 10, w = 2.2, d = 0.44, halfWidth, progress, y = 0, position = [0, 0, 0] }) {
  const hw = halfWidth ?? (cols * w) / 2
  const data = useMemo(() => buildPlanks({ cols, rows, w, d, hw }), [cols, rows, w, d, hw])
  const tex = useMemo(() => makeWoodTexture(), [])
  const ref = useRef()
  const last = useRef(-1)
  useLayoutEffect(() => {
    data.forEach((p, i) => ref.current.setColorAt(i, TINTS[p.tint]))
    ref.current.instanceColor.needsUpdate = true
    last.current = -1
  }, [data])

  useFrame(() => {
    const prog = progress.current
    if (prog === last.current) return
    last.current = prog
    const win = 0.3
    data.forEach((p, i) => {
      const delay = (p.row / rows) * 0.7 + p.jitter * 0.3
      const t = easeOut((prog - delay * (1 - win)) / win)
      const k = 1 - t
      tmp.position.set(p.x + k * p.rx * 1.5, y + 0.03 + k * p.h, p.z + k * p.rz * 1.5)
      tmp.rotation.set(k * p.rx, k * p.ry, k * p.rz * 0.5)
      tmp.scale.set(t > 0.001 ? p.sx : 0, t > 0.001 ? 1 : 0, t > 0.001 ? 1 : 0)
      tmp.updateMatrix()
      ref.current.setMatrixAt(i, tmp.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group position={position}>
      <instancedMesh ref={ref} args={[undefined, undefined, data.length]} castShadow receiveShadow frustumCulled={false}>
        <boxGeometry args={[w - 0.03, 0.06, d - 0.03]} />
        <meshStandardMaterial map={tex} roughness={0.42} metalness={0} />
      </instancedMesh>
    </group>
  )
}
