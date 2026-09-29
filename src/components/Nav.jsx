import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV, SITE } from '../data/site'
import { Btn } from './Ui'

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className={`nav ${solid ? 'solid' : ''}`}>
        <div className="wrap nav-in">
          <a href="#home" className="brand" aria-label={`${SITE.brand} home`}>
            <span className="brand-mark">
              <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M9 20h7v18h12v6H9zM33 44V20h6l6 9 6-9h6v24h-6V31l-6 8-6-8v13z" fill="currentColor" /></svg>
            </span>
            <span className="brand-text">
              <b>{SITE.brand}</b>
              <small>Freight &amp; Flooring</small>
            </span>
          </a>
          <nav className="links" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <div className="nav-cta">
            <Btn href="#freight-form" className="btn-sm">Get a Quote</Btn>
          </div>
          <button className={`burger ${open ? 'open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {NAV.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.5 }}
              >
                <i>0{i + 1}</i>
                {n.label}
              </motion.a>
            ))}
            <a className="btn btn-amber" href="#freight-form" onClick={() => setOpen(false)}><span>Get a Quote</span></a>
            <a className="drawer-call" href={SITE.phones[0].href}>{SITE.phones[0].label}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
