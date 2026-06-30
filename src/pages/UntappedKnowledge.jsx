import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const CLUSTERS = [
  {
    id: 'sc-relationship', num: '01', cls: 'c-relationship',
    title: 'Relationship Intelligence — Who knows whom, made visible',
    eyebrow: 'Solution Cluster 01 of 07',
    desc: 'Mine email and calendar metadata to build a live relationship graph across the entire organization. The data already exists in email servers — it just needs to be observed, not created.',
    friction: { cls: 'friction-zero', text: '● Zero employee friction · Data source: Email & Calendar metadata' },
    ideas: [
      { num: '01 / A', name: 'Warm Path Finder', hook: '"Who in our 10,000-person firm already knows this prospect?"', detail: 'Connect to email and calendar metadata via Microsoft Graph or Google Workspace APIs. Build a continuously updated relationship strength graph for every external contact — scored by recency, frequency, and reciprocity. When a partner wants to reach a target, they type a name and instantly see the strongest warm path through colleagues. No CRM update required. No manual tagging. The sent folder does the work.', tags: ['Microsoft Graph API', 'Google Workspace API', 'Graph database', 'CRM overlay'] },
      { num: '01 / B', name: 'Relationship Health Dashboard', hook: '"Which client relationships are going cold — right now, before it\'s too late?"', detail: 'Track the recency, frequency, and reciprocity of communications with every external contact continuously. Flag accounts where interaction has declined relative to baseline — surfacing churn risk weeks before it becomes visible in any CRM report. Entirely built from passive observation. No rep interaction needed. Integrated directly into account management workflows as a live health score per client.', tags: ['Email metadata', 'Calendar metadata', 'Proactive alerts', 'Account health scoring'] },
      { num: '01 / C', name: 'Meeting Intelligence Layer', hook: '"Which of our people attended an event with this contact — and when?"', detail: 'Beyond emails, index calendar invites to map physical and virtual meeting history across the firm. Captures what email logs miss: conference attendance, roundtable participation, client dinners. Particularly valuable for professional services where "someone met them at a sector conference" is significant relationship signal that currently evaporates. Calendar metadata only — no content read, no privacy concern.', tags: ['Calendar metadata only', 'Conference tracking', 'BD intelligence', 'Zero content access'] },
      { num: '01 / D', name: 'Alumni Network Tracker', hook: '"Your ex-employees are now clients, partners, or your best referrers."', detail: 'When employees leave the organization, enrich their departure records using LinkedIn data APIs to track where they land over time. Build a live alumni intelligence layer: which former colleagues are now decision-makers at target accounts? Which have become ecosystem partners? Trigger warm outreach recommendations when an alumnus reaches a relevant seniority milestone. This network grows with every person who ever worked at the firm.', tags: ['LinkedIn enrichment', 'HR offboarding data', 'Job change signals', 'Referral networks'] },
    ],
  },
  {
    id: 'sc-expertise', num: '02', cls: 'c-expertise',
    title: 'Expertise Location — Find who knows what, not just who knows whom',
    eyebrow: 'Solution Cluster 02 of 07',
    desc: 'Email subjects, meeting titles, document authorship, and project participation signal expertise far more accurately than any self-reported skills profile. The organization already knows who its experts are — it just can\'t see it.',
    friction: { cls: 'friction-zero', text: '● Zero employee friction · Data source: Email metadata, Documents, Calendar titles' },
    ideas: [
      { num: '02 / A', name: 'Internal Expertise Graph', hook: '"Who in our 50,000-person firm has deep expertise in Vietnamese tax law?"', detail: 'Analyze email subject lines, calendar meeting titles, document co-authorship via SharePoint and Google Drive APIs, and project tags from tools like Jira or Asana. Build a continuously updated expertise map without any employee needing to fill out a profile. Topic modeling clusters signals into subject areas. The system surfaces hidden experts across the firm — people who are deeply knowledgeable but whose expertise is invisible to leadership and BD teams.', tags: ['Email subjects', 'SharePoint / Drive metadata', 'Topic modeling · NLP', 'Zero profile setup'] },
      { num: '02 / B', name: 'Proposal & Pitch Reuse Engine', hook: '"Stop writing proposals that already exist somewhere in the firm."', detail: 'Index documents stored in shared drives (SharePoint, Google Drive, network drives) by industry, topic, and client type using semantic vector embeddings. When a team starts building a new proposal, surface highly relevant past proposals authored by colleagues — with contact details for the author. No uploading required. No tagging required. The document library already exists; it just isn\'t searchable in any meaningful way today.', tags: ['SharePoint API', 'Google Drive API', 'Vector search · Embeddings', 'Knowledge reuse'] },
      { num: '02 / C', name: 'Meeting Knowledge Extraction', hook: '"Every team meeting generates institutional knowledge. Almost none gets captured."', detail: 'With team-level consent and a simple one-time opt-in per meeting series, transcribe recurring internal meetings — sector calls, practice group syncs, client debriefs. Extract structured knowledge: decisions made, client mentions, market insights, names of relevant experts. Store as searchable, attributed intelligence. New hires can search six months of sector team calls and get up to speed in hours instead of months.', tags: ['Teams / Zoom transcripts', 'One-time team opt-in', 'Knowledge graph', 'NLP extraction'] },
      { num: '02 / D', name: 'Dynamic Skill Directory', hook: '"Replace the stale org chart bio with a live picture of what people actually work on."', detail: 'Infer skills, industries, and topic expertise continuously from emails sent, meetings attended, documents authored, and project assignments — without anyone filling in a profile field. As work patterns evolve, the directory updates automatically. Unlike traditional "yellow pages" directories that require annual manual updates and are immediately out of date, this one is always current because it\'s derived from actual work activity rather than self-reported data.', tags: ['Email + calendar + project tools', 'Jira / Asana API', 'Skills inference', 'People search'] },
    ],
  },
  {
    id: 'sc-ona', num: '03', cls: 'c-ona',
    title: 'Organizational Network Analysis — The invisible organization, made visible',
    eyebrow: 'Solution Cluster 03 of 07',
    desc: 'The org chart is a legal fiction. The actual organization is a communication network — and that network reveals silos, burnout risk, hidden influencers, and knowledge bottlenecks that no management dashboard can see.',
    friction: { cls: 'friction-zero', text: '● Zero employee friction · Data source: Email & Calendar metadata (no content read)' },
    ideas: [
      { num: '03 / A', name: 'Collaboration Health Monitor', hook: '"Which teams are completely siloed? Which are burning out from over-connection?"', detail: 'Map intra-organizational communication patterns from email and calendar metadata alone — no content access required. Identify teams that never communicate with adjacent departments (dangerous silos), teams whose meeting load has expanded beyond sustainable levels (burnout precursors), and individuals whose communication centrality is far above their grade level (flight risk or promotion candidate). Surface as a live collaboration health score for each department and cross-functional pair.', tags: ['Email metadata', 'Calendar metadata', 'Silo detection', 'Burnout signals', 'HR analytics'] },
      { num: '03 / B', name: 'Hidden Influencer Mapper', hook: '"The most influential person in the organization is rarely the most senior one."', detail: 'Apply network centrality measures — betweenness centrality, eigenvector centrality, and bridge scores — to the email communication graph. Identify employees who are critical connectors between otherwise separate groups: the person in Legal who everyone in Sales calls before a deal closes, or the analyst in Finance who bridges the strategy team to operations. These "super-connectors" disproportionately affect retention, change adoption, and organizational agility.', tags: ['Email metadata', 'Network centrality · Graph math', 'Change management', 'Retention intelligence'] },
      { num: '03 / C', name: 'Onboarding Network Accelerator', hook: '"A new hire\'s first-year performance correlates directly with how fast they build their internal network."', detail: 'Track the velocity at which new hires are building cross-functional connections in their first 30, 60, and 90 days. Compare against the network growth trajectory of high-performing cohorts from previous years. Identify new hires who are network-isolated at day 45 — before the isolation calcifies — and trigger automated nudges to managers with specific colleague introduction recommendations.', tags: ['Email + calendar metadata', '90-day cohort benchmarking', 'Manager nudges', 'Onboarding analytics'] },
      { num: '03 / D', name: 'M&A Integration Intelligence', hook: '"Are the two organizations actually merging — or just sharing a logo and a building?"', detail: 'After an acquisition, the most important question is whether the organizations are truly integrating at the human level. By tracking cross-organization communication patterns over time, build a real-time integration health score. Are acquired-company employees emailing acquirer colleagues? Are joint meetings being scheduled? Or are the two organizations operating as parallel silos 18 months post-close? Give the integration management office a live dashboard instead of quarterly surveys.', tags: ['Email metadata (both orgs)', 'Calendar metadata', 'Integration health score', 'M&A leadership reporting'] },
    ],
  },
  {
    id: 'sc-conversation', num: '04', cls: 'c-conversation',
    title: 'Conversation Intelligence — Capture what\'s said in client interactions',
    eyebrow: 'Solution Cluster 04 of 07',
    desc: 'Client calls and meetings generate enormous intelligence. With consent-based capture, that intelligence becomes institutional and searchable — rather than evaporating the moment the call ends.',
    friction: { cls: 'friction-low', text: '◐ Low friction · One-time consent required · Data source: Call recordings, email signals' },
    ideas: [
      { num: '04 / A', name: 'Client Conversation Memory', hook: '"What exactly did we discuss with this client across the last six months?"', detail: 'With explicit consent from both parties, transcribe client calls and extract structured records: topics discussed, commitments made, concerns raised, next steps agreed. Store as searchable, attributed records linked to the client account. When a new team member is assigned to an account, they can read six months of client conversation summaries in 20 minutes rather than scheduling six separate briefing calls.', tags: ['Recorded calls (consent-required)', 'NLP extraction', 'CRM integration', 'Account memory'] },
      { num: '04 / B', name: 'Commitment Tracker', hook: '"How many client commitments fall through the cracks every week because no one tracked them?"', detail: 'Extract "commitment language" automatically from call transcripts and email threads: "we\'ll send you X by Friday", "I\'ll follow up on the proposal by end of month", "let\'s schedule a follow-up call within two weeks." Convert these into tracked action items without anyone manually logging them. Approach deadline without a completion signal? Trigger an alert to the responsible party.', tags: ['Email signals', 'Call transcripts', 'NLP · Commitment extraction', 'Action item tracking'] },
      { num: '04 / C', name: 'Client Sentiment Tracker', hook: '"Are your clients actually happy — or just not complaining yet?"', detail: 'Analyze patterns in email threads with key clients over time — response lag, message length, tone indicators, frequency of initiated contact. Detect early signals of relationship degradation: declining response rates, shorter replies, reduced inbound reach-outs. Surface these as client health signals weeks before a formal concern is raised. Critically, this can be built from email metadata and basic linguistic signals without reading full email content.', tags: ['Email metadata + basic signals', 'Sentiment trend analysis', 'Churn prediction', 'Client health scoring'] },
      { num: '04 / D', name: 'Pre-Meeting Intelligence Brief', hook: '"Walk into every client meeting fully prepared — automatically, without asking."', detail: '15 minutes before any calendar event involving an external participant, auto-generate and push a briefing document to each attendee: last contact date across the firm, which colleagues know this person and how well, past commitments still open, recent news about the client\'s company, and any relevant context from past meetings. Delivered to their calendar or inbox without anyone requesting it.', tags: ['Calendar metadata', 'Email metadata', 'News APIs', 'Fully automated push'] },
    ],
  },
  {
    id: 'sc-crosssell', num: '05', cls: 'c-crosssell',
    title: 'Cross-Sell Intelligence — Find growth hiding inside existing client relationships',
    eyebrow: 'Solution Cluster 05 of 07',
    desc: 'In large professional services firms, the largest untapped revenue opportunity is almost always cross-selling to existing clients — but no one knows what the rest of the firm is already doing with them.',
    friction: { cls: 'friction-zero', text: '● Zero employee friction · Data source: Email metadata, CRM, service line data' },
    ideas: [
      { num: '05 / A', name: 'Account White-Space Mapper', hook: '"Which services are we not selling to our top 100 clients — and why not?"', detail: 'Combine service line billing data, email communication patterns between firm professionals and client contacts, and CRM data to build a comprehensive map of every client relationship across the whole firm. For each major account, render which practices are actively engaged, which have had recent contact but no billing relationship, and which have zero touchpoint history. The white-space becomes a prioritized revenue opportunity list requiring no manual analysis.', tags: ['Email metadata', 'Billing / CRM data', 'White-space analysis', 'Revenue growth'] },
      { num: '05 / B', name: 'Internal Referral Network', hook: '"Partners are sitting on cross-sell opportunities they don\'t even know they have."', detail: 'When Partner A in Tax is regularly communicating with a client company, and that same company is also a prospect for Partner B\'s Strategy practice — neither partner necessarily knows the other\'s activity. Surface these overlaps automatically. Enable warm, verified internal introductions between practice areas using actual communication data rather than guesswork.', tags: ['Email metadata', 'CRM + org data', 'Cross-sell triggers', 'Partner recognition'] },
      { num: '05 / C', name: 'Industry Relationship Capital Report', hook: '"How deep is our firm\'s real network in the infrastructure sector — measured in actual relationships, not names on a list?"', detail: 'For any industry vertical, geography, or target segment, produce a comprehensive report showing the firm\'s aggregate relationship strength: total active contacts, seniority distribution, recency of last engagement, which offices are most connected, and relationship density vs. competitors (inferred from public data enrichment).', tags: ['Email metadata', 'Contact enrichment APIs', 'BD strategy', 'Market coverage mapping'] },
      { num: '05 / D', name: 'Deal Timing Signal Engine', hook: '"When is the optimal moment to reach out to a lapsed client or new prospect?"', detail: 'Combine communication history analysis with real-time external signals — leadership changes at target companies, funding rounds, regulatory shifts, earnings announcements — to trigger outreach recommendations precisely when a client is most likely to be receptive. Push to the relevant partner in the morning briefing. No searching required.', tags: ['Email metadata', 'News & LinkedIn APIs', 'Timing signal engine', 'Job change alerts'] },
    ],
  },
  {
    id: 'sc-data', num: '06', cls: 'c-data',
    title: 'Data Quality & CRM — Make the system of record reflect reality, automatically',
    eyebrow: 'Solution Cluster 06 of 07',
    desc: 'CRM data is almost universally degraded — stale contacts, missing interactions, misattributed deals. This is entirely solvable through passive observation, without asking a single rep to change their behavior.',
    friction: { cls: 'friction-zero', text: '● Zero employee friction · Data source: Email metadata, Calendar, enrichment APIs' },
    ideas: [
      { num: '06 / A', name: 'Passive CRM Enrichment Engine', hook: '"Your CRM has 200,000 contacts. Half are wrong. None of it is your team\'s fault."', detail: 'Continuously cross-reference CRM contact records against actual email communication patterns to identify discrepancies: contacts who\'ve changed email addresses, moved to new companies, been promoted to new roles, or left the industry entirely. Enrich with current title, company, and contact data from LinkedIn enrichment APIs and news sources. Push verified updates automatically to Salesforce, HubSpot, or Dynamics via native API.', tags: ['Email metadata', 'Enrichment APIs', 'Salesforce / HubSpot API', 'CRM hygiene'] },
      { num: '06 / B', name: 'Auto Activity Logging', hook: '"Reps spend 20% of their week on CRM data entry. Eliminate it entirely."', detail: 'Every email sent to an external contact, every call conducted, every meeting attended — automatically logged against the correct CRM opportunity or account with zero rep involvement. No "log a call" button. No activity entry screen. The communication data flows from email and calendar APIs directly into the CRM record in real time.', tags: ['Email + calendar metadata', 'Auto-attribution', 'CRM integration', 'Zero manual logging'] },
      { num: '06 / C', name: 'Relationship Attribution Engine', hook: '"When a deal closes, who actually built that relationship — not just who\'s listed in the CRM?"', detail: 'Rather than crediting whoever happens to be listed as the account owner in the CRM, use actual communication data to attribute relationship value to the colleagues who genuinely drove it — measured by frequency, recency, seniority of contact, and depth of engagement over time. This has significant implications for partner compensation in law and consulting firms, where revenue attribution is a deeply contested issue.', tags: ['Email + calendar metadata', 'Revenue attribution', 'Partner compensation', 'BD analytics'] },
      { num: '06 / D', name: 'Single-Thread Risk Detector', hook: '"If your one contact at the client leaves tomorrow, is the entire relationship gone?"', detail: 'Automatically identify client accounts where the firm\'s entire relationship is concentrated in a single contact — a critical and extremely common vulnerability in professional services. Map relationship breadth: how many senior people at the client know how many senior people at your firm, and at what recency? Flag single-threaded accounts to account managers before the key contact changes jobs.', tags: ['Email metadata', 'Key person risk', 'Relationship breadth scoring', 'Account health'] },
    ],
  },
  {
    id: 'sc-vertical', num: '07', cls: 'c-vertical',
    title: 'Vertical-Specific Plays — The same intelligence, built for under-served sectors',
    eyebrow: 'Solution Cluster 07 of 07',
    desc: 'Introhive owns Big Four accounting and law. Affinity owns venture capital. Every other large-organization vertical with equally complex relationship networks has no purpose-built solution — and many of the most attractive ones are in markets the major players have never focused on.',
    friction: { cls: 'friction-zero', text: '● Zero employee friction · Data source: Varies by vertical (see each idea)' },
    ideas: [
      { num: '07 / A', name: 'Healthcare System Relationship Intelligence', hook: '"Hospital systems have thousands of referring physician relationships. Almost none are mapped."', detail: 'Build the Introhive equivalent for hospital systems, health networks, and pharmaceutical companies. Map referring physician relationships, pharmaceutical rep coverage and relationship strength with prescribers, and collaboration patterns between hospital departments. Navigate HIPAA-compliant data flows. Healthcare is one of the largest enterprise verticals globally and has essentially zero purpose-built relationship intelligence tooling.', tags: ['Email metadata', 'EMR referral data (de-identified)', 'HIPAA compliance', 'Hospital systems · Pharma'] },
      { num: '07 / B', name: 'Government & Public Sector Knowledge Graph', hook: '"Which of our agency\'s people have genuine working relationships with this ministry\'s decision-makers?"', detail: 'Government agencies manage enormously complex stakeholder networks — inter-agency relationships, external stakeholder connections, ministerial engagement, international counterparts — with almost no dedicated tooling. Build specifically for this context: on-premise or sovereign cloud deployment options, integration with government email infrastructure, and purpose-built security and compliance standards.', tags: ['Government email infrastructure', 'Sovereign cloud / on-prem', 'GovTech', 'Stakeholder mapping'] },
      { num: '07 / C', name: 'University & Research Network Intelligence', hook: '"Which of our faculty have existing working relationships with this company\'s R&D leadership?"', detail: 'Universities are deeply relationship-intensive institutions — industry partnerships, research collaborations, alumni donor networks, accreditation body relationships, policy engagement — and their relationship intelligence tooling is essentially nonexistent. Build a passive relationship intelligence layer for research universities: mapping faculty-to-industry connections, surfacing co-authorship networks, identifying which alumni relationships are warm vs. dormant.', tags: ['University email metadata', 'Alumni data', 'Grant databases (public)', 'Research partnership intelligence'] },
      { num: '07 / D', name: 'Emerging Market Conglomerate Intelligence', hook: '"Large Indian, Gulf, and Southeast Asian conglomerates have no purpose-built relationship tool — and they desperately need one."', detail: 'Every major player in this market is US or EU-headquartered with an almost entirely Western go-to-market motion. Large conglomerates in India, the Gulf Cooperation Council, Indonesia, and Brazil have relationship networks of equal or greater complexity and are actively underserved. A product built for this context — local data residency, local language support, and a local go-to-market motion — could own this segment with limited direct competition.', tags: ['Email + calendar metadata', 'India · GCC · Southeast Asia', 'Local data residency', 'Conglomerate structures', 'Greenfield market'] },
    ],
  },
]

export default function UntappedKnowledge() {
  return (
    <motion.div
      className="page-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Dark hero */}
      <Reveal>
        <div className="cover-dark">
          <div className="cover-dark-inner">
            <span className="hero-eyebrow">Market Intelligence Report · June 2026</span>
            <h1 className="serif-h1 cover-dark">The <em>Untapped Knowledge</em><br />Intelligence Revolution</h1>
            <p className="cover-dark-sub">
              A comprehensive study of platforms turning an organization's hidden relationship capital — buried in emails, calendars, conversations, and directories — into its most powerful competitive asset.
            </p>
            <div className="cover-dark-meta">
              <div className="cover-meta-item"><strong>6 Companies Profiled</strong>Market Leaders</div>
              <div className="cover-meta-item"><strong>$2.3B → $11.3B</strong>Graph Analytics Market CAGR</div>
              <div className="cover-meta-item"><strong>~$2B+</strong>Total Funding in Space</div>
              <div className="cover-meta-item"><strong>2012 – 2026</strong>Category Timeline</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Problem */}
      <Reveal>
        <div className="uk-section" id="context">
          <span className="section-eyebrow">The Core Problem</span>
          <h2>Every large organization is sitting on a gold mine of knowledge it cannot see</h2>
          <p>When a partner at KPMG wants to land a new client, the most valuable asset isn't a pitch deck or a credentials document — it's knowing that a colleague had lunch with the CFO last month. That intelligence exists. It's in someone's sent folder. But no one could find it until Introhive came along.</p>
          <p>This is the fundamental insight powering an entire category of enterprise software: organizations generate enormous quantities of relationship data, conversation data, and collaboration data every single day — and almost none of it gets captured, organized, or made accessible to the people who need it most.</p>
          <div className="market-map">
            <div className="market-map-header">
              <p className="market-map-title">Where the Knowledge Hides</p>
              <span className="market-map-sub">The "dark data" of enterprise organizations — interaction intelligence that exists but is never surfaced.</span>
            </div>
            <div className="map-grid">
              {[
                { h: true, label: 'Relationship Signals', title: 'Emails & Calendars', body: 'Who knows whom, how recently they\'ve spoken, relationship strength, warm introductions — all locked in individual inboxes.' },
                { label: 'Conversation Intelligence', title: 'Calls & Meetings', body: 'What customers are actually saying, objections, buying signals, champion identification — vaporized the moment a meeting ends.' },
                { label: 'Organizational Knowledge', title: 'Documents & Wikis', body: 'Institutional knowledge, past work, playbooks, and expertise scattered across Slack, Drive, Notion, Confluence, and email.' },
                { label: 'People Intelligence', title: 'Network & Alumni', body: 'Who your people know externally, who\'s changed jobs, which customers are champions — unmapped and invisible to BD teams.' },
              ].map(c => (
                <div key={c.title} className={`map-cell${c.h ? ' highlight' : ''}`}>
                  <div className="map-cell-label">{c.label}</div>
                  <div className="map-cell-title">{c.title}</div>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <p>The companies profiled in this study have each staked out a piece of this territory. Some focus on <strong>external relationship graphs</strong> (who knows who outside the firm), others on <strong>internal collaboration networks</strong> (how knowledge moves within teams), and the newest entrants are building <strong>unified knowledge graphs</strong> that connect all of the above.</p>
        </div>
      </Reveal>

      {/* Company Profiles */}
      <Reveal>
        <div className="uk-section" id="introhive">
          <span className="section-eyebrow">Company Profile 01</span>
          <h2>The Category Creator</h2>
          <div className="company-card">
            <div className="card-header">
              <div className="card-title-block">
                <span className="card-badge badge-leader" style={{ background: 'var(--teal-pale)', color: 'var(--teal)', marginBottom: '0.4rem', display: 'inline-block' }}>Relationship Intelligence · Category Leader</span>
                <div className="card-name">Introhive</div>
                <div className="card-tagline">Fredericton, Canada → Global · Founded 2012</div>
              </div>
              <div className="card-stats">
                <div className="stat"><span className="stat-value">$135M+</span><span className="stat-label">Total Raised</span></div>
                <div className="stat"><span className="stat-value">PwC, KPMG</span><span className="stat-label">Marquee Clients</span></div>
                <div className="stat"><span className="stat-value">~400</span><span className="stat-label">Employees</span></div>
              </div>
            </div>
            <div className="card-body">
              <div className="origin-block">
                <div className="origin-label">Founding Story</div>
                <div className="origin-text">Jody Glidden and Stewart Walchli founded Introhive in 2012 in Fredericton, New Brunswick — an unlikely startup hub — with a deceptively simple insight: the most valuable knowledge inside a professional services firm is who its people know, and that knowledge is completely invisible. They believed that if you could make the "relationship graph" of an entire organization visible and searchable, business development would be transformed. It took nearly a decade, but the thesis proved out spectacularly.</div>
              </div>
              <div className="card-section-title">What It Does</div>
              <p>Introhive connects to the email and calendar infrastructure of an entire organization and quietly maps every touchpoint — every email sent, every meeting attended — across the firm. The result is a continuously updated graph that shows who knows whom, how strong each relationship is, and when the last meaningful contact occurred. When a partner at KPMG wants to reach a target client, they search the person in Introhive and immediately see which of their 30,000 colleagues already has a strong relationship with them.</p>
              <div className="card-section-title">Growth Timeline</div>
              <div className="timeline">
                {[
                  { year: '2012', text: <><strong>Founded in Fredericton, NB.</strong> Glidden and Walchli begin building on the premise that relationship data is an untapped organizational asset.</> },
                  { year: '2016–18', text: <><strong>First major professional services wins.</strong> The legal and Big Four accounting sectors prove to be perfect early markets — high-value relationships, large organizations, relationship-driven BD.</> },
                  { year: '2019', text: <><strong>PwC goes global.</strong> PwC deploys Introhive across 90 countries, giving over 100,000 users access to the platform — a massive validation moment for the category.</> },
                  { year: '2021', text: <><strong>$100M Series C</strong> led by PSG. By this point Introhive has captured over 60 million contacts and relationships — the data flywheel is spinning.</> },
                  { year: '2024', text: <><strong>KPMG partnership announced.</strong> KPMG firms globally adopt Introhive alongside Salesforce, making it the backbone of their front-office intelligence strategy.</> },
                  { year: '2026', text: <><strong>MCP Server for AI agents.</strong> Introhive launches a Model Context Protocol server, allowing AI assistants like Microsoft Copilot to query relationship intelligence in natural language.</> },
                ].map(t => (
                  <div key={t.year} className="tl-item">
                    <span className="tl-year">{t.year}</span>
                    <div className="tl-dot" />
                    <div className="tl-content">{t.text}</div>
                  </div>
                ))}
              </div>
              <div className="card-section-title">Target Market</div>
              <div className="pill-row">
                {['Big 4 Accounting','Law Firms (AmLaw 200)','Management Consulting','Financial Services','Commercial Real Estate','Engineering & Construction'].map(p => <span key={p} className="pill">{p}</span>)}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="uk-section" id="affinity">
          <span className="section-eyebrow">Company Profile 02</span>
          <h2>Relationship Intelligence for Deal-Makers</h2>
          <div className="company-card">
            <div className="card-header">
              <div className="card-title-block">
                <span className="card-badge" style={{ background: 'var(--violet-pale)', color: 'var(--violet)', marginBottom: '0.4rem', display: 'inline-block' }}>VC &amp; Private Capital Focus</span>
                <div className="card-name">Affinity</div>
                <div className="card-tagline">San Francisco, CA · Founded 2014</div>
              </div>
              <div className="card-stats">
                <div className="stat"><span className="stat-value">$120M</span><span className="stat-label">Total Raised</span></div>
                <div className="stat"><span className="stat-value">$600M</span><span className="stat-label">Valuation (2021)</span></div>
                <div className="stat"><span className="stat-value">1,700+</span><span className="stat-label">Institutions</span></div>
              </div>
            </div>
            <div className="card-body">
              <div className="origin-block">
                <div className="origin-label">Founding Story</div>
                <div className="origin-text">Stanford graduates Ray Zhou and Shubham Goel founded Affinity in 2014 recognizing a gap that Introhive had also identified — but from a different angle. Deal-making in private capital was entirely relationship-driven, yet the tools available were either generic (Salesforce) or manual (spreadsheets). They believed the exhaust from emails and calendars — 18 trillion of them processed by the time of their Series C — held the key to a new kind of intelligence platform purpose-built for the deal economy.</div>
              </div>
              <div className="card-section-title">What It Does</div>
              <p>Affinity automatically ingests email and calendar data from an investment team and builds a live, enriched map of all relationships. When a VC wants to evaluate whether to invest in a startup, they can instantly see which of their colleagues has the strongest relationship with the founder, who on their portfolio team has met them, and what the recent interaction history looks like. The platform's "relationship scores" and automatic "deal flow" management have made it the dominant tool inside private equity and venture capital firms.</p>
              <div className="card-section-title">Target Market</div>
              <div className="pill-row">
                {['Venture Capital','Private Equity','Investment Banking','Consulting','Commercial Real Estate','Fortune 500 Corp Dev'].map(p => <span key={p} className="pill">{p}</span>)}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="uk-section" id="gong">
          <span className="section-eyebrow">Company Profile 03</span>
          <h2>Making Sales Conversations Visible</h2>
          <div className="company-card">
            <div className="card-header">
              <div className="card-title-block">
                <span className="card-badge" style={{ background: 'var(--red-pale)', color: 'var(--red)', marginBottom: '0.4rem', display: 'inline-block' }}>Conversation Intelligence</span>
                <div className="card-name">Gong</div>
                <div className="card-tagline">San Francisco, CA · Founded 2015</div>
              </div>
              <div className="card-stats">
                <div className="stat"><span className="stat-value">$584M</span><span className="stat-label">Total Raised</span></div>
                <div className="stat"><span className="stat-value">$7.25B</span><span className="stat-label">Valuation</span></div>
                <div className="stat"><span className="stat-value">$332M</span><span className="stat-label">ARR (2024)</span></div>
              </div>
            </div>
            <div className="card-body">
              <div className="origin-block">
                <div className="origin-label">Founding Story</div>
                <div className="origin-text">Amit Bendov had a crisis. As CEO of Sisense, his company hit its worst quarter ever — and he had no idea why. He looked at the CRM, the pipeline data, the conversion rates. Nothing explained it. When he asked his sales team, every single person gave a different explanation. He called Eilon Reshef and asked: what if you could analyze every single customer conversation — every call, every email — using AI? In 2015, with NLP finally reaching an inflection point, they founded Gong.</div>
              </div>
              <div className="card-section-title">What It Does</div>
              <p>Gong records and transcribes every customer-facing interaction — calls, video meetings, emails — and then applies AI to extract signal from the noise. Which deals are actually progressing vs. just looking healthy? Which reps have the best talk-to-listen ratio? Where are objections clustering? By 2026 Gong has expanded into full revenue intelligence — deal forecasting, AI-powered next-step recommendations, and "Gong Agents" that work autonomously across the revenue cycle. It holds approximately 45% market share in conversation intelligence for enterprise sales.</p>
              <div className="card-section-title">Target Market</div>
              <div className="pill-row">
                {['Enterprise B2B Sales','Revenue Operations','Sales Enablement','Customer Success','Mid-Market & Enterprise SaaS'].map(p => <span key={p} className="pill">{p}</span>)}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="uk-section" id="glean">
          <span className="section-eyebrow">Company Profile 04</span>
          <h2>The Enterprise Brain</h2>
          <div className="company-card">
            <div className="card-header">
              <div className="card-title-block">
                <span className="card-badge" style={{ background: 'var(--violet-pale)', color: 'var(--violet)', marginBottom: '0.4rem', display: 'inline-block' }}>Enterprise Knowledge Search</span>
                <div className="card-name">Glean</div>
                <div className="card-tagline">Palo Alto, CA · Founded 2019</div>
              </div>
              <div className="card-stats">
                <div className="stat"><span className="stat-value">$765M</span><span className="stat-label">Total Raised</span></div>
                <div className="stat"><span className="stat-value">$7.2B</span><span className="stat-label">Valuation</span></div>
                <div className="stat"><span className="stat-value">$100M+</span><span className="stat-label">ARR (2025)</span></div>
              </div>
            </div>
            <div className="card-body">
              <div className="origin-block">
                <div className="origin-label">Founding Story</div>
                <div className="origin-text">Arvind Jain spent over a decade building Google Search. Then he joined enterprise software and was stunned: internal knowledge tools were operating at a level a decade behind consumer search. Employees would ask colleagues for documents because finding them through internal tools was futile. Jain co-founded Glean in 2019 to solve this definitively — bringing Google-grade search architecture to enterprise knowledge using knowledge graphs to understand context, permissions, and personalization.</div>
              </div>
              <div className="card-section-title">What It Does</div>
              <p>Glean connects to over 100 enterprise applications — Slack, Google Drive, Salesforce, Jira, Confluence, GitHub, email — and builds a personalized, permissions-aware knowledge graph for each organization. It reached $100M ARR in under three years from commercial launch, which CNBC named it the #1 Most Innovative Company in Applied AI for 2025.</p>
              <div className="card-section-title">Target Market</div>
              <div className="pill-row">
                {['Enterprise Tech','Finance','Retail','Manufacturing','Any knowledge-intensive org 500+ employees'].map(p => <span key={p} className="pill">{p}</span>)}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Landscape comparison */}
      <Reveal>
        <div className="uk-section" id="landscape">
          <span className="section-eyebrow">Landscape Overview</span>
          <h2>How the Players Stack Up</h2>
          <p>Each platform occupies a different position in the "untapped knowledge" spectrum. The key dimensions are: what data source they tap, what question they answer, and who buys them.</p>
          <div style={{ overflowX: 'auto' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Company</th><th>Data Source</th><th>Core Question Answered</th><th>Primary Buyer</th><th>Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { co: 'Introhive', data: 'Email + Calendar metadata', q: '"Who inside our firm knows this external contact — and how well?"', buyer: 'CMO / BD Leader', best: 'Large professional services firms (law, consulting, accounting)' },
                  { co: 'Affinity', data: 'Email + Calendar + public co. data', q: '"Who on our team has the best path to this deal or founder?"', buyer: 'Managing Partner / Deal Team', best: 'Smaller deal-intensive teams: VC, PE, IB, corp dev' },
                  { co: 'Gong', data: 'Call recordings + email transcripts', q: '"What are customers actually telling us, and which deals are at risk?"', buyer: 'VP Sales / RevOps', best: 'Enterprise B2B sales organizations' },
                  { co: 'People.ai', data: 'Email + Calendar + CRM activity', q: '"What activities are our reps actually doing, and are they correlated with wins?"', buyer: 'CRO / RevOps', best: 'Large Salesforce-centric revenue teams' },
                  { co: 'Glean', data: 'All enterprise apps (100+ connectors)', q: '"Where is the answer to my question, anywhere in our entire organization?"', buyer: 'CIO / CHRO', best: 'Any large enterprise with fragmented knowledge tools' },
                  { co: 'TrustSphere / Viva', data: 'Email + Calendar metadata', q: '"How does knowledge actually flow internally, and who are our hidden influencers?"', buyer: 'CHRO / People Analytics', best: 'HR-driven transformation and change management programs' },
                ].map(r => (
                  <tr key={r.co}>
                    <td className="company-col">{r.co}</td>
                    <td>{r.data}</td>
                    <td>{r.q}</td>
                    <td>{r.buyer}</td>
                    <td>{r.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="highlight-box" style={{ marginTop: '2rem' }}>
            <h3>The Common Thread: The Data Was Always There</h3>
            <p>Every company in this landscape is monetizing data that organizations already possess but couldn't use. None of them ask organizations to change what they do — they observe what already happens.</p>
            <ul>
              <li>Introhive doesn't ask partners to update a CRM. It reads their sent folder.</li>
              <li>Gong doesn't ask reps to take better notes. It records the call.</li>
              <li>Glean doesn't ask employees to build a knowledge base. It indexes what they already create.</li>
              <li>People.ai doesn't ask reps to log activities. It captures them automatically.</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>This "zero behavior change" architecture is the key design principle of the entire category.</p>
          </div>
        </div>
      </Reveal>

      {/* Opportunities */}
      <Reveal>
        <div className="uk-section" id="opportunities">
          <span className="section-eyebrow">White Space Analysis</span>
          <h2>Where the Next Wave of Opportunity Lies</h2>
          <p>The category is maturing in some areas but wide open in others. Here is where the frontier sits in 2026:</p>
          <div className="opp-grid">
            {[
              { icon: '🏭', h: true, title: 'Non-Professional Services Verticals', desc: 'Introhive owns law and accounting. But healthcare systems, government agencies, large manufacturing conglomerates, and universities all have the same "who knows whom" problem — and almost no one has built for them specifically.' },
              { icon: '🔗', h: true, title: 'Cross-Organizational Relationship Graphs', desc: 'Today\'s platforms map relationships within a firm. The next frontier is mapping relationships across partner ecosystems — knowing that your firm\'s network overlaps with a channel partner\'s network in a specific region or vertical.' },
              { icon: '🧠', h: true, title: 'Expertise Location at Scale', desc: '"Who inside our 80,000-person firm has deep expertise in ESG regulation in Southeast Asia?" This question is currently unanswerable in most organizations. Expertise graphs — built from document authorship, meeting participation, and past project data — are an enormous unsolved space.' },
              { icon: '🌐', h: false, title: 'Emerging Market Deployments', desc: 'All the major players are US/EU-headquartered with US-first go-to-market. Large conglomerates in India, the Middle East, and Southeast Asia have equally complex relationship networks and almost no purpose-built tools serving them.' },
              { icon: '🤝', h: false, title: 'Alumni & Extended Network Intelligence', desc: 'The broader category of "people who used to work here" as a relationship asset is underdeveloped. Former employees often become clients, referral sources, or partners — and their connections are almost never systematically mapped.' },
              { icon: '⚡', h: false, title: 'Agentic Intelligence — Proactive, not Reactive', desc: 'The current generation of tools are search interfaces — you have to know to look something up. The next wave is AI agents that proactively surface the insight you need, at the moment you need it, without being asked.' },
            ].map(o => (
              <div key={o.title} className={`opp-card${o.h ? ' gap-highlight' : ''}`}>
                <div className="opp-icon">{o.icon}</div>
                <div className="opp-title">{o.title}</div>
                <div className="opp-desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Solution clusters */}
      <div id="solutions">
        <Reveal>
          <div className="solutions-cover-dark">
            <div className="solutions-cover-dark-inner">
              <span className="solutions-cover-label">Part II · Product Brainstorm · 28 Ideas Across 7 Clusters</span>
              <h2>Building in the<br /><em>Untapped Knowledge</em> Space</h2>
              <p className="solutions-cover-sub">Every idea below follows one non-negotiable constraint: zero additional friction for employees. No uploading, no tagging, no data entry. The intelligence is captured passively from systems that already exist.</p>
              <div className="cluster-nav">
                {CLUSTERS.map(c => (
                  <a key={c.id} href={`#${c.id}`} className="cluster-nav-pill">{c.num} · {c.title.split(' —')[0]}</a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {CLUSTERS.map((cluster, ci) => (
          <Reveal key={cluster.id}>
            <div className={`cluster-page ${cluster.cls}`} id={cluster.id}>
              <div className="cluster-page-header">
                <div className="cluster-page-number">{cluster.num}</div>
                <div className="cluster-page-meta">
                  <span className="cluster-page-eyebrow">{cluster.eyebrow}</span>
                  <div className="cluster-page-title">{cluster.title}</div>
                  <p className="cluster-page-desc">{cluster.desc}</p>
                  <span className={`cluster-friction-note ${cluster.friction.cls}`}>{cluster.friction.text}</span>
                </div>
              </div>
              <div className="cluster-ideas">
                {cluster.ideas.map(idea => (
                  <div key={idea.num} className="idea-block">
                    <div className="idea-block-num">{idea.num}</div>
                    <div className="idea-block-name">{idea.name}</div>
                    <div className="idea-block-hook">{idea.hook}</div>
                    <div className="idea-block-detail">{idea.detail}</div>
                    <div className="idea-block-footer">
                      {idea.tags.map(t => <span key={t} className="idea-tag">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {ci < CLUSTERS.length - 1 && <div className="cluster-strip" />}
          </Reveal>
        ))}

        <div className="solutions-closing">
          <div>
            <div className="solutions-closing-title">28 ideas. One constraint.</div>
            <div className="solutions-closing-sub">Zero additional friction for employees. All intelligence captured passively.</div>
          </div>
          <div className="solutions-closing-stats">
            <div className="solutions-closing-stat">
              <div className="num" style={{ color: '#60A5FA' }}>7</div>
              <div className="label">Solution Clusters</div>
            </div>
            <div className="solutions-closing-stat">
              <div className="num" style={{ color: '#34D399' }}>3</div>
              <div className="label">Core Data Sources</div>
            </div>
            <div className="solutions-closing-stat">
              <div className="num" style={{ color: '#A78BFA' }}>0</div>
              <div className="label">Behavior Changes Required</div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        dark
        note="Market Intelligence Report · Compiled June 2026 · Sources: Company filings, Crunchbase, TechCrunch, CNBC, Startupintros, Contrary Research, official company sites. sarvagyasinghs.com"
      />
    </motion.div>
  )
}
