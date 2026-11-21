'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { navigation, notifications, quickLinks, ui, type Localized } from '@/data/site'
import { useSite } from './SiteProviders'

type Entry = { label: Localized; group: Localized; href: string }

/* Everything searchable is derived from the site data file. */
function buildIndex(): Entry[] {
  const entries: Entry[] = []
  for (const item of navigation) {
    entries.push({ label: item.label, group: { en: 'Menu', te: 'మెనూ' }, href: item.href })
    for (const child of item.children ?? []) entries.push({ label: child.label, group: item.label, href: child.href })
  }
  for (const n of notifications.items) entries.push({ label: n.title, group: notifications.heading, href: n.href })
  for (const q of quickLinks.items) entries.push({ label: q.label, group: quickLinks.heading, href: q.href })
  // De-duplicate identical labels pointing to the same place
  const seen = new Set<string>()
  return entries.filter((e) => {
    const key = `${e.label.en}|${e.href}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useSite()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const index = useMemo(buildIndex, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return index.filter((e) => e.label.en.toLowerCase().includes(q) || e.label.te.includes(q)).slice(0, 8)
  }, [query, index])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const timer = setTimeout(() => inputRef.current?.focus(), 30)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // simple focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('input, a[href], button')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-forest-950/60 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-forest-900/10"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id={titleId} className="sr-only">
              {t(ui.search)}
            </h2>
            <div className="flex items-center gap-3 border-b border-forest-900/10 px-4">
              <Search aria-hidden="true" className="size-5 shrink-0 text-forest-700" />
              <label htmlFor="site-search" className="sr-only">
                {t(ui.search)}
              </label>
              <input
                ref={inputRef}
                id="site-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(ui.searchPlaceholder)}
                className="h-14 w-full bg-transparent text-base text-ink placeholder:text-ink-soft focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="grid size-9 shrink-0 place-items-center rounded-md text-ink-soft hover:bg-leaf-50 hover:text-forest-900"
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">{t(ui.close)}</span>
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2" aria-live="polite">
              {query.trim() === '' ? (
                <p className="px-3 py-6 text-center text-sm text-ink-soft">{t(ui.searchHint)}</p>
              ) : results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-ink-soft">{t(ui.searchEmpty)}</p>
              ) : (
                <ul>
                  {results.map((r) => (
                    <li key={`${r.label.en}-${r.href}-${r.group.en}`}>
                      <a
                        href={r.href}
                        onClick={onClose}
                        className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-leaf-50 focus-visible:bg-leaf-50"
                      >
                        <span>
                          <span className="block text-[0.95rem] font-medium text-forest-900">{t(r.label)}</span>
                          <span className="block text-xs text-ink-soft">{t(r.group)}</span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-leaf-700 transition-transform group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
