import { chromium } from "@playwright/test"
import fs from "node:fs"

;(async () => {
  const directory = "artifacts/screenshots/glass"
  fs.mkdirSync(directory, { recursive: true })
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))
    await page.goto(process.env.SITE_URL || "http://localhost:3000")
    await page
      .getByRole("region", { name: "Tela de boas-vindas" })
      .waitFor({ state: "detached", timeout: 12000 })
    await page.evaluate(() => document.fonts.ready)
    const capture = async (name) => {
      await page.waitForTimeout(350)
      return page.screenshot({ path: `${directory}/${name}.png` })
    }
    const scrollTo = (selector) =>
      page
        .locator(selector)
        .evaluate((element) => element.scrollIntoView({ behavior: "instant", block: "start" }))
    await capture("desktop")
    for (const [selector, name] of [
      ["#carrossel", "training"],
      ["#sobre", "about"],
      ["#projetos", "projects"],
      ["footer", "footer"],
    ]) {
      await scrollTo(selector)
      await capture(name)
    }
    await page.locator(".original-project-card").first().click()
    await capture("modal-desktop")
    await page.keyboard.press("Escape")
    await page.setViewportSize({ width: 390, height: 844 })
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }))
    await page.waitForTimeout(350)
    await capture("mobile")
    await page.getByRole("button", { name: "Abrir menu" }).click()
    await page.waitForTimeout(350)
    await capture("mobile-menu")
    await page.keyboard.press("Escape")
    await scrollTo("#projetos")
    await capture("mobile-projects")
    await page.locator(".original-project-card").first().click()
    await capture("modal-mobile")
    console.log(
      JSON.stringify(
        {
          errors,
          fonts: await page.evaluate(() =>
            Array.from(document.fonts).map((font) => ({
              family: font.family,
              weight: font.weight,
              status: font.status,
            })),
          ),
        },
        null,
        2,
      ),
    )
    if (errors.length) process.exitCode = 1
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
