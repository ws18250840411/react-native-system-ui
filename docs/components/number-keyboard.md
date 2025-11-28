---
simulator:
  compact: false
---

# NumberKeyboard 数字键盘

## 介绍

弹出式数字键盘，常与 Field/PasswordInput 搭配，用于输入金额、验证码等。API 参考 react-vant NumberKeyboard。

## 引入

```js
import { NumberKeyboard } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./number-keyboard/demo/basic.tsx"></code>

### 自定义按键

<code title="自定义按键" src="./number-keyboard/demo/custom.tsx"></code>

### 受控输入

<code title="受控输入" src="./number-keyboard/demo/controlled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示键盘 | `boolean` | - |
| `value` | 当前输入值（受控） | `string` | - |
| `defaultValue` | 初始输入值（非受控） | `string` | `''` |
| `title` | 顶部标题 | `ReactNode` | - |
| `extraKey` | 自定义左下角按键，支持传入单个或两个字符 | `string \| string[]` | - |
| `closeButtonText` | 关闭按钮文案（为空则不展示） | `string` | - |
| `deleteButtonText` | 删除按钮文案 | `string` | - |
| `showDeleteKey` | 是否展示删除键 | `boolean` | `true` |
| `randomKeyOrder` | 数字键是否随机排列 | `boolean` | `false` |
| `blurOnClose` | 点击关闭按钮时是否触发 `onBlur` | `boolean` | `false` |
| `safeAreaInsetBottom` | 是否适配底部安全区 | `boolean` | `true` |
| `theme` | 样式风格，`default` / `custom` | `NumberKeyboardTheme` | `default` |
| `maxlength` | 输入最大长度 | `number` | - |
| `onInput` | 点击数字或自定义按键时触发 | `(key: string) => void` | - |
| `onDelete` | 点击删除键时触发 | `() => void` | - |
| `onChange` | 输入内容变化时触发 | `(value: string) => void` | - |
| `onClose` | 点击关闭按钮时触发 | `() => void` | - |
| `onBlur` | 键盘关闭时触发 | `() => void` | - |
| `onShow` / `onHide` | 键盘完全弹出/收起时触发 | `() => void` | - |
| `numberKeyRender` | 自定义数字键渲染 | `(key: string) => ReactNode` | - |
| `deleteRender` | 自定义删除键 | `() => ReactNode` | - |
| `extraKeyRender` | 自定义额外按键 | `(key: string) => ReactNode` | - |

> 需要与 Field 联动时，可将 `visible` 和输入值托管在父组件中，由 Field 的 `onFocus` 控制弹出。
