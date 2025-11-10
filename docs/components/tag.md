---
simulator:
  compact: false
---

# Tag 标签

## 介绍

用于标记和分类的小标签，语义、尺寸、配色均与 react-vant 对齐。

## 引入

```js
import { Tag } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

使用 `type` 指定标签的语义色。

<code title="基础用法" src="./tag/demo/basic.tsx"></code>

### 样式风格

支持空心、圆角、标记以及可关闭标签。

<code title="样式风格" src="./tag/demo/style.tsx"></code>

### 标签尺寸

通过 `size` 控制标签高度与内边距，支持 `mini`、`small`、`medium`、`large`。

<code title="标签尺寸" src="./tag/demo/size.tsx"></code>

### 自定义颜色

可以通过 `color`、`textColor` 等属性定制标签配色。

<code title="自定义颜色" src="./tag/demo/color.tsx"></code>

## API

### Tag Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 标签类型，可选 `default` `primary` `success` `warning` `danger` | `TagType` | `'default'` |
| `size` | 标签尺寸，可选 `mini` `small` `medium` `large` | `TagSize` | `'small'` |
| `plain` | 是否为空心样式 | `boolean` | `false` |
| `round` | 是否为圆角样式 | `boolean` | `false` |
| `mark` | 是否为标记样式（左侧为直角） | `boolean` | `false` |
| `color` | 自定义背景色 | `string` | - |
| `textColor` | 自定义文字颜色，优先级高于 `color` | `string` | - |
| `show` | 是否展示标签 | `boolean` | `true` |
| `closeable` | 是否展示关闭图标 | `boolean` | `false` |
| `closeIcon` | 自定义关闭图标，支持函数 `(color, size) => ReactNode` | `ReactNode \| (color: string, size: number) => ReactNode` | - |
| `onClose` | 点击关闭图标时触发 | `() => void` | - |
| `onPress` | 点击标签时触发 | `() => void` | - |
| `style` | 容器样式 | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |

> React Native 不支持 DOM 中的 `tag` / `className`，如需自定义样式请直接通过 `style`、`textStyle` 或主题 tokens 操作。
