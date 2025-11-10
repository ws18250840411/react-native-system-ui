---
simulator:
  compact: false
---

# Badge 徽标

## 介绍

在子元素右上角展示数字或红点，用于强调数量状态。

## 引入

```js
import { Badge } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

设置 `content` 显示数字，也可以使用 `dot` 展示小红点。

<code title="基础用法" src="./badge/demo/basic.tsx"></code>

### 最大值

通过 `max` 限制展示的最大值，超过后会自动追加 `+`。

<code title="最大值" src="./badge/demo/max.tsx"></code>

### 自定义颜色与偏移

可以通过 `color` 修改背景色，`offset` 则可以微调徽标位置。

<code title="自定义颜色和偏移" src="./badge/demo/custom.tsx"></code>

### 自定义内容

`content` 支持传入任意 `ReactNode`，例如搭配 `Tag` 使用。

<code title="自定义内容" src="./badge/demo/customContent.tsx"></code>

### 独立展示

没有子元素时徽标会独立渲染，可直接用作计数器。

<code title="独立展示" src="./badge/demo/standalone.tsx"></code>

## API

### Badge Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `content` | 徽标内容，支持 `ReactNode` | `ReactNode` | - |
| `color` | 背景颜色 | `string` | 主题 danger 色 |
| `textColor` | 文本颜色 | `string` | `#fff` |
| `dot` | 是否展示为小红点 | `boolean` | `false` |
| `max` | 最大值，超过后显示 `{max}+`（当 `content` 为数字时生效） | `number \| string` | - |
| `offset` | 偏移量，数组两项分别对齐 `right` 与 `top`（无子元素时对齐 `marginLeft` 与 `marginTop`） | `[number \| string, number \| string]` | - |
| `showZero` | 数字为 0 时是否仍展示 | `boolean` | `true` |
| `badgeStyle` | 徽标样式 | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `onPress` | 点击时触发 | `() => void` | - |
| `style` | 包裹元素样式：有子元素时作用在外层容器，无子元素时作用在徽标自身 | `StyleProp<ViewStyle>` | - |

> 当 `Badge` 包裹子元素时徽标会以绝对定位吸附在右上角；若需要自定义定位，可结合 `offset` 或 `badgeStyle` 使用。
