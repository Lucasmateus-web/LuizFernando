"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "../hooks/use-language"
import Image from "next/image"
import { ArrowUpRight, Check, X } from "lucide-react"
import { whatsappTrainingUrl } from "@/shared/config/contact"
import { useOverlayEffects } from "@/shared/hooks/use-overlay-effects"
import type { Project } from "../types"

type ProjectDialogProps = { project: Project; onClose: () => void }

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDivElement>(null)
  useOverlayEffects(true, onClose)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true })
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return
      const items = dialog.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]')
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    dialog?.addEventListener("keydown", trap)
    return () => {
      dialog?.removeEventListener("keydown", trap)
      previous?.focus({ preventScroll: true })
    }
  }, [])
  return (
    <div className="glass-modal-backdrop project-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="original-project-modal project-detail"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="project-detail-header">
          <span>{t(project.category)}</span>
          <button
            type="button"
            className="project-detail-close"
            onClick={onClose}
            aria-label={t("Fechar modal")}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <div className="project-detail-layout">
          <div className="project-detail-photo">
            <Image
              src={project.src}
              alt={t(project.alt)}
              width={project.imageWidth}
              height={project.imageHeight}
              sizes="(max-width: 899px) 100vw, 60vw"
              priority
            />
          </div>
          <aside className="project-detail-copy">
            <p className="project-detail-eyebrow">{t(project.eyebrow)}</p>
            <h3 id="project-dialog-title">{t(project.title)}</h3>
            <p className="project-detail-description">{t(project.description)}</p>
            <ul className="project-detail-highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight}>
                  <span aria-hidden="true">
                    <Check size={14} />
                  </span>
                  <p>{t(highlight)}</p>
                </li>
              ))}
            </ul>
            <a
              href={whatsappTrainingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-cta"
            >
              <span>{t("Solicitar esse treinamento")}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </div>
  )
}
