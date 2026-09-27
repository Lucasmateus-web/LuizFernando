"use client"

import { useEffect, useState, useRef } from "react"
import { roles, backgroundVideos } from "../data/hero"
import { useLanguage } from "./use-language"
import { scrollToSection } from "@/shared/lib/scroll-to-section"

export function useHero() {
  const { t, locale } = useLanguage()
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const [activePlayer, setActivePlayer] = useState<"A" | "B">("A")
  const [indexA, setIndexA] = useState(0)
  const [indexB, setIndexB] = useState(1)
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current)
    },
    [],
  )

  useEffect(() => {
    if (activePlayer === "A") {
      videoARef.current?.play().catch(() => {})
    } else {
      videoBRef.current?.play().catch(() => {})
    }
  }, [activePlayer])

  const handleEndedA = () => {
    setActivePlayer("B")
    if (transitionTimer.current) clearTimeout(transitionTimer.current)
    transitionTimer.current = setTimeout(() => {
      setIndexA(() => (indexB + 1) % backgroundVideos.length)
    }, 1000)
  }

  const handleEndedB = () => {
    setActivePlayer("A")
    if (transitionTimer.current) clearTimeout(transitionTimer.current)
    transitionTimer.current = setTimeout(() => {
      setIndexB(() => (indexA + 1) % backgroundVideos.length)
    }, 1000)
  }

  useEffect(() => {
    const role = t(roles[currentRole])
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1))
          } else {
            setIsDeleting(true)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : displayText === role ? 2100 : 100,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, t])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDisplayText("")
      setIsDeleting(false)
    })
    return () => cancelAnimationFrame(frame)
  }, [locale])

  return {
    displayText,
    activePlayer,
    indexA,
    indexB,
    videoARef,
    videoBRef,
    handleEndedA,
    handleEndedB,
    scrollToSection,
  }
}
