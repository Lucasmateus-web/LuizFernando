"use client"

import { useLanguage } from "../hooks/use-language"
import { ArrowDown, Menu, X } from "lucide-react"
import Image from "next/image"

import { cn } from "@/shared/lib/utils"

import { navigationLinks } from "@/shared/config/navigation"
import { useSiteNavigation } from "../hooks/use-site-navigation"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const { t } = useLanguage()
  const { isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, activeHref, setActiveHref } =
    useSiteNavigation()

  return (
    <header data-scrolled={isScrolled} className="original-header fixed inset-x-0 top-0 z-50">
      <div className="header-container mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <div
          className={cn(
            "glass-header-shell flex items-center justify-between transition-all duration-300",
            isScrolled
              ? "rounded-[1.75rem] border border-white/10 bg-black/70 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-xl"
              : "px-1 py-2",
          )}
        >
          <a href="#" className="relative z-10 flex items-center">
            <Image
              src="/logo.png"
              alt="LF Treinamentos"
              width={400}
              height={120}
              className={cn(
                "w-auto object-contain transition-all duration-300",
                isScrolled ? "h-12 sm:h-14 md:h-16" : "h-14 sm:h-16 md:h-20",
              )}
            />
          </a>

          <nav className="glass-desktop-nav hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) => {
              const isActive = activeHref === link.href

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "glass-nav-link group relative py-2 text-[15px] font-medium tracking-tight transition-colors duration-300",
                    isActive ? "text-white" : "text-white/68 hover:text-white",
                  )}
                >
                  <span className="relative z-10">{t(link.label)}</span>
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#F77F00] transition-all duration-300",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-[#F77F00] via-[#C1121F] to-transparent transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/[0.04] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              )
            })}

            <a
              href="#contato"
              className="glass-action glass-action-brand group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C1121F] via-[#D62828] to-[#F77F00] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(193,18,31,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(247,127,0,0.18)]"
            >
              <span>{t("Contato")} </span>
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </nav>

          <div className="header-actions">
            <LanguageSwitcher />
            <button
              className={cn(
                "glass-icon-button inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white transition-all duration-300 lg:hidden",
                isScrolled
                  ? "border border-white/10 bg-white/[0.05] hover:border-white/20 hover:bg-white/[0.1]"
                  : "border border-white/8 bg-black/20 backdrop-blur-md hover:bg-black/35",
              )}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={t(isMobileMenuOpen ? "Fechar menu" : "Abrir menu")}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          inert={!isMobileMenuOpen}
          className={cn(
            "original-mobile-navigation overflow-hidden transition-all duration-300 lg:hidden",
            isMobileMenuOpen
              ? "pointer-events-auto mt-3 max-h-[24rem] opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          )}
        >
          <div className="glass-mobile-panel rounded-[1.75rem] border border-white/10 bg-black/82 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <nav className="flex flex-col gap-1">
              {navigationLinks.map((link) => {
                const isActive = activeHref === link.href

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-white/[0.08] text-white"
                        : "text-white/72 hover:bg-white/[0.05] hover:text-white",
                    )}
                    onClick={() => {
                      setActiveHref(link.href)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {t(link.label)}
                  </a>
                )
              })}

              <a
                href="#contato"
                className="glass-action glass-action-brand mt-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#C1121F] via-[#D62828] to-[#F77F00] px-5 py-4 text-sm font-semibold text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{t("Contato")} </span>
                <ArrowDown className="h-4 w-4" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
