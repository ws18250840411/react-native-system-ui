---
simulator:
  compact: false
---

# Loading 加载

## 介绍

用于展示加载中的状态，支持圆形指示器与轮播条样式，提供清晰的 API 语义。

## 引入

```js
import { Loading } from 'react-native-system-ui'
```

## 代码演示

### 加载类型

`type` 支持 `circular` 与 `spinner` 两种表现。

<code title="加载类型" src="./loading/demo/type.tsx"></code>

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
| `type` | 加载类型 | `'circular' \| 'spinner'` | `'circular'` |
| `size` | 指示器尺寸（px） | `number` | `30` |
| `color` | 指示器颜色 | `string` | `tokens.colors.indicator` |
| `textSize` | 文案字号 | `number` | `tokens.defaults.textSize` |
| `textColor` | 文案颜色 | `string` | `tokens.colors.text` |
| `vertical` | 是否纵向排列 | `boolean` | `false` |
| `textStyle` | 文案样式 | `StyleProp<TextStyle>` | - |
| `contentStyle` | 指示器容器样式 | `StyleProp<ViewStyle>` | - |

> 当前 `spinner` 类型通过 12 根线条 + 旋转动画实现，不依赖额外原生模块，可按需通过主题 overrides 调整线条数量、长度等指标。
