'use client'

import { motion } from 'framer-motion'

/**
 * Re-mounts on every route change, giving each page a soft fade-in.
 * Opacity only (no transforms) so fixed-position dialogs keep working.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}
