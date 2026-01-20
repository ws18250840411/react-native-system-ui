---
simulator:
  compact: true
---

# Picker 选择器

## 介绍

多列滚轮选择器，常用于日期、城市、分类等多列数据。

## 引入

```js
import { Picker } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./picker/demo/basic.tsx"></code>

### 多列联动

<code title="多列" src="./picker/demo/multi.tsx"></code>

### 省市区联动

<code title="级联选择" src="./picker/demo/cascade.tsx"></code>

### 自定义工具栏

<code title="底部工具栏" src="./picker/demo/toolbar.tsx"></code>

## 列数据结构

Picker 的 `columns` 接受三种结构：

1. **单列**：`PickerOption[]`（当选项不包含 `children` 时），可直接传 `columns={options}`。
2. **多列**：`PickerColumn[]`，每列互不依赖；每列可为 `PickerOption[]` 或 `{ options: PickerOption[]; defaultValue?: PickerValue }`。
3. **级联**：`PickerOption[]`（根节点数组，且至少一个 option 含 `children`），Picker 会根据当前选中值补全后续列。

对于单列场景，`value/defaultValue` 也可以直接传 `PickerValue`（而非数组）。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 选项集合，支持单列/多列/级联 | `PickerColumn[] \| PickerOption[]` | - |
| `value` | 当前选中值（受控） | `PickerValue[] \| PickerValue` | - |
| `defaultValue` | 默认选中值（非受控） | `PickerValue[] \| PickerValue` | `[]` |
| `onChange` | 任意列变更时触发 | `(value: PickerValue[], options: (PickerOption \| undefined)[]) => void` | - |
| `onConfirm` | 点击「确定」按钮时触发 | `(value: PickerValue[], options: (PickerOption \| undefined)[]) => void` | - |
| `onCancel` | 点击「取消」按钮时触发 | `() => void` | - |
| `title` | 顶部标题 | `ReactNode` | - |
| `showToolbar` | 是否展示工具栏 | `boolean` | `true` |
| `toolbarPosition` | 工具栏位置 | `'top' \| 'bottom'` | `'top'` |
| `confirmButtonText` | 确认按钮文案 | `ReactNode` | `'确定'` |
| `cancelButtonText` | 取消按钮文案 | `ReactNode` | `'取消'` |
| `itemHeight` | 每个选项高度 | `number` | 44 |
| `visibleItemCount` | 可见选项个数（会兜底为 ≥3 的奇数） | `number` | `tokens.defaults.visibleItemCount` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `readOnly` | 是否只读（禁用滚动/选择） | `boolean` | `false` |
| `decelerationRate` | 滚动减速率（仅原生 FlatList 分支生效） | `'normal' \| 'fast' \| number` | `iOS: 0.9975 / Android: 0.989` |
| `swipeDuration` | 释放后的滚动动画时长（ms） | `number` | `tokens.defaults.swipeDuration` |
| `maskColor` | 蒙层颜色 | `string` | 主题背景色 |
| `maskType` | 蒙层类型 | `'gradient' \| 'solid'` | `tokens.defaults.maskType` |
| `columnsTop` | 列容器顶部插槽 | `ReactNode` | - |
| `columnsBottom` | 列容器底部插槽 | `ReactNode` | - |
| `optionRender` | 自定义选项渲染 | `(option, context) => ReactNode` | - |
| `emitConfirmOnAutoSelect` | 非受控模式下，自动补全值时是否同步触发 `onConfirm` | `boolean` | `true` |

### PickerColumn

| 类型 | 说明 |
| --- | --- |
| `PickerOption[]` | 单列或多列静态数据 |
| `{ options: PickerOption[]; defaultValue?: PickerValue }` | 多列数据，支持为该列指定默认值 |
| `PickerOption[]`（含 `children`） | 级联数据，使用 `children` 描述下一级 |

### PickerOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 展示文本 | `ReactNode` |
| `value` | 选项值 | `PickerValue` |
| `disabled` | 是否禁用 | `boolean` |
| `children` | 级联子选项 | `PickerOption[]` |
