---
simulator:
  compact: true
---

# Portal 全局挂载

## 介绍

Portal 是 Overlay 的轻量包装，负责承载浮层内容。常见于弹窗、Toast 这类“脱离当前层级”的组件。静态 API 通过 `PortalHost` 分发挂载事件，保证多个浮层按插入顺序叠加。

## 引入

```js
import { Portal } from 'react-native-system-ui'
```

> 组件与静态 API 都需要在应用入口处挂载一次 `<Portal.Host>`（或使用已经内置 PortalHost 的 `ConfigProvider`）。

## 代码演示

### 基础用法

最常见的是在 `Cell`/按钮中触发展示，再由 `Portal` 将浮层挂载到 Host 层。

<code title="基础用法" src="./portal/demo/basic.tsx"></code>

### 多个浮层并行

`Portal` 通过 Host 统一承载多个浮层，可自由控制不同内容和蒙层。

<code title="多个浮层并行" src="./portal/demo/multiple.tsx"></code>

### 静态调用

`Portal.add/Portal.remove` 便于封装 `Toast.show`、`Dialog.alert` 这类静态 API。

<code title="静态调用" src="./portal/demo/static.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `children` | Portal 内部内容 | `ReactNode` | `null` |
| `isOpen` | 是否展示 | `boolean` | `true` |
| `visible` | `isOpen` 的兼容别名 | `boolean` | - |
| `useRNModalOnAndroid` | Android 端是否使用 `Modal` 承载 | `boolean` | `false` |
| `useRNModal` | 强制使用 `Modal` 承载 | `boolean` | `false` |
| `onRequestClose` | `Modal` 关闭回调 | `() => void` | - |
| `isKeyboardDismissable` | 是否允许点击遮罩关闭键盘 | `boolean` | `true` |
| `animationPreset` | 动画类型（`Modal` 或 Overlay 容器展示策略） | `fade \| slide \| none` | `fade` |
| `style` | Overlay 容器样式 | `ViewStyle` | - |

### Portal.Host Props

> 建议全局只挂载一个 `Portal.Host`，避免多 Host 造成叠层管理混乱。

### 静态方法

| 方法 | 说明 |
| --- | --- |
| `Portal.Host` | 顶层容器，需要在应用根部渲染一次，内部会把 Portal 队列渲染到页面最顶层。 |
| `Portal.add(children, key?)` | 直接插入节点，返回的 key 可用于 `Portal.remove` 或 `Portal.update`。 |
| `Portal.remove(key)` | 根据 key 移除节点。 |
| `Portal.update(key, children)` | 更新已经存在的节点内容。 |
| `Portal.clear()` | 清空当前所有挂载的 Portal 节点，常用于退出页面或文档切换时的兜底清理。 |

> 静态方法同样依赖已挂载的 `PortalHost`，请在应用入口处显式挂载一次。

## 差异说明

- 本库将 Portal 抽象为独立组件，便于跨端统一弹层出口与静态 API 实现（Web 框架通常以 `teleport` 参数内置在弹层组件中）。
