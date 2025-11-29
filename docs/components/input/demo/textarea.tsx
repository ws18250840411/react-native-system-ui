import React from react
import { Text } from react-native
import { Cell, Input } from react-native-system-ui

const TextAreaDemo = () => {
  const [value, setValue] = React.useState()

  return (
    <Cell>
      <Input.TextArea
        value={value}
        onChange={setValue}
        placeholder=请输入留言
        autoSize={{ minRows: 2, maxRows: 4 }}
        maxLength={80}
        showWordLimit={({ currentCount, maxLength }) => (
          <Text style={{ color: #888 }}>{`已输入 ${currentCount}${maxLength ? `/${maxLength}` : }`}</Text>
        )}
      />
    </Cell>
  )
}

export default TextAreaDemo
