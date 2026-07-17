import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { projects } from '../data/projects'

export default function SelectedWork() {
  return (
    <section className="work-section texture-panel">
      <div className="texture-band" aria-hidden="true">
        <span>selected work</span>
        <span>selected work</span>
        <span>selected work</span>
        <span>selected work</span>
      </div>

      <div className="work-shell">
        <div className="work-header">
          <div>
            <div className="work-kicker">Projects</div>
            <h2 className="work-heading">Selected work, built to matter.</h2>
          </div>
          <p className="work-summary">
            A compact view of the systems I care about most: AI products, public-service software,
            and tools with real operational weight.
          </p>
          <Link to="/projects" className="work-link">All projects →</Link>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link to="/projects" className="work-card">
                <div className="work-card-visual">
                  <img src={p.thumbnail} alt={`${p.title} thumbnail`} loading="lazy" />
                </div>
                <div className="work-card-body">
                  <div className="work-card-tag">{p.tag}</div>
                  <h3 className="work-card-title">{p.title}</h3>
                  <p className="work-card-desc">{p.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
