"use client"

import { useEffect } from "react"
import { cancelSectionScroll, scrollToSection } from "@/shared/lib/scroll-to-section"

export function ScrollEffects() {
  useEffect(() => {
    const navigate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor || anchor.target === "_blank") return
      const hash = anchor.getAttribute("href")!
      const id = hash.slice(1)
      if (id && !document.getElementById(id)) return
      event.preventDefault()
      if (location.hash !== hash)
        history.pushState(null, "", id ? hash : location.pathname + location.search)
      scrollToSection(id)
    }
    document.addEventListener("click", navigate)
    return () => {
      document.removeEventListener("click", navigate)
      cancelSectionScroll()
    }
  }, [])
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"))
    const pending = new Map<HTMLElement, number>()
    const targets = new Map<HTMLElement, number>()
    let frame = 0
    let lastTime = 0
    const update = (time: number) => {
      frame = 0
      const delta = lastTime ? Math.min(50, time - lastTime) : 16
      lastTime = time
      let settling = false
      const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 4
      // Read geometry first, then write styles, to avoid repeated layout work.
      const positions = Array.from(pending, ([element, previous]) => {
        const transform = getComputedStyle(element).transform
        const shift = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42
        return { element, previous, top: element.getBoundingClientRect().top - shift }
      })
      for (const { element, previous, top } of positions) {
        const delay = Math.min(240, Math.max(0, Number(element.dataset.revealDelay) || 0))
        const start = innerHeight * 0.96 - delay * 0.25
        const finish = innerHeight * 0.48
        const focused = element.contains(document.activeElement)
        const target =
          focused || (atBottom && top < innerHeight)
            ? 1
            : Math.max(
                targets.get(element) || 0,
                Math.min(1, Math.max(0, (start - top) / (start - finish))),
              )
        targets.set(element, target)
        // Ease toward the scroll position so wheel jumps still reveal content smoothly.
        const distance = target - previous
        const progress =
          focused || distance < 0.001 ? target : previous + distance * (1 - Math.exp(-delta / 110))
        if (progress < target) settling = true
        if (progress === previous) continue
        element.style.setProperty("--reveal-progress", String(progress))
        element.classList.remove("scroll-pending")
        if (progress >= 1) {
          element.classList.remove("scroll-revealing")
          element.classList.add("scroll-revealed")
          pending.delete(element)
          targets.delete(element)
        } else {
          element.classList.add("scroll-revealing")
          pending.set(element, progress)
        }
      }
      if (settling) frame = requestAnimationFrame(update)
      else lastTime = 0
    }
    const schedule = () => {
      if (!frame && pending.size) frame = requestAnimationFrame(update)
    }
    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      pending.clear()
      targets.clear()
      lastTime = 0
      elements.forEach((element) => {
        element.classList.remove("scroll-pending", "scroll-revealing", "scroll-revealed")
        element.style.removeProperty("--reveal-progress")
      })
    }
    const configure = () => {
      reset()
      if (motion.matches) return
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top >= innerHeight) {
          element.classList.add("scroll-pending")
          pending.set(element, 0)
        }
      })
    }
    configure()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    document.addEventListener("focusin", schedule)
    document.addEventListener("load", schedule, true)
    motion.addEventListener("change", configure)
    return () => {
      reset()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      document.removeEventListener("focusin", schedule)
      document.removeEventListener("load", schedule, true)
      motion.removeEventListener("change", configure)
    }
  }, [])
  return null
}
