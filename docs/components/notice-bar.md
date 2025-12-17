---
simulator:
  compact: true
---

# NoticeBar 通知栏

## 介绍

循环播放展示一组消息通知，默认行为与 react-vant 一致。

## 引入

```js
import { NoticeBar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./notice-bar/demo/base.tsx"></code>

### 通知栏模式

`mode="closeable"` 显示关闭按钮，`mode="link"` 显示箭头。

<code title="通知栏模式" src="./notice-bar/demo/mode.tsx"></code>

### 自定义样式

通过 `color`、`background` 自定义配色。

<code title="自定义样式" src="./notice-bar/demo/style.tsx"></code>

### 滚动播放

内容溢出时可开启滚动。

<code title="滚动播放" src="./notice-bar/demo/scroll.tsx"></code>

### 多行展示

选择 `wrapable` 可改为换行展示。

<code title="多行展示" src="./notice-bar/demo/wrap.tsx"></code>

### 垂直滚动

设置 `direction="vertical"` 并提供 `items` 数据源即可实现垂直轮播效果。

<code title="垂直滚动" src="./notice-bar/demo/vertical.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 通知文本内容（与 `children` 互斥） | `ReactNode` | - |
| `color` | 文本颜色 | `string` | `#f97316` |
| `background` | 背景色 | `string` | `#fff7cc` |
| `leftIcon` | 自定义左侧图标 | `ReactNode` | - |
| `rightIcon` | 自定义右侧图标 | `ReactNode` | - |
| `mode` | `closeable` / `link` | `NoticeBarMode` | `undefined` |
| `delay` | 滚动延迟（秒） | `number` | `1` |
| `speed` | 滚动速度（px/s） | `number` | `60` |
| `scrollable` | 是否强制开启滚动 | `boolean` | `内容溢出时自动` |
| `wrapable` | 是否换行，仅在不滚动时生效 | `boolean` | `false` |
| `direction` | 滚动方向，`horizontal` / `vertical` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `items` | 垂直滚动时要循环展示的内容，不传时回退到 `text`/`children` | `ReactNode[]` | `[]` |
| `verticalInterval` | 垂直滚动的停留时长（毫秒） | `number` | `3000` |
| `verticalDuration` | 垂直滚动的切换动画时长（毫秒） | `number` | `300` |
| `onClose` | 关闭按钮点击回调 | `() => void` | - |
| `onPress` | 整体点击回调 | `() => void` | - |
| `onReplay` | 每次横向滚动重新开始时触发 | `() => void` | - |

> 当前滚动能力依赖 `Animated` 与 `measure` API，在 React Native Web 环境下需要组件挂载完成后才能正确计算宽度；在纯原生端行为与 react-vant 一致。
