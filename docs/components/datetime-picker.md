---
simulator:
  compact: false
---

# DatetimePicker 时间选择

## 介绍

支持日期、时间及组合选择，通过列滚轮快速选取具体时间点。

## 引入

```js
import { DatetimePicker } from react-native-system-ui
```

## 代码演示

### 日期选择

<code title="选择日期" src="./datetime-picker/demo/basic.tsx"></code>

### 日期时间

<code title="日期时间" src="./datetime-picker/demo/datetime.tsx"></code>

### 时间选择

<code title="时间选择" src="./datetime-picker/demo/time.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 时间选择类型 | `date \| time \| datetime \| datehour \| month-day \| year-month` | `datetime` |
| `value` | 当前值 | `Date`（非 `time` 类型）\| `string` (`HH:mm`) | - |
| `defaultValue` | 默认值 | 同 `value` | - |
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

除上述属性外，其余与 `Picker` 一致，例如 `title`、`showToolbar`、`itemHeight` 等。

### DatetimePickerColumnType

`year \| month \| day \| hour \| minute`
