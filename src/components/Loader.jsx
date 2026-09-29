import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Loader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 0.85, ease: [0.7, 0, 0.2, 1] }}>
          <div className="loader-in">
            <motion.div className="loader-mark" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
              <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M9 20h7v18h12v6H9zM33 44V20h6l6 9 6-9h6v24h-6V31l-6 8-6-8v13z" fill="currentColor" /></svg>
            </motion.div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Lil Man Big Van</motion.span>
            <motion.div className="loader-bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
