import { copyFile, mkdir } from "node:fs/promises"

const destination = new URL("../public/fonts/", import.meta.url)
await mkdir(destination, { recursive: true })

for (const [family, license] of [
  ["outfit", "OFL-outfit.txt"],
  ["plus-jakarta-sans", "OFL-plus-jakarta-sans.txt"],
]) {
  const source = new URL(`../node_modules/@fontsource-variable/${family}/`, import.meta.url)
  await copyFile(
    new URL(`files/${family}-latin-wght-normal.woff2`, source),
    new URL(`${family}-latin.woff2`, destination),
  )
  await copyFile(new URL("LICENSE", source), new URL(license, destination))
}
console.log("Fontes locais e licenças sincronizadas.")
