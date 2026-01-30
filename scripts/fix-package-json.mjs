import fs from 'node:fs'
import path from 'node:path'

const workspaceRoot = process.cwd()
const packageJsonPath = path.join(workspaceRoot, 'package.json')

const readJson = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'))
const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
}

const pkg = readJson(packageJsonPath)

const toTypesPath = target => {
  if (typeof target !== 'string') return undefined
  const next = target
    .replace('/dist/es/', '/dist/types/')
    .replace('/dist/cjs/', '/dist/types/')
    .replace(/\.js$/, '.d.ts')
  return next.endsWith('.d.ts') ? next : undefined
}

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

  if (exportKey !== './package.json' && !('types' in entry)) {
    const typesTarget = toTypesPath(entry['react-native'] ?? entry.import ?? entry.require ?? entry.default)
    if (typesTarget) {
      entry.types = typesTarget
    }
  }

  if ('import' in entry || 'require' in entry) {
    delete entry.default
  }

  const orderedEntry = {}
  if ('react-native' in entry) orderedEntry['react-native'] = entry['react-native']
  if ('types' in entry) orderedEntry.types = entry.types
  if ('import' in entry) orderedEntry.import = entry.import
  if ('require' in entry) orderedEntry.require = entry.require
  if ('default' in entry) orderedEntry.default = entry.default
  return orderedEntry
}

if (pkg.exports && typeof pkg.exports === 'object') {
  const nextExports = {}
  for (const [key, value] of Object.entries(pkg.exports)) {
    let entry = normalizeExport(value, key)
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

