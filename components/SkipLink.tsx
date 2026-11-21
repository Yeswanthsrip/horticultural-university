'use client'

import { ui } from '@/data/site'
import { useSite } from './SiteProviders'

export function SkipLink() {
  const { t } = useSite()
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-forest-950"
    >
      {t(ui.skipToContent)}
    </a>
  )
}
