"use client"

import { useLanguage } from "../hooks/use-language"
import { useEffect, useState } from "react"

import { cn } from "@/shared/lib/utils"

const logoLetters = [
  { text: "C", x: 58, y: 222, fill: "url(#welcome-logo-metal)", enterDelay: 120, exitDelay: 1020 },
  { text: "N", x: 246, y: 222, fill: "url(#welcome-logo-metal)", enterDelay: 300, exitDelay: 900 },
  { text: "S", x: 354, y: 222, fill: "url(#welcome-logo-metal)", enterDelay: 390, exitDelay: 810 },
  {
    text: ".",
    x: 462,
    y: 222,
    fill: "url(#welcome-logo-metal-dark)",
    enterDelay: 480,
    exitDelay: 720,
  },
  { text: "T", x: 512, y: 222, fill: "url(#welcome-logo-fire)", enterDelay: 570, exitDelay: 630 },
  { text: "R", x: 598, y: 222, fill: "url(#welcome-logo-fire)", enterDelay: 660, exitDelay: 540 },
  { text: "E", x: 704, y: 222, fill: "url(#welcome-logo-fire)", enterDelay: 750, exitDelay: 450 },
  { text: "N", x: 826, y: 222, fill: "url(#welcome-logo-fire)", enterDelay: 980, exitDelay: 270 },
]

export function WelcomeScreen() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const exitTimer = window.setTimeout(() => setIsLeaving(true), 3800)
    const hideTimer = window.setTimeout(() => setIsVisible(false), 7000)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(hideTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <section
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505] px-4 transition-[opacity,transform,filter] duration-[2800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform,filter]",
        isLeaving
          ? "pointer-events-none scale-[1.045] opacity-0 blur-md"
          : "scale-100 opacity-100 blur-0",
      )}
      aria-label={t("Tela de boas-vindas")}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="welcome-orb absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C1121F]/14 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F77F00]/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.34)_58%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-5xl flex-col items-center text-center transition-[opacity,transform,filter] duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          isLeaving
            ? "-translate-y-3 scale-[0.98] opacity-0 blur-sm"
            : "translate-y-0 scale-100 opacity-100 blur-0",
        )}
      >
        <p className="welcome-title mb-4 text-lg font-semibold uppercase tracking-[0.34em] text-white sm:mb-5 sm:text-2xl md:text-3xl">
          {t("BEM-VINDO À")}{" "}
        </p>

        <div
          className={cn(
            "welcome-logo mx-auto flex w-full justify-center",
            isLeaving && "is-leaving",
          )}
        >
          <svg
            className="welcome-logo-svg h-auto w-[min(41rem,86vw)]"
            viewBox="0 0 980 340"
            role="img"
            aria-labelledby="welcome-logo-title"
          >
            <title id="welcome-logo-title">CONS.TREIN</title>
            <defs>
              <linearGradient id="welcome-logo-metal" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8F9AA3" />
                <stop offset="18%" stopColor="#D5DEE5" />
                <stop offset="38%" stopColor="#3D4850" />
                <stop offset="72%" stopColor="#111B20" />
                <stop offset="100%" stopColor="#02090B" />
              </linearGradient>
              <linearGradient id="welcome-logo-metal-dark" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#59646D" />
                <stop offset="100%" stopColor="#04090B" />
              </linearGradient>
              <linearGradient id="welcome-logo-fire" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FFB20A" />
                <stop offset="28%" stopColor="#FF4D00" />
                <stop offset="70%" stopColor="#C1121F" />
                <stop offset="100%" stopColor="#4E0207" />
              </linearGradient>
              <linearGradient id="welcome-logo-red" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF1E24" />
                <stop offset="55%" stopColor="#C80008" />
                <stop offset="100%" stopColor="#5E0004" />
              </linearGradient>
              <linearGradient id="welcome-logo-cross" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#F7F2E8" />
                <stop offset="45%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#C9D1D4" />
              </linearGradient>
              <linearGradient id="welcome-logo-extinguisher" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF6A69" />
                <stop offset="22%" stopColor="#F51018" />
                <stop offset="72%" stopColor="#B40008" />
                <stop offset="100%" stopColor="#4C0205" />
              </linearGradient>
              <linearGradient id="welcome-logo-highlight" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.54" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <filter id="welcome-logo-depth" x="-12%" y="-20%" width="124%" height="150%">
                <feDropShadow
                  dx="0"
                  dy="5"
                  stdDeviation="2.2"
                  floodColor="#000000"
                  floodOpacity="0.42"
                />
                <feDropShadow
                  dx="0"
                  dy="1"
                  stdDeviation="0.35"
                  floodColor="#FFFFFF"
                  floodOpacity="0.18"
                />
              </filter>
              <filter id="welcome-logo-hot-depth" x="-14%" y="-22%" width="128%" height="160%">
                <feDropShadow
                  dx="0"
                  dy="5"
                  stdDeviation="2.4"
                  floodColor="#000000"
                  floodOpacity="0.44"
                />
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="3"
                  floodColor="#F77F00"
                  floodOpacity="0.2"
                />
              </filter>
              <filter id="welcome-logo-glow" x="-20%" y="-25%" width="140%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0 0 0 0.95 0 0.42 0 0 0.2 0 0 0.08 0 0.02 0 0 0 0.55 0"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="welcome-logo-ambient" aria-hidden="true">
              <path
                className="welcome-logo-light-beam"
                d="M120 78 H860"
                stroke="#F77F00"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0"
              />
            </g>

            <g
              className="welcome-logo-flame"
              style={{ animationDelay: `${isLeaving ? 420 : 760}ms` }}
              filter="url(#welcome-logo-glow)"
            >
              <path
                d="M764 52 C748 76 772 89 746 111 C728 126 736 150 764 154 C796 158 812 138 801 116 C794 100 812 88 790 70 C783 86 765 80 764 52 Z"
                fill="#F77F00"
              />
              <path
                d="M765 88 C755 104 771 113 756 127 C746 137 752 150 768 152 C786 154 796 140 789 127 C783 116 795 109 781 99 C778 110 765 105 765 88 Z"
                fill="#FFB20A"
                opacity="0.95"
              />
            </g>

            <g className="welcome-logo-mark" filter="url(#welcome-logo-depth)">
              <g
                className="welcome-logo-letter"
                style={{ animationDelay: `${isLeaving ? 960 : 210}ms` }}
              >
                <rect
                  x="154"
                  y="104"
                  width="94"
                  height="116"
                  rx="4"
                  fill="url(#welcome-logo-red)"
                />
                <rect
                  x="184"
                  y="126"
                  width="34"
                  height="72"
                  rx="2"
                  fill="url(#welcome-logo-cross)"
                  stroke="#C8D0D5"
                  strokeWidth="1.2"
                />
                <rect
                  x="166"
                  y="145"
                  width="70"
                  height="34"
                  rx="2"
                  fill="url(#welcome-logo-cross)"
                  stroke="#C8D0D5"
                  strokeWidth="1.2"
                />
                <path
                  d="M184 126 H218 V137 H184 Z M166 145 H236 V156 H166 Z"
                  fill="#FFFFFF"
                  opacity="0.34"
                />
                <rect x="158" y="104" width="86" height="5" fill="#FF4B4F" opacity="0.9" />
                <rect x="154" y="214" width="94" height="6" fill="#2A0002" opacity="0.42" />
              </g>

              {logoLetters.map((letter, index) => (
                <text
                  key={`${letter.text}-${index}`}
                  className="welcome-logo-letter welcome-logo-text"
                  x={letter.x}
                  y={letter.y}
                  fill={letter.fill}
                  stroke="#050505"
                  strokeWidth="4"
                  paintOrder="stroke fill"
                  style={{
                    animationDelay: `${isLeaving ? letter.exitDelay : letter.enterDelay}ms`,
                  }}
                >
                  {letter.text}
                </text>
              ))}
            </g>

            <g
              className="welcome-logo-extinguisher"
              style={{ animationDelay: `${isLeaving ? 360 : 860}ms` }}
              filter="url(#welcome-logo-hot-depth)"
            >
              <path
                d="M806 112 C814 88 852 86 866 108 C874 120 873 137 862 150"
                fill="none"
                stroke="#0A1418"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M858 105 C903 96 934 118 944 165 L953 204"
                fill="none"
                stroke="#101A1E"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <path d="M935 200 L974 192 L980 220 L943 228 Z" fill="#050A0D" />
              <rect x="812" y="72" width="28" height="26" rx="7" fill="#101A1E" />
              <rect x="803" y="96" width="50" height="34" rx="8" fill="#131E22" />
              <rect
                x="818"
                y="118"
                width="48"
                height="142"
                rx="19"
                fill="url(#welcome-logo-extinguisher)"
              />
              <rect x="826" y="141" width="28" height="64" rx="3" fill="#FFD261" opacity="0.9" />
              <path
                d="M825 126 C837 116 856 122 861 137 L861 158 C851 148 837 147 823 153 Z"
                fill="#FFFFFF"
                opacity="0.24"
              />
              <path
                d="M834 141 L854 141 L854 202 C844 204 838 203 826 200 Z"
                fill="#FFE08A"
                opacity="0.28"
              />
              <rect x="817" y="245" width="50" height="18" rx="7" fill="#040A0C" />
              <circle cx="842" cy="87" r="17" fill="#F4F4F2" stroke="#C1121F" strokeWidth="6" />
              <path
                d="M837 80 L845 88 L850 98"
                fill="none"
                stroke="#C1121F"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path d="M795 80 L834 91" stroke="#101A1E" strokeWidth="12" strokeLinecap="round" />
              <rect
                x="854"
                y="83"
                width="40"
                height="12"
                rx="3"
                fill="#FFB20A"
                transform="rotate(-10 854 83)"
              />
            </g>

            <g className="welcome-logo-sparks" aria-hidden="true">
              <circle cx="746" cy="62" r="2.4" fill="#FFB20A" />
              <circle cx="794" cy="48" r="1.8" fill="#F77F00" />
              <circle cx="724" cy="96" r="1.6" fill="#FFB20A" />
            </g>
            <rect
              className="welcome-logo-sheen"
              x="-260"
              y="50"
              width="180"
              height="230"
              fill="url(#welcome-logo-highlight)"
            />
          </svg>
        </div>

        <div className="welcome-line mt-4 h-px w-40 bg-gradient-to-r from-transparent via-[#F77F00]/70 to-transparent sm:mt-5" />
      </div>
    </section>
  )
}
