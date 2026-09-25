import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { allProjects } from '../data/allProjects'
import { papers } from '../data/papers'
import ProjectCaseStudy from '../components/ProjectCaseStudy'
import PaperViewer from '../components/PaperViewer'

const ribbonWords = ['PROBLEM', 'BUILD', 'RESULT', 'REPEAT']

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
      <section className="work-page-hero section-black">
        <div className="work-ribbons" aria-hidden="true">
          {[0, 1, 2].map((row) => <div key={row} className={`work-ribbon ribbon-${row + 1}`}><span>{ribbonWords.map((word) => <b key={word}>{word}<i>✦</i><em>{word.toLowerCase()}</em><i>⌁</i></b>)}</span></div>)}
        </div>
        <div className="work-hero-copy" data-reveal><span>project archive · 2024—2026</span><h1>Five projects,<br />and <em>how they were built.</em></h1><p>Three built inside organisations, one on my own, and one hackathon prototype. Each one covers the problem, what I built, and what came of it.</p></div>
      </section>

      <section className="project-wall section-black">
        <div className="project-wall-grid">
          {allProjects.map((project, index) => {
            const hoverImage = project.gallery?.find((item) => item.type === 'image' && item.src !== project.thumbnail)?.src
            return (
              <button key={project.id} type="button" className={`wall-card wall-card-${index + 1}`} onClick={() => openProject(project)} data-cursor="open" data-reveal="scale" style={{ '--reveal-delay': `${(index % 3) * 80}ms` }}>
                <div className="wall-card-media"><img src={project.thumbnail} alt="" loading="lazy" /><img className="wall-card-hover" src={hoverImage || project.thumbnail} alt="" loading="lazy" /></div>
                <div className="wall-card-copy">
                  <div className="wall-card-meta"><span>{project.tag.split('·')[0].trim()}</span><b>{project.role}</b></div>
                  <h2>{project.title}</h2>
                  <p>{project.desc}</p>
                  <div className="wall-card-footer"><strong>{project.impact[0]}</strong><span>View project ↗</span></div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="research-rack">
        <header data-reveal><span>research shelf</span><h2>Research<br /><em>papers.</em></h2><p>Coursework and research from MIT Manipal. Open one to read it in full.</p></header>
        <div className="paper-cards">
          {papers.map((paper, index) => (
            <button key={paper.id} type="button" className={`paper-card paper-card-${index + 1}`} onClick={() => setSelectedPaper(paper)} data-cursor="read" data-reveal={index % 2 ? 'right' : 'left'} style={{ '--reveal-delay': `${(index % 2) * 80}ms` }}>
              <img src={paper.preview} alt="" loading="lazy" />
              <span>{paper.field}</span><h3>{paper.title}</h3><b>{paper.pages} pages ↗</b>
            </button>
          ))}
        </div>
      </section>

      <ProjectCaseStudy project={selectedProject} onClose={closeProject} />
      <PaperViewer paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </>
  )
}
