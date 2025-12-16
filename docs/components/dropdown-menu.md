---
simulator:
  compact: false
---

# DropdownMenu 下拉菜单

## 介绍

在页面顶部提供多列筛选项，点击可展开下拉面板选择条件。

## 引入

```js
import { DropdownMenu } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

最常见的双列筛选。

<code src="./dropdown-menu/demo/basic.tsx" title="基础筛选"></code>

### 自定义内容

在 `DropdownMenu.Item` 内传入自定义内容构建更复杂的筛选面板。

<code src="./dropdown-menu/demo/custom.tsx" title="自定义面板"></code>

### 受控模式

配合外部状态管理 value，让筛选结果与业务联动。

<code src="./dropdown-menu/demo/controlled.tsx" title="受控选择"></code>

## API

### DropdownMenu Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `activeColor` | 选中项高亮颜色 | `string` | 主题主色 |

### DropdownMenu.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 备选项列表 | `DropdownOption[]` | - |
| `value` | 当前值（受控） | `string \| number` | - |
| `defaultValue` | 默认值 | `string \| number` | - |
| `placeholder` | 未选择时的占位 | `ReactNode` | `请选择` |
| `label` | 自定义标题 | `ReactNode` | - |
| `closeOnSelect` | 选择后是否关闭 | `boolean` | `true` |
| `onChange` | 选项变化回调 | `(value, option) => void` | - |
| `children` | 自定义面板内容（优先级高于 `options`） | `ReactNode` | - |

### DropdownOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 选项文本 | `ReactNode` |
| `value` | 对应值 | `string \| number` |
| `disabled` | 是否禁用 | `boolean` |

> 当前实现聚焦常见的单选筛选场景，若需多选或复杂内容可通过 `children` 自定义，并在外部管理状态。
