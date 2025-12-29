---
simulator:
  compact: false
---

# Slider 滑块

## 介绍

滑动输入条，用于在给定的范围内选择一个值。

## 引入

```js
import { Slider } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./slider/demo/basic.tsx"></code>

### 垂直方向

设置 `vertical` 属性后，滑块会垂直展示，且高度为 100% 父元素高度。

<code title="垂直方向" src="./slider/demo/vertical.tsx"></code>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前进度百分比，在双滑块模式下为数组格式 | `number \| [number, number]` | `0` |
| `max` | 最大值 | `number \| string` | `100` |
| `min` | 最小值 | `number \| string` | `0` |
| `step` | 步长 | `number \| string` | `1` |
| `barHeight` | 进度条高度，默认单位为 `px` | `number \| string` | `2px` |
| `buttonSize` | 滑块按钮大小，默认单位为 `px` | `number \| string` | `24px` |
| `activeColor` | 进度条激活态颜色 | `string` | `#3f45ff` |
| `inactiveColor` | 进度条非激活态颜色 | `string` | `#e5e5e5` |
| `range` | 是否开启双滑块模式 | `boolean` | `false` |
| `reverse` | 是否将进度条反转 | `boolean` | `false` |
| `disabled` | 是否禁用滑块 | `boolean` | `false` |
| `readOnly` | 是否为只读状态，只读状态下无法修改滑块的值 | `boolean` | `false` |
| `vertical` | 是否垂直展示 | `boolean` | `false` |
| `button` | 自定义滑块按钮 | `ReactNode \| ({ value }) => ReactNode` | - |
| `leftButton` | 自定义左侧滑块按钮（双滑块模式下） | `ReactNode` | - |
| `rightButton` | 自定义右侧滑块按钮 （双滑块模式下） | `ReactNode` | - |
| `ariaLabel` | 无障碍 label | `string` | `'Slider'` |

### Events

`SliderValue` 指 `value`

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onChange` | 进度变化时**实时触发** | `value: SliderValue` |
| `onChangeAfter` | 进度变化且**结束拖动后触发** | `value: SliderValue` |
| `onDragStart` | 开始拖动时触发 | `event: GestureResponderEvent, value: SliderValue` |
| `onDragEnd` | 结束拖动时触发 | `event: GestureResponderEvent, value: SliderValue` |

> `trackHeight/thumbSize/thumb/leftThumb/rightThumb` 为历史别名，优先使用 `barHeight/buttonSize/button/leftButton/rightButton`。

> 轨道点击也会直接更新数值，并触发 `onChangeAfter`；在双滑块模式下，会自动跟随离点击位置更近的一侧。

> 通过主题的 `components.slider` 可以批量覆盖默认高度、尺寸与颜色等 tokens。
