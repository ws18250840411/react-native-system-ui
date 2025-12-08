---
simulator:
  compact: false
---

# Checkbox 复选框

## 介绍

用于在选中和未选中状态之间切换，可单独使用，也可通过 `Checkbox.Group` 组合成列表，API 与 react-vant 基本保持一致，基于 `@react-native-aria/checkbox` 提供可访问能力。

## 引入

```js
import { Checkbox } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

- 使用 `defaultChecked` 设置默认值。
- 通过 `disabled` 禁用交互，`labelDisabled` 禁用文案点击。

<code title="基础用法" src="./checkbox/demo/basic.tsx"></code>

### 自定义样式

`shape="square"` 可切换形状，`checkedColor`、`iconSize`、`iconRender` 支持定制样式。

<code title="自定义样式" src="./checkbox/demo/custom.tsx"></code>

### 受控异步

配合 `checked + onChange` 受控模式，在回调中手动更新状态，适合异步确认的场景。

<code title="受控异步" src="./checkbox/demo/async.tsx"></code>

### 组合使用

通过 `Checkbox.Group` 管理一组选项，`value/onChange` 与 react-vant 同步。

<code title="组合使用" src="./checkbox/demo/group.tsx"></code>

### 布局方向

`direction="horizontal"` 时横向排列，`gap` 可调整间距。

<code title="布局方向" src="./checkbox/demo/direction.tsx"></code>

### 最大可选数

`max` 用于限制可选数量，超过上限将不再切换。

<code title="最大可选数" src="./checkbox/demo/max.tsx"></code>

### 全选与反选

通过 `ref` 调用 `toggleAll`，可实现全选、全不选以及跳过禁用项的反选。

<code title="全选与反选" src="./checkbox/demo/ref.tsx"></code>

### 搭配单元格使用

在 `Cell` 列表中放置 `Checkbox`，适合设置项等场景。

<code title="搭配单元格使用" src="./checkbox/demo/cell.tsx"></code>

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` / `value` | 选项标识，`Checkbox.Group` 中必填 | `CheckboxValue` | - |
| `checked` | 是否选中（受控） | `boolean` | - |
| `defaultChecked` | 默认选中状态（非受控） | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `shape` | 图标形状，可选 `round` / `square` | `CheckboxShape` | `round` |
| `iconSize` | 图标大小 | `number` | `20` |
| `iconRender` | 自定义图标渲染 | `CheckboxIconRender` | - |
| `checkedColor` | 选中时的背景与描边颜色 | `string` | 主题主色 |
| `labelPosition` | 文案位置，`left` / `right` | `CheckboxLabelPosition` | `right` |
| `labelDisabled` | 是否禁用文案点击 | `boolean` | `false` |
| `bindGroup` | 是否与外层 `Checkbox.Group` 关联（单独使用时可关闭） | `boolean` | `true` |
| `onChange` | 选中状态变化回调 | `(checked: boolean) => void` | - |
| `onClick` | 点击图标或文案触发 | `(event: GestureResponderEvent) => void` | - |
| `style` | 容器样式 | `StyleProp<ViewStyle>` | - |
| `labelStyle` | 文案样式 | `StyleProp<TextStyle>` | - |

### Checkbox.Group Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 选中项集合（受控） | `CheckboxValue[]` | - |
| `defaultValue` | 默认选中集合（非受控） | `CheckboxValue[]` | `[]` |
| `onChange` | 选项变化回调 | `(value: CheckboxValue[]) => void` | - |
| `disabled` | 是否禁用整组 | `boolean` | `false` |
| `direction` | 布局方向 | `CheckboxGroupDirection` | `vertical` |
| `max` | 最多可选几个项目 | `number` | - |
| `shape` | 统一设置子项 `shape` | `CheckboxShape` | - |
| `iconSize` | 统一设置子项图标大小 | `number` | - |
| `iconRender` | 统一设置子项自定义图标 | `CheckboxIconRender` | - |
| `checkedColor` | 统一设置选中颜色 | `string` | - |
| `labelDisabled` | 统一设置 `labelDisabled` | `boolean` | - |
| `gap` | 子项间距 | `number` | 主题 spacing.md（默认 12） |

> 需要动态渲染选项时，确保每个 `Checkbox` 提供唯一的 `name`，否则无法正确管理选中状态。

### Checkbox 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onChange` | 选中状态变化时触发 | `checked: boolean` |
| `onClick` | 点击图标或文案时触发 | `event: GestureResponderEvent` |

### Checkbox.Group 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onChange` | 选中集合变化时触发 | `value: CheckboxValue[]` |

### Checkbox.Group 方法

通过 `ref` 获取实例后调用。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `toggleAll` | 切换所有子项；传 `true` 全选，`false` 全不选，`{ skipDisabled: true }` 可跳过禁用项 | `boolean \| { checked?: boolean; skipDisabled?: boolean }` | `void` |

## 与 react-vant 的差异

- `Checkbox.Group` 的默认值属性命名为 `defaultValue`（遵循 React Native 受控/非受控写法），迁移自 react-vant 时对应其 `defaultChecked`。
- 暂未暴露单个 `Checkbox` 的实例方法/类型（`toggle`、`CheckboxInstance`），批量操作请使用受控模式或 `Group.toggleAll`。
