import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const site = 'https://sarvagyasinghs.com'
const pages = {
  projects: ['Work', 'Six projects Sarvagya Singh has built, from Nazara and KPMG’s bid intelligence platform to a hackathon-winning well-being app, plus his research papers.'],
  about: ['About', 'Sarvagya Singh: AI and product engineer, boxer, mountaineer, and owner of a pink Maruti 800.'],
  contact: ['Contact', 'How to reach Sarvagya Singh.'],
}

// GitHub Pages serves static files only, so write a real index.html per route
// (correct title, description and canonical for crawlers and link previews), plus a 404 fallback.
const staticRoutes = () => ({
  name: 'static-routes',
  closeBundle() {
    const html = readFileSync('docs/index.html', 'utf8')
    writeFileSync('docs/404.html', html)
    for (const [path, [title, description]] of Object.entries(pages)) {
      const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
      const page = html
        .replace(/<title>.*?<\/title>/, `<title>${esc(title)} | Sarvagya Singh</title>`)
        .replace(/(name="description" content=")[^"]*/, `$1${esc(description)}`)
        .replace(/(property="og:description" content=")[^"]*/, `$1${esc(description)}`)
        .replace(/(property="og:title" content=")[^"]*/, `$1${esc(title)} | Sarvagya Singh`)
        .replace(/(rel="canonical" href=")[^"]*/, `$1${site}/${path}`)
        .replace(/(property="og:url" content=")[^"]*/, `$1${site}/${path}`)
      mkdirSync(`docs/${path}`, { recursive: true })
      writeFileSync(`docs/${path}/index.html`, page)
    }
  },
})

export default defineConfig({
  plugins: [react(), staticRoutes()],
  base: '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
