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

由于 `List` 会占满并接管滚动容器，多个场景示例通过 Tabs 在同一页面切换。

<code src="./list/demo/basic.tsx" ></code>

## API

### List Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `onLoad` | 触底触发加载，传入 `isRetry` 标识是否重试 | `(isRetry: boolean) => void \| Promise<void>` | - |
| `loading` | 受控加载状态（传入后由外部控制 loading 展示与并发节流） | `boolean` | - |
| `error` | 受控错误状态（传入后由外部控制 error 展示） | `boolean` | - |
| `finished` | 是否已经加载完成 | `boolean` | `false` |
| `offset` | 触发加载的距离阈值（px） | `number` | `300` |
| `immediateCheck` | 是否在挂载/尺寸变化时自动触发检查 | `boolean` | `true` |
| `loadingText` | 加载中文案 | `ReactNode` | `locale.loading` |
| `finishedText` | 完成后文案 | `ReactNode` | - |
| `errorText` | 错误文案或渲染函数（点击重试） | `ReactNode \| (retry) => ReactNode` | - |
| 其余 | 继承 `ScrollView` 的全部属性 | - | - |

### ListRef

| 方法 | 说明 |
| --- | --- |
| `check` | 主动检查是否需要触发加载 |

> 默认情况下组件内部维护 `loading/error` 状态并包含防并发重复请求逻辑；若传入 `loading` 或 `error`，将切换为受控模式，更贴近 Vant 的用法（由外部在请求开始/结束时更新状态）。
