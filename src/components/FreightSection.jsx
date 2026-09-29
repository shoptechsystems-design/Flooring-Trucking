import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import Stage from '../three/Stage'
import RoadScene from '../three/RoadScene'
import LeadForm from './LeadForm'
import { Btn, Eyebrow, Lines, Reveal } from './Ui'
import { EQUIPMENT, FREIGHT_FIELDS, CITIES } from '../data/site'

export default function FreightSection() {
  const track = useRef(null)
  const progress = useRef(0)
  const reduced = useReducedMotion()
  const [active, setActive] = useState('truck')
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => (progress.current = v))
  const eq = EQUIPMENT[active]

  return (
    <section id="freight" className="freight-sec">
      <div ref={track} className="freight-track">
        <div className="freight-sticky">
          <div className="freight-stage">
            <Stage camera={{ position: [4.2, 3.3, 19], fov: 34 }} fallback={<div className="no-gl" />}>
              <RoadScene progress={progress} active={active} reduced={!!reduced} />
            </Stage>
            <div className="stage-tag"><i />{eq.name}</div>
            <div className="stage-hint">Scroll to hit the road</div>
          </div>

          <div className="freight-copy">
            <Eyebrow n="01">Freight &amp; Transportation</Eyebrow>
            <Lines className="h2" lines={['Transportation Capacity', { text: 'You Can Count On.', className: 'amber' }]} />
            <p className="lead">
              Based in Winston-Salem, NC, we provide dependable box truck and Sprinter van capacity for local, Triad, North Carolina, and regional freight.
            </p>

            <div className="equip" role="tablist" aria-label="Equipment">
              {Object.values(EQUIPMENT).map((e) => (
                <button
                  key={e.key}
                  role="tab"
                  aria-selected={active === e.key}
                  className={`equip-tab ${active === e.key ? 'on' : ''}`}
                  onClick={() => setActive(e.key)}
                >
                  <b>{e.name}</b>
                  <span>{e.d}</span>
                  <ul>{e.specs.map((s) => <li key={s}>{s}</li>)}</ul>
                </button>
              ))}
            </div>

            <div className="cta-row hide-m">
              <Btn href="#freight-form">Get a Free Freight Quote</Btn>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <Reveal className="lanes">
          <div>
            <small>Service area</small>
            <div className="chips">
              {[...CITIES, 'Surrounding Triad', 'North Carolina', 'Regional lanes'].map((c) => <span key={c}>{c}</span>)}
            </div>
          </div>
          <Btn href="#freight-form" variant="amber">Get a Free Freight Quote</Btn>
        </Reveal>

        <Reveal>
          <LeadForm
            id="freight-form"
            kind="freight"
            title="Free Freight Quote"
            note="Send your shipment details and we will review the equipment, pickup and delivery."
            fields={FREIGHT_FIELDS}
            cta="Get My Free Freight Quote"
          />
        </Reveal>
      </div>
    </section>
  )
}
