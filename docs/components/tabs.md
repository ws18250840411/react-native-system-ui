---
simulator:
  compact: false
---

# Tabs 标签页

## 介绍

分隔内容并允许在同一页面中完成切换，支持行内、卡片、胶囊、Jumbo 描述等多种样式，并可开启吸顶模式。

## 引入

```js
import { Tabs } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

包含默认的下划线风格与卡片风格的组合示例，展示 `titleActiveColor`、`navRight` 等配置。

<code src="./tabs/demo/basic.tsx" title="基础用法"></code>

### 多样式示例

演示 `type="capsule"` 的胶囊标签以及 `type="jumbo"` 带描述信息的标签页，可搭配徽标/描述文案。

<code src="./tabs/demo/card.tsx" title="多样式"></code>

### 吸顶滚动

结合 `useGestureScroll` 与 `sticky`，即可实现吸顶导航；记得把 `scrollValue` 传给 Tabs。

<code src="./tabs/demo/sticky.tsx" title="吸顶滚动"></code>

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `active` | 当前选中项标识符，受控模式 | `TabsValue` | - |
| `defaultActive` | 默认选中项标识符 | `TabsValue` | 第一个 Tab |
| `type` | 外观类型，可选 `line` `card` `capsule` `jumbo` | `'line' \| 'card' \| 'capsule' \| 'jumbo'` | `line` |
| `align` | 非滚动模式下的对齐方式 | `'start' \| 'center'` | `center` |
| `color` | 指示器与激活文字颜色 | `string` | 主题色 |
| `background` | 标签栏背景色 | `string` | 主题色 |
| `border` | 是否显示底部分隔线（仅 line） | `boolean` | `true` |
| `lineWidth` | 自定义指示条宽度 | `number \| string` | - |
| `lineHeight` | 自定义指示条高度 | `number \| string` | - |
| `titleActiveColor` | 激活标签文字颜色 | `string` | 主题色 |
| `titleInactiveColor` | 默认标签文字颜色 | `string` | 设计稿默认色 |
| `ellipsis` | 是否省略过长标题 | `boolean` | `true` |
| `swipeThreshold` | 标签数量超过阈值后自动进入可滚动模式 | `number` | `5` |
| `scrollable` | 强制设置是否可滚动 | `boolean` | 自动判断 |
| `animated` | 是否开启指示条动画 | `boolean` | `true` |
| `duration` | 指示条动画时长（ms） | `number` | `160` |
| `beforeChange` | 切换前的回调，返回 `false` 可阻止切换，支持 Promise | `(name: TabsValue, index: number) => boolean \| Promise<boolean>` | - |
| `lazyRender` | 延迟渲染 Tab 内容 | `boolean` | `true` |
| `sticky` | 开启吸顶模式，需搭配 `scrollValue` | `boolean` | `false` |
| `offsetTop` | 吸顶时距离顶部偏移 | `number` | `0` |
| `scrollValue` | `useGestureScroll` 返回的滚动值 | `Animated.Value` | - |
| `enableStickyShadow` | 吸顶时是否展示阴影 | `boolean` | `true` |
| `navLeft` | 标签栏左侧扩展区域 | `ReactNode` | - |
| `navRight` | 标签栏右侧扩展区域 | `ReactNode` | - |
| `navBottom` | 标签栏下方扩展区域 | `ReactNode` | - |
| `tabBarStyle` | 标签栏容器样式 | `StyleProp<ViewStyle>` | - |
| `tabStyle` | 单个标签样式 | `StyleProp<ViewStyle>` | - |
| `titleStyle` | 标题文字样式 | `StyleProp<TextStyle>` | - |
| `descriptionStyle` | 描述文字样式 | `StyleProp<TextStyle>` | - |
| `contentStyle` | 内容区样式 | `StyleProp<ViewStyle>` | - |
| `onClickTab` | 点击标签时触发 | `(payload: TabsClickEvent) => void` | - |
| `onChange` | 当前激活标签改变时触发，参数为 `(name, index)` | `(name: TabsValue, index: number) => void` | - |
| `onScroll` | 吸顶模式滚动回调 | `(event: StickyScrollEvent) => void` | - |

### Tabs.TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 标签名称，匹配 `active` | `TabsValue` | 索引 |
| `title` | 标题 | `ReactNode` | - |
| `description` | 副标题/描述 | `ReactNode` | - |
| `badge` | 自定义徽标内容 | `ReactNode` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |

> 差异说明：`scrollspy`、`swipeable` 等高级场景仍在评估中，暂可结合 `useGestureScroll` + `Swiper` 扩展实现。
