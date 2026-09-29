import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Reveal, Lines, Eyebrow, Btn, Icon } from './Ui'
import { WHY, FLOOR_STEPS, FREIGHT_STEPS } from '../data/site'

const WHY_ICONS = [Icon.pin, Icon.shield, Icon.layers, Icon.chat]

export function Why() {
  return (
    <section className="why">
      <div className="wrap">
        <Eyebrow n="03">Why choose us</Eyebrow>
        <Lines className="h2" lines={['One professional company.', { text: 'Two specialized divisions.', className: 'amber-d' }]} />
        <div className="bento">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={(i % 2) * 0.1} className={`bento-i b${i + 1}`}>
              <div className="ic">{WHY_ICONS[i]}</div>
              <span className="bn">0{i + 1}</span>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Timeline({ eyebrow, title, steps, cta, href }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 65%'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  return (
    <div className="tl-block" ref={ref}>
      <div className="tl-head">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Lines className="h2" lines={[title]} />
        </div>
        <Btn href={href} variant="line">{cta}</Btn>
      </div>
      <div className="tl">
        <div className="tl-rail" aria-hidden="true"><motion.i style={{ scaleX: p, scaleY: p }} /></div>
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} className="step">
            <div className="dot">{s.n}</div>
            <div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function Process() {
  return (
    <section className="process">
      <div className="wrap">
        <Timeline eyebrow="How it works · Flooring" title="Flooring, step by step." steps={FLOOR_STEPS} cta="Free Estimate" href="#flooring-form" />
        <Timeline eyebrow="How it works · Freight" title="Freight, step by step." steps={FREIGHT_STEPS} cta="Free Quote" href="#freight-form" />
      </div>
    </section>
  )
}
