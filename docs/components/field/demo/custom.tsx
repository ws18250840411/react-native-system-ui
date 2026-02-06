import React from 'react'
import { Text, Pressable } from 'react-native'
import { ArrowDown } from 'react-native-system-icon'
import { Button, Field, Popup, Picker } from 'react-native-system-ui'

export default function FieldButtonDemo() {
  const [code, setCode] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [area, setArea] = React.useState(['86'])
  const [tempArea, setTempArea] = React.useState(['86'])
  const columns = [
    [
      { label: '86 🇨🇳', value: '86' },
      { label: '87 🇺🇸', value: '87' },
      { label: '88 🏳️‍🌈', value: '88' },
      { label: '89 🏳️‍⚧️', value: '89' },
      { label: '90 🇵🇪', value: '90' },
      { label: '91 🇩🇪', value: '91' },
      { label: '92 🇯🇵', value: '92' },
    ],
  ]

  return (
    <>
      <Field
        center
        controlAlign="center"
        label="短信验证码"
        prefix={
          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              setTempArea(area)
              setVisible(true)
            }}
          >
            <Text>+{area[0]}</Text>
            <ArrowDown size={16} fill="#969799" color="#969799" style={{ marginLeft: 8 }} />
          </Pressable>
        }
        suffix={
          <Button size="small" type="primary">
            发送
          </Button>
        }
        placeholder="手机号"
        value={code}
        onChangeText={setCode}
        onClickInput={() => {
          setTempArea(area)
          setVisible(true)
        }}
      />

      <Popup visible={visible} round position="bottom" onClose={() => setVisible(false)}>
        <Picker
          title="选择区号"
          columns={columns}
          value={tempArea}
          onChange={val => setTempArea(val as string[])}
          onConfirm={() => {
            setArea(tempArea)
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}
