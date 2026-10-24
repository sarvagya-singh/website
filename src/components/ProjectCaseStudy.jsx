import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { lockScroll } from '../lib/scroll'
import { Lotus, Star } from './Art'

const ease = [0.22, 1, 0.36, 1]

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
    lockScroll(true)
    window.addEventListener('keydown', onKey)
    return () => { lockScroll(false); window.removeEventListener('keydown', onKey) }
  }, [project, onClose, activeImage, images.length])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="overlay" data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35 }} onMouseDown={onClose}>
          <motion.article
            className="case"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-title-${project.id}`}
            initial={reduceMotion ? false : { y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: 40, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="case-bar">
              <span className="eyebrow">{project.tag}</span>
              <button type="button" className="close" onClick={onClose} aria-label="Close case study">×</button>
            </header>

            <section className="case-hero">
              <Lotus className="case-lotus" />
              <p className="hand case-kicker">{project.kicker}</p>
              <h2 id={`case-title-${project.id}`}>{project.title}</h2>
              <p className="case-role">{project.role}</p>
              {project.url && <a className="button button-sindoor" href={project.url} target="_blank" rel="noreferrer">Visit {project.url.replace('https://', '')} ↗</a>}
            </section>

            {images[0] && (
              <button type="button" className="case-lead" onClick={() => setActiveImage(0)} aria-label={`Enlarge ${images[0].label}`}>
                <img src={images[0].src} alt={images[0].alt || images[0].label} />
              </button>
            )}

            <section className="case-story">
              <div><p className="eyebrow">The problem</p><p className="case-lead-text">{project.overview}</p></div>
              <div><p className="eyebrow">What I built</p><ul>{project.highlights.map((item) => <li key={item}><Star className="tiny-star" />{item}</li>)}</ul></div>
            </section>

            <section className="case-result">
              <p className="eyebrow">What came of it</p>
              <p>{project.result}</p>
              <ol>{project.impact.map((item, index) => <li key={item}><small>0{index + 1}</small>{item}</li>)}</ol>
            </section>

            {images.length > 1 && (
              <section className="case-gallery" aria-label={`${project.title} screenshots`}>
                {images.slice(1).map((item, index) => (
                  <button type="button" key={item.src} onClick={() => setActiveImage(index + 1)}>
                    <img src={item.src} alt={item.alt || item.label} loading="lazy" />
                    <span><b>{item.label}</b>{item.note}</span>
                  </button>
                ))}
              </section>
            )}

            <section className="case-stack">
              <p className="eyebrow">Toolbox</p>
              <p>{project.stack.join(' · ')}</p>
            </section>

            <button type="button" className="text-link case-end" onClick={onClose}>Back to all work</button>
          </motion.article>

          <AnimatePresence>
            {activeImage !== null && images[activeImage] && (
              <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { event.stopPropagation(); setActiveImage(null) }}>
                <figure onMouseDown={(event) => event.stopPropagation()}>
                  <img src={images[activeImage].src} alt={images[activeImage].alt || images[activeImage].label} />
                  <figcaption>
                    <button type="button" onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)} aria-label="Previous screenshot">←</button>
                    <span>{activeImage + 1} / {images.length} · {images[activeImage].label}</span>
                    <button type="button" onClick={() => setActiveImage((activeImage + 1) % images.length)} aria-label="Next screenshot">→</button>
                    <button type="button" className="close" onClick={() => setActiveImage(null)} aria-label="Close screenshot viewer">×</button>
                  </figcaption>
                </figure>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
