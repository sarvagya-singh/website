import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { allProjects } from '../data/allProjects'

const heroFrames = [
  { src: '/photos/about/kang-yatse-ridge.jpg', alt: 'A climbing team ascending the sunlit ridge of Kang Yatse II', label: 'Kang Yatse II · summit morning', position: 'center 58%' },
  { src: '/photos/journey/kang-yatse-2/valley-pose-1.jpg', alt: 'Sarvagya standing above a broad Ladakh valley', label: 'Ladakh · between camps', position: 'center 44%' },
  { src: '/photos/boxing/boxing-5.jpg', alt: 'Sarvagya boxing during a competitive bout', label: 'MIT boxing · in the ring', position: 'center 48%' },
  { src: '/photos/about/beach-silhouette.jpg', alt: 'Sarvagya walking alone beside the sea', label: 'Malpe coast · off the clock', position: 'center 58%' },
]

const disciplineCards = [
  { title: 'product', color: 'green', sticker: 'ship', items: ['Product judgment', 'Useful interfaces', 'End-to-end ownership', 'Business context'] },
  { title: 'AI systems', color: 'blue', sticker: 'RAG', items: ['Retrieval systems', 'LLM evaluation', 'Classification', 'Cited answers'] },
  { title: 'research', color: 'orange', sticker: 'why?', items: ['Experiment design', 'Signal over noise', 'Evidence', 'Clear writing'] },
  { title: 'high altitude', color: 'wine', sticker: 'climb', items: ['Preparation', 'Risk management', 'Composure', 'Long horizons'] },
  { title: 'the ring', color: 'pink', sticker: 'K.O.', items: ['Fast decisions', 'Recovery', 'Team leadership', 'Pressure'] },
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

  return (
    <section className="work-overview section-black">
      <header className="work-overview-header" data-reveal><div><span>work overview · 2024—2026</span><h2>Systems in<br /><em><SketchUnderline>the wild.</SketchUnderline></em></h2></div><p>Products built for consulting teams, public infrastructure, investors, and student well-being. The centre card advances automatically.</p></header>
      <motion.div className="scroll-sticker work-scroll-sticker" initial={reduceMotion ? false : { opacity: 0, scale: 0.45, rotate: -20 }} whileInView={{ opacity: 1, scale: 1, rotate: -7 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>shipped<br />not staged</motion.div>
      <SketchArrow className="work-sketch-arrow" />
      <div className="work-carousel-stage" data-reveal="scale" aria-label="Work overview carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
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
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const compact = useCompactLayout()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headlineX = useTransform(scrollYProgress, [0.08, 0.72], ['64vw', '-72vw'])

  return (
    <section className="home-identity" ref={sectionRef}>
      <div className="home-identity-motion">
        <div className="home-identity-sticky">
          <span>hello, I’m Sarvagya</span>
          <motion.h2 style={{ x: compact || reduceMotion ? 0 : headlineX }}>I make difficult information <em><SketchCircle>easier to act on.</SketchCircle></em></motion.h2>
        </div>
      </div>
      <motion.div className="scroll-sticker identity-scroll-sticker" initial={reduceMotion ? false : { opacity: 0, scale: 0.5, rotate: 18 }} whileInView={{ opacity: 1, scale: 1, rotate: 7 }} viewport={{ once: true, amount: 0.7 }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>messy →<br />useful</motion.div>
      <SketchArrow className="identity-sketch-arrow" />
      <div className="home-identity-grid">
        <div className="home-identity-copy" data-reveal="left">
          <p>I’m an AI and product engineer. I like taking a loose, difficult problem and owning the whole path from research and system design to the interface someone actually uses.</p>
          <p>At KPMG, that meant building tools for bid and market intelligence. On my own, it means Vidura, an earnings-call preparation product for Indian listed companies.</p>
          <p>When I’m away from a screen, I box, climb, and train for endurance events. I captained MIT’s boxing team, completed my mountaineering course at NIMAS, and climbed Kang Yatse II at 20,600 ft. They are a large part of my life, and they belong in the introduction.</p>
          <Link to="/about" data-cursor="story">The longer introduction ↗</Link>
        </div>
        <figure className="home-identity-photo" data-reveal="right"><img src="/photos/contact/contact-1.jpg" alt="Sarvagya enjoying a meal" /><figcaption>based in Bangalore, India</figcaption></figure>
      </div>
    </section>
  )
}

function DisciplineDeck() {
  const reduceMotion = useReducedMotion()
  const compact = useCompactLayout()
  return (
    <section className="discipline-section">
      <header data-reveal><h2>Call me when you <em><SketchUnderline>need:</SketchUnderline></em></h2><p>Five arenas. One operating system.</p></header>
      <div className="discipline-deck">
        {disciplineCards.map((card, index) => (
            <motion.article
              key={card.title}
              className={`discipline-card card-${card.color}`}
              style={{ zIndex: index + 1 }}
              initial={reduceMotion ? false : { opacity: 0, y: 210, rotate: deckAngles[index] * 2, scale: 0.92 }}
              whileInView={{ opacity: 1, y: compact ? 0 : deckOffsets[index], rotate: compact ? 0 : deckAngles[index], scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.82, delay: reduceMotion ? 0 : index * 0.11, ease: [0.22, 1, 0.36, 1] }}
              whileHover={compact || reduceMotion ? undefined : { y: deckOffsets[index] - 22, rotate: 0, scale: 1.025, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
              data-cursor="focus"
            >
              <span className="discipline-sticker">{card.sticker}</span>
              <h3>{card.title}</h3>
              <i />
              <ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </motion.article>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const [frame, setFrame] = useState(0)
  const reduceMotion = useReducedMotion()

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
          <h1>I build <em>intelligent systems</em><br />for people who need <span>better answers.</span></h1>
          <div className="hero-route" aria-hidden="true" />
        </div>
        <div className="hero-frame-label"><span>{String(frame + 1).padStart(2, '0')} / 04</span>{heroFrames[frame].label}</div>
        <Link to="/projects?project=vidura" className="hero-project-peek" data-cursor="view"><img src="/projects/vidura/war-room.png" alt="" /><span>building now</span><b>Vidura ↗</b></Link>
      </section>

      <HomeIdentity />

      <WorkOverviewCarousel />

      <section className="field-notes">
        <div className="field-shape" aria-hidden="true" />
        <motion.div className="scroll-sticker field-scroll-sticker" initial={reduceMotion ? false : { opacity: 0, scale: 0.45, rotate: -18 }} whileInView={{ opacity: 1, scale: 1, rotate: -9 }} viewport={{ once: true, amount: 0.7 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>off-screen<br />hours</motion.div>
        <SketchArrow className="field-sketch-arrow" />
        <div className="field-photo field-photo-a" data-reveal="left"><img src="/photos/journey/kang-yatse-2/ridge-ascent-1.jpg" alt="Climbers moving along a snowy ridge" /><span>Kang Yatse II · 20,600 ft</span></div>
        <div className="field-photo field-photo-b" data-reveal="right" style={{ '--reveal-delay': '90ms' }}><img src="/photos/boxing/boxing-3.jpg" alt="Sarvagya after a boxing championship" /><span>MIT boxing team</span></div>
        <div className="field-photo field-photo-c" data-reveal="left" style={{ '--reveal-delay': '170ms' }}><img src="/photos/triathlon.jpg" alt="Sarvagya at an endurance triathlon" /><span>endurance training</span></div>
        <div className="field-photo field-photo-d" data-reveal="right" style={{ '--reveal-delay': '250ms' }}><img src="/photos/journey/team/team-1.jpg" alt="Sarvagya presenting with his project team" /><span>building with my college team</span></div>
        <p data-reveal>These are the places I spend time away from a screen. They have shaped how I work, but I did not choose them to make a neat portfolio story.</p>
      </section>

      <section className="persona-section section-black">
        <h2 data-reveal>I care about the work. <em>I just don’t want work to be the only interesting thing about me.</em></h2>
        <p data-reveal>Boxing, climbing, and endurance sport take up a lot of the hours that are not shown in a case study.</p>
        <div className="persona-collage">
          <figure className="persona-one" data-reveal="left"><img src="/photos/portrait.jpg" alt="Sarvagya on a trail" /><figcaption>engineer</figcaption></figure>
          <figure className="persona-two" data-reveal="right" style={{ '--reveal-delay': '100ms' }}><img src="/photos/boxing-win-bw.jpg" alt="Sarvagya after a boxing win" /><figcaption>boxer</figcaption></figure>
          <figure className="persona-three" data-reveal="left" style={{ '--reveal-delay': '180ms' }}><img src="/photos/summit.jpg" alt="Sarvagya at a mountain summit" /><figcaption>mountaineer</figcaption></figure>
          <div className="persona-blob" aria-hidden="true" />
        </div>
        <Link to="/about" className="scribble-link" data-cursor="story" data-reveal>Read the field notes ↗</Link>
      </section>

      <DisciplineDeck />

      <section className="proof-marquee" aria-label="Selected experience" data-reveal>
        <p>places that shaped the work:</p>
        <div><span>KPMG</span><i>✦</i><span>CRIS</span><i>✦</i><span>MIT MANIPAL</span><i>✦</i><span>KASTURBA HOSPITAL</span><i>✦</i><span>NIMAS</span><i>✦</i><span>TEAM INDIA</span></div>
      </section>
    </>
  )
}
