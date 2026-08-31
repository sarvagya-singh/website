import { motion, useReducedMotion } from 'framer-motion'

const variants = {
  rise: { opacity: 0, y: 24 },
  photo: { opacity: 0, scale: 0.97, y: 16 },
  left: { opacity: 0, x: -24 },
  right: { opacity: 0, x: 24 },
  pop: { opacity: 0, scale: 0.96, y: 16 },
}

export default function Reveal({ children, delay = 0, className = '', style, variant = 'rise', amount = 0.2 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduceMotion ? { opacity: 0 } : variants[variant] || variants.rise}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduceMotion ? 0.01 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
