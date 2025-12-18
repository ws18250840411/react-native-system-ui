---
simulator:
  compact: false
---

# Popover 气泡卡片

## 介绍

用于展示与触发元素关联的小块内容或菜单，支持多方向定位、选项列表与点击外部关闭。

## 引入

```js
import { Popover } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

点击按钮展开气泡。

<code src="./popover/demo/basic.tsx" title="基础"></code>

### 弹出位置

通过 `placement` 控制气泡的弹出位置。

<code src="./popover/demo/placement.tsx" title="方向"></code>

## API

### Popover Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `reference` | 触发 Popover 的元素内容 | `ReactNode` | - |
| `trigger` | 触发方式，可选 `manual` | `'click' \| 'manual'` | `'click'` |
| `actions` | 选项列表（未传 `children` 时渲染为菜单） | `PopoverAction[]` | - |
| `children` | 自定义弹出内容（传入后优先生效） | `ReactNode` | - |
| `visible` | 受控可见状态 | `boolean` | - |
| `defaultVisible` | 默认可见 | `boolean` | `false` |
| `placement` | 弹出位置 | `PopoverPlacement` | `'bottom'` |
| `offset` | 出现位置偏移量 `[skid, distance]` | `[number, number]` | `[0, 8]` |
| `theme` | 主题风格 | `'light' \| 'dark'` | `'light'` |
| `duration` | 动画时长（ms），设为 0 可禁用 | `number` | `300` |
| `showArrow` | 是否显示箭头 | `boolean` | `true` |
| `overlay` | 是否显示遮罩层 | `boolean` | `false` |
| `overlayStyle` | 自定义遮罩样式 | `StyleProp<ViewStyle>` | - |
| `closeOnClickAction` | 点击选项后是否关闭 | `boolean` | `true` |
| `closeOnClickOverlay` | 点击遮罩是否关闭（仅 `overlay=true`） | `boolean` | `true` |
| `closeOnClickOutside` | 点击外部是否关闭（仅 `overlay=false`） | `boolean` | `true` |
| `onVisibleChange` | 可见状态变化回调 | `(visible: boolean) => void` | - |
| `onSelect` | 点击选项时触发 | `(action, index) => void` | - |
| `onClickOverlay` | 点击遮罩时触发 | `() => void` | - |
| `onOpen` | 打开时触发 | `() => void` | - |
| `onClose` | 关闭时触发 | `() => void` | - |
| `onOpened` | 打开且动画结束后触发 | `() => void` | - |
| `onClosed` | 关闭且动画结束后触发 | `() => void` | - |

### PopoverPlacement

支持：`top` `top-start` `top-end` `left` `left-start` `left-end` `right` `right-start` `right-end` `bottom` `bottom-start` `bottom-end`。

### PopoverAction

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `text` | 文字 | `string` |
| `icon` | 左侧图标 | `ReactNode` |
| `color` | 文本颜色 | `string` |
| `disabled` | 是否禁用 | `boolean` |
