---
simulator:
  compact: false
---

# Slider 滑块

## 介绍

滑动输入条，支持单滑块与双滑块模式，API 与 react-vant 对齐。

## 引入

```js
import { Slider } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./slider/demo/base.tsx"></code>

### 双滑块

<code title="双滑块" src="./slider/demo/range.tsx"></code>

### 自定义样式

<code title="自定义样式" src="./slider/demo/style.tsx"></code>

### 垂直方向

<code title="垂直方向" src="./slider/demo/vertical.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前值；`range` 时为 `[min,max]` | `number \| [number, number]` | `0` |
| `min` | 最小值 | `number` | `0` |
| `max` | 最大值 | `number` | `100` |
| `step` | 步长 | `number` | `1` |
| `range` | 是否启用双滑块 | `boolean` | `false` |
| `reverse` | 是否反向 | `boolean` | `false` |
| `vertical` | 是否垂直展示 | `boolean` | `false` |
| `disabled` | 禁用状态 | `boolean` | `false` |
| `readOnly` | 只读状态 | `boolean` | `false` |
| `activeColor` | 激活轨道颜色 | `string` | `#3f45ff` |
| `inactiveColor` | 未激活轨道颜色 | `string` | `#e5e5e5` |
| `trackHeight` | 轨道粗细（px） | `number` | `2` |
| `thumbSize` | 滑块按钮大小（px） | `number` | `24` |
| `thumb` | 自定义滑块按钮节点 | `ReactNode` | - |
| `leftThumb` | 自定义左侧滑块按钮（range） | `ReactNode` | - |
| `rightThumb` | 自定义右侧滑块按钮（range） | `ReactNode` | - |
| `onChange` | 拖动实时回调 | `(value: SliderValue) => void` | - |
| `onChangeAfter` | 拖动结束回调 | `(value: SliderValue) => void` | - |
| `onDragStart` | 开始拖动 | `(event, value) => void` | - |
| `onDragEnd` | 结束拖动 | `(event, value) => void` | - |

> 轨道点击也会直接更新数值，并触发 `onChangeAfter`；在双滑块模式下，会自动跟随离点击位置更近的一侧。
