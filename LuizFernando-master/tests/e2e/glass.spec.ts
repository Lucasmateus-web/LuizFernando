import { test, expect } from "@playwright/test"

test("navegação aponta para seções existentes e hero mantém a identidade", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("region", { name: "Tela de boas-vindas" })).toHaveCount(0, {
    timeout: 12000,
  })
  await expect(page.locator("h1")).toHaveText("CONS.TREIN")
  await expect(page.locator(".original-hero video")).toHaveCount(2)
  const hrefs = await page
    .locator('header a[href^="#"], footer a[href^="#"]')
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")!).filter((href) => href !== "#"),
    )
  for (const href of new Set(hrefs)) await expect(page.locator(href)).toHaveCount(1)
})

test("vidro oferece superfície opaca com redução de transparência", async ({ page }) => {
  const client = await page.context().newCDPSession(page)
  await client.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
  })
  await page.goto("/")
  await expect(page.getByRole("region", { name: "Tela de boas-vindas" })).toHaveCount(0, {
    timeout: 12000,
  })
  const material = await page
    .locator(".glass-training-caption")
    .first()
    .evaluate((el) => ({
      blur: getComputedStyle(el).backdropFilter,
      color: getComputedStyle(el).backgroundColor,
    }))
  expect(material.blur).toBe("none")
  expect(material.color).toMatch(/^rgb\(/)
  await expect(page.locator(".glass-action-brand").first()).toBeVisible()
})

test("movimento reduzido e foco visível preservam os controles", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await expect(page.getByRole("region", { name: "Tela de boas-vindas" })).toHaveCount(0, {
    timeout: 12000,
  })
  const button = page.getByRole("button", { name: "Ver Projetos" })
  await button.focus()
  await expect(button).toBeFocused()
  expect(await button.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none")
  expect(
    await page.locator(".glass-scroll-button").evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none")
  await page.keyboard.press("Enter")
  await expect(page.locator("#projetos")).toBeInViewport()
})

test("Liquid Glass fica restrito ao carrossel de imagens", async ({ page }) => {
  await page.goto("/")
  const caption = page.locator("#carrossel .glass-training-caption").first()
  expect(await caption.evaluate((el) => getComputedStyle(el).backdropFilter)).toContain("blur")
  for (const selector of [
    ".glass-header-shell",
    ".glass-project-caption",
    ".glass-panel",
    ".glass-stats",
  ]) {
    const material = await page
      .locator(selector)
      .first()
      .evaluate((el) => ({
        variable: getComputedStyle(el).getPropertyValue("--glass-caption"),
        blur: getComputedStyle(el).backdropFilter,
      }))
    expect(material.variable).toBe("")
    expect(material.blur).toBe(selector === ".glass-stats" ? "blur(8px)" : "none")
  }
})
