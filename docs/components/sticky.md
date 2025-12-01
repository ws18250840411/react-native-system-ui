---
simulator:
  compact: false
---

# Sticky 吸顶容器

## 介绍

`Sticky` 让任意内容在滚动过程中保持在视口顶部，用于实现频道导航、工具栏等吸顶场景。

## 引入

```js
import { Sticky, useGestureScroll } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

将 `Sticky` 包裹在 `Animated.ScrollView` 中，并把 `useGestureScroll` 返回的 `scrollValue` 传入即可。

<code src="./sticky/demo/base.tsx" title="基础吸顶"></code>

### 自定义偏移

通过 `offsetTop` 让吸顶内容避开状态栏或自定义头部，也可以关闭阴影或修改背景色。

<code src="./sticky/demo/offset.tsx" title="自定义偏移与样式"></code>

### 动态开关

结合自身状态控制 `disabled`，随时切换吸顶能力。

<code src="./sticky/demo/disabled.tsx" title="动态控制"></code>

## API

### Sticky Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `scrollValue` | `useGestureScroll` 返回的滚动值；未传时组件仅作为普通容器展示 | `Animated.Value` | `-` |
| `offsetTop` | 吸顶时距离视口顶部的偏移，常用于处理 SafeArea/Header | `number` | `tokens.defaults.offsetTop (0)` |
| `zIndex` | 吸顶层级 | `number` | `tokens.defaults.zIndex (99)` |
| `enableShadow` | 是否在吸顶时自动注入阴影 | `boolean` | `tokens.defaults.enableShadow (true)` |
| `backgroundColor` | 吸顶内容背景色 | `string` | `tokens.defaults.backgroundColor` |
| `disabled` | 关闭吸顶能力 | `boolean` | `false` |
| `position` | 吸附位置，目前仅支持 `top`，`bottom` 将按照 `top` 行为处理 | `'top' \| 'bottom'` | `'top'` |
| `style` | 最外层容器样式 | `StyleProp<ViewStyle>` | `-` |
| `contentStyle` | 实际吸顶内容样式 | `StyleProp<ViewStyle>` | `-` |
| `onChange` | 吸顶状态变更回调 | `(isFixed: boolean) => void` | `-` |
| `onScroll` | 每次滚动触发，返回当前滚动距离与是否吸顶 | `(event: StickyScrollEvent) => void` | `-` |

### StickyScrollEvent

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `scrollTop` | 当前滚动距离 | `number` |
| `isFixed` | 是否处于吸顶状态 | `boolean` |

> 差异说明：React Native 暂未提供简易的 `container` 限制能力，也无法直接实现 `position="bottom"` 的吸底场景；如需在特定容器内停靠，可结合自定义滚动监听做进一步计算。
