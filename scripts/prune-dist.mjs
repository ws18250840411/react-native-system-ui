import fs from 'node:fs'
import path from 'node:path'

const workspaceRoot = process.cwd()
const distDir = path.join(workspaceRoot, 'dist')

const isDtsFile = filePath => filePath.endsWith('.d.ts') || filePath.endsWith('.d.ts.map')

const walk = dir => {
  const entries = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath)
      continue
    }
    if (!entry.isFile()) continue
    if (isDtsFile(fullPath)) {
      fs.unlinkSync(fullPath)
    }
  }
}

walk(path.join(distDir, 'es'))
walk(path.join(distDir, 'cjs'))

