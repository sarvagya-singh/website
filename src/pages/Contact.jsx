import { useState } from 'react'
import { profile } from '../data/profile'

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
    <>
      <section className="contact-stage">
        <div className="contact-stage-copy" data-reveal="left"><span>open channel</span><h1>Have something<br /><em>worth building?</em></h1><p>Email is the best way to reach me, whether it’s about a role, a project, or a mountain.</p><a href={`mailto:${profile.email}`} data-cursor="email">{profile.email} ↗</a></div>

        <div className="contact-photo-board" aria-label="A few personal photographs" data-reveal="right">
          <figure className="contact-shot contact-shot-one"><img src="/photos/contact/contact-1.webp" alt="Sarvagya at a restaurant" /></figure>
          <figure className="contact-shot contact-shot-two"><img src="/photos/contact/contact-3.webp" alt="Sarvagya outdoors" /></figure>
          <figure className="contact-shot contact-shot-three"><img src="/photos/contact/contact-4.webp" alt="Sarvagya with friends" /></figure>
          <div className="contact-photo-sticker">real person<br />promise</div>
        </div>

        <form className="contact-card" onSubmit={onSubmit} data-reveal="scale">
          <div className="contact-card-title"><span>send a field note</span><b>↘</b></div>
          <label><span>Your name</span><input required value={form.name} onChange={update('name')} placeholder="Name" /></label>
          <label><span>Your email</span><input required type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" /></label>
          <label><span>What is this about?</span><input value={form.subject} onChange={update('subject')} placeholder="A role, product, expedition…" /></label>
          <label><span>The useful context</span><textarea required rows="4" value={form.message} onChange={update('message')} placeholder="Tell me the interesting part" /></label>
          <button type="submit" data-cursor="send">Send the note <span>↗</span></button>
          <p className="contact-form-note">This opens your email app with the note filled in. No email app? Write to {profile.email}.</p>
        </form>

        <div className="contact-links-card" data-reveal="left"><span>elsewhere</span><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a></div>
        <img className="contact-cutout" src="/photos/contact/kid-cutout.webp" alt="A childhood cutout of Sarvagya" data-reveal="right" />
      </section>
    </>
  )
}
