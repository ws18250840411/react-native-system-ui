---
simulator:
  compact: false
---

# Search 搜索框

## 介绍

移动端搜索输入框，内置占位提示、清除按钮、取消操作等常见交互。

## 引入

```ts
import { Search } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title='基础用法' src='./search/demo/basic.tsx'></code>

### 右侧操作按钮

<code title='取消按钮' src='./search/demo/action.tsx'></code>

### 自定义形状与插槽

<code title='自定义内容' src='./search/demo/custom.tsx'></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 输入值（受控） | `string` | - |
| `defaultValue` | 初始值（非受控） | `string` | `''` |
| `placeholder` | 占位提示文案 | `string` | `搜索` |
| `clearable` | 是否展示清除图标 | `boolean` | `true` |
| `clearTrigger` | 清除图标触发时机 | `'always' \| 'focus'` | `focus` |
| `leftIcon` | 左侧图标 | `ReactNode` | 搜索图标 |
| `rightIcon` | 右侧图标 | `ReactNode` | - |
| `label` | 输入框左侧文本 | `ReactNode` | - |
| `background` | 外层背景色 | `string` | `#f7f8fa` |
| `shape` | 搜索框形状 | `'square' \| 'round'` | `square` |
| `showAction` | 是否展示默认取消按钮 | `boolean` | `false` |
| `actionText` | 默认取消按钮文案 | `ReactNode` | `locale.cancel` |
| `action` | 自定义右侧操作区域 | `ReactNode` | - |
| `fieldStyle` | 内部 `Field` 容器样式 | `StyleProp<ViewStyle>` | - |
| `fieldContentStyle` | 内部内容区样式 | `StyleProp<ViewStyle>` | - |
| `onSearch` | 点击键盘搜索或 `onSubmitEditing` 触发 | `(value: string) => void` | - |
| `onCancel` | 点击默认取消按钮触发 | `() => void` | - |
| `onChangeText` | 输入变化回调 | `(value: string) => void` | - |

> 其余属性与事件同 `Field`，例如 `maxLength`、`formatter`、`readOnly` 等将直接透传给内部的 `TextInput`。

## SearchRef

| 方法 | 说明 |
| --- | --- |
| `focus()` | 获取焦点 |
| `blur()` | 失去焦点 |
| `clear()` | 清空输入内容 |
