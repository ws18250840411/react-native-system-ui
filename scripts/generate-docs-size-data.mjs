import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const ROOT = process.cwd()
const COMPONENTS_DIST = path.join(ROOT, 'dist/es/components')
const COMPONENTS_SRC = path.join(ROOT, 'src/components')
const OUTPUT_FILE = path.join(ROOT, 'docs/component-sizes.ts')

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
 */
export default `
  fs.writeFileSync(OUTPUT_FILE, header + JSON.stringify(sizes, null, 2))
  console.log(`Generated ${OUTPUT_FILE} with ${sizes.length} components (source: ${sourceLabel})`)
  if (targetDir === COMPONENTS_SRC) {
    console.log('Tip: Run "pnpm run build" then "pnpm run docs:update-size" for sizes from dist/es/components.')
  }
}

main()
