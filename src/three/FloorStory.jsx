import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { AnimatedPlanks, easeOut, clamp01 } from './Planks'
import { makeCarpetTexture, makeSubfloorTexture } from './textures'

const tmp = new THREE.Object3D()
const ROOM_W = 14
const ROOM_D = 10

/**
 * Scroll story: existing floor -> estimate outline -> tear-out -> prep -> new LVP.
 * `progress.current` (0..1) is driven by the section's scroll position.
 */
export default function FloorStory({ progress, reduced }) {
  const carpet = useMemo(() => makeCarpetTexture(), [])
  const sub = useMemo(() => {
    const t = makeSubfloorTexture()
    t.repeat.set(3.5, 2.5)
    return t
  }, [])

  // old floor tiles
  const tiles = useMemo(() => {
    const list = []
    const cols = 7
    const rows = 5
    let s = 5
    const rnd = () => {
      s = (s * 16807) % 2147483647
      return (s - 1) / 2147483646
    }
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        list.push({
          x: (c - cols / 2 + 0.5) * 2,
          z: (r - rows / 2 + 0.5) * 2,
          delay: (c / cols) * 0.5 + rnd() * 0.5,
          rx: (rnd() - 0.5) * 3,
          rz: (rnd() - 0.5) * 3,
          fx: 6 + rnd() * 6,
          fz: 4 + rnd() * 5,
        })
    return list
  }, [])
  const tileRef = useRef()
  const subMat = useRef()
  const outline = useRef()
  const laser = useRef()
  const planksProg = useRef(0)
  const lastP = useRef(-1)
  const dirty = useMemo(() => new THREE.Color('#9b8867'), [])
  const clean = useMemo(() => new THREE.Color('#e9d6b0'), [])

  useLayoutEffect(() => {
    const m = tileRef.current
    tiles.forEach((_, i) => m.setColorAt(i, new THREE.Color().setHSL(0.16, 0.05, 0.85 + (i % 3) * 0.06)))
    m.instanceColor.needsUpdate = true
  }, [tiles])

  useFrame((state, dt) => {
    const p = reduced ? 1 : progress.current
    const cam = state.camera
    const ang = -0.42 + p * 0.62
    const tx = Math.sin(ang) * 18 + state.pointer.x * 1.1
    const tz = Math.cos(ang) * 18
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 4)
    cam.position.x += (tx - cam.position.x) * k
    cam.position.y += (11 - state.pointer.y * 0.6 - cam.position.y) * k
    cam.position.z += (tz - cam.position.z) * k
    cam.lookAt(0, 0, 0.5)

    // outline pulse (estimate)
    const oIn = clamp01((p - 0.1) / 0.06) * (1 - clamp01((p - 0.3) / 0.06))
    outline.current.visible = oIn > 0.01
    outline.current.children.forEach((c) => {
      c.material.emissiveIntensity = (1.4 + Math.sin(state.clock.elapsedTime * 3) * 0.5) * oIn
    })

    // tear-out
    const tp = clamp01((p - 0.32) / 0.26)
    if (lastP.current !== p) {
      const mesh = tileRef.current
      tiles.forEach((t, i) => {
        const q = easeOut((tp * 1.6 - t.delay * 0.6) / 1)
        tmp.position.set(t.x + q * t.fx * 0.6, 0.07 + q * 5, t.z + q * t.fz)
        tmp.rotation.set(q * t.rx, q * 1.2, q * t.rz)
        tmp.scale.setScalar(q > 0.98 ? 0 : 1 - q * 0.4)
        tmp.updateMatrix()
        mesh.setMatrixAt(i, tmp.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true

      // prep
      const prep = clamp01((p - 0.56) / 0.12)
      subMat.current.color.lerpColors(dirty, clean, prep)
      // laser level sweeping across during prep
      const lz = -ROOM_D / 2 + prep * ROOM_D
      laser.current.position.z = lz
      laser.current.visible = prep > 0 && prep < 1

      // install
      planksProg.current = clamp01((p - 0.68) / 0.3)
      lastP.current = p
    }
  })

  return (
    <>
      <color attach="background" args={['#15171b']} />
      <fog attach="fog" args={['#15171b', 26, 52]} />
      <hemisphereLight args={['#e8eaf0', '#2a2118', 0.4]} />
      <directionalLight
        position={[6, 12, 8]}
        intensity={2.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-6, 4, 5]} intensity={30} color="#ffc98a" distance={22} />

      {/* room shell */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0f1013" roughness={1} />
      </mesh>
      <mesh position={[0, 2.2, -ROOM_D / 2 - 0.1]} receiveShadow>
        <boxGeometry args={[ROOM_W + 0.4, 4.4, 0.2]} />
        <meshStandardMaterial color="#d9d3c6" roughness={0.9} />
      </mesh>
      <mesh position={[-ROOM_W / 2 - 0.1, 2.2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4.4, ROOM_D]} />
        <meshStandardMaterial color="#cdc6b8" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.16, -ROOM_D / 2 + 0.02]}>
        <boxGeometry args={[ROOM_W, 0.32, 0.06]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.6} />
      </mesh>
      <mesh position={[-ROOM_W / 2 + 0.02, 0.16, 0]}>
        <boxGeometry args={[0.06, 0.32, ROOM_D]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.6} />
      </mesh>

      {/* subfloor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial ref={subMat} map={sub} roughness={0.9} />
      </mesh>

      {/* old carpet tiles */}
      <instancedMesh ref={tileRef} args={[undefined, undefined, tiles.length]} castShadow receiveShadow frustumCulled={false}>
        <boxGeometry args={[1.96, 0.12, 1.96]} />
        <meshStandardMaterial map={carpet} roughness={1} />
      </instancedMesh>

      {/* estimate outline */}
      <group ref={outline} position={[0, 0.16, 0]}>
        {[
          [0, -ROOM_D / 2, ROOM_W, 0.09],
          [0, ROOM_D / 2, ROOM_W, 0.09],
          [-ROOM_W / 2, 0, 0.09, ROOM_D],
          [ROOM_W / 2, 0, 0.09, ROOM_D],
        ].map(([x, z, w, d], i) => (
          <mesh key={i} position={[x, 0, z]}>
            <boxGeometry args={[w, 0.05, d]} />
            <meshStandardMaterial color="#e0a04a" emissive="#e0a04a" emissiveIntensity={1.4} transparent />
          </mesh>
        ))}
      </group>

      {/* laser level */}
      <mesh ref={laser} position={[0, 0.1, 0]} visible={false}>
        <boxGeometry args={[ROOM_W, 0.03, 0.06]} />
        <meshStandardMaterial color="#e0a04a" emissive="#e0a04a" emissiveIntensity={3} />
      </mesh>

      {/* new LVP */}
      <AnimatedPlanks cols={6} rows={20} w={2.4} d={0.5} halfWidth={ROOM_W / 2} progress={planksProg} y={0.005} />
    </>
  )
}
