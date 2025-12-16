---
simulator:
  compact: true
---

# Search 搜索

## 介绍

用于搜索场景的输入框组件。

## 引入

```js
import { Search } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

`value` 用于控制搜索框中的文字，`background` 可以自定义搜索框外部背景色。

<code title="基础用法" src="./search/demo/basic.tsx"></code>

### 事件监听

Search 组件提供了 `onSearch` 和 `onCancel` 事件，`onSearch` 事件在点击键盘上的搜索/回车按钮后触发，`onCancel` 事件在点击搜索框右侧取消按钮时触发。

<code title="事件监听" src="./search/demo/event.tsx"></code>

### 搜索框内容对齐

通过 `align` 属性设置搜索框内容的对齐方式，可选值为 `center`、`right`。

<code title="搜索框内容对齐" src="./search/demo/align.tsx"></code>

### 禁用搜索框

通过 `disabled` 属性禁用搜索框。

<code title="禁用搜索框" src="./search/demo/disabled.tsx"></code>

### 自定义背景色

通过 `background` 属性可以设置搜索框外部的背景色，通过 `shape` 属性设置搜索框的形状，可选值为 `round`。

<code title="自定义背景色" src="./search/demo/background.tsx"></code>

### 自定义按钮

使用 `actionText` 属性可以自定义右侧按钮的内容；当 `actionText` 为自定义节点时，默认取消逻辑将不再生效（由自定义节点自行处理点击）。

<code title="自定义按钮" src="./search/demo/action-text.tsx"></code>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 搜索框左侧文本 | `ReactNode` | - |
| `shape` | 搜索框形状 | `'square' \| 'round'` | `square` |
| `background` | 搜索框外部背景色 | `string` | 主题默认色 |
| `maxLength` | 输入的最大字符数 | `number` | - |
| `placeholder` | 占位提示文字 | `string` | - |
| `clearable` | 是否启用清除图标 | `boolean` | `true` |
| `clearIcon` | 清除图标 | `ReactNode` | `clear` |
| `clearTrigger` | 显示清除图标的时机 | `'always' \| 'focus'` | `focus` |
| `autoFocus` | 是否自动聚焦 | `boolean` | `false` |
| `showAction` | 是否在搜索框右侧显示取消按钮 | `boolean` | `false` |
| `actionText` | 取消按钮文字/自定义按钮内容 | `ReactNode` | `locale.cancel` |
| `action` | 自定义右侧操作内容 | `ReactNode` | - |
| `disabled` | 是否禁用输入框 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `error` | 是否将输入内容标红 | `boolean` | `false` |
| `errorMessage` | 底部错误提示文案 | `ReactNode` | - |
| `formatter` | 输入内容格式化函数 | `(val: string) => string` | - |
| `formatTrigger` | 格式化函数触发时机 | `'onBlur' \| 'onChange'` | `onChange` |
| `align` | 输入框内容对齐方式 | `'left' \| 'center' \| 'right'` | `left` |
| `leftIcon` | 输入框左侧图标 | `ReactNode` | 搜索图标 |
| `rightIcon` | 输入框右侧图标 | `ReactNode` | - |
| `value` | 当前值（受控） | `string` | - |
| `defaultValue` | 默认值（非受控） | `string` | `''` |
| `fieldStyle` | 内部 `Field` 容器样式 | `StyleProp<ViewStyle>` | - |
| `fieldContentStyle` | 内部内容区样式 | `StyleProp<ViewStyle>` | - |
| `onChange` | 输入框内容变化时触发（推荐） | `(value: string) => void` | - |
| `onChangeText` | 输入框内容变化时触发（兼容） | `(value: string) => void` | - |
| `onSearch` | 确认搜索时触发 | `(value: string) => void` | - |
| `onCancel` | 点击取消按钮时触发 | `() => void` | - |

> 其余属性与事件同 `Field`，例如 `maxLength`、`formatter`、`readOnly` 等将直接透传给内部的 `TextInput`。

## SearchRef

| 方法 | 说明 |
| --- | --- |
| `focus()` | 获取焦点 |
| `blur()` | 失去焦点 |
| `clear()` | 清空输入内容 |
