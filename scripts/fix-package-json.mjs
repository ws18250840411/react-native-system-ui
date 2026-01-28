import fs from 'node:fs'
import path from 'node:path'

const workspaceRoot = process.cwd()
const packageJsonPath = path.join(workspaceRoot, 'package.json')

const readJson = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'))
const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
}

const pkg = readJson(packageJsonPath)

const normalizeExport = value => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value

  const entry = { ...value }
  const rnTarget = entry.import ?? entry.default ?? entry.require
  if (typeof rnTarget === 'string') {
    entry['react-native'] = rnTarget
  } else {
    delete entry['react-native']
  }
  return entry
}

if (pkg.exports && typeof pkg.exports === 'object') {
  const nextExports = {}
  for (const [key, value] of Object.entries(pkg.exports)) {
    nextExports[key] = normalizeExport(value)
  }
  pkg.exports = nextExports
}

pkg['react-native'] = pkg.exports?.['.']?.import ?? './dist/es/index.js'

pkg.files = ['dist']

writeJson(packageJsonPath, pkg)

