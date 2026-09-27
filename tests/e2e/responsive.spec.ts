import { test, expect } from "@playwright/test"
const widths = [320, 360, 390, 430, 480, 768, 1024, 1280, 1440, 1920]
for (const width of widths) {
  test(`visual original responsivo em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/")
    await expect(page.getByRole("region", { name: "Tela de boas-vindas" })).toHaveCount(0, {
      timeout: 12000,
    })
    await expect(page.locator("h1")).toHaveText("CONS.TREIN")
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const logo = await page.locator("header img").boundingBox()
    expect(logo!.x).toBeGreaterThanOrEqual(0)
    expect(logo!.x + logo!.width).toBeLessThanOrEqual(width)
    if (width < 1024) {
      const toggle = page.getByRole("button", { name: "Abrir menu" })
      await toggle.click()
      await expect(page.locator("#mobile-navigation")).not.toHaveAttribute("inert")
      await page.locator('#mobile-navigation a[href="#projetos"]').click()
      await expect(toggle).toHaveAttribute("aria-expanded", "false")
    }
    const cards = page.locator(".original-project-card")
    await expect(cards).toHaveCount(6)
    // A minimum card height must not force its aspect ratio beyond the grid track.
    const layout = await cards.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect()
        const grid = element.parentElement!.getBoundingClientRect()
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          gridLeft: grid.left,
          gridRight: grid.right,
        }
      }),
    )
    for (const [index, card] of layout.entries()) {
      expect(card.left).toBeGreaterThanOrEqual(card.gridLeft - 1)
      expect(card.right).toBeLessThanOrEqual(card.gridRight + 1)
      for (const other of layout.slice(index + 1)) {
        const overlaps =
          card.left < other.right &&
          card.right > other.left &&
          card.top < other.bottom &&
          card.bottom > other.top
        expect(overlaps).toBe(false)
      }
    }
    await cards.first().click()
    const modal = page.locator(".original-project-modal")
    await expect(modal).toBeVisible()
    const box = await modal.boundingBox()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.y).toBeGreaterThanOrEqual(0)
    expect(box!.y + box!.height).toBeLessThanOrEqual(901)
    await modal.getByRole("link", { name: "Solicitar esse treinamento" }).scrollIntoViewIfNeeded()
    await expect(modal.getByRole("link", { name: "Solicitar esse treinamento" })).toBeInViewport()
    await page.keyboard.press("Escape")
    await expect(modal).toHaveCount(0)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }))
    await page.screenshot({ path: testInfo.outputPath(`original-${width}.png`) })
  })
}
test("menu e modal funcionam em celular na horizontal", async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 375 })
  await page.goto("/")
  await expect(page.getByRole("region", { name: "Tela de boas-vindas" })).toHaveCount(0, {
    timeout: 12000,
  })
  await page.getByRole("button", { name: "Abrir menu" }).click()
  await page.locator('#mobile-navigation a[href="#contato"]').scrollIntoViewIfNeeded()
  await expect(page.locator('#mobile-navigation a[href="#contato"]')).toBeInViewport()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  )
  await page.locator(".original-project-card").first().click()
  const modal = page.locator(".original-project-modal")
  const box = await modal.boundingBox()
  expect(box!.height).toBeLessThanOrEqual(343)
  await modal.getByRole("link", { name: "Solicitar esse treinamento" }).scrollIntoViewIfNeeded()
  await expect(modal.getByRole("link", { name: "Solicitar esse treinamento" })).toBeInViewport()
})
