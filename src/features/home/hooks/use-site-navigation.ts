"use client"

import { useCallback, useEffect, useState } from "react"
import { navigationLinks } from "@/shared/config/navigation"
import { useOverlayEffects } from "@/shared/hooks/use-overlay-effects"

export function useSiteNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState("#")

  useEffect(() => {
    const syncHeaderState = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 24)

      let currentHref = "#"

      for (const link of navigationLinks) {
        if (link.href === "#" || !link.href.startsWith("#")) continue

        const section = document.querySelector<HTMLElement>(link.href)
        if (!section) continue

        const sectionTop = section.offsetTop - 140
        if (scrollY >= sectionTop) {
          currentHref = link.href
        }
      }

      if (scrollY < 120) currentHref = "#"
      setActiveHref(currentHref)
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    const initialFrame = window.requestAnimationFrame(syncHeaderState)
    window.addEventListener("scroll", syncHeaderState, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      window.cancelAnimationFrame(initialFrame)
      window.removeEventListener("scroll", syncHeaderState)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), [])
  useOverlayEffects(isMobileMenuOpen, closeMenu)

  return { isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, activeHref, setActiveHref }
}
