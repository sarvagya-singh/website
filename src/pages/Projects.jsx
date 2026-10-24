import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { allProjects } from '../data/allProjects'
import { papers } from '../data/papers'
import ProjectCaseStudy from '../components/ProjectCaseStudy'
import PaperViewer from '../components/PaperViewer'
import { Label, Print, Star } from '../components/Art'

export default function Projects() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedPaper, setSelectedPaper] = useState(null)
  const projectId = new URLSearchParams(location.search).get('project')
  const selectedProject = allProjects.find((project) => project.id === projectId) || null

  useEffect(() => {
    if (projectId && !selectedProject) navigate('/projects', { replace: true })
  }, [projectId, selectedProject, navigate])

  const openProject = (project) => navigate(`/projects?project=${project.id}`)
  const closeProject = () => navigate('/projects', { replace: true })

  return (
    <>
      <section className="page-head">
        <p className="eyebrow" data-reveal>The archive · 2024–2026</p>
        <h1 data-reveal>Six projects, and <em>how they were built.</em></h1>
        <p data-reveal>One I’m building now, three built inside organisations, one on my own, and one hackathon prototype. Each covers the problem, what I built, and what came of it.</p>
      </section>

      <section className="archive">
        {allProjects.map((project, index) => (
          <button key={project.id} type="button" className="archive-row" onClick={() => openProject(project)} data-reveal>
            <span className="archive-no">No. {String(index + 1).padStart(2, '0')}</span>
            <Print src={project.thumbnail} alt="" className="archive-print print-ui" />
            <div className="archive-copy">
              <p className="eyebrow">{project.tag}</p>
              <h2>{project.title}</h2>
              <p>{project.desc}</p>
              <ul className="archive-impact">{project.impact.map((item) => <li key={item}><Star className="tiny-star" />{item}</li>)}</ul>
              <span className="text-link">Read the case study</span>
            </div>
          </button>
        ))}
      </section>

      <section className="papers">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Research shelf</p>
          <h2>Four papers from MIT Manipal.</h2>
          <p>Coursework and research. Open one to read it in full.</p>
        </header>
        <div className="papers-grid">
          {papers.map((paper, index) => (
            <button key={paper.id} type="button" className="paper" onClick={() => setSelectedPaper(paper)} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
              <Label top={<span>{paper.field}</span>} bottom={<span>{paper.pages} pages</span>}>
                <img src={paper.preview} alt="" loading="lazy" />
                <h3>{paper.title}</h3>
              </Label>
            </button>
          ))}
        </div>
      </section>

      <ProjectCaseStudy project={selectedProject} onClose={closeProject} />
      <PaperViewer paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </>
  )
}
