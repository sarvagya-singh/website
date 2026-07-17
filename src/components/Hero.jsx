import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Photo from './Photo'
import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section className="hero-split">
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-eyebrow">{profile.tag}</div>
        <h1 className="hero-title">Intelligence engineered.<br />Adventure lived.</h1>
        <p className="hero-desc">{profile.bio}</p>
        <div className="hero-actions">
          <Link to="/projects" className="btn-solid">View Projects →</Link>
          <Link to="/contact" className="btn-outline">Get in touch</Link>
        </div>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-circle-decor" aria-hidden="true" />
        <div className="hero-photo-frame hero-photo-frame-landscape">
          <Photo src="photos/about/beach-silhouette.jpg" alt="Sarvagya walking along the beach in monochrome" className="hero-photo-image-beach" />
        </div>
      </motion.div>
    </section>
  )
}
