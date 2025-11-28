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

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 选项集合，可以是二维数组 | `PickerOption[][] \| PickerOption[]` | - |
| `value` | 当前选中值（受控） | `PickerValue[]` | - |
| `defaultValue` | 默认选中值（非受控） | `PickerValue[]` | `[]` |
| `onChange` | 任意列变更时触发 | `(value, options) => void` | - |
| `onConfirm` | 点击「确定」按钮时触发 | `(value, options) => void` | - |
| `onCancel` | 点击「取消」按钮时触发 | `() => void` | - |
| `title` | 顶部标题 | `ReactNode` | - |
| `showToolbar` | 是否展示顶部工具栏 | `boolean` | `true` |
| `itemHeight` | 每个选项高度 | `number` | 44 |
| `visibleItemCount` | 可见选项个数 | `number` | 5 |

### PickerOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 展示文本 | `ReactNode` |
| `value` | 选项值 | `PickerValue` |
| `disabled` | 是否禁用 | `boolean` |
| `children` | 级联自选项（暂未实现） | `PickerOption[]` |

> 目前版本暂未实现级联 columns，可通过外部 `onChange` 手动更新 `columns` 实现。
