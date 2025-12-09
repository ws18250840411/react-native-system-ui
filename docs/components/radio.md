---
simulator:
  compact: false
---

# Radio 单选框

## 介绍

在一组选项中进行单选，基于 `@react-native-aria/radio` 实现，支持受控/非受控用法。

## 引入

```js
import { Radio } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

单独使用时支持受控/非受控写法。

<code title="基础用法" src="./radio/demo/basic.tsx"></code>

### 单选组

通过 `Radio.Group` 管理多个选项。

<code title="单选组" src="./radio/demo/group.tsx"></code>

### 自定义样式

可以调整 `checkedColor`、`direction`、`labelPosition` 等属性。

<code title="自定义样式" src="./radio/demo/custom.tsx"></code>

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name`/`value` | 选项标识，`Radio.Group` 中必填 | `RadioValue` | - |
| `checked` | 是否选中（受控） | `boolean` | - |
| `defaultChecked` | 默认选中状态 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `iconSize` | 圆点直径 | `number` | `20` |
| `checkedColor` | 选中颜色 | `string` | 主题主色 |
| `labelPosition` | 文案位置 `left` / `right` | `RadioLabelPosition` | `right` |
| `labelDisabled` | 是否禁止点击文案触发选中 | `boolean` | `false` |
| `onChange` | 选中状态变化回调 | `(checked: boolean) => void` | - |

### Radio.Group Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前选中值（受控） | `RadioValue` | - |
| `defaultValue` | 默认选中值 | `RadioValue` | - |
| `onChange` | 选中值变化回调 | `(value: RadioValue) => void` | - |
| `disabled` | 是否禁用整组 | `boolean` | `false` |
| `direction` | 布局方向 | `'horizontal' \| 'vertical'` | `vertical` |
| `iconSize` | 统一设置子项圆点大小 | `number` | - |
| `checkedColor` | 统一设置子项选中颜色 | `string` | - |
| `labelDisabled` | 统一设置 `labelDisabled` | `boolean` | - |
| `gap` | 子项间距 | `number` | 主题 spacing.md |

> 组件使用 `@react-native-aria/radio` + `@react-stately/radio` 提供可访问能力，若需更多自定义行为请通过主题 tokens 覆盖。
