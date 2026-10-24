import { useState } from 'react'
import { Link } from 'react-router-dom'
import { allProjects } from '../data/allProjects'
import { timeline } from '../data/about'
import { Motif, NazaraPoster, Print, Rose, Stamp, Sticker } from '../components/Art'

const nazara = allProjects.find((project) => project.id === 'nazara')
const work = allProjects.filter((project) => project.id !== 'nazara')

// Each project gets its own matchbox label.
const labels = {
  sachetana: { colour: 'cream', motif: 'lotus', name: 'Sachetana', top: '★ Hackathon · Winner ★', bottom: 'Blooming · Since 2024', caption: 'a kinder check-in for students.' },
  gem: { colour: 'red', motif: 'elephant', name: 'Bid Intelligence', top: '★ KPMG · AI ★', bottom: 'Tenders · Super Deluxe', caption: 'winning government tenders, faster.' },
  'market-intelligence': { colour: 'gold', motif: 'eye', name: 'Market Intelligence', top: '★ KPMG · BD ★', bottom: 'Special · Sees far', caption: 'the market, before it moves.' },
  vidura: { colour: 'pink', motif: 'diya', name: 'Vidura', top: '★ Personal · RAG ★', bottom: 'Wise counsel · No. 4', caption: 'earnings calls, read for you.' },
  pravas: { colour: 'green', motif: 'train', name: 'Pravas', top: '★ CRIS · Railways ★', bottom: 'Express · All India', caption: 'railway guest houses, booked online.' },
}
const tilts = [-1, 1, -0.6, 0.8, -1.2]

// One photograph per timeline entry, in the same order.
const timelinePhotos = [
  ['/photos/boxing/boxing-3.webp', 'Sarvagya holding a gold medal after a boxing championship', 'center 30%'],
  ['/photos/journey/bmc/bmc-4.webp', 'Roped climbers on a snowy ridge during mountaineering training'],
  ['/photos/triathlon.webp', 'Sarvagya at the Zeewolde triathlon with his road bike'],
  ['/photos/journey/kang-yatse-2/summit-banner-1.webp', 'The Kang Yatse II summit banner held by a climbing team'],
  ['/photos/journey/ebc/ebc-cover.webp', 'A mountaineer descending a snowy ridge on the Everest region route'],
]

function Match({ lit, onStrike }) {
  return (
    <button type="button" className={`strike ${lit ? 'is-lit' : ''}`} onClick={onStrike} aria-label={lit ? 'Blow out the match' : 'Strike the match'}>
      <svg width="132" height="44" viewBox="0 0 132 44" aria-hidden="true">
        {lit && (
          <g className="ignite">
            <circle className="glow" cx="114" cy="20" r="22" fill="#FFD24A" opacity="0.6" />
            <path className="flame" d="M114-2C124 12 126 22 114 32C102 22 104 12 114-2Z" fill="#FFB800" />
            <path className="flame flame-in" d="M114 10C119 17 120 23 114 29C108 23 109 17 114 10Z" fill="#D71920" />
          </g>
        )}
        <rect x="4" y="27" width="104" height="6" rx="2" fill="#F2CE8A" stroke="#2A0F0F" strokeWidth="1.2" />
        <ellipse cx="112" cy="30" rx="8" ry="6.5" fill={lit ? '#3A1A12' : '#D71920'} stroke="#2A0F0F" strokeWidth="1.2" />
      </svg>
      <span>{lit ? 'there we go.' : 'strike me'}</span>
    </button>
  )
}

function Hero() {
  const [lit, setLit] = useState(false)
  return (
    <section className="hero">
      <div className={`scroll-panel ${lit ? 'is-lit' : ''}`}>
        <Rose className="hero-rose r1" />
        <Rose className="hero-rose r2" />
        <Rose className="hero-rose r3" />
        <Rose className="hero-rose r4" />

        <p className="eyebrow">— No. 001 · Bangalore, India —</p>

        <div className="box">
          <div className="drawer" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <div className="stick" key={i}><i /><b /></div>)}</div>
          <div className="sleeve gloss shine-once">
            <div className="sleeve-frame">
              <div className="sleeve-face">
                <div className="sleeve-band"><span>★ Est. Bangalore</span><span>Safety software ★</span></div>
                <div className="sleeve-name">
                  <span lang="hi">सर्वज्ञ</span>
                  <h1>Sarvagya</h1>
                </div>
                <div className="sleeve-band"><span>Made in India</span><b>Handmade</b><span>Price: 0 ps.</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-row">
          <p className="hero-role">AI &amp; product engineer.</p>
          <Match lit={lit} onStrike={() => setLit((value) => !value)} />
        </div>
        <p className="hero-lede">I build software for people who are having a hard time with something, then stay until it actually helps. Away from the desk I box, climb mountains and look after a pink Maruti 800.</p>

        <div className="hero-note hand" aria-hidden="true">
          <span>सर्वज्ञ — “all-knowing.”</span>
          <b>still working on it.</b>
          <svg width="90" height="44" viewBox="0 0 90 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M84 4C70 30 40 40 8 30" /><path d="M16 22L7 30L18 35" /></svg>
        </div>
      </div>
    </section>
  )
}

const marquee = ['Made in India', 'Handmade software', 'Strike gently', 'Bangalore · Mumbai', '50 ideas per box']

function Marquee() {
  const items = [...marquee, ...marquee, ...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">{items.map((item, i) => <span key={i}>{item}<i>✦</i></span>)}</div>
    </div>
  )
}

function NowBuilding() {
  return (
    <section className="now">
      <Sticker className="st-eye" tilt={-12} drift={110}><Motif name="eye" /></Sticker>
      <span className="sticker-hint hand" aria-hidden="true">psst, drag the stickers</span>
      <Sticker className="st-now-rose" tilt={18} drift={60}><Rose /></Sticker>
      <a href={nazara.url} target="_blank" rel="noreferrer" className="now-poster gloss" data-reveal style={{ '--tilt': '-1.5deg' }} aria-label="Nazara, open the atlas">
        <NazaraPoster />
      </a>
      <div className="now-copy" data-reveal>
        <p className="now-latest hand">
          <svg width="64" height="28" viewBox="0 0 64 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M60 16C44 4 22 4 6 14" /><path d="M14 6L5 14L15 20" /></svg>
          the latest
        </p>
        <h2 className="now-wordmark">Nazara</h2>
        <p className="now-kicker">{nazara.kicker}</p>
        <p>{nazara.desc}</p>
        <div className="chips"><span>Atlas</span><span>Stories</span><span>Walks</span><span>Lists</span></div>
        <div className="now-actions">
          <a className="button button-sindoor" href={nazara.url} target="_blank" rel="noreferrer">Open the atlas ↗</a>
          <Link className="text-link" to="/projects?project=nazara">How it’s built</Link>
        </div>
      </div>
    </section>
  )
}

function WorkShelf() {
  return (
    <section className="shelf">
      <Sticker className="st-elephant" tilt={8} drift={70}><Motif name="elephant" /></Sticker>
      <header className="shelf-head" data-reveal>
        <h2>Work</h2>
        <div className="shelf-head-end">
          <span className="hand">the matchbox collection</span>
          <Link className="text-link" to="/projects">All work &amp; papers</Link>
        </div>
      </header>
      <div className="shelf-grid">
        {work.map((project, index) => {
          const label = labels[project.id]
          return (
            <Link key={project.id} to={`/projects?project=${project.id}`} className="shelf-item" data-reveal style={{ '--reveal-delay': `${(index % 3) * 90}ms` }}>
              <div className={`box-label gloss is-${label.colour}`} style={{ '--tilt': `${tilts[index]}deg` }}>
                <div className="box-label-frame">
                  <span className="box-label-band">{label.top}</span>
                  <Motif name={label.motif} />
                  <h3>{label.name}</h3>
                  <span className="box-label-band">{label.bottom}</span>
                </div>
              </div>
              <p className="hand">{label.caption}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function OffTheClock() {
  return (
    <section className="desk">
      <Sticker className="st-train" tilt={-6} drift={90}><Motif name="train" /></Sticker>
      <Sticker className="st-diya" tilt={10} drift={50}><Motif name="diya" /></Sticker>
      <div className="desk-head">
        <div className="box-label mini gloss is-ink" data-reveal style={{ '--tilt': '-3deg' }}>
          <div className="box-label-frame">
            <span className="box-label-band">★ ★ ★ ★ ★</span>
            <Motif name="gloves" />
            <h3>Boxing</h3>
          </div>
        </div>
        <p className="desk-title hand" data-reveal>off the clock:<b>punches &amp; peaks.</b></p>
        <div className="box-label mini gloss is-cream-green" data-reveal style={{ '--tilt': '2.5deg' }}>
          <div className="box-label-frame">
            <span className="box-label-band">Alt. very high</span>
            <Motif name="peaks" />
            <h3>Mountains</h3>
          </div>
        </div>
      </div>
      <ol className="desk-stamps">
        {timeline.map((item, index) => {
          const [src, alt, position] = timelinePhotos[index]
          return (
            <li key={item.title} data-reveal style={{ '--reveal-delay': `${index * 80}ms`, '--tilt': `${tilts[index] * 1.4}deg` }}>
              <Stamp value={item.when}>
                <Print src={src} alt={alt} position={position} />
              </Stamp>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Machines() {
  return (
    <section className="machines">
      <Sticker className="st-machines-rose" tilt={-20} drift={80}><Rose /></Sticker>
      <div className="machines-art" data-reveal="left">
        <Stamp className="stamp-scallop" value="KL-01">
          <img src="/photos/pink-car.webp" alt="Sarvagya’s pink Maruti 800 with lime-green rims" loading="lazy" />
        </Stamp>
        <span className="beep hand" aria-hidden="true">pom pom!</span>
        <p className="hand machines-note">sourced from Kerala,<br />built out over college</p>
      </div>
      <div className="machines-copy" data-reveal="right">
        <p className="eyebrow">A little more about me</p>
        <h2>I also just really like weird machines.</h2>
        <p>The pink Maruti 800 with lime-green rims is mine. It moves at a completely different pace from software, which is most of the appeal. I think every engineer needs one project that isn’t on a screen.</p>
        <p>I studied computer science at MIT Manipal, spent this year at KPMG, captained the boxing team and climbed Kang Yatse II at 20,600 ft. The longer version has photographs.</p>
        <Link className="text-link" to="/about">The longer version</Link>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <NowBuilding />
      <WorkShelf />
      <OffTheClock />
      <Machines />
    </>
  )
}
