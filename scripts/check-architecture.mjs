import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url))
const relative = (file) => path.relative(sourceRoot, file).split(path.sep).join("/")
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(file) : /\.tsx?$/.test(file) ? [file] : []
  })
const graph = new Map()
const errors = []

for (const file of walk(sourceRoot)) {
  const origin = relative(file)
  const pure =
    origin.includes("/data/") || origin.endsWith("/types.ts") || origin.startsWith("shared/config/")
  const syntax = ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  )
  const imports = []
  const visit = (node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      imports.push(node.moduleSpecifier.text)
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    )
      imports.push(node.arguments[0].text)
    ts.forEachChild(node, visit)
  }
  visit(syntax)
  const edges = []

  for (const specifier of imports) {
    const local = specifier.startsWith("@/") || specifier.startsWith(".")
    if (!local) {
      if (pure) errors.push(`${origin}: dados e tipos não podem depender de ${specifier}`)
      continue
    }
    const target = specifier.startsWith("@/")
      ? path.join(sourceRoot, specifier.slice(2))
      : path.resolve(path.dirname(file), specifier)
    const resolved = [
      target,
      `${target}.ts`,
      `${target}.tsx`,
      path.join(target, "index.ts"),
      path.join(target, "index.tsx"),
    ].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
    if (!resolved) {
      errors.push(`${origin}: import não encontrado: ${specifier}`)
      continue
    }
    const dependency = relative(resolved)
    edges.push(dependency)
    if (dependency.startsWith("..")) errors.push(`${origin}: import fora de src: ${specifier}`)
    if (origin.startsWith("shared/") && !dependency.startsWith("shared/"))
      errors.push(`${origin}: shared não pode depender de ${dependency}`)
    if (origin.startsWith("features/") && dependency.startsWith("app/"))
      errors.push(`${origin}: features não pode depender de app`)
    if (
      pure &&
      !dependency.includes("/data/") &&
      !dependency.endsWith("/types.ts") &&
      !dependency.startsWith("shared/config/")
    )
      errors.push(`${origin}: dados e tipos não podem depender de ${dependency}`)
    if (origin.includes("/hooks/") && dependency.includes("/components/"))
      errors.push(`${origin}: hooks não podem depender dos componentes de apresentação`)
  }
  graph.set(origin, edges)
}

const visited = new Set()
const active = new Set()
function checkCycles(file) {
  if (active.has(file)) {
    errors.push(`Dependência circular envolvendo ${file}`)
    return
  }
  if (visited.has(file)) return
  active.add(file)
  for (const dependency of graph.get(file) || []) checkCycles(dependency)
  active.delete(file)
  visited.add(file)
}
for (const file of graph.keys()) checkCycles(file)

if (errors.length) {
  console.error(errors.join("\n"))
  process.exitCode = 1
} else {
  console.log(
    `Arquitetura validada: ${graph.size} módulos, imports resolvidos e nenhuma dependência circular ou inversão de camadas.`,
  )
}
