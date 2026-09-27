import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "@/styles/index.css"
import "@/styles/interactions.css"

export const metadata: Metadata = {
  title: "Luiz Fernando | Bombeiro Civil & Instrutor de Segurança",
  description:
    "Bombeiro Civil especialista em treinamentos, consultoria e segurança do trabalho. Serviços de primeiros socorros, treinamentos NR, brigada de incêndio e mais.",
  generator: "v0.app",
  keywords: [
    "bombeiro civil",
    "treinamento NR",
    "brigada de incêndio",
    "segurança do trabalho",
    "primeiros socorros",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
