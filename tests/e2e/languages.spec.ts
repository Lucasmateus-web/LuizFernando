import { test, expect } from "@playwright/test"
import { projects } from "../../src/features/home/data/projects"
import { trainings } from "../../src/features/home/data/trainings"
import { certifications, stats } from "../../src/features/home/data/profile"
import { roles } from "../../src/features/home/data/hero"
import { translations } from "../../src/features/home/data/translations"

test("conteúdo dos treinamentos tem tradução nos três idiomas adicionais", () => {
  const copy = [
    ...projects.flatMap((p) => [
      p.alt,
      p.title,
      p.category,
      p.eyebrow,
      p.summary,
      p.description,
      ...p.highlights,
    ]),
    ...trainings.flatMap((t) => [t.alt, t.title, t.subtitle]),
    ...certifications.filter((c) => c !== "Black Hawk - 97"),
    ...stats.map((s) => s.label),
    ...roles,
  ]
  for (const text of copy) {
    expect(translations[text], text).toHaveLength(3)
    for (const value of translations[text]) expect(value.trim().length, text).toBeGreaterThan(0)
  }
})

for (const locale of [
  { code: "pt", lang: "pt-BR", heading: "Atuações", cta: "Solicitar esse treinamento" },
  { code: "es", lang: "es", heading: "Actuaciones", cta: "Solicitar esta capacitación" },
  { code: "en", lang: "en", heading: "Fieldwork", cta: "Request this training" },
  { code: "zh", lang: "zh-Hans", heading: "现场实践", cta: "咨询此项培训" },
]) {
  test(`idioma ${locale.code}: troca, persistência, projetos e modal responsivos`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto("/")
    await expect(page.locator('[aria-label="Tela de boas-vindas"]')).toHaveCount(0, {
      timeout: 12000,
    })
    await page.locator(".language-trigger").click()
    await page.locator(`.language-option[data-locale="${locale.code}"]`).click()
    await expect(page.locator("html")).toHaveAttribute("lang", locale.lang)
    await expect(page.locator("#projetos h2")).toContainText(locale.heading)
    for (const width of [320, 768, 1024, 1440, 2560]) {
      await page.setViewportSize({ width, height: 900 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
      const header = await page.locator(".glass-header-shell").evaluate((el) => {
        const controls = Array.from(
          el.querySelectorAll(
            ":scope > a, :scope > nav, .language-switcher, .header-actions > button",
          ),
        ).filter((child) => getComputedStyle(child).display !== "none")
        return controls
          .map((child) => {
            const rect = child.getBoundingClientRect()
            return { left: rect.left, right: rect.right }
          })
          .sort((a, b) => a.left - b.left)
      })
      for (let i = 1; i < header.length; i++)
        expect(header[i].left).toBeGreaterThanOrEqual(header[i - 1].right - 1)
      const card = page.locator(".project-card").first()
      await card.scrollIntoViewIfNeeded()
      await expect(card).toHaveCSS("opacity", "1")
      await expect(card).toHaveCSS("cursor", "pointer")
      const captionFits = await card.evaluate((el) => {
        const caption = el.querySelector(".project-copy")!
        return (
          caption.scrollHeight <= caption.clientHeight + 1 &&
          caption.scrollWidth <= caption.clientWidth + 1
        )
      })
      expect(captionFits).toBe(true)
      if (width === 320 || width === 1440)
        await page.screenshot({ path: testInfo.outputPath(`projects-${locale.code}-${width}.png`) })
    }
    await page.setViewportSize({ width: 320, height: 640 })
    await page.locator(".project-card").first().click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await dialog.getByRole("link", { name: locale.cta }).scrollIntoViewIfNeeded()
    await expect(dialog.getByRole("link", { name: locale.cta })).toBeInViewport()
    await page.keyboard.press("Escape")
    await expect(dialog).toHaveCount(0)
    await page.reload()
    await expect(page.locator("html")).toHaveAttribute("lang", locale.lang)
    await expect(page.locator(".language-trigger")).toHaveAttribute("data-locale", locale.code)
  })
}

test("scroll revela conteúdo e respeita movimento reduzido", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator('[aria-label="Tela de boas-vindas"]')).toHaveCount(0, {
    timeout: 12000,
  })
  const heading = page.locator(".projects-heading")
  await heading.scrollIntoViewIfNeeded()
  await expect(heading).toHaveCSS("opacity", "1")
  await expect(heading).toHaveClass(/scroll-revealed/)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(page.locator(".scroll-pending")).toHaveCount(0)
  await expect(heading).toHaveCSS("animation-name", "none")
})

test("controles funcionam por toque e têm cursor para mouse conectado", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page.locator('[aria-label="Tela de boas-vindas"]')).toHaveCount(0, {
    timeout: 12000,
  })
  const toggle = page.getByRole("button", { name: "Abrir menu" })
  await page.locator(".language-trigger").tap()
  await expect(page.locator(".language-menu")).toBeVisible()
  await page.getByRole("menuitemradio", { name: "English" }).tap()
  await expect(page.locator("html")).toHaveAttribute("lang", "en")
  await page.locator(".language-trigger").tap()
  await page.getByRole("menuitemradio", { name: "Português" }).tap()
  await expect(toggle).toHaveCSS("cursor", "pointer")
  await toggle.tap()
  await expect(page.locator("#mobile-navigation")).not.toHaveAttribute("inert")
  await page.locator('#mobile-navigation a[href="#projetos"]').tap()
  await page.locator(".project-card").first().tap()
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.getByRole("button", { name: "Fechar modal" }).tap()
  await expect(page.getByRole("dialog")).toHaveCount(0)
  await context.close()
})

test("seletor de idioma: teclado, fechamento e encaixe do menu", async ({ page }, testInfo) => {
  await page.goto("/")
  await expect(page.locator('[aria-label="Tela de boas-vindas"]')).toHaveCount(0, {
    timeout: 12000,
  })
  const trigger = page.locator(".language-trigger")
  await trigger.focus()
  await page.keyboard.press("ArrowDown")
  await expect(page.getByRole("menuitemradio", { name: "Português" })).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(page.getByRole("menuitemradio", { name: "English" })).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(trigger).toHaveAttribute("data-locale", "en")
  await expect(trigger).toBeFocused()
  await page.keyboard.press("ArrowUp")
  await expect(page.getByRole("menuitemradio", { name: "简体中文" })).toBeFocused()
  await page.keyboard.press("Home")
  await expect(page.getByRole("menuitemradio", { name: "Português" })).toBeFocused()
  await page.keyboard.press("End")
  await expect(page.getByRole("menuitemradio", { name: "简体中文" })).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("menu")).toHaveCount(0)
  await expect(trigger).toBeFocused()
  for (const size of [
    { width: 320, height: 640 },
    { width: 667, height: 375 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(size)
    await trigger.click()
    const menu = page.getByRole("menu")
    await expect(menu).toBeVisible()
    const rect = await menu.boundingBox()
    expect(rect!.x).toBeGreaterThanOrEqual(0)
    expect(rect!.x + rect!.width).toBeLessThanOrEqual(size.width)
    expect(rect!.y + rect!.height).toBeLessThanOrEqual(size.height)
    await expect(trigger).toHaveCSS("cursor", "pointer")
    await expect(trigger.locator("svg").first()).toHaveCSS("cursor", "pointer")
    await page.screenshot({ path: testInfo.outputPath(`language-menu-${size.width}.png`) })
    // The popup can cover the hero heading on narrow screens; use the page margin.
    await page.mouse.click(4, Math.min(size.height - 10, 200))
    await expect(menu).toHaveCount(0)
  }
  await trigger.click()
  await page.keyboard.press("Tab")
  await expect(page.getByRole("menu")).toHaveCount(0)
})
