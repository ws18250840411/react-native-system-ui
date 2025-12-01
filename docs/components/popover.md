---
simulator:
  compact: false
---

# Popover 气泡卡片

## 介绍

用于展示与触发元素关联的小块内容，可设置上下方向。

## 引入

```js
import { Popover } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

点击按钮展开气泡。

<code src="./popover/demo/basic.tsx" title="基础"></code>

### 方向

通过 `placement` 控制上下方向。

<code src="./popover/demo/placement.tsx" title="方向"></code>

## API

### Popover Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `trigger` | 触发节点 | `ReactElement` | - |
| `children` | 弹出内容 | `ReactNode` | - |
| `visible` | 受控可见状态 | `boolean` | - |
| `defaultVisible` | 默认可见 | `boolean` | `false` |
| `placement` | 气泡方向 | `'top' \| 'bottom'` | `'bottom'` |
| `offset` | 与触发器的间距 | `number` | `8` |
| `showArrow` | 是否显示箭头 | `boolean` | `true` |
| `overlay` | 是否展示遮罩并点击关闭 | `boolean` | `true` |
| `onVisibleChange` | 可见状态变化回调 | `(visible: boolean) => void` | - |
| `onOpen` | 打开时触发 | `() => void` | - |
| `onClose` | 关闭时触发 | `() => void` | - |

> 差异说明：当前实现聚焦点击触发与上下方向定位，暂未提供 hover、左右、自动避让等特性；如需更多方向可扩展 placement。 
