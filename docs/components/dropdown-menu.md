---
simulator:
  compact: true
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

### 自定义菜单内容

在 `DropdownMenu.Item` 内传入自定义内容构建更复杂的筛选面板。

<code src="./dropdown-menu/demo/custom.tsx" title="自定义面板"></code>

### 自定义高亮颜色

通过 `activeColor` 自定义菜单标题和选项的选中态颜色。

<code src="./dropdown-menu/demo/color.tsx" title="自定义高亮"></code>

### 向上展开

将 `direction` 设为 `up`，菜单即可向上展开。

<code src="./dropdown-menu/demo/direction.tsx" title="向上展开"></code>

### 禁用菜单

<code src="./dropdown-menu/demo/disabled.tsx" title="禁用菜单"></code>

### 受控模式

配合外部状态管理 value，让筛选结果与业务联动。

<code src="./dropdown-menu/demo/controlled.tsx" title="受控选择"></code>

## API

### DropdownMenu Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `activeColor` | 菜单标题和选项的选中态颜色 | `string` | `#1989fa` |
| `activeIcon` | 自定义选项的选中态勾选图标 | `ReactNode` | - |
| `direction` | 菜单展开方向，可选值为 `up` | `'down' \| 'up'` | `down` |
| `disabled` | 是否禁用菜单 | `boolean` | `false` |
| `zIndex` | 菜单栏层级 | `number \| string` | `10` |
| `duration` | 动画时长（秒），设置为 `0` 可禁用动画 | `number \| string` | `0.2` |
| `overlay` | 是否显示遮罩层 | `boolean` | `true` |
| `closeOnClickOverlay` | 点击遮罩层后是否关闭 | `boolean` | `true` |
| `closeOnClickOutside` | 点击外部元素后是否关闭 | `boolean` | `true` |
| `swipeThreshold` | 滚动阈值，超过后菜单栏可横向滚动 | `number \| string` | - |

### DropdownMenu.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 备选项列表 | `DropdownOption[]` | - |
| `value` | 当前值（受控） | `string \| number` | - |
| `defaultValue` | 默认值 | `string \| number` | - |
| `placeholder` | 未选择时的占位 | `ReactNode` | `请选择` |
| `title` | 菜单项标题（不传时展示当前选中项文字） | `ReactNode` | - |
| `disabled` | 是否禁用当前菜单项 | `boolean` | `false` |
| `closeOnSelect` | 选择后是否关闭 | `boolean` | `true` |
| `onChange` | 选项变化回调 | `(value, option) => void` | - |
| `children` | 自定义面板内容（优先级高于 `options`） | `ReactNode` | - |

### DropdownOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `text` | 选项文本 | `ReactNode` |
| `value` | 对应值 | `string \| number` |
| `disabled` | 是否禁用 | `boolean` |
| `icon` | 左侧图标 | `ReactNode` |

## Ref

### DropdownMenuInstance

| 方法 | 说明 |
| --- | --- |
| `toggleItem(index)` | 切换指定菜单展示状态 |
| `showItem(index)` | 显示指定菜单 |
| `close()` | 关闭菜单 |

### DropdownItemInstance

| 方法 | 说明 |
| --- | --- |
| `toggle()` | 切换当前菜单展示状态 |
| `open()` | 打开当前菜单 |
| `close()` | 关闭当前菜单 |
