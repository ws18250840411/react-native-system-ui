---
simulator:
  compact: true
---

# Swiper 轮播

## 介绍

用于循环播放一组图片或内容，基于 FlatList 实现，支持虚拟化，具备高性能。

## 引入

```js
import { Swiper } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

每个 Swiper.Item 代表一张轮播卡片。

<code src="./swiper/demo/basic.tsx" title="基础"></code>

### 自动播放

通过 `autoplay` 属性设置自动轮播的间隔。

<code src="./swiper/demo/autoplay.tsx" title="自动播放"></code>

### 图片轮播

使用 `Image` 组件渲染图片内容。

<code src="./swiper/demo/images.tsx" title="图片轮播"></code>

### 监听切换事件

在每一页轮播结束后，会触发 `onChange` 事件。

<code src="./swiper/demo/onChange.tsx" title="监听切换"></code>

### 纵向滚动

设置 `vertical` 属性后滑块会纵向排列。

<code src="./swiper/demo/vertical.tsx" title="纵向滚动"></code>

### 自定义指示器

通过 `indicator` 属性可以自定义指示器的样式。

<code src="./swiper/demo/custom-indicator.tsx" title="自定义指示器"></code>

### 关闭指示器

将 `indicator` 设置为 `false` 可隐藏指示器。

<code src="./swiper/demo/indicator-off.tsx" title="关闭指示器"></code>

### 关闭循环

将 `loop` 设置为 `false` 可关闭循环播放。

<code src="./swiper/demo/loop.tsx" title="关闭循环"></code>

### 使用 ref 控制

通过 ref 可以获取到 Swiper 实例并调用实例方法。

<code src="./swiper/demo/ref.tsx" title="Ref 控制"></code>

### 数据模式（高性能）

使用 `data` 和 `renderItem` 模式，适合动态数据或大量项目，性能更优。

<code src="./swiper/demo/data-mode.tsx" title="数据模式"></code>

## API

### Swiper Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `initialSwipe` | 初始位置索引值 | `number` | `0` |
| `touchable` | 是否允许手势滑动 | `boolean` | `true` |
| `autoplay` | 自动轮播间隔（ms），传 `true` 使用默认间隔 | `boolean \| number` | `false` |
| `loop` | 是否开启循环播放 | `boolean` | `true` |
| `vertical` | 是否为纵向滚动 | `boolean` | `false` |
| `onChange` | 每一页轮播结束后触发 | `(index: number) => void` | `-` |
| `indicator` | 自定义指示器 | `boolean \| ((total: number, current: number) => ReactNode)` | `-` |
| `indicatorProps` | 指示器属性 | `{ style?: StyleProp<ViewStyle> }` | `-` |
| `style` | 自定义样式 | `StyleProp<ViewStyle>` | `-` |
| `children` | 子元素（children 模式） | `React.ReactElement \| React.ReactElement[]` | `-` |
| `data` | 数据源（data 模式，与 children 二选一） | `T[]` | `-` |
| `renderItem` | 渲染函数（data 模式） | `FlatListProps<T>['renderItem']` | `-` |
| `testID` | 测试 ID | `string` | `-` |

### Swiper 方法

通过 ref 可以获取到 Swiper 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `swipeTo` | 切换到指定位置 | `(index: number, animated?: boolean) => void` | `-` |
| `swipeNext` | 切换到下一轮播 | `() => void` | `-` |
| `swipePrev` | 切换到上一轮播 | `() => void` | `-` |
| `getCurrentIndex` | 获取当前索引 | `() => number` | `-` |

### SwiperItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `style` | 自定义样式 | `StyleProp<ViewStyle>` | `-` |
| `children` | 子元素 | `React.ReactNode` | `-` |
| `testID` | 测试 ID | `string` | `-` |

### 类型定义

组件导出以下类型定义：

```ts
import type { SwiperInstance, SwiperProps } from 'react-native-system-ui'
```

## 性能说明

- 使用 **FlatList** 实现，支持虚拟化，仅渲染可见项
- 适合大量数据或动态数据源
- 支持 `getItemLayout` 优化，提升滚动性能
- 支持 `data` + `renderItem` 模式，性能更优

## 注意事项

1. 当使用 `children` 模式时，子元素可以是任意可渲染的节点
2. 当使用 `data` 模式时，需要提供 `renderItem` 函数
3. 循环模式下，会自动复制首尾元素以实现无缝循环
4. 建议为 Swiper 容器设置明确高度（纵向时设置高度，横向时设置宽度）

