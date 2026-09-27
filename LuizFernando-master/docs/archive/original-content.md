# Conteúdo original para rastreabilidade

## about

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Award, Users, Building, CheckCircle } from "lucide-react"

const stats = [
  { icon: Award, value: 150, suffix: "+", label: "Treinamentos" },
  { icon: Users, value: 2500, suffix: "+", label: "Profissionais Capacitados" },
  { icon: Building, value: 50, suffix: "+", label: "Empresas Atendidas" },
]

const certifications = [
  "Bombeiro Civil Credenciado",
  "Técnico em Segurança do Trabalho",
  "Técnico em Enfermagem",
  "Coordenador de Resgate Técnico",
  "Alpinista Industrial",
  "Black Hawk - 97",
  "Instrutor técnico das NR's: 01, 06, 11, 12, 20, 23, 33 e 35",
  "Instrutor de Primeiros Socorros e APH",
]

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }, [isVisible, value, duration])

  return (
    <div ref={ref} className="text-3xl font-bold text-[#F77F00] sm:text-4xl md:text-5xl">
      {count.toLocaleString("pt-BR")}
      {suffix}
    </div>
  )
}

export function About() {
  return (
    <section id="sobre" className="bg-background px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex justify-center">
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-30"
              style={{ background: "radial-gradient(ellipse at center, #C1121F 0%, transparent 70%)" }}
            />
            <div
              className="relative w-full max-w-[280px] overflow-hidden rounded-3xl border border-white/10 sm:max-w-sm"
              style={{ boxShadow: "0 32px 64px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)" }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="/luiz-bombeiro.png"
                  alt="Luiz Fernando - Bombeiro Civil"
                  fill
                  className="rounded-3xl object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 384px, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-3 py-2.5 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:px-4 sm:py-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#C1121F] sm:h-9 sm:w-9">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-white sm:h-5 sm:w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Luiz Fernando</p>
                    <p className="text-xs text-white/60">Bombeiro Civil · Instrutor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-semibold tracking-tight text-white sm:mb-6 sm:text-3xl md:text-4xl">
              Sobre <span className="text-gradient-fire">Minha Carreira</span>
            </h2>
            <p className="mb-4 font-light leading-relaxed text-white/60 sm:mb-5">
              Com anos de experiência em segurança do trabalho e emergências,
              dedico minha carreira a formar profissionais capacitados e
              preparados para situações de risco. Minha missão é garantir que
              cada equipe tenha o conhecimento necessário para salvar vidas.
            </p>
            <p className="mb-7 font-light leading-relaxed text-white/60 sm:mb-8">
              Atuo em treinamentos corporativos, consultoria técnica e
              supervisão de brigadas, sempre com foco na excelência e no
              cumprimento das normas regulamentadoras vigentes.
            </p>

            <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 sm:p-6">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#F77F00]">
                Certificações e Especializações
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F77F00]/15">
                      <CheckCircle className="h-3.5 w-3.5 text-[#F77F00]" />
                    </span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm sm:mt-16 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="group flex flex-col items-center p-6 transition-colors hover:bg-white/[0.04] sm:p-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F77F00]/15 transition-colors group-hover:bg-[#F77F00]/25 sm:h-12 sm:w-12">
                <stat.icon className="h-5 w-5 text-[#F77F00] sm:h-6 sm:w-6" strokeWidth={1.5} />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-center text-xs font-light text-white/50 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

```

## services

```tsx
"use client"

import { useState } from "react"
import { Heart, HardHat, FileText, ClipboardCheck, Flame, AlertTriangle, ArrowUpRight, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const services = [
  {
    icon: Heart,
    title: "Primeiros Socorros",
    description: "Treinamento completo em técnicas de atendimento pré-hospitalar.",
    gradient: "from-[#C1121F] to-[#F77F00]",
    glowColor: "#C1121F",
    details: {
      intro: "Você sabia que os primeiros minutos após um acidente são cruciais? Muitas vidas são salvas por quem está por perto e sabe o que fazer.",
      content: "Nosso treinamento de Primeiros Socorros vai muito além da teoria. Trago para você uma experiência prática baseada em anos atuando como técnico em enfermagem em situações de emergência real.",
      topics: ["Suporte Básico de Vida (SBV)", "Atendimento a parada cardiorrespiratória", "Controle de hemorragias", "Imobilização de fraturas", "Manuseio de desfibrilador (AED)"],
      duration: "16 a 20 horas",
      certification: "Certificado válido por 2 anos",
      humanNote: "Acredito que todo mundo deveria saber salvar uma vida. Não é sobre ser herói, é sobre estar preparado quando alguém precisar de você."
    }
  },
  {
    icon: HardHat,
    title: "Treinamentos NR's",
    description: "Capacitação completa em normas regulamentadoras essenciais.",
    gradient: "from-[#F77F00] to-[#C1121F]",
    glowColor: "#F77F00",
    details: {
      intro: "As normas regulamentadoras existem para proteger vidas. Mas só fazem sentido quando são compreendidas de verdade, não apenas decoradas.",
      content: "Trabalho com as principais NRs de forma descomplicada e direta ao ponto. Meu objetivo é que sua equipe não apenas 'cumpra' a norma, mas entenda por que ela importa.",
      topics: ["NR-01 - Disposições gerais e gerenciamento de riscos", "NR-06 - Equipamentos de proteção individual", "NR-11 - Transporte, movimentação e armazenagem de materiais", "NR-12 - Segurança em máquinas e equipamentos", "NR-20 - Segurança com inflamáveis e combustíveis", "NR-23 - Proteção contra incêndios", "NR-33 - Espaços confinados", "NR-35 - Trabalho em altura"],
      duration: "Varia conforme a NR (4 a 40 horas)",
      certification: "Certificados conforme exigência legal",
      humanNote: "Já vi muito acidente que poderia ter sido evitado com uma simples orientação. Por isso levo cada treinamento a sério, como se fosse minha família trabalhando lá."
    }
  },
  {
    icon: FileText,
    title: "Plano de Resgate",
    description: "Elaboração de planos de emergência personalizados.",
    gradient: "from-[#C1121F] to-[#F77F00]",
    glowColor: "#C1121F",
    details: {
      intro: "Um plano de resgate bem feito é como um seguro que você espera nunca usar, mas precisa ter sempre pronto.",
      content: "Desenvolvo planos de emergência sob medida para sua realidade. Cada empresa é única, e o plano de resgate precisa refletir isso - desde a disposição física do local até o perfil da equipe.",
      topics: ["Análise de risco da empresa", "Procedimentos de evacuação", "Organização da brigada", "Integração com corpo de bombeiros", "Simulados e atualizações"],
      duration: "Projeto personalizado",
      certification: "Documentação conforme normas técnicas",
      humanNote: "Quando o pior acontece, não dá tempo de pensar. O plano existe para que todos saibam exatamente o que fazer, mesmo sob pressão."
    }
  },
  {
    icon: ClipboardCheck,
    title: "Supervisão",
    description: "Acompanhamento técnico em operações de risco.",
    gradient: "from-[#F77F00] to-[#C1121F]",
    glowColor: "#F77F00",
    details: {
      intro: "Ter um supervisor de segurança presente é ter alguém que já passou por situações difíceis e sabe reconhecer os sinais de perigo antes que seja tarde.",
      content: "Ofereço supervisão técnica em operações de alto risco, trazendo minha experiência prática em campo para garantir que cada operação seja executada com segurança.",
      topics: ["Supervisão de trabalho em altura", "Acompanhamento de espaço confinado", "Inspeção de equipamentos", "Análise de risco em tempo real", "Briefing e debriefing diário"],
      duration: "Contrato sob demanda",
      certification: "Relatórios técnicos documentados",
      humanNote: "Na supervisão, cada detalhe importa. Um equipamento fora do lugar, uma atitude descuidada... minha função é estar atento para que todos voltem para casa em segurança."
    }
  },
  {
    icon: Flame,
    title: "Brigada de Incêndio",
    description: "Formação e reciclagem de brigadas de emergência.",
    gradient: "from-[#C1121F] to-[#F77F00]",
    glowColor: "#C1121F",
    details: {
      intro: "A brigada de incêndio é a primeira linha de defesa da sua empresa. Quando bem treinada, pode fazer a diferença entre um susto e uma tragédia.",
      content: "Formo brigadas de emergência completas, desde o básico até técnicas avançadas de combate a incêndio. O treinamento é intenso, prático e baseado em cenários reais.",
      topics: ["Combate a incêndio com extintores", "Uso de mangueiras e hidrantes", "Resgate e evacuação", "Atendimento a vítimas", "Comunicação em emergências"],
      duration: "16 a 24 horas (formação)",
      certification: "Certificado conforme Lei 13.425/2017",
      humanNote: "Ser brigadista é uma responsabilidade enorme. Você não está apenas protegendo patrimônio, está protegendo colegas, amigos, pessoas que têm família esperando em casa."
    }
  },
  {
    icon: AlertTriangle,
    title: "Consultoria",
    description: "Consultoria especializada em segurança do trabalho.",
    gradient: "from-[#F77F00] to-[#C1121F]",
    glowColor: "#F77F00",
    details: {
      intro: "Às vezes, uma visão externa e experiente é tudo que falta para transformar a segurança da sua empresa.",
      content: "Ofereço consultoria personalizada em segurança do trabalho, ajudando empresas a identificarem gaps, implementarem melhorias e criarem uma cultura de segurança genuína.",
      topics: ["Diagnóstico de segurança", "Implementação de PCMSO/PPRA", "Análise de acidentes", "Treinamento de gestores", "Auditorias de conformidade"],
      duration: "Projeto personalizado",
      certification: "Relatórios e laudos técnicos",
      humanNote: "Segurança não é apenas cumprir lei. É criar um ambiente onde as pessoas se sintam protegidas e valorizadas. Isso muda tudo."
    }
  },
]

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  return (
    <section id="servicos" className="relative overflow-hidden bg-secondary/30 px-4 py-16 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C1121F]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F77F00]/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full bg-[#F77F00]/10 px-4 py-1.5 text-sm font-medium text-[#F77F00]">
            O que oferecemos
          </span>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Nossos <span className="text-gradient-fire">Serviços</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light text-muted-foreground sm:text-lg">
            Soluções completas em segurança do trabalho, treinamentos e consultoria
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-0 blur transition duration-500 group-hover:opacity-75"
                style={{ background: `linear-gradient(135deg, ${service.glowColor}40, transparent)` }}
              />
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 group-hover:border-white/10 group-hover:from-white/[0.12] group-hover:to-white/[0.04] sm:p-6">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <div
                  className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${service.gradient} p-3 shadow-lg transition-all duration-500 group-hover:scale-110`}
                  style={{ boxShadow: `0 8px 30px -10px ${service.glowColor}50` }}
                >
                  <service.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-base font-medium tracking-tight text-white transition-colors group-hover:text-[#F77F00] sm:text-lg">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm font-light leading-relaxed text-muted-foreground/80">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-white/60 transition-all duration-300 group-hover:gap-3 group-hover:text-[#F77F00]">
                  <span>Saiba mais</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${service.gradient} transition-all duration-500 group-hover:w-full`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto border-white/10 bg-[#0B0B0B]/95 backdrop-blur-xl sm:mx-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/5 p-3">
                  <selectedService.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <DialogTitle className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                  {selectedService.title}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-5 sm:space-y-6">
                <p className="text-base font-light leading-relaxed text-white/90 sm:text-lg">
                  {selectedService.details.intro}
                </p>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {selectedService.details.content}
                </p>
                <div>
                  <h4 className="mb-3 text-sm font-medium text-white/80">O que você vai aprender:</h4>
                  <ul className="space-y-2">
                    {selectedService.details.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-light text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F77F00]" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-4 rounded-xl bg-white/5 p-4 sm:grid-cols-2">
                  <div>
                    <span className="text-xs font-medium text-white/60">Carga horária</span>
                    <p className="text-sm font-light text-white">{selectedService.details.duration}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white/60">Certificação</span>
                    <p className="text-sm font-light text-white">{selectedService.details.certification}</p>
                  </div>
                </div>
                <div className="rounded-xl border-l-2 border-[#F77F00] bg-[#F77F00]/5 p-4">
                  <p className="text-sm font-light italic text-white/80">
                    &ldquo;{selectedService.details.humanNote}&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-white/50">— Luiz Fernando</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

```

## projects

```tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, X } from "lucide-react"

import { whatsappTrainingUrl } from "@/lib/contact"

type Project = {
  src: string
  alt: string
  title: string
  category: string
  eyebrow: string
  summary: string
  description: string
  highlights: string[]
  imageWidth: number
  imageHeight: number
  objectPosition?: string
}

const projects: Project[] = [
  {
    src: "/training-a1.jpg",
    alt: "Treinamento prático de combate a incêndio com botijão de gás",
    title: "Combate a Incêndio e Resposta Inicial",
    category: "NR-23",
    eyebrow: "Treinamento in company",
    summary:
      "Capacitação prática para leitura do cenário, isolamento da área e resposta segura nos primeiros minutos da emergência.",
    description:
      "Treinamento desenvolvido para preparar equipes operacionais e administrativas para agir com rapidez e segurança diante de princípios de incêndio. A formação aborda prevenção, avaliação do cenário, escolha do agente extintor adequado, acionamento correto da brigada e condutas iniciais que reduzem riscos e preservam vidas.",
    highlights: [
      "Uso correto de extintores e agentes extintores",
      "Isolamento da área e organização da resposta inicial",
      "Conduta alinhada à rotina de emergência da empresa",
    ],
    imageWidth: 1600,
    imageHeight: 1066,
    objectPosition: "center 42%",
  },
  {
    src: "/training-b1.jpg",
    alt: "Simulação de resgate em altura com vítima em estrutura metálica",
    title: "Resgate em Altura com Vítima",
    category: "NR-35",
    eyebrow: "Simulação assistida",
    summary:
      "Treinamento prático para retirada segura de vítima em estrutura elevada, com controle de cordas e comunicação da equipe.",
    description:
      "Capacitação voltada a equipes que precisam responder com segurança em atividades acima do nível do solo. A simulação trabalha aproximação da vítima, montagem do sistema, controle de descida, comunicação entre operadores e tomada de decisão para que o resgate aconteça com técnica, calma e proteção para todos.",
    highlights: [
      "Montagem e conferência do sistema de resgate",
      "Abordagem segura da vítima em estrutura elevada",
      "Comunicação clara entre resgatista, apoio e supervisão",
    ],
    imageWidth: 720,
    imageHeight: 1280,
    objectPosition: "center 42%",
  },
  {
    src: "/training-b3.jpg",
    alt: "Profissional em espaço confinado durante inspeção operacional",
    title: "Segurança em Espaço Confinado",
    category: "NR-33",
    eyebrow: "Ambiente industrial",
    summary:
      "Treinamento para entrada, inspeção e permanência segura em espaços confinados com foco em análise de risco.",
    description:
      "Treinamento voltado para operações industriais que exigem disciplina técnica em espaços confinados. A formação cobre permissões de entrada, monitoramento do ambiente, reconhecimento de riscos atmosféricos e operacionais, integração entre vigia e equipe interna, além de critérios de segurança para permanência e evacuação.",
    highlights: [
      "Controle de acesso e permissões de entrada",
      "Leitura de riscos atmosféricos e operacionais",
      "Comunicação entre vigia, equipe e supervisão",
    ],
    imageWidth: 1200,
    imageHeight: 1600,
    objectPosition: "center center",
  },
  {
    src: "/training-11.jpg",
    alt: "Equipe em exercício de resgate vertical com acesso por cordas",
    title: "Resgate Vertical Assistido",
    category: "Resgate Técnico",
    eyebrow: "Cenário realístico",
    summary:
      "Simulação prática para retirada e movimentação de vítimas em sistemas verticais com coordenação da equipe.",
    description:
      "Treinamento premium voltado à execução segura de resgates em estruturas elevadas e ambientes de difícil acesso. A atividade desenvolve domínio de sistemas por corda, movimentação controlada da vítima, comunicação entre operadores e gestão do cenário para fortalecer a capacidade de resposta em operações complexas.",
    highlights: [
      "Montagem de sistemas e redundâncias",
      "Retirada controlada de vítima em altura",
      "Comunicação operacional em cenário crítico",
    ],
    imageWidth: 1200,
    imageHeight: 1600,
    objectPosition: "center 36%",
  },
  {
    src: "/training-a2.jpg",
    alt: "Instrutor bombeiro civil em prontidão durante treinamento corporativo",
    title: "Liderança de Brigada e Prontidão",
    category: "Brigada",
    eyebrow: "Postura operacional",
    summary:
      "Preparação da brigada para atuar com postura, disciplina e confiança quando a rotina exige resposta rápida.",
    description:
      "Atuação focada na formação de brigadistas mais atentos, organizados e preparados para orientar pessoas em situações críticas. O treinamento reforça postura profissional, leitura do ambiente, comunicação com a equipe, prevenção diária e liderança nos primeiros minutos de uma emergência.",
    highlights: [
      "Postura de liderança durante emergências",
      "Comunicação objetiva com equipe e ocupantes",
      "Prevenção aplicada à rotina da empresa",
    ],
    imageWidth: 1168,
    imageHeight: 1140,
    objectPosition: "center 32%",
  },
  {
    src: "/training-12.jpg",
    alt: "Profissional com equipamentos de combate e resgate em ambiente corporativo",
    title: "Prontidão e Cultura de Segurança",
    category: "Implantação",
    eyebrow: "Imagem institucional",
    summary:
      "Atuação voltada à preparação visual, técnica e operacional da equipe para elevar o padrão de segurança.",
    description:
      "Projeto direcionado a empresas que buscam fortalecer a cultura de segurança por meio de treinamentos, organização de recursos e presença técnica. A proposta integra demonstração de equipamentos, postura profissional da equipe e preparação operacional para gerar mais confiança interna e institucional.",
    highlights: [
      "Padronização visual e operacional da equipe",
      "Organização de recursos para resposta emergencial",
      "Fortalecimento da cultura de segurança",
    ],
    imageWidth: 960,
    imageHeight: 1280,
    objectPosition: "center 32%",
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!selectedProject) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [selectedProject])

  return (
    <section id="projetos" className="relative overflow-hidden bg-secondary/30 px-4 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C1121F]/12 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#F77F00]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Projetos & <span className="text-gradient-fire">Atuações</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light text-muted-foreground sm:text-lg">
            Registro de treinamentos, simulações e atuações reais em campo com foco em segurança,
            técnica e performance da equipe.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[2rem] text-left focus:outline-none focus:ring-2 focus:ring-[#F77F00]/70"
            >
              <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br from-[#C1121F]/30 via-transparent to-[#F77F00]/30 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100" />

              <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl transition-all duration-500 group-hover:border-white/20">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  style={{ objectPosition: project.objectPosition }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-80 transition-all duration-500 group-hover:opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#C1121F]/18 to-[#F77F00]/18 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C1121F] to-[#F77F00] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(193,18,31,0.28)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {project.eyebrow}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#F77F00]">
                    {project.title}
                  </h3>
                  <p className="min-h-[3.25rem] text-sm leading-relaxed text-white/62">{project.summary}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/72 transition-colors duration-300 group-hover:text-white">
                      Ver detalhes do treinamento
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.12] group-hover:text-white">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#C1121F] to-[#F77F00] transition-all duration-500 group-hover:w-full" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 backdrop-blur-xl sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0B0B] shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center text-white/75 transition-colors duration-300 hover:text-white"
              onClick={() => setSelectedProject(null)}
              aria-label="Fechar modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid lg:grid-cols-[minmax(0,1.18fr)_360px]">
              <div className="flex min-h-[340px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(247,127,0,0.14),transparent_42%),linear-gradient(180deg,#111111_0%,#090909_100%)] p-4 sm:p-6">
                <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[1.7rem] border border-white/8 bg-black/35">
                  <Image
                    src={selectedProject.src}
                    alt={selectedProject.alt}
                    width={selectedProject.imageWidth}
                    height={selectedProject.imageHeight}
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority
                    className="max-h-[72vh] w-full object-contain"
                  />
                </div>
              </div>

              <aside className="flex flex-col border-t border-white/8 bg-white/[0.03] p-6 lg:border-l lg:border-t-0 lg:p-8">
                <div className="rounded-[1.6rem] border border-white/8 bg-black/22 p-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F77F00]">
                    {selectedProject.category}
                  </p>
                  <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-white/62">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-3">
                    {selectedProject.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#F77F00]" />
                        <p className="text-sm leading-relaxed text-white/74">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={whatsappTrainingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#C1121F] via-[#D62828] to-[#F77F00] px-5 py-4 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(193,18,31,0.32)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Solicitar esse treinamento
                  <ArrowRight className="h-4 w-4" />
                </a>
              </aside>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

```

## hero

```tsx
"use client"

import { useEffect, useState, useRef } from "react"
import { Instagram, Linkedin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { whatsappTrainingUrl } from "@/lib/contact"

const roles = [
  "Bombeiro Civil",
  "Técnico em Enfermagem",
  "Instrutor de Segurança",
  "Consultoria",
]

const backgroundVideos = [
  "/VÍDEO1.mp4",
  "/VÍDEO2.mp4",
  "/VÍDEO3.mp4",
  "/VÍDEO4.mp4",
]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const [activePlayer, setActivePlayer] = useState<'A' | 'B'>('A')
  const [indexA, setIndexA] = useState(0)
  const [indexB, setIndexB] = useState(1)
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (activePlayer === 'A') {
      videoARef.current?.play().catch(() => {})
    } else {
      videoBRef.current?.play().catch(() => {})
    }
  }, [activePlayer])

  const handleEndedA = () => {
    setActivePlayer('B')
    setTimeout(() => {
      setIndexA((prev) => (indexB + 1) % backgroundVideos.length)
    }, 1000)
  }

  const handleEndedB = () => {
    setActivePlayer('A')
    setTimeout(() => {
      setIndexB((prev) => (indexA + 1) % backgroundVideos.length)
    }, 1000)
  }

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
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
      isDeleting ? 50 : 100
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoARef}
          muted
          playsInline
          preload="auto"
          onEnded={handleEndedA}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            activePlayer === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ minWidth: "100%", minHeight: "100%", filter: "contrast(1.15) brightness(1.05) saturate(1.2)" }}
          src={backgroundVideos[indexA]}
        />
        <video
          ref={videoBRef}
          muted
          playsInline
          preload="auto"
          onEnded={handleEndedB}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            activePlayer === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ minWidth: "100%", minHeight: "100%", filter: "contrast(1.15) brightness(1.05) saturate(1.2)" }}
          src={backgroundVideos[indexB]}
        />
      </div>

      <div className="absolute inset-0 z-10 bg-black/80 pointer-events-none" />
      <div className="video-overlay absolute inset-0 z-10 pointer-events-none" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1
          className="mb-4 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          CONS<span className="text-gradient-fire">.TREIN</span>
        </h1>

        <div className="mb-8 h-10 text-base text-white/90 sm:h-12 sm:text-xl md:text-2xl lg:text-3xl">
          <span>{displayText}</span>
          <span className="animate-blink ml-1 text-[#F77F00]">|</span>
        </div>

        <div className="mb-10 flex items-center gap-3 sm:gap-4">
          <a
            href={whatsappTrainingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 sm:p-4"
          >
            <svg className="h-5 w-5 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#25D366] sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/cons.trein?igsh=YmdiNzYzY3Nub3Zj"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 sm:p-4"
          >
            <Instagram className="h-5 w-5 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#E4405F] sm:h-6 sm:w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/luiz-fernando-b2647a160?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 sm:p-4"
          >
            <Linkedin className="h-5 w-5 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#0A66C2] sm:h-6 sm:w-6" />
          </a>
        </div>

        <div className="flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="cursor-pointer rounded-2xl bg-[#C1121F] px-6 py-5 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-[#C1121F]/90 hover:shadow-lg hover:shadow-[#C1121F]/30 sm:px-8 sm:py-6 sm:text-lg"
            asChild
          >
            <a href={whatsappTrainingUrl} target="_blank" rel="noopener noreferrer">
              Solicitar Treinamento
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer rounded-2xl border-white/30 bg-white/10 px-6 py-5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 sm:px-8 sm:py-6 sm:text-lg"
            onClick={() => scrollToSection("projetos")}
          >
            Ver Projetos
          </Button>
        </div>

        <button
          onClick={() => scrollToSection("carrossel")}
          className="absolute bottom-6 animate-bounce text-white/60 transition-colors hover:text-[#F77F00] sm:bottom-8"
        >
          <ChevronDown className="h-8 w-8 sm:h-10 sm:w-10" />
        </button>
      </div>
    </section>
  )
}

```

## footer

```tsx
"use client"

import { Instagram, Linkedin, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { whatsappTrainingUrl } from "@/lib/contact"

const quickLinks = [
  { label: "Início", href: "#" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
]

const services = [
  "Primeiros Socorros",
  "Brigada de Incêndio",
  "Treinamentos NR's",
  "Consultoria Técnica",
]

export function Footer() {
  return (
    <footer id="contato" className="scroll-mt-28 border-t border-white/[0.06] bg-[#0B0B0B] px-4 pb-8 pt-12 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#" className="mb-4 inline-block">
              <Image src="/logo.png" alt="LF Treinamentos" width={280} height={93} className="h-16 w-auto sm:h-20 md:h-24" />
            </a>
            <h3 className="mb-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Segurança que <span className="text-gradient-fire">salva vidas</span>
            </h3>
            <p className="mb-7 max-w-sm font-light leading-relaxed text-white/40 sm:mb-8">
              Especialista em treinamentos de segurança do trabalho, brigada de
              incêndio e consultoria técnica para empresas.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappTrainingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-all duration-300 hover:scale-110 hover:border-[#25D366] hover:bg-[#25D366]/15 hover:text-[#25D366]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/cons.trein?igsh=YmdiNzYzY3Nub3Zj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-all duration-300 hover:scale-110 hover:border-[#E4405F] hover:bg-[#E4405F]/15 hover:text-[#E4405F]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/luiz-fernando-b2647a160?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-all duration-300 hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2]/15 hover:text-[#0A66C2]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30 sm:mb-5">Navegação</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm font-light text-white/50 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30 sm:mb-5">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 flex-shrink-0 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span className="text-sm font-light text-white/50">(81) 99732-6825</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-white/30" />
                <a href="mailto:fernandoconstrein@gmail.com" className="break-all text-sm font-light text-white/50 transition-colors hover:text-white">
                  fernandoconstrein@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/30" />
                <span className="text-sm font-light text-white/50">Recife, Pernambuco &mdash; Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8 sm:mt-16">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} LF Treinamentos. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/25">
              Bombeiro Civil &middot; Técnico em Enfermagem &middot; Instrutor de Segurança
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-white/15">
            Desenvolvido por{" "}
            <a
              href="https://instagram.com/l.mateusdev"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/40"
            >
              l.mateusdev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

```