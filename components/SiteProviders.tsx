'use client'

import { MotionConfig } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Lang, Localized } from '@/data/site'

/* Text-size steps applied to the root font size; every rem-based size scales. */
const TEXT_STEPS = [87.5, 100, 112.5, 125] as const
const DEFAULT_STEP = 1

type SiteContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Pick the right language from a { en, te } object. */
  t: (value: Localized) => string
  textStep: number
  canDecrease: boolean
  canIncrease: boolean
  decreaseText: () => void
  increaseText: () => void
  resetText: () => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProviders({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [textStep, setTextStep] = useState(DEFAULT_STEP)

  // Restore saved preferences after hydration.
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('ysrhu-lang')
      if (savedLang === 'en' || savedLang === 'te') setLangState(savedLang)
      const savedStep = Number(localStorage.getItem('ysrhu-text-step'))
      if (Number.isInteger(savedStep) && savedStep >= 0 && savedStep < TEXT_STEPS.length) setTextStep(savedStep)
    } catch {
      /* storage unavailable — keep defaults */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('ysrhu-lang', lang)
    } catch {}
  }, [lang])

  useEffect(() => {
    document.documentElement.style.fontSize = `${TEXT_STEPS[textStep]}%`
    try {
      localStorage.setItem('ysrhu-text-step', String(textStep))
    } catch {}
  }, [textStep])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const t = useCallback((value: Localized) => value[lang] ?? value.en, [lang])

  const value = useMemo<SiteContextValue>(
    () => ({
      lang,
      setLang,
      t,
      textStep,
      canDecrease: textStep > 0,
      canIncrease: textStep < TEXT_STEPS.length - 1,
      decreaseText: () => setTextStep((s) => Math.max(0, s - 1)),
      increaseText: () => setTextStep((s) => Math.min(TEXT_STEPS.length - 1, s + 1)),
      resetText: () => setTextStep(DEFAULT_STEP),
    }),
    [lang, setLang, t, textStep],
  )

  return (
    <SiteContext.Provider value={value}>
      {/* Honour the visitor's "reduce motion" OS setting for every animation. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteProviders>')
  return ctx
}
