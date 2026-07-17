import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function CaseVisual({ item, index }) {
  const { type } = item

  if (type === 'image') {
    return (
      <div className="case-visual case-visual-image">
        <img src={item.src} alt={item.alt || item.label} />
      </div>
    )
  }

  if (type === 'pipeline') {
    return <div className="case-visual case-visual-pipeline"><span>source</span><i /><span>classify</span><i /><span>brief</span></div>
  }
  if (type === 'model') {
    return <div className="case-visual case-visual-model"><b>LLM</b><span>Ollama</span><span>Anthropic</span><span>OpenAI</span></div>
  }
  if (type === 'search') {
    return <div className="case-visual case-visual-search"><div>search across records</div><span /><span /><span /></div>
  }
  if (type === 'evidence') {
    return <div className="case-visual case-visual-evidence"><q>Guidance increased sequentially.</q><i /><q>Margin outlook remains intact.</q></div>
  }
  if (type === 'mobile' || type === 'journal' || type === 'care') {
    return <div className={`case-visual case-visual-phone case-visual-${type}`}><div className="case-phone-top" /><div className="case-phone-copy" /><div className="case-phone-copy short" /><div className="case-phone-orb" /></div>
  }
  if (type === 'calendar') {
    return <div className="case-visual case-visual-calendar"><b>JUL</b>{[...Array(12)].map((_, i) => <span key={i} className={i === 6 ? 'selected' : ''}>{i + 1}</span>)}</div>
  }
  if (type === 'dashboard') {
    return <div className="case-visual case-visual-dashboard"><div className="case-bars">{[52, 78, 40, 91, 64].map((height, i) => <span key={i} style={{ height: `${height}%` }} />)}</div><div className="case-dashboard-list"><i /><i /><i /></div></div>
  }
  if (type === 'score') {
    return <div className="case-visual case-visual-score"><strong>{index === 2 ? '92' : '87'}</strong><small>/100 relevance</small><div><i /><i /><i /></div></div>
  }
  return <div className="case-visual case-visual-source"><b>RFQ</b><span>Opportunity summary</span><i /><i /><i /></div>
}

export default function ProjectCaseStudy({ project, onClose }) {
  const reducedMotion = useReducedMotion()
  const [activeImageIndex, setActiveImageIndex] = useState(null)
  const imageGallery = useMemo(
    () => (project?.gallery?.filter((item) => item.type === 'image') ?? []),
    [project],
  )

  useEffect(() => {
    setActiveImageIndex(null)
  }, [project])

  useEffect(() => {
    if (!project) return undefined

    const onKeyDown = (event) => {
      if (activeImageIndex !== null && imageGallery.length) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          setActiveImageIndex((current) => (current === 0 ? imageGallery.length - 1 : current - 1))
          return
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          setActiveImageIndex((current) => (current === imageGallery.length - 1 ? 0 : current + 1))
          return
        }
        if (event.key === 'Escape') {
          setActiveImageIndex(null)
          return
        }
      }
      if (event.key === 'Escape') onClose()
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose, activeImageIndex, imageGallery.length])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="case-overlay"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.24 }}
          onMouseDown={onClose}
        >
          <motion.article
            className="case-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-title-${project.id}`}
            initial={reducedMotion ? false : { opacity: 0, y: 42, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="case-modal-header">
              <div className="case-modal-tag">{project.tag}</div>
              <button className="case-close" type="button" onClick={onClose} aria-label="Close case study">×</button>
            </header>

            <div className="case-modal-intro">
              <p className="case-modal-kicker">{project.kicker}</p>
              <h2 id={`case-title-${project.id}`}>{project.title}</h2>
              <p>{project.overview}</p>
            </div>

            <section className="case-impact" aria-label="Project impact">
              {project.impact.map((item, index) => <div key={item}><span>0{index + 1}</span>{item}</div>)}
            </section>

            <section className="case-gallery" aria-label={`${project.title} project visuals`}>
              {project.gallery.map((item, index) => (
                <motion.figure
                  key={item.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, delay: 0.14 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  role={item.type === 'image' ? 'button' : undefined}
                  tabIndex={item.type === 'image' ? 0 : undefined}
                  aria-label={item.type === 'image' ? `Open ${item.label} full screen` : undefined}
                  onClick={item.type === 'image' ? () => setActiveImageIndex(index) : undefined}
                  onKeyDown={item.type === 'image'
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setActiveImageIndex(index)
                        }
                      }
                    : undefined}
                  className={item.type === 'image' ? 'case-gallery-item case-gallery-item-clickable' : 'case-gallery-item'}
                >
                  <CaseVisual item={item} index={index} />
                  <figcaption><strong>{item.label}</strong><span>{item.note}</span></figcaption>
                </motion.figure>
              ))}
            </section>

            <section className="case-detail-grid">
              <div>
                <span className="case-label">My role</span>
                <p>{project.role}</p>
              </div>
              <div>
                <span className="case-label">Toolbox</span>
                <div className="case-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </section>

            <section className="case-highlights">
              <span className="case-label">What I built</span>
              <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </motion.article>

          <AnimatePresence>
            {activeImageIndex !== null && imageGallery[activeImageIndex] && (
              <motion.div
                className="case-lightbox"
                role="presentation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                onMouseDown={(event) => {
                  event.stopPropagation()
                  setActiveImageIndex(null)
                }}
              >
                <motion.div
                  className="case-lightbox-shell"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${project.title} screenshot viewer`}
                  initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.99 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <div className="case-lightbox-topbar">
                    <div className="case-lightbox-counter">
                      Screenshot {activeImageIndex + 1} of {imageGallery.length}
                    </div>
                    <button
                      className="case-lightbox-close"
                      type="button"
                      onClick={() => setActiveImageIndex(null)}
                      aria-label="Close screenshot viewer"
                    >
                      ×
                    </button>
                  </div>

                  <div className="case-lightbox-media">
                    <img
                      src={imageGallery[activeImageIndex].src}
                      alt={imageGallery[activeImageIndex].alt || imageGallery[activeImageIndex].label}
                    />
                  </div>

                  <div className="case-lightbox-footer">
                    {imageGallery.length > 1 && (
                      <div className="case-lightbox-nav">
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex((current) => (current === 0 ? imageGallery.length - 1 : current - 1))}
                        >
                          ← Prev
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex((current) => (current === imageGallery.length - 1 ? 0 : current + 1))}
                        >
                          Next →
                        </button>
                      </div>
                    )}
                    <div className="case-lightbox-copy">
                      <strong>{imageGallery[activeImageIndex].label}</strong>
                      <p>{imageGallery[activeImageIndex].note}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
