---
simulator:
  compact: true
---

# Field 输入框

## 介绍

表单项容器，支持标签、清除按钮、提示文案、左右插槽等能力。

## 引入

```js
import { Field } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./field/demo/basic.tsx"></code>

### 图标与清除

<code title="图标与清除" src="./field/demo/icon.tsx"></code>

### 错误提示

<code title="错误提示" src="./field/demo/error.tsx"></code>

### 插入按钮

<code title="插入按钮" src="./field/demo/custom.tsx"></code>

### 格式化输入内容

<code title="格式化输入内容" src="./field/demo/formatter.tsx"></code>

### 高度自适应

<code title="高度自适应" src="./field/demo/textarea.tsx"></code>



> 默认字数统计文案右对齐，字号 12px，使用次级文本色；自定义时建议返回字符串以复用样式。

### 输入框内容对齐

<code title="输入框内容对齐" src="./field/demo/align.tsx"></code>

### ref 调用

<code title="ref 调用" src="./field/demo/ref.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 左侧标题内容 | `ReactNode` | - |
| `labelWidth` | 标题宽度 | `number` | `72` |
| `labelAlign` | 标题对齐方式 | `left \| center \| right` | `left` |
| `required` | 是否显示必填星号 | `boolean` | `false` |
| `colon` | 是否在标题后展示冒号 | `boolean` | `false` |
| `intro` | 额外提示信息（与 `description` 互斥） | `ReactNode` | - |
| `tooltip` | 标题提示气泡，支持传入字符串或 `Dialog.show` 参数 | `ReactNode \| DialogShowOptions & { icon?: ReactNode }` | - |
| `description` | 描述文案（无错误时展示） | `ReactNode` | - |
| `error` | 是否标红输入区域 | `boolean` | `false` |
| `errorMessage` | 底部错误提示文案 | `ReactNode` | - |
| `clearable` | 是否展示清除按钮 | `boolean` | `false` |
| `clearTrigger` | 清除按钮触发时机 | `always \| focus` | `focus` |
| `onClear` | 点击清除按钮回调 | `() => void` | - |
| `inputAlign` | 输入内容对齐 | `left \| center \| right` | `left` |
| `controlAlign` | 输入控件区域对齐方式（水平） | `left \| center \| right` | `left` |
| `center` | 是否垂直居中整体行内容 | `boolean` | `false` |
| `border` | 是否显示底部分隔线 | `boolean` | `true` |
| `size` | 行高尺寸 | `normal \| large` | `normal` |
| `clickable` | 是否展示点击态 | `boolean` | `false` |
| `isLink` | 是否展示右侧箭头 | `boolean` | `false` |
| `arrowDirection` | 箭头方向 | `left \| right \| up \| down` | `right` |
| `leftIcon` | 输入框左侧图标 | `ReactNode` | - |
| `rightIcon` | 输入框右侧图标（`clearable` 时被替换） | `ReactNode` | - |
| `prefix` | 输入框前置插槽 | `ReactNode` | - |
| `suffix` | 输入框后置插槽 | `ReactNode` | - |
| `button` | `suffix` 的兼容写法 | `ReactNode` | - |
| `extra` | 行尾额外内容 | `ReactNode` | - |
| `value` | 受控值 | `string` | - |
| `defaultValue` | 初始值（非受控） | `string` | `''` |
| `type` | 输入类型 | `text \| number \| digit \| password \| textarea \| tel \| search` | `text` |
| `rows` | `type="textarea"` 行数 | `number` | `2` |
| `autoSize` | 文本域自动增高（兼容 `autosize`） | `boolean \| { minRows?: number; maxRows?: number }` | `false` |
| `formatter` | 自定义格式化函数 | `(value: string) => string` | - |
| `formatTrigger` | 格式化触发时机 | `onChange \| onBlur` | `onChange` |
| `clearIcon` | 自定义清除图标 | `ReactNode` | - |
| `showWordLimit` | 是否展示字数统计，支持传入函数自定义展示内容，需要设置 `maxLength` | `boolean \| ({ currentCount, maxLength }) => ReactNode` | `false` |
| `maxLength` | 文本最大长度，超出时触发 `onOverlimit` | `number` | - |
| `onOverlimit` | 超过 `maxLength` 时回调 | `(value: string) => void` | - |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `onClick` | 点击整行时回调 | `() => void` | - |
| `onClickInput` | 点击输入区域时回调 | `() => void` | - |
| `onClickLeftIcon` | 点击左侧图标回调 | `() => void` | - |
| `onClickRightIcon` | 点击右侧图标回调 | `() => void` | - |
| `androidRipple` | 自定义 Android 波纹色，仅在可点击场景生效 | `PressableProps['android_ripple']` | - |

其余属性同 `TextInput`。

> 💡 `Field.Group` 直接复用 `Cell.Group` 的容器能力，`inset`/`card`/`border` 等配置完全一致，可结合其它 Cell 系列组件混排。
