"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "../hooks/use-language"
import type { Project } from "../types"

type ProjectCardProps = { project: Project; onSelect: (project: Project) => void; index: number }

export function ProjectCard({ project, onSelect, index }: ProjectCardProps) {
  const { t } = useLanguage()
  return (
    <button
      data-scroll-reveal
      data-reveal-delay={(index % 3) * 90}
      type="button"
      onClick={() => onSelect(project)}
      className="original-project-card project-card group"
    >
      <div className="project-photo">
        <Image
          src={project.src}
          alt={t(project.alt)}
          fill
          sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1199px) 50vw, 384px"
          className="object-cover"
          style={{ objectPosition: project.objectPosition }}
        />
        <div className="project-photo-shade" />
        <span className="project-category">{t(project.category)}</span>
        <span className="project-number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="glass-project-caption project-copy">
        <span className="project-eyebrow">{t(project.eyebrow)}</span>
        <h3>{t(project.title)}</h3>
        <p>{t(project.summary)}</p>
        <div className="project-card-link">
          <span>{t("Ver detalhes do treinamento")}</span>
          <span className="project-arrow">
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </div>
      </div>
    </button>
  )
}
