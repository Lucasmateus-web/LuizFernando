import { test, expect } from "@playwright/test"

test("animação suaviza a rolagem e termina de revelar ao descer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await expect(page.locator('[aria-label="Tela de boas-vindas"]')).toHaveCount(0, {
    timeout: 12000,
  })
  const heading = page.locator(".projects-heading")
  await heading.evaluate((element) => {
    const shift = new DOMMatrixReadOnly(getComputedStyle(element).transform).m42
    scrollTo({
      top: element.getBoundingClientRect().top + scrollY - shift - innerHeight * 0.8,
      behavior: "instant",
    })
  })
  const opacity = () => heading.evaluate((el) => Number(getComputedStyle(el).opacity))
  await expect.poll(opacity).toBeGreaterThan(0.2)
  expect(await opacity()).toBeLessThan(0.8)
  // Even an instant wheel-sized jump produces intermediate animation frames.
  await expect.poll(opacity).toBeGreaterThan(0.32)
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        let frames = 0
        const tick = () => (++frames >= 15 ? resolve() : requestAnimationFrame(tick))
        requestAnimationFrame(tick)
      }),
  )
  expect(await opacity()).toBeCloseTo(1 / 3, 2)
  await page.evaluate(() => scrollBy({ top: innerHeight * 0.4, behavior: "instant" }))
  await expect(heading).toHaveCSS("opacity", "1")
})

for (const width of [390, 1440]) {
  test(`conteúdo aparece ao percorrer a página em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto("/")
    await expect(page.locator('[aria-label="Tela de boas-vindas"]')).toHaveCount(0, {
      timeout: 12000,
    })
    const targets = page.locator("[data-scroll-reveal]")
    expect(await targets.count()).toBeGreaterThan(15)
    expect(await page.locator(".scroll-pending").count()).toBeGreaterThan(0)
    await expect(page.locator(".projects-heading")).toHaveCSS("opacity", "0")

    // Simulate continuous downward scrolling, rather than jumping to each target.
    await page.evaluate(async () => {
      for (let step = 0; step < 100; step++) {
        window.scrollBy({ top: innerHeight * 0.65, behavior: "instant" })
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        )
        if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) break
      }
    })
    await expect(page.locator(".scroll-pending")).toHaveCount(0)
    for (const element of await targets.all()) await expect(element).toHaveCSS("opacity", "1")
    await expect(page.locator(".projects-heading")).toHaveClass(/scroll-revealed/)
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }))
    // Read sections stay visible when scrolling back, without restarting animations.
    await expect(page.locator(".scroll-pending")).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}
