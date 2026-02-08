---
simulator:
  compact: true
---

# ErrorBoundary 错误边界

## 介绍

捕获子组件树中的 JavaScript 错误，防止整个应用崩溃，并展示降级 UI。支持自定义 fallback、错误回调与命令式重置。

## 引入

```js
import { ErrorBoundary } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

当子组件抛出错误时，自动渲染 `fallback` 内容，防止白屏。

<code title="基础用法" src="./error-boundary/demo/basic.tsx"></code>

### 错误恢复

通过 `fallback` 函数的 `reset` 参数或 `ref.reset()` 方法，可以重置错误状态，重新渲染子组件。配合 `onError` 和 `onReset` 回调，可对接错误监控与日志上报。

<code title="错误恢复" src="./error-boundary/demo/reset.tsx"></code>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `fallback` | 降级 UI，支持静态节点或接收 `(error, reset)` 的渲染函数 | `ReactNode \| (error: Error, reset: () => void) => ReactNode` | `null` |
| `onError` | 捕获错误时触发 | `(error: Error, errorInfo: React.ErrorInfo) => void` | - |
| `onReset` | 重置错误状态时触发 | `() => void` | - |
| `children` | 子组件 | `ReactNode` | - |

### Ref 方法

通过 `ref` 获取 `ErrorBoundaryRef` 实例：

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `reset` | 重置错误状态，重新渲染子组件 | `() => void` |

### 类型定义

```ts | pure
import type { ErrorBoundaryProps, ErrorBoundaryRef } from 'react-native-system-ui'
```

## 最佳实践

1. **应用根节点**：在 `<ConfigProvider>` 外层包一个 ErrorBoundary，防止全局崩溃：
   ```tsx | pure
   <ErrorBoundary fallback={<CrashScreen />}>
     <ConfigProvider>
       <App />
     </ConfigProvider>
   </ErrorBoundary>
   ```
2. **局部包裹**：对容易出错的模块（如第三方图表、动态内容）单独包裹。
3. **错误上报**：`onError` 中接入 Sentry / Bugsnag 等监控平台。
4. **配合 Retry**：`fallback` 渲染函数接收 `reset`，可实现一键重试。

## 差异说明

- 基于 React 类组件 `componentDidCatch` + `getDerivedStateFromError` 实现，支持 `forwardRef`。
- 仅捕获 **渲染阶段** 的错误；事件处理函数中的异常需自行 try/catch。
