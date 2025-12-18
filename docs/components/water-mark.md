---
simulator:
  compact: true
---

# WaterMark 水印

## 介绍

在页面或某个容器上平铺文字/图片水印，常用于防止截图泄露。

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
| `width` | 单个水印宽度（文字水印） | `number` | `120` |
| `height` | 单个水印高度（文字水印） | `number` | `64` |
| `image` | 图片水印（存在时优先生效） | `{ src: string; width: number; height: number }` | - |
| `font` | 文字水印字体配置 | `{ color?: string; size?: number \| string; family?: string; weight?: string }` | - |
| `gapX` | 水印水平间距 | `number` | `24` |
| `gapY` | 水印垂直间距 | `number` | `48` |
| `rotate` | 旋转角度（deg） | `number` | `-22` |
| `fontSize` | 文本大小（兼容字段，优先级低于 `font.size`） | `number` | `14` |
| `color` | 文本颜色（兼容字段，优先级低于 `font.color`） | `string` | 主题默认 |
| `opacity` | 透明度 | `number` | `0.15` |
| `zIndex` | 层级 | `number` | `2000` |
| `fullPage` | 是否铺满整个屏幕 | `boolean` | `true` |
| `textStyle` | 自定义 `Text` 样式 | `StyleProp<TextStyle>` | - |
| `onLayoutCalculated` | 布局计算完成回调 | `({ width, height }) => void` | - |

> `fullPage=false` 时请传入 `style={StyleSheet.absoluteFill}`（或其它覆盖布局）以确保水印覆盖目标容器。
