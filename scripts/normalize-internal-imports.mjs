import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const root = process.cwd()
const srcDir = path.join(root, 'src')
const checkMode = process.argv.includes('--check')
const sourceExtensions = ['.ts', '.tsx', '.mts', '.cts', '.d.ts', '.d.mts', '.d.cts']
const barrelEntries = [
  ['utils', path.join(srcDir, 'utils', 'index.ts')],
  ['hooks', path.join(srcDir, 'hooks', 'index.ts')],
  ['design-system', path.join(srcDir, 'design-system', 'index.ts')],
  ['platform', path.join(srcDir, 'platform', 'index.ts')],
]

const sourceFileCache = new Map()
const exportMapCache = new Map()

const toPosixPath = (value) => value.split(path.sep).join('/')

const stripSourceExtension = (filePath) =>
  filePath.replace(/(\.d)?\.[cm]?[jt]sx?$/, '')

const toImportSpecifier = (fromFile, targetFile) => {
  const raw = stripSourceExtension(targetFile)
  const withoutIndex = path.basename(raw) === 'index' ? path.dirname(raw) : raw
  const relative = path.relative(path.dirname(fromFile), withoutIndex)
  const normalized = toPosixPath(relative)
  return normalized.startsWith('.') ? normalized : `./${normalized}`
}

const resolveSourceModule = (fromFile, specifier) => {
  if (!specifier.startsWith('.')) return null

  const base = path.resolve(path.dirname(fromFile), specifier)
  const candidates = [
    base,
    ...sourceExtensions.map((ext) => `${base}${ext}`),
    ...sourceExtensions.map((ext) => path.join(base, `index${ext}`)),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return path.normalize(candidate)
    }
  }

  return null
}

const readSourceFile = (filePath) => {
  const normalized = path.normalize(filePath)
  if (sourceFileCache.has(normalized)) return sourceFileCache.get(normalized)

  const text = fs.readFileSync(normalized, 'utf8')
  const sourceFile = ts.createSourceFile(normalized, text, ts.ScriptTarget.Latest, true, normalized.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const cached = { text, sourceFile }
  sourceFileCache.set(normalized, cached)
  return cached
}

const hasModifier = (node, kind) => node.modifiers?.some((modifier) => modifier.kind === kind)

const isDefaultExportNode = (node) =>
  hasModifier(node, ts.SyntaxKind.ExportKeyword) && hasModifier(node, ts.SyntaxKind.DefaultKeyword)

const collectBindingNames = (name, names = []) => {
  if (ts.isIdentifier(name)) {
    names.push(name.text)
    return names
  }

  if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
    for (const element of name.elements) {
      if (ts.isOmittedExpression(element)) continue
      collectBindingNames(element.name, names)
    }
  }

  return names
}

const collectExports = (filePath) => {
  const normalized = path.normalize(filePath)
  if (exportMapCache.has(normalized)) return exportMapCache.get(normalized)

  const exportsMap = new Map()
  exportMapCache.set(normalized, exportsMap)

  const { sourceFile } = readSourceFile(normalized)

  for (const statement of sourceFile.statements) {
    if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) {
      if (!hasModifier(statement, ts.SyntaxKind.ExportKeyword)) continue
      if (isDefaultExportNode(statement)) {
        exportsMap.set('default', { targetFile: normalized, importName: 'default' })
      } else if (statement.name) {
        exportsMap.set(statement.name.text, { targetFile: normalized, importName: statement.name.text })
      }
      continue
    }

    if (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isEnumDeclaration(statement)) {
      if (!hasModifier(statement, ts.SyntaxKind.ExportKeyword) || !statement.name) continue
      exportsMap.set(statement.name.text, { targetFile: normalized, importName: statement.name.text })
      continue
    }

    if (ts.isVariableStatement(statement)) {
      if (!hasModifier(statement, ts.SyntaxKind.ExportKeyword)) continue
      for (const declaration of statement.declarationList.declarations) {
        for (const name of collectBindingNames(declaration.name)) {
          exportsMap.set(name, { targetFile: normalized, importName: name })
        }
      }
      continue
    }

    if (ts.isExportAssignment(statement)) {
      exportsMap.set('default', { targetFile: normalized, importName: 'default' })
      continue
    }

    if (!ts.isExportDeclaration(statement)) continue

    const moduleSpecifier = statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
      ? statement.moduleSpecifier.text
      : null

    if (!moduleSpecifier) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) {
          const exportedName = element.name.text
          const importName = element.propertyName?.text || exportedName
          exportsMap.set(exportedName, { targetFile: normalized, importName })
        }
      }
      continue
    }

    const targetFile = resolveSourceModule(normalized, moduleSpecifier)
    if (!targetFile) continue

    if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
      const targetExports = collectExports(targetFile)
      for (const element of statement.exportClause.elements) {
        const exportedName = element.name.text
        const importedName = element.propertyName?.text || exportedName
        if (importedName === 'default') {
          exportsMap.set(exportedName, { targetFile, importName: 'default' })
          continue
        }
        exportsMap.set(exportedName, targetExports.get(importedName) || { targetFile, importName: importedName })
      }
      continue
    }

    if (!statement.exportClause) {
      const targetExports = collectExports(targetFile)
      for (const [name, info] of targetExports) {
        if (name === 'default' || exportsMap.has(name)) continue
        exportsMap.set(name, info)
      }
    }
  }

  return exportsMap
}

const barrelMap = new Map(
  barrelEntries.map(([name, entryPath]) => [
    path.normalize(entryPath),
    { name, exportMap: collectExports(entryPath) },
  ])
)

const buildImportStatement = (moduleSpecifier, group) => {
  const namedFragments = group.named.map(({ importedName, localName, isTypeOnly }) => {
    const binding = importedName === localName ? importedName : `${importedName} as ${localName}`
    return isTypeOnly && !group.allNamedTypeOnly ? `type ${binding}` : binding
  })

  if (group.defaultImport) {
    if (group.defaultImport.isTypeOnly && group.named.length) {
      const defaultLine = `import type ${group.defaultImport.localName} from '${moduleSpecifier}'`
      const namedLine = buildImportStatement(moduleSpecifier, {
        defaultImport: null,
        named: group.named,
        allNamedTypeOnly: group.allNamedTypeOnly,
      })
      return [defaultLine, namedLine]
    }

    const prefix = group.defaultImport.isTypeOnly && group.named.length === 0 ? 'import type' : 'import'
    const clause = namedFragments.length
      ? `${group.defaultImport.localName}, { ${namedFragments.join(', ')} }`
      : group.defaultImport.localName
    return [`${prefix} ${clause} from '${moduleSpecifier}'`]
  }

  if (!namedFragments.length) return []

  const prefix = group.allNamedTypeOnly ? 'import type' : 'import'
  return [`${prefix} { ${namedFragments.join(', ')} } from '${moduleSpecifier}'`]
}

const rewriteImportDeclaration = (filePath, statement) => {
  const moduleSpecifier = statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
    ? statement.moduleSpecifier.text
    : null
  if (!moduleSpecifier || !statement.importClause) return null

  const resolved = resolveSourceModule(filePath, moduleSpecifier)
  const barrel = resolved ? barrelMap.get(resolved) : null
  if (!barrel) return null

  if (statement.importClause.name) {
    console.warn(`skip default import from barrel: ${toPosixPath(path.relative(root, filePath))}`)
    return null
  }

  if (!statement.importClause.namedBindings || !ts.isNamedImports(statement.importClause.namedBindings)) {
    console.warn(`skip namespace import from barrel: ${toPosixPath(path.relative(root, filePath))}`)
    return null
  }

  const groups = new Map()
  const unresolved = []

  for (const element of statement.importClause.namedBindings.elements) {
    const requestedName = element.propertyName?.text || element.name.text
    const target = barrel.exportMap.get(requestedName)
    if (!target) {
      unresolved.push(requestedName)
      continue
    }

    const targetSpecifier = toImportSpecifier(filePath, target.targetFile)
    if (!groups.has(targetSpecifier)) {
      groups.set(targetSpecifier, {
        defaultImport: null,
        named: [],
        allNamedTypeOnly: true,
      })
    }

    const group = groups.get(targetSpecifier)
    const isTypeOnly = statement.importClause.isTypeOnly || element.isTypeOnly

    if (target.importName === 'default') {
      group.defaultImport = { localName: element.name.text, isTypeOnly }
      continue
    }

    group.named.push({
      importedName: target.importName,
      localName: element.name.text,
      isTypeOnly,
    })
    if (!isTypeOnly) group.allNamedTypeOnly = false
  }

  if (unresolved.length) {
    console.warn(`skip unresolved barrel import in ${toPosixPath(path.relative(root, filePath))}: ${unresolved.join(', ')}`)
    return null
  }

  const nextStatements = []
  for (const [targetSpecifier, group] of groups) {
    nextStatements.push(...buildImportStatement(targetSpecifier, group))
  }

  return nextStatements.length ? nextStatements.join('\n') : null
}

const walkSourceFiles = (dir, files = []) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkSourceFiles(fullPath, files)
      continue
    }
    if (!entry.isFile()) continue
    if (!/\.[cm]?[jt]sx?$/.test(entry.name)) continue
    files.push(fullPath)
  }
  return files
}

let changedFiles = 0
let rewrittenImports = 0
let pendingFiles = 0

for (const filePath of walkSourceFiles(srcDir)) {
  if (barrelMap.has(path.normalize(filePath))) continue

  const { sourceFile, text } = readSourceFile(filePath)
  const replacements = []

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const nextText = rewriteImportDeclaration(filePath, statement)
    if (!nextText) continue
    replacements.push({
      start: statement.getStart(sourceFile),
      end: statement.getEnd(),
      text: nextText,
    })
  }

  if (!replacements.length) continue

  let nextSourceText = text
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    nextSourceText = `${nextSourceText.slice(0, replacement.start)}${replacement.text}${nextSourceText.slice(replacement.end)}`
  }

  if (nextSourceText === text) continue

  pendingFiles += 1
  if (!checkMode) {
    fs.writeFileSync(filePath, nextSourceText)
    changedFiles += 1
  }
  rewrittenImports += replacements.length
}

if (checkMode) {
  if (pendingFiles > 0) {
    console.error(`normalize-internal-imports: found ${rewrittenImports} barrel imports across ${pendingFiles} files`)
    process.exit(1)
  }
  console.log('normalize-internal-imports: no root barrel imports found')
} else {
  console.log(`normalize-internal-imports: updated ${changedFiles} files, rewrote ${rewrittenImports} imports`)
}
