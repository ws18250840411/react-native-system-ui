---
simulator:
  compact: false
---

# Pagination 分页

## 介绍

用于在长列表中进行分页切换，支持多页模式、自定义可见页数、简洁模式等场景。

## 引入

```js
import { Pagination } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code src="./pagination/demo/basic.tsx" title="基础"></code>

### 简洁模式

<code src="./pagination/demo/simple.tsx" title="简洁模式"></code>

### 自定义渲染

<code src="./pagination/demo/custom.tsx" title="自定义"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前页（受控） | `number` | `1` |
| `defaultValue` | 默认页 | `number` | `1` |
| `onChange` | 页码变化回调 | `(page: number) => void` | - |
| `mode` | 模式，可选 `multi`、`simple` | `'multi' \| 'simple'` | `'multi'` |
| `pageCount` | 总页数 | `number` | 依据 `totalItems/itemsPerPage` 计算 |
| `totalItems` | 总条目数 | `number` | `0` |
| `itemsPerPage` | 每页条数 | `number` | `10` |
| `showPageSize` | 同屏展示的页码数量 | `number` | `5` |
| `forceEllipses` | 是否展示省略跳转 | `boolean` | `false` |
| `prevText` | 上一页文案 | `ReactNode` | `'上一页'` |
| `nextText` | 下一页文案 | `ReactNode` | `'下一页'` |
| `pageDesc` | 简洁模式下的描述 | `ReactNode` | `value/count` |
| `pageRender` | 自定义页码渲染 | `(page) => ReactNode` | - |

> 差异说明：由于 RN 没有 `li/ul` 语义结构，组件使用 `View/Pressable` 实现，若需无障碍语义请结合 `accessibilityRole="button"` 自行补充。
