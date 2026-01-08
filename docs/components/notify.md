---
simulator:
  compact: true
---

# Notify 消息提示

## 介绍

在页面顶部/底部展示通知文案，常用于全局消息提醒。

> 默认情况下 Notify 不会阻止页面交互（不拦截点击/滚动）；当设置 `onClick` 或 `closeOnClick` 时才会响应点击。

## 引入

```js
import { Notify } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./notify/demo/basic.tsx"></code>

### 通知类型

<code title="通知类型" src="./notify/demo/type.tsx"></code>

### 持续展示与动态更新

<code title="动态更新" src="./notify/demo/duration.tsx"></code>

### 自定义颜色

<code title="自定义颜色" src="./notify/demo/custom.tsx"></code>

### 静态调用

Notify 支持 `show/primary/success/danger/warning` 等静态方法，直接在任意位置调用即可展示通知。

```ts
Notify.show('提示内容')
Notify.success({ message: '操作成功', duration: 2000 })
Notify.warning({ message: '注意检查参数', position: 'bottom' })
```

静态方法会返回句柄，可用于更新或关闭：

```ts
const notify = Notify.show({ message: '处理中...', duration: 0 })
notify.config({ type: 'success', message: '完成', duration: 1500 })
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示（受控模式） | `boolean` | - |
| `message` | 通知内容 | `ReactNode` | - |
| `type` | 通知类型 | `'primary' \| 'success' \| 'danger' \| 'warning'` | `'primary'` |
| `duration` | 自动关闭延时（ms），0 表示不会自动关闭 | `number` | `3000` |
| `position` | 展示位置 | `'top' \| 'bottom'` | `'top'` |
| `color` | 文字颜色 | `string` | - |
| `background` | 背景色 | `string` | - |
| `safeAreaInsetTop` | 是否为顶部增加安全区（`position="top"`） | `boolean` | `true` |
| `safeAreaInsetBottom` | 是否为底部增加安全区（`position="bottom"`） | `boolean` | `false` |
| `closeOnClick` | 点击通知后是否关闭 | `boolean` | `false` |
| `zIndex` | 自定义层级 | `number` | - |
| `style` | 容器样式 | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `onClick` | 点击通知时触发 | `() => void` | - |
| `onClose` | 关闭时触发（静态和受控模式均会回调） | `() => void` | - |
| `onOpened` | 完全展示后的回调函数 | `() => void` | - |
| `onClosed` | 动画结束后触发 | `() => void` | - |

### 静态方法

| 方法 | 说明 |
| --- | --- |
| `Notify.show(options \\| message)` | 显示通知，返回 `{ clear, config, update }` 句柄（`config/update` 等价） |
| `Notify.primary / success / danger / warning(options)` | 快捷方法，自动设置 `type`，返回 `{ clear, config, update }` |
| `Notify.clear()` | 关闭所有通过静态方法创建的通知 |
| `Notify.allowMultiple(value)` | 是否允许多个 Notify 同时存在，默认单例 |
| `Notify.setDefaultOptions(options)` | 设置全局默认配置，或针对某个 `type` 设置默认项 |
| `Notify.resetDefaultOptions(type?)` | 重置默认配置，`type` 为空时清空所有默认项 |
