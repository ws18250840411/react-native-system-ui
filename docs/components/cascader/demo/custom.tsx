import React from "react"
import { Text } from "react-native"
import { Cascader, Field, FieldGroup, Space, Tag, type CascaderOption } from "react-native-system-ui"

const shopOptions: CascaderOption[] = [
  {
    text: "饮品",
    value: "drink",
    children: [
      { text: "鲜榨果汁", value: "juice" },
      { text: "气泡水", value: "soda", disabled: true },
    ],
  },
  {
    text: "主食",
    value: "food",
    children: [
      { text: "三明治", value: "sandwich" },
      { text: "披萨", value: "pizza", loading: true },
    ],
  },
]

const formatValue = (rows: CascaderOption[]) => {
  const labels = rows.map(row => row?.text).filter(Boolean)
  return labels.length ? labels.join(" · ") : "请选择商品分类"
}

export default function CascaderCustomDemo() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Cascader
      poppable
      options={shopOptions}
      value={value}
      onChange={setValue}
      onFinish={setValue}
      optionRender={({ option, selected }) => (
        <Space align="center" style={{ width: "100%", justifyContent: "space-between" }}>
          <Space align="center">
            <Tag plain type={selected ? "primary" : "default"}>
              {selected ? "当前" : "待选"}
            </Tag>
            <TextFallback text={option.text} />
          </Space>
          {selected ? <Tag type="primary">已选</Tag> : null}
        </Space>
      )}
    >
      {(_, rows, actions) => (
        <FieldGroup title="自定义渲染">
          <Field
            label="分类"
            value={formatValue(rows)}
            placeholder="请选择商品分类"
            readOnly
            isLink
            onPress={actions.open}
          />
        </FieldGroup>
      )}
    </Cascader>
  )
}

const TextFallback = ({ text }: { text?: React.ReactNode }) => {
  if (typeof text === "string" || typeof text === "number") {
    return <Text>{text}</Text>
  }
  if (React.isValidElement(text)) {
    return text
  }
  return <Text>{text ?? "未命名"}</Text>
}
