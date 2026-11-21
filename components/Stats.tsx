'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { stats } from '@/data/site'
import { Icon } from './Icons'
import { Reveal, RevealItem } from './Reveal'
import { useSite } from './SiteProviders'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduceMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {/* Screen readers get the final number straight away */}
      <span aria-hidden="true">
        {display.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  )
}

export function Stats() {
  const { t } = useSite()
  return (
    <section aria-labelledby="stats-heading" className="border-b border-forest-900/10 bg-cream py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="stats-heading" className="text-2xl font-semibold sm:text-3xl">
            {t(stats.heading)}
          </h2>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-earth-700">{t(stats.note)}</p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-forest-900/10 lg:grid-cols-4">
          {stats.items.map((s, i) => (
            <RevealItem
              key={s.label.en}
              delay={i * 0.08}
              className="group flex flex-col gap-3 bg-white p-6 transition-colors hover:bg-leaf-50 sm:p-8"
            >
              <Icon name={s.icon} className="size-7 text-leaf-700 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <p className="font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-ink-soft">{t(s.label)}</p>
              <span aria-hidden="true" className="h-0.5 w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  )
}
