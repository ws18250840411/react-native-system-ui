---
simulator:
  compact: false
---

# Radio 单选框

## 介绍

用于在多个选项中选择单个结果。

## 引入

```js
import { Radio } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `defaultValue` 值默认当前选中项的 name。

<code title="基础用法" src="./radio/demo/basic.tsx"></code>

### 水平排列

将 `direction` 属性设置为 `horizontal` 后，单选框组会变成水平排列。

<code title="水平排列" src="./radio/demo/direction.tsx"></code>

### 禁用状态

通过 `disabled` 属性禁止选项切换，在 `Radio` 上设置 `disabled` 可以禁用单个选项。

<code title="禁用状态" src="./radio/demo/disabled.tsx"></code>

### 自定义形状

将 `shape` 属性设置为 `square`，单选框的形状会变成方形。

<code title="自定义形状" src="./radio/demo/shape.tsx"></code>

### 自定义颜色

通过 `checkedColor` 属性设置选中状态的图标颜色。

<code title="自定义颜色" src="./radio/demo/checked-color.tsx"></code>

### 自定义大小

通过 `iconSize` 属性可以自定义图标的大小。

<code title="自定义大小" src="./radio/demo/icon-size.tsx"></code>

### 禁用文本点击

设置 `labelDisabled` 属性后，点击图标以外的内容不会触发单选框切换。

<code title="禁用文本点击" src="./radio/demo/label-disabled.tsx"></code>

### 异步更新

设置 `value` 属性后，点击图标状态不会改变，而是直接执行 `onChange` 方法，在此方法中更换状态。

<code title="异步更新" src="./radio/demo/async.tsx"></code>

### 与 Cell 组件一起使用

此时你需要再引入 `Cell` 和 `Cell.Group` 组件。

<code title="与 Cell 组件一起使用" compact="true" src="./radio/demo/cell.tsx"></code>

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` / `value` | 标识符 | `RadioValue` | - |
| `shape` | 形状 | `'round' \| 'square'` | `'round'` |
| `disabled` | 是否为禁用状态 | `boolean` | `false` |
| `labelDisabled` | 是否禁用文本内容点击 | `boolean` | `false` |
| `labelPosition` | 文本位置 | `'left' \| 'right'` | `'right'` |
| `iconSize` | 图标大小 | `number \| string` | `tokens.defaults.iconSize` |
| `checkedColor` | 选中状态颜色 | `string` | 主题主色 |
| `iconRender` | 自定义图标 | `({ checked, disabled }) => ReactNode` | - |

### Radio.Group Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前选中项的标识符（受控） | `RadioValue` | - |
| `defaultValue` | 默认选中项的标识符（非受控） | `RadioValue` | - |
| `disabled` | 是否禁用所有单选框 | `boolean` | `false` |
| `direction` | 排列方向 | `'horizontal' \| 'vertical'` | `'vertical'` |
| `iconSize` | 所有单选框的图标大小 | `number \| string` | - |
| `checkedColor` | 所有单选框的选中状态颜色 | `string` | - |
| `labelDisabled` | 是否禁用文本内容点击 | `boolean` | `false` |
| `gap` | 子项间距 | `number` | 主题 spacing.sm |
| `onChange` | 当绑定值变化时触发的事件 | `(value: RadioValue) => void` | - |

### Radio 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onClick` | 点击单选框时触发 | `event: GestureResponderEvent` |

### Radio.Group 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onChange` | 当绑定值变化时触发的事件 | `value: RadioValue` |

> 通过主题的 `components.radio` 可以覆盖默认尺寸、颜色等 tokens。
