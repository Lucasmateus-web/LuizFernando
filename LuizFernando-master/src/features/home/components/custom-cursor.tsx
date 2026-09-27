"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    const media = matchMedia("(hover: hover) and (pointer: fine) and (forced-colors: none)")
    const root = document.documentElement
    let frame = 0
    let x = 0
    let y = 0
    const hide = () => {
      cancelAnimationFrame(frame)
      frame = 0
      root.classList.remove("custom-cursor-active")
      cursor.classList.remove("is-visible", "is-pressed")
    }
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      if (
        !media.matches ||
        event.pointerType !== "mouse" ||
        target?.closest('input, textarea, select, [contenteditable="true"], iframe')
      ) {
        hide()
        return
      }
      x = event.clientX
      y = event.clientY
      cursor.classList.toggle(
        "is-interactive",
        !!target?.closest('a[href], button:not(:disabled), [role="button"], summary'),
      )
      if (!frame)
        frame = requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
          cursor.classList.add("is-visible")
          root.classList.add("custom-cursor-active")
          frame = 0
        })
    }
    const press = () => cursor.classList.add("is-pressed")
    const release = () => cursor.classList.remove("is-pressed")
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Tab") hide()
    }
    document.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerover", move, { passive: true })
    document.addEventListener("pointerdown", press)
    document.addEventListener("pointerup", release)
    document.documentElement.addEventListener("pointerleave", hide)
    document.addEventListener("keydown", keyboard)
    window.addEventListener("blur", hide)
    media.addEventListener("change", hide)
    return () => {
      hide()
      document.removeEventListener("pointermove", move)
      document.removeEventListener("pointerover", move)
      document.removeEventListener("pointerdown", press)
      document.removeEventListener("pointerup", release)
      document.documentElement.removeEventListener("pointerleave", hide)
      document.removeEventListener("keydown", keyboard)
      window.removeEventListener("blur", hide)
      media.removeEventListener("change", hide)
    }
  }, [])
  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="cursor-flame">
        <svg viewBox="0 0 32 40" fill="none" focusable="false" aria-hidden="true">
          <path
            className="cursor-flame-outer"
            fill="#e43d16"
            d="M16 2C18 11 27 12 25 22C28 20 28 16 28 16C36 31 26 39 16 39C5 39-2 30 3 20C5 16 8 14 8 10C13 13 12 18 12 18C18 14 11 8 16 2Z"
          />
          <path
            className="cursor-flame-middle"
            fill="#ff8a00"
            d="M17 12C23 20 19 23 24 21C28 29 24 36 16 37C8 37 5 31 8 24C9 22 11 20 11 18C15 22 13 26 13 26C19 23 15 17 17 12Z"
          />
          <path
            className="cursor-flame-core"
            fill="#ffe69a"
            d="M17 24C18 29 22 30 20 34C18 38 11 36 12 32C12 29 15 28 17 24Z"
          />
        </svg>
      </span>
    </div>
  )
}
