import { motion, useReducedMotion } from 'framer-motion'

export default function ResearchPapers({ papers, onOpenPaper }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="papers-section">
      <div className="papers-shell">
        <div className="papers-header">
          <div className="papers-kicker">Research papers</div>
          <h2 className="papers-title">Glance through the papers if you want the research layer.</h2>
          <p className="papers-intro">
            These sit after the projects on purpose. They’re here to browse quickly, and each one
            opens in place without sending you off the site.
          </p>
        </div>

        <div className="papers-list">
          {papers.map((paper, index) => (
            <motion.button
              key={paper.id}
              type="button"
              className="paper-row"
              onClick={() => onOpenPaper(paper)}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.32 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="paper-row-preview" aria-hidden="true">
                <img src={paper.preview} alt="" />
              </div>
              <div className="paper-row-copy">
                <div className="paper-row-meta">{paper.field} · {paper.pages} pages</div>
                <h3 className="paper-row-title">{paper.title}</h3>
                <p className="paper-row-desc">
                  {paper.impact}
                </p>
              </div>
              <div className="paper-row-plus" aria-hidden="true">+</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
