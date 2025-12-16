---
simulator:
  compact: true
---

# Grid 宫格

## 介绍

宫格可以在水平方向上将内容均分成若干入口。

## 引入

```js
import { Grid } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `icon`/`text` 展示图文入口。

<code title="基础用法" src="./grid/demo/base.tsx"></code>

### 自定义列数

通过 `columnNum` 调整每行格子数量。

<code title="自定义列数" src="./grid/demo/column.tsx"></code>

### 自定义内容

使用 `children` 完全接管内容，可与卡片等元素组合。

<code title="自定义内容" src="./grid/demo/custom.tsx"></code>

### 正方形格子

设置 `square` 后格子高度与宽度一致，常用于图标导航。

<code title="正方形格子" src="./grid/demo/square.tsx"></code>

### 格子间距

`gutter` 控制格子之间的间距，可与 `border={false}` 搭配使用。

<code title="格子间距" src="./grid/demo/gutter.tsx"></code>

### 内容横排

将 `direction` 设为 `horizontal`，可以让图标与文字横向排列。

<code title="内容横排" src="./grid/demo/direction.tsx"></code>

### 徽标提示

通过 `badge` 或 `dot` 为入口增加红点、数字等提示。

<code title="徽标提示" src="./grid/demo/badge.tsx"></code>

## API

### Grid Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columnNum` | 每行格子数量 | `number` | `4` |
| `gutter` | 格子间距，单位 px | `number` | `0` |
| `border` | 是否展示边框 | `boolean` | `true` |
| `center` | 是否让内容居中 | `boolean` | `true` |
| `square` | 是否固定为正方形 | `boolean` | `false` |
| `direction` | 内容排列方向，可选 `vertical` `horizontal` | `GridDirection` | `'vertical'` |
| `reverse` | 是否调换图文位置 | `boolean` | `false` |
| `clickable` | 是否开启点击反馈（`Pressable`） | `boolean` | `false` |
| `iconSize` | 图标尺寸（传给 `icon` 函数） | `number` | `28` |
| `iconColor` | 图标默认颜色 | `string` | `tokens.colors.text` |

### Grid.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 文字内容 | `ReactNode` | - |
| `icon` | 图标节点或函数 `(size, color) => ReactNode` | `ReactNode \| (size: number, color: string) => ReactNode` | - |
| `iconColor` | 覆盖单个格子的图标颜色 | `string` | - |
| `badge` | 图标徽标，等同于 `Badge` 的 Props | `BadgeProps` | - |
| `dot` | 是否展示小红点 | `boolean` | `false` |
| `contentStyle` | 内容容器样式 | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `children` | 自定义格子内容，存在时会覆盖 `icon/text` | `ReactNode` | - |
| 其余 `Pressable` props | 在 `clickable` 或传入 `onPress` 时生效 | - | - |

> React Native 不支持 web 端的路由 `to/replace`，如需跳转请结合 React Navigation、Expo Router 等导航库。
