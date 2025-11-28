---
simulator:
  compact: false
---

# Rate 评分

## 介绍

用于快速评分，支持整选与半选、禁用、只读等场景，API 对齐 react-vant Rate。

## 引入

```js
import { Rate } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./rate/demo/basic.tsx"></code>

### 半星与自定义颜色

<code title="半星与颜色" src="./rate/demo/half.tsx"></code>

### 只读与禁用

<code title="只读与禁用" src="./rate/demo/state.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前值（受控） | `number` | - |
| `defaultValue` | 默认值（非受控） | `number` | `0` |
| `count` | 图标个数 | `number` | `5` |
| `allowHalf` | 是否允许半选 | `boolean` | `false` |
| `size` | 图标尺寸 | `number` | `tokens.defaults.size` |
| `gutter` | 图标间距 | `number` | `tokens.defaults.gutter` |
| `color` | 选中颜色 | `string` | 主题 warning 色 |
| `voidColor` | 未选中颜色 | `string` | 主题默认色 |
| `disabledColor` | 禁用颜色 | `string` | 主题默认色 |
| `icon` | 自定义选中图标 | `ReactNode` | `★` |
| `voidIcon` | 自定义未选中图标 | `ReactNode` | `★` |
| `character` | 同时指定选中/未选中的展示内容 | `ReactNode` | `★` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `touchable` | 是否允许交互 | `boolean` | `true` |
| `onChange` | 值变化时触发 | `(value: number) => void` | - |
| `onIconPress` | 点击图标后回调 | `(value: number) => void` | - |
| `iconStyle` | 图标样式 | `StyleProp<TextStyle>` | - |
| `itemStyle` | 每个图标容器样式 | `StyleProp<ViewStyle>` | - |

> 通过主题的 `components.rate` 可以批量覆盖默认数量、间距、颜色等 tokens。
