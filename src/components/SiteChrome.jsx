import { useEffect, useState } from 'react';
import { PhoneIcon } from './Transportation.jsx';

const navigationItems = [
  ['Home', '#home'],
  ['Transportation', '#services'],
  ['Equipment', '#equipment'],
  ['Service Area', '#service-area'],
  ['Flooring', '#flooring'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.querySelector('.menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" aria-hidden="true" />
        Winston-Salem, NC <span className="announcement-divider">/</span> Local &amp; regional freight transportation
      </div>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="Flooring For All DBA Lil Man Big Van home" onClick={closeMenu}>
            <img className="brand-mark" src="/images/logo/lil-man-big-van-logo-192.png" width="68" height="68" alt="" />
            <span className="brand-copy"><small>Flooring For All DBA</small><strong>Lil Man Big Van</strong></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
          <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} id="primary-nav" aria-label="Main navigation">
            {navigationItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="nav-secondary" href="#flooring-form" onClick={closeMenu}>Flooring estimate</a>
            <a className="button button-small button-dark nav-quote" href="#freight-form" onClick={closeMenu}>
              Get a Freight Quote <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </header>
      <div className="scroll-progress" aria-hidden="true"><span /></div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-main">
        <div className="footer-brand">
          <a className="brand brand-footer" href="#home">
            <img className="brand-mark" src="/images/logo/lil-man-big-van-logo-192.png" width="92" height="92" alt="" loading="lazy" decoding="async" />
            <span className="brand-copy"><small>Flooring For All DBA</small><strong>Lil Man Big Van</strong></span>
          </a>
          <p>Reliable. Local. Professional.<br />Transportation first. Flooring services presented separately.</p>
        </div>
        <div className="footer-column">
          <b>Explore</b>
          <a href="#services">Transportation</a><a href="#equipment">Equipment</a><a href="#flooring">Flooring Services</a>
          <a href="#our-work">Project gallery</a><a href="#reviews">Customer reviews</a><a href="#service-area">Service area</a>
        </div>
        <div className="footer-column">
          <b>Reach our team</b>
          <a href="tel:+13369556193">336-955-6193</a>
          <a href="mailto:Nathanw.logistics@gmail.com">Nathanw.logistics@gmail.com</a><a href="mailto:Lilman.bigvan@gmail.com">Lilman.bigvan@gmail.com</a>
        </div>
        <div className="footer-location">
          <b>Flooring For All LLC</b>
          <address>DBA Lil Man Big Van<br />Winston-Salem, NC</address>
          <span>USDOT 4327224 · MC-1689088</span>
          <span>Transportation serving the Triad and regional freight lanes.</span>
          <a className="footer-up" href="#home">Back to top ↑</a>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© <span id="year">{new Date().getFullYear()}</span> Flooring For All LLC DBA Lil Man Big Van</span>
        <span>DBA means “doing business as.”</span>
        <span>Built on local knowledge. Ready for what’s next.</span>
      </div>
    </footer>
  );
}

export function MobileActions() {
  return (
    <div className="mobile-actions" aria-label="Quick actions">
      <a href="tel:+13369556193"><PhoneIcon /> Call 336-955-6193</a>
      <a href="#freight-form"><span aria-hidden="true">↗</span> Get a freight quote</a>
    </div>
  );
}
