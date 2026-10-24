import { useState } from 'react'
import { profile } from '../data/profile'
import { Stamp } from '../components/Art'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))
  const onSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact">
      <header className="page-head">
        <p className="eyebrow" data-reveal>Inland letter</p>
        <h1 data-reveal>Have something <em>worth building?</em></h1>
        <p data-reveal>Email is the best way to reach me, whether it’s about a role, a project, or a mountain. Or fill in the card below and it’ll open in your email app.</p>
      </header>

      <form className="postcard" onSubmit={onSubmit} data-reveal="scale">
        <div className="postcard-message">
          <label><span>Your name</span><input required value={form.name} onChange={update('name')} autoComplete="name" /></label>
          <label><span>Your email</span><input required type="email" value={form.email} onChange={update('email')} autoComplete="email" /></label>
          <label><span>What is this about?</span><input value={form.subject} onChange={update('subject')} placeholder="a role, a product, an expedition" /></label>
          <label><span>The useful context</span><textarea required rows="5" value={form.message} onChange={update('message')} placeholder="tell me the interesting part" /></label>
        </div>
        <div className="postcard-address">
          <div className="postcard-top">
            <div className="postmark" aria-hidden="true"><span>Bangalore</span><b>2026</b><span>G.P.O.</span></div>
            <Stamp value="₹5"><img src="/art/kid-stamp.webp" alt="" /></Stamp>
          </div>
          <p className="postcard-to">To,</p>
          <p className="postcard-line hand">Sarvagya Singh</p>
          <p className="postcard-line hand">Bangalore, India</p>
          <p className="postcard-line hand">{profile.email}</p>
          <button type="submit" className="button button-sindoor">Post the letter ↗</button>
          <p className="postcard-fine">This opens your email app with the note filled in. No email app? Write to {profile.email}.</p>
        </div>
      </form>

      <p className="contact-elsewhere" data-reveal>
        Elsewhere: <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>, <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>, and <a href="https://nazara.club/u/sarvagyasinghs" target="_blank" rel="noreferrer">Nazara</a>.
      </p>
    </section>
  )
}
