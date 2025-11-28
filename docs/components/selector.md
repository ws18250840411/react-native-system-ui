---
simulator:
  compact: false
---

# Selector 选项卡片

## 介绍

以方块卡片呈现多选或单选项，适合展示标签、城市等少量数据，API 参考 react-vant Selector。

## 引入

```js
import { Selector } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./selector/demo/basic.tsx"></code>

### 多选与自定义列数

<code title="多选与列数" src="./selector/demo/multiple.tsx"></code>

### 禁用状态

<code title="禁用" src="./selector/demo/disabled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 选项列表 | `SelectorOption[]` | - |
| `columns` | 每行展示的列数 | `number` | `2` |
| `multiple` | 是否多选 | `boolean` | `false` |
| `disabled` | 禁用全部选项 | `boolean` | `false` |
| `value` | 受控选中值列表 | `SelectorValue[]` | - |
| `defaultValue` | 非受控默认选中值 | `SelectorValue[]` | `[]` |
| `showCheckMark` | 是否显示勾选标记 | `boolean` | `true` |
| `onChange` | 选中项变更时触发 | `(value, { items }) => void` | - |
| `itemStyle` | 单个选项容器样式 | `StyleProp<ViewStyle>` | - |
| `labelStyle` | 选项文本样式 | `StyleProp<TextStyle>` | - |
| `descriptionStyle` | 描述文本样式 | `StyleProp<TextStyle>` | - |

### SelectorOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 主文案 | `ReactNode` |
| `description` | 描述文案 | `ReactNode` |
| `value` | 唯一标识 | `SelectorValue` |
| `disabled` | 禁用当前选项 | `boolean` |

> 通过 `components.selector` tokens 可统一覆盖颜色、边框、间距、圆角等视觉表现。
