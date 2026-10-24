import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { education, journeyStories } from '../data/about'
import { Arrow, Label, Mountain, Print, Stamp } from '../components/Art'

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

function Story({ story, index }) {
  const images = storyImages(story)
  const [current, setCurrent] = useState(0)
  const reduceMotion = useReducedMotion()
  const step = (direction) => setCurrent((value) => (value + direction + images.length) % images.length)
  const image = images[current]

  return (
    <article className={`story ${index % 2 ? 'is-flipped' : ''}`} data-reveal>
      <figure className="story-media">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={image.src}
            src={asset(image.src)}
            alt={image.alt || story.alt}
            loading="lazy"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <figcaption>
            <button type="button" onClick={() => step(-1)} aria-label={`Previous photograph from ${story.title}`}>←</button>
            <span>{String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => step(1)} aria-label={`Next photograph from ${story.title}`}>→</button>
          </figcaption>
        )}
      </figure>
      <div className="story-copy">
        <p className="eyebrow">{story.kicker}</p>
        <h3>{story.title}</h3>
        <p>{storyNotes[story.id]}</p>
        <p className="hand story-count">chapter {index + 1} of {stories.length}</p>
      </div>
    </article>
  )
}

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow" data-reveal>The longer introduction</p>
          <h1 data-reveal>I’m Sarvagya Singh. <em>The work is only part of the story.</em></h1>
          <p data-reveal>I’m an AI and product engineer from Bangalore. I studied computer science at MIT Manipal, spent this year at KPMG, and I’m now building Nazara. I also box, climb mountains, and I’m slowly restoring a pink Maruti 800.</p>
        </div>
        <div className="about-hero-art" data-reveal="right">
          <Stamp className="about-stamp-a" value="20,600 ft"><Print src="/photos/summit.webp" alt="Sarvagya at a mountain summit" /></Stamp>
          <Stamp className="about-stamp-b" value="K.O."><Print src="/photos/boxing-win-bw.webp" alt="Sarvagya after a boxing win" /></Stamp>
          <p className="hand about-hero-note">above 20,000 ft, and<br />after the bout<Arrow className="about-hero-arrow" /></p>
        </div>
      </section>

      <section className="letter">
        <p className="eyebrow" data-reveal>Who I am</p>
        <div className="letter-body" data-reveal>
          <h2>I enjoy being responsible for the whole problem.</h2>
          <p>That’s what drew me to product engineering: understanding why something should exist, working through the messy technical decisions, and staying until it’s useful to the person on the other side. So far that has meant public procurement, market intelligence, railway bookings, student well-being and earnings calls. Now it means Nazara, an atlas of cities as their people see them.</p>
          <p>Outside work, my life is fairly physical. I train, box, trek, and plan the next climb. I captained MIT’s boxing team and climbed Kang Yatse II at 20,600 ft. Those experiences have made me calmer around uncertainty, but I value them for a simpler reason too: I genuinely enjoy doing them.</p>
          <p>I am also slowly restoring a pink Maruti 800. It is a stubborn, cheerful project that moves at a completely different pace from software.</p>
          <p className="hand letter-sign" lang="hi">— सर्वज्ञ</p>
        </div>
      </section>

      <section className="ledger">
        <header className="section-head" data-reveal><p className="eyebrow">Work &amp; education</p><h2>The practical details.</h2></header>
        <ol>
          {education.map((item, index) => (
            <li key={item.title} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
              <div><h3>{item.title}</h3><p>{item.sub}</p></div>
              <i aria-hidden="true" />
              <b>{item.date}</b>
            </li>
          ))}
        </ol>
      </section>

      <section className="stories">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Outside the job title</p>
          <h2>A few parts of my life I wanted to put here properly.</h2>
          <Mountain className="desk-mountain" />
        </header>
        {stories.map((story, index) => <Story key={story.id} story={story} index={index} />)}
      </section>

      <section className="car">
        <div className="car-art" data-reveal="left">
          <Label top={<><span>Off the clock</span><span>Reg. KL-01</span></>} bottom={<span>Maruti 800 · Super Deluxe</span>}>
            <img src="/photos/pink-car.webp" alt="Sarvagya’s restored pink Maruti 800 with lime-green rims" loading="lazy" />
          </Label>
        </div>
        <div className="car-copy" data-reveal="right">
          <h2>I also just really like weird machines.</h2>
          <p>That lime-green-rimmed pink Maruti 800 is mine, sourced from Kerala and built out over college. I am a firm believer that every good engineer needs a project that isn’t on a screen.</p>
        </div>
      </section>
    </>
  )
}
