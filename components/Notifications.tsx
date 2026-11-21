'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Bell } from 'lucide-react'
import { useRef, useState } from 'react'
import { notifications, notificationTabs, ui, type NotificationCategory } from '@/data/site'
import { useSite } from './SiteProviders'

function formatDate(iso: string, lang: 'en' | 'te') {
  const d = new Date(`${iso}T00:00:00`)
  return {
    day: d.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', { month: 'short' }),
    full: d.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

export function Notifications() {
  const { t, lang } = useSite()
  const [active, setActive] = useState<NotificationCategory>(notificationTabs[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const items = notifications.items
    .filter((n) => n.category === active)
    .sort((a, b) => b.date.localeCompare(a.date))

  // WAI-ARIA tabs: arrow keys move between tabs
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let next = -1
    if (e.key === 'ArrowRight') next = (i + 1) % notificationTabs.length
    if (e.key === 'ArrowLeft') next = (i - 1 + notificationTabs.length) % notificationTabs.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = notificationTabs.length - 1
    if (next >= 0) {
      e.preventDefault()
      setActive(notificationTabs[next].id)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-28px_rgb(10_36_24/0.45)] ring-1 ring-forest-900/10">
      <div className="flex items-center justify-between gap-4 border-b border-forest-900/10 px-5 pt-5 sm:px-7">
        <h2 id="notifications-heading" className="flex items-center gap-2.5 pb-4 text-xl font-semibold sm:text-2xl">
          <span className="relative grid size-9 place-items-center rounded-full bg-gold-100 text-gold-700">
            <Bell aria-hidden="true" className="size-4.5" />
            <span aria-hidden="true" className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-600 ring-2 ring-gold-100" />
          </span>
          {t(notifications.heading)}
        </h2>
        <a
          href={notifications.viewAllHref}
          className="group mb-4 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-leaf-700 hover:text-forest-800"
        >
          {t(ui.viewAll)}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div
        role="tablist"
        aria-labelledby="notifications-heading"
        className="scrollbar-none flex gap-1 overflow-x-auto border-b border-forest-900/10 px-3 sm:px-5"
      >
        {notificationTabs.map((tab, i) => {
          const selected = tab.id === active
          const newCount = notifications.items.filter((n) => n.category === tab.id && n.isNew).length
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`relative flex shrink-0 items-center gap-2 px-3 py-3.5 font-display text-[0.92rem] font-medium transition-colors ${
                selected ? 'text-forest-900' : 'text-ink-soft hover:text-forest-800'
              }`}
            >
              {t(tab.label)}
              {newCount > 0 && (
                <span className="grid min-w-5 place-items-center rounded-full bg-leaf-100 px-1.5 text-[0.7rem] font-bold text-leaf-700">
                  {newCount}
                </span>
              )}
              {selected && (
                <motion.span
                  layoutId="notif-tab-underline"
                  className="absolute inset-x-2 -bottom-px h-[3px] rounded-t-full bg-gold-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="flex-1 px-2 py-2 sm:px-4"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="divide-y divide-forest-900/[0.07]"
          >
            {items.map((n) => {
              const d = formatDate(n.date, lang)
              return (
                <li key={`${n.category}-${n.title.en}`}>
                  <a
                    href={n.href}
                    className="group flex items-start gap-4 rounded-lg px-3 py-4 transition-colors hover:bg-leaf-50"
                  >
                    <time
                      dateTime={n.date}
                      aria-label={d.full}
                      className="flex w-14 shrink-0 flex-col items-center rounded-md border border-forest-900/10 bg-cream py-1.5 text-center leading-none"
                    >
                      <span className="font-display text-lg font-semibold text-forest-800">{d.day}</span>
                      <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-wider text-earth-700">{d.month}</span>
                    </time>
                    <span className="min-w-0 flex-1">
                      <span className="font-medium leading-snug text-ink transition-colors group-hover:text-forest-800">
                        {t(n.title)}
                      </span>
                      {n.isNew && (
                        <span className="ml-2 inline-flex translate-y-[-1px] items-center gap-1 rounded-sm bg-red-700 px-1.5 py-0.5 align-middle text-[0.65rem] font-bold uppercase tracking-wider text-white">
                          <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-white" />
                          {t(ui.newBadge)}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-ink-soft/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-leaf-700"
                    />
                  </a>
                </li>
              )
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  )
}
