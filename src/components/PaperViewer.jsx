import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { lockScroll } from '../lib/scroll'

export default function PaperViewer({ paper, onClose }) {
  const reduceMotion = useReducedMotion()
  const pdfSrc = paper ? `${paper.pdf}#view=FitH&zoom=page-fit&toolbar=1&navpanes=0&scrollbar=1` : ''

  useEffect(() => {
    if (!paper) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    lockScroll(true)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [paper, onClose])

  return (
    <AnimatePresence>
      {paper && (
        <motion.div className="overlay" data-lenis-prevent role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }} onMouseDown={onClose}>
          <motion.article
            className="paper-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`paper-title-${paper.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="case-bar">
              <div>
                <p className="eyebrow">{paper.field} · {paper.pages} pages</p>
                <h3 id={`paper-title-${paper.id}`}>{paper.title}</h3>
              </div>
              <button className="close" type="button" onClick={onClose} aria-label="Close paper viewer">×</button>
            </header>
            <iframe src={pdfSrc} title={paper.title} loading="lazy" />
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
