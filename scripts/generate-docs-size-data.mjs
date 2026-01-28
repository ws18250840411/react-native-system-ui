import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const ROOT = process.cwd()
const DIST_DIR = path.join(ROOT, 'dist/es')
const SRC_DIR = path.join(ROOT, 'src/components')
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
        if (!EXCLUDED_DIRS.has(entry.name)) {
          stack.push(fullPath)
        }
        continue
      }
      if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        // Skip .d.ts
        if (entry.name.endsWith('.d.ts')) continue

        const content = fs.readFileSync(fullPath)
        if (useGzip) {
          size += zlib.gzipSync(content).length
        } else {
          size += content.length
        }
      }
    }
  }
  return size
}

const main = () => {
  const sizes = []

  // Prefer dist/es for gzipped size approximation
  const targetDir = fs.existsSync(DIST_DIR) ? DIST_DIR : SRC_DIR
  console.log(`Using ${targetDir} for size calculation`)

  if (!fs.existsSync(targetDir)) {
    console.error('Target directory not found')
    process.exit(1)
  }

  const entries = fs.readdirSync(targetDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (EXCLUDED_DIRS.has(entry.name)) continue

    const componentPath = path.join(targetDir, entry.name)
    const size = getDirSize(componentPath, true) // Gzipped

    if (size > 0) {
      sizes.push({
        name: entry.name,
        size: size
      })
    }
  }

  // Sort by size descending
  sizes.sort((a, b) => b.size - a.size)

  const sourceLabel = targetDir === DIST_DIR ? 'dist/es' : 'src/components'
  const header = `/**
 * 组件体积数据（由 scripts/generate-docs-size-data.mjs 生成）
 * 数据源: ${sourceLabel}
 * 口径: 各组件目录下 .ts/.tsx/.js 文件分别 gzip 后相加（字节），非实际打包单 chunk 体积。
 * 更接近真实体积请先执行 pnpm run build 再执行 pnpm run docs:update-size（将使用 dist/es）。
 */
export default `
  const content = header + JSON.stringify(sizes, null, 2)
  fs.writeFileSync(OUTPUT_FILE, content)
  console.log(`Generated ${OUTPUT_FILE} with ${sizes.length} components (source: ${sourceLabel})`)
  if (targetDir === SRC_DIR) {
    console.log('Tip: Run "pnpm run build" then "pnpm run docs:update-size" for sizes from built output (dist/es).')
  }
}

main()
