/**
 * 将 package.json 的 exports 收拢为仅 6 条（主入口 + design-system / hooks / text / nativewind / package.json）。
 * 用于 build 后或提交前保持仓库内 package.json 精简；构建时 generate-exports.mjs 会再展开。
 *
 * 用法：node scripts/slim-exports.mjs  或  npm run slim:exports
 */
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const pkgPath = path.join(root, 'package.json')

const KEEP = new Set([
  '.',
  './design-system',
  './hooks',
  './text',
  './nativewind',
  './package.json',
])

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
if (!pkg.exports || typeof pkg.exports !== 'object') {
  console.log('slim-exports: no exports field, skip')
  process.exit(0)
}

const next = {}
for (const key of Object.keys(pkg.exports)) {
  if (KEEP.has(key)) next[key] = pkg.exports[key]
}
pkg.exports = next
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
console.log('slim-exports: exports reduced to', Object.keys(next).length, 'entries')
