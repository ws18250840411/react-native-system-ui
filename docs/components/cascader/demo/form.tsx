import React from "react"
import { View } from "react-native"

import {
  Button,
  Cascader,
  Field,
  FieldGroup,
  Form,
  Space,
  type CascaderOption,
} from "react-native-system-ui"

const options: CascaderOption[] = [
  {
    text: "江苏省",
    value: "jiangsu",
    children: [
      {
        text: "无锡市",
        value: "wuxi",
        children: [
          { text: "梁溪区", value: "liangxi" },
          { text: "锡山区", value: "xishan" },
        ],
      },
      {
        text: "常州市",
        value: "changzhou",
        children: [
          { text: "钟楼区", value: "zhonglou" },
        ],
      },
    ],
  },
  {
    text: "浙江省",
    value: "zhejiang",
    children: [
      {
        text: "宁波市",
        value: "ningbo",
        children: [
          { text: "江北区", value: "jiangbei" },
          { text: "海曙区", value: "haishu" },
        ],
      },
    ],
  },
]

const formatValue = (rows: CascaderOption[]) => {
  const labels = rows.map(item => item?.text).filter(Boolean)
  return labels.length ? labels.join(" / ") : "请选择所在地区"
}

export default function CascaderFormDemo() {
  const formRef = Form.useForm()
  const [result, setResult] = React.useState<string>()

  const handleSubmit = () => {
    formRef.current?.submit()
  }

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ["zhejiang", "ningbo", "jiangbei"] })
  }

  return (
    <View style={{ gap: 12 }}>
      <Form
        ref={formRef}
        colon
        initialValues={{ area: ["jiangsu", "wuxi", "liangxi"] }}
        onFinish={values => {
          const area = values.area as (string | number)[] | undefined
          if (Array.isArray(area) && area.length) {
            setResult(area.map(item => String(item)).join(" / "))
          } else {
            setResult("未选择")
          }
        }}
      >
        <FieldGroup title="Form 中使用">
          <Form.Item name="area" trigger="onChange">
            <Cascader poppable options={options} closeOnFinish>
              {(_, rows, actions) => (
                <Field
                  label="地区"
                  value={formatValue(rows)}
                  placeholder="请选择所在地区"
                  readOnly
                  isLink
                  onPress={actions.open}
                />
              )}
            </Cascader>
          </Form.Item>
        </FieldGroup>
      </Form>
      <Space>
        <Button type="primary" size="small" onPress={handleSubmit}>
          提交
        </Button>
        <Button size="small" onPress={handleSetDefault}>
          设置默认值
        </Button>
      </Space>
      {result ? <Field label="当前选择" intro={result} editable={false} /> : null}
    </View>
  )
}
