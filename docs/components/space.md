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

通过 `size` 或 `gap` 自定义间距大小，`size` 支持 `mini` `small` `normal` `large` 这几种预设，数组形式可分别设置水平与垂直间距。

<code title="间距大小" src="./space/demo/gap.tsx"></code>

### 对齐方式

通过 `justify` 控制主轴对齐，通过 `align` 控制交叉轴对齐。

<code title="对齐方式" src="./space/demo/align.tsx"></code>

### 自动换行

在水平方向下设置 `wrap` 可自动换行。

<code title="自动换行" src="./space/demo/wrap.tsx"></code>

### 填充模式

设置 `fill` 可以让子元素沿主轴平分可用空间，配合 `direction="vertical"` 可让子元素独占整行。

<code title="填充模式" src="./space/demo/fill.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 间距大小，支持预设 `mini` `small` `normal` `large`，也接受数字或像素字符串，数组形式可分别指定水平/垂直 | `SpaceGap \| SpaceSizePreset` | `normal` |
| `gap` | 自定义间距，语义同 `size`，优先级更高 | `number \| string \| [number \| string, number \| string]` | - |
| `justify` | 主轴对齐方式 | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly' \| 'stretch'` | `'start'` |
| `align` | 交叉轴对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'`（`direction="vertical"` 时默认为 `stretch`） |
| `direction` | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `wrap` | 是否自动换行，仅在水平方向生效 | `boolean` | `false` |
| `block` | 是否渲染为块级元素（`direction="vertical"` 未显式设置时会自动占满一行） | `boolean` | `false` |
| `fill` | 子元素是否占满主轴空间 | `boolean` | `false` |
| `divider` | 分隔符 | `ReactNode` | - |
| `onClick` | 点击时触发 | `ViewProps['onTouchEnd']` | - |

> 在 React Native 环境中，分隔符会作为额外的子元素插入，建议传入纯视觉节点（如 `View` 或 `Text`）。
