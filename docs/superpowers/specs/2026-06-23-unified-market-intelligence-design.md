# Unified Market Intelligence Site — Design Spec
**Date:** 2026-06-23  
**Scope:** Two-page static site (`index.html` + `untapped-knowledge.html`) unified under the Earnings Intelligence design system. Content on both pages is preserved word-for-word. Only styling and navigation change.

---

## Goal

Both pages look and feel like one coherent site. The Earnings Intelligence page (`index.html`) is the design reference — its fonts, color tokens, layout patterns, and component styles are extended to `untapped-knowledge.html`. The Untapped Knowledge page keeps its dark dramatic hero as a visual differentiator.

---

## Design System (source of truth: `index.html`)

**Fonts**
- Instrument Serif — all headings (h1, h2, h3, card names, cluster titles)
- DM Sans — all body copy, descriptions, card body text
- DM Mono — all labels, eyebrows, badges, tags, nav brand, stats

**Color tokens** (identical on both pages)
```css
--ink:        #0D1117
--ink-soft:   #3A3F4A
--paper:      #F7F6F2
--paper-warm: #EDEAE1
--rule:       #D4CFC4
--gold:       #B8963E
--gold-pale:  #F2E8D0
--teal:       #1A6B70
--teal-pale:  #D4ECEE
--red:        #C0392B
--red-pale:   #FAE8E6
--violet:     #4B3B8C
--violet-pale:#E8E5F5
--green:      #1E6B45
--green-pale: #D5EDDF
--blue:       #1A4A8C
--blue-pale:  #D5E3F5
--orange:     #B85C1A
--orange-pale:#F5E4D5
```

**Primary accent per page**
- Earnings Intelligence: teal
- Untapped Knowledge: gold

---

## Shared Navigation (both pages)

Sticky, 60px tall, blur backdrop (`rgba(247,246,242,0.94)` + `backdrop-filter: blur(12px)`), `border-bottom: 1px solid var(--rule)`.

**Layout:**
```
[sarvagyasinghs.com]   [Earnings Intelligence] [Untapped Knowledge]   [section links...]
```

- **Brand** (left): `sarvagyasinghs.com` in DM Mono, teal, links to `index.html`
- **Report tabs** (center-left, separated from brand by a gap): two links styled as inline pills
  - Active page: teal color + `border-bottom: 2px solid var(--teal)`
  - Inactive: `--ink-soft` color, no underline
- **Section links** (right, `margin-left: auto`): page-specific anchor links, DM Sans 0.82rem, `--ink-soft`

**Section links per page:**
- Earnings Intelligence: Landscape · Segments · Profiles · Compare · Gaps
- Untapped Knowledge: Problem · Profiles · Landscape · White Space · Solutions

**Changes to `index.html` nav:** Add brand link + two report tabs. Section links stay identical. No other changes to `index.html`.

---

## Untapped Knowledge Page — Full Redesign

### Hero (dark, dramatic)
- Background: `var(--ink)`
- Eyebrow: DM Mono, 0.72rem, `var(--teal)`, letter-spacing 0.16em, uppercase — "Market Intelligence Report · June 2026"
- H1: Instrument Serif, `clamp(2.6rem, 6vw, 4.2rem)`, `var(--paper)` — "The *Untapped Knowledge* Intelligence Revolution" — "Untapped Knowledge" in `<em>` styled italic teal
- Subtitle: DM Sans, 1.05rem, `--ink-soft` equivalent on dark (`#9CA3AF`) — same text as today
- Meta stats row: 4 items in DM Mono. Label above in DM Mono 0.68rem teal uppercase, value below in DM Mono bold paper color

### Body Sections (`--paper` background, max-width 1080px, padding 3rem 2rem)
- **Section label:** DM Mono, 0.68rem, `var(--gold)`, letter-spacing 0.18em, uppercase — replaces old `section-eyebrow`
- **Section heading:** Instrument Serif, `clamp(1.6rem, 3vw, 2.2rem)`
- **Body copy:** DM Sans, 0.9rem, `--ink-soft`, line-height 1.75
- Sections separated by `border-bottom: 1px solid var(--rule)`, padding 3rem 2rem

### "Where the Knowledge Hides" Grid
Restyled as a `landscape-grid` (same component as Earnings Intelligence summary stats):
- 4 cells in a `repeat(auto-fit, minmax(220px, 1fr))` grid, 1px `--rule` gaps, `--paper` cell background
- Each cell: label in DM Mono gold, title in Instrument Serif, description in DM Sans

### Company Cards
Built on Earnings Intelligence `.card` component:
- `border: 1px solid var(--rule)`, `border-radius: 2px`, white background, hover shadow
- **Card header:** company name in Instrument Serif 1.2rem, tagline DM Sans 0.78rem, badge DM Mono pill (top-right)
- **Badge color map:**

| Old badge | New color |
|-----------|-----------|
| Leader (blue) | teal |
| VC (violet) | violet |
| Enterprise (amber) | gold |
| People (green) | green |
| Conversation (red) | red |
| Search (purple) | violet |

- **Stats** (funding, valuation, employees): DM Mono in card header, right-aligned
- **Founding story block:** `border-left: 3px solid var(--gold)`, `background: var(--paper-warm)`, DM Sans body — mirrors Earnings Intelligence "What it is" block
- **Section labels inside card:** DM Mono, 0.62rem, letter-spacing 0.14em, uppercase, `--ink-soft`
- **Target market pills:** `feature-list` tag style — `border: 1px solid var(--rule)`, `border-radius: 2px`, DM Mono 0.72rem

### Timeline (Introhive)
- Year: DM Mono, teal
- Dot: 6px circle, teal fill
- Content: DM Sans, `--ink-soft`

### Comparison Table
Exact Earnings Intelligence table style:
- `thead th`: DM Mono, `border-bottom: 2px solid var(--ink)`, `background: var(--paper-warm)`
- `tbody td`: DM Sans, `border-bottom: 1px solid var(--rule)`
- Hover: `background: var(--paper-warm)`

### Highlight Box (dark callout — "The Common Thread")
- Background `var(--ink)`, Instrument Serif h3 in gold, DM Sans body in `#D1D5DB`

### White Space / Opportunity Grid
Exact Earnings Intelligence `.gap-card` style:
- `border: 1px solid var(--rule)`, `border-radius: 2px`, white background
- Icon, Instrument Serif h3, DM Sans body
- **First 3 cards** get `border-left: 3px solid var(--teal)` + `background: var(--teal-pale)` highlight treatment, matching the Earnings Intelligence gap-highlight pattern

### Market Size Context Grid
Same `landscape-grid` component — 4 stat cells, same pattern as "Where the Knowledge Hides" grid above.

---

## Solution Clusters Section

### Solutions Cover (dark inter-section)
- Background: `var(--ink)`
- Eyebrow: DM Mono, teal — "Part II · Product Brainstorm · 28 Ideas Across 7 Clusters"
- H2: Instrument Serif — "Building in the *Untapped Knowledge* Space" — italic "Untapped Knowledge" in gold
- Sub: DM Sans, `#9CA3AF`
- Cluster nav: DM Mono pills matching Earnings Intelligence filter-bar style (`border: 1px solid rgba(255,255,255,0.15)`, `border-radius: 2px`)

### Cluster Pages (light paper background)
- Cluster number: Instrument Serif, 6rem, very light decorative color per cluster
- Eyebrow: DM Mono, colored per cluster
- Title: Instrument Serif
- Description: DM Sans
- Friction note: DM Mono pill (green-pale/green or gold-pale/gold)

**Cluster color map:**

| Cluster | Accent |
|---------|--------|
| 01 Relationship | teal |
| 02 Expertise | violet |
| 03 ONA | green |
| 04 Conversation | gold |
| 05 Cross-Sell | red |
| 06 Data Quality | blue |
| 07 Vertical | orange |

### Idea Blocks (28 cards)
Same card component as company cards:
- `border: 1px solid var(--rule)`, `border-radius: 2px`, white background
- 3px top color strip per cluster color
- Card number: DM Mono, `--ink-soft`
- Card name: Instrument Serif
- Hook: italic DM Sans, `--ink-soft`
- Detail: DM Sans, `--ink-soft`
- Tags: DM Mono pills — `feature-list` style

### Closing Strip (dark footer)
- Background: `var(--ink)`, DM Mono text, same layout as today

---

## File Changes

| File | Change |
|------|--------|
| `untapped-knowledge.html` | Full redesign — new CSS, nav, all components restyled. Content unchanged. |
| `index.html` | Nav only — add brand link + report tabs. Everything else unchanged. |

No new files. No shared stylesheet (single-file per page keeps deployment simple).

---

## Content Preservation

Every word of body copy, every company name, every stat, every idea block description, every section heading stays identical. This spec covers styling only.
