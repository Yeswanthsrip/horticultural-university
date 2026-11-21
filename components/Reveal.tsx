'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

/** Fades and lifts content into view once as it scrolls into the viewport. */
export function Reveal({
  delay = 0,
  y = 24,
  className,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Same as <Reveal> but renders an <li>, for use directly inside lists. */
export function RevealItem({
  delay = 0,
  y = 20,
  className,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<'li'>) {
  return (
    <motion.li
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.li>
  )
}
