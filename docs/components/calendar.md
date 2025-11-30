---
simulator:
  compact: false
---

# Calendar 日历

## 介绍

选择单日、范围或多选日期。

## 引入

```js
import { Calendar } from react-native-system-ui
```

## 代码演示

### 基础用法

<code title="基础" src="./calendar/demo/basic.tsx"></code>

### 范围选择

<code title="范围" src="./calendar/demo/range.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前值 | `Date \| Date[]` | - |
| `defaultValue` | 非受控默认值 | `Date \| Date[]` | - |
| `type` | 选择类型 | `single \| range \| multiple` | `single` |
| `minDate` | 最小可选日期 | `Date` | 当前日期 -10 年 |
| `maxDate` | 最大可选日期 | `Date` | 当前日期 +10 年 |
| `title` | 顶部标题 | `ReactNode` | `选择日期` |
| `showHeader` | 是否展示顶部月份切换 | `boolean` | `true` |
| `showConfirm` | 是否展示底部确认按钮 | `boolean` | `type !== single` |
| `confirmText` | 确认按钮文案 | `ReactNode` | `确定` |
| `weekStartsOn` | 星期起始日 | `0 \| 1` | `0` |
| `color` | 选中颜色覆盖 | `string` | - |
| `onSelect` | 日期变化回调 | `(value: Date \| Date[]) => void` | - |
| `onConfirm` | 点击确认回调 | `(value: Date \| Date[]) => void` | - |

其余属性同 `View`，支持传入 `style` 控制整体外观。
