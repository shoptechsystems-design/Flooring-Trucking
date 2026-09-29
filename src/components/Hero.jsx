import { useReducedMotion } from 'framer-motion'
import Stage from '../three/Stage'
import HeroScene from '../three/HeroScene'
import { Btn, Lines, Reveal, Eyebrow } from './Ui'
import { SITE } from '../data/site'

export default function Hero() {
  const reduced = useReducedMotion()
  return (
    <section id="home" className="hero">
      <div className="hero-canvas">
        <Stage camera={{ position: [0, 12, 24], fov: 35 }} fallback={<div className="no-gl" />}>
          <HeroScene reduced={!!reduced} />
        </Stage>
        <div className="hero-labels" aria-hidden="true">
          <div className="hl hl-a">
            <b>01</b>
            <span>Freight &amp; Transportation</span>
            <small>Box truck &middot; Sprinter van</small>
          </div>
          <div className="hl hl-b">
            <b>02</b>
            <span>Flooring &amp; Demolition</span>
            <small>LVP &middot; Removal &middot; Demolition</small>
          </div>
        </div>
      </div>

      <div className="hero-copy">
        <Reveal y={12}>
          <Eyebrow>Reliable &middot; Local &middot; Professional</Eyebrow>
        </Reveal>
        <Lines
          as="h1"
          inView={false}
          delay={0.25}
          className="hero-h1"
          lines={['Local Capacity.', 'Regional Reach.', { text: 'Professional Results.', className: 'amber' }]}
        />
        <Reveal delay={0.7} className="hero-sub">
          <p>Reliable freight transportation and professional flooring services serving Winston-Salem, the Triad, and surrounding areas.</p>
        </Reveal>
        <Reveal delay={0.85} className="cta-row">
          <Btn href="#freight-form">Get a Free Quote</Btn>
          <Btn href="#flooring-form" variant="ghost">Get a Free Flooring Estimate</Btn>
        </Reveal>
      </div>

      <div className="hero-meta">
        <span>{SITE.city}</span>
        <span>USDOT {SITE.usdot}</span>
        <span>{SITE.mc}</span>
      </div>
    </section>
  )
}
