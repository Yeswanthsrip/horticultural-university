'use client'

import { ArrowRight, Quote } from 'lucide-react'
import Image from 'next/image'
import { ui, viceChancellor } from '@/data/site'
import { PlaceholderTag } from './PlaceholderTag'
import { Reveal } from './Reveal'
import { useSite } from './SiteProviders'

export function ViceChancellor() {
  const { t } = useSite()
  const vc = viceChancellor
  return (
    <section
      id="vice-chancellor"
      aria-labelledby="vc-heading"
      className="relative overflow-hidden bg-forest-900 bg-veins py-20 text-white sm:py-24"
    >
      <div className="container-page grid items-center gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5 lg:col-span-4" y={32}>
          <figure className="mx-auto max-w-xs">
            {/* Arched portrait frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl border-4 border-gold-400/80 bg-forest-800 shadow-2xl">
              {vc.photo ? (
                <Image src={vc.photo} alt={t(vc.name)} fill sizes="320px" className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-b from-forest-700 to-forest-800">
                  {/* Neutral silhouette placeholder */}
                  <svg viewBox="0 0 200 220" aria-hidden="true" className="w-3/4 text-forest-600">
                    <circle cx="100" cy="78" r="42" fill="currentColor" />
                    <path d="M18 220c4-52 40-84 82-84s78 32 82 84Z" fill="currentColor" />
                  </svg>
                </div>
              )}
              <PlaceholderTag show={!vc.photo} className="bottom-3 left-1/2 -translate-x-1/2" />
            </div>
            <figcaption className="mt-5 text-center">
              <span className="block font-display text-xl font-semibold text-white">{t(vc.name)}</span>
              <span className="block text-sm font-medium uppercase tracking-[0.16em] text-gold-300">{t(vc.designation)}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
              <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
              {t(vc.eyebrow)}
            </p>
            <h2 id="vc-heading" className="sr-only">
              {t(vc.eyebrow)} — {t(vc.name)}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="relative mt-6">
              <Quote aria-hidden="true" className="absolute -left-2 -top-4 size-14 text-gold-400/25" strokeWidth={1.2} />
              <p className="relative font-display text-xl font-medium leading-relaxed text-white/95 sm:text-2xl sm:leading-relaxed">
                {t(vc.message)}
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={vc.readMoreHref}
              className="group mt-9 inline-flex items-center gap-2 rounded-md border border-gold-400 px-6 py-3 font-display font-semibold text-gold-300 transition-colors hover:bg-gold-400 hover:text-forest-950"
            >
              {t(ui.readMore)}
              <span className="sr-only"> — {t(vc.eyebrow)}</span>
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
