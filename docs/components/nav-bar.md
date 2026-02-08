---
simulator:
  compact: true
---

# NavBar 导航栏

## 介绍

页面顶部导航栏，提供返回按钮、标题与右侧操作区，支持自定义内容与样式。

## 引入

```js
import { NavBar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

左右两侧可以放置返回文案和操作按钮。

<code src="./nav-bar/demo/basic.tsx" title="基础用法"></code>

### 自定义内容

自定义导航栏两侧的内容。

<code src="./nav-bar/demo/custom.tsx" title="自定义内容"></code>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `ReactNode` | `''` |
| `leftText` | 左侧文案 | `ReactNode` | `''` |
| `rightText` | 右侧文案 | `ReactNode` | `''` |
| `leftArrow` | 自定义左侧箭头 | `boolean \| ReactNode` | `false` |
| `border` | 是否显示下边框 | `boolean` | `true` |
| `fixed` | 是否固定在顶部 | `boolean` | `false` |
| `zIndex` | 导航栏 z-index | `number` | `1` |
| `placeholder` | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | `boolean` | `false` |
| `safeAreaInsetTop` | 是否开启顶部安全区适配 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onClickLeft` | 点击左侧按钮时触发 | - |
| `onClickRight` | 点击右侧按钮时触发 | - |

## 国际化

NavBar 的左右按钮无障碍标签通过 `locale.vanNavBar` 读取，可通过 `ConfigProvider` 的 `locale` 属性切换语言。

## RTL 支持

在 RTL 布局下，返回箭头会自动水平镜像（指向右侧）。通过 `ConfigProvider` 的 `direction="rtl"` 生效。
