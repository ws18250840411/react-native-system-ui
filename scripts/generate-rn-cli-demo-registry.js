const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const rndocConfigPath = path.join(repoRoot, 'rndoc.config.ts')
const docsComponentsDir = path.join(repoRoot, 'docs', 'components')
const outputPath = path.join(repoRoot, 'RnSystemUiCli', 'demo', 'registry.ts')

const toPosixPath = value => value.split(path.sep).join('/')

const upperFirst = value => (value ? value[0].toUpperCase() + value.slice(1) : '')

const toPascalCase = value =>
  value
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map(part => upperFirst(part))
    .join('')

const safeIdentifier = value => {
  const normalized = value.replace(/[^a-zA-Z0-9_$]/g, '_')
  return /^[a-zA-Z_$]/.test(normalized) ? normalized : `_${normalized}`
}

const parseMenus = source => {
  const match = source.match(/menus:\s*({[\s\S]*?})\s*,\s*vite:/)
  if (!match) {
    throw new Error('无法在 rndoc.config.ts 中解析 menus 配置。')
  }

  let jsonText = match[1]

  jsonText = jsonText
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_, raw) =>
      JSON.stringify(raw.replace(/\\'/g, "'")),
    )
    .replace(/(\w+)\s*:/g, '"$1":')
    .replace(/,\s*([}\]])/g, '$1')

  return JSON.parse(jsonText)
}

const parseDocs = mdSource => {
  const titleMatch = mdSource.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1].trim() : ''

  const demos = []
  const codeTags = mdSource.matchAll(/<code\b[^>]*>/g)
  for (const match of codeTags) {
    const tag = match[0]
    const srcMatch = tag.match(/\bsrc="([^"]+)"/) ?? tag.match(/\bsrc='([^']+)'/)
    if (!srcMatch) continue
    const titleMatch = tag.match(/\btitle="([^"]+)"/) ?? tag.match(/\btitle='([^']+)'/)

    const src = srcMatch[1]
    const demoTitle = titleMatch ? titleMatch[1] : path.basename(src, path.extname(src))
    const demoFileBase = path.basename(src, path.extname(src))
    demos.push({
      id: demoFileBase,
      title: demoTitle,
      src,
    })
  }

  return { title, demos }
}

const rnDemoOverrides = {
  uploader: {
    base: path.join(repoRoot, 'RnSystemUiCli', 'demo', 'overrides', 'uploader', 'base.tsx'),
    upload: path.join(repoRoot, 'RnSystemUiCli', 'demo', 'overrides', 'uploader', 'upload.tsx'),
    limit: path.join(repoRoot, 'RnSystemUiCli', 'demo', 'overrides', 'uploader', 'limit.tsx'),
    preview: path.join(repoRoot, 'RnSystemUiCli', 'demo', 'overrides', 'uploader', 'preview.tsx'),
    close: path.join(repoRoot, 'RnSystemUiCli', 'demo', 'overrides', 'uploader', 'close.tsx'),
    form: path.join(repoRoot, 'RnSystemUiCli', 'demo', 'overrides', 'uploader', 'form.tsx'),
  },
}

const buildImportPath = (fromFile, toFile) => {
  const relative = path.relative(path.dirname(fromFile), toFile)
  const normalized = toPosixPath(relative)
  const withoutExt = normalized.replace(/\.(tsx|ts|jsx|js)$/i, '')
  return withoutExt.startsWith('.') ? withoutExt : `./${withoutExt}`
}

const rndocConfig = fs.readFileSync(rndocConfigPath, 'utf8')
const menus = parseMenus(rndocConfig)
const groups = menus['/components']
if (!Array.isArray(groups)) {
  throw new Error('menus["/components"] 不是数组，无法生成 RN 菜单。')
}

/** @type {Record<string, { title: string, demos: Array<{id: string, title: string, importPath: string}> }>} */
const componentRegistry = {}
/** @type {Array<{ title: string, slugs: string[] }>} */
const menuGroups = []

for (const group of groups) {
  if (!group || typeof group !== 'object') continue
  const title = group.title
  const children = Array.isArray(group.children) ? group.children : []
  const slugs = children
    .map(route => String(route))
    .map(route => route.split('/').filter(Boolean).pop())
    .filter(Boolean)

  menuGroups.push({ title, slugs })

  for (const slug of slugs) {
    if (componentRegistry[slug]) continue
    const mdPath = path.join(docsComponentsDir, `${slug}.md`)
    if (!fs.existsSync(mdPath)) {
      componentRegistry[slug] = { title: slug, demos: [] }
      continue
    }

    const mdSource = fs.readFileSync(mdPath, 'utf8')
    const { title: componentTitle, demos } = parseDocs(mdSource)

    const mappedDemos = demos.map(demo => {
      const overridePath = rnDemoOverrides[slug]?.[demo.id]
      const absDemoPath = overridePath ?? path.resolve(path.dirname(mdPath), demo.src)
      const importPath = buildImportPath(outputPath, absDemoPath)
      return {
        id: demo.id,
        title: demo.title,
        importPath,
      }
    })

    componentRegistry[slug] = {
      title: componentTitle || slug,
      demos: mappedDemos,
    }
  }
}

const lines = []
lines.push('/* eslint-disable */')
lines.push('// 此文件由 scripts/generate-rn-demo-registry.js 自动生成，请勿手改。')
lines.push('')
lines.push("import type React from 'react'")
lines.push('')

lines.push('')
lines.push('export type DemoEntry = {')
lines.push('  id: string')
lines.push('  title: string')
lines.push('  getComponent: () => React.ComponentType<any>')
lines.push('}')
lines.push('')
lines.push('export type ComponentEntry = {')
lines.push('  title: string')
lines.push('  demos: DemoEntry[]')
lines.push('}')
lines.push('')
lines.push('export type MenuGroup = {')
lines.push('  title: string')
lines.push('  slugs: string[]')
lines.push('}')
lines.push('')

lines.push('export const menuGroups: MenuGroup[] = ' + JSON.stringify(menuGroups, null, 2))
lines.push('')

lines.push('export const componentRegistry: Record<string, ComponentEntry> = {')
for (const [slug, entry] of Object.entries(componentRegistry)) {
  lines.push(`  ${JSON.stringify(slug)}: {`)
  lines.push(`    title: ${JSON.stringify(entry.title)},`)
  lines.push('    demos: [')
  for (const demo of entry.demos) {
    if (!demo || typeof demo !== 'object') continue
    lines.push('      {')
    lines.push(`        id: ${JSON.stringify(demo.id)},`)
    lines.push(`        title: ${JSON.stringify(demo.title)},`)
    lines.push('        getComponent: () => {')
    lines.push(`          const mod = require(${JSON.stringify(demo.importPath)})`)
    lines.push('          return mod?.default ?? mod')
    lines.push('        },')
    lines.push('      },')
  }
  lines.push('    ],')
  lines.push('  },')
}
lines.push('}')
lines.push('')

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, lines.join('\n'), 'utf8')
console.log(`[rn-demos] generated: ${toPosixPath(path.relative(repoRoot, outputPath))}`)
