import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import JourneyStack from '../components/JourneyStack'
import { education, journeyStories, skills } from '../data/about'

export default function About() {
  return (
    <>
      <section className="hero-split">
        <Reveal className="hero-copy">
          <div className="hero-eyebrow">About</div>
          <h1 className="hero-title hero-title-sm">Same discipline, two arenas.</h1>
          <p className="hero-desc">
            I'm a final-year CS &amp; AI/ML student at Manipal Institute of Technology, currently a
            Technology Consulting Intern at KPMG, where I build LLM-powered platforms that hit
            production. I've also spent the last five years training as an alpine mountaineer and
            competitive boxer.
          </p>
          <p className="hero-desc">
            Both worlds run on the same loop: prepare relentlessly, expect conditions to change, and
            adjust without panicking. It's why I ship fast under ambiguity, and why I keep going
            back to altitude.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="hero-visual" variant="photo">
          <div className="hero-circle-decor hero-circle-decor-left" aria-hidden="true" />
          <div className="hero-photo-frame hero-photo-frame-landscape">
            <Photo
              src="photos/about/kang-yatse-ridge.jpg"
              alt="A climbing team ascending a snowy ridge on Kang Yatse II"
            />
          </div>
        </Reveal>
      </section>

      <section className="edu-section">
        <h2 className="section-heading">Education &amp; experience</h2>
        <div className="edu-list">
          {education.map((row) => (
            <Reveal key={row.title}>
              <div className="edu-row">
                <div>
                  <div className="edu-title">{row.title}</div>
                  <div className="edu-sub">{row.sub}</div>
                </div>
                <div className="edu-date">{row.date}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <JourneyStack stories={journeyStories} />

      <section className="skills-section">
        <h2 className="section-heading">Skills &amp; achievements</h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="skill-card">
                <div className="skill-card-title">{s.title}</div>
                <p className="skill-card-body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="offclock-section">
        <Reveal className="offclock-photo" variant="photo">
          <Photo src="photos/pink-car.jpg" alt="A modified pink Maruti 800 parked under palm trees" />
        </Reveal>
        <Reveal delay={0.1} className="duo-copy">
          <div className="duo-kicker">Off the clock</div>
          <h2 className="duo-heading">I also just really like weird machines.</h2>
          <p className="duo-body">
            That lime-green-rimmed pink Maruti 800 is mine; sourced from Kerala and built out over
            college. I am a firm believer that every good engineer needs a project that
            isn't on a screen.
          </p>
        </Reveal>
      </section>

      <section className="cta-section">
        <Reveal>
          <h2 className="cta-title">Want the technical details?</h2>
          <div className="cta-actions">
            <Link to="/projects" className="btn-solid">View Projects →</Link>
            <Link to="/contact" className="btn-outline-light">Contact me</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
