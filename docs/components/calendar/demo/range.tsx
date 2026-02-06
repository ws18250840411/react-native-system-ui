import React from 'react'
import { Cell, Toast } from 'react-native-system-ui'

import { useCalendarLauncher } from './useCalendarLauncher'

export default function CalendarRangeDemo() {
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
    onOverRange: limit => Toast.info(`最多选择${limit}天`),
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
