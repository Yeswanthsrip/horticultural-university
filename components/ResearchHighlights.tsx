'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { research, ui } from '@/data/site'
import { PlaceholderTag } from './PlaceholderTag'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useSite } from './SiteProviders'

export function ResearchHighlights() {
  const { t } = useSite()
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = trackRef.current
    el?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el?.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const navBtn =
    'grid size-11 place-items-center rounded-full border border-forest-900/15 bg-white text-forest-900 transition-all hover:border-forest-800 hover:bg-forest-800 hover:text-white disabled:pointer-events-none disabled:opacity-35'

  return (
    <section id="research" aria-labelledby="research-heading" className="overflow-hidden py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="research-heading" eyebrow={research.eyebrow} heading={research.heading} />
          <Reveal className="flex items-center gap-3">
            <a href={research.viewAllHref} className="mr-2 hidden text-sm font-semibold text-leaf-700 hover:text-forest-800 sm:inline">
              {t(ui.viewAll)}
            </a>
            <button type="button" className={navBtn} onClick={() => scrollByCard(-1)} disabled={atStart} aria-controls="research-track">
              <ChevronLeft aria-hidden="true" className="size-5" />
              <span className="sr-only">{t(ui.previous)}</span>
            </button>
            <button type="button" className={navBtn} onClick={() => scrollByCard(1)} disabled={atEnd} aria-controls="research-track">
              <ChevronRight aria-hidden="true" className="size-5" />
              <span className="sr-only">{t(ui.next)}</span>
            </button>
          </Reveal>
        </div>

        <ul
          id="research-track"
          ref={trackRef}
          aria-label={t(research.eyebrow)}
          className="scrollbar-none -mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {research.items.map((item, i) => (
            <motion.li
              key={item.title.en}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/3)]"
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-forest-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-leaf-100">
                  <Image
                    src={item.image.src}
                    alt={t(item.image.alt)}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 82vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <PlaceholderTag show={item.image.placeholder} className="right-3 top-3" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-forest-900/85 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur-sm">
                    {t(item.category)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-snug">{t(item.title)}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] text-ink-soft">{t(item.summary)}</p>
                  <a
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-leaf-700 after:absolute after:inset-0 hover:text-forest-800"
                  >
                    {t(ui.readMore)}
                    <span className="sr-only">: {t(item.title)}</span>
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
