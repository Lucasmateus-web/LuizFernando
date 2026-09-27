"use client"

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react"
import { Check, ChevronDown, Globe2 } from "lucide-react"
import { languages, type Locale } from "../data/translations"
import { useLanguage } from "../hooks/use-language"

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const firstFocus = useRef(0)
  const menuId = useId()
  const current = languages.find((language) => language.code === locale)!

  useEffect(() => {
    if (!isOpen) return
    root.current
      ?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')
      [firstFocus.current]?.focus()
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener("pointerdown", dismiss)
    return () => document.removeEventListener("pointerdown", dismiss)
  }, [isOpen])

  const open = (index = languages.findIndex((language) => language.code === locale)) => {
    firstFocus.current = index
    setIsOpen(true)
  }
  const select = (code: Locale) => {
    setLocale(code)
    setIsOpen(false)
    trigger.current?.focus()
  }
  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const options = Array.from(
      root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [],
    )
    const index = options.findIndex((option) => option === document.activeElement)
    if (event.key === "Escape") {
      event.preventDefault()
      event.stopPropagation()
      setIsOpen(false)
      trigger.current?.focus()
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault()
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? options.length - 1
            : (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length
      options[next]?.focus()
    }
  }

  return (
    <div
      className="language-switcher"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language-trigger"
        aria-label={`${t("Idioma")}: ${current.label}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        data-locale={locale}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault()
            open(event.key === "ArrowDown" ? 0 : languages.length - 1)
          }
        }}
      >
        <Globe2 size={17} aria-hidden="true" />
        <span lang={current.lang}>{current.short}</span>
        <ChevronDown className="language-chevron" size={13} aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={t("Idioma")}
          className="language-menu"
          onKeyDown={onMenuKeyDown}
        >
          <p className="language-menu-title" aria-hidden="true">
            {t("Idioma")}
          </p>
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              role="menuitemradio"
              aria-checked={locale === language.code}
              tabIndex={-1}
              data-locale={language.code}
              className="language-option"
              onClick={() => select(language.code)}
            >
              <span className="language-code" aria-hidden="true">
                {language.short}
              </span>
              <span lang={language.lang}>{language.label}</span>
              {locale === language.code && <Check size={16} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
