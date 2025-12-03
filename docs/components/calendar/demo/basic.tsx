import React from "react"
import { Cell } from "react-native-system-ui"

import { useCalendarLauncher } from "./useCalendarLauncher"

export default function CalendarBasicDemo() {
  const single = useCalendarLauncher({ key: "basic-single", title: "单个日期", showConfirm: false })
  const multiple = useCalendarLauncher({ key: "basic-multiple", title: "多个日期", type: "multiple" })
  const range = useCalendarLauncher({
    key: "basic-range",
    title: "日期区间",
    type: "range",
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
