import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { education, journeyStories } from '../data/about'

const storyOrder = ['mountain', 'boxing', 'nepal', 'nimas-dirang', 'research-day']
const stories = storyOrder.map((id) => journeyStories.find((story) => story.id === id)).filter(Boolean)
const asset = (src) => src?.startsWith('/') ? src : `/${src}`

const storyNotes = {
  mountain: 'Kang Yatse II meant long approach days, changing weather, and a summit at 20,600 ft. I like the honesty of the mountains. Preparation matters, conditions get a vote, and nobody can bluff their way through the difficult part.',
  boxing: 'Boxing became a serious part of my college life. I captained MIT’s team, won gold at the InterMahe championship, and helped the team win twice. Training taught me how to stay present when I am tired and under pressure.',
  nepal: 'Three weeks on foot through the Everest region, from 13 December 2025 to 4 January 2026: Kongma La, Cho La and Renjo La, with Everest Base Camp, Gokyo Ri and Kala Patthar at 5,644 m along the way. Most days had the same rhythm. Wake, pack, walk, eat, recover, repeat. It made patience feel practical instead of abstract.',
  'nimas-dirang': 'I completed my Basic Mountaineering Course at NIMAS in Arunachal Pradesh alongside defence forces personnel. We trained in rock craft, ice craft, rope work, and glacier movement. I finished with an ‘Alpha’ grade and have been a certified mountaineer since.',
  'research-day': 'A lot of my favourite college work happened with the same two teammates. We kept returning to the idea through hackathons, entrepreneurship summits, and Research Day, improving the build and the way we explained it each time.',
}

function storyImages(story) {
  if (story.media) return story.media.filter((item) => item.type === 'image')
  if (story.images) return story.images.map((src) => ({ src, alt: story.alt }))
  return [{ src: story.image, alt: story.alt }]
}

function StoryCard({ story, index }) {
  const images = storyImages(story)
  const [current, setCurrent] = useState(0)
  const reduceMotion = useReducedMotion()
  const step = (direction) => setCurrent((value) => (value + direction + images.length) % images.length)
  const image = images[current]

  return (
    <article
      className={`about-story-card about-story-${index + 1}`}
      data-reveal={index % 2 ? 'right' : 'left'}
      style={{ '--reveal-delay': `${(index % 2) * 90}ms` }}
    >
      <figure className="about-story-media">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={image.src}
            src={asset(image.src)}
            alt={image.alt || story.alt}
            initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 1.025 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -22 }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <div className="about-story-gallery-controls">
            <button type="button" onClick={() => step(-1)} aria-label={`Previous photograph from ${story.title}`}>←</button>
            <span>{String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => step(1)} aria-label={`Next photograph from ${story.title}`}>→</button>
          </div>
        )}
      </figure>
      <div className="about-story-copy">
        <span>{story.kicker}</span><h3>{story.title}</h3><p>{storyNotes[story.id]}</p>
        <b>{String(index + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')} · {images.length} photographs</b>
      </div>
    </article>
  )
}

export default function About() {
  const reduceMotion = useReducedMotion()
  return (
    <>
      <section className="about-editorial-hero section-black">
        <div className="about-editorial-copy" data-reveal="left">
          <span>the longer introduction</span>
          <h1>I’m Sarvagya Singh.<br /><em><span className="drawn-underline">The work is only part of the story.</span></em></h1>
          <p>I’m an AI and product engineer from Bangalore. I studied computer science at MIT Manipal, spent this year at KPMG, and I’m now building my own startup. I also box, climb mountains, and I’m slowly restoring a pink Maruti 800.</p>
        </div>
        <div className="about-editorial-photos" data-reveal="right">
          <figure className="about-editorial-main"><img src="/photos/contact/contact-1.webp" alt="Sarvagya enjoying a meal" /><figcaption>an ordinary day, which matters too</figcaption></figure>
          <figure className="about-editorial-small about-small-one"><img src="/photos/boxing-win-bw.webp" alt="Sarvagya after a boxing win" /><figcaption>after the bout</figcaption></figure>
          <figure className="about-editorial-small about-small-two"><img src="/photos/summit.webp" alt="Sarvagya at a mountain summit" /><figcaption>above 20,000 ft</figcaption></figure>
        </div>
        <motion.div className="scroll-sticker about-hero-sticker" initial={reduceMotion ? false : { opacity: 0, scale: 0.4, rotate: -18 }} whileInView={{ opacity: 1, scale: 1, rotate: -8 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>not just<br />the CV</motion.div>
        <motion.svg className="sketch-arrow about-hero-arrow" viewBox="0 0 180 110" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><motion.path d="M8 15C56 20 113 39 151 77M128 72L153 79L148 54" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 1.05 }} /></motion.svg>
      </section>

      <section className="about-letter">
        <div className="about-letter-label" data-reveal="left"><span>who I am</span><b>01</b></div>
        <div className="about-letter-body" data-reveal="right">
          <h2>I enjoy being responsible for the whole problem.</h2>
          <p>That’s what drew me to product engineering: understanding why something should exist, working through the messy technical decisions, and staying until it’s useful to the person on the other side. So far that has meant public procurement, market intelligence, railway bookings, student well-being and earnings calls. Now it means my own startup.</p>
          <p>Outside work, my life is fairly physical. I train, box, trek, and plan the next climb. I captained MIT’s boxing team and climbed Kang Yatse II at 20,600 ft. Those experiences have made me calmer around uncertainty, but I value them for a simpler reason too: I genuinely enjoy doing them.</p>
          <p>I am also slowly restoring a pink Maruti 800. It is a stubborn, cheerful project that moves at a completely different pace from software.</p>
        </div>
      </section>

      <section className="about-resume">
        <header data-reveal="left"><span>work &amp; education</span><h2>The practical details.</h2></header>
        <div className="about-resume-list">
          {education.map((item, index) => <article key={item.title} data-reveal="right" style={{ '--reveal-delay': `${index * 70}ms` }}><div><h3>{item.title}</h3><p>{item.sub}</p></div><b>{item.date}</b></article>)}
        </div>
      </section>

      <section className="about-journal section-black">
        <header data-reveal><span>outside the job title</span><h2>A few parts of my life<br /><em>I wanted to put here properly.</em></h2><p>These are things I have done, cared about, and kept returning to.</p></header>
        <motion.div className="scroll-sticker journal-scroll-sticker" initial={reduceMotion ? false : { opacity: 0, scale: 0.4, rotate: 16 }} whileInView={{ opacity: 1, scale: 1, rotate: 8 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>the long<br />version</motion.div>
        <div className="about-story-hint">Swipe through the stories →</div>
        <div className="about-story-grid">
          {stories.map((story, index) => <StoryCard key={story.id} story={story} index={index} />)}
        </div>
      </section>

      <section className="about-car-note">
        <img src="/photos/pink-car.webp" alt="Sarvagya with his restored pink Maruti 800" data-reveal="left" />
        <div data-reveal="right"><span>Off the clock</span><h2>I also just really like weird machines.</h2><p>That lime-green-rimmed pink Maruti 800 is mine; sourced from Kerala and built out over college. I am a firm believer that every good engineer needs a project that isn't on a screen.</p></div>
      </section>
    </>
  )
}
