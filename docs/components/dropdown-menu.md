---
simulator:
  compact: true
---

# DropdownMenu 下拉菜单

## 介绍

向下弹出的菜单列表。

## 引入

```js
import { DropdownMenu } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./dropdown-menu/demo/basic.tsx" />

### 自定义菜单内容

<code title="自定义菜单内容" src="./dropdown-menu/demo/custom.tsx" />

### 自定义高亮颜色

<code title="自定义高亮颜色" src="./dropdown-menu/demo/color.tsx" />

### 向上展开

<code title="向上展开" src="./dropdown-menu/demo/direction.tsx" />

### 禁用菜单

<code title="禁用菜单" src="./dropdown-menu/demo/disabled.tsx" />

## API

### DropdownMenu Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 下拉菜单值 | `Record<string, string \| number>` | - |
| `defaultValue` | 下拉菜单默认值 | `Record<string, string \| number>` | - |
| `activeColor` | 菜单标题和选项的选中态颜色 | `string` | `#ee0a24` |
| `activeIcon` | 自定义选项的选中态勾选图标 | `ReactNode` | - |
| `direction` | 菜单展开方向 | `'down' \| 'up'` | `'down'` |
| `disabled` | 是否禁用菜单 | `boolean` | `false` |
| `zIndex` | 菜单栏层级 | `number \| string` | `10` |
| `duration` | 动画时长（秒），设置为 `0` 可禁用动画 | `number \| string` | `0.2` |
| `overlay` | 是否显示遮罩层 | `boolean` | `true` |
| `closeOnClickOverlay` | 点击遮罩层后是否关闭 | `boolean` | `true` |
| `closeOnClickOutside` | 点击外部元素后是否关闭 | `boolean` | `true` |
| `swipeThreshold` | 滚动阈值，超过后菜单栏可横向滚动 | `number \| string` | - |
| `onChange` | 组件 value 变化时触发 | `(value: Record<string, string \| number>) => void` | - |
| `onOpen` | 打开菜单栏时触发 | `() => void` | - |
| `onClose` | 关闭菜单栏时触发 | `() => void` | - |
| `onOpened` | 打开菜单栏且动画结束后触发 | `() => void` | - |
| `onClosed` | 关闭菜单栏且动画结束后触发 | `() => void` | - |

### DropdownMenu.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 当前选中项对应的 value key | `string \| number` | - |
| `options` | 备选项列表 | `DropdownOption[]` | `[]` |
| `value` | 当前值（受控，如果 DropdownMenu 有 value，则从那里获取） | `string \| number` | - |
| `defaultValue` | 默认值 | `string \| number` | - |
| `placeholder` | 未选择时的占位 | `ReactNode` | `请选择` |
| `title` | 菜单项标题（不传时展示当前选中项文字） | `ReactNode` | - |
| `disabled` | 是否禁用当前菜单项 | `boolean` | `false` |
| `closeOnSelect` | 选择后是否关闭 | `boolean` | `true` |
| `onChange` | 选项变化回调 | `(value: string \| number, option?: DropdownOption) => void` | - |
| `onOpen` | 打开菜单栏时触发 | `() => void` | - |
| `onClose` | 关闭菜单栏时触发 | `() => void` | - |
| `onOpened` | 打开菜单栏且动画结束后触发 | `() => void` | - |
| `onClosed` | 关闭菜单栏且动画结束后触发 | `() => void` | - |
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
