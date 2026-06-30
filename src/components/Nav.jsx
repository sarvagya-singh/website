import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const location = useLocation()
  const dropRef = useRef(null)

  const isMarketStudy = location.pathname.includes('earnings') || location.pathname.includes('untapped')

  useEffect(() => {
    function onOutsideClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropOpen(false)
  }, [location.pathname])

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-brand">sarvagyasinghs.com</NavLink>

        {/* Desktop */}
        <div className="nav-desktop">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Brainstorm
          </NavLink>
          <NavLink
            to="/feature-landscape"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Feature Landscape
          </NavLink>

          <div className="nav-drop-wrap" ref={dropRef}>
            <button
              className={`nav-link nav-drop-btn${isMarketStudy ? ' active' : ''}`}
              onClick={() => setDropOpen(p => !p)}
            >
              Market Study
              <span className={`drop-arrow${dropOpen ? ' open' : ''}`}>▾</span>
            </button>
            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  className="drop-menu"
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                >
                  <NavLink
                    to="/earnings-intelligence"
                    className={({ isActive }) => `drop-item${isActive ? ' active' : ''}`}
                  >
                    Earnings Intelligence
                  </NavLink>
                  <NavLink
                    to="/untapped-knowledge"
                    className={({ isActive }) => `drop-item${isActive ? ' active' : ''}`}
                  >
                    Untapped Knowledge
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(p => !p)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <NavLink to="/" end className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}>
              Brainstorm
            </NavLink>
            <NavLink to="/feature-landscape" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}>
              Feature Landscape
            </NavLink>
            <div className="mobile-nav-section">Market Study</div>
            <NavLink to="/earnings-intelligence" className={({ isActive }) => `mobile-nav-link indent${isActive ? ' active' : ''}`}>
              Earnings Intelligence
            </NavLink>
            <NavLink to="/untapped-knowledge" className={({ isActive }) => `mobile-nav-link indent${isActive ? ' active' : ''}`}>
              Untapped Knowledge
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
