---
simulator:
  compact: false
---

# Popup 弹出层

## 介绍

基于 `Modal` 封装的弹出层，支持多方向出现、圆角、点击遮罩关闭等能力。

## 引入

```js
import { Popup } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./popup/demo/base.tsx"></code>

### 不同方向

<code title="不同方向" src="./popup/demo/placement.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示 | `boolean` | - |
| `placement` | 弹出方向 | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` |
| `overlay` | 是否显示遮罩 | `boolean` | `true` |
| `overlayStyle` | 遮罩样式 | `StyleProp<ViewStyle>` | - |
| `closeOnOverlayPress` | 点击遮罩是否关闭 | `boolean` | `true` |
| `round` | 是否圆角 | `boolean` | `false` |
| `safeArea` | 是否包裹 SafeAreaView | `boolean` | `false` |
| `duration` | 动画时长 (ms) | `number` | `200` |
| `onClose` | 关闭时触发 | `() => void` | - |
| 其余 | 透传至内容容器 | `ViewProps` | - |

> `Popup` 会在关闭动画结束后再触发 `onClose`，确保与 React Vant 行为一致。
