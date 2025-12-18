---
simulator:
  compact: false
---

# Overlay 遮罩层

## 介绍

创建一个全屏遮罩，用于阻止背景交互、强调浮层内容。

## 引入

```js
import { Overlay } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./overlay/demo/basic.tsx"></code>

### 自定义内容

<code title="自定义内容" src="./overlay/demo/content.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示 | `boolean` | `false` |
| `color` | 背景色 | `string` | `rgba(0, 0, 0, 0.7)` |
| `duration` | 动画时长（ms） | `number \| string` | `300` |
| `lockScroll` | 是否锁定页面滚动（主要影响 Web） | `boolean` | `true` |
| `closeOnBackPress` | Android 返回键是否关闭遮罩 | `boolean` | `false` |
| `zIndex` | 自定义层级 | `number \| string` | - |
| `style` | 容器样式（覆盖全屏层） | `StyleProp<ViewStyle>` | - |
| `onPress` | 点击遮罩触发 | `() => void` | - |
| `onClick` | 同 `onPress`（与 Web/官方命名对齐） | `() => void` | - |
| `children` | 遮罩上的自定义内容 | `ReactNode` | - |
