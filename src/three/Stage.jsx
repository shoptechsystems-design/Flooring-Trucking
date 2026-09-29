import { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { useInView } from 'framer-motion'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

const isMobile = () => window.matchMedia('(max-width: 860px), (pointer: coarse)').matches

const idle = (fn) => {
  if ('requestIdleCallback' in window) {
    const id = requestIdleCallback(fn, { timeout: 1500 })
    return () => cancelIdleCallback(id)
  }
  const id = setTimeout(fn, 200)
  return () => clearTimeout(id)
}

/**
 * Renders one frame while the page is idle, so shaders, shadow maps and textures
 * are ready before the scene scrolls into view. Without this the first visible
 * frame compiles everything and the page freezes mid-scroll.
 */
function Prewarm() {
  const { gl, scene, camera, advance } = useThree()
  useEffect(
    () =>
      idle(() => {
        gl.compile(scene, camera)
        advance(performance.now())
      }),
    [gl, scene, camera, advance],
  )
  return null
}

/** Shared canvas wrapper: pauses off-screen, caps pixel ratio, falls back without WebGL. */
export default function Stage({ children, camera = { position: [0, 5, 16], fov: 35 }, fallback = null, dprMax = 1.5, className = '' }) {
  const ref = useRef(null)
  // start rendering a little before the canvas enters the viewport
  const inView = useInView(ref, { margin: '300px 0px' })
  const [ok] = useState(hasWebGL)
  const [mobile] = useState(isMobile)
  return (
    <div ref={ref} className={`stage-fill ${className}`}>
      {ok ? (
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          dpr={[1, mobile ? Math.min(dprMax, 1.5) : dprMax]}
          shadows
          camera={camera}
          // the canvas never moves inside its box, so skip re-measuring on every scroll event
          resize={{ scroll: false }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Environment resolution={mobile ? 64 : 128} frames={1}>
              <Lightformer form="rect" intensity={2.4} color="#fff3e0" position={[0, 6, 4]} scale={[12, 4, 1]} />
              <Lightformer form="rect" intensity={1.3} color="#9fb4d9" position={[-8, 3, -2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
              <Lightformer form="rect" intensity={1.2} color="#ffb877" position={[8, 2, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
            </Environment>
            {children}
            <Prewarm />
          </Suspense>
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  )
}
