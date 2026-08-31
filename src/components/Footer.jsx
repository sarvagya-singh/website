import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid" data-reveal>
        <div><span className="footer-pill">current status</span><strong>building useful<br />AI systems</strong></div>
        <div><span className="footer-pill">basecamp</span><strong>Bangalore, India<br />open to the world</strong></div>
        <div><span className="footer-pill">contact</span><a href={`mailto:${profile.email}`} data-cursor="email">{profile.email}</a><div className="footer-socials"><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a></div></div>
      </div>

      <div className="footer-signature" aria-hidden="true" data-reveal>Sarvagya</div>
      <div className="footer-sticker sticker-code">&lt;/&gt;</div>
      <div className="footer-sticker sticker-ring">K.O.</div>
      <div className="footer-burst">built<br />different</div>

      <div className="footer-bottom"><span>© 2026 Sarvagya Singh</span><div><Link to="/projects">Work</Link><Link to="/about">Story</Link><Link to="/contact">Contact</Link></div></div>
    </footer>
  )
}
