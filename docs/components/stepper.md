---
simulator:
  compact: false
---

# Stepper 步进器

## 介绍

在允许的区间内通过加减按钮或输入框调整数值，API 对齐 react-vant Stepper，适合价格、数量调节等场景。

## 引入

```js
import { Stepper } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./stepper/demo/basic.tsx"></code>

### 自定义精度

<code title="自定义精度" src="./stepper/demo/custom.tsx"></code>

### 禁用与只读

<code title="禁用与只读" src="./stepper/demo/disabled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控值 | `number \| null` | - |
| `defaultValue` | 非受控默认值 | `number \| null` | `0` |
| `min` | 最小值 | `number` | `0` |
| `max` | 最大值 | `number` | `Number.MAX_SAFE_INTEGER` |
| `step` | 每次递增/减的步长 | `number` | `1` |
| `integer` | 是否只允许整数 | `boolean` | `false` |
| `decimalLength` | 保留小数位数（自动取整） | `number` | - |
| `disabled` | 是否禁用组件 | `boolean` | `false` |
| `disablePlus` | 禁用增加按钮 | `boolean` | `false` |
| `disableMinus` | 禁用减少按钮 | `boolean` | `false` |
| `disableInput` | 是否禁止输入框编辑 | `boolean` | `false` |
| `allowEmpty` | 输入框允许置空 | `boolean` | `false` |
| `showPlus` / `showMinus` / `showInput` | 是否展示对应元素 | `boolean` | `true` |
| `longPress` | 是否开启长按连续加减 | `boolean` | `true` |
| `size` | 尺寸，`small` / `medium` | `StepperSize` | `medium` |
| `theme` | 主题样式，`default` / `round` | `StepperTheme` | `default` |
| `inputWidth` | 输入框宽度 | `number` | 依据尺寸 | |
| `buttonSize` | 按钮宽高 | `number` | 依据尺寸 | |
| `inputProps` | 透传给 `TextInput` 的属性 | `TextInputProps` | - |
| `inputStyle` | 输入框样式 | `StyleProp<TextStyle>` | - |
| `buttonStyle` | 按钮样式 | `StyleProp<ViewStyle>` | - |
| `onChange` | 数值改变时触发 | `(value: number \| null) => void` | - |
| `onPlus` / `onMinus` | 点击加/减按钮后触发 | `(value: number \| null) => void` | - |
| `onOverlimit` | 达到边界仍尝试操作时触发 | `(type: 'plus' \| 'minus') => void` | - |
| `onFocus` / `onBlur` | 输入框聚焦/失焦回调 | `(value: number \| null) => void` | - |

> 支持通过主题的 `components.stepper` 覆盖 tokens，统一控制按钮尺寸、配色等设计语言。
