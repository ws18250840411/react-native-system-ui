---
simulator:
  compact: false
---

# SwipeCell 滑动单元格

## 介绍

对列表项进行左右滑动，展示更多操作按钮（例如删除、收藏等）。

滑开后点击内容区域或操作按钮会自动关闭并恢复初始状态。

## 引入

```js
import { SwipeCell } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./swipe-cell/demo/basic.tsx"></code>

### 双侧滑动

<code title="双侧滑动" src="./swipe-cell/demo/both.tsx"></code>

### Ref 控制

<code title="Ref 控制" src="./swipe-cell/demo/control.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `left` | 左侧操作区内容 | `ReactNode` | - |
| `right` | 右侧操作区内容 | `ReactNode` | - |
| `leftWidth` | 左侧操作区宽度（不传则自动测量） | `number` | - |
| `rightWidth` | 右侧操作区宽度（不传则自动测量） | `number` | - |
| `disabled` | 是否禁用滑动 | `boolean` | `false` |
| `closeOnActionPress` | 点击操作区后是否自动关闭 | `boolean` | `true` |
| `threshold` | 打开阈值比例（0-1） | `number` | `0.3` |
| `duration` | 动画时长（ms） | `number` | `180` |
| `onOpen` | 打开某一侧时触发 | `(side) => void` | - |
| `onClose` | 关闭时触发 | `(side) => void` | - |
| `onChange` | 位置变化时触发 | `(position) => void` | - |
| `style` | 根容器样式 | `StyleProp<ViewStyle>` | - |
| `contentStyle` | 内容容器样式 | `StyleProp<ViewStyle>` | - |
| `leftStyle` | 左侧容器样式 | `StyleProp<ViewStyle>` | - |
| `rightStyle` | 右侧容器样式 | `StyleProp<ViewStyle>` | - |

### Ref 方法

| 方法 | 说明 |
| --- | --- |
| `open(side)` | 打开 `left/right` |
| `close()` | 关闭并回到初始位置 |
| `getPosition()` | 获取当前状态：`'closed' \| 'left' \| 'right'` |
