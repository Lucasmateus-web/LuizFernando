"use client"

import { useLanguage } from "../hooks/use-language"
import { partners } from "../data/partners"

export function Partners() {
  const { t } = useLanguage()
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="border-y border-white/5 bg-secondary/20 py-12 sm:py-20">
      <div data-scroll-reveal className="mx-auto mb-10 max-w-6xl px-4 text-center sm:mb-12">
        <h2 className="text-xl font-medium tracking-tight text-white/80 sm:text-2xl">
          {t("Parceiros e")} <span className="text-[#F77F00]">{t("Empresas")} </span>
          {t("onde já prestamos serviços")}{" "}
        </h2>
      </div>

      <div data-scroll-reveal data-reveal-delay="100" className="relative flex overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-fit animate-marquee-left gap-6 sm:gap-10">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="glass-partner group flex h-20 w-44 items-center justify-center rounded-2xl bg-white/[0.02] px-6 transition-colors hover:bg-white/[0.05] sm:h-24 sm:w-56"
            >
              <div className="flex h-12 w-full items-center justify-center sm:h-14">
                {/* Preserve the intrinsic proportions of the mixed SVG/raster partner logos. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="max-h-full w-full object-contain brightness-0 invert opacity-55 transition-opacity duration-300 group-hover:opacity-95"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
