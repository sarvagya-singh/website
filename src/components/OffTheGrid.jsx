import Photo from './Photo'
import { adventures } from '../data/adventures'

export default function OffTheGrid() {
  return (
    <section className="grid-section">
      <div className="grid-header">
        <div className="grid-kicker">Off the grid</div>
        <h2 className="grid-heading">Inspired by altitude, the ring, and the long road back.</h2>
        <p className="grid-intro">
          Mountaineering and boxing taught me to work through discomfort with patience and rhythm.
          That same habit shows up in the way I build.
        </p>
      </div>

      <div className="story-stack">
        {adventures.map((slide, i) => {
          const media = (
            <div className="story-panel-media" key="media">
              <Photo src={slide.image} alt={slide.alt} />
              <div
                className={`story-panel-badge pos-${slide.badgePos}`}
                style={{ background: slide.badgeBg, color: slide.badgeColor }}
              >
                {slide.badge}
              </div>
            </div>
          )
          const copy = (
            <div className="story-panel-copy" key="copy">
              <div className="story-panel-kicker" style={{ color: slide.kickerColor }}>{slide.kicker}</div>
              <h3 className="story-panel-title" style={{ color: slide.titleColor }}>{slide.title}</h3>
              <p className="story-panel-body" style={{ color: slide.bodyColor }}>{slide.body}</p>
            </div>
          )
          return (
            <div
              key={slide.id}
              className="story-panel"
              style={{ background: slide.bg, zIndex: i + 1 }}
            >
              {slide.reverse ? [copy, media] : [media, copy]}
            </div>
          )
        })}
      </div>
    </section>
  )
}
