import { Header } from "./components/header"
import { Hero } from "./components/hero"
import { WelcomeScreen } from "./components/welcome-screen"
import { InfiniteCarousel } from "./components/infinite-carousel"
import { About } from "./components/about"
import { Projects } from "./components/projects"
import { Partners } from "./components/partners"
import { Footer } from "./components/footer"
import { LanguageProvider } from "./hooks/use-language"
import { ScrollEffects } from "./components/scroll-effects"
import { CustomCursor } from "./components/custom-cursor"

export function HomePage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <ScrollEffects />
        <CustomCursor />
        <WelcomeScreen />
        <Header />
        <Hero />
        <InfiniteCarousel />
        <About />
        <Projects />
        <Partners />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
