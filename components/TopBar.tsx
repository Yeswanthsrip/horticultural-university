'use client'

import { Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { ui, university } from '@/data/site'
import { SearchDialog } from './SearchDialog'
import { useSite } from './SiteProviders'

/** Government strip: language toggle, text-size controls and search. */
export function TopBar() {
  const { t, lang, setLang, canDecrease, canIncrease, decreaseText, increaseText, resetText, textStep } = useSite()
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  // Ctrl/⌘+K or "/" opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const sizeBtn =
    'grid h-7 min-w-7 place-items-center rounded px-1.5 font-semibold transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div className="bg-forest-950 text-[0.8rem] text-white/90">
      <div className="container-page flex h-10 items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-2">
          {/* Tricolour accent */}
          <span aria-hidden="true" className="flex h-3 w-4 shrink-0 flex-col overflow-hidden rounded-[1px]">
            <span className="flex-1 bg-[#ff9933]" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-[#138808]" />
          </span>
          <span className="truncate font-medium">{t(university.government)}</span>
        </p>

        <div className="flex items-center gap-1 sm:gap-3">
          {/* Text size */}
          <div role="group" aria-label={t(ui.textSize)} className="hidden items-center gap-0.5 sm:flex">
            <span className="mr-1 hidden text-white/70 md:inline">{t(ui.textSize)}:</span>
            <button type="button" className={sizeBtn} onClick={decreaseText} disabled={!canDecrease} aria-label={t(ui.decreaseText)}>
              A<span aria-hidden="true">−</span>
            </button>
            <button type="button" className={sizeBtn} onClick={resetText} aria-label={t(ui.resetText)} aria-pressed={textStep === 1}>
              A
            </button>
            <button type="button" className={sizeBtn} onClick={increaseText} disabled={!canIncrease} aria-label={t(ui.increaseText)}>
              A<span aria-hidden="true">+</span>
            </button>
          </div>

          <span aria-hidden="true" className="hidden h-4 w-px bg-white/20 sm:block" />

          {/* Language toggle */}
          <div role="group" aria-label={t(ui.language)} className="flex items-center rounded-full bg-white/10 p-0.5">
            {(
              [
                ['en', 'English'],
                ['te', 'తెలుగు'],
              ] as const
            ).map(([code, label]) => (
              <button
                key={code}
                type="button"
                lang={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                  lang === code ? 'bg-gold-400 text-forest-950' : 'text-white/85 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <span aria-hidden="true" className="hidden h-4 w-px bg-white/20 sm:block" />

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-haspopup="dialog"
            className="flex h-7 items-center gap-1.5 rounded px-2 transition-colors hover:bg-white/15"
          >
            <Search aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">{t(ui.search)}</span>
            <span className="sr-only sm:hidden">{t(ui.search)}</span>
          </button>
        </div>
      </div>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </div>
  )
}
