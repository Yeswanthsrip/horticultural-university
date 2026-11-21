'use client'

import { showPlaceholderLabels, ui } from '@/data/site'
import { useSite } from './SiteProviders'

/** Small visible tag marking content that should be replaced before launch. */
export function PlaceholderTag({ show = true, className = 'left-3 top-3' }: { show?: boolean; className?: string }) {
  const { t } = useSite()
  if (!show || !showPlaceholderLabels) return null
  return (
    <span
      className={`pointer-events-none absolute z-10 rounded-sm bg-white/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-earth-700 shadow-sm ring-1 ring-earth-500/30 ${className}`}
    >
      {t(ui.placeholder)}
    </span>
  )
}
