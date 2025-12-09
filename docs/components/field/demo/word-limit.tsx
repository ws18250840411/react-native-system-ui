import React from "react"
import { Text } from "react-native"
import { Field, FieldGroup } from "react-native-system-ui"

export default function FieldWordLimitDemo() {
  const [content, setContent] = React.useState("")

  return (
    <FieldGroup>
      <Field
        label="留言"
        type="textarea"
        rows={2}
        autoSize
        maxLength={50}
        placeholder="请输入留言"
        value={content}
        onChangeText={setContent}
        showWordLimit={({ currentCount, maxLength }) => (
          <Text style={{ alignSelf: "flex-end", textAlign: "right", color: "#969799", fontSize: 14 }}>
            {currentCount}/{maxLength}
          </Text>
        )}
      />
    </FieldGroup>
  )
}
