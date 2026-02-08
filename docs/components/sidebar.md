---
simulator:
  compact: true
---

# Sidebar 侧边导航

## 介绍

用于在较宽的页面中展示垂直分类菜单，支持受控/非受控切换、徽标、禁用态等，可搭配内容区展示。

## 引入

```js
import { Sidebar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `defaultValue` 设置默认选中项。

<code src="./sidebar/demo/basic.tsx" title="基础用法"></code>

### 自定义徽标

可在 `Sidebar.Item` 上添加 `Badge` 或 `dot`，并支持禁用项。

<code src="./sidebar/demo/custom.tsx" title="徽标与禁用"></code>

### 受控模式

通过 `value/onChange` 管理外部状态。

<code src="./sidebar/demo/controlled.tsx" title="受控导航"></code>

### 自定义内容区

在 `Sidebar.Item` 中传入 `children` 即可渲染内容区，并可通过 `contentStyle` 自定义内容区样式。

<code src="./sidebar/demo/content.tsx" title="自定义内容区"></code>

## API

### Sidebar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前选中索引（受控） | `number` | - |
| `defaultValue` | 默认索引 | `number` | `0` |
| `sideStyle` | 左侧菜单容器样式 | `StyleProp<ViewStyle>` | - |
| `style` | 最外层容器样式 | `StyleProp<ViewStyle>` | - |
| `onChange` | 切换时回调 | `(value: number) => void` | - |

### Sidebar.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 文本内容 | `ReactNode` | - |
| `badge` | 徽标，可传数字/字符串或自定义节点 | `ReactNode` | - |
| `dot` | 右上角红点 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `onClick` | 点击当前项触发 | `(value: number) => void` | - |
| `textStyle` | 标题样式 | `StyleProp<TextStyle>` | - |
| `contentStyle` | 内容区域样式（仅激活项生效） | `StyleProp<ViewStyle>` | - |
| `children` | 内容区域内容（仅激活项展示） | `ReactNode` | - |

> 差异说明：当前版本暂未提供 `beforeChange` 等切换拦截能力，如需异步确认可在 `onChange` 中自行处理并回退选中态。

## RTL 支持

在 RTL 布局下，侧边导航的激活指示条位置会自动镜像（从左侧切换到右侧）。通过 `ConfigProvider` 的 `direction="rtl"` 生效。
