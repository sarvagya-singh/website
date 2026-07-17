import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ProjectCaseStudy from '../components/ProjectCaseStudy'
import { allProjects } from '../data/allProjects'
import ResearchPapers from '../components/ResearchPapers'
import PaperViewer from '../components/PaperViewer'
import { papers } from '../data/papers'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedPaper, setSelectedPaper] = useState(null)
  const openProject = (project) => {
    setSelectedPaper(null)
    setSelectedProject(project)
  }
  const openPaper = (paper) => {
    setSelectedProject(null)
    setSelectedPaper(paper)
  }

  return (
    <>
      <section className="page-hero page-hero-narrow">
        <Reveal>
          <div className="hero-eyebrow">Selected Work</div>
          <h1 className="hero-title hero-title-sm">Platforms, pipelines &amp; the odd RAG system.</h1>
          <p className="hero-desc">Five projects spanning enterprise AI, market intelligence and public-service software — built solo and in small teams, in production and in research. Select any project for the full case study.</p>
        </Reveal>
      </section>

      <section className="projects-list">
        {allProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <button className={`project-row${p.reverse ? ' reverse' : ''}`} type="button" onClick={() => openProject(p)} aria-label={`Open case study: ${p.title}`}>
              <div className="project-visual">
                <img src={p.thumbnail} alt={`${p.title} thumbnail`} loading="lazy" />
              </div>
              <div className="project-info">
                <div className="project-tag">{p.tag}</div>
                <h2 className="project-title">{p.title}</h2>
                <p className="project-desc">{p.desc}</p>
                <div className="project-stack">
                  {p.stack.map((s) => (
                    <span className="project-stack-pill" key={s}>{s}</span>
                  ))}
                </div>
                <span className="project-open">View case study <b>↗</b></span>
              </div>
            </button>
          </Reveal>
        ))}
      </section>

      <ResearchPapers papers={papers} onOpenPaper={openPaper} />

      <section className="cta-section">
        <Reveal>
          <h2 className="cta-title">More on GitHub &amp; LinkedIn.</h2>
          <div className="cta-actions">
            <a href="https://github.com/sarvagya-singh" target="_blank" rel="noreferrer" className="btn-solid">GitHub →</a>
            <Link to="/contact" className="btn-outline-light">Contact me</Link>
          </div>
        </Reveal>
      </section>
      <ProjectCaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />
      <PaperViewer paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </>
  )
}
