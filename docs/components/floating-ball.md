---
simulator:
  compact: true
---

# FloatingBall 悬浮球

## 介绍

悬浮球用于提供全局悬浮快捷操作入口，可以自由拖动，并支持菜单扩展。

## 引入

```js
import { FloatingBall } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./floating-ball/demo/basic.tsx"></code>

### 带菜单

<code title="带菜单" src="./floating-ball/demo/menu.tsx"></code>

### 受控位置

<code title="受控位置" src="./floating-ball/demo/controlled.tsx"></code>

### 禁用拖拽

<code title="禁用拖拽" src="./floating-ball/demo/disabled.tsx"></code>

## API

### FloatingBall Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `menu` | 菜单配置项 | `MenuProps` | - |
| `adsorb` | 近边吸附能力（别名：`magnetic`） | `boolean \| AdsorbProps` | `true` |
| `draggable` | 是否开启拖拽 | `boolean` | `true` |
| `boundary` | 限制拖动范围在屏幕边界内 | `boolean` | `true` |
| `offset` | 初始位置（react-vant 风格） | `OffsetProps` | `{ right: 0, bottom: '30vh' }` |
| `disabled` | 禁用点击/拖拽 | `boolean` | `false` |
| `size` | 悬浮球尺寸 | `number` | `tokens.size` |
| `padding` | 可拖拽范围与边界的间距 | `number` | `tokens.padding` |
| `onPress` | 点击事件 | `() => void` | - |
| `children` | 悬浮球内容 | `ReactNode \| ({ active, indenting }) => ReactNode` | - |

### MenuProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 菜单元素，最多支持 5 个 | `ReactNode[]` | - |
| `active` | 菜单激活状态 | `boolean` | - |
| `defaultActive` | 默认的菜单激活状态 | `boolean` | - |
| `direction` | 菜单展开方向 | `'around' \| 'vertical' \| 'horizontal'` | `'around'` |
| `itemClickClose` | 点击菜单项关闭菜单 | `boolean` | `true` |
| `onChange` | 菜单状态变化的回调 | `(active?: boolean) => void` | - |

### AdsorbProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `distance` | 近边停靠距离 | `number` | `0` |

### OffsetProps

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `top` | 距离顶部的距离 | `number \| string` |
| `right` | 距离右侧的距离 | `number \| string` |
| `bottom` | 距离底部的距离 | `number \| string` |
| `left` | 距离左侧的距离 | `number \| string` |

> `OffsetProps` 的 string 支持 `vh/vw/%`（仅用于初始位置计算）。

### FloatingBallInstance

通过 ref 可以获取到实例并调用方法：

```ts
const ref = useRef<FloatingBallInstance>(null)
ref.current?.open()
ref.current?.close()
```

> 兼容说明：仍支持旧版 `position/defaultPosition/onChange/magnetic` 用法（受控位置/吸附边缘）。
