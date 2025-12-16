---
simulator:
  compact: true
---

# Cell 单元格

## 介绍

单元格为列表中的单个展示项。

## 引入

```js
import { Cell } from 'react-native-system-ui'
```

> `Cell` 底层基于 `Pressable` 封装，除本文列出的属性外，也可透传 `onPress` 等交互事件。

## 代码演示

### 基础用法

`Cell` 可以单独使用，也可以与 `Cell.Group` 搭配使用，`Cell.Group` 可以为 `Cell` 提供上下外边框。

<code title="基础用法" src="./cell/demo/base.tsx"></code>

### 用户列表

通过 `icon` 属性可以自定义左侧内容。

<code title="用户列表" src="./cell/demo/list.tsx"></code>

### 单元格大小

通过 `size` 属性可以控制单元格的大小。

<code title="单元格大小" src="./cell/demo/size.tsx"></code>

### 展示图标

通过 `icon` 属性在标题左侧展示图标。

<code title="展示图标" src="./cell/demo/icon.tsx"></code>

### 只设置 value

只设置 `value` 时，内容会靠左对齐。

<code title="只设置 value" src="./cell/demo/value.tsx"></code>

### 展示箭头

设置 `isLink` 属性后会在单元格右侧显示箭头，并且可以通过 `arrowDirection` 属性控制箭头方向。

<code title="展示箭头" src="./cell/demo/arrow.tsx"></code>

### 分组标题

通过 `Cell.Group` 的 `title` 属性可以指定分组标题。

<code title="分组标题" src="./cell/demo/group.tsx"></code>

### 卡片类型

通过 `Cell.Group` 的 `card` 属性可以展示卡片类型。

<code title="卡片类型" src="./cell/demo/card.tsx"></code>

### 自定义内容

可使用 `children` 自定义右侧内容。

<code title="自定义内容" src="./cell/demo/children.tsx"></code>

### 垂直居中

通过 `center` 属性可以让 `Cell` 的左右内容都垂直居中。

<code title="垂直居中" src="./cell/demo/vertical.tsx"></code>

## API

### CellGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 分组标题 | `ReactNode` | - |
| `border` | 是否显示外边框 | `boolean` | `true` |
| `inset` | 是否展示为圆角卡片风格 | `boolean` | `false` |
| `card` | 卡片风格（圆角 + 阴影） | `boolean` | `false` |

### Cell Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 左侧标题 | `ReactNode` | - |
| `value` | 右侧内容，支持字符串、数字或任意 `ReactNode`（节点会根据布局自动向左/右对齐） | `ReactNode` | - |
| `label` | 标题下方的描述信息 | `ReactNode` | - |
| `extra` | 自定义单元格最右侧的额外内容 | `ReactNode` | - |
| `size` | 单元格大小，可选值 `large` | `'normal' \| 'large'` | `'normal'` |
| `icon` | 左侧图标 | `ReactNode` | - |
| `rightIcon` | 自定义右侧图标，默认在 `isLink` 或 `clickable` 时展示 `Arrow` | `ReactNode` | - |
| `border` | 是否显示内边框 | `boolean` | `true` |
| `clickable` | 是否开启点击反馈 | `boolean` | `false` |
| `isLink` | 是否展示右侧箭头并开启点击反馈 | `boolean` | `false` |
| `required` | 是否显示表单必填星号 | `boolean` | `false` |
| `center` | 是否使内容垂直居中 | `boolean` | `false` |
| `arrowDirection` | 箭头方向，可选 `left` `right` `up` `down` | `CellArrowDirection` | `'right'` |
| `titleStyle` | 标题样式 | `StyleProp<TextStyle>` | - |
| `valueStyle` | 右侧内容样式 | `StyleProp<TextStyle>` | - |
| `labelStyle` | 描述信息样式 | `StyleProp<TextStyle>` | - |
| `contentStyle` | 自定义 `children` 容器样式 | `StyleProp<ViewStyle>` | - |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onPress` | 点击单元格（未禁用）时触发 | `PressableProps['onPress']` |

> React Native 环境不支持路由 `replace` 等 DOM 能力，因此 `replace`、`to` 等属性未实现，如需跳转请结合 React Navigation / Expo Router 使用。
