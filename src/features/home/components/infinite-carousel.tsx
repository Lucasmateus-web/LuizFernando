"use client"

import { useLanguage } from "../hooks/use-language"
import Image from "next/image"
import { trainings } from "../data/trainings"

function CarouselTrack() {
  const { t } = useLanguage()
  const duplicatedTrainings = [...trainings, ...trainings]
  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />
      <div className="flex w-fit animate-marquee-left gap-4 hover:[animation-play-state:paused] sm:gap-6">
        {duplicatedTrainings.map((training, index) => (
          <div
            key={`${t(training.title)}-${index}`}
            className="original-training-card glass-training-card group relative h-56 w-[20rem] flex-shrink-0 cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-2.5 shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:h-64 sm:w-[24rem]"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -right-8 top-6 h-24 w-24 rounded-full bg-[#F77F00]/12 blur-3xl" />
            </div>
            <div className="relative h-full overflow-hidden rounded-[1.45rem]">
              <Image
                src={training.src}
                alt={t(training.alt)}
                fill
                sizes="(max-width: 640px) 320px, 384px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: training.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#C1121F]/12 via-transparent to-[#F77F00]/18 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <div className="absolute left-4 top-4">
                <span className="inline-flex rounded-full border border-white/12 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78 backdrop-blur-md">
                  {t("Na prática")}
                </span>
              </div>
              <div className="glass-training-caption absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="mb-2 text-base font-semibold leading-tight text-white sm:text-lg">
                  {t(training.title)}
                </p>
                <p className="max-w-[28ch] text-xs leading-relaxed text-white/65 sm:text-sm">
                  {t(training.subtitle)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export function InfiniteCarousel() {
  const { t } = useLanguage()
  return (
    <section id="carrossel" className="bg-background py-12 sm:py-16">
      <div data-scroll-reveal className="mb-6 px-4 text-center sm:mb-8">
        <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          {t("Treinamentos em")} <span className="text-gradient-fire">{t("Ação")}</span>
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          {t(
            "Cada imagem mostra um tipo de treinamento vivido na prática, com técnica, preparo e rotina real de campo.",
          )}
        </p>
      </div>
      <div data-scroll-reveal data-reveal-delay="100" className="space-y-2">
        <CarouselTrack />
      </div>
    </section>
  )
}
