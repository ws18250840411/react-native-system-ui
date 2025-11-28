---
simulator:
  compact: false
---

# Portal 全局挂载

## 介绍

Portal 用于在页面任意位置挂载节点，常用来承载弹窗、Toast 这类“脱离当前层级”的组件。它基于全局的 `PortalHost` 管理队列，保证多个 Portal 可以按插入顺序叠加。

## 引入

```js
import { Portal } from react-native-system-ui
```

> 在应用入口处挂载一次 `<Portal.Host>`（或使用包含 PortalHost 的 `ConfigProvider`），之后任意地方都能安全调用 `Portal`。

## 代码演示

### 基础用法

<code title="基础用法" src="./portal/demo/basic.tsx"></code>

### 多个浮层并行

<code title="多个浮层并行" src="./portal/demo/multiple.tsx"></code>

### 静态调用

`Portal.add/Portal.remove` 便于在业务层构建类似 `Toast.show` 的静态 API。

<code title="静态调用" src="./portal/demo/static.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `children` | 要挂载到 PortalHost 的节点 | `ReactNode` | `null` |

### 静态方法

| 方法 | 说明 |
| --- | --- |
| `Portal.Host` | 顶层容器，需要在应用根部渲染一次，内部会把 Portal 队列渲染到页面最顶层。 |
| `Portal.add(children, key?)` | 直接插入节点，返回的 key 可用于 `Portal.remove` 或 `Portal.update`。 |
| `Portal.remove(key)` | 根据 key 移除节点。 |
| `Portal.update(key, children)` | 更新已经存在的节点内容。 |

> 静态方法默认会尝试自动创建 `PortalHost`（Web 环境下通过 DOM 自动注入），但在 React Native 真机/模拟器中仍需手动挂载一次 Host。
