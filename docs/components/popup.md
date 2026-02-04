---
simulator:
  compact: true
---

# Popup 弹出层

## 介绍

基于 Portal 的弹出层，支持多方向、关闭图标、异步关闭以及圆角、安全区等配置，用来承载菜单、表单等浮层内容。

## 引入

```js
import { Popup } from 'react-native-system-ui'
```

> Popup 基于 Portal 渲染，使用前需在应用根节点包裹 **ConfigProvider** 或 **Portal.Host**，否则弹层无法挂载。推荐使用 [ConfigProvider](./config-provider.md)（内置主题与 PortalHost）。

## 代码演示

### 基础用法

通过 `visible` 与 `onClose` 受控弹层的打开/关闭状态，点击 `Cell` 即可展示。示例使用默认的 `center` 弹出位置，并仅展示一块内容区域。

<code title="基础用法" src="./popup/demo/base.tsx"></code>

### 弹出位置

将 `placement`（部分实现中命名为 `position`）设置为 `top`、`bottom`、`left`、`right` 即可在不同方向弹出；`center` 的场景可参考基础用法。示例为每个方向维护独立的弹层，并通过样式控制高度/宽度。

<code title="弹出位置" src="./popup/demo/placement.tsx"></code>

### 关闭图标

开启 `closeable` 后会展示默认关闭图标，可用 `closeIcon` 自定义图标节点，并用 `closeIconPosition` 控制位置。示例覆盖三个常见场景：默认、替换图标以及左上角位置。

<code title="关闭图标" src="./popup/demo/closeable.tsx"></code>

### 异步关闭

`beforeClose` 在关闭前触发，可返回 `false`/`Promise<false>` 阻止关闭，用于二次确认或异步校验。回调会收到触发来源（`close-icon`、`overlay`、`close`）。

<code title="异步关闭" src="./popup/demo/beforeClose.tsx"></code>

### 圆角样式

设置 `round` 后会根据弹出方向自动为对应边添加圆角。示例演示底部圆角弹窗，配合 `closeable` 与固定位高度的底部弹层。

<code title="圆角" src="./popup/demo/round.tsx"></code>

### 标题弹窗

设置 `title` 和 `description` 属性后，会在弹层顶部渲染标题与描述，常用于底部弹窗。

<code title="标题弹窗" src="./popup/demo/title.tsx"></code>

通过 `safeArea` 或 `safeAreaInsetTop` / `safeAreaInsetBottom` 可适配刘海屏与底部安全区，见下方 API。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示 | `boolean` | - |
| `placement` / `position` | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'center'` |
| `overlay` | 是否显示遮罩 | `boolean` | `true` |
| `overlayStyle` | 自定义遮罩样式 | `StyleProp<ViewStyle>` | - |
| `overlayAccessibilityLabel` | 无障碍描述，用于提示遮罩按钮的用途 | `string` | `关闭弹层` |
| `overlayTestID` | 遮罩测试标识 | `string` | `popup-overlay` |
| `closeOnOverlayPress` / `closeOnClickOverlay` | 点击遮罩是否关闭 | `boolean` | `true` |
| `closeOnBackPress` | Android 返回键是否关闭 | `boolean` | `false` |
| `closeOnPopstate` | 浏览器返回（popstate）是否关闭 | `boolean` | `false` |
| `closeable` | 是否展示关闭图标 | `boolean` | `false` |
| `closeIcon` | 自定义关闭图标 | `ReactNode` | - |
| `closeIconPosition` | 关闭图标位置 | `'top-right' \| 'top-left' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` |
| `round` | 是否根据位置自动设置圆角 | `boolean` | `false` |
| `title` | 弹出层标题 | `ReactNode` | - |
| `description` | 弹出层描述 | `ReactNode` | - |
| `safeArea` | 是否使用安全区内边距包裹内容 | `boolean` | `false` |
| `safeAreaInsetTop` | 内容顶部是否预留安全区 | `boolean` | `false` |
| `safeAreaInsetBottom` | 内容底部是否预留安全区 | `boolean` | `false` |
| `lockScroll` | 是否锁定背景滚动/点击 | `boolean` | `true` |
| `destroyOnClose` | 关闭后是否卸载内容 | `boolean` | `true` |
| `duration` | 动画时长 (ms) | `number` | `300` |
| `zIndex` | 自定义层级 | `number` | - |
| `beforeClose` | 关闭前回调，返回 `false`/`Promise<false>` 阻止关闭 | `(reason: 'close-icon' \| 'overlay' \| 'close') => boolean \| Promise<boolean>` | - |
| `stopPropagation` | 是否阻止内容区触发背景点击 | `boolean` | `true` |
| 其余 | 透传至内容容器 | `ViewProps` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onClickOverlay` | 点击遮罩层时触发 | `() => void` |
| `onClose` | 请求关闭时触发（配合受控 `visible`） | `() => void` |
| `onOpen` | 弹层开始打开时触发 | `() => void` |
| `onOpened` | 弹层完全打开（动画结束）时触发 | `() => void` |
| `onClosed` | 弹层完全关闭时触发 | `() => void` |

### 类型定义

```ts
import type { PopupPlacement, PopupCloseIconPosition } from 'react-native-system-ui'
```

> `beforeClose` 会收到触发来源（`close-icon`、`overlay`、`close`），可用于二次确认或异步校验。

## 差异说明

- React Vant 的 `duration` 单位为秒，本库为毫秒（ms）。
- React Vant 提供 `teleport`（挂载节点）能力；本库不提供该 prop，但可通过在局部区域内包裹 `Portal.Host` / `ConfigProvider` 来控制弹层挂载位置与配置作用域。
- React Vant 的 `className/overlayClass/transition` 等 DOM 能力在 React Native 环境不适用，本库以样式 props（如 `style/overlayStyle`）替代。
