import { describe, expect, it } from 'vitest'
import { __test__ } from '../vite-plugin-marked'

const { transformMdToHtmlAndRender } = __test__

describe('vite-plugin-marked transformMdToHtmlAndRender', () => {
  it('汇总导入并替换 Demo 组件名称', () => {
    const markdown = `
# Button

### 基础示例

\`\`\`tsx
import React, { useState, useMemo } from 'react'
import type { ButtonProps } from './Button'
import { Button as UIButton } from 'react-native-system-ui'
import './side-effect.css'

const Example = () => {
  const [count, setCount] = useState(0)
  const label = useMemo(() => \`Count: \${count}\`, [count])
  return <UIButton text={label} onPress={() => setCount(count + 1)} />
}

export default Example
\`\`\`
`

    const output = transformMdToHtmlAndRender(markdown, 'mobile')

    expect(output).toContain(`import React, { useMemo, useState } from 'react';`)
    expect(output).toContain(`import { Button as UIButton } from 'react-native-system-ui';`)
    expect(output).toContain(`import type { ButtonProps } from './Button';`)
    expect(output).toContain(`import './side-effect.css';`)
    expect(output).toContain('const DemoComponent0 = () => {')
    expect(output).not.toContain('export default Example')
  })

  it('没有 Demo 代码块时不生成组件或 React 导入', () => {
    const markdown = `
# Button

### 引入

\`\`\`tsx
import { Button } from 'react-native-system-ui'
\`\`\`
`

    const output = transformMdToHtmlAndRender(markdown, 'mobile')

    expect(output).not.toContain('DemoComponent')
    expect(output).not.toMatch(/import React/)
  })

  it('多段 Demo 生成唯一组件并复位计数器', () => {
    const markdown = `
# Multiple

### One

\`\`\`tsx
const Example = () => <div>One</div>
export default Example
\`\`\`

### Two

\`\`\`tsx
const Example = () => <div>Two</div>
export default Example
\`\`\`
`

    const first = transformMdToHtmlAndRender(markdown, 'mobile')
    const second = transformMdToHtmlAndRender(markdown, 'mobile')

    expect(first).toContain('const DemoComponent0')
    expect(first).toContain('const DemoComponent1')
    expect(first.match(/DemoComponent0/g)).toHaveLength(1)
    expect(first.match(/DemoComponent1/g)).toHaveLength(1)
    expect(second).toContain('const DemoComponent0')
  })
})
