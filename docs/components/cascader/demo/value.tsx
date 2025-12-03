import React from "react"
import { Cascader, Button, Field, FieldGroup, Space, type CascaderOption } from "react-native-system-ui"

const options: CascaderOption[] = [
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
          { text: "昆山市", value: "kunshan" },
        ],
      },
    ],
  },
]

const formatValue = (rows: CascaderOption[]) => {
  const labels = rows.map(item => item?.text).filter(Boolean)
  return labels.length ? labels.join(" / ") : "请选择所在地区"
}

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <>
      <Cascader poppable options={options} value={value} onChange={setValue} onFinish={setValue}>
        {(_, rows, actions) => (
          <FieldGroup title="受控组件">
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
      <Space style={{ marginTop: 12 }}>
        <Button size="small" type="primary" onPress={() => setValue(["zhejiang", "hangzhou", "xihu"]) }>
          选择杭州
        </Button>
        <Button size="small" onPress={() => setValue([])}>
          清空
        </Button>
      </Space>
    </>
  )
}
