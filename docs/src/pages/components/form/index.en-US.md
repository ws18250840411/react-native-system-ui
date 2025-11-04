# Form

Form wraps `rc-field-form` to deliver Ant Design–style APIs on React Native. It wires in Toast-based error feedback by default.

## When To Use

- Complex forms that need validation, dependencies, and submission hooks.
- Scenarios where Web teams already rely on `rc-field-form` and expect a similar API surface.
- Use with `Field.*` components to keep input layouts consistent.

## Import

```tsx
import { Form } from 'react-native-system-ui';
```

## Examples

### Basic Validation

```tsx
import React from 'react';
import { Button, Field, Form } from 'react-native-system-ui';

function Example() {
  const [form] = Form.useForm();

  const submit = () => {
    form
      .validateFields()
      .then(values => console.log(values))
      .catch(() => {});
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="email" rules={[{ required: true, message: 'Email is required' }]}>
        <Field.TextInput title="Email" placeholder="you@example.com" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, min: 6 }]}>
        <Field.PasswordInput title="Password" placeholder="At least 6 characters" />
      </Form.Item>

      <Button title="Submit" onPress={submit} />
    </Form>
  );
}

export default Example;
```

### Watching Values & Lists

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
                <Field.TextInput title="Phone" placeholder="Type number" />
              </Form.Item>
            ))}
            <Button title="Add" onPress={() => add()} />
            <Button title="Remove" onPress={() => remove(fields.length - 1)} />
          </Space>
        )}
      </Form.List>

      <Button title="Submit" onPress={() => console.log(phones)} />
    </Form>
  );
}

export default Example;
```

## API

### Form

All props mirror `rc-field-form` except `component` and `from`, which are intentionally omitted. Key props include:

| Prop | Description | Type |
| --- | --- | --- |
| form | Instance returned by `Form.useForm()` | `FormInstance` |
| initialValues | Initial values for the form | `Record<string, any>` |
| onFinish | Called with `form.getFieldsValue(true)` when validation passes | `(values) => void` |
| onFinishFailed | Called when validation fails (defaults to showing the first error via Toast) | `(errorInfo) => void` |
| layout | Layout mode | `'horizontal' \| 'vertical'` |
| requiredMark | Display required asterisks | `boolean` |

### Form.Item

Wraps `rc-field-form` Field. Common props: `name`, `rules`, `dependencies`, `shouldUpdate`, `valuePropName`, `getValueFromEvent`, etc.

### Form.List

Renders dynamic field arrays. `name` specifies the array path; render props receive `fields`, `add`, `remove`, `move`, `insert`, etc.

### Hooks

| Hook | Description |
| --- | --- |
| `Form.useForm()` | Returns `[form]` for external control. |
| `Form.useFormInstance()` | Access the nearest form instance inside nested components. |
| `Form.useWatch(namePath, form?)` | Subscribe to a field’s live value. |

### Form.Provider

Directly re-exported from `rc-field-form` to coordinate multiple forms (e.g., cross-form submission or reset).

## Defaults

- `component={false}` to avoid injecting extra wrappers.
- Built-in `onFinishFailed` uses Toast to surface the first validation error; override if you need custom UX.
