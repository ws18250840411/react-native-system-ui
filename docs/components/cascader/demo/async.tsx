import React from "react"
import { Cascader, Field, type CascaderOption } from "react-native-system-ui"

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) => rows.map(item => item?.text).filter(Boolean).join(",")

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: "浙江省", value: "330000", children: [] },
  ])
  const [value, setValue] = React.useState<string[]>([])

  const handleChange = (val: string[]) => {
    const last = val[val.length - 1]
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === dynamicOpts[0].value && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: "杭州市", value: "330100" },
              { text: "宁波市", value: "330200" },
            ],
          }
          return next
        })
      }, 2000)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择所在地区"
      options={dynamicOpts}
      closeOnFinish={false}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
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
