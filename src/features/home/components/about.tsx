"use client"

import { useLanguage } from "../hooks/use-language"
import Image from "next/image"
import { Award, Users, Building, CheckCircle } from "lucide-react"

import { AnimatedCounter } from "@/shared/ui/animated-counter"
import { stats as profileStats, certifications } from "../data/profile"

const statIcons = { award: Award, users: Users, building: Building }
const stats = profileStats.map((stat) => ({ ...stat, icon: statIcons[stat.icon] }))

export function About() {
  const { t } = useLanguage()
  return (
    <section id="sobre" className="bg-background px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-scroll-reveal className="relative flex justify-center">
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-30"
              style={{
                background: "radial-gradient(ellipse at center, #C1121F 0%, transparent 70%)",
              }}
            />
            <div
              className="relative w-full max-w-[280px] overflow-hidden rounded-3xl border border-white/10 sm:max-w-sm"
              style={{
                boxShadow: "0 32px 64px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="/luiz-bombeiro.png"
                  alt={t("Luiz Fernando - Bombeiro Civil")}
                  fill
                  className="rounded-3xl object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 384px, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="glass-nameplate absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-3 py-2.5 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:px-4 sm:py-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#C1121F] sm:h-9 sm:w-9">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="h-4 w-4 text-white sm:h-5 sm:w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Luiz Fernando</p>
                    <p className="text-xs text-white/60">{t("Bombeiro Civil · Instrutor")} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-scroll-reveal data-reveal-delay="100">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight text-white sm:mb-6 sm:text-3xl md:text-4xl">
              {t("Sobre")} <span className="text-gradient-fire">{t("Minha Carreira")} </span>
            </h2>
            <p className="mb-4 font-light leading-relaxed text-white/60 sm:mb-5">
              {t(
                "Com anos de experiência em segurança do trabalho e emergências, dedico minha carreira a formar profissionais capacitados e preparados para situações de risco. Minha missão é garantir que cada equipe tenha o conhecimento necessário para salvar vidas.",
              )}{" "}
            </p>
            <p className="mb-7 font-light leading-relaxed text-white/60 sm:mb-8">
              {t(
                "Atuo em treinamentos corporativos, consultoria técnica e supervisão de brigadas, sempre com foco na excelência e no cumprimento das normas regulamentadoras vigentes.",
              )}{" "}
            </p>

            <div className="glass-panel mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 sm:p-6">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#F77F00]">
                {t("Certificações e Especializações")}{" "}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F77F00]/15">
                      <CheckCircle className="h-3.5 w-3.5 text-[#F77F00]" />
                    </span>
                    {t(cert)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="glass-stats mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm sm:mt-16 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              data-scroll-reveal
              data-reveal-delay={index * 80}
              key={index}
              className="group flex flex-col items-center p-6 transition-colors hover:bg-white/[0.04] sm:p-8"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F77F00]/15 transition-colors group-hover:bg-[#F77F00]/25 sm:h-12 sm:w-12">
                <stat.icon className="h-5 w-5 text-[#F77F00] sm:h-6 sm:w-6" strokeWidth={1.5} />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-center text-xs font-light text-white/50 sm:text-sm">
                {t(stat.label)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
