---
simulator:
  compact: false
---

# PasswordInput 密码输入框

## 介绍

格子密码输入，常与 NumberKeyboard 联动，用于输入支付密码、验证码等定长口令。

## 引入

```ts
import { PasswordInput } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./password-input/demo/basic.tsx"></code>

### 限制长度

<code title="限制长度" src="./password-input/demo/limit.tsx"></code>

### 格子间距

<code title="格子间距" src="./password-input/demo/gutter.tsx"></code>

### 明文展示

<code title="明文展示" src="./password-input/demo/plain.tsx"></code>

### 只允许数字

<code title="只允许数字" src="./password-input/demo/number.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前值（受控） | `string` | - |
| `defaultValue` | 默认值（非受控） | `string` | `''` |
| `length` | 密码长度 | `number` | `6` |
| `type` | 输入类型，决定键盘与校验规则 | `'text' \| 'number'` | `'text'` |
| `mask` | 是否以圆点显示内容 | `boolean` | `true` |
| `gutter` | 单元格之间的间距 | `number` | `0` |
| `autoFocus` | 是否自动聚焦 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `info` | 底部提示信息 | `ReactNode` | - |
| `errorInfo` | 底部错误提示（优先级高于 `info`） | `ReactNode` | - |
| `validator` | 自定义校验，返回 `true` 才会更新值 | `(value: string) => boolean` | - |
| `showCursor` | 是否显示输入光标 | `boolean` | `true` |
| `cellStyle` | 单个单元格样式 | `StyleProp<ViewStyle>` | - |
| `cellFilledStyle` | 单元格填充后的样式 | `StyleProp<ViewStyle>` | - |
| `cellTextStyle` | 非掩码模式下文本样式 | `StyleProp<TextStyle>` | - |
| `highlightTextStyle` | 明文且有值时的高亮样式 | `StyleProp<TextStyle>` | - |
| `maskStyle` | 掩码视图样式 | `StyleProp<ViewStyle>` | - |
| `cursorStyle` | 光标样式 | `StyleProp<ViewStyle>` | - |
| `onChange` | 输入变化回调 | `(value: string) => void` | - |
| `onSubmit` | 输入长度满足 `length` 后触发 | `(value: string) => void` | - |
| `onFocus` | 聚焦时回调 | `() => void` | - |
| `onBlur` | 失焦时回调 | `() => void` | - |

### Ref

通过 `ref` 可以调用下列方法：

| 方法 | 说明 |
| --- | --- |
| `focus()` | 聚焦隐藏输入框 |
| `blur()` | 取消聚焦 |
| `clear()` | 清空输入内容 |
