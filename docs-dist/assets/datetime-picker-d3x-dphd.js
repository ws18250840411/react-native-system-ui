import{R as r,j as e,V as u}from"./main-BAeJvGa4.js";import{D as c}from"./DatetimePicker-B6k5duAa.js";import{F as V}from"./Field-BSylHY6l.js";import"./Picker-B1Osq8if.js";import"./Loading-CpmDHEQC.js";import"./createComponentTokensHook-C-NxqfEf.js";import"./index-tIQ9IWf_.js";import"./extends-CF3RwP-h.js";import"./color-CJcOUys4.js";import"./number-D4GYRO_w.js";import"./index-CJrLMJTa.js";import"./index-DkwLlxr6.js";import"./compare-B0QhPEQa.js";import"./index-BQ9E3_S9.js";import"./index-Beiuxnvg.js";import"./Popup-Dvt_YZ-j.js";import"./createPlatformShadow-BbOkyb5V.js";import"./IconBase-BXXvwLgA.js";import"./Portal-DpGMOUoW.js";import"./Overlay-DsrHAOal.js";import"./Animated-BC0ZtReY.js";import"./index-OVYHKMmk.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-D2UM4R66.js";import"./useAriaPress-B7BjoQga.js";import"./index-DNlyIA0F.js";import"./SafeAreaView-DvA24sN_.js";import"./useSafeAreaPadding-CHurfSaN.js";import"./useControllableValue-Dp7VzsJy.js";import"./date-DjZXGQxL.js";import"./index-bJvK1ILl.js";import"./Arrow-DUiww19E.js";import"./hairline-DQRu37Yt.js";import"./index-vDISk0oB.js";import"./useLocale-BmOENVyS.js";import"./promise-BSLZg49p.js";import"./Close-Cz6HpK28.js";import"./index-PXiyNNr8.js";import"./index-C2RJyUbd.js";function o(){const[t,a]=r.useState(new Date);return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"date",value:t,onChange:a})})}const P=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerBasicDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker type="date" value={value} onChange={setValue} />
    </View>
  )
}
`,j={code:P,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerBasicDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker type="date" value={value} onChange={setValue} />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerBasicDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker type="date" value={value} onChange={setValue} />
    </View>
  )
}
`}},title:"选择日期",identifier:"datetime-picker-basic",lang:"tsx",meta:{title:"选择日期"}};function l(){const[t,a]=r.useState(new Date);return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"datetime",value:t,onChange:a,minDate:new Date(2024,0,1),maxDate:new Date(2026,11,31)})})}const w=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatetimeDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
      />
    </View>
  )
}
`,F={code:w,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatetimeDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatetimeDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
      />
    </View>
  )
}
`}},title:"日期时间",identifier:"datetime-picker-datetime",lang:"tsx",meta:{title:"日期时间"}};function m(){const[t,a]=r.useState("09:30");return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"time",value:t,onChange:a,minHour:8,maxHour:20})})}const k=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerTimeDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        minHour={8}
        maxHour={20}
      />
    </View>
  )
}
`,C={code:k,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerTimeDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        minHour={8}
        maxHour={20}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerTimeDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        minHour={8}
        maxHour={20}
      />
    </View>
  )
}
`}},title:"时间选择",identifier:"datetime-picker-time",lang:"tsx",meta:{title:"时间选择"}};function d(){const[t,a]=r.useState(new Date);return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"year-month",value:t,onChange:a,minDate:new Date(2024,0,1),maxDate:new Date(2026,11,1)})})}const E=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerYearMonthDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="year-month"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 1)}
      />
    </View>
  )
}
`,g={code:E,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerYearMonthDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="year-month"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 1)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerYearMonthDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="year-month"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 1)}
      />
    </View>
  )
}
`}},title:"选择年月",identifier:"datetime-picker-year-month",lang:"tsx",meta:{title:"选择年月"}};function p(){const[t,a]=r.useState(new Date);return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"month-day",value:t,onChange:a,minDate:new Date(2025,0,1),maxDate:new Date(2025,11,31)})})}const R=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerMonthDayDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="month-day"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`,M={code:R,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerMonthDayDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="month-day"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerMonthDayDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="month-day"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`}},title:"选择月日",identifier:"datetime-picker-month-day",lang:"tsx",meta:{title:"选择月日"}};function v(){const[t,a]=r.useState(new Date);return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"datehour",value:t,onChange:a,minDate:new Date(2025,0,1),maxDate:new Date(2025,11,31)})})}const b=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatehourDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datehour"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`,N={code:b,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatehourDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datehour"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatehourDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datehour"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`}},title:"年月日+小时",identifier:"datetime-picker-datehour",lang:"tsx",meta:{title:"年月日+小时"}};function h(){const[t,a]=r.useState(!1),[n,i]=r.useState(new Date),s=f=>{i(f),a(!1)};return e.jsxs(u,{style:{gap:12},children:[e.jsx(V,{readOnly:!0,clickable:!0,label:"选择时间",value:n.toLocaleString(),placeholder:"请选择时间",onClick:()=>a(!0)}),e.jsx(c,{popup:!0,popupVisible:t,onPopupVisibleChange:a,type:"datetime",value:n,onChange:i,onConfirm:s,onCancel:()=>a(!1),showToolbar:!0})]})}const _=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker, Field } from 'react-native-system-ui'

export default function DatetimePickerPopupDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState(new Date())

  const handleConfirm = (val: Date) => {
    setValue(val)
    setVisible(false)
  }

  return (
    <View style={{ gap: 12 }}>
      <Field
        readOnly
        clickable
        label="选择时间"
        value={value.toLocaleString()}
        placeholder="请选择时间"
        onClick={() => setVisible(true)}
      />
      <DatetimePicker
        popup
        popupVisible={visible}
        onPopupVisibleChange={setVisible}
        type="datetime"
        value={value}
        onChange={setValue}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        showToolbar
      />
    </View>
  )
}
`,S={code:_,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker, Field } from 'react-native-system-ui'

export default function DatetimePickerPopupDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState(new Date())

  const handleConfirm = (val: Date) => {
    setValue(val)
    setVisible(false)
  }

  return (
    <View style={{ gap: 12 }}>
      <Field
        readOnly
        clickable
        label="选择时间"
        value={value.toLocaleString()}
        placeholder="请选择时间"
        onClick={() => setVisible(true)}
      />
      <DatetimePicker
        popup
        popupVisible={visible}
        onPopupVisibleChange={setVisible}
        type="datetime"
        value={value}
        onChange={setValue}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        showToolbar
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker, Field } from 'react-native-system-ui'

export default function DatetimePickerPopupDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState(new Date())

  const handleConfirm = (val: Date) => {
    setValue(val)
    setVisible(false)
  }

  return (
    <View style={{ gap: 12 }}>
      <Field
        readOnly
        clickable
        label="选择时间"
        value={value.toLocaleString()}
        placeholder="请选择时间"
        onClick={() => setVisible(true)}
      />
      <DatetimePicker
        popup
        popupVisible={visible}
        onPopupVisibleChange={setVisible}
        type="datetime"
        value={value}
        onChange={setValue}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        showToolbar
      />
    </View>
  )
}
`}},title:"Popup 组合",identifier:"datetime-picker-popup",lang:"tsx",meta:{title:"Popup 组合"}};function x(){const[t,a]=r.useState(new Date);return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"date",value:t,onChange:a,columnsOrder:["day","month","year"]})})}const A=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerColumnsOrderDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="date"
        value={value}
        onChange={setValue}
        columnsOrder={['day', 'month', 'year']}
      />
    </View>
  )
}
`,B={code:A,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerColumnsOrderDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="date"
        value={value}
        onChange={setValue}
        columnsOrder={['day', 'month', 'year']}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerColumnsOrderDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="date"
        value={value}
        onChange={setValue}
        columnsOrder={['day', 'month', 'year']}
      />
    </View>
  )
}
`}},title:"列顺序 day-month-year",identifier:"datetime-picker-columns-order",lang:"tsx",meta:{title:"列顺序 day-month-year"}};function D(){const[t,a]=r.useState("09:30");return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"time",value:t,onChange:a,filter:(n,i)=>n==="minute"?i.filter(s=>Number(s)%2===0):i})})}const $=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFilterDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        filter={(type, values) =>
          type === 'minute' ? values.filter(v => Number(v) % 2 === 0) : values
        }
      />
    </View>
  )
}
`,L={code:$,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFilterDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        filter={(type, values) =>
          type === 'minute' ? values.filter(v => Number(v) % 2 === 0) : values
        }
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFilterDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        filter={(type, values) =>
          type === 'minute' ? values.filter(v => Number(v) % 2 === 0) : values
        }
      />
    </View>
  )
}
`}},title:"过滤偶数分钟",identifier:"datetime-picker-filter",lang:"tsx",meta:{title:"过滤偶数分钟"}};function y(){const[t,a]=r.useState(new Date);return e.jsx(u,{style:{gap:12},children:e.jsx(c,{type:"datetime",value:t,onChange:a,formatter:(n,i)=>{switch(n){case"year":return`${i}年`;case"month":return`${i}月`;case"day":return`${i}日`;case"hour":return`${i}时`;case"minute":return`${i}分`;default:return i}}})})}const I=`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFormatterDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        formatter={(type, val) => {
          switch (type) {
            case 'year':
              return \`\${val}年\`
            case 'month':
              return \`\${val}月\`
            case 'day':
              return \`\${val}日\`
            case 'hour':
              return \`\${val}时\`
            case 'minute':
              return \`\${val}分\`
            default:
              return val
          }
        }}
      />
    </View>
  )
}
`,H={code:I,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFormatterDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        formatter={(type, val) => {
          switch (type) {
            case 'year':
              return \`\${val}年\`
            case 'month':
              return \`\${val}月\`
            case 'day':
              return \`\${val}日\`
            case 'hour':
              return \`\${val}时\`
            case 'minute':
              return \`\${val}分\`
            default:
              return val
          }
        }}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFormatterDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        formatter={(type, val) => {
          switch (type) {
            case 'year':
              return \`\${val}年\`
            case 'month':
              return \`\${val}月\`
            case 'day':
              return \`\${val}日\`
            case 'hour':
              return \`\${val}时\`
            case 'minute':
              return \`\${val}分\`
            default:
              return val
          }
        }}
      />
    </View>
  )
}
`}},title:"附加单位",identifier:"datetime-picker-formatter",lang:"tsx",meta:{title:"附加单位"}},O=function({previewer:t=()=>null,api:a=()=>null}){const n=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"datetimepicker-时间选择","data-anchor":"datetimepicker-时间选择",children:"DatetimePicker 时间选择"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"支持日期、时间及组合选择，通过列滚轮快速选取具体时间点。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { DatetimePicker } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"日期选择","data-anchor":"日期选择",children:"日期选择"}),e.jsx("div",{children:e.jsx(n,{...j,children:e.jsx(o,{})})}),e.jsx("h3",{id:"日期时间","data-anchor":"日期时间",children:"日期时间"}),e.jsx("div",{children:e.jsx(n,{...F,children:e.jsx(l,{})})}),e.jsx("h3",{id:"时间选择","data-anchor":"时间选择",children:"时间选择"}),e.jsx("div",{children:e.jsx(n,{...C,children:e.jsx(m,{})})}),e.jsx("h3",{id:"年月选择","data-anchor":"年月选择",children:"年月选择"}),e.jsx("div",{children:e.jsx(n,{...g,children:e.jsx(d,{})})}),e.jsx("h3",{id:"月日选择","data-anchor":"月日选择",children:"月日选择"}),e.jsx("div",{children:e.jsx(n,{...M,children:e.jsx(p,{})})}),e.jsx("h3",{id:"年月日小时","data-anchor":"年月日小时",children:"年月日+小时"}),e.jsx("div",{children:e.jsx(n,{...N,children:e.jsx(v,{})})}),e.jsx("h3",{id:"弹层模式","data-anchor":"弹层模式",children:"弹层模式"}),e.jsxs("p",{children:["通过组合 ",e.jsx("code",{children:"Popup"})," 可以实现常见的弹出选择。"]}),e.jsx("div",{children:e.jsx(n,{...S,children:e.jsx(h,{})})}),e.jsx("h3",{id:"自定义列顺序","data-anchor":"自定义列顺序",children:"自定义列顺序"}),e.jsx("div",{children:e.jsx(n,{...B,children:e.jsx(x,{})})}),e.jsx("h3",{id:"选项过滤","data-anchor":"选项过滤",children:"选项过滤"}),e.jsx("div",{children:e.jsx(n,{...L,children:e.jsx(D,{})})}),e.jsx("h3",{id:"选项格式化","data-anchor":"选项格式化",children:"选项格式化"}),e.jsx("div",{children:e.jsx(n,{...H,children:e.jsx(y,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"时间选择类型"}),e.jsx("td",{children:e.jsx("code",{children:"date | time | datetime | datehour | month-day | year-month"})}),e.jsx("td",{children:e.jsx("code",{children:"datetime"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前值"}),e.jsxs("td",{children:[e.jsx("code",{children:"Date"}),"（非 ",e.jsx("code",{children:"time"})," 类型）| ",e.jsx("code",{children:"string"})," (",e.jsx("code",{children:"HH:mm"}),")"]}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认值（非受控）"}),e.jsxs("td",{children:["同 ",e.jsx("code",{children:"value"})]}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"minDate"})}),e.jsx("td",{children:"可选最小日期"}),e.jsx("td",{children:e.jsx("code",{children:"Date"})}),e.jsx("td",{children:"当前日期前 10 年"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxDate"})}),e.jsx("td",{children:"可选最大日期"}),e.jsx("td",{children:e.jsx("code",{children:"Date"})}),e.jsx("td",{children:"当前日期后 10 年"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"minHour"})}),e.jsxs("td",{children:["可选最小小时（",e.jsx("code",{children:'type="time"'}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxHour"})}),e.jsxs("td",{children:["可选最大小时（",e.jsx("code",{children:'type="time"'}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"23"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"minMinute"})}),e.jsxs("td",{children:["可选最小分钟（",e.jsx("code",{children:'type="time"'}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxMinute"})}),e.jsxs("td",{children:["可选最大分钟（",e.jsx("code",{children:'type="time"'}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"59"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columnsOrder"})}),e.jsx("td",{children:"自定义列顺序"}),e.jsx("td",{children:e.jsx("code",{children:"DatetimePickerColumnType[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"filter"})}),e.jsx("td",{children:"选项过滤函数"}),e.jsx("td",{children:e.jsx("code",{children:"(type, values) => values"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"formatter"})}),e.jsx("td",{children:"选项格式化函数"}),e.jsx("td",{children:e.jsx("code",{children:"(type, value) => string"})}),e.jsx("td",{children:e.jsx("code",{children:"value => value"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中项变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onConfirm"})}),e.jsx("td",{children:"点击确认回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消回调（继承自 Picker）"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"popup"})}),e.jsx("td",{children:"是否开启内置弹层模式"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"popupVisible"})," / ",e.jsx("code",{children:"defaultPopupVisible"})]}),e.jsx("td",{children:"弹层显隐（受控 / 非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPopupVisibleChange"})}),e.jsx("td",{children:"弹层显隐变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(visible: boolean) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"popupProps"})}),e.jsx("td",{children:"传递给 Popup 的其他属性"}),e.jsxs("td",{children:[e.jsx("code",{children:"PopupProps"}),"（除 ",e.jsx("code",{children:"visible/children"}),"）"]}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题（继承自 Picker）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"itemHeight"})}),e.jsx("td",{children:"选项高度（继承自 Picker）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"44"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visibleItemCount"})}),e.jsx("td",{children:"同屏可见列数（继承自 Picker）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"6"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeDuration"})}),e.jsx("td",{children:"惯性滚动时长（ms，继承自 Picker）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"1000"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"columnsTop"})," / ",e.jsx("code",{children:"columnsBottom"})]}),e.jsx("td",{children:"自定义列上/下方内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsxs("p",{children:["除上述属性外，其余与 ",e.jsx("code",{children:"Picker"})," 一致，例如 ",e.jsx("code",{children:"title"}),"、",e.jsx("code",{children:"showToolbar"}),"、",e.jsx("code",{children:"itemHeight"})," 等。"]}),e.jsx("h3",{id:"datetimepickercolumntype","data-anchor":"datetimepickercolumntype",children:"DatetimePickerColumnType"}),e.jsx("p",{children:e.jsx("code",{children:"year \\| month \\| day \\| hour \\| minute"})}),e.jsx("h2",{id:"一致性说明","data-anchor":"一致性说明",children:"一致性说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["支持 ",e.jsx("code",{children:"columnsOrder"}),"/",e.jsx("code",{children:"filter"}),"/",e.jsx("code",{children:"formatter"}),"，列类型、顺序遵循文档说明。"]}),e.jsxs("li",{children:[e.jsx("code",{children:"minDate/maxDate"})," 与 ",e.jsx("code",{children:"minHour/maxHour/minMinute/maxMinute"})," 的边界会自动 clamp 当前值，避免越界。"]}),e.jsxs("li",{children:["其余通用属性（如标题、确认/取消按钮文案、选项高度、可见列数）直接透传 ",e.jsx("code",{children:"Picker"}),"。"]}),e.jsxs("li",{children:["内置 ",e.jsx("code",{children:"popup"})," 模式，无需手动包裹 Popup，亦可传递 ",e.jsx("code",{children:"popupProps"})," 定制。"]})]})]})})},T=[{Component:o,key:"datetime-picker-basic",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerBasicDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker type="date" value={value} onChange={setValue} />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerBasicDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker type="date" value={value} onChange={setValue} />
    </View>
  )
}
`}},title:"选择日期",identifier:"datetime-picker-basic",lang:"tsx",meta:{title:"选择日期"}},{Component:l,key:"datetime-picker-datetime",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatetimeDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatetimeDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
      />
    </View>
  )
}
`}},title:"日期时间",identifier:"datetime-picker-datetime",lang:"tsx",meta:{title:"日期时间"}},{Component:m,key:"datetime-picker-time",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerTimeDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        minHour={8}
        maxHour={20}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerTimeDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        minHour={8}
        maxHour={20}
      />
    </View>
  )
}
`}},title:"时间选择",identifier:"datetime-picker-time",lang:"tsx",meta:{title:"时间选择"}},{Component:d,key:"datetime-picker-year-month",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerYearMonthDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="year-month"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 1)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerYearMonthDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="year-month"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 1)}
      />
    </View>
  )
}
`}},title:"选择年月",identifier:"datetime-picker-year-month",lang:"tsx",meta:{title:"选择年月"}},{Component:p,key:"datetime-picker-month-day",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerMonthDayDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="month-day"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerMonthDayDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="month-day"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`}},title:"选择月日",identifier:"datetime-picker-month-day",lang:"tsx",meta:{title:"选择月日"}},{Component:v,key:"datetime-picker-datehour",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatehourDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datehour"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatehourDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datehour"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
`}},title:"年月日+小时",identifier:"datetime-picker-datehour",lang:"tsx",meta:{title:"年月日+小时"}},{Component:h,key:"datetime-picker-popup",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker, Field } from 'react-native-system-ui'

export default function DatetimePickerPopupDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState(new Date())

  const handleConfirm = (val: Date) => {
    setValue(val)
    setVisible(false)
  }

  return (
    <View style={{ gap: 12 }}>
      <Field
        readOnly
        clickable
        label="选择时间"
        value={value.toLocaleString()}
        placeholder="请选择时间"
        onClick={() => setVisible(true)}
      />
      <DatetimePicker
        popup
        popupVisible={visible}
        onPopupVisibleChange={setVisible}
        type="datetime"
        value={value}
        onChange={setValue}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        showToolbar
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker, Field } from 'react-native-system-ui'

export default function DatetimePickerPopupDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState(new Date())

  const handleConfirm = (val: Date) => {
    setValue(val)
    setVisible(false)
  }

  return (
    <View style={{ gap: 12 }}>
      <Field
        readOnly
        clickable
        label="选择时间"
        value={value.toLocaleString()}
        placeholder="请选择时间"
        onClick={() => setVisible(true)}
      />
      <DatetimePicker
        popup
        popupVisible={visible}
        onPopupVisibleChange={setVisible}
        type="datetime"
        value={value}
        onChange={setValue}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        showToolbar
      />
    </View>
  )
}
`}},title:"Popup 组合",identifier:"datetime-picker-popup",lang:"tsx",meta:{title:"Popup 组合"}},{Component:x,key:"datetime-picker-columns-order",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerColumnsOrderDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="date"
        value={value}
        onChange={setValue}
        columnsOrder={['day', 'month', 'year']}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerColumnsOrderDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="date"
        value={value}
        onChange={setValue}
        columnsOrder={['day', 'month', 'year']}
      />
    </View>
  )
}
`}},title:"列顺序 day-month-year",identifier:"datetime-picker-columns-order",lang:"tsx",meta:{title:"列顺序 day-month-year"}},{Component:D,key:"datetime-picker-filter",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFilterDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        filter={(type, values) =>
          type === 'minute' ? values.filter(v => Number(v) % 2 === 0) : values
        }
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFilterDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        filter={(type, values) =>
          type === 'minute' ? values.filter(v => Number(v) % 2 === 0) : values
        }
      />
    </View>
  )
}
`}},title:"过滤偶数分钟",identifier:"datetime-picker-filter",lang:"tsx",meta:{title:"过滤偶数分钟"}},{Component:y,key:"datetime-picker-formatter",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFormatterDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        formatter={(type, val) => {
          switch (type) {
            case 'year':
              return \`\${val}年\`
            case 'month':
              return \`\${val}月\`
            case 'day':
              return \`\${val}日\`
            case 'hour':
              return \`\${val}时\`
            case 'minute':
              return \`\${val}分\`
            default:
              return val
          }
        }}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFormatterDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        formatter={(type, val) => {
          switch (type) {
            case 'year':
              return \`\${val}年\`
            case 'month':
              return \`\${val}月\`
            case 'day':
              return \`\${val}日\`
            case 'hour':
              return \`\${val}时\`
            case 'minute':
              return \`\${val}分\`
            default:
              return val
          }
        }}
      />
    </View>
  )
}
`}},title:"附加单位",identifier:"datetime-picker-formatter",lang:"tsx",meta:{title:"附加单位"}}],Y={simulator:{compact:!0}},q=[{depth:1,text:"DatetimePicker 时间选择",id:"datetimepicker-时间选择"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"日期选择",id:"日期选择"},{depth:3,text:"日期时间",id:"日期时间"},{depth:3,text:"时间选择",id:"时间选择"},{depth:3,text:"年月选择",id:"年月选择"},{depth:3,text:"月日选择",id:"月日选择"},{depth:3,text:"年月日+小时",id:"年月日小时"},{depth:3,text:"弹层模式",id:"弹层模式"},{depth:3,text:"自定义列顺序",id:"自定义列顺序"},{depth:3,text:"选项过滤",id:"选项过滤"},{depth:3,text:"选项格式化",id:"选项格式化"},{depth:2,text:"API",id:"api"},{depth:3,text:"DatetimePickerColumnType",id:"datetimepickercolumntype"},{depth:2,text:"一致性说明",id:"一致性说明"}],z="/docs/components/datetime-picker.md",G="DatetimePicker 时间选择",J="1770276463000",_e=t=>t.children({MdContent:O,demos:T,frontmatter:Y,slugs:q,filePath:z,title:G,updatedTime:J});export{O as MdContent,_e as default,T as demos,z as filePath,Y as frontmatter,q as slugs,G as title,J as updatedTime};
