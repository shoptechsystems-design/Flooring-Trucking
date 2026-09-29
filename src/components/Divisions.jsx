import { Reveal, Lines, Eyebrow, Btn, Icon } from './Ui'
import { FREIGHT_LIST, FLOOR_LIST } from '../data/site'

export function Marquee() {
  const items = ['Reliable', 'Local', 'Professional', 'Freight', 'Flooring', 'Winston-Salem', 'The Triad', 'North Carolina']
  const row = (k) => (
    <div className="marquee-row" aria-hidden={k > 0}>
      {items.map((t, i) => (
        <span key={`${k}-${i}`}>
          {t}
          <i />
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        {row(0)}
        {row(1)}
      </div>
    </div>
  )
}

export default function Divisions() {
  return (
    <section className="divs" aria-labelledby="divs-h">
      <div className="wrap">
        <div className="divs-head">
          <Eyebrow n="00">Two divisions. One company.</Eyebrow>
          <Lines
            id="divs-h"
            className="h2"
            lines={['Whether you need freight moved', 'or flooring transformed,', { text: 'we’re ready to get the job done.', className: 'amber-d' }]}
          />
        </div>

        <div className="div-grid">
          <Reveal className="div-panel div-freight">
            <div className="road-art" aria-hidden="true" />
            <span className="div-n">01</span>
            <div className="div-ico">{Icon.truck}</div>
            <h3>Freight &amp; Transportation</h3>
            <p className="div-tag">Reliable transportation capacity when you need it.</p>
            <ul>{FREIGHT_LIST.map((t) => <li key={t}>{t}</li>)}</ul>
            <Btn href="#freight-form" variant="amber">Request a Free Freight Quote</Btn>
          </Reveal>

          <Reveal delay={0.12} className="div-panel div-floor">
            <div className="plank-art" aria-hidden="true" />
            <span className="div-n">02</span>
            <div className="div-ico">{Icon.plank}</div>
            <h3>Flooring &amp; Demolition</h3>
            <p className="div-tag">From tear-out to finished floors, we handle the job.</p>
            <ul>{FLOOR_LIST.map((t) => <li key={t}>{t}</li>)}</ul>
            <Btn href="#flooring-form" variant="dark">Get a Free Flooring Estimate</Btn>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
