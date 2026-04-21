import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SIZES_FILE = path.join(ROOT, 'docs/component-sizes.ts')

// 读取组件大小数据
const content = fs.readFileSync(SIZES_FILE, 'utf-8')
const dataMatch = content.match(/export default (\[[\s\S]*\])/)
if (!dataMatch) {
  console.error('无法解析组件大小数据')
  process.exit(1)
}

const data = JSON.parse(dataMatch[1])
const total = data.reduce((sum, item) => sum + item.size, 0)
const avg = total / data.length

console.log('📦 组件大小分析报告（Gzip 压缩后）\n')
console.log('=' .repeat(60))
console.log('总体统计：')
console.log(`- 总组件数：${data.length} 个`)
console.log(`- 总大小：${(total / 1024).toFixed(2)} KB`)
console.log(`- 平均大小：${(avg / 1024).toFixed(2)} KB`)
console.log(`- 最大组件：${data[0].name} (${(data[0].size / 1024).toFixed(2)} KB)`)
console.log(`- 最小组件：${data[data.length - 1].name} (${(data[data.length - 1].size / 1024).toFixed(2)} KB)`)
console.log('=' .repeat(60))
console.log('\n各组件大小（按大小排序）：\n')
console.log('| 排名 | 组件 | 大小 (KB) | 大小 (B) | 占比 |')
console.log('|------|------|-----------|---------|------|')

data.forEach((item, index) => {
  const kb = (item.size / 1024).toFixed(2)
  const percentage = ((item.size / total) * 100).toFixed(2)
  const name = item.name.padEnd(20)
  console.log(`| ${String(index + 1).padStart(4)} | ${name} | ${kb.padStart(8)} | ${String(item.size).padStart(7)} | ${percentage.padStart(5)}% |`)
})

console.log('\n大小分类：\n')
const large = data.filter(item => item.size >= 5000).length
const medium = data.filter(item => item.size >= 2000 && item.size < 5000).length
const small = data.filter(item => item.size < 2000).length

console.log(`- 大型组件 (≥5KB): ${large} 个`)
console.log(`- 中型组件 (2-5KB): ${medium} 个`)
console.log(`- 小型组件 (<2KB): ${small} 个`)
