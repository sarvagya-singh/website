import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/profile'
import { Caricature, Rose } from './Art'

export default function Footer() {
  // Keyed by page so the footer remounts and replays its reveal on every navigation.
  const { pathname } = useLocation()
  return (
    <footer className="footer" key={pathname}>
      <div className="footer-stamp gloss" data-reveal style={{ '--tilt': '-2deg' }}>
        <div className="footer-stamp-face">
          <Rose className="footer-rose" />
          <div className="footer-stamp-band"><span>भारत · India</span><span>₹ 5</span></div>
          <Caricature />
          <h2>Say namaste</h2>
          <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
      <div className="footer-links">
        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">linkedin</a>
        <a href={profile.githubUrl} target="_blank" rel="noreferrer">github</a>
        <a href="https://nazara.club/u/sarvagyasinghs" target="_blank" rel="noreferrer">nazara</a>
      </div>
      <p className="footer-giant" aria-hidden="true">
        {'Sarvagya'.split('').map((letter, i) => <span key={i} style={{ '--i': i }}>{letter}</span>)}
      </p>
      <div className="footer-bottom">
        <span>Made in India · Price: 0 ps.</span>
        <span lang="hi" className="footer-thanks">धन्यवाद</span>
        <nav aria-label="Footer"><Link to="/projects">Work</Link><Link to="/about">About</Link><span>© 2026 Sarvagya Singh</span></nav>
      </div>
    </footer>
  )
}
