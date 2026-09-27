"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { languages, translations, type Locale } from "../data/translations"

const LanguageContext = createContext<{
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (text: string) => string
}>({
  locale: "pt" as Locale,
  setLocale: () => {},
  t: (text: string) => text,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt")
  useEffect(() => {
    try {
      const saved = localStorage.getItem("constrein-language")
      if (languages.some((language) => language.code === saved)) {
        // Restore after hydration so server and first client render agree.
        const frame = requestAnimationFrame(() => setLocaleState(saved as Locale))
        return () => cancelAnimationFrame(frame)
      }
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }, [])
  const setLocale = useCallback((value: Locale) => {
    setLocaleState(value)
    try {
      localStorage.setItem("constrein-language", value)
    } catch {
      /* Session-only preference. */
    }
  }, [])
  useEffect(() => {
    document.documentElement.lang = languages.find((language) => language.code === locale)!.lang
  }, [locale])
  const t = useCallback(
    (text: string) => {
      const key = text.replace(/\s+/g, " ").trim()
      return locale === "pt" ? key : (translations[key]?.[{ en: 0, es: 1, zh: 2 }[locale]] ?? key)
    },
    [locale],
  )
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
