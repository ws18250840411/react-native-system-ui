---
simulator:
  compact: false
---

# Circle 环形进度条

## 介绍

用于展示任务进度的环形进度条。

## 引入

```js
import { Circle } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./circle/demo/basic.tsx"></code>

### 自定义样式

<code title="自定义样式" src="./circle/demo/custom.tsx"></code>

### 动态控制

<code title="动态控制" src="./circle/demo/dynamic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rate` | 进度百分比（0-100） | `number \| string` | `0` |
| `size` | 圆环尺寸 | `number \| string` | `100` |
| `strokeWidth` | 圆环宽度 | `number \| string` | `6` |
| `color` | 进度条颜色 | `string` | `tokens.colors.color` |
| `layerColor` | 轨道颜色 | `string` | `tokens.colors.layerColor` |
| `fill` | 圆环内部填充色 | `string` | `transparent` |
| `clockwise` | 是否顺时针 | `boolean` | `true` |
| `startPosition` | 起始位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| `lineCap` | 线帽 | `'round' \| 'butt' \| 'square'` | `'round'` |
| `animated` | 是否开启过渡动画（Native 端生效） | `boolean` | `true` |
| `animationDuration` | 动画时长（ms） | `number` | `300` |
| `style` | 容器样式 | `StyleProp<ViewStyle>` | - |
| `children` | 圆环中间内容 | `ReactNode` | - |

> Web 端默认使用 `conic-gradient` 实现圆环；React Native 端依赖 `react-native-svg`。

