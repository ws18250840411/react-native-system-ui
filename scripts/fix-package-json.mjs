import fs from 'node:fs'
import path from 'node:path'

const workspaceRoot = process.cwd()
const packageJsonPath = path.join(workspaceRoot, 'package.json')

const readJson = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'))
const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
}

const pkg = readJson(packageJsonPath)

const normalizeExport = (value, exportKey) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value

  const entry = { ...value }
  const rnTarget = entry.import ?? entry.default ?? entry.require
  if (typeof rnTarget === 'string') {
    entry['react-native'] = rnTarget
  } else {
    delete entry['react-native']
  }

  const target = entry['react-native'] ?? entry.default ?? entry.import
  const srcComponentsMatch = typeof target === 'string' && target.startsWith('./src/components/') && target.endsWith('/index.ts')
  if (srcComponentsMatch && exportKey.startsWith('./') && exportKey !== '.' && !exportKey.includes('package.json')) {
    const name = exportKey.slice(2)
    return {
      'react-native': `./dist/es/components/${name}/index.js`,
      'import': `./dist/es/components/${name}/index.js`,
      'require': `./dist/cjs/components/${name}/index.js`,
      'default': `./dist/es/components/${name}/index.js`
    }
  }

  return entry
}

if (pkg.exports && typeof pkg.exports === 'object') {
  const nextExports = {}
  for (const [key, value] of Object.entries(pkg.exports)) {
    let entry = normalizeExport(value, key)
    if (entry && typeof entry === 'object' && 'default' in entry && ('import' in entry || 'require' in entry)) {
      const { default: d, ...rest } = entry
      entry = { ...rest, default: d }
    }
    nextExports[key] = entry
  }
  pkg.exports = nextExports
}

pkg['react-native'] = pkg.exports?.['.']?.import ?? './dist/es/index.js'

pkg.files = ['dist']

if (pkg.source && pkg.source.startsWith('./src/')) {
  delete pkg.source
}

writeJson(packageJsonPath, pkg)

