---
simulator:
  compact: false
---

# Toast 轻提示

## 介绍

用于展示轻量级反馈信息，默认 2 秒后自动关闭，可定位在顶部/中部/底部。

## 引入

```js
import { Toast } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./toast/demo/base.tsx"></code>

### 位置控制

<code title="位置控制" src="./toast/demo/position.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示 | `boolean` | - |
| `message` | 提示文本 | `ReactNode` | - |
| `icon` | 自定义图标 | `ReactNode` | - |
| `duration` | 自动关闭延时（ms），0 表示不会自动关闭 | `number` | `2000` |
| `position` | 显示位置 | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| `forbidClick` | 展示时禁止点击背景 | `boolean` | `false` |
| `style` | Toast 容器样式 | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `onClose` | 关闭时触发 | `() => void` | - |

> Toast 组件自身不注入全局方法，可结合状态管理或封装 `Toast.show` 以适配项目需求。
