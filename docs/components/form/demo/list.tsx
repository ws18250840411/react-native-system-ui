import React from "react"
import { Button, Cell, Form, Field } from "react-native-system-ui"
import { AddO } from "@react-vant/icons"

export default function FormListDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ users: [{ name: "react-native", age: "1" }] }}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Cell.Group>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, idx) => (
                <Cell.Group key={field.key} inset>
                  <Form.Item name={[field.name, "name"]}>
                    <Field label={`用户${idx + 1} 姓名`} placeholder="请输入姓名" clearable />
                  </Form.Item>
                  <Form.Item name={[field.name, "age"]}>
                    <Field label="年龄" placeholder="请输入年龄" clearable />
                  </Form.Item>
                  <Button size="small" type="danger" text="删除" onPress={() => remove(idx)} />
                </Cell.Group>
              ))}
              <Button
                plain
                block
                icon={<AddO size={16} />}
                text="新增用户"
                onPress={() => add({ name: "", age: "" })}
              />
            </>
          )}
        </Form.List>
      </Cell.Group>
    </Form>
  )
}
