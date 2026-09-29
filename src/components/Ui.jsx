import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

export const ease = [0.2, 0.7, 0.2, 1]

export function Reveal({ children, delay = 0, y = 36, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Tag>
  )
}

/** Headline where every line slides up out of a mask. */
export function Lines({ lines, className = '', delay = 0, as = 'h2', inView = true, ...rest }) {
  const Tag = as
  const ref = useRef(null)
  // Observe the heading itself: the inner spans sit inside an overflow mask,
  // so an observer on them would never see them as visible.
  const seen = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const run = inView ? seen : true
  return (
    <Tag ref={ref} className={className} {...rest}>
      {lines.map((l, i) => {
        const text = typeof l === 'string' ? l : l.text
        const cls = typeof l === 'string' ? '' : l.className
        return (
          <span className="mask" key={i}>
            <motion.span
              className={`mask-in ${cls || ''}`}
              initial={{ y: '112%' }}
              animate={{ y: run ? 0 : '112%' }}
              transition={{ duration: 1, delay: delay + i * 0.11, ease }}
            >
              {text}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}

export function Eyebrow({ children, n }) {
  return (
    <span className="eyebrow">
      {n && <i>{n}</i>}
      {children}
    </span>
  )
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/** Button with a light magnetic pull on devices that hover. */
export function Btn({ href, variant = 'amber', children, className = '', arrow = true, type, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })
  const move = (e) => {
    if (!window.matchMedia('(hover:hover)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.16)
    y.set((e.clientY - r.top - r.height / 2) * 0.22)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }
  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      ref={ref}
      href={href}
      type={href ? undefined : type || 'button'}
      className={`btn btn-${variant} ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={leave}
      {...rest}
    >
      <span>{children}</span>
      {arrow && <Arrow />}
    </Tag>
  )
}

export const Icon = {
  pin: (
    <svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24"><path d="M3 8l9-4 9 4-9 4z" /><path d="M3 12l9 4 9-4M3 16l9 4 9-4" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 3z" /><path d="M9 10h6" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24"><path d="M2 6h11v9H2zM13 9h4l3 3v3h-7z" /><circle cx="6" cy="17" r="1.8" /><circle cx="16" cy="17" r="1.8" /></svg>
  ),
  plank: (
    <svg viewBox="0 0 24 24"><path d="M3 6h18v4H3zM3 14h18v4H3z" /><path d="M9 6v4M15 14v4" /></svg>
  ),
}
