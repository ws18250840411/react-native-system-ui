---
simulator:
  compact: false
---

# Input 输入框

## 介绍

基础输入组件，可搭配 `Cell`、`Form` 等容器使用，同时提供 `Input.TextArea` 处理多行场景。

## 引入

```ts
import { Input } from react-native-system-ui
```

## 代码演示

### 基础用法

<code title=基础用法 src=./input/demo/basic.tsx></code>

### 清除按钮

<code title=清除按钮 src=./input/demo/clearable.tsx></code>

### 插入内容

<code title=前后缀插槽 src=./input/demo/slots.tsx></code>

### 文本域

<code title=多行输入 src=./input/demo/textarea.tsx></code>

## API

### Input Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 输入值（受控） | `string` | - |
| `defaultValue` | 初始值（非受控） | `string` | `` |
| `placeholder` | 占位符 | `string` | - |
| `type` | 输入框类型 | `text \| number \| digit \| password \| tel \| search` | `text` |
| `align` | 文本对齐方式 | `left \| center \| right` | `left` |
| `clearable` | 是否显示清除按钮 | `boolean` | `false` |
| `clearTrigger` | 清除按钮展示时机 | `always \| focus` | `focus` |
| `clearIcon` | 自定义清除图标 | `ReactNode` | - |
| `prefix` | 前置内容 | `ReactNode` | - |
| `suffix` | 后置内容 | `ReactNode` | - |
| `maxLength` | 限制输入长度 | `number` | - |
| `showWordLimit` | 显示/自定义字数统计 | `boolean \| (info) => ReactNode` | `false` |
| `formatter` | 自定义格式化函数 | `(value: string) => string` | - |
| `formatTrigger` | 格式化触发时机 | `onChange \| onBlur` | `onChange` |
| `onChange` | 输入变化回调 | `(value: string) => void` | - |
| `onClear` | 点击清除按钮时触发 | `() => void` | - |
| `onOverlimit` | 超过 `maxLength` 时触发 | `() => void` | - |
| 其余属性 | 透传给内部 `TextInput` | - | - |

### Input.TextArea Props

`Input.TextArea` 支持除 `type/align` 之外的所有 `Input` 属性，并额外支持：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rows` | 文本域行数 | `number` | `1` |
| `autoSize` | 文本域自动高度设置 | `boolean \| { minRows?: number; maxRows?: number }` | `false` |

> `showWordLimit` 传入函数时，可使用 `({ currentCount, maxLength }) => ReactNode` 自定义渲染。
