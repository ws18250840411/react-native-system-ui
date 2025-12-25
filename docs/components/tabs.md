---
simulator:
  compact: true
---

# Tabs 标签页

## 介绍

分隔内容并允许在同一页面中完成切换，支持行内、卡片、胶囊、Jumbo 描述等多种样式。

## 引入

```js
import { Tabs } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

提供 4 种常见展现形式：

- `line` 下划线风格
- `capsule` 胶囊风格
- `jumbo` 带描述信息
- `card` 卡片风格

<code src="./tabs/demo/basic.tsx" title="基础用法"></code>

### 通过名称匹配

在标签传入 `name` 属性后，可结合 `active` / `defaultActive` 通过业务含义来切换，而不依赖索引。

<code src="./tabs/demo/name-match.tsx" title="通过名称匹配"></code>

### 滑动切换

设置 `swipeable` 后即可通过手势滑动切换标签，默认开启自适应高度，可结合 `lazyRenderPlaceholder` 提示未渲染内容。

<code src="./tabs/demo/swipeable.tsx" title="滑动切换"></code>

### 标签栏滚动

当标签数量超过 `swipeThreshold` 时，标签栏会自动开启横向滚动。

<code src="./tabs/demo/scrollable.tsx" title="标签栏滚动"></code>

### 禁用标签

在 `Tabs.TabPane` 上设置 `disabled` 可禁用对应标签，禁用项点击不会切换。

<code src="./tabs/demo/disabled.tsx" title="禁用标签"></code>

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `active` | 当前选中项标识符，受控模式 | `TabsValue` | - |
| `defaultActive` | 默认选中项标识符 | `TabsValue` | 第一个 Tab |
| `type` | 外观类型，可选 `line` `card` `capsule` `jumbo` | `'line' \| 'card' \| 'capsule' \| 'jumbo'` | `line` |
| `align` | 非滚动模式下的对齐方式 | `'start' \| 'center'` | `center` |
| `color` | 指示器与激活文字颜色 | `string` | 主题色 |
| `background` | 标签栏背景色 | `string` | `#fff` |
| `border` | 是否显示底部分隔线（仅 line） | `boolean` | `false` |
| `lineWidth` | 自定义指示条宽度 | `number \| string` | - |
| `lineHeight` | 自定义指示条高度 | `number \| string` | - |
| `titleActiveColor` | 激活标签文字颜色 | `string` | 主题色 |
| `titleInactiveColor` | 默认标签文字颜色 | `string` | 设计稿默认色 |
| `ellipsis` | 是否省略过长标题 | `boolean` | `true` |
| `swipeThreshold` | 标签数量超过阈值后自动进入可滚动模式 | `number \| string` | `5` |
| `animated` | 是否开启指示条动画 | `boolean` | `true` |
| `duration` | 指示条动画时长（ms） | `number \| string` | `300` |
| `beforeChange` | 切换前的回调，返回 `false` 可阻止切换，支持 Promise | `(name: TabsValue) => boolean \| Promise<boolean>` | - |
| `lazyRender` | 延迟渲染 Tab 内容 | `boolean` | `true` |
| `lazyRenderPlaceholder` | `lazyRender` 模式下未激活时的占位内容 | `ReactNode` | - |
| `swipeable` | 开启手势滑动切换，可传对象配置 `autoHeight`、`preventScroll` | `boolean \\| TabsSwipeableConfig` | `false` |
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

### Tabs.TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 标签名称，匹配 `active` | `TabsValue` | 索引 |
| `title` | 标题 | `ReactNode` | - |
| `description` | 副标题/描述 | `ReactNode` | - |
| `badge` | 自定义徽标内容 | `ReactNode` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |

### TabsSwipeableConfig

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `autoHeight` | 是否根据激活面板自适应高度 | `boolean` | `true` |
| `preventScroll` | 是否锁定手势方向，避免垂直滚动误触切换 | `boolean` | `true` |
