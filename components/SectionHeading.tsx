'use client'

import type { Localized } from '@/data/site'
import { Reveal } from './Reveal'
import { useSite } from './SiteProviders'

/** Section eyebrow + heading with the signature gold rule. */
export function SectionHeading({
  id,
  eyebrow,
  heading,
  tone = 'light',
  align = 'left',
  children,
}: {
  id?: string
  eyebrow: Localized
  heading: Localized
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  children?: React.ReactNode
}) {
  const { t } = useSite()
  const dark = tone === 'dark'
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <p
        className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] ${
          align === 'center' ? 'justify-center' : ''
        } ${dark ? 'text-gold-300' : 'text-gold-700'}`}
      >
        <span aria-hidden="true" className={`h-px w-10 ${dark ? 'bg-gold-400' : 'bg-gold-500'}`} />
        {t(eyebrow)}
      </p>
      <h2 id={id} className={`mt-3 text-3xl font-semibold sm:text-4xl ${dark ? 'text-white' : ''}`}>
        {t(heading)}
      </h2>
      {children}
    </Reveal>
  )
}
