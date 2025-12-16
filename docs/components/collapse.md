---
simulator:
  compact: true
---

# Collapse 折叠面板

## 介绍

通过折叠面板收纳和展示内容，支持受控和手风琴模式。

## 引入

```js
import { Collapse } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./collapse/demo/base.tsx"></code>

### 手风琴模式

<code title="手风琴模式" src="./collapse/demo/accordion.tsx"></code>

### 禁用状态

<code title="禁用状态" src="./collapse/demo/disabled.tsx"></code>

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

### Collapse.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 唯一标识符 | `string` | 子序号 |
| `title` | 面板标题 | `ReactNode` | - |
| `label` | 标题下方描述 | `ReactNode` | - |
| `icon` | 标题左侧图标 | `ReactNode` | - |
| `value` | 标题右侧区域 | `ReactNode` | - |
| `border` | 是否显示内边框 | `boolean` | `true` |
| `isLink` | 是否展示标题栏右侧箭头 | `boolean` | `true` |
| `size` | 标题栏大小，可选值为 `large` | `'normal' \| 'large'` | `'normal'` |
| `disabled` | 是否禁用当前面板 | `boolean` | `false` |
| `readOnly` | 是否为只读状态，只读状态下无法操作面板 | `boolean` | `false` |

> `Collapse.Item` 内部可以放任意自定义内容；当传入 `expandIcon` 为函数时会收到当前展开状态。
>
> 为了兼容旧写法：`Collapse.Panel` 等价于 `Collapse.Item`，且 `description/extra` 分别是 `label/value` 的别名。
