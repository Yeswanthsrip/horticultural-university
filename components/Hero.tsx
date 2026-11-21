'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { hero, ui } from '@/data/site'
import { PlaceholderTag } from './PlaceholderTag'
import { useSite } from './SiteProviders'

export function Hero() {
  const { t } = useSite()
  const reduceMotion = useReducedMotion()
  const slides = hero.slides
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  // Only mount slides that have been (or are about to be) shown — saves bandwidth.
  const [mounted, setMounted] = useState(() => new Set([0, 1 % slides.length]))

  useEffect(() => {
    if (reduceMotion) setPlaying(false)
  }, [reduceMotion])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), hero.intervalMs)
    return () => clearInterval(id)
  }, [playing, slides.length])

  useEffect(() => {
    setMounted((prev) => {
      const nextIdx = (index + 1) % slides.length
      if (prev.has(index) && prev.has(nextIdx)) return prev
      return new Set([...prev, index, nextIdx])
    })
  }, [index, slides.length])

  const heading = t(hero.heading)

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-forest-950">
      {/* Slides */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {slides.map((slide, i) =>
          mounted.has(i) ? (
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute inset-0"
                animate={i === index && !reduceMotion ? { scale: [1.06, 1] } : { scale: 1 }}
                transition={{ duration: hero.intervalMs / 1000 + 1.6, ease: 'linear' }}
              >
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  preload={i === 0}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  sizes="100vw"
                  quality={60}
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          ) : null,
        )}
        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/70 to-forest-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-950/80 to-transparent" />
      </div>

      <PlaceholderTag show={slides[index].placeholder} className="right-4 top-4" />

      <div className="container-page relative flex min-h-[34rem] flex-col justify-center pb-36 pt-16 sm:min-h-[38rem] lg:min-h-[44rem] lg:pb-44">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300"
          >
            <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
            {t(hero.eyebrow)}
          </motion.p>

          <motion.h1
            key={heading}
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[2.35rem] font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[3.6rem]"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-xl text-lg text-white/85"
          >
            {t(hero.tagline)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold-400 px-6 py-3.5 font-display font-semibold text-forest-950 shadow-lg shadow-gold-500/20 transition-all hover:-translate-y-0.5 hover:bg-gold-300"
            >
              {t(hero.primaryCta.label)}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/5 px-6 py-3.5 font-display font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            >
              {t(hero.secondaryCta.label)}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-28 right-4 flex items-center gap-4 sm:right-6 lg:bottom-36 lg:right-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.4 }}
              className="hidden text-right text-sm text-white/80 sm:block"
            >
              <span className="font-display font-semibold text-white">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-1.5 text-white/40">/</span>
              {String(slides.length).padStart(2, '0')}
              <span className="ml-3">{t(slides[index].caption)}</span>
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-1.5" role="group" aria-label="Slideshow">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${t(ui.goToSlide)} ${i + 1}: ${t(s.caption)}`}
                aria-current={i === index}
                className="grid h-6 place-items-center px-0.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-8 bg-gold-400' : 'w-3 bg-white/50 hover:bg-white/80'
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? t(ui.pauseSlideshow) : t(ui.playSlideshow)}
            className="grid size-9 place-items-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15"
          >
            {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  )
}
