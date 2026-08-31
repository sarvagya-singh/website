# sarvagyasinghs.com

Personal portfolio of Sarvagya Singh: AI and product engineer, builder, boxer, mountaineer, endurance athlete, and occasional owner of a very pink Maruti 800.

The site is designed as a story-first portfolio rather than a conventional resume page. It brings together product work, research, personal projects, and off-screen pursuits through large-format photography, kinetic typography, scroll-triggered annotations, and editorial case-study pages.

Live site: [sarvagyasinghs.com](https://sarvagyasinghs.com)

## What this site is

- A portfolio for product, AI systems, research, and interface work.
- A personal archive of the things that shape how I build: altitude, boxing, endurance, machines, and college projects.
- A visual experiment inspired by expressive agency sites, with custom cursor behavior, hand-drawn motion details, animated navigation, and photo-led storytelling.

## Built with

- React
- Vite
- React Router
- Framer Motion
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

The current version leans into a premium, highly personal visual system:

- full-bleed hero photography instead of generic interface screenshots
- handwritten-style annotations that appear on scroll
- compact project tiles with richer context
- a custom cursor on pointer devices
- photo collages and carousel sections that make the content feel lived-in

The goal is simple: answer "Who is Sarvagya Singh?" through the work, the stories, and the things that happen outside the screen.
