import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, delay = 0, className = '', style, variant = 'rise' }) {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion
    ? { opacity: 0 }
    : variant === 'photo'
      ? { opacity: 0, scale: 0.94, y: 28 }
      : { opacity: 0, y: 24 }

  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
