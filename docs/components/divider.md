---
simulator:
  compact: false
---

# Divider 分割线

## 介绍

分割线可以将内容切分为不同的层级区域。

## 引入

```js
import { Divider } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

默认渲染一条水平分割线。

<code title="基础用法" src="./divider/demo/basic.tsx"></code>

### 展示文字

通过 `children` 可以在中间插入说明文字。

<code title="展示文字" src="./divider/demo/text.tsx"></code>

### 内容位置

通过 `contentPosition` 指定内容靠左、居中或靠右展示。

<code title="内容位置" src="./divider/demo/position.tsx"></code>

### 虚线

添加 `dashed` 属性可以把分割线改为虚线，同时可搭配 `lineColor`。

<code title="虚线" src="./divider/demo/dashed.tsx"></code>

### 自定义样式

可以通过 `style`、`textStyle` 与 `lineColor` 来自定义配色与间距。

<code title="自定义样式" src="./divider/demo/custom.tsx"></code>

## API

### Divider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 分割线方向，可选 `horizontal` | `DividerType` | `'horizontal'` |
| `dashed` | 是否为虚线 | `boolean` | `false` |
| `hairline` | 是否使用 0.5px 线条 | `boolean` | `true` |
| `contentPosition` | 文本位置，可选 `left` `center` `right` | `DividerContentPosition` | `'center'` |
| `lineColor` | 线条颜色 | `string` | `tokens.colors.line` |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `style` | 容器样式 | `StyleProp<ViewStyle>` | - |
