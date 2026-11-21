'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { about, university } from '@/data/site'
import { Icon } from './Icons'
import { PlaceholderTag } from './PlaceholderTag'
import { Reveal, RevealItem } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useSite } from './SiteProviders'

export function About() {
  const { t } = useSite()
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 sm:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Image with offset gold frame */}
        <Reveal className="relative lg:col-span-6" y={32}>
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-2xl border-2 border-gold-400/70 sm:-bottom-6 sm:-left-6" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-leaf-100 shadow-xl">
            <Image
              src={about.image.src}
              alt={t(about.image.alt)}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
            />
            <PlaceholderTag show={about.image.placeholder} />
          </div>
          <div className="absolute -right-2 -top-6 rounded-xl bg-forest-900 px-5 py-4 text-white shadow-lg sm:-right-6">
            <span className="block font-display text-3xl font-semibold text-gold-300">{university.established}</span>
            <span className="block text-xs uppercase tracking-[0.16em] text-white/80">Est.</span>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHeading id="about-heading" eyebrow={about.eyebrow} heading={about.heading} />
          <Reveal delay={0.1}>
            {about.paragraphs.map((p) => (
              <p key={p.en.slice(0, 24)} className="mt-5 text-[1.05rem] text-ink-soft">
                {t(p)}
              </p>
            ))}
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {about.pillars.map((pillar, i) => (
              <RevealItem
                key={pillar.title.en}
                delay={0.15 + i * 0.08}
                className="h-full rounded-xl border border-forest-900/10 bg-leaf-50 p-4 transition-colors hover:border-leaf-500/40"
              >
                  <Icon name={pillar.icon} className="size-6 text-leaf-700" />
                  <span className="mt-3 block font-display font-semibold text-forest-900">{t(pillar.title)}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{t(pillar.text)}</span>
              </RevealItem>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <a
              href={about.cta.href}
              className="group mt-9 inline-flex items-center gap-2 rounded-md bg-forest-800 px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-forest-700"
            >
              {t(about.cta.label)}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
