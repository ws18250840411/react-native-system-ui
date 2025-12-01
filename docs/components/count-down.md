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

<code src="./count-down/demo/basic.tsx" title="基础"></code>

### 受控操作

<code src="./count-down/demo/controls.tsx" title="受控"></code>

### 毫秒显示

<code src="./count-down/demo/millisecond.tsx" title="毫秒"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `time` | 倒计时时长（毫秒） | `number \| string` | `0` |
| `autoStart` | 是否自动开始 | `boolean` | `true` |
| `millisecond` | 是否开启毫秒级渲染 | `boolean` | `false` |
| `format` | 展示格式（`DD HH mm ss S` 组合） | `string` | `HH:mm:ss` |
| `children` | 自定义渲染函数 | `(current) => ReactNode` | - |
| `onChange` | 时间变化回调 | `(current) => void` | - |
| `onFinish` | 倒计时结束回调 | `() => void` | - |

### CountDownInstance

通过 ref 获取实例并操作倒计时：

```ts
const ref = useRef<CountDownInstance>(null)
ref.current?.start()
ref.current?.pause()
ref.current?.reset()
```

> 差异说明：当前版本暂未提供服务端校时等能力，若需要对齐服务端时间可在业务侧监听 `onChange` 并手动调用 `reset`/`start`。
