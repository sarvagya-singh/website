import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function CTA() {
  return (
    <section className="cta-section">
      <Reveal>
        <h2 className="cta-title">Have a project, a summit, or both in mind?</h2>
        <Link to="/contact" className="btn-solid">Let's talk →</Link>
      </Reveal>
    </section>
  )
}
