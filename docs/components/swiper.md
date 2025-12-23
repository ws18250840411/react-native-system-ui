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

### 监听切换事件

在每一页轮播结束后，会触发 `onChange` 事件。

<code src="./swiper/demo/onChange.tsx" title="监听切换"></code>

### 纵向滚动

设置 `vertical` 属性后滑块会纵向排列。

<code src="./swiper/demo/vertical.tsx" title="纵向滚动"></code>

### 自定义滑块大小

滑块默认宽度为 `100%`，可以通过 `slideSize` 属性改变滑块宽度。

<code src="./swiper/demo/slide-size.tsx" title="自定义滑块大小"></code>

### 自定义指示器

通过 `indicator` 属性可以自定义指示器的样式。

<code src="./swiper/demo/custom-indicator.tsx" title="自定义指示器"></code>

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
| `autoplay` | 自动轮播间隔，单位为 ms | `boolean \| number` | `false` |
| `loop` | 是否开启循环播放 | `boolean` | `true` |
| `vertical` | 是否为纵向滚动 | `boolean` | `false` |
| `duration` | 动画时长，单位为 ms | `number` | `300` |
| `enabled` | 是否启用 | `boolean` | `true` |
| `rubberband` | 是否在拖动超出内容区域时启用橡皮筋效果，仅在非 loop 模式下生效 | `boolean` | `true` |
| `onChange` | 每一页轮播结束后触发 | `(index: number) => void` | `-` |
| `indicator` | 自定义指示器 | `boolean \| ((total: number, current: number) => ReactNode)` | `-` |
| `indicatorProps` | 指示器属性 | `{ style?: StyleProp<ViewStyle> }` | `-` |
| `slideSize` | 滑块的宽度百分比 | `number` | `100` |
| `trackOffset` | 滑块轨道整体的偏移量百分比 | `number` | `0` |
| `stuckAtBoundary` | 是否在边界两边卡住，避免出现空白，仅在非 loop 模式且 slideSize < 100 时生效 | `boolean` | `false` |
| `autoHeight` | 自适应高度 | `boolean` | `false` |
| `preventScroll` | 是否阻止内部滚动行为 | `boolean` | `true` |
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
| `enable` | 动态启用 Swiper（如果已经禁用） | `() => void` | `-` |
| `disable` | 禁用 Swiper（如果已启用）被禁用时，它将不会响应任何事件和交互 | `() => void` | `-` |
| `getCurrentIndex` | 获取当前索引 | `() => number` | `-` |
| `getPrevIndex` | 获取上一个索引 | `() => number` | `-` |
| `goToFirstIndex` | 跳转到第一个 | `() => void` | `-` |
| `goToLastIndex` | 跳转到最后一个 | `() => void` | `-` |

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

1. 当使用 `children` 模式时，子元素必须是 `Swiper.Item` 组件
2. 当使用 `data` 模式时，需要提供 `renderItem` 函数
3. 循环模式下，会自动复制首尾元素以实现无缝循环
4. 当 `slideSize < 100` 时，建议设置容器高度（纵向）或宽度（横向）

