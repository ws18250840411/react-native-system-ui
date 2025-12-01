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

<code src="./image/demo/basic.tsx" title="基础"></code>

### 错误占位

<code src="./image/demo/error.tsx" title="加载失败"></code>

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
| 其余 | 继承 RN `Image` 属性 | - | - |

> 组件内部未实现懒加载，如需按需加载可结合 `FlatList` 的虚拟化或 intersection observer 库实现。
