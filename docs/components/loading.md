---
simulator:
  compact: false
---

# Loading 加载

## 介绍

用于展示加载中状态的指示器，支持自定义大小、颜色与文案，可内联使用或搭配 Overlay 作为全屏遮罩。

## 引入

```js
import { Loading } from 'react-native-system-ui'
```

## 代码演示

### 加载指示器

使用 `ActivityIndicator` 作为统一指示器。

<code title="加载指示器" src="./loading/demo/type.tsx"></code>

### 自定义颜色

通过 `color` 控制指示器颜色。

<code title="自定义颜色" src="./loading/demo/color.tsx"></code>

### 自定义大小

`size` 单位为 px，可根据场景调整。

<code title="自定义大小" src="./loading/demo/size.tsx"></code>

### 加载文案

直接在组件内传入 children，即可展示加载文案。

<code title="加载文案" src="./loading/demo/text.tsx"></code>

### 垂直排列

设置 `vertical` 后，指示器与文案纵向排列。

<code title="垂直排列" src="./loading/demo/vertical.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 指示器尺寸（px） | `number` | `30` |
| `color` | 指示器颜色 | `string` | `tokens.colors.indicator` |
| `aria-label` | 无障碍标签 | `string` | `'loading'` |
| `textSize` | 文案字号 | `number` | `tokens.defaults.textSize` |
| `textColor` | 文案颜色 | `string` | `tokens.colors.text` |
| `vertical` | 是否纵向排列 | `boolean` | `false` |
| `textStyle` | 文案样式 | `StyleProp<TextStyle>` | - |
| `contentStyle` | 指示器容器样式 | `StyleProp<ViewStyle>` | - |

