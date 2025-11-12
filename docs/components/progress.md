---
simulator:
  compact: false
---

# Progress 进度条

## 介绍

用于展示当前任务的完成进度，对齐 react-vant 的 API。

## 引入

```js
import { Progress } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `percentage` 控制进度百分比。

<code title="基础用法" src="./progress/demo/base.tsx"></code>

### 线条粗细

`strokeWidth` 可调整进度条高度。

<code title="线条粗细" src="./progress/demo/stroke.tsx"></code>

### 置灰状态

`inactive` 会让进度条与标签变为灰色。

<code title="置灰" src="./progress/demo/inactive.tsx"></code>

### 自定义颜色与文案

使用 `color`、`pivotText`、`showPivot` 等属性定制外观。

<code title="自定义样式" src="./progress/demo/color.tsx"></code>

### 过渡效果

默认开启过渡动画，可通过 `transition` 开关控制。

<code title="过渡效果" src="./progress/demo/transition.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `percentage` | 进度百分比，0-100 | `number \| string` | `0` |
| `strokeWidth` | 进度条高度，接受数字或 `px` 字符串 | `number \| string` | `tokens.sizes.height` |
| `color` | 进度条颜色 | `string` | `tokens.colors.indicator` |
| `trackColor` | 轨道颜色 | `string` | `tokens.colors.track` |
| `inactive` | 是否置灰 | `boolean` | `false` |
| `showPivot` | 是否展示进度文案 | `boolean` | `true` |
| `pivotText` | 自定义进度文案 | `ReactNode` | `${percentage}%` |
| `pivotColor` | 文案背景色 | `string` | 与进度条颜色一致 |
| `textColor` | 文案文字颜色 | `string` | `tokens.colors.pivotText` |
| `pivotStyle` | 文案样式 | `StyleProp<TextStyle>` | - |
| `indicatorStyle` | 进度条样式 | `StyleProp<ViewStyle>` | - |
| `transition` | 是否开启过渡动画 | `boolean` | `true` |
| `animationDuration` | 过渡动画时长（ms） | `number` | `300` |

> 当前渐变色可通过传入 CSS `linear-gradient` 字符串的方式在 RN Web 环境下生效；在纯原生端建议自定义 `indicatorStyle` 以实现渐变效果。
