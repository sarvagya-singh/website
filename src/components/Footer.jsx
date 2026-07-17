import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-copyright">© 2026 Sarvagya Singh</div>
      <div className="footer-links">
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </footer>
  )
}
