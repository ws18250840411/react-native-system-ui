import React from "react"
import { Cascader, Field, FieldGroup, type CascaderOption } from "react-native-system-ui"

const options = [
  {
    text: "浙江省",
    value: "zhejiang",
    children: [
      {
        text: "杭州市",
        value: "hangzhou",
        children: [
          { text: "西湖区", value: "xihu" },
          { text: "余杭区", value: "yuhang" },
        ],
      },
      {
        text: "宁波市",
        value: "ningbo",
        children: [
          { text: "海曙区", value: "haishu" },
          { text: "鄞州区", value: "yinzhou" },
        ],
      },
    ],
  },
  {
    text: "江苏省",
    value: "jiangsu",
    children: [
      {
        text: "苏州市",
        value: "suzhou",
        children: [
          { text: "园区", value: "yuanqu" },
          { text: "吴江区", value: "wujiang" },
        ],
      },
    ],
  },
]

const formatValue = (rows: CascaderOption[]) => {
  const labels = rows.map(row => row?.text).filter(Boolean)
  return labels.length ? labels.join(" / ") : "请选择所在地区"
}

export default function CascaderBasicDemo() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Cascader
      options={options}
      value={value}
      poppable
      title="请选择所在地区"
      onChange={setValue}
      onFinish={setValue}
    >
      {(_, rows, actions) => (
        <FieldGroup title="基础用法">
          <Field
            label="地区"
            value={formatValue(rows)}
            placeholder="请选择所在地区"
            readOnly
            isLink
            onPress={actions.open}
          />
        </FieldGroup>
      )}
    </Cascader>
  )
}
