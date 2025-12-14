---
simulator:
  compact: false
---

# Rate 评分

## 介绍

用于对事物进行评级操作。

## 引入

```js
import { Rate } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `value` 来绑定当前评分值。

<code title="基础用法" src="./rate/demo/basic.tsx"></code>

### 自定义图标

通过 `icon` 属性设置选中时的图标，`voidIcon` 属性设置未选中时的图标。

<code title="自定义图标" src="./rate/demo/icon.tsx"></code>

### 自定义样式

通过 `size` 属性设置图标大小，`color` 属性设置选中时的颜色，`voidColor` 设置未选中时的颜色。

<code title="自定义样式" src="./rate/demo/custom.tsx"></code>

### 半星与自定义颜色

设置 `allowHalf` 属性后可以选中半星。

<code title="半星" src="./rate/demo/half.tsx"></code>

### 自定义数量

通过 `count` 属性设置评分总数。

<code title="自定义数量" src="./rate/demo/count.tsx"></code>

### 禁用状态

通过 `disabled` 属性来禁用评分。

<code title="禁用状态" src="./rate/demo/disabled.tsx"></code>

### 只读状态显示小数

设置 `readOnly` 和 `allowHalf` 属性后，Rate 组件可以展示任意小数结果。

<code title="只读状态显示小数" src="./rate/demo/readonly.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前值（受控） | `number` | - |
| `defaultValue` | 默认值（非受控） | `number` | `0` |
| `count` | 图标个数 | `number \| string` | `5` |
| `allowHalf` | 是否允许半选 | `boolean` | `false` |
| `size` | 图标尺寸 | `number \| string` | `tokens.defaults.size` |
| `gutter` | 图标间距 | `number \| string` | `tokens.defaults.gutter` |
| `color` | 选中颜色 | `string` | 主题 warning 色 |
| `voidColor` | 未选中颜色 | `string` | 主题默认色 |
| `disabledColor` | 禁用颜色 | `string` | 主题默认色 |
| `icon` | 自定义选中图标 | `ReactNode` | `★` |
| `voidIcon` | 自定义未选中图标 | `ReactNode` | `★` |
| `character` | 同时指定选中/未选中的展示内容 | `ReactNode` | `★` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `touchable` | 是否可以通过滑动手势选择评分 | `boolean` | `true` |
| `onChange` | 值变化时触发 | `(value: number) => void` | - |
| `onIconPress` | 点击图标后回调 | `(value: number) => void` | - |
| `iconStyle` | 图标样式 | `StyleProp<TextStyle>` | - |
| `itemStyle` | 每个图标容器样式 | `StyleProp<ViewStyle>` | - |

> 通过主题的 `components.rate` 可以批量覆盖默认数量、间距、颜色等 tokens。
