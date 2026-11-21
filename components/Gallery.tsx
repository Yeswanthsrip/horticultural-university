'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { gallery, ui } from '@/data/site'
import { PlaceholderTag } from './PlaceholderTag'
import { RevealItem } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useSite } from './SiteProviders'

/* Bento-style spans tuned for 8 images: fills a 4×3 grid on desktop and a
   2-column grid on mobile with no gaps (cycled if more images are added). */
const SPANS = ['col-span-2 row-span-2', '', '', 'md:row-span-2', '', '', '', 'col-span-2 md:col-span-1']

export function Gallery() {
  const { t } = useSite()
  const [open, setOpen] = useState<number | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])

  const openRef = useRef<number | null>(null)
  openRef.current = open

  // Close and return keyboard focus to the thumbnail that opened the lightbox.
  const close = useCallback(() => {
    const current = openRef.current
    setOpen(null)
    if (current !== null) requestAnimationFrame(() => triggerRefs.current[current]?.focus())
  }, [])

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-leaf-50 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="gallery-heading" eyebrow={gallery.eyebrow} heading={gallery.heading} />
          <a href={gallery.viewAllHref} className="text-sm font-semibold text-leaf-700 hover:text-forest-800">
            {t(ui.viewAll)}
          </a>
        </div>

        <ul className="mt-12 grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:gap-4">
          {gallery.images.map((img, i) => (
            <RevealItem key={img.src + i} delay={(i % 4) * 0.06} className={`${SPANS[i % SPANS.length]} relative`}>
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current[i] = el
                }}
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                className="group relative block size-full overflow-hidden rounded-xl bg-leaf-100"
              >
                <Image
                  src={img.src}
                  alt={t(img.alt)}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-950/75 via-forest-950/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex w-full items-center justify-between gap-2 text-left text-sm font-medium text-white">
                    {t(img.alt)}
                    <Expand aria-hidden="true" className="size-4 shrink-0" />
                  </span>
                </span>
                <span className="sr-only">{t(ui.openImage)}</span>
              </button>
              <PlaceholderTag show={img.placeholder} className="left-2 top-2" />
            </RevealItem>
          ))}
        </ul>
      </div>

      <Lightbox index={open} onClose={close} onChange={setOpen} />
    </section>
  )
}

function Lightbox({ index, onClose, onChange }: { index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const { t } = useSite()
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const count = gallery.images.length
  const isOpen = index !== null

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      onChange((index + dir + count) % count)
    },
    [index, count, onChange],
  )

  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button')
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
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, go])

  const img = index !== null ? gallery.images[index] : null
  const btn = 'grid size-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25'

  return (
    <AnimatePresence>
      {img && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t(img.alt)}
          className="fixed inset-0 z-[90] flex flex-col bg-forest-950/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white/80 sm:px-6">
            <span className="font-display text-sm tabular-nums">
              {index + 1} / {count}
            </span>
            <button ref={closeRef} type="button" onClick={onClose} className={btn}>
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">{t(ui.close)}</span>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 sm:px-20" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[70vh] w-full max-w-5xl"
              >
                <Image src={img.src} alt={t(img.alt)} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-contain" />
                <PlaceholderTag show={img.placeholder} className="left-2 top-2" />
                <figcaption className="absolute -bottom-10 inset-x-0 text-center text-sm text-white/85">{t(img.alt)}</figcaption>
              </motion.figure>
            </AnimatePresence>

            <button type="button" onClick={() => go(-1)} className={`${btn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-6`}>
              <ChevronLeft aria-hidden="true" className="size-6" />
              <span className="sr-only">{t(ui.previous)}</span>
            </button>
            <button type="button" onClick={() => go(1)} className={`${btn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-6`}>
              <ChevronRight aria-hidden="true" className="size-6" />
              <span className="sr-only">{t(ui.next)}</span>
            </button>
          </div>
          <div className="h-16" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
