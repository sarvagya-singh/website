# sarvagyasinghs.com

Personal portfolio of Sarvagya Singh: AI and product engineer, builder, boxer, mountaineer, endurance athlete, and occasional owner of a very pink Maruti 800.

The site is designed as a story-first portfolio rather than a conventional resume page. It brings together product work, research, personal projects, and off-screen pursuits through large-format photography, kinetic typography, scroll-triggered annotations, and editorial case-study pages.

Live site: [sarvagyasinghs.com](https://sarvagyasinghs.com)

## What this site is

- A portfolio for product, AI systems, research, and interface work.
- A personal archive of the things that shape how I build: altitude, boxing, endurance, machines, and college projects.
- A retro Indian design in Mysore Sandal Soap colours: matchbox labels, postage stamps, roses and swirls, draggable stickers, and a header of hanging price tags.

## Built with

- React
- Vite
- React Router
- Framer Motion
- Lenis (smooth scrolling)
- CSS animations and responsive layouts

## Running locally

```bash
npm install
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The production output is generated into `docs/`, which is used for GitHub Pages-style hosting.

## Project structure

```text
src/
  components/   Shared navigation, footer, reveal effects, project modals
  data/         Portfolio, research, writing, and story content
  pages/        Home, work, about, contact, and writing pages
public/
  photos/       Portfolio and personal photography
docs/           Production build output
```

## Design direction

Mysore Sandal Soap meets 80s Bollywood posters: emerald, vermilion, marigold, rose and cream.

- type: Rozha One (display), Bricolage Grotesque (UI and body), Yellowtail (notes), Yatra One (Devanagari), IBM Plex Mono (labels)
- a matchbox hero whose drawer slides out, and a match you can strike
- nav links as hanging price tags that roll over to Hindi, a seal that turns with the scroll, and a burning fuse for scroll progress
- die-cut stickers that drift with the scroll and can be dragged around
- a once-per-visit intro curtain; all motion respects reduced-motion settings

The goal is simple: answer "Who is Sarvagya Singh?" through the work, the stories, and the things that happen outside the screen.
