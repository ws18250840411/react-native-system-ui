---
simulator:
  compact: false
---

# ActionSheet 动作面板

## 介绍

在屏幕底部弹出的操作面板，适合展示多个并列操作。

## 引入

```js
import { ActionSheet } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

最常见的操作列表，支持标题与取消按钮。

<code src="./action-sheet/demo/basic.tsx" title="基础示例"></code>

### 描述与副标题

可为每个操作提供副标题说明，同时支持顶部描述文案。

<code src="./action-sheet/demo/description.tsx" title="描述与副标题"></code>

### 自定义内容

操作项可带图标，自定义区域可放置按钮/提示等内容。

<code src="./action-sheet/demo/custom.tsx" title="自定义内容"></code>

## API

### ActionSheet Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否展示 | `boolean` | - |
| `actions` | 操作列表 | `ActionSheetAction[]` | `[]` |
| `title` | 顶部标题 | `ReactNode` | - |
| `description` | 顶部描述 | `ReactNode` | - |
| `cancelText` | 底部取消按钮文字 | `ReactNode` | - |
| `closeOnSelect` | 点击操作后是否自动关闭 | `boolean` | `true` |
| `closeable` | 是否展示右上角关闭按钮 | `boolean` | `true` |
| `overlay` | 是否展示蒙层（透传给 Popup） | `boolean` | `true` |
| `round` | 是否圆角（透传给 Popup） | `boolean` | `true` |
| `safeAreaInsetBottom` | 是否适配底部安全区 | `boolean` | `true` |
| `onSelect` | 点击操作项回调 | `(action, index) => void` | - |
| `onCancel` | 点击取消按钮或关闭时触发 | `() => void` | - |
| `onClose` | 关闭回调（操作/取消均触发） | `() => void` | - |
| 其余 | 支持 `Popup` 的全部属性 | - | - |

### ActionSheetAction

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `name` | 操作名称 | `ReactNode` |
| `subname` | 副标题 | `ReactNode` |
| `color` | 自定义颜色 | `string` |
| `disabled` | 是否禁用 | `boolean` |
| `loading` | 是否展示加载状态 | `boolean` |
| `icon` | 自定义图标 | `ReactNode` |
| `onPress` | 点击回调（先于 `onSelect` 执行） | `(action) => void` |

> 与 react-vant 相比，当前版本暂未提供 `closeOnClickOverlay`、`round` 动画配置等额外属性，如有需要可直接透传 `Popup` 对应参数。
