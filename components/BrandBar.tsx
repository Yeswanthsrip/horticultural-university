'use client'

import { Phone } from 'lucide-react'
import { contact, hero, university } from '@/data/site'
import { Logo } from './Logo'
import { useSite } from './SiteProviders'

/** Desktop-only identity row above the sticky navbar. */
export function BrandBar() {
  const { t, lang } = useSite()
  const helpline = contact.phones[1]
  return (
    <div className="hidden border-b border-forest-900/10 bg-white lg:block">
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <a href="#top" className="flex items-center gap-4">
          <Logo className="size-16 shrink-0" />
          <span>
            <span className="block font-display text-[1.35rem] font-semibold leading-tight text-forest-900">
              {t(university.name)}
            </span>
            {/* Always show the other script too, as on official AP sites */}
            <span lang={lang === 'en' ? 'te' : 'en'} className="block text-[0.95rem] font-medium text-leaf-700">
              {lang === 'en' ? university.name.te : university.name.en}
            </span>
            <span className="block text-xs text-ink-soft">{t(university.location)}</span>
          </span>
        </a>

        <div className="flex items-center gap-5">
          <a href={`tel:${helpline.tel}`} className="group flex items-center gap-3 text-left">
            <span className="grid size-10 place-items-center rounded-full bg-leaf-100 text-forest-700 transition-colors group-hover:bg-leaf-200">
              <Phone aria-hidden="true" className="size-4.5" />
            </span>
            <span>
              <span className="block text-xs text-ink-soft">{t(helpline.label)}</span>
              <span className="block font-display font-semibold text-forest-900">{helpline.display}</span>
            </span>
          </a>
          <a
            href={hero.primaryCta.href}
            className="rounded-md bg-forest-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
          >
            {t(hero.primaryCta.label)}
          </a>
        </div>
      </div>
    </div>
  )
}
