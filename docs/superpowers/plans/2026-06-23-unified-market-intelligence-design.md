# Unified Market Intelligence Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle `untapped-knowledge.html` using the Earnings Intelligence design system (Instrument Serif / DM Sans / DM Mono, teal/gold palette) and add unified cross-report navigation to both pages — without changing any content.

**Architecture:** Two standalone HTML files sharing the same design tokens, fonts, and component patterns. No shared stylesheet — all CSS lives inline in each file's `<style>` block. `index.html` gets a small nav update only. `untapped-knowledge.html` gets a full CSS replacement and targeted HTML structure updates (nav, hero wrapper, market map headers, closing strip).

**Tech Stack:** Static HTML/CSS, Google Fonts (Instrument Serif, DM Sans, DM Mono)

---

### Task 1: Update `index.html` nav

**Files:**
- Modify: `index.html` (nav CSS + nav HTML)

- [ ] **Step 1: Update nav CSS in `index.html`**

In the `<style>` block, replace the existing `nav` and `.nav-brand` and `.nav-links` rules with:

```css
nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(247,246,242,0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--rule);
  padding: 0 2rem;
  display: flex; align-items: center; gap: 1.5rem;
  height: 60px;
}
.nav-brand {
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--teal);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}
.nav-reports { display: flex; align-items: center; gap: 0.5rem; }
.nav-report-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  color: var(--ink-soft);
  text-decoration: none;
  letter-spacing: 0.02em;
  padding-bottom: 2px;
  transition: color 0.2s;
  white-space: nowrap;
}
.nav-report-link:hover { color: var(--teal); }
.nav-report-link.active { color: var(--teal); border-bottom: 2px solid var(--teal); }
.nav-sep { color: var(--rule); font-size: 0.9rem; }
.nav-links { display: flex; gap: 1.5rem; list-style: none; margin-left: auto; }
.nav-links a {
  font-size: 0.82rem;
  color: var(--ink-soft);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--teal); }
```

- [ ] **Step 2: Replace nav HTML in `index.html`**

Replace the entire `<nav>` block (currently lines ~502–511) with:

```html
<nav>
  <a href="index.html" class="nav-brand">sarvagyasinghs.com</a>
  <div class="nav-reports">
    <a href="index.html" class="nav-report-link active">Earnings Intelligence</a>
    <span class="nav-sep">·</span>
    <a href="untapped-knowledge.html" class="nav-report-link">Untapped Knowledge</a>
  </div>
  <ul class="nav-links">
    <li><a href="#landscape">Landscape</a></li>
    <li><a href="#segments">Segments</a></li>
    <li><a href="#profiles">Profiles</a></li>
    <li><a href="#comparison">Compare</a></li>
    <li><a href="#gaps">Gaps</a></li>
  </ul>
</nav>
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. Nav should show: `sarvagyasinghs.com` (teal, left) · `Earnings Intelligence` (teal underline, active) · `Untapped Knowledge` (muted) · section links pushed right. Clicking `Untapped Knowledge` navigates to that page.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Update index.html nav with unified report tabs"
```

---

### Task 2: Replace CSS in `untapped-knowledge.html`

**Files:**
- Modify: `untapped-knowledge.html` (`<style>` block only)

- [ ] **Step 1: Replace everything between `<style>` and `</style>` with the new CSS**

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

:root {
  --ink:         #0D1117;
  --ink-soft:    #3A3F4A;
  --paper:       #F7F6F2;
  --paper-warm:  #EDEAE1;
  --rule:        #D4CFC4;
  --gold:        #B8963E;
  --gold-pale:   #F2E8D0;
  --teal:        #1A6B70;
  --teal-pale:   #D4ECEE;
  --red:         #C0392B;
  --red-pale:    #FAE8E6;
  --violet:      #4B3B8C;
  --violet-pale: #E8E5F5;
  --green:       #1E6B45;
  --green-pale:  #D5EDDF;
  --blue:        #1A4A8C;
  --blue-pale:   #D5E3F5;
  --orange:      #B85C1A;
  --orange-pale: #F5E4D5;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: var(--paper);
  color: var(--ink);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

/* ── NAV ── */
nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(247,246,242,0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--rule);
  padding: 0 2rem;
  display: flex; align-items: center; gap: 1.5rem;
  height: 60px;
}
.nav-brand {
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--teal);
  font-weight: 500; text-decoration: none; white-space: nowrap;
}
.nav-reports { display: flex; align-items: center; gap: 0.5rem; }
.nav-report-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem; color: var(--ink-soft);
  text-decoration: none; letter-spacing: 0.02em;
  padding-bottom: 2px; transition: color 0.2s; white-space: nowrap;
}
.nav-report-link:hover { color: var(--teal); }
.nav-report-link.active { color: var(--teal); border-bottom: 2px solid var(--teal); }
.nav-sep { color: var(--rule); font-size: 0.9rem; }
.nav-links { display: flex; gap: 1.5rem; list-style: none; margin-left: auto; }
.nav-links a {
  font-size: 0.82rem; color: var(--ink-soft);
  text-decoration: none; letter-spacing: 0.04em; transition: color 0.2s;
}
.nav-links a:hover { color: var(--teal); }

/* ── HERO ── */
.cover {
  background: var(--ink);
  color: var(--paper);
  padding: 5rem 2rem 4rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.cover-inner { max-width: 1080px; margin: 0 auto; }
.cover-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--teal);
  margin-bottom: 1.2rem; display: block;
}
.cover h1 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  line-height: 1.08; color: var(--paper);
  max-width: 820px; margin-bottom: 1.5rem; font-weight: 400;
}
.cover h1 em { font-style: italic; color: var(--teal); }
.cover-sub {
  font-size: 1.05rem; color: #9CA3AF;
  max-width: 620px; line-height: 1.75; margin-bottom: 2.5rem;
}
.cover-meta { display: flex; gap: 2rem; flex-wrap: wrap; }
.cover-meta-item {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.08em;
  color: #9CA3AF; text-transform: uppercase;
}
.cover-meta-item strong {
  display: block; color: var(--paper);
  font-size: 0.85rem; font-weight: 500;
  margin-bottom: 2px; letter-spacing: 0.04em;
}

/* ── BODY ── */
.body { max-width: 1080px; margin: 0 auto; }

.section { padding: 3rem 2rem; border-bottom: 1px solid var(--rule); }
.section:last-child { border-bottom: none; }

hr.divider { display: none; }

.section-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 1rem; display: block;
}
.section h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin-bottom: 1rem; font-weight: 400; color: var(--ink);
}
.section > p {
  color: var(--ink-soft); max-width: 700px;
  line-height: 1.8; margin-bottom: 1rem; font-size: 0.9rem;
}

/* ── MARKET MAP ── */
.market-map {
  border: 1px solid var(--rule); border-radius: 2px;
  overflow: hidden; margin: 1.5rem 0;
}
.market-map-header {
  padding: 1.4rem; border-bottom: 1px solid var(--rule);
  background: var(--paper-warm);
}
.market-map-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem; color: var(--ink); margin-bottom: 0.3rem;
}
.market-map-sub { font-size: 0.8rem; color: var(--ink-soft); }
.map-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1px; background: var(--rule);
}
.map-cell { background: var(--paper); padding: 1.4rem; }
.map-cell.highlight { background: var(--teal-pale); }
.map-cell-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--ink-soft); margin-bottom: 0.5rem;
}
.map-cell.highlight .map-cell-label { color: var(--teal); }
.map-cell-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1rem; margin-bottom: 0.5rem; color: var(--ink);
}
.map-cell.highlight .map-cell-title { color: var(--teal); }
.map-cell p { font-size: 0.8rem; color: var(--ink-soft); line-height: 1.6; margin: 0; }

/* ── COMPANY CARDS ── */
.company-card {
  border: 1px solid var(--rule); background: white;
  border-radius: 2px; overflow: hidden;
  margin-bottom: 1.5rem; transition: box-shadow 0.2s;
}
.company-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
.card-header {
  padding: 1.4rem; border-bottom: 1px solid var(--rule);
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem; flex-wrap: wrap;
}
.card-title-block { flex: 1; }
.card-badge {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 0.25rem 0.6rem;
  border-radius: 2px; white-space: nowrap;
  flex-shrink: 0; display: inline-block; margin-bottom: 0.5rem;
}
.badge-leader    { background: var(--teal-pale);   color: var(--teal);   }
.badge-vc        { background: var(--violet-pale);  color: var(--violet); }
.badge-enterprise{ background: var(--gold-pale);    color: var(--gold);   }
.badge-people    { background: var(--green-pale);   color: var(--green);  }
.badge-convo     { background: var(--red-pale);     color: var(--red);    }
.badge-search    { background: var(--violet-pale);  color: var(--violet); }

.card-name {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.3rem; margin-bottom: 0.2rem; font-weight: 400;
}
.card-tagline { font-size: 0.78rem; color: var(--ink-soft); line-height: 1.4; }
.card-stats { display: flex; gap: 1rem; flex-wrap: wrap; }
.stat { text-align: right; }
.stat-value {
  font-family: 'DM Mono', monospace;
  font-size: 0.95rem; font-weight: 500; color: var(--ink); display: block;
}
.stat-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem; color: var(--ink-soft);
  text-transform: uppercase; letter-spacing: 0.1em;
}
.card-body { padding: 1.2rem 1.4rem; }
.origin-block {
  border-left: 3px solid var(--gold); background: var(--paper-warm);
  padding: 1rem 1.2rem; margin-bottom: 1rem; border-radius: 0 2px 2px 0;
}
.origin-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--ink-soft); margin-bottom: 0.5rem;
}
.origin-text { font-size: 0.84rem; color: var(--ink-soft); line-height: 1.7; }
.card-section-title {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--ink-soft); margin: 1rem 0 0.5rem;
}
.card-body p { font-size: 0.84rem; color: var(--ink-soft); line-height: 1.65; margin-bottom: 0.75rem; }
.pill-row { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem; }
.pill {
  font-size: 0.72rem; padding: 0.2rem 0.55rem;
  border: 1px solid var(--rule); border-radius: 2px;
  color: var(--ink-soft); background: var(--paper);
}

/* ── TIMELINE ── */
.timeline { margin: 1rem 0; }
.tl-item { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: flex-start; }
.tl-year {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem; color: var(--teal); font-weight: 500;
  min-width: 48px; padding-top: 3px; flex-shrink: 0;
}
.tl-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); margin-top: 6px; flex-shrink: 0; }
.tl-content { font-size: 0.84rem; color: var(--ink-soft); line-height: 1.65; }
.tl-content strong { color: var(--ink); }

/* ── COMPARISON TABLE ── */
.compare-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; margin: 1rem 0; }
.compare-table th {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ink-soft); text-align: left; padding: 0.7rem 0.9rem;
  border-bottom: 2px solid var(--ink); background: var(--paper-warm); white-space: nowrap;
}
.compare-table td {
  padding: 0.75rem 0.9rem; border-bottom: 1px solid var(--rule);
  color: var(--ink-soft); vertical-align: top;
}
.compare-table tr:last-child td { border-bottom: none; }
.compare-table tr:hover td { background: var(--paper-warm); }
.company-col { font-weight: 500; color: var(--ink); }

/* ── HIGHLIGHT BOX ── */
.highlight-box { background: var(--ink); color: var(--paper); border-radius: 2px; padding: 2rem; margin: 1.5rem 0; }
.highlight-box h3 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.2rem; margin-bottom: 0.75rem; color: var(--gold); font-weight: 400;
}
.highlight-box p { color: #D1D5DB; font-size: 0.84rem; margin-bottom: 0.75rem; line-height: 1.7; }
.highlight-box ul { padding-left: 1.25rem; }
.highlight-box ul li { color: #D1D5DB; font-size: 0.84rem; margin-bottom: 0.5rem; line-height: 1.65; }

/* ── OPPORTUNITY GRID ── */
.opp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
.opp-card { padding: 1.4rem; border: 1px solid var(--rule); background: white; border-radius: 2px; }
.opp-card.gap-highlight { border-left: 3px solid var(--teal); background: var(--teal-pale); }
.opp-icon { font-size: 1.4rem; margin-bottom: 0.8rem; }
.opp-title { font-family: 'Instrument Serif', Georgia, serif; font-size: 1.05rem; margin-bottom: 0.5rem; font-weight: 400; }
.opp-desc { font-size: 0.82rem; color: var(--ink-soft); line-height: 1.65; }

/* ── SOLUTIONS COVER ── */
.solutions-cover {
  background: var(--ink); color: var(--paper);
  padding: 5rem 2rem 4rem; border-top: 1px solid rgba(255,255,255,0.08);
}
.solutions-cover-inner { max-width: 1080px; margin: 0 auto; }
.solutions-cover-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 1.2rem; display: block;
}
.solutions-cover h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 400; line-height: 1.08; margin-bottom: 1rem; color: var(--paper);
}
.solutions-cover h2 em { font-style: italic; color: var(--gold); }
.solutions-cover-sub { font-size: 1rem; color: #9CA3AF; max-width: 580px; line-height: 1.75; margin-bottom: 2.5rem; }
.solutions-cluster-nav { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.scn-pill {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.4rem 0.9rem; border: 1px solid rgba(255,255,255,0.15);
  background: transparent; color: #9CA3AF; border-radius: 2px;
  text-decoration: none; transition: all 0.18s; display: inline-block;
}
.scn-pill:hover { background: rgba(255,255,255,0.1); color: var(--paper); }

/* ── CLUSTER PAGES ── */
.cluster-page { background: var(--paper); padding: 0; border-bottom: 1px solid var(--rule); }
.cluster-page-header {
  padding: 3rem 2rem 0; max-width: 1080px; margin: 0 auto;
  display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;
}
.cluster-page-number {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 5rem; line-height: 1; flex-shrink: 0; user-select: none; font-weight: 400;
}
.cluster-page-meta { flex: 1; min-width: 260px; }
.cluster-page-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.18em;
  text-transform: uppercase; margin-bottom: 0.75rem; display: block;
}
.cluster-page-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 400; line-height: 1.2; margin-bottom: 0.75rem; color: var(--ink);
}
.cluster-page-desc { font-size: 0.9rem; color: var(--ink-soft); line-height: 1.75; max-width: 560px; }
.cluster-friction-note {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 1rem; padding: 0.3rem 0.7rem; border-radius: 2px;
  font-size: 0.7rem; font-family: 'DM Mono', monospace; letter-spacing: 0.06em;
}
.friction-zero { background: var(--green-pale); color: var(--green); }
.friction-low  { background: var(--gold-pale);  color: var(--gold);  }

/* ── IDEA BLOCKS ── */
.cluster-ideas {
  padding: 2rem 2rem 3rem; max-width: 1080px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;
}
.idea-block {
  background: white; border: 1px solid var(--rule); border-radius: 2px;
  padding: 1.4rem; display: flex; flex-direction: column;
  position: relative; overflow: hidden; transition: box-shadow 0.2s;
}
.idea-block:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
.idea-block::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
.idea-block-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem; color: var(--ink-soft);
  letter-spacing: 0.12em; margin-bottom: 0.75rem; text-transform: uppercase;
}
.idea-block-name {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem; font-weight: 400; line-height: 1.25; margin-bottom: 0.5rem; color: var(--ink);
}
.idea-block-hook { font-size: 0.82rem; color: var(--ink-soft); font-style: italic; margin-bottom: 0.75rem; line-height: 1.5; }
.idea-block-detail { font-size: 0.82rem; color: var(--ink-soft); line-height: 1.7; flex: 1; margin-bottom: 1rem; }
.idea-block-footer { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: auto; }
.idea-tag {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem; padding: 0.2rem 0.55rem; border-radius: 2px;
  background: var(--paper); border: 1px solid var(--rule); color: var(--ink-soft);
}
.cluster-strip { height: 1px; background: var(--rule); }

/* ── CLUSTER COLOR ACCENTS ── */
.c-relationship .idea-block::before  { background: var(--teal);   }
.c-relationship .cluster-page-eyebrow { color: var(--teal);       }
.c-relationship .cluster-page-number  { color: var(--teal-pale);  }

.c-expertise .idea-block::before    { background: var(--violet);  }
.c-expertise .cluster-page-eyebrow { color: var(--violet);        }
.c-expertise .cluster-page-number  { color: var(--violet-pale);   }

.c-ona .idea-block::before          { background: var(--green);   }
.c-ona .cluster-page-eyebrow       { color: var(--green);         }
.c-ona .cluster-page-number        { color: var(--green-pale);    }

.c-conversation .idea-block::before    { background: var(--gold); }
.c-conversation .cluster-page-eyebrow { color: var(--gold);       }
.c-conversation .cluster-page-number  { color: var(--gold-pale);  }

.c-crosssell .idea-block::before    { background: var(--red);     }
.c-crosssell .cluster-page-eyebrow { color: var(--red);           }
.c-crosssell .cluster-page-number  { color: var(--red-pale);      }

.c-data .idea-block::before         { background: var(--blue);    }
.c-data .cluster-page-eyebrow      { color: var(--blue);          }
.c-data .cluster-page-number       { color: var(--blue-pale);     }

.c-vertical .idea-block::before     { background: var(--orange);  }
.c-vertical .cluster-page-eyebrow  { color: var(--orange);        }
.c-vertical .cluster-page-number   { color: var(--orange-pale);   }

/* ── CLOSING STRIP ── */
.solutions-closing {
  background: var(--ink); color: #6B7280;
  padding: 2.5rem 2rem;
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;
}
.solutions-closing-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem; color: var(--paper); margin-bottom: 0.3rem; font-weight: 400;
}
.solutions-closing-sub { font-family: 'DM Mono', monospace; font-size: 0.72rem; color: #6B7280; }
.solutions-closing-stats { display: flex; gap: 2rem; flex-wrap: wrap; }
.solutions-closing-stat { text-align: right; }
.solutions-closing-stat .num {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.6rem; line-height: 1; margin-bottom: 0.25rem; font-weight: 400;
}
.solutions-closing-stat .label {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem; color: #6B7280; text-transform: uppercase; letter-spacing: 0.1em;
}

/* ── SITE FOOTER ── */
.site-footer {
  background: var(--ink); color: #6B7280;
  padding: 1.5rem 2rem; font-family: 'DM Mono', monospace;
  font-size: 0.68rem; text-align: center;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* ── RESPONSIVE ── */
@media (max-width: 680px) {
  nav { padding: 0 1rem; gap: 1rem; }
  .nav-links { display: none; }
  .cover, .solutions-cover { padding: 3rem 1rem; }
  .section { padding: 2rem 1rem; }
  .card-header { flex-direction: column; }
  .stat { text-align: left; }
  .map-grid { grid-template-columns: 1fr; }
  .cluster-page-header { padding: 2rem 1rem 0; flex-direction: column; gap: 0.75rem; }
  .cluster-page-number { font-size: 3rem; }
  .cluster-ideas { padding: 1.5rem 1rem 2rem; grid-template-columns: 1fr; }
}

/* ── SCROLL REVEAL ── */
.reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.55s ease, transform 0.55s ease; }
.reveal.visible { opacity: 1; transform: none; }
```

- [ ] **Step 2: Commit**

```bash
git add untapped-knowledge.html
git commit -m "Replace CSS in untapped-knowledge.html with unified design system"
```

---

### Task 3: Update `<head>` and nav HTML

**Files:**
- Modify: `untapped-knowledge.html`

- [ ] **Step 1: Replace font import in `<head>`**

Replace:
```html
<title>Market Study: The Organizational Intelligence Revolution</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```
With:
```html
<title>Untapped Knowledge Intelligence · Market Research 2026</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
```

Note: the `@import` line at the top of the new `<style>` block (added in Task 2) must be removed now that fonts are loaded via `<link>` tags. Delete this line from the `<style>` block:
```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
```

- [ ] **Step 2: Replace the `.toc` div with the shared `<nav>`**

Replace the entire `<!-- TOC -->` block:
```html
<!-- TOC -->
<div class="toc">
  <span class="toc-label">Sections</span>
  <a href="#context">The Problem</a>
  <a href="#introhive">Introhive</a>
  <a href="#affinity">Affinity</a>
  <a href="#gong">Gong</a>
  <a href="#glean">Glean</a>
  <a href="#people-ai">People.ai</a>
  <a href="#ona">ONA Platforms</a>
  <a href="#landscape">Landscape Map</a>
  <a href="#opportunities">White Space</a>
  <a href="#solutions" style="background:var(--signal);color:white;border-color:var(--signal);">→ Solution Clusters</a>
  <a href="index.html" style="margin-left:auto;background:var(--ink);color:white;border-color:var(--ink);">Earnings Intelligence Study →</a>
</div>
```
With:
```html
<!-- NAV -->
<nav>
  <a href="index.html" class="nav-brand">sarvagyasinghs.com</a>
  <div class="nav-reports">
    <a href="index.html" class="nav-report-link">Earnings Intelligence</a>
    <span class="nav-sep">·</span>
    <a href="untapped-knowledge.html" class="nav-report-link active">Untapped Knowledge</a>
  </div>
  <ul class="nav-links">
    <li><a href="#context">Problem</a></li>
    <li><a href="#introhive">Profiles</a></li>
    <li><a href="#landscape">Landscape</a></li>
    <li><a href="#opportunities">White Space</a></li>
    <li><a href="#solutions">Solutions</a></li>
  </ul>
</nav>
```

- [ ] **Step 3: Verify nav in browser**

Open `untapped-knowledge.html`. Sticky nav should show: `sarvagyasinghs.com` (teal, left) · `Earnings Intelligence` (muted) · `Untapped Knowledge` (teal underline, active) · 5 section links (right). Should be identical in height and style to `index.html` nav.

- [ ] **Step 4: Commit**

```bash
git add untapped-knowledge.html
git commit -m "Update head fonts and nav in untapped-knowledge.html"
```

---

### Task 4: Update hero HTML

**Files:**
- Modify: `untapped-knowledge.html` (`.cover` section)

- [ ] **Step 1: Add `.cover-inner` wrapper and change label tag**

Replace the entire `<!-- COVER -->` block:
```html
<!-- COVER -->
<div class="cover">
  <div class="cover-label">Market Intelligence Report · June 2026</div>
  <h1>The <em>Untapped Knowledge</em><br>Intelligence Revolution</h1>
  <p class="cover-sub">A comprehensive study of platforms turning an organization's hidden relationship capital — buried in emails, calendars, conversations, and directories — into its most powerful competitive asset.</p>
  <div class="cover-meta">
    <div class="cover-meta-item"><strong>6 Companies Profiled</strong>Market Leaders</div>
    <div class="cover-meta-item"><strong>$2.3B → $11.3B</strong>Graph Analytics Market CAGR</div>
    <div class="cover-meta-item"><strong>~$2B+</strong>Total Funding in Space</div>
    <div class="cover-meta-item"><strong>2012 – 2026</strong>Category Timeline</div>
  </div>
</div>
```
With:
```html
<!-- COVER -->
<div class="cover">
  <div class="cover-inner">
    <span class="cover-label">Market Intelligence Report · June 2026</span>
    <h1>The <em>Untapped Knowledge</em><br>Intelligence Revolution</h1>
    <p class="cover-sub">A comprehensive study of platforms turning an organization's hidden relationship capital — buried in emails, calendars, conversations, and directories — into its most powerful competitive asset.</p>
    <div class="cover-meta">
      <div class="cover-meta-item"><strong>6 Companies Profiled</strong>Market Leaders</div>
      <div class="cover-meta-item"><strong>$2.3B → $11.3B</strong>Graph Analytics Market CAGR</div>
      <div class="cover-meta-item"><strong>~$2B+</strong>Total Funding in Space</div>
      <div class="cover-meta-item"><strong>2012 – 2026</strong>Category Timeline</div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Verify hero in browser**

Dark ink background with: teal DM Mono eyebrow · large Instrument Serif h1 with italic teal "Untapped Knowledge" · muted grey subtitle · 4 DM Mono stat items. Max-width 1080px centered. Matches the Earnings Intelligence hero proportions.

- [ ] **Step 3: Commit**

```bash
git add untapped-knowledge.html
git commit -m "Update hero HTML in untapped-knowledge.html"
```

---

### Task 5: Update market map sections

**Files:**
- Modify: `untapped-knowledge.html` (two `.market-map` blocks + opportunity cards)

- [ ] **Step 1: Update the first market-map (Problem section)**

In `<!-- THE PROBLEM -->`, replace the inline-styled map header:
```html
<div class="market-map">
  <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:6px;">Where the Knowledge Hides</div>
  <p style="font-size:13px;color:#6B7280;margin-bottom:0;">The "dark data" of enterprise organizations — interaction intelligence that exists but is never surfaced.</p>
  <div class="map-grid">
```
With:
```html
<div class="market-map">
  <div class="market-map-header">
    <p class="market-map-title">Where the Knowledge Hides</p>
    <span class="market-map-sub">The "dark data" of enterprise organizations — interaction intelligence that exists but is never surfaced.</span>
  </div>
  <div class="map-grid">
```

- [ ] **Step 2: Update the second market-map (White Space section)**

In `<!-- WHITE SPACE / OPPORTUNITIES -->`, replace the inline-styled map header:
```html
  <div class="market-map" style="margin-top:32px;">
    <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:6px;">Market Size Context</div>
    <p style="font-size:13px;color:#6B7280;margin-bottom:16px;">The macro market numbers behind the opportunity.</p>
    <div class="map-grid">
```
With:
```html
  <div class="market-map">
    <div class="market-map-header">
      <p class="market-map-title">Market Size Context</p>
      <span class="market-map-sub">The macro market numbers behind the opportunity.</span>
    </div>
    <div class="map-grid">
```

- [ ] **Step 3: Add `gap-highlight` class to first 3 opportunity cards**

In the `.opp-grid`, the first three `.opp-card` divs (Non-Professional Services Verticals, Cross-Organizational Relationship Graphs, Expertise Location at Scale) get the highlight class:
```html
<div class="opp-card gap-highlight">
  <div class="opp-icon">🏭</div>
  <div class="opp-title">Non-Professional Services Verticals</div>
  ...
</div>
<div class="opp-card gap-highlight">
  <div class="opp-icon">🔗</div>
  <div class="opp-title">Cross-Organizational Relationship Graphs</div>
  ...
</div>
<div class="opp-card gap-highlight">
  <div class="opp-icon">🧠</div>
  <div class="opp-title">Expertise Location at Scale</div>
  ...
</div>
```
The remaining three cards keep `class="opp-card"` with no gap-highlight.

- [ ] **Step 4: Verify sections in browser**

Both market maps should display as bordered containers with a paper-warm header row, grid of cells separated by 1px rule lines. Top-left cell has teal highlight. Opportunity grid: first 3 cards have teal left border and teal-pale background.

- [ ] **Step 5: Commit**

```bash
git add untapped-knowledge.html
git commit -m "Update market map headers and opportunity grid in untapped-knowledge.html"
```

---

### Task 6: Update solutions cover, closing strip, and footer

**Files:**
- Modify: `untapped-knowledge.html` (solutions section + bottom of page)

- [ ] **Step 1: Change `.solutions-cover-label` from `<div>` to `<span>`**

Replace:
```html
      <div class="solutions-cover-label">Part II · Product Brainstorm · 28 Ideas Across 7 Clusters</div>
```
With:
```html
      <span class="solutions-cover-label">Part II · Product Brainstorm · 28 Ideas Across 7 Clusters</span>
```

- [ ] **Step 2: Replace the inline-styled closing strip**

Replace:
```html
  <!-- Solutions closing strip -->
  <div style="background:var(--ink);color:#6B7280;padding:40px 60px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;">
    <div>
      <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--paper);margin-bottom:6px;">28 ideas. One constraint.</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#6B7280;">Zero additional friction for employees. All intelligence captured passively.</div>
    </div>
    <div style="display:flex;gap:32px;flex-wrap:wrap;">
      <div style="text-align:right;">
        <div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:700;color:#60A5FA;">7</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.1em;">Solution Clusters</div>
      </div>
      <div style="text-align:right;">
        <div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:700;color:#34D399;">3</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.1em;">Core Data Sources</div>
      </div>
      <div style="text-align:right;">
        <div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:700;color:#A78BFA;">0</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.1em;">Behavior Changes Required</div>
      </div>
    </div>
  </div>
```
With:
```html
  <!-- Solutions closing strip -->
  <div class="solutions-closing">
    <div>
      <div class="solutions-closing-title">28 ideas. One constraint.</div>
      <div class="solutions-closing-sub">Zero additional friction for employees. All intelligence captured passively.</div>
    </div>
    <div class="solutions-closing-stats">
      <div class="solutions-closing-stat">
        <div class="num" style="color:#60A5FA;">7</div>
        <div class="label">Solution Clusters</div>
      </div>
      <div class="solutions-closing-stat">
        <div class="num" style="color:#34D399;">3</div>
        <div class="label">Core Data Sources</div>
      </div>
      <div class="solutions-closing-stat">
        <div class="num" style="color:#A78BFA;">0</div>
        <div class="label">Behavior Changes Required</div>
      </div>
    </div>
  </div>
```

- [ ] **Step 3: Replace the inline-styled site footer**

Replace:
```html
<div style="background:var(--ink);color:#6B7280;padding:32px 60px;font-family:'JetBrains Mono',monospace;font-size:11px;text-align:center;">
  Market Intelligence Report · Compiled June 2026 · Sources: Company filings, Crunchbase, TechCrunch, CNBC, Startupintros, Contrary Research, official company sites. sarvagyasinghs.com
</div>
```
With:
```html
<div class="site-footer">
  Market Intelligence Report · Compiled June 2026 · Sources: Company filings, Crunchbase, TechCrunch, CNBC, Startupintros, Contrary Research, official company sites. sarvagyasinghs.com
</div>
```

- [ ] **Step 4: Add scroll-reveal script before `</body>`**

Add immediately before the closing `</body>` tag:
```html
<script>
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  reveals.forEach(el => observer.observe(el));
</script>
```

- [ ] **Step 5: Verify solutions section in browser**

Scroll to the solutions cover — dark ink background, gold DM Mono eyebrow, large Instrument Serif heading with italic gold "Untapped Knowledge". Closing strip shows 3 coloured stats. Footer is clean DM Mono text.

- [ ] **Step 6: Commit**

```bash
git add untapped-knowledge.html
git commit -m "Update solutions cover, closing strip, and footer HTML"
```

---

### Task 7: Final verification and push

**Files:**
- `index.html`, `untapped-knowledge.html`

- [ ] **Step 1: Visual cross-check — nav**

Open both pages. Confirm on each:
- `sarvagyasinghs.com` brand links back to `index.html`
- Active report tab (current page) has teal color + teal underline
- Inactive tab is muted `--ink-soft`
- Section links are right-aligned via `margin-left: auto`

- [ ] **Step 2: Visual cross-check — typography**

On `untapped-knowledge.html` confirm:
- Section headings: Instrument Serif (not Syne)
- Body paragraphs: DM Sans
- Labels, badges, tags, stat values: DM Mono
- No legacy fonts (Syne, Inter, JetBrains Mono) visible anywhere

- [ ] **Step 3: Visual cross-check — components**

On `untapped-knowledge.html` confirm:
- Company cards: `border-radius: 2px`, white background, hover shadow
- Badges: correct new palette colors (Introhive=teal, Affinity=violet, People.ai=gold, TrustSphere=green, Gong=red, Glean=violet)
- Timeline dots: teal
- Comparison table header: `paper-warm` background, `2px solid var(--ink)` bottom border
- Highlight box h3: gold Instrument Serif
- First 3 opportunity cards: teal left border + teal-pale background

- [ ] **Step 4: Content spot-check**

Verify 3 random body paragraphs on `untapped-knowledge.html` are word-for-word identical to the original. All company stats, idea block descriptions, and section headings must be unchanged.

- [ ] **Step 5: Push**

```bash
git add index.html untapped-knowledge.html
git commit -m "Finalize unified market intelligence site — both pages on shared design system"
git push origin main
```
