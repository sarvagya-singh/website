import { useState } from 'react'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import { profile } from '../data/profile'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [project, setProject] = useState('')
  const [referral, setReferral] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = () => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'a visitor'}`)
    const bodyLines = [
      name ? `Name: ${name}` : '',
      email ? `Email: ${email}` : '',
      project ? `What you need: ${project}` : '',
      referral ? `How they found me: ${referral}` : '',
      '',
      message || '',
    ].filter(Boolean)

    const body = encodeURIComponent(bodyLines.join('\n'))
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="contact-page">
      <section className="page-hero page-hero-narrow contact-hero">
        <Reveal>
          <div className="hero-eyebrow contact-eyebrow">Contact</div>
          <h1 className="contact-display">Questions in mind?</h1>
          <p className="contact-lede">
            If you’re thinking about a product, a portfolio, an AI idea, or a build that needs
            both taste and execution, send it over. Based out of nowhere, the world is my playground :)
          </p>
        </Reveal>
      </section>

      <section className="contact-layout">
        <Reveal className="contact-side">
          <div className="contact-side-copy">
            <div className="contact-side-block">
              <div className="contact-side-label">Just a chat</div>
              <a href={`mailto:${profile.email}`} className="contact-side-link">
                {profile.email}
              </a>
            </div>

            <div className="contact-side-block">
              <div className="contact-side-label">Find me</div>
              <p className="contact-side-text">
                I like projects that move with a point of view: a little product sense, a little
                engineering depth, and room for curiosity. If that sounds like your brief, we’ll
                probably get along.
              </p>
            </div>

            <div className="contact-side-links">
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="contact-side-pill">
                LinkedIn
              </a>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="contact-side-pill">
                GitHub
              </a>
            </div>
          </div>

          <div className="contact-scatter" aria-label="Selected personal photos">
            <div className="contact-photo-card contact-photo-card-a">
              <Photo
                src="photos/contact/contact-1.jpg"
                alt="Sarvagya in a warm indoor setting, eating at a table"
                className="contact-photo"
                style={{ objectPosition: '50% 40%' }}
              />
            </div>
            <div className="contact-photo-card contact-photo-card-b">
              <Photo
                src="photos/contact/contact-2.jpg"
                alt="A group of friends gathered indoors at night"
                className="contact-photo"
                style={{ objectPosition: '50% 48%' }}
              />
            </div>
            <div className="contact-photo-card contact-photo-card-c">
              <Photo
                src="photos/contact/contact-3.jpg"
                alt="Three friends standing beside a pink car in a wooded area"
                className="contact-photo"
                style={{ objectPosition: '50% 42%' }}
              />
            </div>
            <div className="contact-photo-card contact-photo-card-d">
              <Photo
                src="photos/contact/contact-4.jpg"
                alt="A beach boxing moment on the shoreline"
                className="contact-photo"
                style={{ objectPosition: '50% 50%' }}
              />
            </div>
          </div>
        </Reveal>

        <div className="contact-form-wrap">
          <div className="contact-clip" aria-hidden="true">
            <img src="photos/contact/kid-cutout.png" alt="" className="contact-clip-photo" draggable={false} />
          </div>

          <Reveal delay={0.1} className="contact-form-shell">
            <div className="contact-form-top">
              <p>
                I like thoughtful messages, clear asks, and projects that have a real reason to
                exist. Tell me what you’re building and I’ll reply with the next best step.
              </p>
            </div>

          <form
            className="contact-form-body"
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            <label className="contact-field">
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="contact-input"
              />
            </label>

            <label className="contact-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="contact-input"
              />
            </label>

            <label className="contact-field">
              <span>What do you need?</span>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Portfolio, AI system, site refresh…"
                className="contact-input"
              />
            </label>

            <label className="contact-field">
              <span>How did you find me?</span>
              <input
                type="text"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                placeholder="Referral, GitHub, LinkedIn, etc."
                className="contact-input"
              />
            </label>

            <label className="contact-field contact-field-full">
              <span>Tell me more</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you building? What should I know?"
                rows={7}
                className="contact-input contact-textarea"
              />
            </label>

            <button type="submit" className="contact-submit">
              Send
            </button>

            <span className="contact-note">I’ll open your email client with everything pre-filled.</span>
          </form>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
