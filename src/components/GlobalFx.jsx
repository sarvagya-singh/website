import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { startSmoothScroll } from '../lib/scroll'

export default function GlobalFx() {
  const reduceMotion = useReducedMotion()

  useEffect(() => startSmoothScroll(), [])

  // Anything with data-reveal fades in once, the first time it scrolls into view.
  useEffect(() => {
    const bound = new WeakSet()
    const observer = reduceMotion ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    const bindReveals = () => {
      document.querySelectorAll('[data-reveal]').forEach((element) => {
        if (bound.has(element)) return
        bound.add(element)
        if (reduceMotion) element.classList.add('is-visible')
        else observer.observe(element)
      })
    }

    const frame = window.requestAnimationFrame(bindReveals)
    const mutations = new MutationObserver(bindReveals)
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      window.cancelAnimationFrame(frame)
      mutations.disconnect()
      observer?.disconnect()
    }
  }, [reduceMotion])

  return null
}
