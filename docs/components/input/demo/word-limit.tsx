import React from "react"
import { FieldGroup, Input, Toast } from "react-native-system-ui"

export default function InputWordLimitDemo() {
  return (
    <FieldGroup title="字数统计">
      <Input
        placeholder="最多输入10个字符"
        maxLength={10}
        onOverlimit={() => Toast.info("不能超过10个字符哦🍺")}
      />
      <Input.TextArea placeholder="字数统计" maxLength={50} showWordLimit />
      <Input.TextArea
        placeholder="自定义输出"
        showWordLimit={({ currentCount }) => `已经输入${currentCount}个字啦 ✍️`}
      />
    </FieldGroup>
  )
}
