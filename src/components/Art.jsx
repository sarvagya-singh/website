import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// Line-art motifs drawn in the spirit of old matchbox labels and tattoo flash.
// All of them use currentColor, so colour comes from CSS.

const ease = [0.22, 1, 0.36, 1]

function useDraw(delay = 0, duration = 1.2) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return {}
  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { pathLength: { duration, delay, ease }, opacity: { duration: 0.2, delay } },
  }
}

export function Lotus({ className = '' }) {
  const draw = useDraw()
  const petals = [
    'M60 70C48 52 50 28 60 10C70 28 72 52 60 70Z',
    'M60 70C40 64 28 46 30 26C44 34 56 50 60 70Z',
    'M60 70C80 64 92 46 90 26C76 34 64 50 60 70Z',
    'M58 71C38 72 18 62 8 46C26 44 46 54 58 71Z',
    'M62 71C82 72 102 62 112 46C94 44 74 54 62 71Z',
    'M24 77H96',
  ]
  return (
    <svg className={`art ${className}`} viewBox="0 0 120 82" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      {petals.map((d) => <motion.path key={d} d={d} {...draw} />)}
      <path d="M60 22V60M44 42L56 62M76 42L64 62" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

export function Mountain({ className = '' }) {
  const draw = useDraw(0, 1.4)
  return (
    <svg className={`art ${className}`} viewBox="0 0 120 76" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <motion.path d="M4 72L38 26L50 40L68 12L116 72Z" {...draw} />
      <path d="M59 26L68 12L78 27L72 23L67 30L63 24Z" fill="currentColor" stroke="none" />
      <path d="M30 72L44 52M52 72L64 46M76 72L84 56" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

export function Star({ className = '' }) {
  return (
    <svg className={`art ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0L14 9L22 4L16 11L24 12L16 13L22 20L14 15L12 24L10 15L2 20L8 13L0 12L8 11L2 4L10 9Z" />
    </svg>
  )
}

// Hand-drawn marks that go with the handwritten notes.
export function Arrow({ className = '' }) {
  const draw = useDraw(0.3, 0.9)
  const head = useDraw(1.05, 0.35)
  return (
    <svg className={`art arrow ${className}`} viewBox="0 0 120 70" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <motion.path d="M6 10C40 6 82 22 104 56" {...draw} />
      <motion.path d="M90 52L105 58L106 42" {...head} />
    </svg>
  )
}

// A matchbox label: double rule, corner stars, a band of small caps top and bottom.
export function Label({ top, bottom, children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`label ${className}`} {...rest}>
      {['tl', 'tr', 'bl', 'br'].map((corner) => <Star key={corner} className={`label-star ${corner}`} />)}
      {top && <div className="label-band">{top}</div>}
      <div className="label-body">{children}</div>
      {bottom && <div className="label-band">{bottom}</div>}
    </Tag>
  )
}

// A perforated postage stamp. The perforations are a CSS mask, see .stamp.
export function Stamp({ children, value, className = '', ...rest }) {
  return (
    <div className={`stamp-shadow ${className}`} {...rest}>
      <div className="stamp">
        {children}
        {value && <span className="stamp-value">{value}</span>}
      </div>
    </div>
  )
}

// Photos printed in two inks; full colour comes back on hover.
export function Print({ src, alt, className = '', position, loading = 'lazy' }) {
  return (
    <figure className={`print ${className}`}>
      <img src={src} alt={alt} loading={loading} style={position ? { objectPosition: position } : undefined} />
    </figure>
  )
}

// ─── Mysore Sandal colour illustrations ──────────────────
// Full-colour pieces, so these use the palette directly.
const RED = '#D71920'
const GREEN = '#007A3D'
const GOLD = '#FFB800'
const SUN = '#FFD24A'
const PINK = '#F0457E'
const CREAM = '#FFF8E6'
const INK = '#2A0F0F'

export function Rose({ className = '', style }) {
  return (
    <svg className={`art rose ${className}`} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 60C30 72 12 66 6 50C24 44 40 50 50 60Z" fill="#00A651" stroke="#00552A" strokeWidth="1.5" />
      <path d="M50 60C70 74 88 68 94 52C76 44 60 50 50 60Z" fill="#00A651" stroke="#00552A" strokeWidth="1.5" />
      <path d="M24 54L44 56M76 56L58 57" stroke="#00552A" strokeWidth="1.2" />
      <g className="rose-head">
        <circle cx="50" cy="44" r="26" fill={PINK} stroke="#8A1538" strokeWidth="2" />
        <path d="M50 44c0-6 8-6 8 0c0 9-16 9-16 0c0-13 24-13 24 0c0 16-32 16-32 0" fill="none" stroke="#B0124A" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M33 32q8-9 19-7" stroke="#FFC2D4" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

const motifs = {
  elephant: (
    <svg viewBox="0 0 200 160">
      <path className="trunk" d="M168 78C180 96 178 118 166 130C161 135 154 131 158 125C166 113 166 100 157 90Z" fill={CREAM} stroke={INK} strokeWidth="2" />
      <path d="M40 84C30 92 30 102 34 110" fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
      <g fill={CREAM} stroke={INK} strokeWidth="2">
        <rect x="56" y="104" width="16" height="36" rx="3" /><rect x="78" y="108" width="16" height="32" rx="3" />
        <rect x="112" y="108" width="16" height="32" rx="3" /><rect x="134" y="104" width="16" height="36" rx="3" />
        <ellipse cx="98" cy="88" rx="58" ry="36" />
        <circle cx="150" cy="68" r="27" />
      </g>
      <path d="M138 56C120 54 116 82 130 92C140 98 147 84 147 70Z" fill={PINK} stroke={INK} strokeWidth="1.8" />
      <path d="M76 54L124 54L118 100L100 114L82 100Z" fill={GREEN} stroke={INK} strokeWidth="1.8" />
      <path d="M80 60L120 60" stroke={GOLD} strokeWidth="3" />
      <g fill={GOLD}><circle cx="100" cy="74" r="4.5" /><circle cx="88" cy="86" r="3" /><circle cx="112" cy="86" r="3" /><circle cx="100" cy="99" r="3" /></g>
      <circle cx="157" cy="64" r="3" fill={INK} />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 200 130">
      <g className="blink">
        <g stroke={INK} strokeWidth="3.2" strokeLinecap="round">
          <line x1="46" y1="44" x2="38" y2="30" /><line x1="70" y1="32" x2="66" y2="16" /><line x1="100" y1="27" x2="100" y2="10" /><line x1="130" y1="32" x2="134" y2="16" /><line x1="154" y1="44" x2="162" y2="30" />
        </g>
        <path d="M14 70Q100 0 186 70Q100 132 14 70Z" fill={CREAM} stroke={INK} strokeWidth="4" />
        <g className="pupil">
          <circle cx="100" cy="70" r="28" fill={GREEN} />
          <circle cx="100" cy="70" r="20" fill="none" stroke="#00A651" strokeWidth="3" />
          <circle cx="100" cy="70" r="13" fill={INK} />
          <circle cx="92" cy="62" r="4.5" fill={CREAM} />
        </g>
      </g>
      <circle cx="100" cy="112" r="5" fill={RED} />
    </svg>
  ),
  diya: (
    <svg viewBox="0 0 200 160">
      <circle className="glow" cx="100" cy="58" r="40" fill={SUN} opacity="0.6" />
      <path className="flame" d="M100 18C114 40 116 58 100 72C84 58 86 40 100 18Z" fill={GOLD} />
      <path className="flame flame-in" d="M100 40C106 50 107 58 100 66C93 58 94 50 100 40Z" fill={RED} />
      <path d="M36 88Q100 150 164 88Q100 100 36 88Z" fill={RED} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M150 92L184 78L168 100Z" fill={RED} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M52 100Q100 128 148 100" fill="none" stroke={GOLD} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      <ellipse cx="100" cy="140" rx="34" ry="9" fill={GREEN} stroke={INK} strokeWidth="2" />
      <path d="M86 120L82 136M114 120L118 136" stroke={INK} strokeWidth="2" />
    </svg>
  ),
  train: (
    <svg viewBox="0 0 200 160">
      <g className="smoke" fill={CREAM} stroke={INK} strokeWidth="1.5">
        <circle cx="64" cy="22" r="8" /><circle cx="82" cy="12" r="10" /><circle cx="104" cy="8" r="7" />
      </g>
      <path d="M58 66L54 38H76L72 66Z" fill={INK} />
      <rect x="50" y="30" width="30" height="8" fill={RED} stroke={INK} strokeWidth="1.5" />
      <rect x="38" y="64" width="92" height="42" rx="18" fill={GREEN} stroke={INK} strokeWidth="2" />
      <path d="M72 66V104M100 66V104" stroke={GOLD} strokeWidth="4" />
      <rect x="120" y="44" width="46" height="62" fill={RED} stroke={INK} strokeWidth="2" />
      <rect x="130" y="54" width="26" height="18" fill={CREAM} stroke={INK} strokeWidth="1.5" />
      <rect x="114" y="36" width="58" height="9" fill={INK} />
      <circle cx="38" cy="78" r="6" fill={SUN} stroke={INK} strokeWidth="1.5" />
      <path d="M38 106L20 122H38Z" fill={GOLD} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="30" y="104" width="142" height="9" fill={INK} />
      {[[60, 126, 14], [98, 126, 14], [146, 124, 18]].map(([cx, cy, r]) => (
        <g key={cx} className="wheel">
          <circle cx={cx} cy={cy} r={r} fill={CREAM} stroke={INK} strokeWidth="3" />
          <path d={`M${cx - r + 3} ${cy}H${cx + r - 3}M${cx} ${cy - r + 3}V${cy + r - 3}`} stroke={INK} strokeWidth="2" />
          <circle cx={cx} cy={cy} r="3.5" fill={RED} />
        </g>
      ))}
      <path d="M60 126H146" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  lotus: (
    <svg viewBox="0 0 200 160">
      <g fill={CREAM} stroke={INK} strokeWidth="1.8">
        <path className="petal-l" d="M100 118C70 112 40 96 26 72C54 70 82 86 100 118Z" />
        <path className="petal-r" d="M100 118C130 112 160 96 174 72C146 70 118 86 100 118Z" />
        <path d="M100 118C76 100 62 70 66 40C88 56 100 86 100 118Z" fill={SUN} />
        <path d="M100 118C124 100 138 70 134 40C112 56 100 86 100 118Z" fill={SUN} />
        <path d="M100 118C86 90 86 52 100 22C114 52 114 90 100 118Z" />
      </g>
      <g stroke={RED} strokeWidth="1.8" fill="none"><path d="M100 40V104" /><path d="M78 60L94 106" /><path d="M122 60L106 106" /></g>
      <ellipse cx="100" cy="128" rx="72" ry="11" fill={GREEN} stroke={INK} strokeWidth="1.8" />
      <g stroke={CREAM} strokeWidth="2.2" strokeLinecap="round" fill="none"><path d="M30 148q10-6 20 0t20 0" /><path d="M130 148q10-6 20 0t20 0" /></g>
    </svg>
  ),
  gloves: (
    <svg viewBox="0 0 200 150">
      {[[RED, '#FF8A8E', 'rotate(-18 70 80)', 'glove-l'], [GREEN, '#5FD38D', 'translate(200 0) scale(-1 1) rotate(-18 70 80)', 'glove-r']].map(([fill, shine, transform, cls]) => (
        <g key={cls} className={cls}>
          <g transform={transform}>
            <path d="M44 40C28 46 26 74 34 92C40 106 56 112 74 110L92 108C104 106 106 94 102 84L98 56C94 40 76 32 60 34C54 34 48 36 44 40Z" fill={fill} stroke={CREAM} strokeWidth="2" />
            <path d="M48 50C54 44 62 42 70 44" fill="none" stroke={shine} strokeWidth="3" strokeLinecap="round" />
            <rect x="50" y="108" width="50" height="22" rx="3" fill={CREAM} />
          </g>
        </g>
      ))}
    </svg>
  ),
  peaks: (
    <svg viewBox="0 0 200 150">
      <g className="sun"><circle cx="150" cy="44" r="22" fill={GOLD} /><circle cx="150" cy="44" r="22" fill={RED} opacity="0.25" /></g>
      <path d="M6 140L76 30L146 140Z" fill={GREEN} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M84 140L140 60L196 140Z" fill={PINK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 56L76 30L92 56L84 50L76 58L68 50Z" fill={CREAM} />
      <path d="M76 30V12" stroke={INK} strokeWidth="2" />
      <path className="flag" d="M76 12L92 17L76 22Z" fill={RED} />
    </svg>
  ),
}

export function Motif({ name, className = '' }) {
  return <span className={`motif motif-${name} ${className}`} aria-hidden="true">{motifs[name]}</span>
}

// A tiny self-portrait: gloves up, halfway up a mountain.
export function Caricature({ className = '' }) {
  return (
    <svg className={`art caricature ${className}`} viewBox="0 0 240 170" role="img" aria-label="A hand-drawn self-portrait: a small figure in boxing gloves climbing a mountain">
      <circle className="sun" cx="186" cy="40" r="20" fill={GOLD} />
      <path d="M10 160L130 34L230 160Z" fill={GREEN} />
      <path d="M150 160L196 100L240 160Z" fill={PINK} />
      <path d="M112 54L130 34L148 56L138 50L130 58L122 50Z" fill={CREAM} />
      <path d="M130 34V14" stroke={INK} strokeWidth="2" />
      <path className="flag" d="M130 14L146 19L130 24Z" fill={RED} />
      <g className="climber">
        <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M78 112L70 136M78 112L92 132" />
          <path d="M78 112L82 86" />
          <path d="M82 92L98 80M82 92L66 84" />
        </g>
        <circle className="fist-r" cx="102" cy="77" r="7" fill={RED} stroke={INK} strokeWidth="1.8" />
        <circle className="fist-l" cx="62" cy="81" r="7" fill={RED} stroke={INK} strokeWidth="1.8" />
        <circle cx="84" cy="72" r="11" fill={CREAM} stroke={INK} strokeWidth="2" />
        <path d="M73 69C74 58 92 56 95 66C92 62 88 64 86 61C84 65 78 63 73 69Z" fill={INK} />
        <circle cx="88" cy="73" r="1.4" fill={INK} />
        <path d="M84 78q3 2 6 0" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// Nazara as a matchbox poster: the sun over the sea, and a stone arch.
export function NazaraPoster() {
  return (
    <svg className="art poster" viewBox="0 0 400 500" role="img" aria-label="Nazara poster: the sun over the sea and a stone arch">
      <defs>
        <pattern id="poster-swirl" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" opacity="0.6">
            <path d="M10 40c0-14 22-14 22 0c0 8-12 8-12 0" /><path d="M50 10c14 0 14 22 0 22c-8 0-8-12 0-12" />
            <path d="M50 50c0 14 22 14 22 0c0-8-12-8-12 0" /><path d="M22 72c-10 0-10-14 0-14" /><path d="M70 26c6 4 4 12-2 12" />
          </g>
        </pattern>
        <clipPath id="poster-sea"><rect x="40" y="300" width="320" height="70" /></clipPath>
      </defs>
      <rect width="400" height="500" fill={GREEN} />
      <rect width="400" height="500" fill="url(#poster-swirl)" opacity="0.6" />
      <rect x="14" y="14" width="372" height="472" fill="none" stroke={GOLD} strokeWidth="4" />
      <rect x="24" y="24" width="352" height="452" fill="none" stroke={CREAM} strokeWidth="1.5" />
      <g className="poster-sun">
        <g stroke={GOLD} strokeWidth="4" strokeLinecap="round">
          <path d="M200 60V84M128 92L142 108M272 92L258 108M94 160L118 164M306 160L282 164M160 70L166 92M240 70L234 92" />
        </g>
        <circle cx="200" cy="178" r="70" fill={GOLD} />
        <circle cx="200" cy="178" r="70" fill={RED} opacity="0.18" />
        <circle cx="200" cy="178" r="56" fill="none" stroke={CREAM} strokeWidth="1.5" />
      </g>
      <path d="M112 300V196H132V186H150V176H250V186H268V196H288V300H232V246C232 222 218 208 200 208C182 208 168 222 168 246V300Z" fill={CREAM} stroke={INK} strokeWidth="2.5" />
      <path d="M150 176C150 160 166 152 176 156C180 142 220 142 224 156C234 152 250 160 250 176" fill={CREAM} stroke={INK} strokeWidth="2.5" />
      <g fill={RED}><circle cx="128" cy="224" r="4.5" /><circle cx="272" cy="224" r="4.5" /><circle cx="128" cy="256" r="4.5" /><circle cx="272" cy="256" r="4.5" /></g>
      <path d="M120 206H280" stroke={INK} strokeWidth="1.5" />
      <g clipPath="url(#poster-sea)"><g className="poster-waves" fill="none" strokeWidth="3" strokeLinecap="round">
        <path d="M0 318q20-12 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke={SUN} />
        <path d="M0 336q20-12 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke={CREAM} opacity="0.85" />
        <path d="M0 354q20-12 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke={PINK} />
      </g></g>
      <g className="poster-birds" fill="none" stroke={CREAM} strokeWidth="2.2" strokeLinecap="round">
        <path d="M70 110q8-8 16 0q8-8 16 0" /><path d="M312 128q6-6 12 0q6-6 12 0" /><path d="M300 92q5-5 10 0q5-5 10 0" />
      </g>
      <text x="203" y="433" textAnchor="middle" fontFamily="Rozha One, Georgia, serif" fontSize="76" fill={INK}>नज़ारा</text>
      <text x="200" y="430" textAnchor="middle" fontFamily="Rozha One, Georgia, serif" fontSize="76" fill={CREAM}>नज़ारा</text>
      <text x="200" y="462" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="5" fill={SUN}>A PEOPLE’S ATLAS · 2026</text>
    </svg>
  )
}

// A die-cut sticker: drifts with the scroll, and you can pick it up and move it.
export function Sticker({ children, className = '', drift = 80, tilt = 0 }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [drift, -drift])
  return (
    <motion.div ref={ref} className={`sticker ${className}`} style={{ y }} aria-hidden="true">
      <motion.div
        drag
        dragElastic={0.25}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 14 }}
        initial={{ rotate: tilt }}
        whileHover={{ scale: 1.08, rotate: tilt + 8 }}
        whileDrag={{ scale: 1.18, rotate: tilt - 10 }}
        whileTap={{ scale: 1.12 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
