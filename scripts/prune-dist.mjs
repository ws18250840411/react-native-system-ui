import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const packageJsonPath = path.join(root, 'package.json')
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

const targets = [
  { name: 'es', dir: path.join(distDir, 'es'), extensions: ['.js', '.jsx', '.mjs', '.cjs'] },
  { name: 'cjs', dir: path.join(distDir, 'cjs'), extensions: ['.js', '.jsx', '.mjs', '.cjs'] },
  { name: 'types', dir: path.join(distDir, 'types'), extensions: ['.d.ts', '.d.mts', '.d.cts'] },
]

const toPosixPath = (value) => value.split(path.sep).join('/')

const walkFiles = (dir, files = []) => {
  if (!fs.existsSync(dir)) return files
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(fullPath, files)
      continue
    }
    if (entry.isFile()) files.push(fullPath)
  }
  return files
}

const collectStrings = (value, acc = new Set()) => {
  if (typeof value === 'string') {
    acc.add(value)
    return acc
  }
  if (!value || typeof value !== 'object') return acc
  for (const child of Object.values(value)) collectStrings(child, acc)
  return acc
}

const collectEntryFiles = () => {
  const values = new Set([
    pkg.main,
    pkg.module,
    pkg.types,
    pkg['react-native'],
    ...collectStrings(pkg.exports),
  ].filter(Boolean))

  return Array.from(values)
    .filter((value) => value.startsWith('./dist/'))
    .map((value) => path.join(root, value.slice(2)))
    .filter((value) => fs.existsSync(value))
}

const resolveDependency = (fromFile, specifier, extensions, rootDir) => {
  if (!specifier.startsWith('.')) return null

  const base = path.resolve(path.dirname(fromFile), specifier)
  const candidates = [
    base,
    ...extensions.map((ext) => `${base}${ext}`),
    ...extensions.map((ext) => path.join(base, `index${ext}`)),
  ]

  for (const candidate of candidates) {
    if (!candidate.startsWith(rootDir)) continue
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return path.normalize(candidate)
  }

  return null
}

const dependencyPatterns = [
  /\b(?:import|export)\s+[^'"]*?\s+from\s+['"]([^'"]+)['"]/g,
  /\bimport\s*['"]([^'"]+)['"]/g,
  /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  /<reference\s+path=['"]([^'"]+)['"]/g,
]

const collectDependencies = (filePath, target) => {
  const text = fs.readFileSync(filePath, 'utf8')
  const deps = new Set()

  for (const pattern of dependencyPatterns) {
    pattern.lastIndex = 0
    let match
    while ((match = pattern.exec(text))) {
      const resolved = resolveDependency(filePath, match[1], target.extensions, target.dir)
      if (resolved) deps.add(resolved)
    }
  }

  if (filePath.endsWith('.d.ts')) {
    const mapFile = `${filePath}.map`
    if (fs.existsSync(mapFile)) deps.add(path.normalize(mapFile))
  }

  return deps
}

const removeEmptyDirectories = (dir) => {
  if (!fs.existsSync(dir)) return
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    removeEmptyDirectories(path.join(dir, entry.name))
  }
  if (dir === distDir) return
  if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir)
}

const formatSize = (size) => `${(size / 1024).toFixed(1)} KB`

const traceReachableFiles = (entryFiles, target) => {
  const reachable = new Set()
  const queue = [...entryFiles.filter((filePath) => filePath.startsWith(target.dir))]

  while (queue.length) {
    const current = queue.pop()
    if (!current || reachable.has(current) || !fs.existsSync(current)) continue
    reachable.add(current)

    for (const dep of collectDependencies(current, target)) {
      if (!reachable.has(dep)) queue.push(dep)
    }
  }

  return reachable
}

const entryFiles = collectEntryFiles()
const report = []

for (const target of targets) {
  if (!fs.existsSync(target.dir)) continue

  const allFiles = walkFiles(target.dir)
  const reachable = traceReachableFiles(entryFiles, target)
  let deletedCount = 0
  let deletedBytes = 0

  for (const filePath of allFiles) {
    if (reachable.has(filePath)) continue
    deletedCount += 1
    deletedBytes += fs.statSync(filePath).size
    fs.unlinkSync(filePath)
  }

  removeEmptyDirectories(target.dir)
  report.push({
    name: target.name,
    deletedCount,
    deletedBytes,
    keptCount: reachable.size,
  })
}

for (const item of report) {
  console.log(
    `prune-dist:${item.name} kept ${item.keptCount} files, deleted ${item.deletedCount} files (${formatSize(item.deletedBytes)})`
  )
}

removeEmptyDirectories(distDir)
