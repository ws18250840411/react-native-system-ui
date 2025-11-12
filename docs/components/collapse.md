---
simulator:
  compact: false
---

# Collapse 折叠面板

## 介绍

通过折叠面板收纳和展示内容，行为与 react-vant 保持一致，支持受控和手风琴模式。

## 引入

```js
import { Collapse } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./collapse/demo/base.tsx"></code>

### 手风琴模式

<code title="手风琴模式" src="./collapse/demo/accordion.tsx"></code>

### 自定义图标与标题

<code title="自定义图标" src="./collapse/demo/custom.tsx"></code>

## API

### Collapse Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `accordion` | 是否开启手风琴模式 | `boolean` | `false` |
| `value` | 当前展开面板，手风琴模式下为 `string`，否则为 `string[]` | `string \| string[]` | - |
| `defaultValue` | 默认展开面板 | `string \| string[]` | `[]` |
| `onChange` | 展开状态变化回调 | `(value: string \| string[]) => void` | - |
| `border` | 是否显示外边框 | `boolean` | `true` |
| `iconPosition` | 图标位置 | `'left' \| 'right'` | `'right'` |
| `expandIcon` | 自定义展开图标 | `ReactNode \| (active: boolean) => ReactNode` | 默认箭头 |
| `disabled` | 是否禁用全部面板 | `boolean` | `false` |

### Collapse.Panel Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 唯一标识符 | `string` | 子序号 |
| `title` | 面板标题 | `ReactNode` | - |
| `description` | 标题下方描述 | `ReactNode` | - |
| `icon` | 标题左侧图标 | `ReactNode` | - |
| `extra` | 标题右侧区域 | `ReactNode` | - |
| `disabled` | 是否禁用当前面板 | `boolean` | `false` |

> `Collapse.Panel` 内部可以放任意自定义内容；当传入 `expandIcon` 为函数时会收到当前展开状态。
