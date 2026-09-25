import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { allProjects } from '../data/allProjects'
import { timeline } from '../data/about'

const heroFrames = [
  { src: '/photos/about/kang-yatse-ridge.webp', alt: 'A climbing team ascending the sunlit ridge of Kang Yatse II', label: 'Kang Yatse II · summit morning', position: 'center 58%' },
  { src: '/photos/journey/kang-yatse-2/valley-pose-1.webp', alt: 'Sarvagya standing above a broad Ladakh valley', label: 'Ladakh · between camps', position: 'center 44%' },
  { src: '/photos/boxing/boxing-5.webp', alt: 'Sarvagya boxing during a competitive bout', label: 'MIT boxing · in the ring', position: 'center 48%' },
  { src: '/photos/about/beach-silhouette.webp', alt: 'Sarvagya walking alone beside the sea', label: 'Malpe coast · off the clock', position: 'center 58%' },
]

const deckAngles = [-4, 3, -2, 2, 4]
const deckOffsets = [18, 72, 0, 42, 82]

function SketchCircle({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  return (
    <span className={`sketch-circle ${className}`}>
      {children}
      <motion.svg viewBox="0 0 420 120" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d="M18 66C28 17 124 5 225 10C342 14 406 33 401 69C396 105 294 115 176 108C71 102 8 92 18 66Z" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.22, 1, 0.36, 1] }} />
      </motion.svg>
    </span>
  )
}

function SketchUnderline({ children }) {
  const reduceMotion = useReducedMotion()
  return (
    <span className="sketch-underline">
      {children}
      <motion.svg viewBox="0 0 360 34" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d="M8 15C78 7 191 10 350 16C262 18 149 24 28 27" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.9 }} transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }} />
      </motion.svg>
    </span>
  )
}

function SketchArrow({ className = '' }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.svg className={`sketch-arrow ${className}`} viewBox="0 0 180 110" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, rotate: -8 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reduceMotion ? 0 : 0.45 }}>
      <motion.path d="M8 15C56 20 113 39 151 77" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.15 }} />
      <motion.path d="M128 72L153 79L148 54" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.85 }} />
    </motion.svg>
  )
}

function useCompactLayout() {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 720px)')
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return compact
}

function WorkOverviewCarousel() {
  const projects = allProjects
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (paused || reduceMotion) return undefined
    const timer = window.setInterval(() => setActive((index) => (index + 1) % projects.length), 4200)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion, projects.length])

  const step = (direction) => setActive((index) => (index + direction + projects.length) % projects.length)
  const touchX = useRef(null)
  const onTouchStart = (event) => { touchX.current = event.touches[0].clientX; setPaused(true) }
  const onTouchEnd = (event) => {
    const dx = event.changedTouches[0].clientX - (touchX.current ?? 0)
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  return (
    <section className="work-overview section-black">
      <header className="work-overview-header" data-reveal><div><span>selected work · 2024—2026</span><h2>Five projects,<br /><em><SketchUnderline>how they were built.</SketchUnderline></em></h2></div><p>Three built inside organisations, one on my own, and one hackathon prototype. Open any of them to see the problem, what I built, and what came of it.</p></header>
      <motion.div className="scroll-sticker work-scroll-sticker" initial={reduceMotion ? false : { opacity: 0, scale: 0.45, rotate: -20 }} whileInView={{ opacity: 1, scale: 1, rotate: -7 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>problem →<br />build →<br />result</motion.div>
      <SketchArrow className="work-sketch-arrow" />
      <div className="work-carousel-stage" data-reveal="scale" aria-label="Work overview carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {projects.map((project, index) => {
          let offset = index - active
          if (offset > projects.length / 2) offset -= projects.length
          if (offset < -projects.length / 2) offset += projects.length
          return (
            <Link
              key={project.id}
              to={`/projects?project=${project.id}`}
              className={`work-carousel-card ${index === active ? 'active' : ''}`}
              style={{ '--offset': offset, '--distance': Math.abs(offset), zIndex: 20 - Math.abs(offset) }}
              onFocus={() => { setActive(index); setPaused(true) }}
              onBlur={() => setPaused(false)}
              data-cursor="view"
            >
              <img src={project.thumbnail} alt="" />
              <div className="work-carousel-card-copy"><span>{project.tag.split('·')[0].trim()}</span><h3>{project.title}</h3><p>{project.desc}</p><strong>{project.impact[0]} <i>↗</i></strong></div>
            </Link>
          )
        })}
      </div>
      <div className="work-carousel-controls" data-reveal>
        <button type="button" onClick={() => step(-1)} aria-label="Previous project">←</button>
        <div className="work-carousel-progress">{projects.map((project, index) => <button key={project.id} type="button" onClick={() => setActive(index)} className={index === active ? 'active' : ''} aria-label={`Show ${project.title}`}><span>{index === active && !paused && <motion.i key={`${active}-${paused}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? 0 : 4.2, ease: 'linear' }} />}</span></button>)}</div>
        <span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => step(1)} aria-label="Next project">→</button>
        <Link to="/projects">All work ↗</Link>
      </div>
    </section>
  )
}

function HomeIdentity() {
  const motionRef = useRef(null)
  const headlineRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const compact = useCompactLayout()
  const still = compact || reduceMotion
  // Slide the headline from the right edge until its last word is fully on screen.
  // Distances come from the real headline width, so the whole line always gets read.
  const range = useRef({ from: 0, to: 0 })
  const [pinLength, setPinLength] = useState(0)
  const { scrollYProgress } = useScroll({ target: motionRef, offset: ['start start', 'end end'] })
  const headlineX = useTransform(scrollYProgress, (p) => {
    const t = Math.min(1, Math.max(0, (p - 0.06) / 0.84))
    return range.current.from + (range.current.to - range.current.from) * t
  })

  useEffect(() => {
    if (still) return undefined
    const measure = () => {
      const vw = window.innerWidth
      const from = vw * 0.55
      const to = Math.min(0, vw * 0.94 - headlineRef.current.scrollWidth)
      range.current = { from, to }
      setPinLength(from - to)
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [still])

  return (
    <section className="home-identity">
      <div className="home-identity-motion" ref={motionRef} style={still ? undefined : { height: `calc(100svh + ${Math.round(pinLength * 0.9)}px)` }}>
        <div className="home-identity-sticky">
          <span>hello, I’m Sarvagya</span>
          <motion.h2 ref={headlineRef} style={{ x: still ? 0 : headlineX }}>Everything I build starts with <em>someone having <SketchCircle>a hard time.</SketchCircle></em></motion.h2>
        </div>
      </div>
      <motion.div className="scroll-sticker identity-scroll-sticker" initial={reduceMotion ? false : { opacity: 0, scale: 0.5, rotate: 18 }} whileInView={{ opacity: 1, scale: 1, rotate: 7 }} viewport={{ once: true, amount: 0.7 }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>people<br />first</motion.div>
      <SketchArrow className="identity-sketch-arrow" />
      <div className="home-identity-grid">
        <div className="home-identity-copy" data-reveal="left">
          <p>A student who isn’t sure whether what they feel is serious. A consultant with more tenders than hours. An executive walking into an earnings call. I start by understanding what that hard time actually looks like, then build the thing that makes it easier.</p>
          <p>I like owning the whole problem, from the first conversation about why it hurts to the screen someone opens on Monday morning. That’s how Sachetana began: a well-being app for students, designed with input from Kasturba Hospital, which won 1st place at the Apple Developers Club hackathon. At KPMG I built the GeM bid platform on my own, from the scoring model to the dashboard. Right now I’m building my own startup.</p>
          <p>Away from the desk, most of my time goes to training. I captained MIT’s boxing team, trained at the National Institute of Mountaineering, and climbed Kang Yatse II in July 2025. I don’t do these to make a point about work. I do them because I enjoy them.</p>
          <Link to="/about" data-cursor="story">The longer version ↗</Link>
        </div>
        <figure className="home-identity-photo" data-reveal="right"><img src="/photos/contact/contact-1.webp" loading="lazy" alt="Sarvagya laughing mid-meal at a restaurant" loading="lazy" /><figcaption>based in Bangalore, India</figcaption></figure>
      </div>
    </section>
  )
}

function TimelineDeck() {
  const reduceMotion = useReducedMotion()
  const compact = useCompactLayout()
  return (
    <section className="discipline-section">
      <header data-reveal><h2>Away from <em><SketchUnderline>the desk:</SketchUnderline></em></h2><p>Five things I’ve done off-screen, in order.</p></header>
      <ol className="discipline-deck">
        {timeline.map((item, index) => (
            <motion.li
              key={item.title}
              className={`discipline-card card-${item.color}`}
              style={{ zIndex: index + 1 }}
              initial={reduceMotion ? false : { opacity: 0, y: 160, rotate: deckAngles[index] * 2, scale: 0.94 }}
              whileInView={{ opacity: 1, y: compact ? 0 : deckOffsets[index], rotate: compact ? 0 : deckAngles[index], scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={compact || reduceMotion ? undefined : { y: deckOffsets[index] - 22, rotate: 0, scale: 1.025, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
            >
              <span className="discipline-sticker">{item.when}</span>
              <h3>{item.title}</h3>
              <i />
              <p>{item.body}</p>
            </motion.li>
        ))}
      </ol>
    </section>
  )
}

export default function Home() {
  const [frame, setFrame] = useState(0)
  const reduceMotion = useReducedMotion()

  // Warm the cache so each crossfade lands on a decoded photo instead of a blank frame.
  useEffect(() => { heroFrames.forEach((item) => { new Image().src = item.src }) }, [])

  useEffect(() => {
    if (reduceMotion) return undefined
    const timer = window.setInterval(() => setFrame((value) => (value + 1) % heroFrames.length), 4400)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <>
      <section className="kinetic-hero">
        <AnimatePresence mode="popLayout">
          <motion.img key={heroFrames[frame].src} src={heroFrames[frame].src} alt={heroFrames[frame].alt} style={{ objectPosition: heroFrames[frame].position }} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8 }} />
        </AnimatePresence>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p>Sarvagya Singh · AI &amp; product engineer</p>
          <h1>Happiest with<br />a hard problem<br /><em>or</em> <span>a harder climb.</span></h1>
          <div className="hero-route" aria-hidden="true" />
        </div>
        <div className="hero-frame-label"><span>{String(frame + 1).padStart(2, '0')} / 04</span>{heroFrames[frame].label}</div>
        <Link to="/projects?project=gem" className="hero-project-peek" data-cursor="view"><img src="/projects/gem/dashboard.webp" loading="lazy" alt="" /><span>latest work</span><b>GeM bids ↗</b></Link>
      </section>

      <HomeIdentity />

      <WorkOverviewCarousel />

      <section className="field-notes">
        <div className="field-shape" aria-hidden="true" />
        <motion.div className="scroll-sticker field-scroll-sticker" initial={reduceMotion ? false : { opacity: 0, scale: 0.45, rotate: -18 }} whileInView={{ opacity: 1, scale: 1, rotate: -9 }} viewport={{ once: true, amount: 0.7 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>off-screen<br />hours</motion.div>
        <SketchArrow className="field-sketch-arrow" />
        <div className="field-photo field-photo-a" data-reveal="left"><img src="/photos/journey/kang-yatse-2/ridge-ascent-1.webp" loading="lazy" alt="Climbers moving along a snowy ridge" /><span>Kang Yatse II · 20,600 ft</span></div>
        <div className="field-photo field-photo-b" data-reveal="right" style={{ '--reveal-delay': '90ms' }}><img src="/photos/boxing/boxing-3.webp" loading="lazy" alt="Sarvagya after a boxing championship" /><span>MIT boxing team</span></div>
        <div className="field-photo field-photo-c" data-reveal="left" style={{ '--reveal-delay': '170ms' }}><img src="/photos/triathlon.webp" loading="lazy" alt="Sarvagya at an endurance triathlon" /><span>endurance training</span></div>
        <div className="field-photo field-photo-d" data-reveal="right" style={{ '--reveal-delay': '250ms' }}><img src="/photos/journey/team/team-1.webp" loading="lazy" alt="Sarvagya presenting with his project team" /><span>building with my college team</span></div>
        <p data-reveal>These are the places I spend time away from a screen. They have shaped how I work, but I did not choose them to make a neat portfolio story.</p>
      </section>

      <section className="persona-section section-black">
        <h2 data-reveal>I care about the work. <em>I just don’t want work to be the only interesting thing about me.</em></h2>
        <p data-reveal>Boxing, climbing, and endurance sport take up a lot of the hours that are not shown in a case study.</p>
        <div className="persona-collage">
          <figure className="persona-one" data-reveal="left"><img src="/photos/portrait.webp" loading="lazy" alt="Sarvagya on a trail" /><figcaption>engineer</figcaption></figure>
          <figure className="persona-two" data-reveal="right" style={{ '--reveal-delay': '100ms' }}><img src="/photos/boxing-win-bw.webp" loading="lazy" alt="Sarvagya after a boxing win" /><figcaption>boxer</figcaption></figure>
          <figure className="persona-three" data-reveal="left" style={{ '--reveal-delay': '180ms' }}><img src="/photos/summit.webp" loading="lazy" alt="Sarvagya at a mountain summit" /><figcaption>mountaineer</figcaption></figure>
          <div className="persona-blob" aria-hidden="true" />
        </div>
        <Link to="/about" className="scribble-link" data-cursor="story" data-reveal>Read the field notes ↗</Link>
      </section>

      <TimelineDeck />

      <section className="proof-marquee" aria-label="Selected experience" data-reveal>
        <p>places that shaped the work:</p>
        <div><span>KPMG</span><i>✦</i><span>CRIS</span><i>✦</i><span>MIT MANIPAL</span><i>✦</i><span>KASTURBA HOSPITAL</span><i>✦</i><span>TROUVÉ</span><i>✦</i><span>NIMAS</span><i>✦</i><span>ZEEWOLDE TRIATHLON</span></div>
      </section>
    </>
  )
}
