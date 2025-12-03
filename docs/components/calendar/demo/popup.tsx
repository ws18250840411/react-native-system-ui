import React from "react"
import { Cell } from "react-native-system-ui"

import { useCalendarLauncher } from "./useCalendarLauncher"

export default function CalendarPopupDemo() {
  const basicSingle = useCalendarLauncher({ key: "single", title: "单个日期", showConfirm: false })
  const basicMultiple = useCalendarLauncher({ key: "multiple", title: "多个日期", type: "multiple" })
  const basicRange = useCalendarLauncher({ key: "range", title: "日期区间", type: "range" })
  const quickSingle = useCalendarLauncher({ key: "quick-single", title: "即时选择", showConfirm: false })
  const quickRange = useCalendarLauncher({
    key: "quick-range",
    title: "即时区间",
    type: "range",
    showConfirm: false,
    allowSameDay: true,
  })
  const themedRange = useCalendarLauncher({
    key: "theme",
    title: "自定义主题",
    type: "range",
    color: "#ee0a24",
    popupProps: {
      overlayStyle: { backgroundColor: "rgba(0,0,0,0.4)" },
      style: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 },
    },
    weekdays: ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓"],
    formatMonthTitle: date => `${date.getFullYear()} · ${date.getMonth() + 1}`,
    cellProps: {
      valueStyle: { color: "#ee0a24", fontWeight: "600" },
    },
  })

  const groups = [
    { title: "基础弹层", entries: [basicSingle, basicMultiple, basicRange] },
    { title: "快捷选择", entries: [quickSingle, quickRange] },
    { title: "自定义样式", entries: [themedRange] },
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
