import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function PaperViewer({ paper, onClose }) {
  const reduceMotion = useReducedMotion()
  const pdfSrc = paper ? `${paper.pdf}#view=FitH&zoom=page-fit&toolbar=1&navpanes=0&scrollbar=1` : ''

  useEffect(() => {
    if (!paper) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [paper, onClose])

  return (
    <AnimatePresence>
      {paper && (
        <motion.div
          className="paper-overlay"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          onMouseDown={onClose}
        >
          <motion.article
            className="paper-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`paper-title-${paper.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="paper-modal-header">
              <div>
                <div className="paper-modal-kicker">Research paper</div>
                <h3 id={`paper-title-${paper.id}`}>{paper.title}</h3>
                <p>{paper.field} · {paper.pages} pages</p>
              </div>
              <button className="paper-close" type="button" onClick={onClose} aria-label="Close paper viewer">
                ×
              </button>
            </header>

            <div className="paper-frame">
              <iframe
                src={pdfSrc}
                title={paper.title}
                loading="lazy"
              />
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
