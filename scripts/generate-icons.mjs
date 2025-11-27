import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(process.cwd())
const SOURCE_DIR = path.join(ROOT, 'react-vant-icons', 'src', 'icons')
const TARGET_DIR = path.join(ROOT, 'packages', 'icons', 'src', 'icons')
const REGISTRY_FILE = path.join(ROOT, 'packages', 'icons', 'src', 'registry.ts')
const INDEX_FILE = path.join(ROOT, 'packages', 'icons', 'src', 'index.ts')
const SKIP = new Set(['IconBase.tsx', 'createFromIconfontCN.tsx', 'index.tsx'])

const tagMap = new Map(
  Object.entries({
    svg: 'Svg',
    path: 'Path',
    circle: 'Circle',
    rect: 'Rect',
    g: 'G',
    defs: 'Defs',
    lineargradient: 'LinearGradient',
    radialgradient: 'RadialGradient',
    stop: 'Stop',
    mask: 'Mask',
    clippath: 'ClipPath',
    ellipse: 'Ellipse',
    polygon: 'Polygon',
    polyline: 'Polyline',
    line: 'Line',
    text: 'Text',
    tspan: 'TSpan',
    use: 'Use',
    symbol: 'Symbol',
    foreignobject: 'ForeignObject',
    filter: 'Filter',
    feoffset: 'FeOffset',
    feflood: 'FeFlood',
    fecomposite: 'FeComposite',
    femerge: 'FeMerge',
    femergenode: 'FeMergeNode',
    fegaussianblur: 'FeGaussianBlur',
    feblend: 'FeBlend',
    fecolormatrix: 'FeColorMatrix',
  }),
)

const attributeMap = new Map(
  Object.entries({
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-miterlimit': 'strokeMiterlimit',
    'clip-path': 'clipPath',
    'gradient-units': 'gradientUnits',
    'color-interpolation-filters': 'colorInterpolationFilters',
    'flood-color': 'floodColor',
    'flood-opacity': 'floodOpacity',
    'lighting-color': 'lightingColor',
  }),
)

const indent = (content, spaces) => {
  const pad = ' '.repeat(spaces)
  return content
    .split('\n')
    .map((line) => (line.trim().length ? pad + line.trimEnd() : ''))
    .join('\n')
}

const toKebabCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]{2,})([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()

const ensureDir = async (dir) => {
  await fs.rm(dir, { recursive: true, force: true })
  await fs.mkdir(dir, { recursive: true })
}

const convertTags = (content, usedTags) =>
  content.replace(/<\/?([a-zA-Z]+)/g, (match, rawTag) => {
    const lower = rawTag.toLowerCase()
    const mapped = tagMap.get(lower) ?? rawTag[0].toUpperCase() + rawTag.slice(1)
    usedTags.add(mapped)
    return match.replace(rawTag, mapped)
  })

const camelizeAttributes = (content) => {
  let result = content
  for (const [from, to] of attributeMap.entries()) {
    const regex = new RegExp(`${from}=`, 'gi')
    result = result.replace(regex, `${to}=`)
  }
  return result
}

const replaceCurrentColor = (content) =>
  content
    .replace(/fill="currentColor"/gi, 'fill={primaryColor}')
    .replace(/stroke="currentColor"/gi, 'stroke={primaryColor}')
    .replace(/stopColor="currentColor"/gi, 'stopColor={primaryColor}')

const transformSvg = (source, file) => {
  const svgMatch = source.match(/<svg[\s\S]*?<\/svg>/) || source.match(/<svg[^>]*\/>/)
  if (!svgMatch) {
    throw new Error(`SVG block not found in ${file}`)
  }
  const svgBlock = svgMatch[0]
  const viewBoxMatch = svgBlock.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 1024 1024'
  let inner = svgBlock.includes('</svg>')
    ? svgBlock.replace(/^[\s\S]*?<svg[^>]*?>/, '').replace(/<\/svg>[\s\S]*$/, '').trim()
    : ''
  inner = replaceCurrentColor(inner)
  inner = camelizeAttributes(inner)
  const usedTags = new Set(['Svg'])
  inner = convertTags(inner, usedTags)
  return { inner, viewBox, usedTags }
}

const generateIconFile = async ({ componentName, inner, viewBox, usedTags }) => {
  const extraImports = Array.from(usedTags)
    .filter((tag) => tag !== 'Svg')
    .sort()
  const importLine =
    extraImports.length > 0
      ? `import Svg, { ${extraImports.join(', ')} } from 'react-native-svg'`
      : `import Svg from 'react-native-svg'`

  const content = `import React from 'react'
${importLine}
import { createIcon } from '../createIcon'

const ${componentName} = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="${viewBox}" fill="none">
${indent(inner, 4)}
  </Svg>
))

export default ${componentName}
`

  await fs.writeFile(path.join(TARGET_DIR, `${componentName}.tsx`), content, 'utf8')
}

const main = async () => {
  await ensureDir(TARGET_DIR)
  const files = (await fs.readdir(SOURCE_DIR)).filter(
    (file) => file.endsWith('.tsx') && !SKIP.has(file),
  )
  files.sort()

  const registryEntries = []
  for (const file of files) {
    const source = await fs.readFile(path.join(SOURCE_DIR, file), 'utf8')
    const componentName = path.basename(file, '.tsx')
    const { inner, viewBox, usedTags } = transformSvg(source, file)
    await generateIconFile({ componentName, inner, viewBox, usedTags })
    registryEntries.push({ componentName, kebab: toKebabCase(componentName) })
  }

  const registryImports = registryEntries
    .map(({ componentName }) => `import ${componentName} from './icons/${componentName}'`)
    .join('\n')

  const mapEntries = registryEntries
    .map(({ componentName, kebab }) => `  '${kebab}': ${componentName},`)
    .join('\n')

  const iconNamesArray = registryEntries.map(({ kebab }) => `  '${kebab}',`).join('\n')

  const registryContent = `${registryImports}

export const iconMap = {
${mapEntries}
} as const

export type IconName = keyof typeof iconMap

export const iconNames = [
${iconNamesArray}
] as const satisfies readonly IconName[]
`

  await fs.writeFile(REGISTRY_FILE, registryContent, 'utf8')

  const exportLines = registryEntries
    .map(({ componentName }) => `export { default as ${componentName} } from './icons/${componentName}'`)
    .join('\n')

  const indexContent = `export type { IconProps, IconRender, IconRenderConfig } from './createIcon'
export { createIcon } from './createIcon'
export { iconMap, iconNames } from './registry'
export type { IconName } from './registry'
${exportLines}
`

  await fs.writeFile(INDEX_FILE, indexContent, 'utf8')
}

main().catch((error) => {
  console.error('[generate-icons] failed:', error)
  process.exit(1)
})
