---
simulator:
  compact: true
---

# Calendar 日历

## 介绍

日历选择器，支持单选、范围选择和多选模式，可嵌入页面或以弹窗形式展示。

## 引入

```js
import { Calendar } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./calendar/demo/basic.tsx"></code>

### 范围选择

<code title="范围选择" src="./calendar/demo/range.tsx"></code>

> 默认情况下起止日期需要至少跨一天，可通过 `allowSameDay` 允许同日；若需要限制选择天数，可结合 `maxRange` 与 `onOverRange` 进行提示。

### 弹层模式

<code title="弹层模式" src="./calendar/demo/popup.tsx"></code>

> 常见信息录入可通过 Cell 触发弹层。`poppable` 用于切换 Popup 承载，配合 `visible/defaultVisible/onVisibleChange` 控制展示节奏，可通过 `closeOnClickOverlay`、`closeOnConfirm` 管理遮罩或确认后的关闭时机。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前值（传 `null` 表示默认不选中） | `Date \| Date[] \| null` | - |
| `defaultValue` | 非受控默认值（可传 `null`） | `Date \| Date[] \| null` | - |
| `type` | 选择类型 | `single \| range \| multiple` | `single` |
| `minDate` | 最小可选日期 | `Date` | 当前日期 -10 年 |
| `maxDate` | 最大可选日期 | `Date` | 当前日期 +10 年 |
| `title` | 顶部标题 | `ReactNode` | `locale.vanCalendar.title`（中文：选择日期） |
| `showSubtitle` | 是否展示月份副标题 | `boolean` | `true` |
| `showHeader` | 是否展示顶部月份切换 | `boolean` | `true` |
| `showConfirm` | 是否展示底部确认按钮 | `boolean` | `type !== single` |
| `confirmText` | 确认按钮文案 | `ReactNode` | `locale.vanCalendar.confirm`（中文：确定） |
| `weekStartsOn` | 星期起始日，支持 `0-6` | `number` | `0` |
| `weekdays` | 自定义周标题文案 | `ReactNode[]` | `locale.vanCalendar.weekdays`（中文：日/一/.../六） |
| `formatMonthTitle` | 自定义月份标题 | `(date: Date) => ReactNode` | `-` |
| `color` | 选中颜色覆盖 | `string` | - |
| `allowSameDay` | `range` 类型下是否允许选中同一天作为起止 | `boolean` | `false` |
| `maxRange` | `range` 模式的最大跨度或 `multiple` 模式的最多天数 | `number` | `undefined` |
| `onOverRange` | 超过 `maxRange` 限制时回调 | `(limit: number) => void` | - |
| `poppable` | 是否以内置 Popup 方式展示 | `boolean` | `false` |
| `visible` | `poppable` 模式下的受控可见性 | `boolean` | - |
| `defaultVisible` | `poppable` 模式下的默认可见性 | `boolean` | `false` |
| `onVisibleChange` | `poppable` 模式的可见性变化回调 | `(visible: boolean) => void` | - |
| `closeOnClickOverlay` | `poppable` 模式下点击遮罩是否关闭 | `boolean` | `true` |
| `closeOnConfirm` | 点击确认后是否自动关闭弹层 | `boolean` | `true` |
| `popupPlacement` | 弹层位置，同 Popup `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` |
| `popupRound` | 是否启用弹层圆角 | `boolean` | `true` |
| `popupProps` | 透传额外 Popup 参数 | `Partial<PopupProps>` | - |
| `onOpen` | 弹层开始打开回调 | `() => void` | - |
| `onOpened` | 弹层完全打开回调 | `() => void` | - |
| `onClose` | 弹层开始关闭回调 | `() => void` | - |
| `onClosed` | 弹层完全关闭回调 | `() => void` | - |
| `onSelect` | 日期变化回调 | `(value: Date \| Date[]) => void` | - |
| `onConfirm` | 点击确认回调 | `(value: Date \| Date[]) => void` | - |

其余属性同 `View`，支持传入 `style` 控制整体外观。

## 国际化

Calendar 的标题、确认按钮、周标题、月份标题以及范围选择的「开始」/「结束」文案均通过 `locale.vanCalendar` 读取，可通过 `ConfigProvider` 的 `locale` 属性切换语言。

| 语言包 key | 中文 | 英文 |
| --- | --- | --- |
| `vanCalendar.title` | 日期选择 | Select Date |
| `vanCalendar.confirm` | 确定 | Confirm |
| `vanCalendar.start` | 开始 | Start |
| `vanCalendar.end` | 结束 | End |
| `vanCalendar.startEnd` | 开始/结束 | Start/End |
| `vanCalendar.weekdays` | 日/一/二/三/四/五/六 | Sun/Mon/Tue/Wed/Thu/Fri/Sat |
| `vanCalendar.monthTitle` | YYYY年M月 | YYYY/M |
| `vanCalendar.rangePrompt` | 最多选择 N 天 | Select up to N days |
