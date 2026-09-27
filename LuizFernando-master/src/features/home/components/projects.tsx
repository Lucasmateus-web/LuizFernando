"use client"

import { useLanguage } from "../hooks/use-language"
import { useCallback, useState } from "react"

import { ProjectCard } from "./project-card"
import { ProjectDialog } from "./project-dialog"

import { projects } from "../data/projects"
import type { Project } from "../types"

export function Projects() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const closeProject = useCallback(() => setSelectedProject(null), [])

  return (
    <section id="projetos" className="relative overflow-hidden bg-secondary/30 px-4 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C1121F]/12 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#F77F00]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div data-scroll-reveal className="projects-heading mb-10 sm:mb-14">
          <p className="projects-kicker">{t("Experiência em campo")}</p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {t("Projetos &")} <span className="text-gradient-fire">{t("Atuações")} </span>
          </h2>
          <p className="max-w-2xl text-base font-light text-muted-foreground sm:text-lg">
            {t(
              "Registro de treinamentos, simulações e atuações reais em campo com foco em segurança, técnica e performance da equipe.",
            )}{" "}
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
        <p data-scroll-reveal className="projects-signature">
          {t("Técnica que prepara. Atitude que protege.")}
        </p>
      </div>

      {selectedProject && <ProjectDialog project={selectedProject} onClose={closeProject} />}
    </section>
  )
}
