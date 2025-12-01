---
simulator:
  compact: false
---

# Tabbar 标签栏

## 介绍

用于页面底部的全局导航，可自定义图标、徽标、固定吸底与安全区适配。

## 引入

```js
import { Tabbar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `defaultValue` 指定初始选中项，`Tabbar.Item` 接受函数以渲染激活/未激活的图标。

<code src="./tabbar/demo/basic.tsx" title="基础用法"></code>

### 自定义颜色与徽标

可使用 `activeColor/inactiveColor` 统一颜色，也可给单个 `Tabbar.Item` 传入 `Badge` 组件。

<code src="./tabbar/demo/badge.tsx" title="颜色与徽标"></code>

### 固定吸底

设置 `fixed` + `placeholder` 后，标签栏将固定在底部，同时保留原本高度占位；默认会自动处理底部 Safe Area。

<code src="./tabbar/demo/fixed.tsx" title="固定吸底"></code>

## API

### Tabbar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前选中项（受控） | `TabbarValue` | - |
| `defaultValue` | 默认选中项 | `TabbarValue` | 第一项 |
| `fixed` | 是否固定在底部 | `boolean` | `true` |
| `border` | 是否展示顶部分隔线 | `boolean` | `true` |
| `zIndex` | 固定模式下的 z-index | `number` | `99` |
| `activeColor` | 选中项文案/图标颜色 | `string` | `theme.primary` |
| `inactiveColor` | 未选中项文案/图标颜色 | `string` | `theme.default[500]` |
| `background` | 背景色 | `string` | `theme.background.base` |
| `placeholder` | 固定布局时是否渲染等高占位 | `boolean` | `true` |
| `safeAreaInsetBottom` | 是否适配底部安全区（`fixed` 时默认开启） | `boolean` | `true` |
| `contentStyle` | 内部容器样式 | `StyleProp<ViewStyle>` | - |
| `style` | 外层容器样式 | `StyleProp<ViewStyle>` | - |
| `onChange` | 切换时回调 | `(name: TabbarValue) => void` | - |

### Tabbar.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 标签标识，匹配 `value` | `TabbarValue` | 索引 |
| `icon` | 图标，可传组件或 `(active) => ReactNode` 回调 | `ReactNode \| (active: boolean) => ReactNode` | - |
| `badge` | 自定义徽标内容，一般使用 `Badge` 组件 | `ReactNode` | - |
| `children` | 标签文本，支持函数 `(active) => ReactNode` | `ReactNode \| (active: boolean) => ReactNode` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `iconStyle` | 图标容器样式 | `StyleProp<ViewStyle>` | - |

> 差异说明：暂未实现 `safeAreaInsetBottom=false` 时自动填充手势区域、`beforeChange`、`route` 等 react-vant 扩展能力，如有需要可在 `onChange` 中自定义拦截逻辑或结合导航容器实现。
