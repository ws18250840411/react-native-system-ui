import{R as p,j as e}from"./main-BuQiU471.js";import{C as E}from"./Calendar-EpBdKhd6.js";import{C as h}from"./index-CvjfcfGO.js";import{T as A}from"./index-C-QcjePq.js";import"./Popup-Bft8PaUM.js";import"./createPlatformShadow-BbOkyb5V.js";import"./IconBase-CrFgzAiS.js";import"./Portal-Bl5GJ6OP.js";import"./Overlay-BCBJ7Bg0.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./createComponentTokensHook-BZh_OSSd.js";import"./Animated-CaOvDCxr.js";import"./index-CfLKkUWT.js";import"./index-BAZkLH96.js";import"./index-Ct6-Nt5P.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-B_-drOoO.js";import"./useAriaPress-D5uAXibC.js";import"./index-COVjMqe7.js";import"./index-BRfylSA6.js";import"./SafeAreaView-B7j4syYp.js";import"./useSafeAreaPadding-Dnz88xZy.js";import"./useControllableValue-A2U09wcf.js";import"./Arrow-xfLuWLNA.js";import"./hairline-MnVzd1gq.js";import"./Loading-0Dos1lSL.js";import"./index-CA-bMxjH.js";import"./Checked-CNW_UclJ.js";import"./Close-6I0X32OQ.js";const m=n=>n&&(Array.isArray(n)?n.map(l=>new Date(l)):new Date(n)),O=(n,l)=>n?l==="single"?n instanceof Date?n.toLocaleDateString():"请选择日期":l==="multiple"?Array.isArray(n)&&n.length?`共${n.length}个日期`:"请选择日期":Array.isArray(n)&&n.length===2?`${n[0].toLocaleDateString()} ~ ${n[1].toLocaleDateString()}`:"请选择日期":"请选择日期",r=n=>{const{key:l,title:t,type:a="single",showConfirm:i,cellProps:u,initialValue:y,valueFormatter:o,onChange:s,...j}=n,[k,D]=p.useState(!1),[C,V]=p.useState(()=>m(y??null)),[L,f]=p.useState(null),g=i??a!=="single",v=p.useCallback(d=>{f(d?m(C):null),D(d)},[C]),S=p.useCallback(d=>{const c=m(d);f(c),g||(V(c),s?.(c,a))},[g,s,a]),w=p.useCallback(d=>{const c=m(d);V(c),s?.(c,a)},[s,a]),F=o?o(C,a):O(C,a),P=L??C;return{cell:e.jsx(h,{title:t,value:F,isLink:!0,onPress:()=>v(!0),...u},`cell-${l}`),calendar:e.jsx(E,{...j,poppable:!0,type:a,visible:k,value:P??null,showConfirm:g,onVisibleChange:v,onSelect:S,onConfirm:w},`calendar-${l}`)}},x=()=>{const n=r({key:"basic-single",title:"单个日期",showConfirm:!1}),l=r({key:"basic-multiple",title:"多个日期",type:"multiple"}),t=r({key:"basic-range",title:"日期区间",type:"range",cellProps:{titleStyle:{width:96}}}),a=[n,l,t];return e.jsxs(e.Fragment,{children:[e.jsx(h.Group,{title:"基础",card:!0,children:a.map(i=>i.cell)}),a.map(i=>i.calendar)]})},M=`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const single = useCalendarLauncher({ key: 'basic-single', title: '单个日期', showConfirm: false })
  const multiple = useCalendarLauncher({ key: 'basic-multiple', title: '多个日期', type: 'multiple' })
  const range = useCalendarLauncher({
    key: 'basic-range',
    title: '日期区间',
    type: 'range',
    cellProps: { titleStyle: { width: 96 } },
  })

  const entries = [single, multiple, range]

  return (
    <>
      <Cell.Group title="基础" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`,z={code:M,sources:{_:{tsx:`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const single = useCalendarLauncher({ key: 'basic-single', title: '单个日期', showConfirm: false })
  const multiple = useCalendarLauncher({ key: 'basic-multiple', title: '多个日期', type: 'multiple' })
  const range = useCalendarLauncher({
    key: 'basic-range',
    title: '日期区间',
    type: 'range',
    cellProps: { titleStyle: { width: 96 } },
  })

  const entries = [single, multiple, range]

  return (
    <>
      <Cell.Group title="基础" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{import:"./useCalendarLauncher",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/calendar/demo/useCalendarLauncher.tsx",content:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const single = useCalendarLauncher({ key: 'basic-single', title: '单个日期', showConfirm: false })
  const multiple = useCalendarLauncher({ key: 'basic-multiple', title: '多个日期', type: 'multiple' })
  const range = useCalendarLauncher({
    key: 'basic-range',
    title: '日期区间',
    type: 'range',
    cellProps: { titleStyle: { width: 96 } },
  })

  const entries = [single, multiple, range]

  return (
    <>
      <Cell.Group title="基础" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{type:"FILE",value:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},title:"基础用法",identifier:"calendar-basic",lang:"tsx",meta:{title:"基础用法"}},b=()=>{const n=r({key:"range-default",title:"日期区间",type:"range"}),l=r({key:"range-quick",title:"快速选择",type:"range",showConfirm:!1,allowSameDay:!0}),t=r({key:"range-limit",title:"限制 3 天",type:"range",maxRange:3,onOverRange:u=>A.info(`最多选择${u}天`)}),a=r({key:"range-theme",title:"主题颜色",type:"range",color:"#ee0a24"}),i=[n,l,t,a];return e.jsxs(e.Fragment,{children:[e.jsx(h.Group,{title:"范围",card:!0,children:i.map(u=>u.cell)}),i.map(u=>u.calendar)]})},$=`import React from 'react'
import { Cell, Toast } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const defaultRange = useCalendarLauncher({ key: 'range-default', title: '日期区间', type: 'range' })
  const quickRange = useCalendarLauncher({
    key: 'range-quick',
    title: '快速选择',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const limitedRange = useCalendarLauncher({
    key: 'range-limit',
    title: '限制 3 天',
    type: 'range',
    maxRange: 3,
    onOverRange: limit => Toast.info(\`最多选择\${limit}天\`),
  })
  const customRange = useCalendarLauncher({
    key: 'range-theme',
    title: '主题颜色',
    type: 'range',
    color: '#ee0a24',
  })

  const entries = [defaultRange, quickRange, limitedRange, customRange]

  return (
    <>
      <Cell.Group title="范围" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`,q={code:$,sources:{_:{tsx:`import React from 'react'
import { Cell, Toast } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const defaultRange = useCalendarLauncher({ key: 'range-default', title: '日期区间', type: 'range' })
  const quickRange = useCalendarLauncher({
    key: 'range-quick',
    title: '快速选择',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const limitedRange = useCalendarLauncher({
    key: 'range-limit',
    title: '限制 3 天',
    type: 'range',
    maxRange: 3,
    onOverRange: limit => Toast.info(\`最多选择\${limit}天\`),
  })
  const customRange = useCalendarLauncher({
    key: 'range-theme',
    title: '主题颜色',
    type: 'range',
    color: '#ee0a24',
  })

  const entries = [defaultRange, quickRange, limitedRange, customRange]

  return (
    <>
      <Cell.Group title="范围" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{import:"./useCalendarLauncher",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/calendar/demo/useCalendarLauncher.tsx",content:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Toast } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const defaultRange = useCalendarLauncher({ key: 'range-default', title: '日期区间', type: 'range' })
  const quickRange = useCalendarLauncher({
    key: 'range-quick',
    title: '快速选择',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const limitedRange = useCalendarLauncher({
    key: 'range-limit',
    title: '限制 3 天',
    type: 'range',
    maxRange: 3,
    onOverRange: limit => Toast.info(\`最多选择\${limit}天\`),
  })
  const customRange = useCalendarLauncher({
    key: 'range-theme',
    title: '主题颜色',
    type: 'range',
    color: '#ee0a24',
  })

  const entries = [defaultRange, quickRange, limitedRange, customRange]

  return (
    <>
      <Cell.Group title="范围" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{type:"FILE",value:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},title:"范围选择",identifier:"calendar-range",lang:"tsx",meta:{title:"范围选择"}},R=()=>{const n=r({key:"single",title:"单个日期",showConfirm:!1}),l=r({key:"multiple",title:"多个日期",type:"multiple"}),t=r({key:"range",title:"日期区间",type:"range"}),a=r({key:"quick-single",title:"即时选择",showConfirm:!1}),i=r({key:"quick-range",title:"即时区间",type:"range",showConfirm:!1,allowSameDay:!0}),u=r({key:"theme",title:"自定义主题",type:"range",color:"#ee0a24",popupProps:{overlayStyle:{backgroundColor:"rgba(0,0,0,0.4)"},style:{paddingHorizontal:16,paddingTop:24,paddingBottom:32}},weekdays:["🌕","🌖","🌗","🌘","🌑","🌒","🌓"],formatMonthTitle:o=>`${o.getFullYear()} · ${o.getMonth()+1}`,cellProps:{valueStyle:{color:"#ee0a24",fontWeight:"600"}}}),y=[{title:"基础弹层",entries:[n,l,t]},{title:"快捷选择",entries:[a,i]},{title:"自定义样式",entries:[u]}];return e.jsxs(e.Fragment,{children:[y.map(o=>e.jsx(h.Group,{title:o.title,card:!0,children:o.entries.map(s=>s.cell)},o.title)),[n,l,t,a,i,u].map(o=>o.calendar)]})},B=`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const basicSingle = useCalendarLauncher({ key: 'single', title: '单个日期', showConfirm: false })
  const basicMultiple = useCalendarLauncher({ key: 'multiple', title: '多个日期', type: 'multiple' })
  const basicRange = useCalendarLauncher({ key: 'range', title: '日期区间', type: 'range' })
  const quickSingle = useCalendarLauncher({ key: 'quick-single', title: '即时选择', showConfirm: false })
  const quickRange = useCalendarLauncher({
    key: 'quick-range',
    title: '即时区间',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const themedRange = useCalendarLauncher({
    key: 'theme',
    title: '自定义主题',
    type: 'range',
    color: '#ee0a24',
    popupProps: {
      overlayStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
      style: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 },
    },
    weekdays: ['🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓'],
    formatMonthTitle: date => \`\${date.getFullYear()} · \${date.getMonth() + 1}\`,
    cellProps: {
      valueStyle: { color: '#ee0a24', fontWeight: '600' },
    },
  })

  const groups = [
    { title: '基础弹层', entries: [basicSingle, basicMultiple, basicRange] },
    { title: '快捷选择', entries: [quickSingle, quickRange] },
    { title: '自定义样式', entries: [themedRange] },
  ]

  return (
    <>
      {groups.map(group => (
        <Cell.Group key={group.title} title={group.title} card>
          {group.entries.map(entry => entry.cell)}
        </Cell.Group>
      ))}
      {[basicSingle, basicMultiple, basicRange, quickSingle, quickRange, themedRange].map(entry => entry.calendar)}
    </>
  )
}
`,N={code:B,sources:{_:{tsx:`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const basicSingle = useCalendarLauncher({ key: 'single', title: '单个日期', showConfirm: false })
  const basicMultiple = useCalendarLauncher({ key: 'multiple', title: '多个日期', type: 'multiple' })
  const basicRange = useCalendarLauncher({ key: 'range', title: '日期区间', type: 'range' })
  const quickSingle = useCalendarLauncher({ key: 'quick-single', title: '即时选择', showConfirm: false })
  const quickRange = useCalendarLauncher({
    key: 'quick-range',
    title: '即时区间',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const themedRange = useCalendarLauncher({
    key: 'theme',
    title: '自定义主题',
    type: 'range',
    color: '#ee0a24',
    popupProps: {
      overlayStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
      style: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 },
    },
    weekdays: ['🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓'],
    formatMonthTitle: date => \`\${date.getFullYear()} · \${date.getMonth() + 1}\`,
    cellProps: {
      valueStyle: { color: '#ee0a24', fontWeight: '600' },
    },
  })

  const groups = [
    { title: '基础弹层', entries: [basicSingle, basicMultiple, basicRange] },
    { title: '快捷选择', entries: [quickSingle, quickRange] },
    { title: '自定义样式', entries: [themedRange] },
  ]

  return (
    <>
      {groups.map(group => (
        <Cell.Group key={group.title} title={group.title} card>
          {group.entries.map(entry => entry.cell)}
        </Cell.Group>
      ))}
      {[basicSingle, basicMultiple, basicRange, quickSingle, quickRange, themedRange].map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{import:"./useCalendarLauncher",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/calendar/demo/useCalendarLauncher.tsx",content:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const basicSingle = useCalendarLauncher({ key: 'single', title: '单个日期', showConfirm: false })
  const basicMultiple = useCalendarLauncher({ key: 'multiple', title: '多个日期', type: 'multiple' })
  const basicRange = useCalendarLauncher({ key: 'range', title: '日期区间', type: 'range' })
  const quickSingle = useCalendarLauncher({ key: 'quick-single', title: '即时选择', showConfirm: false })
  const quickRange = useCalendarLauncher({
    key: 'quick-range',
    title: '即时区间',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const themedRange = useCalendarLauncher({
    key: 'theme',
    title: '自定义主题',
    type: 'range',
    color: '#ee0a24',
    popupProps: {
      overlayStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
      style: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 },
    },
    weekdays: ['🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓'],
    formatMonthTitle: date => \`\${date.getFullYear()} · \${date.getMonth() + 1}\`,
    cellProps: {
      valueStyle: { color: '#ee0a24', fontWeight: '600' },
    },
  })

  const groups = [
    { title: '基础弹层', entries: [basicSingle, basicMultiple, basicRange] },
    { title: '快捷选择', entries: [quickSingle, quickRange] },
    { title: '自定义样式', entries: [themedRange] },
  ]

  return (
    <>
      {groups.map(group => (
        <Cell.Group key={group.title} title={group.title} card>
          {group.entries.map(entry => entry.cell)}
        </Cell.Group>
      ))}
      {[basicSingle, basicMultiple, basicRange, quickSingle, quickRange, themedRange].map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{type:"FILE",value:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},title:"弹层模式",identifier:"calendar-popup",lang:"tsx",meta:{title:"弹层模式"}},G=function({previewer:n=()=>null,api:l=()=>null}){const t=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"calendar-日历","data-anchor":"calendar-日历",children:"Calendar 日历"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"选择单日、范围或多选日期。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(t,{code:"import { Calendar } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(t,{...z,children:e.jsx(x,{})})}),e.jsx("h3",{id:"范围选择","data-anchor":"范围选择",children:"范围选择"}),e.jsx("div",{children:e.jsx(t,{...q,children:e.jsx(b,{})})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["默认情况下起止日期需要至少跨一天，可通过 ",e.jsx("code",{children:"allowSameDay"})," 允许同日；若需要限制选择天数，可结合 ",e.jsx("code",{children:"maxRange"})," 与 ",e.jsx("code",{children:"onOverRange"})," 进行提示。"]})}),e.jsx("h3",{id:"弹层模式","data-anchor":"弹层模式",children:"弹层模式"}),e.jsx("div",{children:e.jsx(t,{...N,children:e.jsx(R,{})})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["常见信息录入可通过 Cell 触发弹层。",e.jsx("code",{children:"poppable"})," 用于切换 Popup 承载，配合 ",e.jsx("code",{children:"visible/defaultVisible/onVisibleChange"})," 控制展示节奏，可通过 ",e.jsx("code",{children:"closeOnClickOverlay"}),"、",e.jsx("code",{children:"closeOnConfirm"})," 管理遮罩或确认后的关闭时机。"]})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsxs("td",{children:["当前值（传 ",e.jsx("code",{children:"null"})," 表示默认不选中）"]}),e.jsx("td",{children:e.jsx("code",{children:"Date | Date[] | null"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsxs("td",{children:["非受控默认值（可传 ",e.jsx("code",{children:"null"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"Date | Date[] | null"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"选择类型"}),e.jsx("td",{children:e.jsx("code",{children:"single | range | multiple"})}),e.jsx("td",{children:e.jsx("code",{children:"single"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"minDate"})}),e.jsx("td",{children:"最小可选日期"}),e.jsx("td",{children:e.jsx("code",{children:"Date"})}),e.jsx("td",{children:"当前日期 -10 年"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxDate"})}),e.jsx("td",{children:"最大可选日期"}),e.jsx("td",{children:e.jsx("code",{children:"Date"})}),e.jsx("td",{children:"当前日期 +10 年"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"选择日期"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showSubtitle"})}),e.jsx("td",{children:"是否展示月份副标题"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showHeader"})}),e.jsx("td",{children:"是否展示顶部月份切换"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showConfirm"})}),e.jsx("td",{children:"是否展示底部确认按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"type !== single"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmText"})}),e.jsx("td",{children:"确认按钮文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"确定"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"weekStartsOn"})}),e.jsxs("td",{children:["星期起始日，支持 ",e.jsx("code",{children:"0-6"})]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"weekdays"})}),e.jsx("td",{children:"自定义周标题文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode[]"})}),e.jsx("td",{children:e.jsx("code",{children:"['日','一','二','三','四','五','六']"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"formatMonthTitle"})}),e.jsx("td",{children:"自定义月份标题"}),e.jsx("td",{children:e.jsx("code",{children:"(date: Date) => ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"选中颜色覆盖"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"allowSameDay"})}),e.jsxs("td",{children:[e.jsx("code",{children:"range"})," 类型下是否允许选中同一天作为起止"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxRange"})}),e.jsxs("td",{children:[e.jsx("code",{children:"range"})," 模式的最大跨度或 ",e.jsx("code",{children:"multiple"})," 模式的最多天数"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"undefined"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOverRange"})}),e.jsxs("td",{children:["超过 ",e.jsx("code",{children:"maxRange"})," 限制时回调"]}),e.jsx("td",{children:e.jsx("code",{children:"(limit: number) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"poppable"})}),e.jsx("td",{children:"是否以内置 Popup 方式展示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsxs("td",{children:[e.jsx("code",{children:"poppable"})," 模式下的受控可见性"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultVisible"})}),e.jsxs("td",{children:[e.jsx("code",{children:"poppable"})," 模式下的默认可见性"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onVisibleChange"})}),e.jsxs("td",{children:[e.jsx("code",{children:"poppable"})," 模式的可见性变化回调"]}),e.jsx("td",{children:e.jsx("code",{children:"(visible: boolean) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClickOverlay"})}),e.jsxs("td",{children:[e.jsx("code",{children:"poppable"})," 模式下点击遮罩是否关闭"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnConfirm"})}),e.jsx("td",{children:"点击确认后是否自动关闭弹层"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"popupPlacement"})}),e.jsxs("td",{children:["弹层位置，同 Popup ",e.jsx("code",{children:"placement"})]}),e.jsx("td",{children:e.jsx("code",{children:"'top' | 'bottom' | 'left' | 'right' | 'center'"})}),e.jsx("td",{children:e.jsx("code",{children:"'bottom'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"popupRound"})}),e.jsx("td",{children:"是否启用弹层圆角"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"popupProps"})}),e.jsx("td",{children:"透传额外 Popup 参数"}),e.jsx("td",{children:e.jsx("code",{children:"Partial<PopupProps>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOpen"})}),e.jsx("td",{children:"弹层开始打开回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOpened"})}),e.jsx("td",{children:"弹层完全打开回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"弹层开始关闭回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClosed"})}),e.jsx("td",{children:"弹层完全关闭回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSelect"})}),e.jsx("td",{children:"日期变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: Date | Date[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onConfirm"})}),e.jsx("td",{children:"点击确认回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: Date | Date[]) => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsxs("p",{children:["其余属性同 ",e.jsx("code",{children:"View"}),"，支持传入 ",e.jsx("code",{children:"style"})," 控制整体外观。"]})]})})},T=[{Component:x,key:"calendar-basic",sources:{_:{tsx:`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const single = useCalendarLauncher({ key: 'basic-single', title: '单个日期', showConfirm: false })
  const multiple = useCalendarLauncher({ key: 'basic-multiple', title: '多个日期', type: 'multiple' })
  const range = useCalendarLauncher({
    key: 'basic-range',
    title: '日期区间',
    type: 'range',
    cellProps: { titleStyle: { width: 96 } },
  })

  const entries = [single, multiple, range]

  return (
    <>
      <Cell.Group title="基础" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{import:"./useCalendarLauncher",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/calendar/demo/useCalendarLauncher.tsx",content:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const single = useCalendarLauncher({ key: 'basic-single', title: '单个日期', showConfirm: false })
  const multiple = useCalendarLauncher({ key: 'basic-multiple', title: '多个日期', type: 'multiple' })
  const range = useCalendarLauncher({
    key: 'basic-range',
    title: '日期区间',
    type: 'range',
    cellProps: { titleStyle: { width: 96 } },
  })

  const entries = [single, multiple, range]

  return (
    <>
      <Cell.Group title="基础" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{type:"FILE",value:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},title:"基础用法",identifier:"calendar-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:b,key:"calendar-range",sources:{_:{tsx:`import React from 'react'
import { Cell, Toast } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const defaultRange = useCalendarLauncher({ key: 'range-default', title: '日期区间', type: 'range' })
  const quickRange = useCalendarLauncher({
    key: 'range-quick',
    title: '快速选择',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const limitedRange = useCalendarLauncher({
    key: 'range-limit',
    title: '限制 3 天',
    type: 'range',
    maxRange: 3,
    onOverRange: limit => Toast.info(\`最多选择\${limit}天\`),
  })
  const customRange = useCalendarLauncher({
    key: 'range-theme',
    title: '主题颜色',
    type: 'range',
    color: '#ee0a24',
  })

  const entries = [defaultRange, quickRange, limitedRange, customRange]

  return (
    <>
      <Cell.Group title="范围" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{import:"./useCalendarLauncher",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/calendar/demo/useCalendarLauncher.tsx",content:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Toast } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const defaultRange = useCalendarLauncher({ key: 'range-default', title: '日期区间', type: 'range' })
  const quickRange = useCalendarLauncher({
    key: 'range-quick',
    title: '快速选择',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const limitedRange = useCalendarLauncher({
    key: 'range-limit',
    title: '限制 3 天',
    type: 'range',
    maxRange: 3,
    onOverRange: limit => Toast.info(\`最多选择\${limit}天\`),
  })
  const customRange = useCalendarLauncher({
    key: 'range-theme',
    title: '主题颜色',
    type: 'range',
    color: '#ee0a24',
  })

  const entries = [defaultRange, quickRange, limitedRange, customRange]

  return (
    <>
      <Cell.Group title="范围" card>
        {entries.map(entry => entry.cell)}
      </Cell.Group>
      {entries.map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{type:"FILE",value:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},title:"范围选择",identifier:"calendar-range",lang:"tsx",meta:{title:"范围选择"}},{Component:R,key:"calendar-popup",sources:{_:{tsx:`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const basicSingle = useCalendarLauncher({ key: 'single', title: '单个日期', showConfirm: false })
  const basicMultiple = useCalendarLauncher({ key: 'multiple', title: '多个日期', type: 'multiple' })
  const basicRange = useCalendarLauncher({ key: 'range', title: '日期区间', type: 'range' })
  const quickSingle = useCalendarLauncher({ key: 'quick-single', title: '即时选择', showConfirm: false })
  const quickRange = useCalendarLauncher({
    key: 'quick-range',
    title: '即时区间',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const themedRange = useCalendarLauncher({
    key: 'theme',
    title: '自定义主题',
    type: 'range',
    color: '#ee0a24',
    popupProps: {
      overlayStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
      style: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 },
    },
    weekdays: ['🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓'],
    formatMonthTitle: date => \`\${date.getFullYear()} · \${date.getMonth() + 1}\`,
    cellProps: {
      valueStyle: { color: '#ee0a24', fontWeight: '600' },
    },
  })

  const groups = [
    { title: '基础弹层', entries: [basicSingle, basicMultiple, basicRange] },
    { title: '快捷选择', entries: [quickSingle, quickRange] },
    { title: '自定义样式', entries: [themedRange] },
  ]

  return (
    <>
      {groups.map(group => (
        <Cell.Group key={group.title} title={group.title} card>
          {group.entries.map(entry => entry.cell)}
        </Cell.Group>
      ))}
      {[basicSingle, basicMultiple, basicRange, quickSingle, quickRange, themedRange].map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{import:"./useCalendarLauncher",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/calendar/demo/useCalendarLauncher.tsx",content:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default () => {
  const basicSingle = useCalendarLauncher({ key: 'single', title: '单个日期', showConfirm: false })
  const basicMultiple = useCalendarLauncher({ key: 'multiple', title: '多个日期', type: 'multiple' })
  const basicRange = useCalendarLauncher({ key: 'range', title: '日期区间', type: 'range' })
  const quickSingle = useCalendarLauncher({ key: 'quick-single', title: '即时选择', showConfirm: false })
  const quickRange = useCalendarLauncher({
    key: 'quick-range',
    title: '即时区间',
    type: 'range',
    showConfirm: false,
    allowSameDay: true,
  })
  const themedRange = useCalendarLauncher({
    key: 'theme',
    title: '自定义主题',
    type: 'range',
    color: '#ee0a24',
    popupProps: {
      overlayStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
      style: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 },
    },
    weekdays: ['🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓'],
    formatMonthTitle: date => \`\${date.getFullYear()} · \${date.getMonth() + 1}\`,
    cellProps: {
      valueStyle: { color: '#ee0a24', fontWeight: '600' },
    },
  })

  const groups = [
    { title: '基础弹层', entries: [basicSingle, basicMultiple, basicRange] },
    { title: '快捷选择', entries: [quickSingle, quickRange] },
    { title: '自定义样式', entries: [themedRange] },
  ]

  return (
    <>
      {groups.map(group => (
        <Cell.Group key={group.title} title={group.title} card>
          {group.entries.map(entry => entry.cell)}
        </Cell.Group>
      ))}
      {[basicSingle, basicMultiple, basicRange, quickSingle, quickRange, themedRange].map(entry => entry.calendar)}
    </>
  )
}
`},"useCalendarLauncher.tsx":{type:"FILE",value:`import React from 'react'
import { Calendar, Cell } from 'react-native-system-ui'
import type { CalendarProps } from 'react-native-system-ui'

type CalendarMode = NonNullable<CalendarProps['type']>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, 'title' | 'value' | 'onPress'>

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return '请选择日期'
  }
  if (type === 'single') {
    return value instanceof Date ? value.toLocaleDateString() : '请选择日期'
  }
  if (type === 'multiple') {
    return Array.isArray(value) && value.length ? \`共\${value.length}个日期\` : '请选择日期'
  }
  if (Array.isArray(value) && value.length === 2) {
    return \`\${value[0].toLocaleDateString()} ~ \${value[1].toLocaleDateString()}\`
  }
  return '请选择日期'
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = 'single',
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== 'single')

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={\`cell-\${key}\`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={\`calendar-\${key}\`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
`}},title:"弹层模式",identifier:"calendar-popup",lang:"tsx",meta:{title:"弹层模式"}}],_={simulator:{compact:!0}},I=[{depth:1,text:"Calendar 日历",id:"calendar-日历"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"范围选择",id:"范围选择"},{depth:3,text:"弹层模式",id:"弹层模式"},{depth:2,text:"API",id:"api"}],H="/docs/components/calendar.md",U="Calendar 日历",W="1766244172000",je=n=>n.children({MdContent:G,demos:T,frontmatter:_,slugs:I,filePath:H,title:U,updatedTime:W});export{G as MdContent,je as default,T as demos,H as filePath,_ as frontmatter,I as slugs,U as title,W as updatedTime};
