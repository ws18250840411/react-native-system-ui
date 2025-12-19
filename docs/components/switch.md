---
simulator:
  compact: false
  style:
    background: '#fff'
---

# Switch 开关

## 介绍

用于在打开和关闭状态之间进行切换。

## 引入

```js
import { Switch } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `defaultChecked` 默认开关的选中状态，`true` 表示开，`false` 表示关。

<code title="基础用法" src="./switch/demo/basic.tsx"></code>

### 禁用状态

通过 `disabled` 属性来禁用开关，禁用状态下开关不可点击。

<code title="禁用状态" src="./switch/demo/disabled.tsx"></code>

### 加载状态

通过 `loading` 属性设置开关为加载状态：点击仍会触发 `onClick`，但不会触发 `onChange`（不会切换状态）。

<code title="加载状态" src="./switch/demo/loading.tsx"></code>

### 自定义大小

通过 `size` 属性自定义开关的大小。

<code title="自定义大小" src="./switch/demo/size.tsx"></code>

### 自定义颜色

`activeColor` 属性表示打开时的背景色，`inactiveColor` 表示关闭时的背景色。

<code title="自定义颜色" src="./switch/demo/color.tsx"></code>

### 异步控制

需要异步控制开关时，可以使用 `checked` 属性和 `onChange` 事件代替 `defaultChecked`，并在事件回调函数中手动处理开关状态。

<code title="异步控制" src="./switch/demo/async.tsx"></code>

### 搭配单元格使用

<code title="搭配单元格使用" src="./switch/demo/cell.tsx"></code>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `checked` | 开关选中状态 | `any` | `false` |
| `defaultChecked` | 开关选中状态 | `any` | `false` |
| `loading` | 是否为加载状态 | `boolean` | `false` |
| `disabled` | 是否为禁用状态 | `boolean` | `false` |
| `size` | 开关尺寸，默认单位为 `px` | `number \| string` | `30px` |
| `activeColor` | 打开时的背景色 | `string` | `#3f45ff` |
| `inactiveColor` | 关闭时的背景色 | `string` | `white` |
| `activeValue` | 打开时对应的值 | `any` | `true` |
| `inactiveValue` | 关闭时对应的值 | `any` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onChange` | 开关状态切换时触发 | `value: any` |
| `onClick` | 点击时触发 | `event: GestureResponderEvent` |

其他 `ViewProps` 透传给最外层 `Pressable`。
