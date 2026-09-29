import { Reveal, Lines, Eyebrow, Btn } from './Ui'
import { SITE } from '../data/site'

export function Reviews() {
  const slots = ['freight customer', 'flooring customer', 'customer']
  return (
    <section className="reviews">
      <div className="wrap">
        <Eyebrow n="06">Customer reviews</Eyebrow>
        <Lines className="h2" lines={['Trusted by Customers Who', 'Need the Job Done Right.']} />
        <div className="rev-grid">
          {slots.map((s, i) => (
            <Reveal key={s} delay={i * 0.1} className="rev">
              <div className="stars" aria-hidden="true">☆☆☆☆☆</div>
              <p>Placeholder for a future {s} review.</p>
              <small>Review coming soon</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() {
  return (
    <section className="final">
      <div className="wrap">
        <Lines className="final-h" lines={['Ready to Move Freight', 'or Transform Your Floors?']} />
        <Reveal delay={0.2}>
          <p>Tell us what you need. We’ll help you figure out the next step.</p>
        </Reveal>
        <Reveal delay={0.3} className="cta-row">
          <Btn href="#freight-form" variant="dark">Get a Free Freight Quote</Btn>
          <Btn href="#flooring-form" variant="outline-dark">Get a Free Flooring Estimate</Btn>
        </Reveal>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <Eyebrow n="07">Contact</Eyebrow>
        <Lines className="h2" lines={['Talk to our team.']} />
        <div className="c-grid">
          <Reveal className="c-box">
            <small>Call</small>
            {SITE.phones.map((p) => <a key={p.href} href={p.href}>{p.label}</a>)}
          </Reveal>
          <Reveal delay={0.1} className="c-box">
            <small>Email</small>
            {SITE.emails.map((e) => <a key={e} href={`mailto:${e}`}>{e}</a>)}
          </Reveal>
          <Reveal delay={0.2} className="c-box">
            <small>Based in</small>
            <a href="#area">{SITE.city} {SITE.zip}</a>
            <a href="#area">Serving the Triad &amp; North Carolina</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-word" aria-hidden="true">LIL MAN BIG VAN</div>
        <div className="foot-row">
          <span>{SITE.legal}, doing business as {SITE.brand}</span>
          <span>USDOT {SITE.usdot} · {SITE.mc}</span>
          <span>© {new Date().getFullYear()} {SITE.legal}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export function StickyBar() {
  return (
    <div className="sticky">
      <a className="btn btn-ghost" href={SITE.phones[0].href}><span>Call Now</span></a>
      <a className="btn btn-amber" href="#freight-form"><span>Get a Quote</span></a>
    </div>
  )
}
