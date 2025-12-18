---
simulator:
  compact: true
---

# NavBar 导航栏

## 介绍

顶部导航容器，提供返回、标题、副标题以及左右操作区域，支持固定吸顶与 Safe Area。

## 引入

```js
import { NavBar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

左右两侧可以放置返回文案和操作按钮，默认会显示返回箭头。

<code src="./nav-bar/demo/basic.tsx" title="基础用法"></code>

### 自定义居中内容

通过 `children` 替换中间区域，可在沉浸式场景中自定义渐变/多行内容，配合 `tintColor` 控制整体色彩。

<code src="./nav-bar/demo/custom.tsx" title="自定义标题"></code>

### 固定吸顶

`fixed` + `placeholder` 可让 NavBar 吸附在顶部，同时保留原本高度占位，避免内容跳动。

<code src="./nav-bar/demo/fixed.tsx" title="固定吸顶"></code>

## API

### NavBar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 主标题 | `ReactNode` | - |
| `description` | 副标题 | `ReactNode` | - |
| `children` | 自定义中间内容，传入后会覆盖默认标题区域 | `ReactNode` | - |
| `leftText` | 左侧文案 | `ReactNode` | - |
| `rightText` | 右侧文案 | `ReactNode` | - |
| `leftIcon` | 左侧自定义图标 | `ReactNode` | - |
| `rightIcon` | 右侧自定义图标 | `ReactNode` | - |
| `leftArrow` | 是否展示默认返回箭头或自定义箭头节点 | `boolean \| ReactNode` | `true` |
| `fixed` | 是否固定在顶部 | `boolean` | `true` |
| `placeholder` | 固定时是否渲染占位元素 | `boolean` | `true` |
| `zIndex` | 固定时的层级 | `number` | `99` |
| `border` | 是否显示底部分隔线 | `boolean` | `true` |
| `safeAreaInsetTop` | 是否适配顶部安全区（固定时默认开启） | `boolean` | `true` |
| `background` | 背景色 | `string` | 主题背景 |
| `tintColor` | 标题与按钮文字颜色 | `string` | 主题文本色 |
| `titleStyle` | 标题样式 | `StyleProp<TextStyle>` | - |
| `descriptionStyle` | 副标题样式 | `StyleProp<TextStyle>` | - |
| `sideStyle` | 左右侧区域样式 | `StyleProp<ViewStyle>` | - |
| `onPressLeft` | 左侧点击回调 | `() => void` | - |
| `onPressRight` | 右侧点击回调 | `() => void` | - |
| `onClickLeft` | 同 `onPressLeft`（与 react-vant/vant 命名对齐） | `() => void` | - |
| `onClickRight` | 同 `onPressRight`（与 react-vant/vant 命名对齐） | `() => void` | - |

> 差异说明：当前版本暂未提供 `left-align`、`loading`、多标签滚动联动等扩展能力；若需浸入式渐变或滚动透明度联动，可结合 `Animated` 自定义背景，并利用 `children` 覆盖中间区域。
