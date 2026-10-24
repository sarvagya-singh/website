import { useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ease = [0.76, 0, 0.24, 1]

function firstVisit() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try { return !sessionStorage.getItem('intro-seen') } catch { return true }
}

// Once per visit: a vermilion curtain with the name, which lifts off the page.
export default function Intro() {
  const [show, setShow] = useState(firstVisit)

  useLayoutEffect(() => {
    if (!show) return
    try { sessionStorage.setItem('intro-seen', '1') } catch { /* private mode */ }
    // Hold the hero's own entrance until the curtain is up.
    document.documentElement.style.setProperty('--intro-delay', '1.9s')
    setTimeout(() => document.documentElement.style.removeProperty('--intro-delay'), 6000)
    const timer = setTimeout(() => setShow(false), 1500)
    return () => clearTimeout(timer)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="intro" aria-hidden="true" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease }}>
          <motion.p className="intro-word" lang="hi" initial={{ scale: 0.4, rotate: -8, opacity: 0 }} animate={{ scale: 1, rotate: -3, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}>सर्वज्ञ</motion.p>
          <motion.p className="intro-line" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>Sarvagya Singh · No. 001 · Bangalore</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
