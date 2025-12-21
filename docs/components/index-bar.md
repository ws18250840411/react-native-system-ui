---
simulator:
  compact: true
---

# IndexBar 索引栏

## 介绍

按照字母或拼音生成快速索引，通常用于联系人、城市列表等长列表场景。

## 引入

```js
import { IndexBar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

- 点击索引栏时，会自动跳转到对应的 `IndexBar.Anchor` 锚点位置。
- 可以通过 `indexList` 属性自定义展示的索引字符列表。

<code src="./index-bar/demo/basic.tsx" title="基础用法"></code>

### 自定义索引列表

通过 `indexList` 传入自定义索引数组。

<code src="./index-bar/demo/custom.tsx" title="自定义索引列表"></code>

### 受控模式（扩展）

通过 `value/onChange` 管理当前激活索引，可与外部按钮或搜索结果联动。

<code src="./index-bar/demo/controlled.tsx" title="受控切换"></code>

## API

### IndexBar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前激活索引（受控） | `string \| number` | - |
| `defaultValue` | 默认索引 | `string \| number` | 第一项 |
| `zIndex` | 侧边索引与粘性标题层级 | `number` | `1` |
| `sticky` | 是否在顶部显示吸附标题 | `boolean` | `true` |
| `stickyOffsetTop` | 吸附标题距离顶部的偏移量 | `number` | `0` |
| `indexList` | 自定义侧边索引列表（不传则从 `Anchor` 自动生成） | `(string \| number)[]` | - |
| `itemRender` | 自定义索引项渲染 | `(item, active) => ReactNode` | - |
| `showIndicator` | 是否显示触摸浮层 | `boolean` | `true` |
| `highlightColor` | 激活态颜色 | `string` | 主题主色 |
| `indicatorStyle` | 指示器样式 | `StyleProp<ViewStyle>` | - |
| `indexTextStyle` | 侧边索引文字样式 | `StyleProp<TextStyle>` | - |
| `safeAreaInsetTop` | 粘性标题是否适配顶部安全区 | `boolean` | `false` |
| `onChange` | 索引切换回调 | `(index: string \| number) => void` | - |
| `onSelect` | 点击侧边索引时触发 | `(index: string \| number) => void` | - |

### IndexBar.Anchor Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `index` | 字母/标识 | `string \| number` | - |
| `title` | 粘性标题文案 | `ReactNode` | `index` |
| `children` | 区域内容 | `ReactNode` | - |

### IndexBar Ref

| 方法 | 说明 | 类型 |
| --- | --- | --- |
| `scrollTo` | 滚动到指定锚点 | `(index: string \| number) => void` |
