---
simulator:
  compact: true
---

# DatetimePicker 时间选择

## 介绍

支持日期、时间及组合选择，通过列滚轮快速选取具体时间点。

## 引入

```js
import { DatetimePicker } from 'react-native-system-ui'
```

## 代码演示

### 日期选择

<code title="选择日期" src="./datetime-picker/demo/basic.tsx"></code>

### 日期时间

<code title="日期时间" src="./datetime-picker/demo/datetime.tsx"></code>

### 时间选择

<code title="时间选择" src="./datetime-picker/demo/time.tsx"></code>

### 年月选择

<code title="选择年月" src="./datetime-picker/demo/year-month.tsx"></code>

### 月日选择

<code title="选择月日" src="./datetime-picker/demo/month-day.tsx"></code>

### 年月日+小时

<code title="年月日+小时" src="./datetime-picker/demo/datehour.tsx"></code>

### 弹层模式

通过组合 `Popup` 可以实现与 react-vant 类似的弹出选择。

<code title="Popup 组合" src="./datetime-picker/demo/popup.tsx"></code>

### 自定义列顺序

<code title="列顺序 day-month-year" src="./datetime-picker/demo/columns-order.tsx"></code>

### 选项过滤

<code title="过滤偶数分钟" src="./datetime-picker/demo/filter.tsx"></code>

### 选项格式化

<code title="附加单位" src="./datetime-picker/demo/formatter.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 时间选择类型 | `date \| time \| datetime \| datehour \| month-day \| year-month` | `datetime` |
| `value` | 当前值 | `Date`（非 `time` 类型）\| `string` (`HH:mm`) | - |
| `defaultValue` | 默认值（非受控） | 同 `value` | - |
| `minDate` | 可选最小日期 | `Date` | 当前日期前 10 年 |
| `maxDate` | 可选最大日期 | `Date` | 当前日期后 10 年 |
| `minHour` | 可选最小小时（`type="time"`） | `number` | `0` |
| `maxHour` | 可选最大小时（`type="time"`） | `number` | `23` |
| `minMinute` | 可选最小分钟（`type="time"`） | `number` | `0` |
| `maxMinute` | 可选最大分钟（`type="time"`） | `number` | `59` |
| `columnsOrder` | 自定义列顺序 | `DatetimePickerColumnType[]` | - |
| `filter` | 选项过滤函数 | `(type, values) => values` | - |
| `formatter` | 选项格式化函数 | `(type, value) => ReactNode` | `value => value` |
| `onChange` | 选中项变化回调 | `(value) => void` | - |
| `onConfirm` | 点击确认回调 | `(value) => void` | - |
| `onCancel` | 点击取消回调（继承自 Picker） | `() => void` | - |
| `popup` | 是否开启内置弹层模式 | `boolean` | `false` |
| `popupVisible` / `defaultPopupVisible` | 弹层显隐（受控 / 非受控） | `boolean` | `false` |
| `onPopupVisibleChange` | 弹层显隐变化回调 | `(visible: boolean) => void` | - |
| `popupProps` | 传递给 Popup 的其他属性 | `PopupProps`（除 `visible/children`） | - |
| `title` | 顶部标题（继承自 Picker） | `ReactNode` | - |
| `itemHeight` | 选项高度（继承自 Picker） | `number` | 44 |
| `visibleItemCount` | 同屏可见列数（继承自 Picker） | `number` | 6 |
| `swipeDuration` | 惯性滚动时长（ms，继承自 Picker） | `number` | 1000 |
| `columnsTop` / `columnsBottom` | 自定义列上/下方内容 | `ReactNode` | - |

除上述属性外，其余与 `Picker` 一致，例如 `title`、`showToolbar`、`itemHeight` 等。

### DatetimePickerColumnType

`year \| month \| day \| hour \| minute`

## 与 react-vant 的一致性说明

- 支持 `columnsOrder`/`filter`/`formatter`，列类型、顺序与 react-vant 文档一致。
- `minDate/maxDate` 与 `minHour/maxHour/minMinute/maxMinute` 的边界会自动 clamp 当前值，避免越界。
- 其余通用属性（如标题、确认/取消按钮文案、选项高度、可见列数）直接透传 `Picker`。
- 内置 `popup` 模式，无需手动包裹 Popup，亦可传递 `popupProps` 定制；保持与 react-vant 弹层用法一致。
