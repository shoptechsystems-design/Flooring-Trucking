import { useMemo, useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { makeBrandTexture } from './textures'

const M = {
  paint: new THREE.MeshPhysicalMaterial({ color: '#f1efe9', roughness: 0.32, metalness: 0.15, clearcoat: 0.8, clearcoatRoughness: 0.25 }),
  slate: new THREE.MeshStandardMaterial({ color: '#23262c', roughness: 0.55, metalness: 0.4 }),
  dark: new THREE.MeshStandardMaterial({ color: '#0d0e10', roughness: 0.85 }),
  glass: new THREE.MeshPhysicalMaterial({ color: '#1c2a38', roughness: 0.05, metalness: 0.2, transmission: 0, clearcoat: 1 }),
  chrome: new THREE.MeshStandardMaterial({ color: '#d6d9df', roughness: 0.2, metalness: 1 }),
  amber: new THREE.MeshStandardMaterial({ color: '#c98a2b', roughness: 0.4, metalness: 0.55 }),
  lamp: new THREE.MeshStandardMaterial({ color: '#fff4d2', emissive: '#ffe3a0', emissiveIntensity: 1.4 }),
  tail: new THREE.MeshStandardMaterial({ color: '#7a1414', emissive: '#a01818', emissiveIntensity: 0.8 }),
}

function Wheel({ position, r = 0.52, w = 0.42, spin }) {
  const ref = useRef()
  useFrame(() => {
    if (ref.current && spin) ref.current.rotation.z = -spin.current
  })
  return (
    <group position={position}>
      <group ref={ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[r, r, w, 32]} />
          <primitive object={M.dark} attach="material" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[r * 0.62, r * 0.62, w + 0.02, 24]} />
          <primitive object={M.chrome} attach="material" />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]} position={[0, 0, 0]}>
            <boxGeometry args={[r * 1.02, 0.07, w + 0.05]} />
            <primitive object={M.slate} attach="material" />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[r * 0.18, r * 0.18, w + 0.08, 12]} />
          <primitive object={M.amber} attach="material" />
        </mesh>
      </group>
    </group>
  )
}

function BrandPlane({ tex, size, position, flip }) {
  return (
    <mesh position={position} rotation={[0, flip ? Math.PI : 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial map={tex} transparent roughness={0.5} polygonOffset polygonOffsetFactor={-2} />
    </mesh>
  )
}

/** 26-ft box truck, facing +X. `spin` is a ref holding wheel rotation in radians. */
export const Truck = forwardRef(function Truck({ spin, ...props }, ref) {
  const tex = useMemo(() => makeBrandTexture('truck'), [])
  const g = useRef()
  useImperativeHandle(ref, () => g.current)
  return (
    <group ref={g} {...props}>
      {/* chassis */}
      <mesh position={[0.4, 0.62, 0]} castShadow>
        <boxGeometry args={[7.6, 0.32, 1.9]} />
        <primitive object={M.dark} attach="material" />
      </mesh>
      {/* cargo box */}
      <RoundedBox args={[5.7, 2.55, 2.4]} radius={0.09} smoothness={4} position={[-1.3, 2.12, 0]} castShadow receiveShadow>
        <primitive object={M.paint} attach="material" />
      </RoundedBox>
      <mesh position={[-1.3, 1.02, 0]}>
        <boxGeometry args={[5.74, 0.1, 2.44]} />
        <primitive object={M.amber} attach="material" />
      </mesh>
      <mesh position={[-1.3, 3.4, 0]}>
        <boxGeometry args={[5.74, 0.05, 2.44]} />
        <primitive object={M.slate} attach="material" />
      </mesh>
      <BrandPlane tex={tex} size={[4.9, 1.47]} position={[-1.15, 2.18, 1.211]} />
      <BrandPlane tex={tex} size={[4.9, 1.47]} position={[-1.15, 2.18, -1.211]} flip />
      {/* rear */}
      <mesh position={[-4.16, 2.1, 0]}>
        <boxGeometry args={[0.04, 2.3, 0.05]} />
        <primitive object={M.slate} attach="material" />
      </mesh>
      <mesh position={[-4.17, 0.95, 0]}>
        <boxGeometry args={[0.16, 0.18, 2.3]} />
        <primitive object={M.chrome} attach="material" />
      </mesh>
      <mesh position={[-4.18, 1.5, 0.95]}><boxGeometry args={[0.05, 0.28, 0.18]} /><primitive object={M.tail} attach="material" /></mesh>
      <mesh position={[-4.18, 1.5, -0.95]}><boxGeometry args={[0.05, 0.28, 0.18]} /><primitive object={M.tail} attach="material" /></mesh>
      {/* cab */}
      <RoundedBox args={[1.75, 1.85, 2.3]} radius={0.12} smoothness={4} position={[2.28, 1.72, 0]} castShadow>
        <primitive object={M.paint} attach="material" />
      </RoundedBox>
      <RoundedBox args={[1.0, 1.05, 2.28]} radius={0.1} smoothness={4} position={[3.28, 1.25, 0]} castShadow>
        <primitive object={M.paint} attach="material" />
      </RoundedBox>
      <mesh position={[2.98, 2.32, 0]} rotation={[0, 0, -0.42]}>
        <boxGeometry args={[0.06, 0.92, 1.98]} />
        <primitive object={M.glass} attach="material" />
      </mesh>
      {[1, -1].map((s) => (
        <group key={s}>
          <mesh position={[2.28, 2.35, s * 1.156]}><boxGeometry args={[1.05, 0.72, 0.02]} /><primitive object={M.glass} attach="material" /></mesh>
          <mesh position={[3.0, 2.0, s * 1.3]}><boxGeometry args={[0.1, 0.42, 0.14]} /><primitive object={M.slate} attach="material" /></mesh>
          <mesh position={[3.82, 1.2, s * 0.85]}><boxGeometry args={[0.06, 0.2, 0.42]} /><primitive object={M.lamp} attach="material" /></mesh>
        </group>
      ))}
      {/* grille + bumper */}
      <mesh position={[3.79, 1.2, 0]}><boxGeometry args={[0.05, 0.5, 1.1]} /><primitive object={M.slate} attach="material" /></mesh>
      <mesh position={[3.9, 0.72, 0]} castShadow><boxGeometry args={[0.24, 0.34, 2.36]} /><primitive object={M.chrome} attach="material" /></mesh>
      {/* arches */}
      <mesh position={[3.1, 0.98, 0]}><boxGeometry args={[1.35, 0.06, 2.34]} /><primitive object={M.dark} attach="material" /></mesh>
      <mesh position={[-1.55, 0.98, 0]}><boxGeometry args={[1.6, 0.06, 2.34]} /><primitive object={M.dark} attach="material" /></mesh>
      {/* wheels */}
      <Wheel position={[3.1, 0.52, 1.03]} spin={spin} />
      <Wheel position={[3.1, 0.52, -1.03]} spin={spin} />
      <Wheel position={[-1.55, 0.52, 1.03]} spin={spin} />
      <Wheel position={[-1.55, 0.52, -1.03]} spin={spin} />
    </group>
  )
})

/** Sprinter-style cargo van, facing +X. */
export const Van = forwardRef(function Van({ spin, ...props }, ref) {
  const tex = useMemo(() => makeBrandTexture('van'), [])
  const g = useRef()
  useImperativeHandle(ref, () => g.current)
  return (
    <group ref={g} {...props}>
      <mesh position={[0, 0.62, 0]} castShadow>
        <boxGeometry args={[5.2, 0.3, 1.75]} />
        <primitive object={M.dark} attach="material" />
      </mesh>
      {/* body + high roof */}
      <RoundedBox args={[4.6, 2.05, 1.95]} radius={0.14} smoothness={4} position={[-0.35, 1.85, 0]} castShadow receiveShadow>
        <primitive object={M.paint} attach="material" />
      </RoundedBox>
      {/* hood and sloped nose */}
      <RoundedBox args={[1.25, 0.95, 1.9]} radius={0.12} smoothness={4} position={[2.2, 1.1, 0]} castShadow>
        <primitive object={M.paint} attach="material" />
      </RoundedBox>
      <mesh position={[1.92, 2.15, 0]} rotation={[0, 0, -0.62]}>
        <boxGeometry args={[0.06, 1.15, 1.72]} />
        <primitive object={M.glass} attach="material" />
      </mesh>
      <mesh position={[-0.35, 1.02, 0]}>
        <boxGeometry args={[4.64, 0.09, 1.99]} />
        <primitive object={M.amber} attach="material" />
      </mesh>
      <BrandPlane tex={tex} size={[3.4, 1.02]} position={[-0.6, 1.95, 0.976]} />
      <BrandPlane tex={tex} size={[3.4, 1.02]} position={[-0.6, 1.95, -0.976]} flip />
      {[1, -1].map((s) => (
        <group key={s}>
          <mesh position={[1.35, 2.2, s * 0.98]}><boxGeometry args={[0.85, 0.75, 0.02]} /><primitive object={M.glass} attach="material" /></mesh>
          <mesh position={[2.72, 1.1, s * 0.72]}><boxGeometry args={[0.06, 0.2, 0.4]} /><primitive object={M.lamp} attach="material" /></mesh>
          <mesh position={[1.7, 1.95, s * 1.08]}><boxGeometry args={[0.1, 0.36, 0.12]} /><primitive object={M.slate} attach="material" /></mesh>
        </group>
      ))}
      <mesh position={[2.83, 0.75, 0]}><boxGeometry args={[0.22, 0.32, 1.9]} /><primitive object={M.chrome} attach="material" />
      </mesh>
      <mesh position={[2.83, 1.1, 0]}><boxGeometry args={[0.05, 0.4, 0.8]} /><primitive object={M.slate} attach="material" /></mesh>
      <mesh position={[-2.66, 1.5, 0.8]}><boxGeometry args={[0.05, 0.4, 0.14]} /><primitive object={M.tail} attach="material" /></mesh>
      <mesh position={[-2.66, 1.5, -0.8]}><boxGeometry args={[0.05, 0.4, 0.14]} /><primitive object={M.tail} attach="material" /></mesh>
      <mesh position={[-2.66, 0.85, 0]}><boxGeometry args={[0.18, 0.16, 1.85]} /><primitive object={M.chrome} attach="material" /></mesh>
      <Wheel position={[1.75, 0.46, 0.9]} r={0.46} w={0.36} spin={spin} />
      <Wheel position={[1.75, 0.46, -0.9]} r={0.46} w={0.36} spin={spin} />
      <Wheel position={[-1.5, 0.46, 0.9]} r={0.46} w={0.36} spin={spin} />
      <Wheel position={[-1.5, 0.46, -0.9]} r={0.46} w={0.36} spin={spin} />
    </group>
  )
})
