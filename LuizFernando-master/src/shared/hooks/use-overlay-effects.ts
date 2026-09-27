"use client"

import { useEffect } from "react"

/** Shared lifecycle for dismissible overlays: Escape and background scroll lock. */
export function useOverlayEffects(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen, onClose])
}
