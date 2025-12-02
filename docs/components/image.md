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

`round` 会按宽高中较大的值裁剪为圆形，也可以通过 `radius` 传入任意圆角。

<code src="./image/demo/round.tsx" title="圆形 & 圆角"></code>

### 加载与失败提示

默认会展示一个加载中蒙层与错误提示，可通过 `loadingText`、`fallback` 自定义内容。

<code src="./image/demo/loading.tsx" title="状态提示"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `src` | 图片地址 | `string` | - |
| `source` | ImageSourcePropType | `ImageSourcePropType` | - |
| `width` | 宽度 | `number` | - |
| `height` | 高度 | `number` | - |
| `radius` | 圆角 | `number` | 主题默认 |
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
