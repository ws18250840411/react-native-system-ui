---
simulator:
  compact: false
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

1. **单列**：`PickerOption[]`，例如 `[[{ label: '周一', value: 'mon' }, ...]]`。
2. **多列**：`PickerOption[]` 或 `{ options: PickerOption[]; defaultValue?: PickerValue }`，每一列互不依赖。
3. **联级**：`PickerCascadeOption[]`，通过 `children` 描述下一级选项，Picker 会自动根据当前选中值补全后续列。

联级与多列结构可以混合：例如第一列是 `PickerOption[]`，第二列使用对象指定默认值。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 选项集合，支持单列/多列/联级 | `PickerColumn[]` | - |
| `value` | 当前选中值（受控） | `PickerValue[]` | - |
| `defaultValue` | 默认选中值（非受控） | `PickerValue[]` | `[]` |
| `onChange` | 任意列变更时触发 | `(value, options) => void` | - |
| `onConfirm` | 点击「确定」按钮时触发 | `(value, options) => void` | - |
| `onCancel` | 点击「取消」按钮时触发 | `() => void` | - |
| `title` | 顶部标题 | `ReactNode` | - |
| `showToolbar` | 是否展示工具栏 | `boolean` | `true` |
| `toolbarPosition` | 工具栏位置 | `'top' \| 'bottom'` | `'top'` |
| `confirmButtonText` | 确认按钮文案 | `ReactNode` | `'确定'` |
| `cancelButtonText` | 取消按钮文案 | `ReactNode` | `'取消'` |
| `itemHeight` | 每个选项高度 | `number` | 44 |
| `visibleItemCount` | 可见选项个数（仅支持奇数） | `number` | 5 |
| `loading` | 是否显示加载状态 | `boolean` | `false` |

### PickerColumn

| 类型 | 说明 |
| --- | --- |
| `PickerOption[]` | 单列或多列静态数据 |
| `{ options: PickerOption[]; defaultValue?: PickerValue }` | 多列数据，支持为该列指定默认值 |
| `PickerCascadeOption[]` | 联级数据，使用 `children` 描述下一级 |

### PickerOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 展示文本 | `ReactNode` |
| `value` | 选项值 | `PickerValue` |
| `disabled` | 是否禁用 | `boolean` |
| `children` | 级联子选项 | `PickerOption[]` |
