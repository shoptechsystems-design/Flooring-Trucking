import { Reveal, Lines, Eyebrow } from './Ui'
import { SITE } from '../data/site'

export function About() {
  const facts = [
    ['Company', SITE.legal],
    ['Doing business as', SITE.brand],
    ['Authority', 'Motor Carrier of Property'],
    ['Based in', SITE.city],
    ['USDOT', SITE.usdot],
    ['MC number', SITE.mc],
  ]
  return (
    <section id="about" className="about">
      <div className="wrap about-grid">
        <div>
          <Eyebrow n="04">About</Eyebrow>
          <Lines className="h2" lines={['Dependable capacity.', { text: 'Hands-on flooring expertise.', className: 'amber' }]} />
          <Reveal>
            <p>
              {SITE.brand}, operated by {SITE.legal}, is a Winston-Salem based company that combines dependable transportation capacity with hands-on flooring experience.
            </p>
            <p>
              Our freight division moves shipments with a 26-ft box truck and a Sprinter van. Our flooring division handles LVP installation, removal and demolition. Two specialties, one standard: reliable, local and professional.
            </p>
          </Reveal>
        </div>
        <div className="facts">
          {facts.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06} className="fact">
              <small>{k}</small>
              <b>{v}</b>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
