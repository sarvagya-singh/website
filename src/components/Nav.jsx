import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { allProjects } from '../data/allProjects'

const drawerProjects = allProjects.slice(0, 3)
const accents = ['orange', 'wine', 'pink']
const supportsHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [darkSurface, setDarkSurface] = useState(true)
  const closeTimer = useRef(null)
  const location = useLocation()

  const cancelClose = () => window.clearTimeout(closeTimer.current)
  const queueClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpen(false), 190)
  }

  useEffect(() => setOpen(false), [location.pathname, location.search])
  useEffect(() => {
    let frame
    const updateSurface = () => {
      frame = null
      const candidate = document.elementsFromPoint(70, 46).find((element) => !element.closest('.floating-nav'))
      let element = candidate
      let color = 'rgb(5, 5, 5)'
      while (element) {
        const background = window.getComputedStyle(element).backgroundColor
        if (background && background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') { color = background; break }
        element = element.parentElement
      }
      const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) || [5, 5, 5]
      setDarkSurface((channels[0] * 299 + channels[1] * 587 + channels[2] * 114) / 1000 < 145)
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateSurface) }
    updateSurface()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) window.cancelAnimationFrame(frame) }
  }, [location.pathname])
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    if (open && window.innerWidth <= 720) document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      cancelClose()
    }
  }, [open])

  return (
    <header className={`floating-nav ${darkSurface ? 'on-dark' : 'on-light'}`}>
      <div
        className="nav-work-shell"
        onMouseEnter={() => { if (supportsHover()) { cancelClose(); setOpen(true) } }}
        onMouseLeave={() => { if (supportsHover()) queueClose() }}
      >
        <button
          type="button"
          className="nav-work-trigger"
          aria-expanded={open}
          aria-controls="work-drawer"
          onClick={() => setOpen((value) => (supportsHover() ? true : !value))}
          data-cursor="open"
        >
          <i aria-hidden="true" />
          <span>work</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.aside
              id="work-drawer"
              className="work-drawer"
              initial={{ opacity: 0, clipPath: 'inset(0 0 92% 0 round 18px)', y: -5 }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 18px)', y: 0 }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 92% 0 round 18px)', y: -5 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="drawer-title"><button type="button" onClick={() => setOpen(false)} aria-label="Close work menu">×</button></div>
              <div className="drawer-projects">
                {drawerProjects.map((project, index) => (
                  <Link key={project.id} to={`/projects?project=${project.id}`} className="drawer-project" data-cursor="view">
                    <img src={project.thumbnail} alt="" />
                    <span><b className={`pill-${accents[index]}`}>{project.tag.split('·')[0].trim()}</b><strong>{project.title}</strong></span>
                  </Link>
                ))}
              </div>
              <Link to="/projects" className="drawer-all">All my work <span>↗</span></Link>
              <div className="drawer-secondary"><Link to="/about">My story</Link><Link to="/contact">Say hello</Link></div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <Link to="/" className="nav-signature" aria-label="sarvagyasinghs.com — home" data-cursor="home">sarvagyasinghs.com</Link>

      <Link to="/contact" className="nav-contact" aria-label="Contact Sarvagya" data-cursor="hello">
        <span>say hello</span><b>↗</b>
      </Link>
    </header>
  )
}
