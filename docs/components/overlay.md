---
simulator:
  compact: false
---

# Overlay 遮罩层

## 介绍

创建一个全屏遮罩，用于阻止背景交互、强调浮层内容。

## 引入

```js
import { Overlay, OverlayProvider } from 'react-native-system-ui'
```

> Overlay 依赖 `<OverlayProvider>` 作为宿主容器；如果你已经使用 `PortalHost`/`ConfigProvider`，则无需额外包裹。

## 代码演示

### 基础用法

<code title="基础用法" src="./overlay/demo/basic.tsx"></code>

### 自定义内容

<code title="自定义内容" src="./overlay/demo/content.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `isOpen` | 是否显示 | `boolean` | `false` |
| `visible` | `isOpen` 的兼容别名 | `boolean` | - |
| `useRNModalOnAndroid` | Android 端是否使用 `Modal` 承载 | `boolean` | `false` |
| `useRNModal` | 强制使用 `Modal` 承载 | `boolean` | `false` |
| `onRequestClose` | `Modal` 关闭回调 | `() => void` | - |
| `isKeyboardDismissable` | 是否允许点击遮罩关闭键盘 | `boolean` | `true` |
| `animationPreset` | 动画类型（`Modal` 或 Overlay 容器展示策略） | `fade \| slide \| none` | `fade` |
| `style` | Overlay 容器样式 | `StyleProp<ViewStyle>` | - |
| `children` | Overlay 内部内容 | `ReactNode` | - |
