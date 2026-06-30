import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const PLAYERS = [
  { id: 'alphasense', name: 'AlphaSense', segment: 'Enterprise Intel', color: { bg: 'var(--gold-pale)', text: 'var(--gold)' } },
  { id: 'q4',         name: 'Q4 Inc.',    segment: 'IR Ops',           color: { bg: 'var(--teal-pale)', text: 'var(--teal)' } },
  { id: 'nasdaq',     name: 'Nasdaq IR',  segment: 'IR Ops',           color: { bg: 'var(--teal-pale)', text: 'var(--teal)' } },
  { id: 'notified',   name: 'Notified',   segment: 'IR Ops',           color: { bg: 'var(--teal-pale)', text: 'var(--teal)' } },
  { id: 'irwin',      name: 'Irwin/FactSet', segment: 'IR Ops',        color: { bg: 'var(--teal-pale)', text: 'var(--teal)' } },
  { id: 'chatfin',    name: 'ChatFin',    segment: 'Finance AI',        color: { bg: 'var(--violet-pale)', text: 'var(--violet)' } },
  { id: 'quartr',     name: 'Quartr',     segment: 'Transcript',        color: { bg: 'var(--green-pale)', text: 'var(--green)' } },
]

const COMPANY_ROSTERS = [
  {
    id: 'alphasense',
    name: 'AlphaSense',
    tagline: 'AI market intelligence · $7.5B valuation · 500M+ documents indexed',
    segment: 'Enterprise Intel',
    color: { bg: 'var(--gold-pale)', text: 'var(--gold)', accent: 'var(--gold)' },
    positioning: 'The category leader built for investors — now expanding toward corporate IR. Data breadth is its moat.',
    features: [
      'Smart Summaries — auto-summarises every earnings call on publish',
      'Chat with Doc — Q&A against any single transcript or filing',
      'Generative Grid — cross-company earnings analysis in a structured table',
      'Generative Search / Deep Research — multi-document synthesis with citations',
      'Sector-level theme tracking — monitor how a narrative evolves across calls',
      'Competitor transcript analysis — keyword & sentiment trends across peer set',
      'Expert interview library — 240K+ Tegus transcripts from industry experts',
      'Channel Checks — AI-led expert interviews conducted in real-time',
      'Sentiment analysis — on earnings transcripts, filings, and broker notes',
      'Live Events — real-time monitoring during active earnings calls',
      'Internal document search (Lens) — enterprise tier; MNPI-safe',
      'Carousel financial modelling — post-acquisition capability (2025)',
    ],
  },
  {
    id: 'q4',
    name: 'Q4 Inc.',
    tagline: 'IR operations platform · Largest institutional data repository among IR platforms',
    segment: 'IR Ops',
    color: { bg: 'var(--teal-pale)', text: 'var(--teal)', accent: 'var(--teal)' },
    positioning: 'The most earnings-prep-complete platform today. Built for the company side, not the investor side.',
    features: [
      'Earnings Co-Pilot — script drafting from company\'s own proprietary transcript data',
      'Peer Transcript Summaries — AI-generated side-by-side peer comparison',
      'Analyst Q&A theme analysis — historical pattern mining from past calls',
      'Post-earnings sentiment reports — investor reaction and trading behavior',
      'Automated briefing books — for roadshows and investor meetings',
      'Investor behaviour tracking — "digital body language" of institutional investors',
      'Earnings event hosting — webcast infrastructure with 99.9% uptime SLA',
      'MNPI-safe data partitioning — SOC 2 certified; secure company data handling',
      'AI-ready schema markup — structured output for LLM consumption',
      'Investor CRM — full relationship lifecycle tracking',
      '"Q" IRO Agent — AI layer with simultaneous access to company + peer + CRM data',
    ],
  },
  {
    id: 'nasdaq',
    name: 'Nasdaq IR Insight',
    tagline: 'Exchange-native IR intelligence · Ownership data 24hrs faster than third parties',
    segment: 'IR Ops',
    color: { bg: 'var(--teal-pale)', text: 'var(--teal)', accent: 'var(--teal)' },
    positioning: 'Superior ownership surveillance. Earnings prep is strong on competitive monitoring, weaker on simulation.',
    features: [
      'Peer transcript comparison — up to 5 peers simultaneously, 2-year history',
      'AI-generated broker note summaries — auto-synthesised post-earnings analyst notes',
      'Keyword-based competitor transcript search — flag recurring analyst themes',
      'Event interaction summaries — AI notes from investor meetings',
      'Post-earnings trading & estimate revision tracking — immediate market reaction data',
      'Automated roadshow briefing books — institutional targeting prep',
      'Real-time ownership change alerts — exchange-speed; 24hrs ahead of peers',
      'AI Report Builder — custom intelligence reports (upcoming feature)',
      'Shareholder surveillance — institutional holder movement and targeting',
    ],
  },
  {
    id: 'notified',
    name: 'Notified',
    tagline: 'Fortune 100 earnings events · Trusted by 50% of Fortune 100 for webcast infrastructure',
    segment: 'IR Ops',
    color: { bg: 'var(--teal-pale)', text: 'var(--teal)', accent: 'var(--teal)' },
    positioning: 'Service-led, infrastructure-first. AI layer is newer — growing fast on top of a very sticky event moat.',
    features: [
      'Market Intelligence — analyst question prep and competitive earnings research',
      'AI-powered IR Assistant — pre-call briefing and peer transcript monitoring',
      'Post-earnings sentiment dashboards — investor and media reaction analysis',
      'Earnings webcast hosting — global, enterprise-grade with operator assist',
      'Regulatory filing orchestration — EDGAR, SEDAR, international compliance',
      'GlobeNewswire press release distribution — reach 30,000+ media targets',
      'AI citation monitoring — tracks when company releases surface in ChatGPT/Claude',
      'Social media & media monitoring — real-time brand and earnings narrative tracking',
      'IR website design and hosting — accessible, SEO-optimised investor hubs',
      '24/7 support + Customer Experience Manager — hands-on service model',
    ],
  },
  {
    id: 'irwin',
    name: 'Irwin (FactSet)',
    tagline: 'Mid-market IR CRM · Most accessible IR platform; acquired by FactSet 2023',
    segment: 'IR Ops',
    color: { bg: 'var(--teal-pale)', text: 'var(--teal)', accent: 'var(--teal)' },
    positioning: 'Best fit for lean IR teams at small-to-mid-cap companies. CRM-first with growing AI depth via FactSet.',
    features: [
      'AI Summaries — auto-summarises investor meeting notes after each interaction',
      'Shareholder CRM — full relationship history, touchpoint logging, and tagging',
      'Investor targeting — AI-assisted fund matching and outreach prioritisation',
      'Earnings transcripts & estimates — via FactSet data integration',
      'Roadshow itinerary builder — logistics and scheduling management',
      'Tear sheets — auto-generated investor profile documents',
      'Board-ready shareholder reports — one-click institutional ownership summaries',
      'FactSet Mercury AI — natural language queries over FactSet financial data',
      'State of IR research — annual IR profession benchmark report (Irwin produces it)',
    ],
  },
  {
    id: 'chatfin',
    name: 'ChatFin',
    tagline: 'Finance AI platform · Most differentiated simulation capability in the market',
    segment: 'Finance AI',
    color: { bg: 'var(--violet-pale)', text: 'var(--violet)', accent: 'var(--violet)' },
    positioning: 'The only platform with named analyst persona simulation. Bridges CFO/finance team and IR preparation.',
    features: [
      'Q&A Simulator — AI-generated analyst questions based on sector and company context',
      'Red Team mode — ingests 5 years of a specific analyst\'s questions and mimics their voice',
      'Script analysis vs. peer transcripts — flags overused language ("synergy"), tentative phrasing',
      'Real-time in-call data retrieval — live data surfacing during the earnings call ("bionic CFO arm")',
      'Language quality review — identifies hedging, vagueness, and credibility-undermining phrasing',
      'ESG disclosure optimisation — benchmarks disclosure language against rating agency criteria',
      'Activist investor profile analysis — prepares for aggressive institutional questioning',
      'Competitor transcript comparison — thematic overlap and differentiation analysis',
      'ERP and finance system integration — connects to AP, AR, FP&A data for context',
      'Variance analysis and close automation — original CFO tooling use case',
    ],
  },
  {
    id: 'quartr',
    name: 'Quartr',
    tagline: 'AI infrastructure for public market research · 13,000+ companies · 27 markets',
    segment: 'Transcript & Research',
    color: { bg: 'var(--green-pale)', text: 'var(--green)', accent: 'var(--green)' },
    positioning: 'Best-in-class transcript access and search. A research consumption tool — not a preparation tool.',
    features: [
      'Live earnings call audio & transcription — real-time during the call, global coverage',
      'AI chat across all IR material — ask questions across transcripts, slides, filings; cite-verified',
      'Full-text search — across 13,000+ companies\' entire transcript history simultaneously',
      'Earnings call summaries & segments — auto-generated by section (prepared remarks, Q&A)',
      'Cross-company keyword search — find who is talking about a specific topic across all listed companies',
      'Workspaces — drag-and-drop research canvas with notes, clips, and citations',
      'Analyst estimates & consensus data — integrated alongside transcripts',
      'Embeddable IR player — companies can embed Quartr\'s player on their own IR website',
      'API / webhooks — 700+ financial institutions and AI companies build on Quartr\'s data',
      'Free mobile app — retail investor access; live call notifications and audio streaming',
    ],
  },
]

// status: 'full' | 'partial' | 'none'
const FEATURES = [
  {
    id: 'transcript',
    category: 'Research',
    title: 'Competitive Transcript Analysis',
    description: 'Mine competitor earnings Q&A to identify recurring themes, analyst obsessions, and sector-wide narratives before your own call.',
    players: {
      alphasense: { status: 'full',    note: 'Deep search across 500M+ docs including all public transcripts; Generative Grid for cross-company analysis.' },
      q4:         { status: 'full',    note: 'Peer transcript summaries built into Earnings Co-Pilot; side-by-side peer comparison.' },
      nasdaq:     { status: 'full',    note: 'Compare up to 5 peer transcripts at once; 2-year history; keyword search.' },
      notified:   { status: 'full',    note: 'Market Intelligence module covers peer earnings monitoring.' },
      irwin:      { status: 'partial', note: 'Transcript access via FactSet data; limited native analysis tools.' },
      chatfin:    { status: 'full',    note: 'Competitor transcript comparison with script overlap analysis.' },
      quartr:     { status: 'full',    note: 'Full-text search across 13K+ companies; live call audio + AI chat.' },
    },
    vidura: 'Vidura targets Indian pharma/healthcare peer transcripts specifically — NSE/BSE-listed peers that global platforms barely index.',
  },
  {
    id: 'qa-sim',
    category: 'Simulation',
    title: 'Q&A Simulation & Analyst Question Prediction',
    description: 'Simulate the analyst Q&A session before it happens — predicting question themes, wording, and priority areas based on sector patterns and your own history.',
    players: {
      alphasense: { status: 'none',    note: 'Built to analyze companies, not help companies prepare. No simulation capability.' },
      q4:         { status: 'full',    note: 'Historical Q&A pattern analysis; analyst question theme prediction from past call data.' },
      nasdaq:     { status: 'partial', note: 'Post-earnings analytics can infer recurring questions; not a true pre-call simulator.' },
      notified:   { status: 'partial', note: 'Market Intelligence includes analyst question prep; limited simulation depth.' },
      irwin:      { status: 'none',    note: 'CRM and shareholder focus; no simulation capability.' },
      chatfin:    { status: 'full',    note: 'Q&A Simulator mimicking analyst voices; configurable questioning styles.' },
      quartr:     { status: 'none',    note: 'Investor-facing research tool; no preparation simulation.' },
    },
    vidura: 'Vidura\'s core loop: ingest Q1–Q3 earnings, predict Q4 analyst questions, validate against actual Q4 transcript. This is the validation engine that proves the product works.',
  },
  {
    id: 'persona',
    category: 'Simulation',
    title: 'Named Analyst Persona Simulation',
    description: 'Ingest 5+ years of a specific sell-side analyst\'s questions and simulate their exact questioning style for red-team preparation.',
    players: {
      alphasense: { status: 'none', note: 'No persona simulation at any tier.' },
      q4:         { status: 'none', note: 'Q&A pattern analysis is aggregate, not analyst-specific.' },
      nasdaq:     { status: 'none', note: 'No persona simulation.' },
      notified:   { status: 'none', note: 'No persona simulation.' },
      irwin:      { status: 'none', note: 'No persona simulation.' },
      chatfin:    { status: 'full', note: 'Red Team mode — only platform with named analyst persona simulation. Ingests analyst\'s question history.' },
      quartr:     { status: 'none', note: 'No persona simulation.' },
    },
    vidura: 'On Vidura\'s roadmap for Phase 2. Requires building an analyst transcript library for Indian sell-side analysts (Jefferies, CLSA, Macquarie India, etc.).',
  },
  {
    id: 'script',
    category: 'Preparation',
    title: 'Earnings Script Drafting',
    description: 'Draft opening remarks, prepared statements, and management commentary using company-specific historical data and peer benchmarks.',
    players: {
      alphasense: { status: 'none',    note: 'No script drafting. Research tool, not a preparation tool.' },
      q4:         { status: 'full',    note: 'Earnings Co-Pilot drafts scripts from proprietary company data + peer transcripts.' },
      nasdaq:     { status: 'none',    note: 'No native script drafting capability.' },
      notified:   { status: 'none',    note: 'IR Assistant provides prep context but not script drafting.' },
      irwin:      { status: 'none',    note: 'No script drafting.' },
      chatfin:    { status: 'full',    note: 'Script analysis vs. peer transcripts; flags overused language ("synergy") and tentative phrasing.' },
      quartr:     { status: 'none',    note: 'No preparation tooling.' },
    },
    vidura: 'Phase 2 feature. Vidura\'s advantage: script grounded in Aster DM\'s specific language history and peer pharma call patterns, not generic templates.',
  },
  {
    id: 'promise',
    category: 'Intelligence',
    title: 'Historical Promise & Guidance Tracking',
    description: 'Surface every commitment management made in prior earnings calls — margin recovery targets, capex plans, headcount guidance — and flag which ones haven\'t delivered.',
    players: {
      alphasense: { status: 'partial', note: 'Can search for specific phrases across a company\'s transcript history; not a structured promise-tracking system.' },
      q4:         { status: 'full',    note: 'Trained on company\'s own historical transcripts; can surface past guidance. Best available today.' },
      nasdaq:     { status: 'partial', note: '2-year peer history gives some context; not structured promise tracking.' },
      notified:   { status: 'none',    note: 'No systematic promise tracking.' },
      irwin:      { status: 'none',    note: 'No systematic promise tracking.' },
      chatfin:    { status: 'none',    note: 'Flagged as a gap; not in current feature set.' },
      quartr:     { status: 'none',    note: 'Search can find mentions; no structured tracking.' },
    },
    vidura: 'Core Phase 1 feature. The RAG pipeline extracts and indexes every guidance statement from ingested Aster DM transcripts. Analysts ask about these first — the company must too.',
  },
  {
    id: 'sector',
    category: 'Intelligence',
    title: 'Sector Intelligence Synthesis',
    description: 'Automatically synthesise how the sector has moved since the last earnings call — regulatory shifts, commodity cycles, peer performance, macro signals — as a pre-call briefing.',
    players: {
      alphasense: { status: 'full',    note: 'Unmatched sector theme tracking; generative search across broker research, filings, expert calls.' },
      q4:         { status: 'partial', note: 'Sector context available through peer transcript summaries; not a dedicated sector briefing.' },
      nasdaq:     { status: 'partial', note: 'Post-earnings sector analytics; limited pre-call sector synthesis.' },
      notified:   { status: 'partial', note: 'Media monitoring and some sector signals; not a structured pre-call briefing.' },
      irwin:      { status: 'partial', note: 'FactSet sector data available; requires manual interpretation.' },
      chatfin:    { status: 'partial', note: 'ESG disclosure optimization includes some sector context; no auto-briefing.' },
      quartr:     { status: 'partial', note: 'Keyword search across all public companies is useful for manual sector research.' },
    },
    vidura: 'Pre-call briefing tailored to Indian pharma/healthcare: SEBI regulatory calendar, drug approvals, sector KPI movements, and NSE/BSE peer results — all auto-synthesised.',
  },
  {
    id: 'private-data',
    category: 'Data',
    title: 'Internal Document & Private Data Integration',
    description: 'Integrate company-private documents — board presentations, internal memos, past investor communications — into the preparation workflow without MNPI risk.',
    players: {
      alphasense: { status: 'full',    note: 'Lens for internal document integration in enterprise tier; widely used by corporate strategy teams.' },
      q4:         { status: 'full',    note: 'Full integration with company-private data; SOC 2 compliant MNPI partitioning.' },
      nasdaq:     { status: 'none',    note: 'Public data only; no internal document integration.' },
      notified:   { status: 'none',    note: 'No internal data integration in current product.' },
      irwin:      { status: 'partial', note: 'Meeting note AI summaries; limited private data integration beyond CRM.' },
      chatfin:    { status: 'full',    note: 'Connects to ERP systems and finance data; IR module integrates this for earnings prep.' },
      quartr:     { status: 'none',    note: 'Public data only.' },
    },
    vidura: 'Phase 1 foundation: Vidura is built around private data ingestion. The company\'s own transcripts, board decks, and investor correspondence are the core corpus.',
  },
  {
    id: 'pricing',
    category: 'Access',
    title: 'Mid-Market & Emerging Market Accessibility',
    description: 'Accessible to ₹500cr–₹5,000cr listed companies, Indian and Southeast Asian markets, without $50K/year enterprise pricing.',
    players: {
      alphasense: { status: 'none',    note: '$12K–$100K+/yr per seat. Built for large-cap global companies and institutional investors.' },
      q4:         { status: 'partial', note: 'Accessible relative to AlphaSense; still enterprise-tier pricing. Strong in North America.' },
      nasdaq:     { status: 'none',    note: 'Priced as part of Nasdaq exchange relationship. Not accessible for most Indian companies.' },
      notified:   { status: 'none',    note: 'Fortune 100 focus; enterprise service model. Not mid-market.' },
      irwin:      { status: 'full',    note: 'Mid-market pricing is Irwin\'s core positioning; accessible for smaller IR teams.' },
      chatfin:    { status: 'full',    note: 'Finance-team pricing; more accessible than IR ops platforms.' },
      quartr:     { status: 'full',    note: 'Free app + affordable Pro tier; most accessible pricing in the landscape.' },
    },
    vidura: 'Vidura\'s primary white space. Built specifically for Indian listed companies. No competitor has built for SEBI regulations, Indian sector dynamics, or NSE/BSE formats natively.',
  },
]

const CATEGORIES_FL = ['All', 'Research', 'Simulation', 'Preparation', 'Intelligence', 'Data', 'Access']

export default function FeatureLandscape() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? FEATURES
    : FEATURES.filter(f => f.category === activeCategory)

  return (
    <motion.div
      className="page-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Hero */}
      <Reveal>
        <div className="fl-hero">
          <p className="hero-eyebrow">Feature Analysis · June 2026</p>
          <h1 className="serif-h1" style={{ marginBottom: '1rem' }}>
            Who builds what for<br /><em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>earnings intelligence</em>
          </h1>
          <p className="hero-desc">
            Eight capability axes mapped across seven platforms — from the company's perspective, not the investor's. Where does each player excel, where do they fall short, and where does Vidura fit?
          </p>
          <div className="hero-meta">
            <span className="meta-pill"><span className="dot" />{FEATURES.length} Capability Dimensions</span>
            <span className="meta-pill"><span className="dot" />{PLAYERS.length} Players Mapped</span>
            <span className="meta-pill"><span className="dot" />Company-side Lens</span>
          </div>
        </div>
      </Reveal>

      {/* Company feature rosters */}
      <Reveal delay={0.05}>
        <div className="roster-section">
          <div className="roster-header">
            <span className="section-eyebrow">Company Profiles</span>
            <h2 style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}>What each player actually ships</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '600px', lineHeight: 1.7 }}>
              A feature-by-feature breakdown of each platform's current product — grounded in their own documentation, sales decks, and G2/Gartner reviews as of mid-2026.
            </p>
          </div>
          <div className="roster-grid">
            {COMPANY_ROSTERS.map(company => (
              <div key={company.id} className="roster-card">
                <div className="roster-card-header" style={{ borderTop: `3px solid ${company.color.accent}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div className="roster-card-name">{company.name}</div>
                    <span className="card-badge" style={{ background: company.color.bg, color: company.color.text, whiteSpace: 'nowrap', flexShrink: 0 }}>{company.segment}</span>
                  </div>
                  <div className="roster-card-tagline">{company.tagline}</div>
                  <div className="roster-card-positioning">{company.positioning}</div>
                </div>
                <ul className="roster-feature-list">
                  {company.features.map((f, i) => {
                    const [name, ...rest] = f.split(' — ')
                    return (
                      <li key={i} className="roster-feature-item">
                        <span className="roster-feature-dot" style={{ background: company.color.accent }} />
                        <span>
                          <strong>{name}</strong>
                          {rest.length > 0 && <span className="roster-feature-note"> — {rest.join(' — ')}</span>}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Player legend */}
      <Reveal delay={0.05}>
        <div style={{ padding: '1.5rem 2rem', maxWidth: '1080px', margin: '0 auto', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '0.75rem' }}>
            Players mapped
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {PLAYERS.map(p => (
              <span
                key={p.id}
                className="card-badge"
                style={{ background: p.color.bg, color: p.color.text }}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Legend */}
      <Reveal delay={0.08}>
        <div style={{ padding: '1rem 2rem', maxWidth: '1080px', margin: '0 auto', borderBottom: '1px solid var(--rule)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>Legend:</span>
          {[
            { status: 'full', label: 'Full capability', color: 'var(--green)' },
            { status: 'partial', label: 'Partial', color: 'var(--gold)' },
            { status: 'none', label: 'Not available', color: 'var(--rule)' },
          ].map(l => (
            <span key={l.status} className="fl-status">
              <span className={`fl-status-dot ${l.status}`} />
              <span className="fl-status-label">{l.label}</span>
            </span>
          ))}
        </div>
      </Reveal>

      {/* Category filter */}
      <div className="fl-feature-nav">
        <span className="fl-filter-label">Category:</span>
        {CATEGORIES_FL.map(cat => (
          <button
            key={cat}
            className={`fl-tab${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feature blocks */}
      <div className="fl-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((feature, idx) => (
              <div key={feature.id} className="fl-feature-block">
                <div className="fl-feature-header">
                  <div className="fl-feature-meta">
                    <div className="fl-feature-num">
                      {String(idx + 1).padStart(2, '0')} · {feature.category}
                    </div>
                    <div className="fl-feature-title">{feature.title}</div>
                    <div className="fl-feature-desc">{feature.description}</div>
                  </div>
                </div>

                <div className="fl-player-grid">
                  {PLAYERS.map(player => {
                    const info = feature.players[player.id]
                    return (
                      <div
                        key={player.id}
                        className={`fl-player-tile has-${info.status}`}
                      >
                        <div className="fl-status">
                          <span className={`fl-status-dot ${info.status}`} />
                          <span className="fl-status-label">
                            {info.status === 'full' ? 'Full' : info.status === 'partial' ? 'Partial' : 'Not available'}
                          </span>
                        </div>
                        <div className="fl-player-name">
                          <span className="card-badge" style={{ background: player.color.bg, color: player.color.text }}>
                            {player.name}
                          </span>
                        </div>
                        <div className="fl-player-note">{info.note}</div>
                      </div>
                    )
                  })}
                </div>

                {feature.vidura && (
                  <div className="fl-vidura-bar">
                    <span className="fl-vidura-tag">Vidura</span>
                    <span className="fl-vidura-text">{feature.vidura}</span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* White space callout */}
      <Reveal>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '3rem 2rem', borderTop: '1px solid var(--rule)' }}>
          <span className="section-label">The White Space</span>
          <h2 className="serif-h2" style={{ marginBottom: '1.5rem' }}>What nobody has built yet</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🌏', title: 'Indian market native', desc: 'Every platform is US/Europe-centric. NSE/BSE companies, SEBI regulations, Indian pharma sector dynamics — zero native coverage.' },
              { icon: '🔁', title: 'Promise tracking as a product', desc: 'No platform systematically surfaces management\'s past guidance commitments from the company\'s own perspective. Analysts track it — why doesn\'t the company?' },
              { icon: '🎯', title: 'True RAG over private corpus', desc: 'Q4 comes closest, but at $50K+/yr for large-cap IR teams. A RAG pipeline over your own transcript history, accessible at mid-market pricing, doesn\'t exist.' },
              { icon: '💼', title: 'CFO-first, not IR-first', desc: 'Every tool is built for the IR department. Vidura is built for the CFO and finance team — the people who actually need to defend the numbers.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="gap-card gap-highlight">
                  <div className="gap-icon">{item.icon}</div>
                  <h3 className="serif-h3" style={{ marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--teal)', lineHeight: '1.65' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Footer />
    </motion.div>
  )
}
