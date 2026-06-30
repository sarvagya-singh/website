import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const COMPANIES = [
  {
    id: 'alphasense', segment: 'enterprise-intelligence', segLabel: 'Enterprise Intel',
    segStyle: { background: 'var(--gold-pale)', color: 'var(--gold)' },
    name: 'AlphaSense', tagline: 'AI market intelligence, 500M+ documents, $7.5B valuation',
    what: 'The category leader in AI-powered market intelligence for financial services and corporate teams. Combines external content (earnings transcripts, SEC filings, broker research, expert interviews) with internal document search, all queried through generative AI. Acquired Tegus ($930M, 2024) for 240,000+ expert transcripts and Carousel (2025) for financial modelling. Reached $600M ARR and $7.5B valuation in June 2026.',
    audience: 'Hedge funds, asset managers, private equity, investment banking, sell-side equity research, corporate strategy, and increasingly IR/investor relations teams. Used by 88% of the S&P 100 and 70% of the top 50 hedge funds.',
    features: ['Smart Summaries (auto-summaries of every earnings call)', 'Chat with Doc (Q&A on individual transcripts)', 'Generative Grid (cross-company earnings analysis)', 'Generative Search / Deep Research', 'Sector-level theme tracking', 'Competitor transcript analysis', 'Expert interview library (240K+ transcripts)', 'Channel Checks (AI-led expert interviews in real-time)', 'Sentiment analysis on filings & calls', 'Live Events (real-time earnings call monitoring)'],
    lacks: 'Built to help investors analyze companies, not companies prepare to speak. No script drafting, no Q&A simulation from the company\'s perspective, no MNPI-safe company document integration in the standard tier.',
    pricing: '$12K–$100K+/yr per seat', pricingNote: 'Custom enterprise quotes; median ~$18K/yr',
    audience2: 'Buy-side primary', audStyle: { background: 'var(--gold-pale)', color: 'var(--gold)' },
  },
  {
    id: 'q4', segment: 'ir-ops', segLabel: 'IR Ops',
    segStyle: { background: 'var(--teal-pale)', color: 'var(--teal)' },
    name: 'Q4 Inc.', tagline: 'IR operations platform with AI co-pilot for earnings',
    what: 'Q4 is the leading IR operations platform, unifying IR websites, earnings events, investor CRM, and market intelligence in one system. Its AI layer — branded "Q" (the IRO Agent) — sits across the entire platform and has access to the company\'s own transcripts, meeting notes, peer earnings, and ownership data simultaneously. Holds the largest institutional data repository in the market among IR platforms.',
    audience: 'IR departments at mid-to-large cap public companies globally. Used by companies that need to manage the full investor relations lifecycle, from earnings events to roadshows to analyst outreach. Strong in North America; expanding globally.',
    features: ['Earnings Co-Pilot (script drafting from proprietary data)', 'Peer Transcript Summaries', 'Analyst Q&A theme analysis (historical)', 'Post-earnings sentiment & trading behavior reports', 'Automated briefing books for roadshows', 'Investor behavior tracking (digital body language)', 'Earnings event hosting (99.9% uptime)', 'MNPI-safe data partitioning (SOC 2)', 'AI-ready schema markup for LLMs'],
    standout: 'Q4 is the only platform where the AI is trained on the company\'s own historical transcripts, peer signals, and CRM data simultaneously. IROs say this produces far more relevant answers than generic AI tools — with full MNPI security compliance.',
    pricing: 'Enterprise — undisclosed', pricingNote: 'Annual contracts, relationship-based pricing',
    audience2: 'Corporate IR teams', audStyle: { background: 'var(--teal-pale)', color: 'var(--teal)' },
  },
  {
    id: 'nasdaq', segment: 'ir-ops', segLabel: 'IR Ops',
    segStyle: { background: 'var(--teal-pale)', color: 'var(--teal)' },
    name: 'Nasdaq IR Insight', tagline: 'Exchange-native IR intelligence platform with AI Assistant',
    what: 'Nasdaq\'s investor intelligence platform, built for public and pre-IPO companies. Differentiator is exchange-native data — Nasdaq feeds ownership and transaction data directly from exchange flows, 24 hours faster than third-party IR platforms that reconstruct from filings. The AI Assistant, launched in 2024, extends this with earnings-specific capabilities across peer transcripts and broker research.',
    audience: 'Growth-to-large-cap public companies, primarily post-IPO companies on Nasdaq or NYSE. IR teams that prioritise institutional shareholder surveillance and fast ownership change alerts.',
    features: ['Peer transcript comparison (up to 5 at once, 2yr history)', 'AI-generated broker note summaries (post-earnings)', 'Keyword-based competitor transcript search', 'Event interaction summaries (investor meetings)', 'Post-earnings trading & estimate revision tracking', 'Automated roadshow briefing books', 'Real-time ownership change alerts (exchange-speed)', 'AI Report Builder (upcoming)'],
    lacks: 'Strong post-earnings intelligence and competitive monitoring; weaker on pre-call script drafting, Q&A simulation, and historical promise-tracking from the company\'s own past calls.',
    pricing: 'Enterprise — undisclosed', pricingNote: 'Typically part of Nasdaq exchange relationship',
    audience2: 'Corporate IR teams', audStyle: { background: 'var(--teal-pale)', color: 'var(--teal)' },
  },
  {
    id: 'notified', segment: 'ir-ops', segLabel: 'IR Ops',
    segStyle: { background: 'var(--teal-pale)', color: 'var(--teal)' },
    name: 'Notified', tagline: 'Fortune 100 earnings event platform with Market Intelligence AI',
    what: 'Notified (by West Technology Group, which also owns GlobeNewswire) is trusted by 50% of the Fortune 100 for earnings event hosting. It occupies the premium end of earnings infrastructure: live webcasts, operator-assisted calls, regulatory filing orchestration, accessible IR websites. Its IR Hub centralises all of this with an AI-powered IR Assistant for earnings preparation.',
    audience: 'Large-cap public companies (especially Fortune 500) that need enterprise-grade earnings hosting, global multinational compliance, and hands-on service (Customer Experience Managers, 24/7 support, on-site specialists).',
    features: ['Market Intelligence (analyst question prep & competitive research)', 'AI-powered IR Assistant (earnings briefing, peer monitoring)', 'Post-earnings sentiment & investor reaction dashboards', 'Earnings webcast hosting (global, enterprise-grade)', 'Regulatory filing orchestration', 'GlobeNewswire press release distribution', 'AI citation monitoring (tracks if releases surface in ChatGPT/Claude)', 'Social media & media monitoring'],
    standout: 'Service model differentiates Notified. For companies running high-stakes global earnings, the combination of production team, 24/7 support, and compliance infrastructure is its own moat. The AI layer is newer and growing.',
    pricing: 'Enterprise — undisclosed', pricingNote: 'Service + software bundled; relationship pricing',
    audience2: 'Large-cap IR teams', audStyle: { background: 'var(--teal-pale)', color: 'var(--teal)' },
  },
  {
    id: 'irwin', segment: 'ir-ops', segLabel: 'IR Ops',
    segStyle: { background: 'var(--teal-pale)', color: 'var(--teal)' },
    name: 'Irwin (FactSet)', tagline: 'Mid-market IR CRM + AI summaries, now part of FactSet',
    what: 'Irwin was founded in 2017 in Toronto to address the mid-market gap between spreadsheet-based IR and expensive enterprise systems. Acquired by FactSet, it combines a shareholder CRM with AI-assisted investor targeting and, more recently, AI Summaries for meeting notes. The State of IR 2026 report (produced by Irwin) documents the profession\'s current AI adoption curve.',
    audience: 'Small-to-mid-cap public companies ($500M–$5B market cap) with dedicated but lean IR teams. Positioned as the accessible, affordable alternative to Q4 or Nasdaq IR Insight without sacrificing data quality through FactSet integration.',
    features: ['AI Summaries (auto-summarises investor meeting notes)', 'Shareholder CRM with relationship history', 'Investor targeting (AI-assisted fund matching)', 'Earnings transcripts & estimates (via FactSet data)', 'Roadshow itinerary builder & tear sheets', 'Board-ready shareholder reports', 'FactSet Mercury AI for data queries'],
    lacks: 'Strong on CRM and post-meeting intelligence; limited on competitive earnings transcript analysis, Q&A simulation, and sector intelligence for pre-call preparation. The FactSet integration is adding depth here.',
    pricing: 'Mid-market pricing', pricingNote: 'Custom quotes; more accessible than Q4/Nasdaq',
    audience2: 'Small-mid cap IR', audStyle: { background: 'var(--teal-pale)', color: 'var(--teal)' },
  },
  {
    id: 'chatfin', segment: 'finance-ai', segLabel: 'Finance AI',
    segStyle: { background: 'var(--violet-pale)', color: 'var(--violet)' },
    name: 'ChatFin', tagline: 'Finance AI platform with IR Q&A simulation & script analysis',
    what: 'ChatFin is an AI-native finance platform originally built for CFO teams — connecting to ERPs, handling AP/AR, variance analysis, and FP&A automation. Its IR module extends this to earnings preparation, with a distinctive Q&A Simulator that mimics specific analyst questioning styles. The platform is AI-first and designed for finance teams that haven\'t historically had large IR budgets.',
    audience: 'CFO and finance teams at mid-market public companies. Also IR consultants and financial advisors who support multiple client companies. The IR module is most differentiated for companies that want simulation-grade preparation without enterprise IR platform cost.',
    features: ['Q&A Simulator (analyst-voice simulation)', 'Script analysis vs. peer transcripts ("synergy" over-use flagging)', 'Red Team mode (simulates named analyst questioning styles)', 'Real-time in-call data retrieval ("bionic CFO arm")', 'Language quality review (flags tentative phrasing)', 'ESG disclosure optimisation vs. rating agency criteria', 'Activist investor profile analysis', 'Competitor transcript comparison'],
    standout: 'The Red Team Simulation — ingesting 5 years of a specific analyst\'s questions and simulating their voice for preparation — is genuinely novel and not well-replicated elsewhere. The real-time in-call data retrieval concept positions it as a preparation + execution tool.',
    pricing: 'Subscription — custom', pricingNote: 'Enterprise finance platform pricing',
    audience2: 'CFO / Finance teams', audStyle: { background: 'var(--violet-pale)', color: 'var(--violet)' },
  },
  {
    id: 'amenity', segment: 'enterprise-intelligence', segLabel: 'Enterprise Intel',
    segStyle: { background: 'var(--gold-pale)', color: 'var(--gold)' },
    name: 'Amenity Analytics', tagline: 'NLP text analytics for earnings signals, now part of Symphony',
    what: 'Founded 2015, Amenity Analytics was an AI-driven text analytics platform specialising in NLP-based signals from earnings calls, SEC filings, and unstructured financial text. It combined ML, sentiment analysis, and predictive analytics to build actionable trade signals. Acquired by Symphony (automation/workflow software) in November 2022.',
    audience: 'Originally hedge funds and institutional investors using earnings text for alpha generation. Post-acquisition, capabilities are being folded into Symphony\'s enterprise workflow automation products for financial services.',
    features: ['Sentiment analysis on earnings transcripts at scale', 'NLP signal extraction from Q&A sections', 'Predictive analytics from management language', 'Custom dataset construction from unstructured text', 'Trade signal generation from earnings text'],
    lacks: 'As an acquired entity, Amenity\'s standalone product is no longer actively marketed. Its NLP capabilities are being absorbed into Symphony\'s broader financial workflow platform. Included here as a reference point for the NLP-signal-extraction approach.',
    pricing: 'Acquired — not standalone', pricingNote: 'Now part of Symphony\'s enterprise suite',
    audience2: 'Institutional investors', audStyle: { background: 'var(--gold-pale)', color: 'var(--gold)' },
  },
  {
    id: 'quartr', segment: 'transcript', segLabel: 'Transcript & Research',
    segStyle: { background: 'var(--green-pale)', color: 'var(--green)' },
    name: 'Quartr', tagline: 'AI infrastructure for qualitative public market research',
    what: 'Quartr describes itself as "AI infrastructure for company research" — providing real-time transcripts, live call audio, filings, slide decks, and AI chat across 13,000+ public companies in 27 markets. Free mobile app has made it popular with retail and professional investors; Quartr Pro is the institutional desktop tier; the API is used by 700+ financial institutions and AI companies globally.',
    audience: 'Retail investors (free mobile app), professional investors and equity research teams (Quartr Pro), IR departments (embeddable player for IR websites), and fintech / AI companies building on IR data (API). Broad reach across experience levels.',
    features: ['Live earnings call audio & transcription', 'AI chat across all IR material (cite-verified)', 'Full-text search across 13K+ company transcripts', 'Earnings call summaries & segments', 'Keyword search across all public companies simultaneously', 'Workspaces (drag-and-drop research with notes)', 'Analyst estimates & consensus data', 'API / webhooks for enterprise integration'],
    lacks: 'Quartr is a research consumption tool, not a preparation tool. No Q&A simulation, no company-internal document integration, no script drafting, no competitor positioning analysis from the company\'s perspective. Primarily serves the investor reading the call, not the company preparing for it.',
    pricing: 'Free app · Pro from ~$20/mo · API custom', pricingNote: 'Most accessible pricing in this landscape',
    audience2: 'Investors & IR teams', audStyle: { background: 'var(--green-pale)', color: 'var(--green)' },
  },
]

const TABLE_ROWS = [
  { label: 'Competitive earnings transcript analysis', vals: ['full','full','full','full','partial','full','full'] },
  { label: 'Q&A simulation / analyst question prediction', vals: ['none','full','partial','partial','none','full','none'] },
  { label: 'Specific analyst persona simulation', vals: ['none','none','none','none','none','full','none'] },
  { label: 'Earnings script drafting', vals: ['none','full','none','none','none','full','none'] },
  { label: 'Historical promise / guidance tracking (own calls)', vals: ['partial','full','partial','none','none','none','none'] },
  { label: 'Sector intelligence (how sector is moving)', vals: ['full','partial','partial','partial','partial','partial','partial'] },
  { label: 'Internal document / private data integration', vals: ['full','full','none','none','partial','full','none'] },
  { label: 'MNPI-safe / enterprise security', vals: ['full','full','full','full','full','partial','none'] },
  { label: 'Investor targeting / shareholder CRM', vals: ['none','full','full','partial','full','none','none'] },
  { label: 'Post-earnings sentiment / market reaction analysis', vals: ['full','full','full','full','partial','partial','none'] },
  { label: 'Live earnings call infrastructure', vals: ['none','full','none','full','none','none','full'] },
  { label: 'Accessible for mid/small-cap companies', vals: ['none','partial','none','none','full','full','full'] },
]

function StatusCell({ v }) {
  if (v === 'full')    return <span className="check">✓</span>
  if (v === 'partial') return <span className="partial">Partial</span>
  return <span className="cross">—</span>
}

export default function EarningsIntelligence() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? COMPANIES
    : COMPANIES.filter(c => c.segment === activeFilter)

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
        <header className="hero">
          <p className="hero-eyebrow">Competitive Landscape Report · June 2026</p>
          <h1 className="serif-h1">Who is already building<br /><em>AI for the earnings room?</em></h1>
          <p className="hero-desc">
            A comprehensive mapping of every platform that touches AI-assisted earnings call preparation — who they serve, what they do, and where the white space still lives.
          </p>
          <div className="hero-meta">
            <span className="meta-pill"><span className="dot" />8 Companies Profiled</span>
            <span className="meta-pill"><span className="dot" />4 Market Segments</span>
            <span className="meta-pill"><span className="dot" />25+ Capability Axes</span>
            <span className="meta-pill"><span className="dot" />Sources: G2, Sacra, Gartner, Vendor Sites</span>
          </div>
        </header>
      </Reveal>

      {/* Executive Summary */}
      <Reveal>
        <section className="summary-section" id="landscape">
          <span className="section-label">Executive Summary</span>
          <h2 className="serif-h2">The market is real — but fractured</h2>
          <p>Every quarter, IR officers, CFOs, and investor relations teams at listed companies spend weeks preparing for earnings calls — scripting, anticipating analyst questions, benchmarking peers, and digging for competitive signals. A cluster of AI platforms now addresses slices of this workflow. But the picture is fragmented: investor-side intelligence tools (built to help fund managers analyze companies) have evolved away from the buy-side toward corporate IR teams, while purpose-built IR ops platforms have bolted AI onto event infrastructure. No single player yet owns the full pre-call preparation stack from the company's perspective.</p>
          <p>The opportunity space — a platform built <em>for</em> the company's own IR and investor-relations team, hypercontextualised with sector data, competitive transcript mining, and the company's own historical promises — remains largely unaddressed.</p>
          <div className="landscape-grid">
            {[
              { num: '$7.5B', label: 'AlphaSense valuation, June 2026 funding round led by Vitruvian & Accenture Ventures' },
              { num: '64%',   label: 'IR professionals who haven\'t embedded AI yet, but are actively interested (FactSet / Irwin State of IR)' },
              { num: '$4.5B', label: 'Projected AI Agents in Financial Services market by 2030 (from $490M in 2024)' },
              { num: '73%',   label: 'IR teams citing integration gaps as their top challenge — tools don\'t talk to each other (Irwin State of IR 2026)' },
              { num: '500M+', label: 'Documents indexed by AlphaSense including earnings transcripts, filings, expert calls, broker research' },
              { num: 'Weeks', label: 'Typical IR team prep time per earnings cycle — the core pain point the market is trying to compress' },
            ].map(s => (
              <div key={s.num} className="landscape-stat">
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Segments */}
      <Reveal>
        <section className="segment-section" id="segments">
          <span className="section-label">Market Segmentation</span>
          <h2 className="serif-h2">Four distinct player archetypes</h2>
          {[
            {
              tag: 'seg-gold', num: 'Segment 01', title: 'Enterprise Market Intelligence', sub: 'Originally investor-facing, now expanding toward corporate/IR',
              body: 'These platforms — AlphaSense, FactSet, Bloomberg — were built to help analysts, fund managers, and corporate strategists search across millions of documents. They have vast transcript libraries, generative AI search, and expert call networks. They are increasingly extending to corporate IR and investor relations teams, offering earnings prep workflows and competitive transcript analysis. Their moat is data breadth and trusted content provenance, but their interface complexity and cost structure ($10K–$100K+ per seat per year) limit adoption for mid-market companies.',
            },
            {
              tag: 'seg-teal', num: 'Segment 02', title: 'IR Operations Platforms', sub: 'Infrastructure-first, AI as a recent layer',
              body: 'Q4 Inc., Notified, and Nasdaq IR Insight operate in this space. They started as event management and IR website platforms — hosting earnings webcasts, managing disclosure filings, running investor targeting CRMs. AI has been layered on top: Q4\'s Earnings Co-Pilot drafts scripts and summarises peer transcripts; Nasdaq IR Insight\'s AI Assistant compares up to five peer calls at once and auto-generates broker note summaries. Their differentiator is workflow integration across the full IR cycle, and enterprise compliance (SOC 2, MNPI partitioning).',
            },
            {
              tag: 'seg-violet', num: 'Segment 03', title: 'Finance AI / CFO Tooling', sub: 'FP&A-adjacent platforms adding IR simulation',
              body: 'ChatFin and similar platforms started as AI assistants for finance operations (AP, AR, close management, FP&A), and have extended into earnings preparation features. ChatFin\'s IR module offers a Q&A Simulator, script optimisation against peer transcripts, red-team analyst simulation (mimicking the style and obsessions of specific analysts), and real-time in-call data retrieval. This segment bridges the corporate finance team and the IR team, recognising that earnings preparation is as much a finance function as a communications function.',
            },
            {
              tag: 'seg-green', num: 'Segment 04', title: 'Transcript & Research Utilities', sub: 'Access-first, search-first, often freemium',
              body: 'Quartr, EarningsCall.ai, EarningsCall.biz, and Fiscal.ai sit in this tier. They aggregate transcripts, filings, slides, and live call audio across thousands of public companies, with AI chat layered on top. Quartr covers 13,000+ companies across 27 markets, and its Pro platform is used by hedge funds, asset managers, and equity research desks for qualitative public-market research. These are often the starting point for an IR team doing manual competitive research, but they lack preparation simulation and company-private document integration.',
            },
          ].map(seg => (
            <div key={seg.num} className="segment-row">
              <div>
                <span className={`segment-tag ${seg.tag}`}>{seg.num}</span>
                <div className="segment-title">{seg.title}</div>
                <div className="segment-sub">{seg.sub}</div>
              </div>
              <div className="segment-body"><p>{seg.body}</p></div>
            </div>
          ))}
        </section>
      </Reveal>

      {/* Company Profiles */}
      <section className="profiles-section" id="profiles">
        <span className="section-label">Detailed Company Profiles</span>
        <h2 className="serif-h2">Eight platforms, examined</h2>
        <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>Profiles are drawn from vendor documentation, G2 reviews, Sacra ARR data, Gartner research, and industry reporting as of June 2026.</p>

        <div className="filter-bar">
          {[
            { key: 'all', label: 'All' },
            { key: 'enterprise-intelligence', label: 'Enterprise Intelligence' },
            { key: 'ir-ops', label: 'IR Ops' },
            { key: 'finance-ai', label: 'Finance AI' },
            { key: 'transcript', label: 'Transcript & Research' },
          ].map(f => (
            <button
              key={f.key}
              className={`filter-btn${activeFilter === f.key ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="company-grid">
          {filtered.map((co, i) => (
            <Reveal key={co.id} delay={i * 0.04}>
              <div className="card">
                <div className="card-header">
                  <div className="card-name-wrap">
                    <div className="card-name">{co.name}</div>
                    <div className="card-tagline">{co.tagline}</div>
                  </div>
                  <span className="card-badge" style={co.segStyle}>{co.segLabel}</span>
                </div>
                <div className="card-body">
                  <div className="card-section-label">What it is</div>
                  <p>{co.what}</p>
                  <div className="card-section-label">Target Audience</div>
                  <p>{co.audience}</p>
                  <div className="card-section-label">Earnings-Relevant Features</div>
                  <ul className="feature-list">{co.features.map(f => <li key={f}>{f}</li>)}</ul>
                  {co.lacks && (
                    <>
                      <div className="card-section-label">What it lacks for corp IR prep</div>
                      <p>{co.lacks}</p>
                    </>
                  )}
                  {co.standout && (
                    <>
                      <div className="card-section-label">Standout differentiator</div>
                      <p>{co.standout}</p>
                    </>
                  )}
                </div>
                <div className="card-footer">
                  <div>
                    <div className="pricing-label">{co.pricing}</div>
                    <div className="pricing-note">{co.pricingNote}</div>
                  </div>
                  <span className="audience-tag" style={co.audStyle}>{co.audience2}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <Reveal>
        <section className="table-section" id="comparison">
          <span className="section-label">Feature Comparison</span>
          <h2 className="serif-h2">Capability matrix across the field</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>Mapping 12 key capabilities against each platform, from the IR team's point of view — as a company preparing for an earnings call, not as an investor analyzing one.</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Capability</th>
                  {['AlphaSense','Q4 Inc.','Nasdaq IR','Notified','Irwin/FactSet','ChatFin','Quartr'].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(row => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.vals.map((v, i) => <td key={i}><StatusCell v={v} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* Gap Analysis */}
      <Reveal>
        <section className="gap-section" id="gaps">
          <span className="section-label">White Space Analysis</span>
          <h2 className="serif-h2">What the market has not built yet</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>These are the gaps that persist across every existing platform — the capabilities that don't exist today at any price point, or exist in fragmented form without being unified into a single preparation workflow.</p>
          <div className="gap-grid">
            {[
              { icon: '🎯', h: true, title: 'True Hypercontextualisation from the company\'s side', body: 'No platform simultaneously combines (1) the company\'s own historical transcripts and internal reports, (2) real-time sector intelligence, (3) competitor earnings Q&A from the same quarter, and (4) what specific commitments management made in prior calls — all in a single preparation session. Q4 comes closest but is infrastructure-heavy and large-cap focused.' },
              { icon: '🔁', h: true, title: 'Historical Promise & Guidance Tracking', body: '"In Q3 2023 you said margins would recover by H1 2025 — they haven\'t. Why?" No existing platform surfaces this systematically for the company preparing to answer it. Investors track these inconsistencies; the company often does not have a tool that does the same job from the inside looking out.' },
              { icon: '🏭', h: true, title: 'Sector-level macro intelligence synthesised for call prep', body: 'Sector context — regulatory shifts, commodity cycles, technology adoption, supply chain developments — is available in AlphaSense and FactSet but not synthesised automatically as call context. IR teams still manually research "how has the sector moved since last quarter?" before each call.' },
              { icon: '🎙️', h: false, title: 'Real-time in-call AI assistance at the CFO level', body: 'ChatFin conceptualises "real-time data retrieval during the call" but this remains largely theoretical in practice. No platform has achieved production-grade, latency-acceptable AI assistance that surfaces the right data point when an analyst asks an unexpected question live on the call.' },
              { icon: '💼', h: false, title: 'Mid-market company access at realistic price points', body: 'The best platforms (AlphaSense, Q4) are priced for large-cap companies with large IR budgets. A NASDAQ-listed ₹500cr to ₹5,000cr company, or a BSE mid-cap company, cannot access $50K/yr tools. The mid-market remains grossly underserved by AI earnings preparation tools.' },
              { icon: '🌏', h: false, title: 'Non-US / non-NYSE market coverage', body: 'The entire market is US-centric. Indian listed companies (BSE/NSE), Southeast Asian, Middle Eastern, and African listed companies are almost completely absent from all these platforms\' data coverage. A platform native to these markets does not exist.' },
              { icon: '🤝', h: false, title: 'Revenue team + IR collaboration in one tool', body: 'The market treats IR preparation as an IR-department problem. In reality, the revenue team spends weeks gathering competitive intelligence and market context for the call. No platform serves both functions in a single integrated workflow.' },
              { icon: '📊', h: false, title: 'Sector peer benchmarking on non-financial KPIs', body: 'Analysts ask about operational metrics, ESG metrics, technology investment ratios, and sector-specific KPIs. No platform systematically benchmarks a company against peers on these non-standard metrics as part of earnings prep — only on standard financial ratios.' },
            ].map(g => (
              <div key={g.title} className={`gap-card${g.h ? ' gap-highlight' : ''}`}>
                <div className="gap-icon">{g.icon}</div>
                <h3 className="serif-h3">{g.title}</h3>
                <p style={{ marginTop: '0.35rem' }}>{g.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Footer note="Research compiled from vendor documentation, G2 reviews, Sacra ARR data, Gartner Magic Quadrant reports, Irwin State of IR 2026, and verified press coverage. All data is as of June 2026." />
    </motion.div>
  )
}
