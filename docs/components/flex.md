---
simulator:
  compact: false
---

# Flex 布局

## 介绍

`Flex` 组件是 CSS `flex` 布局的一个封装，提供 24 栅格、间距和方向控制能力。

## 引入

```js
import { Flex } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

使用 `Flex` 与 `Flex.Item` 即可快速构建 24 列栅格系统，所有列必须放在 `Flex` 内。

<code title="基础用法" src="./flex/demo/base.tsx"></code>

### 区域间隔

通过 `gutter` 属性设置列元素之间的间距，数组写法可以同时指定水平/垂直间距。

<code title="区域间隔" src="./flex/demo/gutter.tsx"></code>

### 方向

通过 `direction` 属性设置弹性布局方向。默认是 `row`。

<code title="方向" src="./flex/demo/direction.tsx"></code>

## API

### Flex Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `direction` | 项目定位方向，可选 `row` `row-reverse` `column` `column-reverse` | `FlexDirection` | `row` |
| `wrap` | 子元素换行方式，可选 `nowrap` `wrap` `wrap-reverse` | `FlexWrap` | `wrap` |
| `gutter` | 列间距，支持 `[水平, 垂直]` | `number \| [number, number]` | `0` |
| `align` | 垂直对齐方式，可选 `start` `center` `end` `baseline` `stretch` | `FlexAlign` | `start` |
| `justify` | 水平排列方式，可选 `start` `end` `center` `around` `between` | `FlexJustify` | `start` |
| `columns` | 栅格总列数，用于计算 `span` | `number` | `24` |

### Flex.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `span` | 栅格占位格数，为 0 时不渲染 | `number` | - |
| `flex` | Flex 布局属性，支持数字或 `auto`、`none` 以及 `flex-grow flex-shrink flex-basis` 字符串写法（第三项支持 `auto` 或数字/px） | `number \| string` | - |

> 示例：`flex="auto"`、`flex="0 0 auto"`、`flex="2 1 120px"`。由于 React Native 限制，目前不支持百分比等单位。  
> React Native 环境不支持 DOM 维度的 `order`、`offset` 等属性，如需更复杂的布局可以直接使用 `View` + `StyleSheet` 来实现。
