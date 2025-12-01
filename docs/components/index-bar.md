---
simulator:
  compact: false
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

自动根据 `IndexBar.Anchor` 渲染侧边索引，支持默认粘性标题与触摸指示器。

<code src="./index-bar/demo/basic.tsx" title="基础索引"></code>

### 受控模式

通过 `value/onChange` 管理当前激活索引，可与外部按钮或搜索结果联动。

<code src="./index-bar/demo/controlled.tsx" title="受控切换"></code>

### 自定义主题

使用 `highlightColor` 与 `indicatorStyle` 自定义高亮颜色，满足品牌化需求。

<code src="./index-bar/demo/custom.tsx" title="主题自定义"></code>

## API

### IndexBar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前激活索引（受控） | `string` | - |
| `defaultValue` | 默认索引 | `string` | 第一项 |
| `sticky` | 是否在顶部显示吸附标题 | `boolean` | `true` |
| `showIndicator` | 是否显示触摸浮层 | `boolean` | `true` |
| `highlightColor` | 激活态颜色 | `string` | 主题主色 |
| `indicatorStyle` | 指示器样式 | `StyleProp<ViewStyle>` | - |
| `indexTextStyle` | 侧边索引文字样式 | `StyleProp<TextStyle>` | - |
| `safeAreaInsetTop` | 粘性标题是否适配顶部安全区 | `boolean` | `false` |
| `onChange` | 索引切换回调 | `(index: string) => void` | - |

### IndexBar.Anchor Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `index` | 字母/标识 | `string` | - |
| `title` | 粘性标题文案 | `ReactNode` | `index` |
| `children` | 区域内容 | `ReactNode` | - |

> 差异说明：当前实现聚焦移动端触摸场景，暂未提供 react-vant 的 `stickyOffsetTop`、`onSelect`（区分触摸/滚动来源）等参数；需要更复杂的滚动同步可结合 `ScrollView` 自定义 padding 和 `onChange`。 
