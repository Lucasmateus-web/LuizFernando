import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
  await expect(page.locator('[aria-label="Tela de boas-vindas"]')).toHaveCount(0, {
    timeout: 12000,
  })
})

test("cabeçalho alinhado e painel centralizado em todas as larguras móveis", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  for (const width of [320, 360, 390, 480, 667, 768, 1023]) {
    await page.setViewportSize({ width, height: 844 })
    const alignment = await page.locator(".glass-header-shell").evaluate((el) => {
      const box = el.getBoundingClientRect()
      const logo = el.querySelector("a")!.getBoundingClientRect()
      const language = el.querySelector(".language-trigger")!.getBoundingClientRect()
      const toggle = el.querySelector(".header-actions > button")!.getBoundingClientRect()
      return {
        barOffset: Math.abs(box.x + box.width / 2 - innerWidth / 2),
        groupOffset: Math.abs((language.left + toggle.right) / 2 - (box.x + box.width / 2)),
        logoCenter: Math.abs(logo.x + logo.width / 2 - (box.x + box.width / 2)),
        logoOffset: Math.abs(logo.y + logo.height / 2 - language.y - language.height / 2),
        centerDifference: Math.abs(language.y + language.height / 2 - toggle.y - toggle.height / 2),
        overlap: language.right > logo.left || logo.right > toggle.left,
        sameHeight: language.height === toggle.height,
      }
    })
    expect(alignment.barOffset).toBeLessThan(1)
    expect(alignment.groupOffset).toBeLessThan(1)
    expect(alignment.logoCenter).toBeLessThan(1)
    expect(alignment.logoOffset).toBeLessThan(1)
    expect(alignment.centerDifference).toBeLessThan(1)
    expect(alignment.overlap).toBe(false)
    expect(alignment.sameHeight).toBe(true)
    await page.getByRole("button", { name: "Abrir menu" }).click()
    const panel = await page.locator(".glass-mobile-panel").boundingBox()
    expect(Math.abs(panel!.x + panel!.width / 2 - width / 2)).toBeLessThan(1)
    if ([320, 390, 667].includes(width))
      await page.screenshot({ path: testInfo.outputPath(`centered-menu-${width}.png`) })
    await page.keyboard.press("Escape")
  }
})

test("borda percorre o botão e clique rola suavemente até os projetos", async ({ page }) => {
  const button = page.getByRole("button", { name: "Ver Projetos" })
  const initial = await button.evaluate((el) =>
    getComputedStyle(el, "::before").getPropertyValue("--projects-border-angle"),
  )
  await expect
    .poll(() =>
      button.evaluate((el) =>
        getComputedStyle(el, "::before").getPropertyValue("--projects-border-angle"),
      ),
    )
    .not.toBe(initial)
  await button.click()
  const positions = await page.evaluate(
    () =>
      new Promise<number[]>((resolve) => {
        const samples: number[] = []
        const sample = () => {
          samples.push(scrollY)
          if (samples.length === 12) resolve(samples)
          else requestAnimationFrame(sample)
        }
        requestAnimationFrame(sample)
      }),
  )
  expect(new Set(positions).size).toBeGreaterThan(2)
  await expect
    .poll(() =>
      page
        .locator("#projetos")
        .evaluate((el) =>
          Math.abs(
            el.getBoundingClientRect().top - parseFloat(getComputedStyle(el).scrollMarginTop),
          ),
        ),
    )
    .toBeLessThan(2)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(button).toHaveCSS("animation-name", "none")
  expect(await button.evaluate((el) => getComputedStyle(el, "::before").animationName)).toBe("none")
})
