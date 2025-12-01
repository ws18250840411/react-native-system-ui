---
simulator:
  compact: false
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
| `pullingText` | 下拉时文案 | `ReactNode` | `下拉即可刷新…` |
| `loosingText` | 释放文案 | `ReactNode` | `释放立即刷新…` |
| `loadingText` | 刷新中文案 | `ReactNode` | `刷新中…` |
| `successText` | 刷新成功文案 | `ReactNode` | `刷新成功` |
| `headHeight` | 顶部提示高度 | `number` | 主题默认 |
| `disabled` | 是否禁用 | `boolean` | `false` |
| 其余 | 继承 `ScrollView` 属性 | - | - |

> 下拉刷新内部使用 `RefreshControl`，因此当 `ScrollView` 嵌套在其他滚动容器中时，请确保外层允许垂直滚动，以避免冲突。
