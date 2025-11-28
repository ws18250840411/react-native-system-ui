---
simulator:
  compact: false
---

# Switch 开关

## 介绍

用于表示开/关两种状态，常与表单项配合使用，默认行为对齐 react-vant。

## 引入

```js
import { Switch } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./switch/demo/basic.tsx"></code>

### 尺寸与颜色

<code title="尺寸与颜色" src="./switch/demo/size.tsx"></code>

### 状态控制

<code title="加载与禁用" src="./switch/demo/state.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `checked` | 受控值 | `boolean` | - |
| `defaultChecked` | 非受控初始值 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 显示加载指示，且阻止切换 | `boolean` | `false` |
| `size` | 尺寸，`medium` / `small` | `SwitchSize` | `medium` |
| `activeColor` | 激活状态轨道颜色 | `string` | 主题主色 |
| `inactiveColor` | 未激活轨道颜色 | `string` | 主题默认色 |
| `label` | 文本或自定义节点 | `ReactNode` | - |
| `labelPosition` | 文本位置，`left` / `right` | `left \| right` | `right` |
| `onChange` | 状态变化回调 | `(checked: boolean) => void` | - |

其他 `ViewProps` 透传给最外层 `Pressable`。
