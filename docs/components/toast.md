---
simulator:
  compact: true
---

# Toast 轻提示

## 介绍

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

## 引入

```js
import { Toast } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./toast/demo/base.tsx"></code>

### 位置控制

<code title="位置控制" src="./toast/demo/position.tsx"></code>

### 加载与动态更新

<code title="动态更新" src="./toast/demo/loading.tsx"></code>

### 自定义图标

<code title="自定义图标" src="./toast/demo/customIcon.tsx"></code>

### 禁止背景点击

<code title="禁止点击" src="./toast/demo/forbidClick.tsx"></code>

### 多条提示并行

<code title="多条提示" src="./toast/demo/multiple.tsx"></code>

### 全局配置

<code title="默认配置" src="./toast/demo/global.tsx"></code>

### 静态调用

Toast 支持 `show/success/fail/loading/info` 等静态方法，直接在任意位置调用即可展示提示。

```ts
Toast.success('提交成功')
Toast.show({ message: '处理中', position: 'top' })
Toast.loading({ message: '加载中', forbidClick: true })
```

静态方法会返回 toast 句柄，可用于动态更新或清除：

```ts
const toast = Toast.loading({ message: '加载中...', forbidClick: true })
toast.config({ type: 'success', message: '完成', duration: 1500 })
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示（受控模式） | `boolean` | - |
| `message` | 提示文本 | `ReactNode` | - |
| `type` | 提示类型（决定默认图标） | `'info' \| 'success' \| 'fail' \| 'loading'` | `'info'` |
| `icon` | 自定义图标 | `ReactNode` | - |
| `iconSize` | 内置图标/加载图标大小 | `number` | `36` |
| `loadingType` | 加载图标类型 | `'circular' \| 'spinner'` | `'circular'` |
| `duration` | 自动关闭延时（ms），0 表示不会自动关闭 | `number` | `2000` |
| `position` | 显示位置 | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| `overlay` | 是否展示半透明遮罩 | `boolean` | `false` |
| `overlayStyle` | 遮罩样式 | `StyleProp<ViewStyle>` | - |
| `forbidClick` | 展示时禁止点击背景 | `boolean` | `false` |
| `closeOnClickOverlay` | 点击遮罩层后是否关闭 | `boolean` | `false` |
| `closeOnClick` | 点击 Toast 本身后是否立即关闭 | `boolean` | `false` |
| `style` | Toast 容器样式 | `StyleProp<ViewStyle>` | - |
| `textStyle` | 文本样式 | `StyleProp<TextStyle>` | - |
| `onClose` | 关闭时触发（静态和受控模式均会回调） | `() => void` | - |
| `onOpened` | 完全展示后的回调函数 | `() => void` | - |
| `onClosed` | 动画结束后触发 | `() => void` | - |

### 静态方法

| 方法 | 说明 |
| --- | --- |
| `Toast.show(options \\| message)` | 显示普通提示，返回 `{ clear, config, update }` 句柄（`config/update` 等价） |
| `Toast.success / fail / info / loading(options)` | 快捷方法，自动设置 `type`，返回 `{ clear, config, update }` |
| `Toast.clear()` | 关闭所有通过静态方法创建的提示 |
| `Toast.allowMultiple(value)` | 是否允许多个 Toast 同时存在，默认单例 |
| `Toast.setDefaultOptions(options)` | 设置全局默认配置，或针对某个 `type` 设置默认项 |
| `Toast.resetDefaultOptions(type?)` | 重置默认配置，`type` 为空时清空所有默认项 |

## 差异说明

- React Vant 支持直接调用 `Toast(options \| message)`；本库使用 `Toast.show(options \| message)`，并额外提供 `<Toast visible />` 受控用法。
- React Vant 提供 `teleport/className/overlayClass/transition` 等 DOM 能力；本库在 React Native 环境不适用，统一通过 Portal + 样式 props（如 `style/overlayStyle`）实现。
