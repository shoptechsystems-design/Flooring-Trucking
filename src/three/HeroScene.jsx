import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Truck, Van } from './Vehicles'
import { AnimatedPlanks, easeOut, clamp01 } from './Planks'

/**
 * Split-screen hero. Vehicles roll in on the freight side while oak planks
 * lay themselves on the flooring side. Portrait screens stack the two halves.
 */
export default function HeroScene({ reduced }) {
  const { size } = useThree()
  const portrait = size.width / size.height < 1.9
  const vehicles = useRef()
  const spin = useRef(0)
  const planksProg = useRef(reduced ? 1 : 0)
  const intro = useRef(reduced ? 1 : 0)
  const look = useRef(new THREE.Vector3(0, 1.2, 0))

  const vPos = portrait ? [0, 0, -4.2] : [-5.6, 0, 0]
  const fPos = portrait ? [0, 0, 4.6] : [6.4, 0, 0]
  const vScale = portrait ? 0.9 : 1

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (!reduced) intro.current = Math.min(1, intro.current + dt / 2.6)
    const e = easeOut(intro.current)
    const back = (1 - e) * -18
    vehicles.current.position.x = vPos[0] + back
    spin.current = ((1 - e) * 18) / 0.5 * -1 + (18 / 0.5)
    planksProg.current = reduced ? 1 : clamp01((t - 0.5) / 2.8)

    const cam = state.camera
    const aspect = size.width / size.height
    // pull the camera back on narrow canvases so both vehicles stay in frame
    const bz = portrait ? Math.min(26, Math.max(17.5, 9.6 / (0.63 * aspect))) : 16.5
    const by = portrait ? bz * 0.5 : 5.6
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 3.5)
    cam.position.x += (state.pointer.x * 1.6 - cam.position.x) * k
    cam.position.y += (by - state.pointer.y * 0.7 - cam.position.y) * k
    cam.position.z += (bz - cam.position.z) * k
    cam.lookAt(look.current)
  })

  return (
    <>
      <color attach="background" args={['#0d0e10']} />
      <fog attach="fog" args={['#0d0e10', 22, 46]} />
      <hemisphereLight args={['#dfe6f2', '#2a2118', 0.35]} />
      <directionalLight
        position={[7, 12, 8]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-8, 3, 4]} intensity={40} color="#7fa3ff" distance={24} />
      <pointLight position={[8, 3, 4]} intensity={45} color="#ffb066" distance={24} />

      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#111316" roughness={0.92} />
      </mesh>

      {/* divider */}
      {portrait ? (
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[14, 0.06, 0.07]} />
          <meshStandardMaterial color="#e0a04a" emissive="#e0a04a" emissiveIntensity={2.2} />
        </mesh>
      ) : (
        <mesh position={[0, 2.4, 0]}>
          <boxGeometry args={[0.06, 5.2, 0.06]} />
          <meshStandardMaterial color="#e0a04a" emissive="#e0a04a" emissiveIntensity={2.2} />
        </mesh>
      )}

      {/* freight side */}
      <group ref={vehicles} position={vPos} scale={vScale}>
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[15, 8.5]} />
          <meshStandardMaterial color="#181a1e" roughness={0.85} />
        </mesh>
        {[-6, -3, 0, 3, 6].map((x) => (
          <mesh key={x} position={[x, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.4, 0.09]} />
            <meshStandardMaterial color="#c98a2b" roughness={0.6} />
          </mesh>
        ))}
        <Truck spin={spin} position={[-1.4, 0, -2]} rotation={[0, 0.02, 0]} />
        <Van spin={spin} position={[2.4, 0, 2.6]} rotation={[0, -0.02, 0]} />
      </group>

      {/* flooring side */}
      <AnimatedPlanks cols={portrait ? 3 : 4} rows={portrait ? 8 : 10} progress={planksProg} position={fPos} />
    </>
  )
}
