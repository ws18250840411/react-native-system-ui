---
simulator:
  compact: false
---

# Space 间距

## 介绍

设置组件之间的间距，避免元素紧贴在一起。

## 引入

```js
import { Space } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

相邻组件水平间距。

<code title="基础用法" src="./space/demo/base.tsx"></code>

### 分隔符

为相邻组件设置分隔符。

<code title="分隔符" src="./space/demo/divider.tsx"></code>

### 垂直间距

设置 `direction="vertical"` 后改为垂直排列，可配合 `block` 独占一行。

<code title="垂直间距" src="./space/demo/vertical.tsx"></code>

### 间距大小

通过 `gap` 自定义间距大小，数组形式可分别设置水平与垂直间距。

<code title="间距大小" src="./space/demo/gap.tsx"></code>

### 对齐方式

通过 `justify` 控制主轴对齐，通过 `align` 控制交叉轴对齐。

<code title="对齐方式" src="./space/demo/align.tsx"></code>

### 自动换行

在水平方向下设置 `wrap` 可自动换行。

<code title="自动换行" src="./space/demo/wrap.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `gap` | 间距大小，支持数组形式 `[水平, 垂直]` | `number \| string \| [number \| string, number \| string]` | `0` |
| `justify` | 主轴对齐方式 | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly' \| 'stretch'` | `'start'` |
| `align` | 交叉轴对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline'` | `'center'` |
| `direction` | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `wrap` | 是否自动换行，仅在水平方向生效 | `boolean` | `false` |
| `block` | 是否渲染为块级元素 | `boolean` | `false` |
| `divider` | 分隔符 | `ReactNode` | - |
| `onClick` | 点击时触发 | `ViewProps['onTouchEnd']` | - |

> 在 React Native 环境中，分隔符会作为额外的子元素插入，建议传入纯视觉节点（如 `View` 或 `Text`）。
