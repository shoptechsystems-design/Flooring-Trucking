import { useCallback, useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'lmbv-welcome-seen';

// Hotspots sit over the two buttons printed in the banner image (percent of image size).
const choices = [
  { id: 'freight-form', label: 'Freight quote', hint: 'Trucking & logistics', className: 'welcome-hotspot-freight' },
  { id: 'flooring-form', label: 'Request estimate', hint: 'Flooring & installation', className: 'welcome-hotspot-flooring' },
];

function goToForm(id) {
  const form = document.getElementById(id);
  if (!form) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  window.setTimeout(() => form.querySelector('input:not([type=hidden]):not([name=_honey])')?.focus({ preventScroll: true }), reduceMotion ? 0 : 650);
}

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const lastFocus = useRef(null);

  // Show once per browser session, shortly after the page lands. Never rendered on the server.
  useEffect(() => {
    let seen = false;
    try { seen = window.sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* storage blocked */ }
    if (seen) return undefined;
    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback((targetId) => {
    setOpen(false);
    try { window.sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked */ }
    if (targetId) window.setTimeout(() => goToForm(targetId), 60);
    else lastFocus.current?.focus?.({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('.welcome-close')?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') { close(); return; }
      if (event.key !== 'Tab') return;
      const focusable = [...dialogRef.current.querySelectorAll('button')].filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="welcome-overlay" onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="welcome-dialog" role="dialog" aria-modal="true" aria-labelledby="welcome-title" ref={dialogRef}>
        <h2 id="welcome-title" className="visually-hidden">Lil Man Big Van and Flooring For All — choose a service</h2>
        <button type="button" className="welcome-close" aria-label="Close" onClick={() => close()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <div className="welcome-art">
          <img
            src="/images/welcome-banner.webp"
            srcSet="/images/welcome-banner-768.webp 768w, /images/welcome-banner.webp 1536w"
            sizes="(max-width: 820px) 100vw, 980px"
            width="1536"
            height="1024"
            alt="Lil Man Big Van trucking, logistics and freight solutions, and Flooring For All flooring and installation. Small enough to care, big enough to deliver. Winston-Salem, NC."
          />
          {choices.map((choice) => (
            <button key={choice.id} type="button" className={`welcome-hotspot ${choice.className}`} aria-label={choice.label} onClick={() => close(choice.id)} />
          ))}
        </div>
        <div className="welcome-actions">
          {choices.map((choice) => (
            <button key={choice.id} type="button" className={`welcome-action ${choice.className}`} onClick={() => close(choice.id)}>
              <span><b>{choice.label}</b><small>{choice.hint}</small></span>
              <span aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
