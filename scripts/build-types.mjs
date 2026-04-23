/**
 * 用 TypeScript Compiler API 生成 .d.ts，并在写入前压缩（去注释、空白），一步完成。
 * 替代原来的 tsc build:types + minify-dts 两步。
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const root = process.cwd()
const configPath = path.join(root, 'tsconfig.types.json')

function getMinifier() {
  try {
    const { createMinifier } = require('dts-minify')
    return createMinifier(ts)
  } catch {
    return null
  }
}

const configJson = ts.readConfigFile(configPath, (p) => fs.readFileSync(p, 'utf8'))
if (configJson.error) {
  console.error(configJson.error)
  process.exit(1)
}

const parsed = ts.parseJsonConfigFileContent(
  configJson.config,
  ts.sys,
  path.dirname(configPath)
)
if (parsed.errors.length) {
  parsed.errors.forEach((e) => console.error(e.messageText))
  process.exit(1)
}

const minifier = getMinifier()
const outDir = parsed.options.outDir || path.join(root, 'dist/types')

// 确保输出目录存在
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const host = ts.createCompilerHost(parsed.options)
const origWriteFile = host.writeFile
host.writeFile = (filePath, data, writeBOM, onError, sourceFiles) => {
  if (filePath.endsWith('.d.ts') && minifier) {
    try {
      data = minifier.minify(data)
    } catch (_) {
      // 压缩失败则写原文
    }
  }
  origWriteFile.call(host, filePath, data, writeBOM, onError, sourceFiles)
}

const program = ts.createProgram(parsed.fileNames, parsed.options, host)
const emitResult = program.emit(undefined, undefined, undefined, true)

if (emitResult.diagnostics?.length) {
  emitResult.diagnostics.forEach((d) => {
    const m = ts.flattenDiagnosticMessageText(d.messageText, '\n')
    console.error(m)
  })
  process.exit(1)
}

if (minifier) console.log('build-types: emitted and minified .d.ts to', outDir)
else console.log('build-types: emitted .d.ts to', outDir, '(install dts-minify to minify)')
