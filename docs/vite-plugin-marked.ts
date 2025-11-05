import type { Plugin, TransformResult } from 'vite'
import type { Token as PrismToken } from 'prismjs'
import { marked } from 'marked'
import Prism from 'prismjs'
import path from 'path'
import fs from 'fs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'

type ModeType = 'mobile' | 'pc'
const FAST_REFRESH_NAME_RE = /(?:^|:)react(?:-refresh|-swc)/
const PLUGIN_NAME = 'vite-plugin-marked'
const COMPONENT_NAME_PREFIX = 'DemoComponent'
const DEMO_EXPORT_NAME = 'Example'
const REGEX = {
    MAIN_TITLE: /^#\s+(.+)$/m,
    CODE_BLOCK: /###\s?([^]+?)((?=###)|$)/g,
    DOCUMENT: /([^]*)\n?(```[^]+```)/,
    TITLE: /###(.*)\n?([^]+)/,
    SOURCE: /```(.*)\n?([^]+)```/,
    REACT_IMPORT: /import\s+React(?:\s*,\s*\{[^}]*\})?\s+from\s+['"]react['"]\s*;?\s*\n?/g,
    REACT_HOOKS_IMPORT: /import\s+\{[^}]*\}\s+from\s+['"]react['"]\s*;?\s*\n?/g,
    ALL_IMPORTS: /import\s+[^;]+;\s*\n?/g,
    IMPORT_STATEMENT: /import\s+[^;]+;/g,
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
function extractAndCleanImports(code: string): { cleanedCode: string; imports: string[] } {
    let cleanedCode = code
    cleanedCode = cleanedCode.replace(REGEX.REACT_IMPORT, '').replace(REGEX.REACT_HOOKS_IMPORT, '')
    const importMatches = cleanedCode.match(REGEX.IMPORT_STATEMENT) || []
    const imports = importMatches.map(imp => imp.trim())
    cleanedCode = cleanedCode.replace(REGEX.ALL_IMPORTS, '')
    return { cleanedCode, imports }
}
function processCodeBlock(blockContent: string, mode: ModeType, allImports: Set<string>, importChildrenCode: string[]) {
    const document = blockContent.match(REGEX.DOCUMENT)
    if (!document) {
        if (mode === 'pc') {
            const html = `<div className="md-html-block" dangerouslySetInnerHTML={{__html: ${JSON.stringify(marked.parse(blockContent) as string)}}} />`
            return { html, componentCode: '' }
        }
        return { html: '', componentCode: '' }
    }
    const componentName = generateComponentId()
    const titleMatch = document[1]?.match(REGEX.TITLE)
    const title = titleMatch?.[1]?.trim() || ''
    const sourceMatch = document[2]?.match(REGEX.SOURCE)
    let componentCode = sourceMatch?.[2] || ''
    componentCode = componentCode.replace(`export default ${DEMO_EXPORT_NAME}`, '').replace(new RegExp(`\\b${DEMO_EXPORT_NAME}\\b`, 'g'), componentName)
    const { cleanedCode, imports } = extractAndCleanImports(componentCode)
    imports.forEach(imp => allImports.add(imp))
    importChildrenCode.push(cleanedCode)
    let html = ''
    if (mode === 'pc') {
        const codeHtml = marked.parse(document[2] || '') as string
        const titleHtml = marked.parse(document[1] || '') as string
        const pcHtml = `<div className="md-html-block" dangerouslySetInnerHTML={{__html: ${JSON.stringify(codeHtml)}}} />`
        const mobileHtml = `<div className="md-code-block"><div className="md-block-title" dangerouslySetInnerHTML={{__html: ${JSON.stringify(titleHtml)}}} /><div className="md-block-content"><${componentName} /></div></div>`
        const controlHtml = `<div className="md-block-control"><div className="md-block-control-content"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5463" width="16" height="16"><path d="M512.1 807.8l-445-444.9c-1.3-1.3-0.4-3.4 1.4-3.4h889.8c0.5 0 0.8 0.6 0.4 1L512.1 807.8z" p-id="5464"></path></svg><span /></div></div>`
        html = `<div className="md-block">${mobileHtml}${pcHtml}${controlHtml}</div>`
    } else {
        html = `<div className="md-block"><div className="md-code-block"><h2>${title}</h2><${componentName} /></div></div>`
    }
    return { html, componentCode: cleanedCode }
}
function transformMdToHtmlAndRender(code: string, mode: ModeType): string {
    componentCounter = 0
    const allImports = new Set<string>()
    const importChildrenCode: string[] = []
    const mainTitleMatch = code.match(REGEX.MAIN_TITLE)
    const mainTitle = mainTitleMatch ? mainTitleMatch[1] : ''
    const codeWithoutMainTitle = code.replace(REGEX.MAIN_TITLE, '')
    const mdBlocks: string[] = []
    codeWithoutMainTitle.replace(REGEX.CODE_BLOCK, (match) => {
        const { html } = processCodeBlock(match, mode, allImports, importChildrenCode)
        if (html) mdBlocks.push(html)
        return match
    })
    const blockTitle = mode === 'pc' ? '' : `<div className="md-block-container-header">${SIMULATOR_BAR_SVG}</div>`
    const simulatorTemplate = `<div className="md-block-container">${blockTitle}<div className="md-block-container-sections"><h1 className="md-block-container-title">${mainTitle}</h1><div className="md-block-container-content">${mdBlocks.join('')}</div></div></div>`
    const docsTemplate = mode === 'mobile' ? `<div className="md-html-container" dangerouslySetInnerHTML={{__html: ${JSON.stringify(marked.parse(code) as string)}}} />` : ''
    const otherImports = Array.from(allImports).join('\n    ')
    const allComponentCode = importChildrenCode.join('\n    ')
    return `
    import React, {useState,useEffect,useContext,useReducer,useCallback,useMemo,useRef,useImperativeHandle,useLayoutEffect,useDebugValue} from "react"
    ${otherImports}
    ${allComponentCode}
    function ReactComponent(props) {
      return <div className="md-container md-${mode}">${docsTemplate}${simulatorTemplate}</div>
    }
    export default ReactComponent
  `
}
export const markedPlugin = (pluginOptions: { mode: ModeType } = { mode: 'mobile' }): Plugin => {
    let reactRefreshPlugin: Plugin | undefined
    let isServeMode = false
    return {
        name: PLUGIN_NAME,
        enforce: 'pre',
        configResolved(config) {
            isServeMode = config.command === 'serve'
            if (!isServeMode) return
            reactRefreshPlugin = config.plugins.find((plugin) =>
                plugin && plugin.name !== PLUGIN_NAME && plugin.name && typeof plugin.transform === 'function' && !(typeof plugin.apply === 'string' && plugin.apply === 'build') && FAST_REFRESH_NAME_RE.test(plugin.name)
            )
        },
        resolveId(source, importer) {
            if (!source.endsWith('.md')) return null
            if (path.isAbsolute(source)) return source + '.tsx'
            if (importer) {
                const resolved = path.resolve(path.dirname(importer), source)
                return resolved + '.tsx'
            }
            return null
        },
        load(id) {
            const isMdTsx = id.endsWith('.md.tsx')
            const isMd = /\.md$/.test(id) && !isMdTsx
            if (!isMdTsx && !isMd) return null
            const realId = isMdTsx ? id.slice(0, -4) : id
            try {
                if (!fs.existsSync(realId)) {
                    if (isMdTsx) return null
                    throw new Error(`Markdown file not found: ${realId}`)
                }
                const code = fs.readFileSync(realId, 'utf-8')
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
