---
simulator:
  compact: true
---

# Portal 全局挂载

## 介绍

Portal 用于在页面任意位置挂载节点，常见于弹窗、Toast 这类“脱离当前层级”的组件。它与 React Vant 的 `Teleport` 能力一致，通过全局 `PortalHost` 维护挂载队列，保证多个 Portal 按插入顺序叠加。

## 引入

```js
import { Portal } from 'react-native-system-ui'
```

> 在应用入口处挂载一次 `<Portal.Host>`（或使用已经内置 PortalHost 的 `ConfigProvider`），之后任意地方都能安全调用 `Portal` 与 `Portal.add`。

## 代码演示

### 基础用法

与 React Vant 一样，最常见的是在 `Cell`/按钮中触发展示，再由 `Portal` 将浮层挂载到 Host 层。

<code title="基础用法" src="./portal/demo/basic.tsx"></code>

### 多个浮层并行

`Portal` 使用内部队列保证多个浮层互不干扰，可自由控制不同内容和蒙层。

<code title="多个浮层并行" src="./portal/demo/multiple.tsx"></code>

### 静态调用

`Portal.add/Portal.remove` 便于封装 `Toast.show`、`Dialog.alert` 这类静态 API。

<code title="静态调用" src="./portal/demo/static.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `children` | 要挂载到 PortalHost 的节点 | `ReactNode` | `null` |

### Portal.Host Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `fixed` | Web 端是否使用 `position: fixed` 的 Host（避免被父容器裁剪） | `boolean` | `false` |

### 静态方法

| 方法 | 说明 |
| --- | --- |
| `Portal.Host` | 顶层容器，需要在应用根部渲染一次，内部会把 Portal 队列渲染到页面最顶层。 |
| `Portal.add(children, key?)` | 直接插入节点，返回的 key 可用于 `Portal.remove` 或 `Portal.update`。 |
| `Portal.remove(key)` | 根据 key 移除节点。 |
| `Portal.update(key, children)` | 更新已经存在的节点内容。 |
| `Portal.clear()` | 清空当前所有挂载的 Portal 节点，常用于退出页面或文档切换时的兜底清理。 |

> 静态方法默认会尝试自动创建 `PortalHost`（Web 环境下通过 DOM 自动注入），但在 React Native 真机/模拟器中仍需手动挂载一次 Host。
