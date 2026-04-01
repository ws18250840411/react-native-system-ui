import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const ROOT = process.cwd()
const COMPONENTS_DIST = path.join(ROOT, 'dist/es/components')
const COMPONENTS_SRC = path.join(ROOT, 'src/components')
const OUTPUT_FILE = path.join(ROOT, 'docs/component-sizes.ts')
const README_FILE = path.join(ROOT, 'README.md')

const fmtKb = (bytes) => (Math.round(bytes / 102.4) / 10).toFixed(1)

const patchReadmeComponentSizes = (sizes) => {
  if (!fs.existsSync(README_FILE)) return
  let readme = fs.readFileSync(README_FILE, 'utf8')
  const markerStart = '<!-- docs:component-sizes:start -->'
  const markerEnd = '<!-- docs:component-sizes:end -->'
  const startIdx = readme.indexOf(markerStart)
  const endIdx = readme.indexOf(markerEnd)
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    console.warn('README.md: missing <!-- docs:component-sizes:start/end -->; skip README table sync')
    return
  }

  const sum = sizes.reduce((a, s) => a + s.size, 0)
  const avgKb = Math.round((sum / sizes.length / 1024) * 10) / 10
  const avgStr = avgKb.toFixed(1)
  const minBytes = sizes[sizes.length - 1].size
  const minStr = fmtKb(minBytes)

  const tableRows = []
  for (let i = 0; i < sizes.length; i += 3) {
    const a = sizes[i]
    const b = sizes[i + 1]
    const c = sizes[i + 2]
    tableRows.push(
      `| ${a.name} | ${fmtKb(a.size)} KB | ${b.name} | ${fmtKb(b.size)} KB | ${c.name} | ${fmtKb(c.size)} KB |`,
    )
  }

  const inner = `按需引入后单组件均值约 **${avgStr} KB**（各组件目录 gzip 相加估算，数据由 \`pnpm run build && pnpm run docs:update-size\` 生成；**本段与下表由 scripts/generate-docs-size-data.mjs 自动生成，请勿手工改数字**）。支持 Tree Shaking，实际打包体积以构建结果为准。

| 组件 | gzip | 组件 | gzip | 组件 | gzip |
| --- | ---: | --- | ---: | --- | ---: |
${tableRows.join('\n')}`

  readme =
    readme.slice(0, startIdx + markerStart.length) +
    '\n' +
    inner +
    '\n' +
    readme.slice(endIdx)

  readme = readme.replace(/单组件均值 \*\*[\d.]+ KB gzip\*\*/, `单组件均值 **${avgStr} KB gzip**`)
  readme = readme.replace(
    /单组件平均 gzip 仅 \*\*[\d.]+ KB\*\*，最小组件（SafeAreaView）仅 \*\*[\d.]+ KB\*\*/,
    `单组件平均 gzip 仅 **${avgStr} KB**，最小组件（SafeAreaView）仅 **${minStr} KB**`,
  )

  fs.writeFileSync(README_FILE, readme)
  console.log(`Updated ${path.relative(ROOT, README_FILE)} (avg ${avgStr} KB gzip, min ${minStr} KB)`)
}

const EXCLUDED_DIRS = new Set(['__tests__', '__snapshots__', 'demo', 'style', 'test'])

const getDirSize = (dir, useGzip = true) => {
  let size = 0
  if (!fs.existsSync(dir)) return 0
  const stack = [dir]
  while (stack.length) {
    const current = stack.pop()
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        if (!EXCLUDED_DIRS.has(entry.name)) stack.push(fullPath)
        continue
      }
      if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        if (entry.name.endsWith('.d.ts')) continue
        const content = fs.readFileSync(fullPath)
        size += useGzip ? zlib.gzipSync(content).length : content.length
      }
    }
  }
  return size
}

const main = () => {
  const targetDir = fs.existsSync(COMPONENTS_DIST) ? COMPONENTS_DIST : COMPONENTS_SRC
  console.log(`Using ${targetDir} for component size calculation`)

  if (!fs.existsSync(targetDir)) {
    console.error('Components directory not found')
    process.exit(1)
  }

  const sizes = []
  const entries = fs.readdirSync(targetDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (EXCLUDED_DIRS.has(entry.name)) continue
    const componentPath = path.join(targetDir, entry.name)
    const size = getDirSize(componentPath, true)
    if (size > 0) sizes.push({ name: entry.name, size })
  }

  sizes.sort((a, b) => b.size - a.size)

  const sourceLabel = targetDir === COMPONENTS_DIST ? 'dist/es/components' : 'src/components'
  const header = `/**
 * 组件体积数据（由 scripts/generate-docs-size-data.mjs 生成，以组件为主）
 * 数据源: ${sourceLabel}
 * 口径: 各组件目录下 .ts/.tsx/.js 文件分别 gzip 后相加（字节），非实际打包单 chunk 体积。
 * 先执行 pnpm run build 再执行 pnpm run docs:update-size 将使用 dist/es/components。
 * 同命令会同步 README.md 中 <!-- docs:component-sizes:start/end --> 内表格及文首/「核心优势」中的均值与最小组件体积。
 */
export default `
  fs.writeFileSync(OUTPUT_FILE, header + JSON.stringify(sizes, null, 2))
  console.log(`Generated ${OUTPUT_FILE} with ${sizes.length} components (source: ${sourceLabel})`)
  patchReadmeComponentSizes(sizes)
  if (targetDir === COMPONENTS_SRC) {
    console.log('Tip: Run "pnpm run build" then "pnpm run docs:update-size" for sizes from dist/es/components.')
  }
}

main()
