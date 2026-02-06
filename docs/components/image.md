---
simulator:
  compact: false
---

# Image 图片

## 介绍

用于展示网络图片，支持加载/失败状态与圆形样式。

## 引入

```js
import { Image } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

展示圆形头像与常规矩形图片。

<code src="./image/demo/basic.tsx" title="基础"></code>

### 填充模式

通过 `fit` 控制拉伸模式，对应 CSS 的 object-fit。

<code src="./image/demo/fit.tsx" title="填充模式"></code>

### 圆形/自定义圆角

`round` 会将容器裁剪为圆角（宽高相等时为圆形，否则为椭圆/胶囊形），也可以通过 `radius` 传入任意圆角。

<code src="./image/demo/round.tsx" title="圆形 & 圆角"></code>

### 加载与失败提示

默认会展示一个加载中蒙层与错误提示，可通过 `loadingText`、`fallback` 自定义内容。

<code src="./image/demo/loading.tsx" title="状态提示"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `src` | 图片地址 | `string` | - |
| `source` | ImageSourcePropType | `ImageSourcePropType` | - |
| `width` | 宽度 | `number \| string` | - |
| `height` | 高度 | `number \| string` | - |
| `radius` | 圆角 | `number` | - |
| `round` | 是否显示为圆形 | `boolean` | `false` |
| `fit` | 填充方式（cover/contain 等） | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| `showLoading` | 是否展示加载状态 | `boolean` | `true` |
| `showError` | 是否展示错误状态 | `boolean` | `true` |
| `loadingText` | 加载中文案 | `ReactNode` | `加载中…` |
| `errorText` | 错误文案 | `ReactNode` | `加载失败` |
| `fallback` | 自定义错误内容 | `ReactNode` | - |
| `containerStyle` | 容器样式，可定制背景或圆角 | `StyleProp<ViewStyle>` | - |
| 其余 | 继承 RN `Image` 属性 | - | - |

> 组件内部未实现懒加载，如需按需加载可结合 `FlatList` 的虚拟化或 intersection observer 库实现。

> 提示：如果通过 `style` 传入了布局属性（如 `width/height/flex/margin`），组件会同步应用到外层容器以保证占位层与圆角裁剪一致。

> Web 端图片元素会应用 `revert-layer` 修复尺寸样式。

## 差异说明

- `fit` 默认值为 `cover`（对齐 React Native 默认行为并避免拉伸变形），Web 端 CSS `object-fit` 默认值为 `fill`，如需一致可显式传 `fit="fill"`。
- React Native 环境不支持 `alt`、`lazyload` 等 DOM 能力（可用 `FlatList` 虚拟化或业务层懒加载替代）。
- 本库使用 `ActivityIndicator + loadingText/errorText/fallback` 实现占位状态（均支持传入 `ReactNode` 进行自定义）。
