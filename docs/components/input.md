---
simulator:
  compact: true
---

# Input 输入框

## 介绍

基础输入组件，可直接搭配 `Cell`/`Form` 使用；同时提供 `Input.TextArea` 处理多行输入、字数统计、自动增高等场景。

## 引入

```ts
import { Input, type InputInstance } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code src="./input/demo/basic.tsx" title="基础用法"></code>

### 清除按钮

<code src="./input/demo/clearable.tsx" title="清除按钮"></code>

### 插入内容

<code src="./input/demo/slots.tsx" title="插入内容"></code>

### 多行输入

<code src="./input/demo/textarea.tsx" title="多行输入"></code>

### 字数统计

<code src="./input/demo/word-limit.tsx" title="字数统计"></code>

### 对齐方式

<code src="./input/demo/align.tsx" title="对齐方式"></code>

### 输入框状态

<code src="./input/demo/status.tsx" title="输入框状态"></code>

## API

### Input Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 输入值（受控） | `string` | - |
| `defaultValue` | 初始值（非受控） | `string` | `''` |
| `placeholder` | 占位符 | `string` | - |
| `type` | 输入类型；`number` 自动映射为 `decimal-pad`，`digit` 映射为 `number-pad`，`tel` 映射为 `phone-pad` | `text \| number \| digit \| password \| tel \| search` | `text` |
| `align` | 文本对齐方式 | `left \| center \| right` | `left` |
| `clearable` | 是否显示清除按钮 | `boolean` | `false` |
| `clearTrigger` | 清除按钮展示时机 | `always \| focus` | `focus` |
| `clearIcon` | 自定义清除图标 | `ReactNode` | - |
| `prefix` | 前置内容 | `ReactNode` | - |
| `suffix` | 后置内容 | `ReactNode` | - |
| `maxLength` | 限制输入长度 | `number` | - |
| `showWordLimit` | 显示/自定义字数统计 | `boolean \| ({ currentCount, maxLength }) => ReactNode` | `false` |
| `formatter` | 自定义格式化函数 | `(value: string) => string` | - |
| `formatTrigger` | 格式化触发时机 | `onChange \| onBlur` | `onChange` |
| `onChange` | 输入变化回调 | `(value: string) => void` | - |
| `onClear` | 点击清除按钮时触发 | `() => void` | - |
| `onOverlimit` | 超过 `maxLength` 时触发 | `(value: string) => void` | - |
| `inputStyle` | 输入框样式 | `StyleProp<TextStyle>` | - |
| `fieldTokensOverride` | 覆盖 Field tokens | `DeepPartial<FieldTokens>` | - |
| `tokensOverride` | 覆盖 Input tokens | `DeepPartial<InputTokens>` | - |
| 其余属性 | 透传给内部 `TextInput` | - | - |

### Input.TextArea Props

`Input.TextArea` 支持除 `type/align` 之外的所有 `Input` 属性，并额外支持：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rows` | 文本域行数 | `number` | `2` |
| `autoSize` | 文本域自动高度设置，可传入 `{ minHeight?: number; maxHeight?: number }`（单位：dp），会自动换算成 `Field` 的 `minRows/maxRows` | `boolean \| { minHeight?: number; maxHeight?: number }` | `false` |

> `showWordLimit` 传入函数时，可使用 `({ currentCount, maxLength }) => ReactNode` 自定义内容。

### Ref 方法

| 方法 | 说明 |
| --- | --- |
| `focus()` | 让输入框获取焦点 |
| `blur()` | 让输入框失去焦点 |
| `clear()` | 清空内容并触发 `onChange`/`onChangeText` |
| `nativeElement` | 获取内部 `TextInput` 引用 |
