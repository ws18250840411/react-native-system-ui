---
simulator:
  compact: true
---

# Grid 宫格

## 介绍

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

## 引入

```js
import { Grid } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `icon` 属性设置格子内的图标，`text` 属性设置文字内容。

<code title="基础用法" src="./grid/demo/base.tsx"></code>

### 自定义列数

默认一行展示四个格子，可以通过 `columnNum` 自定义列数。

<code title="自定义列数" src="./grid/demo/column.tsx"></code>

### 自定义内容

通过插槽可以自定义格子展示的内容。

<code title="自定义内容" src="./grid/demo/custom.tsx"></code>

### 正方形格子

设置 `square` 属性后，格子的高度会和宽度保持一致。

<code title="正方形格子" src="./grid/demo/square.tsx"></code>

### 格子间距

通过 `gutter` 属性设置格子之间的距离。

<code title="格子间距" src="./grid/demo/gutter.tsx"></code>

### 内容横排

将 `direction` 属性设置为 `horizontal`，可以让宫格的内容呈横向排列。

<code title="内容横排" src="./grid/demo/direction.tsx"></code>

### 徽标提示

设置 `dot` 属性后，会在图标右上角展示一个小红点。设置 `badge` 属性后，会在图标右上角展示相应的徽标。

<code title="徽标提示" src="./grid/demo/badge.tsx"></code>

## API

### Grid Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columnNum` | 列数 | `number` | `4` |
| `iconSize` | 图标大小 | `number` | `28` |
| `gutter` | 格子之间的间距，默认单位为`px` | `number` | `0` |
| `border` | 是否显示边框 | `boolean` | `true` |
| `center` | 是否将格子内容居中显示 | `boolean` | `true` |
| `square` | 是否将格子固定为正方形 | `boolean` | `false` |
| `direction` | 格子内容排列的方向 | `'horizontal' \| 'vertical'` | `'vertical'` |
| `reverse` | 是否调换图标和文本的位置 | `boolean` | `false` |
| `clickable` | 是否开启整组可点击态 | `boolean` | `false` |
| `iconColor` | 图标颜色 | `string` | - |

### GridItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 文字 | `ReactNode` | - |
| `icon` | 图标 | `ReactNode \| ((size: number, color: string) => ReactNode)` | - |
| `iconColor` | 图标颜色，等同于 Icon 组件的 [color 属性](/components/icon#props) | `string` | - |
| `badge` | 图标右上角徽标的内容 | `BadgeProps` | - |
| `dot` | 是否展示小红点 | `boolean` | `false` |
| `contentStyle` | 内容容器样式 | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `children` | 自定义格子内容，存在时会覆盖 `icon/text` | `ReactNode` | - |
| 其余 `Pressable` props | 在 `clickable` 或传入 `onPress` 时生效 | - | - |

### GridItem Events

| 事件名  | 说明           | 回调参数            |
| ------- | -------------- | ------------------- |
| `onPress` | 点击格子时触发 | `() => void` | - |

> React Native 不支持 web 端的路由 `to/replace`，如需跳转请结合 React Navigation、Expo Router 等导航库。
