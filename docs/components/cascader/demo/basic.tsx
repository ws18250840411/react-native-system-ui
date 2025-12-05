import React from "react"
import { Cascader, Field, type CascaderOption } from "react-native-system-ui"

import options from "./options"

const formatValue = (rows: CascaderOption[]) => {
  const labels = rows.map(row => row?.text).filter(Boolean)
  return labels.length ? labels.join(" / ") : "请选择所在地区"
}

export default function CascaderBasicDemo() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Cascader poppable popupRound title="请选择所在地区" options={options} value={value} onChange={setValue} onFinish={setValue}>
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择所在地区"
          onPress={actions.open}
        />
      )}
    </Cascader>
  )
}
