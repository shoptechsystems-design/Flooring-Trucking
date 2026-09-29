import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Stage from '../three/Stage'
import FloorStory from '../three/FloorStory'
import LeadForm from './LeadForm'
import { Btn, Eyebrow, Lines, Reveal } from './Ui'
import { FLOOR_SERVICES, FLOOR_STEPS, FLOORING_FIELDS } from '../data/site'

const stepFor = (p) => (p < 0.14 ? 0 : p < 0.32 ? 1 : p < 0.68 ? 2 : 3)

export default function FlooringSection() {
  const track = useRef(null)
  const progress = useRef(0)
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progress.current = v
    const s = stepFor(v)
    setStep((prev) => (prev === s ? prev : s))
  })

  const cur = FLOOR_STEPS[step]

  return (
    <section id="flooring" className="floor-sec">
      <div ref={track} className="floor-track">
        <div className="floor-sticky">
          <div className="floor-copy">
            <Eyebrow n="02">Flooring &amp; Demolition</Eyebrow>
            <Lines className="h2" lines={['From Demolition to', { text: 'Beautiful New Floors.', className: 'amber' }]} />
            <p className="lead hide-m">
              Our team has hands-on experience with LVP flooring and flooring demolition. Request a <strong>free flooring estimate</strong> for homes and commercial spaces in Winston-Salem and the Triad.
            </p>

            <ol className="steps hide-m" aria-label="How flooring projects work">
              {FLOOR_STEPS.map((s, i) => (
                <li key={s.n} className={i === step ? 'on' : i < step ? 'past' : ''}>
                  <span className="sn">{s.n}</span>
                  <div>
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="step-now show-m" aria-live="polite">
              <span className="sn">{cur.n}</span>
              <div>
                <h4>{cur.t}</h4>
                <p>{cur.d}</p>
              </div>
            </div>

            <div className="prog"><motion.i style={{ scaleX: bar }} /></div>
            <div className="cta-row hide-m">
              <Btn href="#flooring-form">Free Flooring Estimate</Btn>
            </div>
          </div>

          <div className="floor-stage">
            <Stage camera={{ position: [-7, 11, 16], fov: 34 }} fallback={<div className="no-gl" />}>
              <FloorStory progress={progress} reduced={!!reduced} />
            </Stage>
            <div className="stage-tag"><i />{cur.tag}</div>
            <div className="stage-hint">Scroll to run the job</div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="svc-grid">
          {FLOOR_SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 0.08} className="svc">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <LeadForm
            id="flooring-form"
            kind="flooring"
            title="Free Flooring Estimate"
            note="Tell us about your project. Photos help us give you a better estimate."
            fields={FLOORING_FIELDS}
            cta="Request My Free Estimate"
          />
        </Reveal>
      </div>
    </section>
  )
}
