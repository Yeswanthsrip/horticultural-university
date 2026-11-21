'use client'

import { ArrowUp, MapPin, Navigation, Phone } from 'lucide-react'
import { contact, footer, ui, university } from '@/data/site'
import { SocialIcon } from './Icons'
import { Logo } from './Logo'
import { Reveal, RevealItem } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useSite } from './SiteProviders'

export function ContactFooter() {
  const { t, lang } = useSite()
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="relative bg-forest-950 bg-veins text-white">
      {/* Gold top rule */}
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-leaf-500" />

      <div className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="contact-heading" eyebrow={contact.eyebrow} heading={contact.heading} tone="dark" />

            <Reveal delay={0.1}>
              <address className="mt-8 flex gap-4 not-italic">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-400 text-forest-950">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <span className="text-white/90">
                  {contact.address[lang].map((line, i) => (
                    <span key={line} className={`block ${i === 0 ? 'font-display font-semibold text-white' : ''}`}>
                      {line}
                    </span>
                  ))}
                </span>
              </address>
            </Reveal>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {contact.phones.map((p, i) => (
                <RevealItem key={p.tel} delay={0.15 + i * 0.05}>
                  <a
                    href={`tel:${p.tel}`}
                    aria-label={`${t(p.label)}: ${p.display}. ${t(ui.tapToCall)}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-gold-400/60 hover:bg-white/[0.08]"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-forest-950">
                      <Phone aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-white/70">{t(p.label)}</span>
                      <span className="block font-display font-semibold tracking-wide text-white">{p.display}</span>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-forest-900 shadow-2xl">
              <iframe
                title={t(contact.map.title)}
                src={contact.map.embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0 sm:aspect-[16/10]"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <span className="text-sm text-white/80">{t(university.location)}</span>
                <a
                  href={contact.map.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300"
                >
                  <Navigation aria-hidden="true" className="size-4" />
                  {t(contact.map.directionsLabel)}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Footer link columns */}
        <div className="mt-20 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Logo className="size-12 shrink-0" />
              <span className="font-display font-semibold leading-snug text-white">{t(university.name)}</span>
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">{t(contact.socialHeading)}</p>
            <ul className="mt-3 flex gap-2">
              {contact.social.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-white/15 text-white/85 transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-forest-950"
                  >
                    <SocialIcon network={s.network} className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.heading.en} aria-label={t(col.heading)} className="lg:col-span-2 lg:col-start-auto">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">{t(col.heading)}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label.en}>
                    <a href={l.href} className="text-[0.95rem] text-white/80 transition-colors hover:text-white hover:underline hover:underline-offset-4">
                      {t(l.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-2">
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <ArrowUp aria-hidden="true" className="size-4" />
              {t(ui.backToTop)}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{t(footer.copyright)}</p>
          <p>{t(footer.disclaimer)}</p>
        </div>
      </div>
    </footer>
  )
}
