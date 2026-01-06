import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DOC_PATH = path.join(ROOT, '.trae/documents/组件体积大小清单.md')
const COMPONENTS_DIR = path.join(ROOT, 'src/components')

const INCLUDED_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json'])
const EXCLUDED_DIRS = new Set(['__tests__', '__snapshots__', 'demo'])

const formatKiB = bytes => (bytes / 1024).toFixed(1)

const walkSize = dir => {
  let total = 0
  const stack = [dir]
  while (stack.length) {
    const current = stack.pop()
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.has(entry.name)) continue
        stack.push(path.join(current, entry.name))
        continue
      }
      if (!entry.isFile()) continue
      if (entry.name.endsWith('.d.ts') || entry.name.endsWith('.d.tsx')) continue
      const ext = path.extname(entry.name)
      if (!INCLUDED_EXTS.has(ext)) continue
      const stat = fs.statSync(path.join(current, entry.name))
      total += stat.size
    }
  }
  return total
}

const getCurrentSizes = () => {
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  const result = {}
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    result[entry.name] = walkSize(path.join(COMPONENTS_DIR, entry.name))
  }
  return result
}

const currentSizes = getCurrentSizes()
const totalBytes = Object.values(currentSizes).reduce((sum, value) => sum + value, 0)

const raw = fs.readFileSync(DOC_PATH, 'utf8')
const lines = raw.split(/\r?\n/)

const updatedLines = lines.map(line => {
  if (line.startsWith('当前总计：')) {
    return `当前总计：${totalBytes} bytes（约 ${formatKiB(totalBytes)} KiB）`
  }

  if (!line.startsWith('|')) return line
  if (line.includes('---')) return line
  if (line.includes('基准 Bytes')) return line

  const cells = line.split('|').map(cell => cell.trim())
  if (cells.length < 8) return line

  const component = cells[2]
  const baselineBytes = Number.parseInt(cells[3], 10)
  if (!Number.isFinite(baselineBytes)) return line

  const currentBytes = currentSizes[component]
  if (!Number.isFinite(currentBytes)) return line

  const baselineKiB = cells[4]
  const reduceBytes = baselineBytes - currentBytes

  return `| ${cells[1]} | ${component} | ${baselineBytes} | ${baselineKiB} | ${currentBytes} | ${formatKiB(currentBytes)} | ${reduceBytes} |`
})

fs.writeFileSync(DOC_PATH, updatedLines.join('\n'))
console.log('Updated', path.relative(ROOT, DOC_PATH))
