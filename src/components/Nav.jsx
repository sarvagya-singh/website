import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LEFT_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
]
const RIGHT_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setMobileOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      className={`nav-wrap${scrolled ? ' nav-scrolled' : ''}`}
      initial={{ opacity: 0, y: -36 }}
      animate={{ opacity: 1, y: scrolled ? -13 : 0, scale: scrolled ? 0.97 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="nav-cluster" aria-label="Main navigation">
        <div className="nav-pill">
          {LEFT_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <NavLink to="/" className="nav-crest" aria-label="Sarvagya Singh — home">
          <img src="brand/logo-mark.png" alt="" className="nav-crest-mark" draggable={false} />
        </NavLink>

        <div className="nav-pill">
          {RIGHT_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-panel"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16 }}
          >
            {ALL_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-mobile-link${isActive ? ' active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
