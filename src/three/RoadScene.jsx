import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Truck, Van } from './Vehicles'
import { makeSignTexture } from './textures'
import { CITIES } from '../data/site'

const tmp = new THREE.Object3D()
const mod = (n, m) => ((n % m) + m) % m
const SPACING = 26
const LOOP = SPACING * CITIES.length

function Sign({ text, sub, baseX, distRef }) {
  const g = useRef()
  const tex = useMemo(() => makeSignTexture(text.toUpperCase(), sub), [text, sub])
  useFrame(() => {
    g.current.position.x = mod(baseX - distRef.current + LOOP / 2, LOOP) - LOOP / 2
  })
  return (
    <group ref={g} position={[baseX, 0, -5.2]}>
      <mesh position={[-1.5, 2.6, 0]}><cylinderGeometry args={[0.07, 0.07, 5.2, 8]} /><meshStandardMaterial color="#2a2d34" metalness={0.6} roughness={0.5} /></mesh>
      <mesh position={[1.5, 2.6, 0]}><cylinderGeometry args={[0.07, 0.07, 5.2, 8]} /><meshStandardMaterial color="#2a2d34" metalness={0.6} roughness={0.5} /></mesh>
      <mesh position={[0, 4.6, 0]} castShadow>
        <planeGeometry args={[3.9, 1.46]} />
        <meshStandardMaterial map={tex} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/** Freight scene. The road scrolls under a parked-in-place vehicle as the section scrolls. */
export default function RoadScene({ progress, active = 'truck', reduced }) {
  const { size } = useThree()
    const dist = useRef(0)
  const spin = useRef(0)
  const truck = useRef()
  const van = useRef()
  const truckX = useRef(0)
  const vanX = useRef(active === 'van' ? 0 : 26)
  const dashes = useRef()
  const sky = useRef()
  const lamps = useRef()

  const dashData = useMemo(() => Array.from({ length: 22 }, (_, i) => i * 3.2), [])
  const skyData = useMemo(() => {
    let s = 3
    const rnd = () => {
      s = (s * 16807) % 2147483647
      return (s - 1) / 2147483646
    }
    return Array.from({ length: 34 }, (_, i) => ({
      x: i * 4.4 - 75,
      w: 2 + rnd() * 3,
      h: 2 + rnd() * 9,
      z: -18 - rnd() * 8,
    }))
  }, [])
  const lampData = useMemo(() => Array.from({ length: 12 }, (_, i) => i * 11), [])

  useEffect(() => {
    if (active === 'truck' && truckX.current > 1) truckX.current = -26
    if (active === 'van' && vanX.current > 1) vanX.current = -26
  }, [active])

  useLayoutEffect(() => {
    skyData.forEach((b, i) => {
      sky.current.setColorAt(i, new THREE.Color().setHSL(0.6, 0.12, 0.07 + (i % 4) * 0.012))
    })
    sky.current.instanceColor.needsUpdate = true
  }, [skyData])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const p = reduced ? 0.3 : progress.current
    const speed = reduced ? 0 : 5
    dist.current = p * 320 + t * speed
    spin.current = dist.current / 0.5

    // vehicles slide in/out
    truckX.current += ((active === 'truck' ? 0 : 26) - truckX.current) * Math.min(1, dt * 2.2)
    vanX.current += ((active === 'van' ? 0 : 26) - vanX.current) * Math.min(1, dt * 2.2)
    truck.current.position.x = truckX.current - 0.4
    van.current.position.x = vanX.current - 0.1
    truck.current.position.y = Math.sin(t * 9) * 0.006
    van.current.position.y = Math.sin(t * 9 + 1) * 0.006

    // road dashes
    dashData.forEach((x, i) => {
      tmp.position.set(mod(x - dist.current + 35, 70.4) - 35.2, 0.02, 0)
      tmp.rotation.set(-Math.PI / 2, 0, 0)
      tmp.scale.set(1, 1, 1)
      tmp.updateMatrix()
      dashes.current.setMatrixAt(i, tmp.matrix)
    })
    dashes.current.instanceMatrix.needsUpdate = true

    // skyline parallax
    const loop = skyData.length * 4.4
    skyData.forEach((b, i) => {
      const x = mod(b.x - dist.current * 0.28 + loop / 2, loop) - loop / 2
      tmp.position.set(x, b.h / 2, b.z)
      tmp.rotation.set(0, 0, 0)
      tmp.scale.set(b.w, b.h, 2.5)
      tmp.updateMatrix()
      sky.current.setMatrixAt(i, tmp.matrix)
    })
    sky.current.instanceMatrix.needsUpdate = true

    // street lamps
    lampData.forEach((x, i) => {
      tmp.position.set(mod(x - dist.current * 1 + 66, 132) - 66, 4.4, -7)
      tmp.rotation.set(0, 0, 0)
      tmp.scale.set(1, 1, 1)
      tmp.updateMatrix()
      lamps.current.setMatrixAt(i, tmp.matrix)
    })
    lamps.current.instanceMatrix.needsUpdate = true

    // camera
    const cam = state.camera
    const cz = Math.max(13, 18 / (size.width / size.height))
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 4)
    cam.position.x += (4.2 + state.pointer.x * 1.2 - cam.position.x) * k
    cam.position.y += (3.3 - state.pointer.y * 0.5 - cam.position.y) * k
    cam.position.z += (cz - cam.position.z) * k
    cam.lookAt(0.4, 1.7, 0)
  })

  return (
    <>
      <color attach="background" args={['#0f1114']} />
      <fog attach="fog" args={['#0f1114', 20, 52]} />
      <hemisphereLight args={['#cfd8ea', '#1a1510', 0.35]} />
      <directionalLight
        position={[6, 10, 9]}
        intensity={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-6, 3, 6]} intensity={28} color="#ffb877" distance={20} />

      {/* ground + road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[200, 80]} />
        <meshStandardMaterial color="#0d0f11" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 7.4]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.75} />
      </mesh>
      {[-3.5, 3.5].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, z]}>
          <planeGeometry args={[200, 0.12]} />
          <meshStandardMaterial color="#d8d4c8" roughness={0.7} />
        </mesh>
      ))}
      <instancedMesh ref={dashes} args={[undefined, undefined, dashData.length]} frustumCulled={false}>
        <planeGeometry args={[1.7, 0.14]} />
        <meshStandardMaterial color="#c98a2b" roughness={0.6} />
      </instancedMesh>

      {/* skyline + lamps */}
      <instancedMesh ref={sky} args={[undefined, undefined, skyData.length]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={lamps} args={[undefined, undefined, lampData.length]} frustumCulled={false}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color="#ffe3a0" emissive="#ffd58a" emissiveIntensity={2.5} />
      </instancedMesh>

      {CITIES.map((c, i) => (
        <Sign key={c} text={c} sub={i === 0 ? 'HOME BASE' : 'TRIAD & NC'} baseX={i * SPACING - LOOP / 2 + 6} distRef={dist} />
      ))}

      <Truck ref={truck} spin={spin} position={[-0.4, 0, 0]} />
      <Van ref={van} spin={spin} position={[26, 0, 0]} />
    </>
  )
}
