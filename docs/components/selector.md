---
simulator:
  compact: false
---

# Selector 选择组

## 介绍

在一组选项中选择一个或多个。

## 引入

```js
import { Selector } from 'react-native-system-ui'
```

## 代码演示

### 单选

<code title="单选" src="./selector/demo/basic.tsx"></code>

### 多选

<code title="多选" src="./selector/demo/multiple.tsx"></code>

### 禁用状态

<code title="禁用状态" src="./selector/demo/disabled.tsx"></code>

### 描述选项

<code title="描述选项" src="./selector/demo/description.tsx"></code>

### 自定义样式

<code title="自定义样式" src="./selector/demo/custom-style.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 选项列表 | `SelectorOption[]` | - |
| `columns` | 每行展示的列数 | `number` | `3` |
| `multiple` | 是否多选 | `boolean` | `false` |
| `disabled` | 禁用全部选项 | `boolean` | `false` |
| `value` | 受控选中值列表 | `SelectorValue[]` | - |
| `defaultValue` | 非受控默认选中值 | `SelectorValue[]` | `[]` |
| `showCheckMark` | 是否显示勾选标记 | `boolean` | `true` |
| `onChange` | 选中项变更时触发 | `(value, { items }) => void` | - |
| `itemStyle` | 单个选项容器样式 | `StyleProp<ViewStyle>` | - |
| `labelStyle` | 选项文本样式 | `StyleProp<TextStyle>` | - |
| `descriptionStyle` | 描述文本样式 | `StyleProp<TextStyle>` | - |

## 类型定义

### SelectorValue

```ts | pure
type SelectorValue = string | number
```

### SelectorOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 主文案 | `ReactNode` |
| `description` | 描述文案 | `ReactNode` |
| `value` | 唯一标识 | `SelectorValue` |
| `disabled` | 禁用当前选项 | `boolean` |

## 泛型

`Selector` 支持泛型，你可以通过下面的方式手动控制 `value`、`onChange` 等属性的类型：

```tsx | pure
<Selector<'a' | 'b' | number>
  options={options}
  defaultValue={['a']}
  onChange={(arr) => console.log(arr)}
/>
```

> 通过 `components.selector` tokens 可统一覆盖颜色、边框、间距、圆角等视觉表现。
