---
simulator:
  compact: true
---

# ImagePreview 图片预览

## 介绍

全屏浏览图片，支持横向滑动切换、页码/指示器展示以及遮罩关闭控制。

## 引入

```js
import { ImagePreview } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code src="./image-preview/demo/basic.tsx" title="基础"></code>

### 自定义页码

<code src="./image-preview/demo/custom-index.tsx" title="自定义索引"></code>

### 指示器与关闭控制

<code src="./image-preview/demo/controls.tsx" title="指示器"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否展示 ImagePreview | `boolean` | `false` |
| `images` | 图片数组，支持字符串 URL 或 `ImageSourcePropType` | `(string \| ImageSourcePropType)[]` | `[]` |
| `startPosition` | 初始展示的图片下标 | `number` | `0` |
| `showIndex` | 是否展示顶部页码 | `boolean` | `true` |
| `indexRender` | 自定义页码渲染内容 | `({ index, len }) => ReactNode` | `-` |
| `showIndicators` | 是否展示底部指示器 | `boolean` | `false` |
| `closeable` | 是否展示关闭图标 | `boolean` | `false` |
| `closeIcon` | 自定义关闭图标 | `ReactNode` | `-` |
| `closeIconPosition` | 关闭图标位置 | `'top-left' \| 'top-right'` | `'top-right'` |
| `closeOnlyClickCloseIcon` | 仅点击关闭图标时才关闭 | `boolean` | `false` |
| `overlay` | 是否显示遮罩 | `boolean` | `true` |
| `overlayStyle` | 遮罩样式 | `StyleProp<ViewStyle>` | `-` |
| `closeOnBackPress` | Android 返回键是否关闭 | `boolean` | `false` |
| `closeOnPopstate` | Web history 返回时是否关闭 | `boolean` | `false` |
| `zIndex` | 自定义层级 | `number` | `-` |
| `duration` | 动画时长（ms） | `number` | `200` |
| `onChange` | 切换图片回调 | `(index: number) => void` | `-` |
| `onClose` | 请求关闭时触发 | `({ index, image }) => void` | `-` |
| `beforeClose` | 关闭前回调，返回 `false` 阻止关闭 | `({ reason, index, image }) => boolean \| Promise<boolean>` | `-` |
| `onClosed` | 关闭动画完成回调 | `() => void` | `-` |

> 差异说明：当前版本暂未实现双指缩放/拖拽等高级手势，后续将结合 `gesture kit` 再迭代。
