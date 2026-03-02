/**
 * 根据 src/components 目录生成 package.json 的 exports 子路径，便于维护。
 * 在 postbuild 中先执行本脚本再执行 fix-package-json.mjs。
 */
import fs from 'node:fs'
import path from 'node:path'

const workspaceRoot = process.cwd()
const packageJsonPath = path.join(workspaceRoot, 'package.json')
const componentsDir = path.join(workspaceRoot, 'src', 'components')

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

const specialKeys = new Set([
  '.',
  './design-system',
  './hooks',
  './text',
  './nativewind',
  './package.json',
])

function getComponentNames() {
  if (!fs.existsSync(componentsDir)) return []
  return fs.readdirSync(componentsDir).filter((name) => {
    const dir = path.join(componentsDir, name)
    return fs.statSync(dir).isDirectory() && fs.existsSync(path.join(dir, 'index.ts'))
  })
}

function buildComponentExport(name) {
  return {
    'react-native': `./dist/es/components/${name}/index.js`,
    types: `./dist/types/components/${name}/index.d.ts`,
    import: `./dist/es/components/${name}/index.js`,
    require: `./dist/cjs/components/${name}/index.js`,
  }
}

const existing = pkg.exports || {}
const next = {}

for (const key of Object.keys(existing)) {
  if (specialKeys.has(key)) next[key] = existing[key]
}

for (const name of getComponentNames()) {
  const key = `./${name}`
  // Always normalize component subpath exports to the latest shape.
  // This prevents stale entries (missing `types` or containing `default`) from persisting.
  next[key] = buildComponentExport(name)
}

pkg.exports = next
fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`)
