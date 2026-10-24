import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Motif } from './Art'
import { scrollToTop } from '../lib/scroll'

const links = [
  ['/projects', 'Work', 'काम'],
  ['/about', 'About', 'परिचय'],
  ['https://nazara.club', 'Nazara', 'नज़ारा'],
  ['/contact', 'Say namaste', 'नमस्ते'],
]
const stickers = ['lotus', 'elephant', 'eye', 'diya', 'train', 'gloves', 'peaks']

// Each link rolls over to its Hindi twin on hover.
function Roll({ label, hi }) {
  return (
    <span className="roll">
      <span>{label}</span>
      <span lang="hi" aria-hidden="true">{hi}</span>
    </span>
  )
}

// A soap-box seal whose lettering turns as the page scrolls.
function Seal() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useSpring(useTransform(scrollY, (y) => (reduceMotion ? 0 : y / 5)), { stiffness: 60, damping: 18 })
  return (
    <span className="seal" aria-hidden="true">
      <motion.svg viewBox="0 0 100 100" style={{ rotate }}>
        <defs><path id="seal-ring" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" /></defs>
        <circle cx="50" cy="50" r="49" fill="#007A3D" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="#FFB800" strokeWidth="1.5" />
        <text fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="500" fill="#FFF8E6">
          <textPath href="#seal-ring" textLength="228" lengthAdjust="spacing">SARVAGYA SINGH ✦ BANGALORE ✦ </textPath>
        </text>
      </motion.svg>
      <b lang="hi">स</b>
    </span>
  )
}

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [sticker, setSticker] = useState(0)
  const fuse = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const spark = useTransform(fuse, (v) => `${v * 100}%`)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setHidden(y > (scrollY.getPrevious() ?? 0) && y > 260)
    setSticker(Math.floor(y / 420) % stickers.length)
  })

  return (
    <motion.header className="nav" animate={{ y: hidden ? '-120%' : '0%' }} transition={{ duration: 0.55, ease: [0.16, 0.84, 0.24, 1] }}>
      <Link to="/" className="nav-mark" aria-label="Sarvagya Singh, home">
        <Seal />
        <span className="nav-name">Sarvagya<br />Singh</span>
      </Link>

      <nav aria-label="Main">
        {links.map(([to, label, hi], index) => {
          const inner = <><small>0{index + 1}</small><Roll label={label} hi={hi} /></>
          return to.startsWith('http')
            ? <a key={to} href={to} target="_blank" rel="noreferrer" className="nav-link nav-ext">{inner}<i aria-hidden="true">↗</i></a>
            : (
              <NavLink key={to} to={to} className="nav-link">{inner}</NavLink>
            )
        })}
      </nav>

      <button type="button" className="nav-sticker" onClick={scrollToTop} aria-label="Back to top">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={stickers[sticker]}
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 40 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
          >
            <Motif name={stickers[sticker]} />
          </motion.span>
        </AnimatePresence>
      </button>

      <div className="fuse" aria-hidden="true">
        <motion.span className="fuse-burnt" style={{ scaleX: fuse }} />
        <motion.span className="fuse-spark" style={{ left: spark }}>
          <svg viewBox="0 0 20 28"><circle className="glow" cx="10" cy="16" r="10" fill="#FFD24A" opacity="0.6" /><path className="flame" d="M10 2C15 9 16 15 10 21C4 15 5 9 10 2Z" fill="#FFB800" /><path className="flame flame-in" d="M10 9C12.5 12 13 15 10 18C7 15 7.5 12 10 9Z" fill="#D71920" /></svg>
        </motion.span>
      </div>
    </motion.header>
  )
}
