import type { Plugin, TransformResult } from 'vite'
import type { Token as PrismToken } from 'prismjs'
import { marked } from 'marked'
import Prism from 'prismjs'
import path from 'path'
import fs from 'fs'
import * as ts from 'typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'

type ModeType = 'mobile' | 'pc'
let projectRoot = process.cwd()
const FAST_REFRESH_NAME_RE = /(?:^|:)react(?:-refresh|-swc)/
const PLUGIN_NAME = 'vite-plugin-marked'
const COMPONENT_NAME_PREFIX = 'DemoComponent'
const DEMO_EXPORT_NAME = 'Example'
const REGEX = {
    MAIN_TITLE: /^#\s+(.+)$/m,
    CODE_BLOCK: /###\s?([^]+?)((?=###)|$)/g,
    DOCUMENT: /([^]*)\n?(```[^]+```)/,
    TITLE: /###(.*)\n?([^]+)/,
    SOURCE: /\`\`\`(.*)\n?([^]+)\`\`\`/,
} as const

const SIMULATOR_BAR_SVG = '<svg fill="currentColor" viewBox="0 0 1384.3 40.3"><path d="M1343 5l18.8 32.3c.8 1.3 2.7 1.3 3.5 0L1384 5c.8-1.3-.2-3-1.7-3h-37.6c-1.5 0-2.5 1.7-1.7 3z"></path><circle cx="1299" cy="20.2" r="20"></circle><path d="M1213 1.2h30c2.2 0 4 1.8 4 4v30c0 2.2-1.8 4-4 4h-30c-2.2 0-4-1.8-4-4v-30c0-2.3 1.8-4 4-4zM16 4.2h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path></svg>'

function escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
let componentCounter = 0
function generateComponentId(): string {
    return `${COMPONENT_NAME_PREFIX}${componentCounter++}`
}
function flattenToken(token: string | PrismToken, types: string[] = []): Array<{ types: string[], content: string }> {
    if (typeof token === 'string') return [{ types: types.length > 0 ? types : ['plain'], content: token }]
    const newTypes = [...types, token.type]
    if (token.alias) newTypes.push(...(Array.isArray(token.alias) ? token.alias : [token.alias]))
    if (typeof token.content === 'string') return [{ types: newTypes, content: token.content }]
    if (Array.isArray(token.content)) return token.content.flatMap(t => flattenToken(t, newTypes))
    return []
}
function renderTokenizedCode(tokens: (string | PrismToken)[]): string {
    const flattened = tokens.flatMap(t => flattenToken(t))
    const lines: string[] = []
    let currentLine: string[] = []
    for (const token of flattened) {
        const parts = token.content.split('\n')
        for (let i = 0; i < parts.length; i++) {
            if (i > 0) {
                lines.push(`<div class="token-line">${currentLine.join('') || '<span class="token plain"> </span>'}</div>`)
                currentLine = []
            }
            if (parts[i] !== undefined || i < parts.length - 1) {
                const types = token.types.join(' ')
                const content = escapeHtml(parts[i] || '')
                currentLine.push(`<span class="token ${types}">${content}</span>`)
            }
        }
    }
    if (currentLine.length > 0) lines.push(`<div class="token-line">${currentLine.join('')}</div>`)
    return lines.join('')
}
marked.use({
    renderer: {
        code({ text, lang }: { text: string; lang?: string; escaped?: boolean }) {
            const language = lang && Prism.languages[lang] ? lang : 'jsx'
            const grammar = Prism.languages[language]
            if (!grammar) {
                const lines = text.split('\n').map(line =>
                    `<div class="token-line"><span class="token plain">${escapeHtml(line)}</span></div>`
                ).join('')
                return `<pre class="prism-code language-${language}">${lines}</pre>`
            }
            const tokens = Prism.tokenize(text, grammar)
            const highlightedCode = renderTokenizedCode(tokens)
            return `<pre class="prism-code language-${language}">${highlightedCode}</pre>`
        }
    }
})
type NamedSpecifierMap = Map<string, Set<string | undefined>>
type ImportSection = {
    defaultNames: Set<string>
    namespaces: Set<string>
    named: NamedSpecifierMap
}
type ModuleImportRecord = {
    sideEffect: boolean
    value: ImportSection
    type: ImportSection
}
type ReactUsage = {
    hooks: Set<string>
    needsReact: boolean
}
const REACT_HOOK_NAMES = new Set([
    'useState',
    'useEffect',
    'useContext',
    'useReducer',
    'useCallback',
    'useMemo',
    'useRef',
    'useImperativeHandle',
    'useLayoutEffect',
    'useDebugValue',
    'useDeferredValue',
    'useTransition',
    'useId',
    'useInsertionEffect',
    'useSyncExternalStore',
    'useActionState',
    'useOptimistic',
])
function createImportSection(): ImportSection {
    return {
        named: new Map(),
    }
}
function createModuleImportRecord(): ModuleImportRecord {
    return {
        sideEffect: false,
        value: createImportSection(),
        type: createImportSection(),
    }
}
function cloneImportSection(section: ImportSection): ImportSection {
    return {
        defaultName: section.defaultName,
        namespace: section.namespace,
        named: new Map(section.named),
    }
}
function cloneModuleImportRecord(record: ModuleImportRecord): ModuleImportRecord {
    return {
        sideEffect: record.sideEffect,
        value: cloneImportSection(record.value),
        type: cloneImportSection(record.type),
    }
}
function addDefaultImport(section: ImportSection, identifier: string) {
    if (!section.defaultName) {
        section.defaultName = identifier
    }
}
function addNamespaceImport(section: ImportSection, identifier: string) {
    if (!section.namespace) {
        section.namespace = identifier
    }
}
function addNamedImport(section: ImportSection, imported: string, alias?: string) {
    if (!section.named.has(imported)) {
        section.named.set(imported, alias && alias !== imported ? alias : undefined)
    }
}
function mergeImportSections(target: ImportSection, source: ImportSection) {
    if (!target.defaultName && source.defaultName) {
        target.defaultName = source.defaultName
    }
    if (!target.namespace && source.namespace) {
        target.namespace = source.namespace
    }
    for (const [name, alias] of source.named.entries()) {
        if (!target.named.has(name)) {
            target.named.set(name, alias)
        }
    }
}
function mergeModuleImportRecord(target: ModuleImportRecord, source: ModuleImportRecord) {
    target.sideEffect = target.sideEffect || source.sideEffect
    mergeImportSections(target.value, source.value)
    mergeImportSections(target.type, source.type)
}
function mergeModuleImportMaps(target: Map<string, ModuleImportRecord>, source: Map<string, ModuleImportRecord>) {
    for (const [moduleName, record] of source.entries()) {
        const existing = target.get(moduleName)
        if (!existing) {
            target.set(moduleName, cloneModuleImportRecord(record))
        } else {
            mergeModuleImportRecord(existing, record)
        }
    }
}
function formatNamedImports(named: NamedSpecifierMap): string | undefined {
    if (named.size === 0) return undefined
    const parts = Array.from(named.entries()).map(([name, alias]) => (alias ? `${name} as ${alias}` : name))
    parts.sort()
    return `{ ${parts.join(', ')} }`
}
function buildImportStatements(importsMap: Map<string, ModuleImportRecord>): string[] {
    const statements: string[] = []
    const modules = Array.from(importsMap.keys()).sort()
    for (const moduleName of modules) {
        const record = importsMap.get(moduleName)
        if (!record) continue
        if (record.sideEffect) {
            statements.push(`import '${moduleName}';`)
        }
        if (record.value.namespace) {
            statements.push(`import * as ${record.value.namespace} from '${moduleName}';`)
        }
        const valueNamed = formatNamedImports(record.value.named)
        if (record.value.defaultName || valueNamed) {
            const parts: string[] = []
            if (record.value.defaultName) parts.push(record.value.defaultName)
            if (valueNamed) parts.push(valueNamed)
            statements.push(`import ${parts.join(', ')} from '${moduleName}';`)
        }
        if (record.type.namespace) {
            statements.push(`import type * as ${record.type.namespace} from '${moduleName}';`)
        }
        if (record.type.defaultName) {
            statements.push(`import type ${record.type.defaultName} from '${moduleName}';`)
        }
        const typeNamed = formatNamedImports(record.type.named)
        if (typeNamed) {
            statements.push(`import type ${typeNamed} from '${moduleName}';`)
        }
    }
    return statements
}
function sanitizeHtml(html: string): string {
    if (!html) return ''
    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|{[^}]*})/gi, '')
}
function extractDemoCode(code: string, componentName: string): { cleanedCode: string; moduleImports: Map<string, ModuleImportRecord>; reactUsage: ReactUsage } {
    const source = ts.createSourceFile('demo.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const moduleImports = new Map<string, ModuleImportRecord>()
    const reactHooks = new Set<string>()
    let needsReact = false
    const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
        const visit: ts.Visitor = (node) => {
            if (ts.isImportDeclaration(node)) {
                const moduleName = (node.moduleSpecifier as ts.StringLiteral).text
                const entry = moduleImports.get(moduleName) || createModuleImportRecord()
                const skipValueImports = moduleName === 'react'
                if (!node.importClause) {
                    if (!skipValueImports) {
                        entry.sideEffect = true
                        moduleImports.set(moduleName, entry)
                    }
                    return undefined
                }
                const clause = node.importClause
                const clauseSection: 'value' | 'type' = clause.isTypeOnly ? 'type' : 'value'
                if (clause.name && !(skipValueImports && clauseSection === 'value')) {
                    addDefaultImport(clauseSection === 'value' ? entry.value : entry.type, clause.name.text)
                    moduleImports.set(moduleName, entry)
                }
                if (clause.namedBindings) {
                    if (ts.isNamespaceImport(clause.namedBindings)) {
                        const sectionKey: 'value' | 'type' = clauseSection
                        if (!(skipValueImports && sectionKey === 'value')) {
                            addNamespaceImport(sectionKey === 'value' ? entry.value : entry.type, clause.namedBindings.name.text)
                            moduleImports.set(moduleName, entry)
                        }
                    } else if (ts.isNamedImports(clause.namedBindings)) {
                        for (const element of clause.namedBindings.elements) {
                            const sectionKey: 'value' | 'type' = element.isTypeOnly ? 'type' : clauseSection
                            if (skipValueImports && sectionKey === 'value') continue
                            const importedName = element.propertyName ? element.propertyName.text : element.name.text
                            const alias = element.propertyName ? element.name.text : undefined
                            const section = sectionKey === 'value' ? entry.value : entry.type
                            addNamedImport(section, importedName, alias)
                            moduleImports.set(moduleName, entry)
                        }
                    }
                }
                if (moduleName === 'react' && clauseSection === 'value') {
                    needsReact = true
                }
                return undefined
            }
            if (ts.isExportAssignment(node) || ts.isExportDeclaration(node)) {
                return undefined
            }
            if (
                ts.isVariableStatement(node) ||
                ts.isFunctionDeclaration(node) ||
                ts.isClassDeclaration(node) ||
                ts.isInterfaceDeclaration(node) ||
                ts.isTypeAliasDeclaration(node) ||
                ts.isEnumDeclaration(node)
            ) {
                const modifiers = node.modifiers?.filter((modifier) => modifier.kind !== ts.SyntaxKind.ExportKeyword && modifier.kind !== ts.SyntaxKind.DefaultKeyword)
                const updatedModifiers = modifiers && modifiers.length > 0 ? ts.factory.createNodeArray(modifiers) : undefined
                if (ts.isVariableStatement(node)) {
                    const updated = ts.factory.updateVariableStatement(node, updatedModifiers, node.declarationList)
                    return ts.visitEachChild(updated, visit, context)
                }
                if (ts.isFunctionDeclaration(node)) {
                    const updated = ts.factory.updateFunctionDeclaration(
                        node,
                        updatedModifiers,
                        node.asteriskToken,
                        node.name,
                        node.typeParameters,
                        node.parameters,
                        node.type,
                        node.body
                    )
                    return ts.visitEachChild(updated, visit, context)
                }
                if (ts.isClassDeclaration(node)) {
                    const updated = ts.factory.updateClassDeclaration(
                        node,
                        updatedModifiers,
                        node.name,
                        node.typeParameters,
                        node.heritageClauses,
                        node.members
                    )
                    return ts.visitEachChild(updated, visit, context)
                }
                if (ts.isInterfaceDeclaration(node)) {
                    const updated = ts.factory.updateInterfaceDeclaration(
                        node,
                        updatedModifiers,
                        node.name,
                        node.typeParameters,
                        node.heritageClauses,
                        node.members
                    )
                    return ts.visitEachChild(updated, visit, context)
                }
                if (ts.isTypeAliasDeclaration(node)) {
                    const updated = ts.factory.updateTypeAliasDeclaration(
                        node,
                        updatedModifiers,
                        node.name,
                        node.typeParameters,
                        node.type
                    )
                    return ts.visitEachChild(updated, visit, context)
                }
                if (ts.isEnumDeclaration(node)) {
                    const updated = ts.factory.updateEnumDeclaration(node, updatedModifiers, node.name, node.members)
                    return ts.visitEachChild(updated, visit, context)
                }
            }
            if (
                ts.isJsxElement(node) ||
                ts.isJsxSelfClosingElement(node) ||
                ts.isJsxFragment(node) ||
                ts.isJsxOpeningElement(node) ||
                ts.isJsxOpeningFragment(node)
            ) {
                needsReact = true
            }
            if (ts.isIdentifier(node)) {
                const text = node.text
                if (text === DEMO_EXPORT_NAME) {
                    return ts.factory.createIdentifier(componentName)
                }
                if (text === 'React') {
                    needsReact = true
                }
                if (REACT_HOOK_NAMES.has(text)) {
                    reactHooks.add(text)
                }
                return node
            }
            return ts.visitEachChild(node, visit, context)
        }
        return (node) => ts.visitEachChild(node, visit, context)
    }
    const result = ts.transform(source, [transformer])
    const transformed = result.transformed[0] as ts.SourceFile
    result.dispose()
    ;(transformed as ts.SourceFile & { externalModuleIndicator?: undefined }).externalModuleIndicator = undefined
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    const cleanedStatements = transformed.statements
        .filter((statement) => statement.kind !== ts.SyntaxKind.NotEmittedStatement)
        .map((statement) => printer.printNode(ts.EmitHint.Unspecified, statement, transformed).trim())
        .filter(Boolean)
    const cleanedCode = cleanedStatements.join('\n')
    return {
        cleanedCode,
        moduleImports,
        reactUsage: {
            hooks: reactHooks,
            needsReact,
        },
    }
}
function processCodeBlock(blockContent: string, mode: ModeType, importAggregator: Map<string, ModuleImportRecord>, importChildrenCode: string[], reactAggregate: ReactUsage) {
    const document = blockContent.match(REGEX.DOCUMENT)
    if (!document) {
        if (mode === 'pc') {
            const html = `<div className="md-html-block" dangerouslySetInnerHTML={{__html: ${JSON.stringify(sanitizeHtml(marked.parse(blockContent) as string))}}} />`
            return { html }
        }
        return { html: '' }
    }
    const titleMatch = document[1]?.match(REGEX.TITLE)
    const title = titleMatch?.[1]?.trim() || ''
    const sourceMatch = document[2]?.match(REGEX.SOURCE)
    const codeHtml = sanitizeHtml(marked.parse(document[2] || '') as string)
    const titleHtml = sanitizeHtml(marked.parse(document[1] || '') as string)
    let componentName = ''
    let componentCode = sourceMatch?.[2] || ''
    let cleanedCode = ''
    let moduleImports = new Map<string, ModuleImportRecord>()
    let reactUsage: ReactUsage = { hooks: new Set(), needsReact: false }
    if (componentCode) {
        componentName = generateComponentId()
        const result = extractDemoCode(componentCode, componentName)
        cleanedCode = result.cleanedCode
        moduleImports = result.moduleImports
        reactUsage = result.reactUsage
    }
    const hasComponent = cleanedCode.trim().length > 0
    if (hasComponent) {
        mergeModuleImportMaps(importAggregator, moduleImports)
        for (const hook of reactUsage.hooks) {
            reactAggregate.hooks.add(hook)
        }
        reactAggregate.needsReact = reactAggregate.needsReact || reactUsage.needsReact
        importChildrenCode.push(cleanedCode)
    } else {
        return { html: '' }
    }
    let html = ''
    if (mode === 'pc') {
        const previewContent = hasComponent
            ? `<div className="md-block-content"><${componentName} /></div>`
            : `<div className="md-block-content" dangerouslySetInnerHTML={{__html: ${JSON.stringify(codeHtml)}}} />`
        const mobileHtml = `<div className="md-code-block"><div className="md-block-title" dangerouslySetInnerHTML={{__html: ${JSON.stringify(titleHtml)}}} />${previewContent}</div>`
        const pcHtml = hasComponent ? `<div className="md-html-block" dangerouslySetInnerHTML={{__html: ${JSON.stringify(codeHtml)}}} />` : ''
        const controlHtml = hasComponent ? `<div className="md-block-control"><div className="md-block-control-content"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5463" width="16" height="16"><path d="M512.1 807.8l-445-444.9c-1.3-1.3-0.4-3.4 1.4-3.4h889.8c0.5 0 0.8 0.6 0.4 1L512.1 807.8z" p-id="5464"></path></svg><span /></div></div>` : ''
        html = `<div className="md-block">${mobileHtml}${pcHtml}${controlHtml}</div>`
    } else {
        const mobileContent = hasComponent
            ? `<div className="md-block-content"><${componentName} /></div>`
            : `<div className="md-block-content" dangerouslySetInnerHTML={{__html: ${JSON.stringify(codeHtml)}}} />`
        html = `<div className="md-block"><div className="md-code-block"><h2>${title}</h2>${mobileContent}</div></div>`
    }
    return { html }
}
function indentBlock(code: string, spaces = 4): string {
    const pad = ' '.repeat(spaces)
    return code
        .split('\n')
        .map((line) => pad + line)
        .join('\n')
}
function transformMdToHtmlAndRender(code: string, mode: ModeType): string {
    componentCounter = 0
    const importAggregator = new Map<string, ModuleImportRecord>()
    const importChildrenCode: string[] = []
    const reactAggregate: ReactUsage = { hooks: new Set(), needsReact: false }
    const mainTitleMatch = code.match(REGEX.MAIN_TITLE)
    const mainTitle = mainTitleMatch ? mainTitleMatch[1] : ''
    const codeWithoutMainTitle = code.replace(REGEX.MAIN_TITLE, '')
    const mdBlocks: string[] = []
    codeWithoutMainTitle.replace(REGEX.CODE_BLOCK, (match) => {
        const { html } = processCodeBlock(match, mode, importAggregator, importChildrenCode, reactAggregate)
        if (html) mdBlocks.push(html)
        return match
    })

    const otherImports = buildImportStatements(importAggregator)
    const reactHooks = Array.from(reactAggregate.hooks).sort()
    const needsReactImport = importChildrenCode.length > 0 || reactAggregate.needsReact || reactHooks.length > 0
    const importLines: string[] = []
    if (needsReactImport) {
        importLines.push(
            reactHooks.length > 0
                ? `import React, { ${reactHooks.join(', ')} } from 'react';`
                : `import React from 'react';`
        )
    }
    importLines.push(...otherImports)
    const importSection = importLines.length > 0 ? importLines.map((line) => indentBlock(line)).join('\n') + '\n' : ''
    const componentSection = importChildrenCode.length > 0 ? importChildrenCode.map((codeBlock) => indentBlock(codeBlock)).join('\n\n') + '\n' : ''

    const blockTitle = mode === 'pc' ? '' : `<div className="md-block-container-header">${SIMULATOR_BAR_SVG}</div>`
    const simulatorTemplate = `<div className="md-block-container">${blockTitle}<div className="md-block-container-sections"><h1 className="md-block-container-title">${mainTitle}</h1><div className="md-block-container-content">${mdBlocks.join('')}</div></div></div>`
    const docsTemplate =
        mode === 'mobile'
            ? `<div className="md-html-container" dangerouslySetInnerHTML={{__html: ${JSON.stringify(sanitizeHtml(marked.parse(code) as string))}}} />`
            : ''
    return `
${importSection}${componentSection}    function ReactComponent(props) {
      return <div className="md-container md-${mode}">${docsTemplate}${simulatorTemplate}</div>
    }
    export default ReactComponent
  `
}
export const __test__ = {
    transformMdToHtmlAndRender,
    extractDemoCode,
    sanitizeHtml,
    buildImportStatements,
}
export const markedPlugin = (pluginOptions: { mode: ModeType } = { mode: 'mobile' }): Plugin => {
    let reactRefreshPlugin: Plugin | undefined
    let isServeMode = false
    return {
        name: PLUGIN_NAME,
        enforce: 'pre',
        configResolved(config) {
            isServeMode = config.command === 'serve'
            projectRoot = config.root
            if (!isServeMode) return
            reactRefreshPlugin = config.plugins.find((plugin) =>
                plugin && plugin.name !== PLUGIN_NAME && plugin.name && typeof plugin.transform === 'function' && !(typeof plugin.apply === 'string' && plugin.apply === 'build') && FAST_REFRESH_NAME_RE.test(plugin.name)
            )
        },
        resolveId(source, importer) {
            if (!source.endsWith('.md')) return null
            if (path.isAbsolute(source)) return source + '.tsx'
            const cleanedImporter = importer?.split('?')[0]
            const importerDir = cleanedImporter
                ? path.dirname(path.isAbsolute(cleanedImporter) ? cleanedImporter : path.join(projectRoot, cleanedImporter))
                : projectRoot
            const resolved = path.resolve(importerDir, source)
            return resolved + '.tsx'
        },
        load(id) {
            const normalizedId = id.split('?')[0]
            const isMdTsx = normalizedId.endsWith('.md.tsx')
            const isMd = /\.md$/.test(normalizedId) && !isMdTsx
            if (!isMdTsx && !isMd) return null
            const realId = isMdTsx ? normalizedId.slice(0, -4) : normalizedId
            const absoluteRealId = path.isAbsolute(realId) ? realId : path.join(projectRoot, realId)
            try {
                if (!fs.existsSync(absoluteRealId)) {
                    if (isMdTsx) {
                        throw new Error(`Markdown virtual module not found: ${realId}`)
                    }
                    throw new Error(`Markdown file not found: ${realId}`)
                }
                const code = fs.readFileSync(absoluteRealId, 'utf-8')
                const tsxCode = transformMdToHtmlAndRender(code, pluginOptions.mode)
                return { code: tsxCode, map: null }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error)
                this.error(`Failed to load and transform markdown file "${realId}": ${errorMessage}`)
                return null
            }
        },
        async transform(code, id, transformOptions) {
            if (!isServeMode || !/\.md$/.test(id)) return null
            try {
                const tsxCode = transformMdToHtmlAndRender(code, pluginOptions.mode)
                if (reactRefreshPlugin?.transform) {
                    const transformFn = typeof reactRefreshPlugin.transform === 'function' ? reactRefreshPlugin.transform : reactRefreshPlugin.transform.handler
                    const result = await transformFn.call(this, tsxCode, `${id}.tsx`, transformOptions) as TransformResult | string | undefined
                    if (typeof result === 'string') return { code: result, map: null }
                    return result || { code: tsxCode, map: null }
                }
                return { code: tsxCode, map: null }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error)
                this.error(`Failed to transform markdown file "${id}": ${errorMessage}`)
                return null
            }
        }
    }
}
export default markedPlugin
