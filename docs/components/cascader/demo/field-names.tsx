import React from "react"
import { Cascader, Field, FieldGroup, type CascaderOption } from "react-native-system-ui"

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: "A 省",
    code: "a",
    items: [
      {
        label: "A-1 市",
        code: "a1",
        items: [
          { label: "A-1-1 区", code: "a11" },
          { label: "A-1-2 区", code: "a12", disabled: true },
        ],
      },
    ],
  },
  {
    label: "B 省",
    code: "b",
    items: [
      {
        label: "B-1 市",
        code: "b1",
        items: [
          { label: "B-1-1 区", code: "b11" },
        ],
      },
    ],
  },
]

const formatValue = (rows: CascaderOption[]) => {
  const labels = rows.map(row => row?.text).filter(Boolean)
  return labels.length ? labels.join(" / ") : "支持自定义字段"
}

export default function CascaderFieldNamesDemo() {
  const [value, setValue] = React.useState<string[]>(["a"])

  return (
    <Cascader
      poppable
      options={regions as unknown as CascaderOption[]}
      value={value}
      fieldNames={{ text: "label", value: "code", children: "items" }}
      onChange={setValue}
      onFinish={setValue}
    >
      {(_, rows, actions) => (
        <FieldGroup title="字段映射">
          <Field
            label="自定义字段"
            value={formatValue(rows)}
            placeholder="支持自定义字段"
            readOnly
            isLink
            onPress={actions.open}
          />
        </FieldGroup>
      )}
    </Cascader>
  )
}
