"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { contact, whatsappTrainingUrl } from "@/shared/config/contact"
import { navigationLinks } from "@/shared/config/navigation"
import { useLanguage } from "../hooks/use-language"

export function Footer() {
  const { t } = useLanguage()
  const footerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        footer.classList.toggle("footer-in-view", entry.isIntersecting)
      },
      { threshold: 0.05 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])
  const socials = [
    { label: "Instagram", href: contact.instagram },
    { label: "LinkedIn", href: contact.linkedin },
    { label: "WhatsApp", href: whatsappTrainingUrl },
  ]
  return (
    <footer ref={footerRef} id="contato" className="site-footer scroll-mt-28">
      <div className="footer-container">
        <div className="footer-grid">
          <div data-scroll-reveal className="footer-brand">
            <a href="#" aria-label={t("Início")} className="footer-logo">
              <Image src="/logo.png" alt="CONS.TREIN" width={170} height={62} />
            </a>
            <p className="footer-tagline">
              {t("Segurança que")} {t("salva vidas")}.
            </p>
            <p>
              {t(
                "Especialista em treinamentos de segurança do trabalho, brigada de incêndio e consultoria técnica para empresas.",
              )}
            </p>
          </div>
          <nav data-scroll-reveal data-reveal-delay="60" aria-label={t("Navegação")}>
            <h3>{t("Navegação")}</h3>
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a className="footer-link" href={link.href}>
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div data-scroll-reveal data-reveal-delay="120">
            <h3>{t("Redes sociais")}</h3>
            <ul>
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    className="footer-link footer-social-link"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div data-scroll-reveal data-reveal-delay="180" className="footer-contact">
            <h3>{t("Contato")}</h3>
            <ul>
              <li>
                <a className="footer-link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a className="footer-link" href={`tel:+55${contact.phone.replace(/\D/g, "")}`}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <p>{t("Recife, Pernambuco — Brasil")}</p>
              </li>
            </ul>
          </div>
        </div>
        <div data-scroll-reveal className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {t("LF Treinamentos. Todos os direitos reservados.")}
          </p>
          <p>
            {t("Desenvolvido por")}{" "}
            <span className="footer-credit">
              FluxCode<span aria-hidden="true">.</span>
            </span>
          </p>
          <a href="#" className="footer-top">
            <span>{t("Voltar ao topo")}</span>
            <span className="footer-top-icon" aria-hidden="true">
              <ArrowUp size={18} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
