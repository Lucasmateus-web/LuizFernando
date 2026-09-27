"use client"

import { useLanguage } from "../hooks/use-language"
import { Instagram, Linkedin, ChevronDown } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { contact, whatsappTrainingUrl } from "@/shared/config/contact"

import { backgroundVideos } from "../data/hero"
import { useHero } from "../hooks/use-hero"

export function Hero() {
  const { t } = useLanguage()
  const {
    displayText,
    activePlayer,
    indexA,
    indexB,
    videoARef,
    videoBRef,
    handleEndedA,
    handleEndedB,
    scrollToSection,
  } = useHero()

  return (
    <section className="original-hero relative h-screen min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoARef}
          muted
          playsInline
          preload="auto"
          onEnded={handleEndedA}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            activePlayer === "A" ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            minWidth: "100%",
            minHeight: "100%",
            filter: "contrast(1.15) brightness(1.05) saturate(1.2)",
          }}
          src={backgroundVideos[indexA]}
        />
        <video
          ref={videoBRef}
          muted
          playsInline
          preload="auto"
          onEnded={handleEndedB}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            activePlayer === "B" ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            minWidth: "100%",
            minHeight: "100%",
            filter: "contrast(1.15) brightness(1.05) saturate(1.2)",
          }}
          src={backgroundVideos[indexB]}
        />
      </div>

      <div className="glass-hero-shade absolute inset-0 z-10 bg-black/80 pointer-events-none" />
      <div className="video-overlay absolute inset-0 z-10 pointer-events-none" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1
          className="mb-4 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          CONS<span className="text-gradient-fire">.TREIN</span>
        </h1>

        <div className="mb-8 h-10 text-base text-white/90 sm:h-12 sm:text-xl md:text-2xl lg:text-3xl">
          <span>{displayText}</span>
          <span className="animate-blink ml-1 text-[#F77F00]">|</span>
        </div>

        <div className="glass-social-dock mb-10 flex items-center gap-3 sm:gap-4">
          <a
            href={whatsappTrainingUrl}
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <a
            aria-label="Instagram"
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4"
          >
            <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a
            aria-label="LinkedIn"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4"
          >
            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </div>

        <div className="flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="glass-action glass-action-brand hero-cta hero-cta-primary cursor-pointer rounded-2xl bg-[#C1121F] px-6 py-5 text-base font-semibold text-white sm:px-8 sm:py-6 sm:text-lg"
            asChild
          >
            <a href={whatsappTrainingUrl} target="_blank" rel="noopener noreferrer">
              <span>{t("Solicitar Treinamento")}</span>
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass-action hero-cta hero-cta-secondary cursor-pointer rounded-2xl border-white/30 bg-white/10 px-6 py-5 text-base font-semibold text-white sm:px-8 sm:py-6 sm:text-lg"
            onClick={() => scrollToSection("projetos")}
          >
            <span>{t("Ver Projetos")}</span>
          </Button>
        </div>

        <button
          onClick={() => scrollToSection("carrossel")}
          aria-label={t("Ver treinamentos")}
          className="glass-scroll-button absolute bottom-6 animate-bounce text-white/60 transition-colors hover:text-[#F77F00] sm:bottom-8"
        >
          <ChevronDown className="h-8 w-8 sm:h-10 sm:w-10" />
        </button>
      </div>
    </section>
  )
}
