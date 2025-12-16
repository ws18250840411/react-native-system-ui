---
simulator:
  compact: true
---

# Skeleton 骨架屏

## 介绍

在内容加载前展示占位，避免布局抖动。目前提供标题、段落、头像等占位元素，可自定义尺寸与动画。

## 引入

```js
import { Skeleton } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code src="./skeleton/demo/basic.tsx" title="基础"></code>

### 显示头像与内容切换

<code src="./skeleton/demo/avatar.tsx" title="头像"></code>

### 自定义宽高

<code src="./skeleton/demo/custom.tsx" title="自定义"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 是否展示骨架屏，为 `false` 时展示子节点 | `boolean` | `true` |
| `animate` | 是否启用闪烁动画 | `boolean` | `true` |
| `avatar` | 是否展示头像占位 | `boolean` | `false` |
| `avatarSize` | 头像尺寸 | `number \| string` | `32` |
| `avatarShape` | 头像形状 | `'round' \| 'square'` | `'round'` |
| `title` | 是否展示标题占位 | `boolean` | `false` |
| `titleWidth` | 标题宽度 | `number \| string` | `40%` |
| `row` | 段落行数 | `number` | `3` |
| `rowWidth` | 段落宽度，可为数组 | `number \| string \| (number \| string)[]` | `100%` |
| `rowHeight` | 段落高度，可为数组 | `number \| string \| (number \| string)[]` | `16` |
| `round` | 是否使用圆角块 | `boolean` | `false` |
| `style` | 根节点样式 | `ViewStyle` | - |

> 差异说明：RN 版暂未提供图片/按钮等复杂占位，若有特殊需求可通过自定义 `children` + `loading={false}` 在加载完成后渲染真实内容。
