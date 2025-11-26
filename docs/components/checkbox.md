---
simulator:
  compact: false
---

# Checkbox 复选框

## 介绍

用于多选场景的基础控件，可单独使用，也可通过 `Checkbox.Group` 组合成列表，API 与 react-vant 保持一致。

## 引入

```js
import { Checkbox } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

受控与非受控复选框写法保持一致，支持禁用状态。

<code title="基础用法" src="./checkbox/demo/basic.tsx"></code>

### 组合使用

通过 `Checkbox.Group` 管理一组选项，`value/onChange` 与 react-vant 同步。

<code title="组合使用" src="./checkbox/demo/group.tsx"></code>

### 自定义样式

支持修改 `checkedColor`、`shape`、`direction` 等属性。

<code title="自定义样式" src="./checkbox/demo/custom.tsx"></code>

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 选项标识，`Checkbox.Group` 中必填，可与 `value` 互斥 | `string \| number` | - |
| `value` | 选项标识（`name` 的别名） | `string \| number` | - |
| `checked` | 是否选中（受控） | `boolean` | - |
| `defaultChecked` | 默认选中状态（非受控） | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `shape` | 图标形状，可选 `round` `square` | `CheckboxShape` | `round` |
| `iconSize` | 图标大小 | `number` | `20` |
| `checkedColor` | 选中时的背景与描边颜色 | `string` | 主题主色 |
| `labelPosition` | 文案位置，`left` / `right` | `'left' \| 'right'` | `right` |
| `labelDisabled` | 是否禁用文案点击 | `boolean` | `false` |
| `onChange` | 选中状态变化回调 | `(checked: boolean) => void` | - |
| `style` | 容器样式 | `StyleProp<ViewStyle>` | - |
| `labelStyle` | 文案样式 | `StyleProp<TextStyle>` | - |

### Checkbox.Group Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 选中项集合（受控） | `CheckboxValue[]` | - |
| `defaultValue` | 默认选中集合（非受控） | `CheckboxValue[]` | `[]` |
| `onChange` | 选项变化回调 | `(value: CheckboxValue[]) => void` | - |
| `disabled` | 是否禁用整组 | `boolean` | `false` |
| `direction` | 布局方向 | `'horizontal' \| 'vertical'` | `vertical` |
| `max` | 最多可选几个项目 | `number` | - |
| `shape` | 统一设置子项 `shape` | `CheckboxShape` | - |
| `iconSize` | 统一设置子项图标大小 | `number` | - |
| `checkedColor` | 统一设置选中颜色 | `string` | - |
| `labelDisabled` | 统一设置 `labelDisabled` | `boolean` | - |
| `gap` | 子项间距 | `number` | 主题 spacing.md |

> 需要动态渲染选项时，确保每个 `Checkbox` 提供唯一的 `name`，否则无法正确管理选中状态。
