---
simulator:
  compact: true
---

# FloatingBall 浮动球

## 介绍

一个可拖拽的浮动按钮，支持吸附边缘、记录位置以及受控模式，用于快速唤起菜单或操作入口。

## 引入

```js
import { FloatingBall } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code src="./floating-ball/demo/basic.tsx" title="基础"></code>

### 受控位置

<code src="./floating-ball/demo/controlled.tsx" title="受控"></code>

### 禁用拖拽

<code src="./floating-ball/demo/disabled.tsx" title="禁用"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `position` | 浮动球受控位置（`{ x, y }`） | `{ x: number; y: number }` | - |
| `defaultPosition` | 默认位置 | `{ x: number; y: number }` | 屏幕右侧中部 |
| `onChange` | 拖拽释放后的回调 | `(pos) => void` | - |
| `magnetic` | 是否自动吸附左右边缘 | `boolean` | `true` |
| `draggable` | 是否允许拖拽 | `boolean` | `true` |
| `disabled` | 禁用点击/拖拽 | `boolean` | `false` |
| `size` | 悬浮球尺寸 | `number` | `56` |
| `padding` | 可拖拽范围与边界的间距 | `number` | 主题默认 |
| `onPress` | 点击事件 | `() => void` | - |
| 其余 | 继承 `ViewProps` | - | - |

> 差异说明：首版仅支持左右吸附（无多个菜单/吸附动画配置），如需复杂菜单可在浮动球 children 内组合自定义视图。
