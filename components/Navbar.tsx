'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { navigation, ui, university, type NavItem } from '@/data/site'
import { Logo } from './Logo'
import { useSite } from './SiteProviders'

export function Navbar() {
  const { t } = useSite()
  const [stuck, setStuck] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Detect when the bar is stuck to the top (adds shadow + compact emblem).
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Close dropdowns on outside click / Escape.
  useEffect(() => {
    if (openIndex === null) return
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIndex(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${openIndex}"]`)
        setOpenIndex(null)
        trigger?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [openIndex])

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />
      <header
        ref={navRef}
        className={`sticky top-0 z-50 border-b transition-shadow duration-300 ${
          stuck ? 'border-forest-900/10 bg-white/95 shadow-[0_6px_24px_-12px_rgb(10_36_24/0.35)] backdrop-blur' : 'border-transparent bg-white lg:bg-forest-900'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          {/* Mobile / tablet brand */}
          <a href="#top" className="flex min-w-0 items-center gap-3 lg:hidden">
            <Logo className="size-11 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate font-display text-[0.95rem] font-semibold leading-tight text-forest-900">
                {t(university.name)}
              </span>
              <span className="block truncate text-xs text-ink-soft">{t(university.state)}</span>
            </span>
          </a>

          {/* Desktop menu */}
          <nav aria-label="Main" className="hidden w-full items-center lg:flex">
            <AnimatePresence initial={false}>
              {stuck && (
                <motion.a
                  key="emblem"
                  href="#top"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mr-3 flex shrink-0 items-center overflow-hidden"
                >
                  <Logo className="size-10" />
                  <span className="sr-only">{t(university.name)}</span>
                </motion.a>
              )}
            </AnimatePresence>
            <ul className="flex w-full items-center justify-between">
              {navigation.map((item, i) => (
                <DesktopItem
                  key={item.label.en}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onOpenChange={(o) => setOpenIndex(o ? i : null)}
                  dark={!stuck}
                />
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-menu"
            className="grid size-11 shrink-0 place-items-center rounded-lg bg-forest-900 text-white lg:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
            <span className="sr-only">{t(ui.menu)}</span>
          </button>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </>
  )
}

function DesktopItem({
  item,
  index,
  open,
  onOpenChange,
  dark,
}: {
  item: NavItem
  index: number
  open: boolean
  onOpenChange: (open: boolean) => void
  dark: boolean
}) {
  const { t } = useSite()
  const panelId = `menu-panel-${index}`
  const base = `relative flex h-16 items-center gap-1 whitespace-nowrap px-1.5 xl:px-3 font-display text-[0.875rem] xl:text-[0.92rem] font-medium transition-colors ${
    dark ? 'text-white/90 hover:text-gold-300' : 'text-forest-900 hover:text-leaf-700'
  }`
  const underline = (
    <span
      aria-hidden="true"
      className={`absolute inset-x-2 bottom-3 h-0.5 origin-left scale-x-0 rounded-full bg-gold-400 transition-transform duration-300 group-hover:scale-x-100 ${
        open ? 'scale-x-100' : ''
      }`}
    />
  )

  if (!item.children?.length) {
    return (
      <li className="group">
        <a href={item.href} className={base}>
          {t(item.label)}
          {underline}
        </a>
      </li>
    )
  }

  return (
    <li className="group relative" onMouseEnter={() => onOpenChange(true)} onMouseLeave={() => onOpenChange(false)}>
      <button
        type="button"
        data-menu-trigger={index}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            onOpenChange(true)
            requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>(`#${panelId} a`)?.focus())
          }
        }}
        className={base}
      >
        {t(item.label)}
        <ChevronDown aria-hidden="true" className={`size-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        {underline}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-50 w-64 pt-1"
            onBlur={(e) => {
              if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) onOpenChange(false)
            }}
          >
            <ul className="overflow-hidden rounded-lg border-t-2 border-gold-500 bg-white py-2 shadow-xl ring-1 ring-forest-900/10">
              {item.children.map((child) => (
                <li key={child.label.en}>
                  <a
                    href={child.href}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[0.92rem] text-ink transition-colors hover:bg-leaf-50 hover:text-forest-800 focus-visible:bg-leaf-50"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-leaf-500" />
                    {t(child.label)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, canDecrease, canIncrease, decreaseText, increaseText, resetText } = useSite()
  const [expanded, setExpanded] = useState<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const timer = setTimeout(() => panelRef.current?.querySelector<HTMLElement>('button')?.focus(), 50)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        const first = f[0]
        const last = f[f.length - 1]
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

  const sizeBtn =
    'grid h-9 min-w-9 place-items-center rounded-md border border-forest-900/15 px-2 font-semibold text-forest-900 disabled:opacity-40'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-forest-950/50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.menu)}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-forest-900/10 px-4 py-3">
              <span className="font-display font-semibold text-forest-900">{t(ui.menu)}</span>
              <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-lg hover:bg-leaf-50">
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">{t(ui.close)}</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-2">
              <ul>
                {navigation.map((item, i) => (
                  <li key={item.label.en} className="border-b border-forest-900/5 last:border-0">
                    {item.children?.length ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={expanded === i}
                          aria-controls={`m-panel-${i}`}
                          onClick={() => setExpanded(expanded === i ? null : i)}
                          className="flex w-full items-center justify-between px-3 py-3.5 text-left font-display font-medium text-forest-900"
                        >
                          {t(item.label)}
                          <ChevronDown
                            aria-hidden="true"
                            className={`size-4 transition-transform ${expanded === i ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === i && (
                            <motion.ul
                              id={`m-panel-${i}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pb-2"
                            >
                              {item.children.map((child) => (
                                <li key={child.label.en}>
                                  <a
                                    href={child.href}
                                    onClick={onClose}
                                    className="block rounded-md py-2.5 pl-6 pr-3 text-[0.95rem] text-ink-soft hover:bg-leaf-50 hover:text-forest-900"
                                  >
                                    {t(child.label)}
                                  </a>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a href={item.href} onClick={onClose} className="block px-3 py-3.5 font-display font-medium text-forest-900">
                        {t(item.label)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div role="group" aria-label={t(ui.textSize)} className="flex items-center gap-2 border-t border-forest-900/10 px-5 py-4">
              <span className="mr-auto text-sm text-ink-soft">{t(ui.textSize)}</span>
              <button type="button" className={sizeBtn} onClick={decreaseText} disabled={!canDecrease} aria-label={t(ui.decreaseText)}>
                A−
              </button>
              <button type="button" className={sizeBtn} onClick={resetText} aria-label={t(ui.resetText)}>
                A
              </button>
              <button type="button" className={sizeBtn} onClick={increaseText} disabled={!canIncrease} aria-label={t(ui.increaseText)}>
                A+
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
