'use client'

import { motion } from 'framer-motion'
import { quickLinks } from '@/data/site'
import { Icon } from './Icons'
import { useSite } from './SiteProviders'

export function QuickLinks() {
  const { t } = useSite()
  return (
    <div className="flex h-full flex-col rounded-2xl bg-forest-900 bg-veins p-5 text-white shadow-[0_24px_60px_-28px_rgb(10_36_24/0.6)] sm:p-7">
      <h2 className="flex items-center gap-3 text-xl font-semibold text-white sm:text-2xl">
        <span aria-hidden="true" className="h-px w-8 bg-gold-400" />
        {t(quickLinks.heading)}
      </h2>
      <ul className="mt-5 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
        {quickLinks.items.map((item, i) => (
          <motion.li
            key={item.label.en}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 * i }}
          >
            <a
              href={item.href}
              className="group flex h-full min-h-28 flex-col justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/60 hover:bg-white/[0.11]"
            >
              <span className="grid size-11 place-items-center rounded-lg bg-gold-400 text-forest-950 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-4deg]">
                <Icon name={item.icon} className="size-5.5" />
              </span>
              <span className="font-display text-[0.95rem] font-medium leading-snug text-white">{t(item.label)}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
