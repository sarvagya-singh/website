import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import Photo from './Photo'

function JourneyGallery({ story }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const slides = story.media?.length
    ? story.media
    : story.images?.length
      ? story.images.map((src, index) => ({
          type: 'image',
          src,
          alt: index === 0 ? story.alt : `${story.title} photo ${index + 1}`,
        }))
      : story.image
        ? [{ type: 'image', src: story.image, alt: story.alt }]
        : []

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return

    const next = Math.round(track.scrollLeft / Math.max(1, track.clientWidth))
    setActive(Math.min(slides.length - 1, Math.max(0, next)))
  }

  const goTo = (index) => {
    const track = trackRef.current
    if (!track) return

    track.scrollTo({
      left: track.clientWidth * index,
      behavior: 'smooth',
    })
    setActive(index)
  }

  if (!slides.length) {
    return (
      <div className="journey-specimen">
        <div className="journey-specimen-label" style={{ color: story.kickerColor }}>
          {story.kicker}
        </div>
        <div className="journey-specimen-title" style={{ color: story.titleColor }}>
          {story.badge}
        </div>
        <p className="journey-specimen-copy" style={{ color: story.bodyColor }}>
          {story.body}
        </p>
      </div>
    )
  }

  return (
    <div className="journey-media">
      <div ref={trackRef} className="journey-photo-track" onScroll={handleScroll}>
        {slides.map((slide, slideIndex) =>
          slide.type === 'video' ? (
            <video
              key={slide.src}
              className="journey-photo journey-video"
              src={slide.src}
              poster={slide.poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <Photo
              key={slide.src}
              src={slide.src}
              alt={slide.alt || (slideIndex === 0 ? story.alt : `${story.title} photo ${slideIndex + 1}`)}
              className="journey-photo"
              draggable={false}
            />
          )
        )}
      </div>
      {slides.length > 1 && (
        <div className="journey-photo-dots" aria-label={`${story.title} photos`}>
          {slides.map((slide, dotIndex) => (
            <button
              key={slide.src}
              type="button"
              className={active === dotIndex ? 'active' : ''}
              aria-label={`Show ${slide.type === 'video' ? 'video' : 'photo'} ${dotIndex + 1}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function JourneyCard({ story, index, total, progress, reduceMotion }) {
  const step = 1 / (total + 0.35)
  const start = index * step
  const rise = start + step * 0.68
  const settle = start + step * 0.86

  const y = useTransform(
    progress,
    [start, rise, settle, 1],
    index === 0 ? ['0vh', '0vh', '0vh', '0vh'] : ['112vh', '0vh', '0vh', '0vh'],
  )
  const opacity = useTransform(
    progress,
    [start, start + step * 0.16, rise, 1],
    index === 0 ? [1, 1, 1, 1] : [0, 1, 1, 1],
  )
  const scale = useTransform(progress, [start, rise, 1], index === 0 ? [1, 1, 1] : [0.985, 1, 1])

  const style = reduceMotion
    ? { background: story.bg, zIndex: index + 1 }
    : { background: story.bg, y, opacity, scale, zIndex: index + 1 }

  return (
    <motion.article className={`journey-card${story.reverse ? ' reverse' : ''}`} style={style}>
      <div className="journey-copy">
        <div className="journey-kicker-word" style={{ color: story.kickerColor }}>
          {story.kicker}
        </div>
        <h3 className="journey-title" style={{ color: story.titleColor }}>
          {story.title}
        </h3>
        <p className="journey-body" style={{ color: story.bodyColor }}>
          {story.body}
        </p>
      </div>

      <div className="journey-visual">
        <JourneyGallery story={story} />
        <div className="journey-badge" style={{ background: story.badgeBg, color: story.badgeColor }}>
          {story.badge}
        </div>
      </div>
    </motion.article>
  )
}

export default function JourneyStack({ stories }) {
  const scrollRegionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      frame = 0
      const section = scrollRegionRef.current
      if (!section) return

      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const distance = section.offsetHeight - window.innerHeight
      const raw = distance > 0 ? (window.scrollY - sectionTop) / distance : 0
      scrollYProgress.set(Math.min(1, Math.max(0, raw)))
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [scrollYProgress])

  return (
    <section className="journey-section" style={{ '--journey-count': stories.length }}>
      <div className="journey-header">
        <div className="journey-kicker">Beyond the build</div>
        <h2 className="journey-heading">The places that shaped how I work.</h2>
        <p className="journey-intro">
          A few moments from boxing, altitude, research, and field training. Different arenas,
          same habit: stay steady, read the room, and keep moving with intent.
        </p>
      </div>

      <div ref={scrollRegionRef} className="journey-scroll-region">
        <div className="journey-shell">
          <div className="journey-backdrop" aria-hidden="true">
            <img src="/backgrounds/journey-bg.jpg" alt="" />
          </div>
          <div className="journey-backdrop-overlay" aria-hidden="true" />

          <div className="journey-stack" aria-label="Adventure and achievement cards">
            {stories.map((story, index) => (
              <JourneyCard
                key={story.id}
                story={story}
                index={index}
                total={stories.length}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
