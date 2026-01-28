---
simulator:
  compact: true
---

# Tabbar 标签栏

## 介绍

底部导航栏，用于在不同页面之间进行切换。

## 引入

```js
import { Tabbar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

点击 `Tabbar.Item` 即可切换选中的标签(非受控状态)。

<code title="基础用法" src="./tabbar/demo/base.tsx" />

### 受控组件

- `value` 默认绑定选中标签的索引值，通过修改 `value` 即可切换选中的标签。
- 在标签指定 `name` 属性的情况下，`value` 的值为当前标签的 `name`。

<code title="受控组件" src="./tabbar/demo/control.tsx" />

### 徽标提示

通过 `badge` 属性，可以设置图标相应的徽标内容。

<code title="徽标提示" src="./tabbar/demo/badge.tsx" />

### 自定义图标

通过 `icon` 属性自定义图标。

<code title="自定义图标" src="./tabbar/demo/custom-icon.tsx" />

### 自定义颜色

通过 `activeColor` 属性设置选中标签的颜色，通过 `inactiveColor` 属性设置未选中标签的颜色。

<code title="自定义颜色" src="./tabbar/demo/custom-color.tsx" />

## API

### Tabbar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前选中标签的名称或索引值 | `number \| string` | - |
| `defaultValue` | 默认选中标签的名称或索引值 | `number \| string` | `0` |
| `fixed` | 是否固定在底部 | `boolean` | `true` |
| `border` | 是否显示外边框 | `boolean` | `true` |
| `zIndex` | 元素 z-index | `number` | `1` |
| `activeColor` | 选中标签的颜色 | `string` | 主题主色 |
| `inactiveColor` | 未选中标签的颜色 | `string` | 主题默认色 |
| `placeholder` | 固定在底部时，是否在标签位置生成一个等高的占位元素 | `boolean` | `false` |
| `safeAreaInsetBottom` | 是否开启底部安全区适配，设置 fixed 时默认开启 | `boolean` | `false` |

### Tabbar Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onChange` | 切换标签时触发 | `(active: number \| string, index: number) => void` |

### Tabbar.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 标签名称，作为匹配的标识符 | `number \| string` | 当前标签的索引值 |
| `icon` | 图标 | `ReactNode \| (active: boolean) => ReactNode` | - |
| `badge` | 图标右上角徽标的内容 | `BadgeProps \| number \| string` | - |

> 补充说明（RN 扩展）：额外支持 `background`、`contentStyle`、`style`、`iconSize`、`dot`、`disabled`、`textStyle`、`iconStyle`、`testID`、`onClick` 等属性。
