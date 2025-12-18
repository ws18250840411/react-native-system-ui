---
simulator:
  compact: true
---

# Stepper 步进器

## 介绍

在允许的区间内通过加减按钮或输入框调整数值，适合价格、数量调节等场景。

## 引入

```js
import { Stepper } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./stepper/demo/basic.tsx"></code>

### 步长与范围

<code title="步长与范围" src="./stepper/demo/range.tsx"></code>

### 自定义精度与样式

<code title="自定义精度与样式" src="./stepper/demo/custom.tsx"></code>

### 禁用与禁用输入

<code title="禁用与禁用输入" src="./stepper/demo/disabled.tsx"></code>

### 异步变更

<code title="异步变更" src="./stepper/demo/before-change.tsx"></code>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前输入的值 | `number \| null` | - |
| `defaultValue` | 默认值 | `number \| null` | `0` |
| `min` | 最小值 | `number` | - |
| `max` | 最大值 | `number` | - |
| `step` | 步长，每次点击时改变的值 | `number` | `1` |
| `autoFixed` | 超出范围时是否自动修正到 `min/max`（对齐 Vant `auto-fixed`） | `boolean` | `true` |
| `beforeChange` | 变更前拦截（对齐 Vant `before-change`），返回 `false` 可阻止变更，支持 Promise | `(value) => boolean \| Promise<boolean>` | - |
| `name` | 标识符，可在 `onChange` 回调参数中获取 | `string` | - |
| `inputWidth` | 输入框宽度，默认单位为 `px` | `number \| string` | `32px` |
| `buttonSize` | 按钮大小以及输入框高度，默认单位为 `px` | `number \| string` | `28px` |
| `decimalLength` | 固定显示的小数位数 | `number \| string` | - |
| `theme` | 样式风格，可选值为 `round` | `StepperTheme` | `default` |
| `placeholder` | 输入框占位提示文字 | `string` | - |
| `integer` | 是否只允许输入整数 | `boolean` | `false` |
| `disabled` | 是否禁用步进器 | `boolean` | `false` |
| `disablePlus` | 是否禁用增加按钮 | `boolean` | `false` |
| `disableMinus` | 是否禁用减少按钮 | `boolean` | `false` |
| `disableInput` | 是否禁用输入框 | `boolean` | `false` |
| `showPlus` | 是否显示增加按钮 | `boolean` | `true` |
| `showMinus` | 是否显示减少按钮 | `boolean` | `true` |
| `showInput` | 是否显示输入框 | `boolean` | `true` |
| `longPress` | 是否开启长按手势 | `boolean` | `true` |
| `allowEmpty` | 是否允许输入的值为空 | `boolean` | `false` |
| `inputProps` | 透传给 `TextInput` 的属性 | `TextInputProps` | - |
| `inputStyle` | 输入框样式 | `StyleProp<TextStyle>` | - |
| `buttonStyle` | 按钮样式 | `StyleProp<ViewStyle>` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onClick` | 点击输入框时触发 | `event: GestureResponderEvent` |
| `onChange` | 当绑定值变化时触发的事件 | `value: number \| null, detail?: { name?: string }` |
| `onOverlimit` | 点击不可用的按钮时触发 | `type: 'plus' \| 'minus'` |
| `onPlus` | 点击增加按钮时触发 | `event: GestureResponderEvent, value: number \| null` |
| `onMinus` | 点击减少按钮时触发 | `event: GestureResponderEvent, value: number \| null` |
| `onFocus` | 输入框聚焦时触发 | `event: NativeSyntheticEvent<TextInputFocusEventData>` |
| `onBlur` | 输入框失焦时触发 | `event: NativeSyntheticEvent<TextInputFocusEventData>` |

## StepperRef

| 方法 | 说明 |
| --- | --- |
| `focus()` | 获取焦点 |
| `blur()` | 失去焦点 |

## 类型定义

组件导出以下类型定义：

```ts
import type { StepperTheme, StepperInstance } from 'react-native-system-ui'
```

> 支持通过主题的 `components.stepper` 覆盖 tokens，统一控制按钮尺寸、配色等设计语言。
