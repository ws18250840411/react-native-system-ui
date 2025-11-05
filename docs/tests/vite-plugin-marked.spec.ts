import { describe, expect, it } from 'vitest'
import { __test__ } from '../vite-plugin-marked'

const { transformMdToHtmlAndRender, extractDemoCode, sanitizeHtml, buildImportStatements } = __test__

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
    expect(first.match(/const DemoComponent0 =/g)).toHaveLength(1)
    expect(first.match(/const DemoComponent1 =/g)).toHaveLength(1)
    expect(second).toContain('const DemoComponent0')
  })
})

describe('vite-plugin-marked transformMdToHtmlAndRender (pc 模式)', () => {
  it('pc 模式生成预览区、源码区和控制条', () => {
    const markdown = `
# Card

### 展示

\`\`\`tsx
const Example = () => {
  return <div className="card" data-track="demo">内容</div>
}

export default Example
\`\`\`

普通文案 <script>alert('xss')</script>
`
    const output = transformMdToHtmlAndRender(markdown, 'pc')

    expect(output).toContain('className="md-container md-pc"')
    expect(output).toContain('const DemoComponent0 = () => {')
    expect(output).toContain('<div className="md-block-content"><DemoComponent0 /></div>')
    expect(output).toContain('className="md-html-block"')
    expect(output).toContain('className="md-block-control"')
    expect(output).not.toContain('<script>alert')
    expect(output).toContain('data-track="demo"')
  })

  it('pc 模式无 Demo 时仅渲染文档 HTML', () => {
    const markdown = `
# Layout

普通说明段落
`
    const output = transformMdToHtmlAndRender(markdown, 'pc')

    expect(output).not.toContain('DemoComponent')
    expect(output).toContain('className="md-block-container-content"')
    expect(output).toContain('普通说明段落')
  })
})

describe('vite-plugin-marked extractDemoCode', () => {
  it('removes exports, renames Example, collects imports and React hooks', () => {
    const demoSource = `
import React, { useMemo } from 'react'
import type { FC } from 'react'
import Component, { Button, Modal as ModalAlias } from 'ui-lib'
import type { ComponentProps } from 'ui-lib'
import type Theme from 'ui-lib/theme'
import type * as UiTypes from 'ui-lib/types'
import * as lodash from 'lodash-es'
import './reset.css'

const Example: FC<ComponentProps> = () => {
  const value = useMemo(() => 'demo', [])
  return (
    <Component>
      <Button />
      <ModalAlias />
    </Component>
  )
}

export default Example
`

    const componentName = 'DemoComponentX'
    const { cleanedCode, moduleImports, reactUsage } = extractDemoCode(demoSource, componentName)

    expect(cleanedCode).toContain(`const ${componentName}`)
    expect(cleanedCode).not.toMatch(/\bExample\b/)
    expect(cleanedCode).not.toContain('export default')

    const uiLibImports = moduleImports.get('ui-lib')
    expect(uiLibImports?.value.defaultName).toBe('Component')
    expect(uiLibImports?.value.named.has('Button')).toBe(true)
    expect(uiLibImports?.value.named.get('Modal')).toBe('ModalAlias')

    expect(moduleImports.get('lodash-es')?.value.namespace).toBe('lodash')
    expect(moduleImports.get('./reset.css')?.sideEffect).toBe(true)
    const uiLibTypeImports = moduleImports.get('ui-lib')
    expect(uiLibTypeImports?.type.named.has('ComponentProps')).toBe(true)
    expect(moduleImports.get('ui-lib/theme')?.type.defaultName).toBe('Theme')
    expect(moduleImports.get('ui-lib/types')?.type.namespace).toBe('UiTypes')
    expect(moduleImports.get('react')?.type.named.has('FC')).toBe(true)

    expect(Array.from(reactUsage.hooks)).toContain('useMemo')
    expect(reactUsage.needsReact).toBe(true)
  })
})

describe('vite-plugin-marked sanitizeHtml', () => {
  it('strips script tags and inline event handlers', () => {
    const dirty = '<div onclick="alert(1)"><script>alert(2)</script><span>Safe</span></div>'
    const cleaned = sanitizeHtml(dirty)
    expect(cleaned).toBe('<div><span>Safe</span></div>')
  })

  it('保留非事件属性并移除嵌套脚本', () => {
    const dirty = '<section data-id="42"><p data-level="1">text<script type="text/javascript">alert(1)</script></p></section>'
    const cleaned = sanitizeHtml(dirty)
    expect(cleaned).toBe('<section data-id="42"><p data-level="1">text</p></section>')
  })
})

describe('vite-plugin-marked buildImportStatements', () => {
  it('generates sorted import statements with side effects, namespaces and type imports', () => {
    const demoSource = `
import React, { useMemo } from 'react'
import type { FC } from 'react'
import Component, { Button, Modal as ModalAlias } from 'ui-lib'
import type { ComponentProps } from 'ui-lib'
import type Theme from 'ui-lib/theme'
import type * as UiTypes from 'ui-lib/types'
import * as lodash from 'lodash-es'
import './reset.css'

const Example: FC<ComponentProps> = () => {
  useMemo(() => 'demo', [])
  return <Component />
}

export default Example
`
    const { moduleImports } = extractDemoCode(demoSource, 'DemoComponentY')
    const statements = buildImportStatements(moduleImports)

    expect(statements).toEqual([
      "import './reset.css';",
      "import * as lodash from 'lodash-es';",
      "import type { FC } from 'react';",
      "import Component, { Button, Modal as ModalAlias } from 'ui-lib';",
      "import type { ComponentProps } from 'ui-lib';",
      "import type Theme from 'ui-lib/theme';",
      "import type * as UiTypes from 'ui-lib/types';"
    ])
  })

  it('按模块名排序并保持类型/值导入分离', () => {
    const importsMap = new Map<string, any>()
    importsMap.set('react', {
      sideEffect: false,
      value: {
        defaultName: undefined,
        namespace: undefined,
        named: new Map([
          ['useState', undefined],
          ['useEffect', undefined],
        ]),
      },
      type: {
        defaultName: undefined,
        namespace: undefined,
        named: new Map([
          ['CSSProperties', undefined],
        ]),
      },
    })
    importsMap.set('ui', {
      sideEffect: false,
      value: {
        defaultName: undefined,
        namespace: undefined,
        named: new Map([
          ['Button', undefined],
        ]),
      },
      type: {
        defaultName: undefined,
        namespace: undefined,
        named: new Map([
          ['ButtonProps', undefined],
        ]),
      },
    })

    const statements = buildImportStatements(importsMap)
    expect(statements).toEqual([
      "import { useEffect, useState } from 'react';",
      "import type { CSSProperties } from 'react';",
      "import { Button } from 'ui';",
      "import type { ButtonProps } from 'ui';"
    ])
  })
})
