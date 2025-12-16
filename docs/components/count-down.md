---
simulator:
  compact: false
---

# CountDown 倒计时

## 介绍

用于实时展示倒计时，支持毫秒渲染与受控启动/暂停。

## 引入

```js
import { CountDown } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./count-down/demo/basic.tsx"></code>

### 自定义格式

<code title="自定义格式" src="./count-down/demo/format.tsx"></code>

### 毫秒级渲染

<code title="毫秒级渲染" src="./count-down/demo/millisecond.tsx"></code>

### 自定义样式

<code title="自定义样式" src="./count-down/demo/custom-style.tsx"></code>

### 手动控制

<code title="手动控制" src="./count-down/demo/ref.tsx"></code>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `time` | 倒计时时长（毫秒） | `number \| string` | `0` |
| `autoStart` | 是否自动开始 | `boolean` | `true` |
| `millisecond` | 是否开启毫秒级渲染 | `boolean` | `false` |
| `format` | 展示格式（`DD HH mm ss S` 组合） | `string` | `HH:mm:ss` |
| `children` | 自定义渲染函数 | `(current) => ReactNode` | - |
| `onChange` | 时间变化回调 | `(current) => void` | - |
| `onFinish` | 倒计时结束回调 | `() => void` | - |

### format 格式

| 格式 | 说明 |
| --- | --- |
| `DD` | 天数 |
| `HH` | 小时 |
| `mm` | 分钟 |
| `ss` | 秒数 |
| `S` | 毫秒（1 位） |
| `SS` | 毫秒（2 位） |
| `SSS` | 毫秒（3 位） |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `onFinish` | 倒计时结束时触发 | - |
| `onChange` | 倒计时变化时触发 | `current: CountDownCurrentTime` |

### CountDownCurrentTime 格式

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `total` | 剩余总时间（毫秒） | `number` |
| `days` | 剩余天数 | `number` |
| `hours` | 剩余小时 | `number` |
| `minutes` | 剩余分钟 | `number` |
| `seconds` | 剩余秒数 | `number` |
| `milliseconds` | 剩余毫秒 | `number` |

### CountDownInstance

通过 ref 获取实例并操作倒计时：

```ts
const ref = useRef<CountDownInstance>(null)
ref.current?.start()
ref.current?.pause()
ref.current?.reset()
```

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `start` | 开始倒计时 | - | - |
| `pause` | 暂停倒计时 | - | - |
| `reset` | 重设倒计时（若 `autoStart` 为 `true`，重设后会自动开始倒计时） | - | - |

### 类型定义

组件导出以下类型定义：

```ts
import type { CountDownInstance, CountDownCurrentTime } from 'react-native-system-ui'
```
