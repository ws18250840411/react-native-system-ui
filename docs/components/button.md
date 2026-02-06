---
simulator:
  compact: false
---

# Button 按钮

## 介绍

用于触发操作的交互元素，支持多种语义类型、尺寸、形状与加载态，可组合为按钮组。

## 引入

```js
import { Button } from 'react-native-system-ui'
```

> `Button` 同时支持 `text` 属性和 `children`。若未传 `text`，组件会直接渲染 `children` 节点，也支持在 loading 时通过 `loadingText` 覆盖显示内容。

## 代码演示

### 按钮类型

按钮支持 `default`、`primary`、`info`、`warning`、`danger`、`success` 六种类型，默认为 `default`。

<code src="./button/demo/type.tsx" title="按钮类型"></code>

### 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

<code src="./button/demo/plain.tsx" title="朴素按钮"></code>

### 细边框

设置 `hairline` 属性可以展示 0.5px 的细边框。

<code src="./button/demo/hairline.tsx" title="细边框"></code>

### 禁用状态

通过 `disabled` 属性禁用按钮，禁用状态下按钮不会响应点击。

<code src="./button/demo/disabled.tsx" title="禁用状态"></code>

### 加载状态

通过 `loading` 属性设置按钮为加载状态，`loadingText` 可以自定义加载提示文字。

- 在 `loading` 状态下默认仍会展示原文字；如需隐藏可传 `loadingText={null}`。

<code src="./button/demo/loading.tsx" title="加载状态"></code>

### 按钮形状

通过 `square` 设置方形按钮，通过 `round` 设置圆形按钮。

<code src="./button/demo/shape.tsx" title="按钮形状"></code>

### 图标按钮

通过 `icon` 属性设置按钮图标，支持传入函数自定义颜色与大小。

<code src="./button/demo/icon.tsx" title="图标按钮"></code>

### 按钮尺寸

支持 `large`、`normal`、`small`、`mini` 四种尺寸，默认为 `normal`。

<code src="./button/demo/size.tsx" title="按钮尺寸"></code>

### 块级元素

按钮默认是行内块级元素，通过 `block` 属性可以让按钮撑满整行宽度。

<code src="./button/demo/block.tsx" title="块级元素"></code>

### 自定义颜色

通过 `color` 属性可以自定义按钮颜色，`textColor` 可以单独调整文字颜色。

<code src="./button/demo/color.tsx" title="自定义颜色"></code>

### 按钮组

通过 `Button.Group` 将多个按钮并排显示，并可统一控制 `type`、`size` 等属性。

<code src="./button/demo/group.tsx" title="按钮组"></code>

## API

### Button Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` |
| `size` | 按钮尺寸 | `'large' \| 'normal' \| 'small' \| 'mini'` | `'normal'` |
| `text` | 按钮文字，未传时可直接通过 `children` 传入 | `ReactNode` | - |
| `color` | 按钮颜色 | `string` | - |
| `textColor` | 自定义文字颜色 | `string` | 自动推导 |
| `icon` | 按钮图标，支持函数 `(color, size) => ReactNode` | `ReactNode \| (color: string, size: number) => ReactNode` | - |
| `iconPosition` | 图标展示位置 | `'left' \| 'right'` | `'left'` |
| `block` | 是否为块级元素 | `boolean` | `false` |
| `plain` | 是否为朴素按钮 | `boolean` | `false` |
| `square` | 是否为方形按钮 | `boolean` | `false` |
| `round` | 是否为圆形按钮 | `boolean` | `false` |
| `shadow` | 显示阴影 | `boolean \| 1 \| 2 \| 3` | `false` |
| `disabled` | 是否禁用按钮 | `boolean` | `false` |
| `hairline` | 是否使用 0.5px 边框 | `boolean` | `false` |
| `loading` | 是否为加载状态 | `boolean` | `false` |
| `loadingText` | 加载状态提示文字 | `ReactNode` | - |
| `loadingSize` | 加载图标尺寸，等同于 `ActivityIndicator` 的 `size` | `'small' \| 'large' \| number` | `'small'` |
| `loadingIndicator` | 自定义加载指示器 | `ReactNode` | `ActivityIndicator` |
| `contentStyle` | 内容区样式（可自定义高度、内边距等） | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文字样式 | `StyleProp<TextStyle>` | - |
| `rippleColor` | Android 水波纹颜色 | `string` | 根据按钮类型自动推导 |
| `allowFontScaling` | 是否允许文字随系统字体缩放 | `boolean` | `true` |
| `maxFontSizeMultiplier` | 最大字体放大倍数 | `number` | - |

> 如需原生渐变可搭配第三方渐变组件。

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onPress` | 点击按钮且按钮未处于加载/禁用状态时触发 | `PressableProps['onPress']` |

### Button.Group Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 统一设置按钮类型 | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` |
| `size` | 统一设置按钮尺寸 | `'large' \| 'normal' \| 'small' \| 'mini'` | `'normal'` |
| `plain` | 是否为朴素按钮组 | `boolean` | `false` |
| `square` | 是否为方形按钮组 | `boolean` | `false` |
| `round` | 是否为圆形按钮组 | `boolean` | `false` |
| `block` | 是否为块级元素 | `boolean` | `false` |
| `shadow` | 显示阴影 | `boolean \| 1 \| 2 \| 3` | `false` |
| `disabled` | 是否禁用按钮组 | `boolean` | `false` |
| `iconPosition` | 统一设置图标位置 | `'left' \| 'right'` | `'left'` |
| `hairline` | 统一设置细边框 | `boolean` | `false` |
| `direction` | 按钮排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `spacing` | 按钮之间的间距 | `number` | `foundations.spacing.xs` |

> React Native 环境不支持 `tag`、`nativeType` 等 DOM 属性，因此对应能力不在移动端实现。

## 差异说明

- 本库额外提供 `success` 类型以配合主题色体系。
- React Native 环境不支持 `tag`/`nativeType` 等 DOM 属性。
