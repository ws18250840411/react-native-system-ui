import { promises as fs } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const ROOT = path.resolve(process.cwd())
const SOURCE_DIR = path.join(ROOT, 'react-vant-icons', 'src', 'icons')
const TARGET_FILE = path.join(ROOT, 'src', 'components', 'icon', 'builtins.ts')
const SKIP = new Set(['IconBase.tsx', 'createFromIconfontCN.tsx', 'index.tsx'])
const START_MARKER = '// @generated VANT_BUILTIN_ICONS start'
const END_MARKER = '// @generated VANT_BUILTIN_ICONS end'

const toKebabCase = (value) =>
  value.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')

const escapeString = (value) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')

const quote = (value) => `'${escapeString(value)}'`

const getTagName = (tagName) => {
  if (ts.isIdentifier(tagName)) return tagName.text
  return tagName.getText()
}

const getJsxAttribute = (attributes, name) => {
  for (const prop of attributes.properties) {
    if (ts.isJsxAttribute(prop) && prop.name.text === name) return prop
  }
  return undefined
}

const hasJsxAttribute = (attributes, name) => Boolean(getJsxAttribute(attributes, name))

const readStringInitializer = (initializer) => {
  if (!initializer) return undefined
  if (ts.isStringLiteral(initializer)) return initializer.text
  if (ts.isJsxExpression(initializer)) {
    const expr = initializer.expression
    if (!expr) return undefined
    if (ts.isStringLiteral(expr)) return expr.text
    if (ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text
  }
  return undefined
}

const readNumberInitializer = (initializer) => {
  if (!initializer) return undefined
  if (ts.isStringLiteral(initializer)) {
    const num = Number(initializer.text)
    return Number.isFinite(num) ? num : undefined
  }
  if (ts.isJsxExpression(initializer)) {
    const expr = initializer.expression
    if (!expr) return undefined
    if (ts.isNumericLiteral(expr)) return Number(expr.text)
    if (ts.isPrefixUnaryExpression(expr) && ts.isNumericLiteral(expr.operand)) {
      const value = Number(expr.operand.text)
      return expr.operator === ts.SyntaxKind.MinusToken ? -value : value
    }
  }
  return undefined
}

const getAttrString = (attributes, name) => {
  const attr = getJsxAttribute(attributes, name)
  if (!attr) return undefined
  return readStringInitializer(attr.initializer)
}

const getAttrNumber = (attributes, name) => {
  const attr = getJsxAttribute(attributes, name)
  if (!attr) return undefined
  return readNumberInitializer(attr.initializer)
}

const findSvgNode = (sourceFile) => {
  let found = undefined
  const visit = (node) => {
    if (found) return
    if (ts.isJsxElement(node) && getTagName(node.openingElement.tagName) === 'svg') {
      found = node
      return
    }
    if (ts.isJsxSelfClosingElement(node) && getTagName(node.tagName) === 'svg') {
      found = node
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return found
}

const convertChildren = (children) => {
  const nodes = []
  for (const child of children) {
    const converted = convertChild(child)
    if (!converted) continue
    if (Array.isArray(converted)) nodes.push(...converted)
    else nodes.push(converted)
  }
  return nodes
}

const convertChild = (child) => {
  if (ts.isJsxText(child) || ts.isJsxExpression(child)) return null

  if (ts.isJsxFragment(child)) {
    return convertChildren(child.children)
  }

  if (ts.isJsxElement(child)) {
    const tag = getTagName(child.openingElement.tagName)
    const attrs = child.openingElement.attributes
    if (tag === 'g') {
      return {
        type: 'g',
        ...(getAttrString(attrs, 'fillRule') ? { fillRule: getAttrString(attrs, 'fillRule') } : null),
        ...(getAttrString(attrs, 'transform') ? { transform: getAttrString(attrs, 'transform') } : null),
        ...(getAttrNumber(attrs, 'opacity') !== undefined ? { opacity: getAttrNumber(attrs, 'opacity') } : null),
        children: convertChildren(child.children),
      }
    }

    if (tag === 'path') {
      const d = getAttrString(attrs, 'd')
      if (!d) throw new Error('path.d not found')
      return {
        type: 'path',
        d,
        ...(getAttrString(attrs, 'fillRule') ? { fillRule: getAttrString(attrs, 'fillRule') } : null),
        ...(getAttrString(attrs, 'transform') ? { transform: getAttrString(attrs, 'transform') } : null),
        ...(getAttrNumber(attrs, 'opacity') !== undefined ? { opacity: getAttrNumber(attrs, 'opacity') } : null),
        ...(hasJsxAttribute(attrs, 'stroke') ? { stroke: true } : null),
      }
    }

    if (tag === 'circle') {
      const cx = getAttrNumber(attrs, 'cx')
      const cy = getAttrNumber(attrs, 'cy')
      const r = getAttrNumber(attrs, 'r')
      if (cx === undefined || cy === undefined || r === undefined) {
        throw new Error('circle.cx/cy/r not found')
      }
      return {
        type: 'circle',
        cx,
        cy,
        r,
        ...(getAttrString(attrs, 'transform') ? { transform: getAttrString(attrs, 'transform') } : null),
        ...(getAttrNumber(attrs, 'opacity') !== undefined ? { opacity: getAttrNumber(attrs, 'opacity') } : null),
      }
    }

    return convertChildren(child.children)
  }

  if (ts.isJsxSelfClosingElement(child)) {
    const tag = getTagName(child.tagName)
    const attrs = child.attributes
    if (tag === 'path') {
      const d = getAttrString(attrs, 'd')
      if (!d) throw new Error('path.d not found')
      return {
        type: 'path',
        d,
        ...(getAttrString(attrs, 'fillRule') ? { fillRule: getAttrString(attrs, 'fillRule') } : null),
        ...(getAttrString(attrs, 'transform') ? { transform: getAttrString(attrs, 'transform') } : null),
        ...(getAttrNumber(attrs, 'opacity') !== undefined ? { opacity: getAttrNumber(attrs, 'opacity') } : null),
        ...(hasJsxAttribute(attrs, 'stroke') ? { stroke: true } : null),
      }
    }

    if (tag === 'circle') {
      const cx = getAttrNumber(attrs, 'cx')
      const cy = getAttrNumber(attrs, 'cy')
      const r = getAttrNumber(attrs, 'r')
      if (cx === undefined || cy === undefined || r === undefined) {
        throw new Error('circle.cx/cy/r not found')
      }
      return {
        type: 'circle',
        cx,
        cy,
        r,
        ...(getAttrString(attrs, 'transform') ? { transform: getAttrString(attrs, 'transform') } : null),
        ...(getAttrNumber(attrs, 'opacity') !== undefined ? { opacity: getAttrNumber(attrs, 'opacity') } : null),
      }
    }

    return null
  }

  return null
}

const printNode = (node, indentLevel) => {
  const pad = '  '.repeat(indentLevel)
  const lines = []
  lines.push(`${pad}{`)
  lines.push(`${pad}  type: ${quote(node.type)},`)
  if (node.type === 'g') {
    if (node.fillRule) lines.push(`${pad}  fillRule: ${quote(node.fillRule)},`)
    if (node.transform) lines.push(`${pad}  transform: ${quote(node.transform)},`)
    if (node.opacity !== undefined) lines.push(`${pad}  opacity: ${node.opacity},`)
    lines.push(`${pad}  children: [`)
    for (const child of node.children) {
      lines.push(printNode(child, indentLevel + 2))
    }
    lines.push(`${pad}  ],`)
  }
  if (node.type === 'path') {
    lines.push(`${pad}  d: ${quote(node.d)},`)
    if (node.fillRule) lines.push(`${pad}  fillRule: ${quote(node.fillRule)},`)
    if (node.transform) lines.push(`${pad}  transform: ${quote(node.transform)},`)
    if (node.opacity !== undefined) lines.push(`${pad}  opacity: ${node.opacity},`)
    if (node.stroke) lines.push(`${pad}  stroke: true,`)
  }
  if (node.type === 'circle') {
    lines.push(`${pad}  cx: ${node.cx},`)
    lines.push(`${pad}  cy: ${node.cy},`)
    lines.push(`${pad}  r: ${node.r},`)
    if (node.transform) lines.push(`${pad}  transform: ${quote(node.transform)},`)
    if (node.opacity !== undefined) lines.push(`${pad}  opacity: ${node.opacity},`)
  }
  lines.push(`${pad}},`)
  return lines.join('\n')
}

const printIconDefinition = ({ key, viewBox, nodes }, indentLevel) => {
  const pad = '  '.repeat(indentLevel)
  const lines = []
  lines.push(`${pad}${quote(key)}: {`)
  lines.push(`${pad}  viewBox: ${quote(viewBox)},`)
  lines.push(`${pad}  nodes: [`)
  for (const node of nodes) {
    lines.push(printNode(node, indentLevel + 2))
  }
  lines.push(`${pad}  ],`)
  lines.push(`${pad}},`)
  return lines.join('\n')
}

const main = async () => {
  const files = (await fs.readdir(SOURCE_DIR)).filter(
    (file) => file.endsWith('.tsx') && !SKIP.has(file),
  )
  files.sort()

  const entries = []
  for (const file of files) {
    const componentName = path.basename(file, '.tsx')
    const key = toKebabCase(componentName)
    const content = await fs.readFile(path.join(SOURCE_DIR, file), 'utf8')
    const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const svgNode = findSvgNode(sourceFile)
    if (!svgNode) {
      throw new Error(`svg 节点未找到: ${file}`)
    }

    const svgAttrs = ts.isJsxElement(svgNode) ? svgNode.openingElement.attributes : svgNode.attributes
    const viewBox = getAttrString(svgAttrs, 'viewBox') ?? '0 0 1024 1024'
    const svgChildren = ts.isJsxElement(svgNode) ? svgNode.children : []
    const nodes = convertChildren(svgChildren)
    entries.push({ key, viewBox, nodes })
  }

  entries.sort((a, b) => a.key.localeCompare(b.key))

  const blockLines = []
  blockLines.push(START_MARKER)
  blockLines.push('const VANT_BUILTIN_ICONS = {')
  for (const entry of entries) {
    blockLines.push(printIconDefinition(entry, 1))
  }
  blockLines.push('} as const satisfies Record<string, BuiltInIconDefinition>')
  blockLines.push(END_MARKER)

  const targetContent = await fs.readFile(TARGET_FILE, 'utf8')
  const startIndex = targetContent.indexOf(START_MARKER)
  const endIndex = targetContent.indexOf(END_MARKER)
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error(`未找到生成标记：${START_MARKER} / ${END_MARKER}`)
  }

  const replacement = blockLines.join('\n')
  const nextContent =
    targetContent.slice(0, startIndex) +
    replacement +
    targetContent.slice(endIndex + END_MARKER.length)

  await fs.writeFile(TARGET_FILE, nextContent, 'utf8')
  // eslint-disable-next-line no-console
  console.log(`[generate-icon-builtins] wrote ${TARGET_FILE} (${entries.length} icons)`)
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('[generate-icon-builtins] failed:', error)
  process.exit(1)
})
