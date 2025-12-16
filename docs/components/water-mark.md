---
simulator:
  compact: true
---

# WaterMark 水印

## 介绍

在页面或某个容器上平铺文字水印，常用于防止截图泄露。

## 引入

```js
import { WaterMark } from 'react-native-system-ui'
```

## 代码演示

### 全屏水印

<code src="./water-mark/demo/basic.tsx" title="页面水印"></code>

### 区域水印

<code src="./water-mark/demo/custom.tsx" title="局部覆盖"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `content` | 水印文本 | `string` | `WaterMark` |
| `gapX` | 水印水平间距 | `number` | 主题默认 |
| `gapY` | 水印垂直间距 | `number` | 主题默认 |
| `rotate` | 旋转角度（deg） | `number` | `-22` |
| `fontSize` | 文本大小 | `number` | `14` |
| `color` | 文本颜色 | `string` | 主题默认 |
| `opacity` | 透明度 | `number` | `0.15` |
| `zIndex` | 层级 | `number` | `2000` |
| `fullPage` | 是否铺满整个屏幕 | `boolean` | `true` |
| `textStyle` | 自定义 `Text` 样式 | `TextStyle` | - |
| `onLayoutCalculated` | 布局计算完成回调 | `({ width, height }) => void` | - |

> 差异说明：当前版本仅支持文本水印，如需图片水印可在后续迭代中接入 `Image`/Canvas 能力，或自行覆盖组件实现。
