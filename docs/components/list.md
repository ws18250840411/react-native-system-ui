---
simulator:
  compact: true
---

# List 列表加载

用于长列表滚动加载，接近底部时触发 `onLoad`，并在加载完成后展示提示。

## 引入

```js
import { List } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

滚动到底部自动请求下一页数据。

<code src="./list/demo/basic.tsx" title="滚动加载"></code>

## API

### List Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `onLoad` | 触底触发加载，传入 `isRetry` 标识是否重试 | `(isRetry: boolean) => void \| Promise<void>` | - |
| `finished` | 是否已经加载完成 | `boolean` | `false` |
| `offset` | 触发加载的距离阈值（px） | `number` | `120` |
| `loadingText` | 加载中文案 | `ReactNode` | `加载中…` |
| `finishedText` | 完成后文案 | `ReactNode` | - |
| `errorText` | 错误文案或渲染函数 | `ReactNode \| (retry) => ReactNode` | `加载失败，点击重试` |
| 其余 | 继承 `ScrollView` 的全部属性 | - | - |

### ListRef

| 方法 | 说明 |
| --- | --- |
| `check` | 主动检查是否需要触发加载 |

> 组件内部维护 `loading`/`error` 状态，运行时无需额外状态管理；若 `onLoad` 返回的 Promise 被 reject，将展示错误文案并允许重试。
