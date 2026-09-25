import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function ProjectCaseStudy({ project, onClose }) {
  const reduceMotion = useReducedMotion()
  const [activeImage, setActiveImage] = useState(null)
  const images = useMemo(() => project?.gallery?.filter((item) => item.type === 'image') || [], [project])

  useEffect(() => setActiveImage(null), [project])
  useEffect(() => {
    if (!project) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') activeImage === null ? onClose() : setActiveImage(null)
      if (activeImage !== null && event.key === 'ArrowRight') setActiveImage((activeImage + 1) % images.length)
      if (activeImage !== null && event.key === 'ArrowLeft') setActiveImage((activeImage - 1 + images.length) % images.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [project, onClose, activeImage, images.length])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="case-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>
          <motion.article className="case-modal" role="dialog" aria-modal="true" aria-labelledby={`case-title-${project.id}`} initial={reduceMotion ? false : { y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.76, 0, 0.24, 1] }}>
            <header className="case-modal-header"><span>project field note · {project.tag}</span><button type="button" onClick={onClose} aria-label="Close case study">×</button></header>

            <section className="case-hero" data-reveal>
              <div className="case-hero-shape" aria-hidden="true" />
              <p>{project.kicker}</p>
              <h2 id={`case-title-${project.id}`}>{project.title}</h2>
              <span className="case-role-pill">{project.role}</span>
            </section>

            {images[0] && <button type="button" className="case-lead-media" onClick={() => setActiveImage(0)} data-cursor="zoom" data-reveal="scale"><img src={images[0].src} alt={images[0].alt || images[0].label} /></button>}

            <section className="case-story">
              <div data-reveal="left"><span>the problem</span><p>{project.overview}</p></div>
              <div data-reveal="right"><span>what I built</span><ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </section>

            <section className="case-impact" aria-labelledby={`case-result-${project.id}`}>
              <header data-reveal><span id={`case-result-${project.id}`}>what came of it</span><p>{project.result}</p></header>
              {project.impact.map((item, index) => <div key={item} data-reveal="scale" style={{ '--reveal-delay': `${index * 80}ms` }}><small>0{index + 1}</small><strong>{item}</strong></div>)}
            </section>

            <section className="case-gallery" aria-label={`${project.title} screenshots`}>
              {images.slice(1).map((item, index) => (
                <button type="button" key={item.src} className={`case-gallery-item gallery-item-${index + 1}`} onClick={() => setActiveImage(index + 1)} data-cursor="zoom" data-reveal={index % 2 ? 'right' : 'left'}>
                  <img src={item.src} alt={item.alt || item.label} loading="lazy" /><span>{item.label}</span>
                </button>
              ))}
            </section>

            <section className="case-build-notes section-black">
              <div data-reveal="left"><span>in one line</span><p>{project.desc}</p></div>
              <div data-reveal="right"><span>toolbox</span><p>{project.stack.join(' · ')}</p></div>
            </section>

            <button type="button" className="case-end-close" onClick={onClose}>Back to all work ↗</button>
          </motion.article>

          <AnimatePresence>
            {activeImage !== null && images[activeImage] && (
              <motion.div className="case-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActiveImage(null)}>
                <div className="case-lightbox-shell" onMouseDown={(event) => event.stopPropagation()}>
                  <div className="case-lightbox-topbar"><span>{activeImage + 1} / {images.length} · {images[activeImage].label}</span><button type="button" onClick={() => setActiveImage(null)} aria-label="Close screenshot viewer">×</button></div>
                  <div className="case-lightbox-media"><img src={images[activeImage].src} alt={images[activeImage].alt || images[activeImage].label} /></div>
                  <div className="case-lightbox-nav"><button type="button" onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}>← prev</button><button type="button" onClick={() => setActiveImage((activeImage + 1) % images.length)}>next →</button></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
