---
simulator:
  compact: true
---

# Avatar 头像

## 介绍

用来展示用户头像或代表性的图标，支持图片、文本和自定义节点。

## 引入

```js
import { Avatar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

头像默认是圆形的，支持传入 `src`、`text` 或自定义 `icon`。

<code title="基础用法" src="./avatar/demo/basic.tsx"></code>

### 尺寸

通过 `size` 设置头像尺寸，内置 `small`·`medium`·`large`，也支持直接传入数字。

<code title="尺寸" src="./avatar/demo/size.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `src` | 图片地址，字符串会自动转换为 `Image` 的 `uri` | `string \| ImageSourcePropType` | - |
| `icon` | 自定义图标内容 | `ReactNode` | - |
| `text` | 文本，占位时会自动取前两个字符 | `string` | - |
| `size` | 头像大小，支持 `small` `medium` `large` 或数字 | `'small' \| 'medium' \| 'large' \| number` | `'medium'` |
| `width` | 自定义宽度，优先级高于 `size` | `number` | - |
| `height` | 自定义高度，优先级高于 `size` | `number` | - |
| `shape` | 形状 | `'circle' \| 'square'` | `'circle'` |
| `color` | 文本颜色 | `string` | `palette.default[800]` |
| `backgroundColor` | 背景颜色 | `string` | `palette.default[100]` |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `contentStyle` | 自定义内容容器样式（用于自定义 `icon`） | `StyleProp<ViewStyle>` | - |
| `style` | 外层样式 | `StyleProp<ViewStyle>` | - |

> `Avatar` 继承 `Pressable`，可以直接传入 `onPress`、`onLongPress` 等事件。
