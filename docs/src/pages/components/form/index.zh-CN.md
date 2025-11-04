# Form 表单

> 基于 `rc-field-form` 的轻量表单容器，默认注入 Toast 错误提示，API 与 Ant Design Form 基本一致。

## 何时使用

- 需要自动管理字段值、校验、联动的复杂表单。
- 需要配合 `Form.Item`、`Form.List`、`Form.Provider` 等高阶能力。
- 希望在 React Native 中复用 Web 端熟悉的 `rc-field-form` 写法。

## 引入

```tsx
import { Form } from 'react-native-system-ui';
```

## 代码演示

### 基础验证

```tsx
import React from 'react';
import { Button, Field, Form } from 'react-native-system-ui';

function Example() {
  const [form] = Form.useForm();

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => console.log(values))
      .catch(() => {});
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Field.TextInput title="用户名" placeholder="请输入" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Field.PasswordInput title="密码" placeholder="不少于 6 位" />
      </Form.Item>

      <Button title="提交" onPress={onSubmit} />
    </Form>
  );
}

export default Example;
```

### useWatch & Form.List

```tsx
import React from 'react';
import { Button, Field, Form, Space } from 'react-native-system-ui';

function Example() {
  const [form] = Form.useForm();
  const phones = Form.useWatch('phones', form);

  return (
    <Form form={form} initialValues={{ phones: [''] }}>
      <Form.List name="phones">
        {(fields, { add, remove }) => (
          <Space>
            {fields.map(field => (
              <Form.Item key={field.key} {...field} rules={[{ required: true }]}>
                <Field.TextInput title="手机号" placeholder="请输入" />
              </Form.Item>
            ))}
            <Button title="新增" onPress={() => add()} />
            <Button title="删除" onPress={() => remove(fields.length - 1)} />
          </Space>
        )}
      </Form.List>

      <Button title="提交" onPress={() => console.log(phones)} />
    </Form>
  );
}

export default Example;
```

## API

### Form

Form 组件本身完全继承 `rc-field-form` 的属性，仅屏蔽 `component`、`from`。常用属性：

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| form | 通过 `Form.useForm` 创建的实例 | `FormInstance` |
| initialValues | 初始表单值 | `Record<string, any>` |
| onFinish | 提交回调，已自动注入 `getFieldsValue(true)` 结果 | `(values) => void` |
| onFinishFailed | 校验失败回调，默认 Toast 第一条错误 | `(errorInfo) => void` |
| layout | 布局，同 rc-field-form | `'horizontal' \| 'vertical'` |
| requiredMark | 是否展示必填标记 | `boolean` |

> 其余属性请参考 rc-field-form 文档。

### Form.Item

继承 `rc-field-form` 的 `FieldProps`。常用属性：

| 属性 | 说明 |
| --- | --- |
| name | 字段名 | 
| rules | 校验规则数组 |
| dependencies | 字段依赖，用于联动 |
| shouldUpdate | 是否订阅全部字段，结合 render props 使用 |

### Form.List

- `name`：列表字段名。
- render props 提供 `fields`、`add`、`remove`、`move` 等操作。

### Hooks

| Hook | 说明 |
| --- | --- |
| `Form.useForm()` | 返回 `[form]`，用于外部控制。 |
| `Form.useFormInstance()` | 在子组件中直接获取最近的 Form 实例。 |
| `Form.useWatch(namePath, form?)` | 订阅某字段的实时值。 |

### Form.Provider

来自 `rc-field-form`，可监听多个表单实例的事件（例如跨表单联动）。

## 默认行为

- `onFinishFailed` 默认弹出 Toast，若需自定义可传入新的回调。
- `component={false}`，即不会额外包裹原生视图，方便自定义布局。
