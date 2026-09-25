import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const loaderKey = 'sarvagya-kinetic-loader-seen'

export default function GlobalFx() {
  const [loading, setLoading] = useState(() => {
    try { return sessionStorage.getItem(loaderKey) !== '1' } catch { return true }
  })
  const cursorRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!loading) return undefined
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => {
      try { sessionStorage.setItem(loaderKey, '1') } catch { /* storage can be unavailable */ }
      setLoading(false)
      document.body.style.overflow = ''
    }, reduceMotion ? 80 : 720)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [loading, reduceMotion])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || reduceMotion) return undefined
    const cursor = cursorRef.current
    if (!cursor) return undefined
    // Only hide the system cursor while the custom one is actually running.
    document.documentElement.classList.add('has-custom-cursor')

    let targetX = -100
    let targetY = -100
    let currentX = -100
    let currentY = -100
    let animationFrame

    const render = () => {
      currentX += (targetX - currentX) * 0.22
      currentY += (targetY - currentY) * 0.22
      cursor.style.setProperty('--cursor-x', `${currentX}px`)
      cursor.style.setProperty('--cursor-y', `${currentY}px`)
      animationFrame = window.requestAnimationFrame(render)
    }

    const move = (event) => {
      const target = event.target.closest?.('[data-cursor], a, button, [role="button"]')
      const label = target?.dataset?.cursor || (target ? 'go' : '')
      targetX = event.clientX
      targetY = event.clientY
      cursor.dataset.visible = 'true'
      cursor.dataset.active = label ? 'true' : 'false'
      cursor.querySelector('span').textContent = label
    }
    const hide = () => { cursor.dataset.visible = 'false' }
    const press = () => { cursor.dataset.pressed = 'true' }
    const release = () => { cursor.dataset.pressed = 'false' }
    animationFrame = window.requestAnimationFrame(render)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    document.documentElement.addEventListener('mouseleave', hide)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      document.documentElement.removeEventListener('mouseleave', hide)
    }
  }, [reduceMotion])

  useEffect(() => {
    const bound = new WeakSet()
    const observer = reduceMotion ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

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

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="site-loader"
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}>
              <span>sarvagyasinghs.com</span>
              <small>engineer, boxer, mountaineer</small>
            </motion.div>
            <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><i /><span /></div>
    </>
  )
}
