/**
 * 批量优化 demo 文件：
 * 1. 匿名导出 → 命名函数导出
 * 2. 双引号 import → 单引号
 * 3. 清理末尾多余空行
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, basename, dirname } from 'node:path'

const DOCS_DIR = new URL('../docs/components', import.meta.url).pathname

// kebab-case → PascalCase
function toPascal(str) {
  return str.replace(/(^|-)(\w)/g, (_, _sep, c) => c.toUpperCase())
}

// 从文件路径推导组件名
function deriveName(filePath) {
  const demoFile = basename(filePath, '.tsx') // e.g. "basic"
  const componentDir = basename(dirname(dirname(filePath))) // e.g. "action-sheet"
  const component = toPascal(componentDir)
  const demo = toPascal(demoFile)
  return `${component}${demo}Demo`
}

async function getAllDemoFiles(dir) {
  const results = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'demo') {
        const demoEntries = await readdir(full)
        for (const f of demoEntries) {
          if (f.endsWith('.tsx')) results.push(join(full, f))
        }
      } else {
        results.push(...await getAllDemoFiles(full))
      }
    }
  }
  return results
}

let changedCount = 0

async function processFile(filePath) {
  let content = await readFile(filePath, 'utf-8')
  const original = content
  const name = deriveName(filePath)

  // 1. 匿名箭头函数导出 → 命名函数导出
  // Pattern: export default () => { ... }  or  export default () => (...)
  if (/^export default \(\) =>/m.test(content)) {
    // export default () => (\n...\n)   — expression body
    content = content.replace(
      /^export default \(\) => \(/m,
      `export default function ${name}() {\n  return (`
    )
    // If we did expression → block, need to close the block
    if (content.includes(`function ${name}() {\n  return (`)) {
      // Find the matching closing paren+newline at module level and add }
      // The pattern is: closing ) at column 0, which is the end of the return(...)
      // We need to be careful: find the last `)` that's on its own line before EOF
      const lines = content.split('\n')
      // Find the line index of the function declaration
      const fnLineIdx = lines.findIndex(l => l.includes(`function ${name}()`))
      if (fnLineIdx >= 0) {
        // Find matching closing `)` — walk from end backwards
        for (let i = lines.length - 1; i > fnLineIdx; i--) {
          if (lines[i].trim() === ')') {
            lines[i] = '  )\n}'
            break
          }
        }
        content = lines.join('\n')
      }
    }

    // export default () => { ... }   — block body
    content = content.replace(
      /^export default \(\) => \{/m,
      `export default function ${name}() {`
    )
  }

  // 2. 双引号 → 单引号 (only for import statements)
  content = content.replace(
    /from "(react-native-system-ui|react-native|react)"/g,
    "from '$1'"
  )
  content = content.replace(
    /import (\w+) from "(react)"/g,
    "import $1 from '$2'"
  )
  // Also fix: import { xxx } from "react-native-system-ui"
  content = content.replace(
    /from "(\.\.?\/[^"]+)"/g,
    "from '$1'"
  )

  // 3. 清理末尾多余空行 (保留恰好一个换行)
  content = content.replace(/\n{3,}$/, '\n')
  // Ensure file ends with exactly one newline
  if (!content.endsWith('\n')) content += '\n'

  if (content !== original) {
    await writeFile(filePath, content, 'utf-8')
    changedCount++
    console.log(`  ✓ ${filePath.replace(DOCS_DIR + '/', '')}`)
  }
}

async function main() {
  const files = await getAllDemoFiles(DOCS_DIR)
  console.log(`Found ${files.length} demo files\n`)

  // Skip .css files and non-tsx files
  const tsxFiles = files.filter(f => f.endsWith('.tsx'))
  console.log(`Processing ${tsxFiles.length} .tsx files...\n`)

  for (const file of tsxFiles.sort()) {
    await processFile(file)
  }

  console.log(`\nDone! Changed ${changedCount} files.`)
}

main().catch(console.error)
