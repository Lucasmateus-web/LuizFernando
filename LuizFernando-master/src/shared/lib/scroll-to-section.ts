let cancelCurrent: (() => void) | undefined

export function cancelSectionScroll() {
  cancelCurrent?.()
}

/** Animate section navigation without changing wheel or touch scrolling. */
export function scrollToSection(id: string) {
  cancelSectionScroll()
  const target = id ? document.getElementById(id) : null
  if (id && !target) return
  const start = window.scrollY
  const margin = target ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0
  const top = target ? target.getBoundingClientRect().top + start - margin : 0
  const end = Math.max(0, Math.min(top, document.documentElement.scrollHeight - innerHeight))
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: end, behavior: "instant" })
    return
  }
  const duration = Math.min(950, Math.max(450, Math.abs(end - start) * 0.25))
  let frame = 0
  let began: number | undefined
  const cleanup = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener("wheel", cleanup)
    window.removeEventListener("touchstart", cleanup)
    window.removeEventListener("keydown", onKey)
    cancelCurrent = undefined
  }
  const onKey = (event: KeyboardEvent) => {
    if (
      ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape"].includes(
        event.key,
      )
    )
      cleanup()
  }
  const step = (time: number) => {
    began ??= time
    const progress = Math.min((time - began) / duration, 1)
    const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
    window.scrollTo({ top: start + (end - start) * eased, behavior: "instant" })
    if (progress < 1) frame = requestAnimationFrame(step)
    else cleanup()
  }
  cancelCurrent = cleanup
  window.addEventListener("wheel", cleanup, { passive: true })
  window.addEventListener("touchstart", cleanup, { passive: true })
  window.addEventListener("keydown", onKey)
  frame = requestAnimationFrame(step)
}
