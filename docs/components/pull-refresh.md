---
simulator:
  compact: true
---

# PullRefresh 下拉刷新

## 介绍

在列表顶部下拉触发刷新，用于获取最新数据。

## 引入

```js
import { PullRefresh } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

与 `ScrollView` 兼容，触发 `onRefresh` 即可装载数据。

<code src="./pull-refresh/demo/basic.tsx" title="基础刷新"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `refreshing` | 受控刷新状态 | `boolean` | - |
| `defaultRefreshing` | 非受控默认值 | `boolean` | `false` |
| `onRefresh` | 下拉触发回调，可返回 Promise | `() => void \| Promise<void>` | - |
| `onRefreshEnd` | 刷新流程结束后触发（无论成功/失败） | `() => void` | - |
| `pullingText` | 下拉过程文案 | `ReactNode \| ({ distance }) => ReactNode` | `locale.vanPullRefresh.pulling` |
| `loosingText` | 释放过程文案 | `ReactNode \| ({ distance }) => ReactNode` | `locale.vanPullRefresh.loosing` |
| `loadingText` | 加载过程文案 | `ReactNode \| ({ distance }) => ReactNode` | `locale.vanPullRefresh.loading` |
| `successText` | 刷新成功文案（传 `null/false` 可关闭） | `ReactNode \| ({ distance }) => ReactNode` | `刷新成功` |
| `successDuration` | 成功提示展示时长（ms） | `number \| string` | `500` |
| `animationDuration` | 文案淡入淡出时长（ms），设为 0 可关闭动画 | `number \| string` | `300` |
| `headHeight` | 顶部提示高度 | `number \| string` | `50` |
| `pullDistance` | 触发释放刷新的距离阈值（仅影响文案状态判断） | `number \| string` | `headHeight` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| 其余 | 继承 `ScrollView` 属性 | - | - |

> iOS/Android 端内部使用 `RefreshControl`，Web 端使用拖拽手势模拟下拉回弹（桌面可直接鼠标下拉）。为了避免嵌套滚动冲突，建议让 `PullRefresh` 作为页面最外层滚动容器使用；`pullDistance` 仅用于文案状态（pulling/loosing）判断，不会改变原生触发阈值。
