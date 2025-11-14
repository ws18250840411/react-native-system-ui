---
simulator:
  compact: false
---

# Popup 弹出层

## 介绍

基于 Portal 的弹出层，支持多方向、关闭图标、异步关闭以及圆角、安全区等配置，用来承载菜单、表单等浮层内容。

## 引入

```js
import { Popup } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./popup/demo/base.tsx"></code>

### 弹出位置

<code title="弹出位置" src="./popup/demo/placement.tsx"></code>

### 关闭图标

<code title="关闭图标" src="./popup/demo/closeable.tsx"></code>

### 异步关闭

<code title="异步关闭" src="./popup/demo/beforeClose.tsx"></code>

### 圆角样式

<code title="圆角" src="./popup/demo/round.tsx"></code>

### 安全区域

<code title="安全区域" src="./popup/demo/safeArea.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示 | `boolean` | - |
| `placement` | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` |
| `overlay` | 是否显示遮罩 | `boolean` | `true` |
| `overlayStyle` | 遮罩样式 | `StyleProp<ViewStyle>` | - |
| `overlayTestID` | 遮罩测试标识 | `string` | `popup-overlay` |
| `closeOnOverlayPress` | 点击遮罩是否关闭 | `boolean` | `true` |
| `closeOnBackPress` | Android 返回键是否关闭 | `boolean` | `false` |
| `closeOnPopstate` | 浏览器返回（popstate）是否关闭 | `boolean` | `false` |
| `closeable` | 是否展示关闭图标 | `boolean` | `false` |
| `closeIcon` | 自定义关闭图标 | `ReactNode` | - |
| `closeIconPosition` | 关闭图标位置 | `'top-right' \| 'top-left'` | `'top-right'` |
| `round` | 是否根据位置自动设置圆角 | `boolean` | `false` |
| `safeArea` | 是否使用 `SafeAreaView` 包裹内容 | `boolean` | `false` |
| `safeAreaInsetTop` | 内容顶部是否预留安全区 | `boolean` | `false` |
| `safeAreaInsetBottom` | 内容底部是否预留安全区 | `boolean` | `false` |
| `lockScroll` | 是否锁定背景滚动/点击 | `boolean` | `true` |
| `destroyOnClose` | 关闭后是否卸载内容 | `boolean` | `true` |
| `duration` | 动画时长 (ms) | `number` | `200` |
| `zIndex` | 自定义层级 | `number` | - |
| `beforeClose` | 关闭前回调，返回 `false` / `Promise<false>` 可阻止关闭 | `(reason: 'close-icon' \| 'overlay' \| 'close') => boolean \| Promise<boolean>` | - |
| `onClickOverlay` | 点击遮罩时触发 | `() => void` | - |
| `onOpen` / `onOpened` / `onClosed` | 生命周期 | `() => void` | - |
| `onClose` | 请求关闭时触发（受控） | `() => void` | - |
| `stopPropagation` | 是否阻止内容区触发背景点击 | `boolean` | `true` |
| 其余 | 透传至内容容器 | `ViewProps` | - |

> `beforeClose` 会收到触发来源（`close-icon`、`overlay`、`close`），可用于二次确认或异步校验。
