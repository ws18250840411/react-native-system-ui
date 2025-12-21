---
simulator:
  compact: false
---

# Button 按钮

## 介绍

按钮用于触发一个操作，如提交表单。

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

- 本库在 `loading` 状态下默认仍会展示原文字（与 react-native-paper 行为一致）；如需与 React Vant 一致可传 `loadingText={null}` 隐藏文字。

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
| `type` | 类型，可选值为 `default` `primary` `info` `warning` `danger` `success` | `ButtonType` | `default` |
| `size` | 尺寸，可选值为 `large` `normal` `small` `mini` | `ButtonSize` | `normal` |
| `mode` | 展示模式，类似 react-native-paper（`contained` `text` `outlined` `contained-tonal` `elevated`），可通过 `ThemeProvider` 中的 `components.button.defaults.mode` 配置全局默认值 | `ButtonMode` | `contained`（若 `plain` 为 true 且未显式指定 `mode` 则退化为 `text`） |
| `text` | 按钮文字，未传时可直接通过 `children` 传入 | `ReactNode` | - |
| `color` | 按钮颜色，支持传入 `linear-gradient` 渐变色（等同于 `buttonColor`，保留兼容） | `string` | - |
| `buttonColor` | 自定义按钮背景色 | `string` | - |
| `textColor` | 自定义文字颜色 | `string` | 自动推导 |
| `dark` | 是否强制文字使用浅色（`true`）或深色（`false`） | `boolean` | `undefined`（自动推导） |
| `icon` | 按钮图标，支持函数 `(color, size) => ReactNode` | `ReactNode \| (color: string, size: number) => ReactNode` | - |
| `iconPosition` | 图标展示位置，可选值为 `right` | `'left' \| 'right'` | `'left'` |
| `block` | 是否为块级元素 | `boolean` | `false` |
| `plain` | 是否为朴素按钮 | `boolean` | `false` |
| `square` | 是否为方形按钮 | `boolean` | `false` |
| `round` | 是否为圆形按钮 | `boolean` | `false` |
| `shadow` | 显示阴影，可选值为 `1` `2` `3` | `boolean \| 1 \| 2 \| 3` | `false` |
| `disabled` | 是否禁用按钮 | `boolean` | `false` |
| `hairline` | 是否使用 0.5px 边框 | `boolean` | `false` |
| `loading` | 是否为加载状态 | `boolean` | `false` |
| `loadingText` | 加载状态提示文字 | `ReactNode` | - |
| `loadingType` | 加载图标类型，可选值为 `spinner` | `'circular' \| 'spinner'` | `'circular'` |
| `loadingSize` | 加载图标尺寸，等同于 `ActivityIndicator` 的 `size` | `'small' \| 'large' \| number` | `'small'` |
| `loadingIndicator` | 自定义加载指示器 | `ReactNode` | `ActivityIndicator` |
| `uppercase` | 是否将文字自动转为大写（与 react-native-paper 对齐） | `boolean` | `false` |
| `autoInsertSpace` | 是否为两个中文字符自动插入空格 | `boolean` | `true` |
| `contentStyle` | 内容区样式（可自定义高度、内边距等） | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文字样式 | `StyleProp<TextStyle>` | - |
| `rippleColor` | Android 水波纹颜色 | `string` | 根据按钮类型自动推导 |
| `allowFontScaling` | 是否允许文字随系统字体缩放 | `boolean` | `true` |
| `maxFontSizeMultiplier` | 最大字体放大倍数 | `number` | - |

> React Native 环境渲染 `linear-gradient` 字符串时会自动退化为首个颜色值，如需原生渐变可搭配第三方渐变组件。

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onPress` | 点击按钮且按钮未处于加载/禁用状态时触发 | `PressableProps['onPress']` |

### Button.Group Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 统一设置按钮类型 | `ButtonType` | `default` |
| `mode` | 统一设置展示模式，等同子组件的 `mode` 属性 | `ButtonMode` | `-` |
| `size` | 统一设置按钮尺寸 | `ButtonSize` | `normal` |
| `plain` | 是否为朴素按钮组 | `boolean` | `false` |
| `square` | 是否为方形按钮组 | `boolean` | `false` |
| `round` | 是否为圆形按钮组 | `boolean` | `false` |
| `block` | 是否为块级元素 | `boolean` | `false` |
| `shadow` | 显示阴影，可选值为 `1` `2` `3` | `boolean \| 1 \| 2 \| 3` | `false` |
| `disabled` | 是否禁用按钮组 | `boolean` | `false` |
| `iconPosition` | 统一设置图标位置 | `'left' \| 'right'` | `'left'` |
| `hairline` | 统一设置细边框 | `boolean` | `false` |
| `direction` | 按钮排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `spacing` | 按钮之间的间距 | `number` | `foundations.spacing.xs` |

> React Native 环境不支持 `tag`、`nativeType` 等 DOM 属性，因此对应能力不在移动端实现。

## 差异说明

- React Vant 的 `ButtonType` 不包含 `success`，本库额外提供 `success` 以配合主题色体系。
- React Vant 支持 `tag`/`nativeType` 等 DOM 属性，本库在 React Native 环境不支持对应能力。
- 本库额外提供 `mode/uppercase/autoInsertSpace` 等能力，用于对齐 React Native Paper 的按钮交互与排版策略。
