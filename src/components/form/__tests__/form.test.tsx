import React from 'react'
import { act, create } from 'react-test-renderer'
import { TextInput, Button, Text } from 'react-native'
import Form, { useWatch } from '..'
import { FormItem } from '../FormItem'

const globalAny: any = global
if (!globalAny.document) {
  globalAny.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => { } },
  }
}

// Mock Input component
const Input = (props: any) => (
  <TextInput
    {...props}
    onChangeText={props.onChangeText} // FormItem injects onChangeText by default
    testID={props.testID || 'input'}
  />
)

describe('Form', () => {
  it('binds field value and trigger onValuesChange', () => {
    // ... (keep existing tests)
    const onValuesChange = jest.fn()
    const tree = create(
      <Form onValuesChange={onValuesChange}>
        <FormItem name="username">
          <Input />
        </FormItem>
      </Form>
    )

    const input = tree.root.findByType(TextInput)
    act(() => {
      input.props.onChangeText('test')
    })

    expect(onValuesChange).toHaveBeenCalledWith(
      expect.objectContaining({ username: 'test' }),
      'username',
      'test'
    )
  })

  it('prevents submit when required rule fails until the value is corrected', async () => {
    const onFinish = jest.fn()
    let formRef: any
    const tree = create(
      <Form
        ref={ref => (formRef = ref)}
        onFinish={onFinish}
      >
        <FormItem name="username" rules={[{ required: true, message: 'Required' }]}>
          <Input />
        </FormItem>
      </Form>
    )

    // Submit with empty value
    let result
    await act(async () => {
      result = await formRef.submit()
    })
    expect(onFinish).not.toHaveBeenCalled()

    // Check error message injection
    const input = tree.root.findByType(TextInput)
    expect(input.props.error).toBe(true)
    expect(input.props.errorMessage).toBe('Required')

    // Fix value
    act(() => {
      input.props.onChangeText('valid')
    })

    await act(async () => {
      result = await formRef.submit()
    })
    expect(onFinish).toHaveBeenCalledWith({ username: 'valid' })
  })

  it('validates pattern on blur trigger', () => {
    const tree = create(
      <Form>
        <FormItem
          name="email"
          validateTrigger="onBlur"
          rules={[{ pattern: /@/, message: 'Invalid email' }]}
        >
          <Input />
        </FormItem>
      </Form>
    )

    const input = tree.root.findByType(TextInput)

    // Change text (should not validate yet)
    act(() => {
      input.props.onChangeText('invalid')
    })
    expect(input.props.error).toBeUndefined()

    // Blur (should validate)
    act(() => {
      input.props.onBlur()
    })
    expect(input.props.error).toBe(true)
    expect(input.props.errorMessage).toBe('Invalid email')
  })

  it('supports async validator and validateFields', async () => {
    let formRef: any
    const tree = create(
      <Form ref={ref => (formRef = ref)}>
        <FormItem
          name="username"
          rules={[
            {
              validator: async (value) => {
                if (value === 'taken') return 'Taken'
                return null
              }
            }
          ]}
        >
          <Input />
        </FormItem>
      </Form>
    )

    const input = tree.root.findByType(TextInput)

    // Set invalid value
    act(() => {
      input.props.onChangeText('taken')
    })

    await act(async () => {
      try {
        await formRef.validateFields()
      } catch (e) {
        // ignore
      }
    })

    expect(input.props.errorMessage).toBe('Taken')
  })

  it('supports nested fields', () => {
    const onValuesChange = jest.fn()
    const tree = create(
      <Form onValuesChange={onValuesChange} initialValues={{ user: { name: 'initial' } }}>
        <FormItem name={['user', 'name']}>
          <Input testID="name-input" />
        </FormItem>
        <FormItem name="user.age">
          <Input testID="age-input" />
        </FormItem>
      </Form>
    )

    const nameInput = tree.root.findByProps({ testID: 'name-input' })
    const ageInput = tree.root.findByProps({ testID: 'age-input' })

    // Check initial value
    expect(nameInput.props.value).toBe('initial')

    // Change nested value via array path
    act(() => {
      nameInput.props.onChangeText('updated')
    })
    expect(onValuesChange).toHaveBeenCalledWith(
      expect.objectContaining({ user: { name: 'updated' } }),
      'user.name',
      'updated'
    )

    // Change nested value via string path
    act(() => {
      ageInput.props.onChangeText('20')
    })
    expect(onValuesChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ user: { name: 'updated', age: '20' } }),
      'user.age',
      '20'
    )
  })

  it('supports dependencies', () => {
    const tree = create(
      <Form>
        <FormItem name="password">
          <Input testID="password" />
        </FormItem>
        <FormItem
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              validator: (value, values) => {
                if (value && value !== values.password) {
                  return 'Mismatch'
                }
                return null
              }
            }
          ]}
        >
          <Input testID="confirm" />
        </FormItem>
      </Form>
    )

    const password = tree.root.findByProps({ testID: 'password' })
    const confirm = tree.root.findByProps({ testID: 'confirm' })

    // Set confirm first
    act(() => {
      confirm.props.onChangeText('123')
    })
    // Set password to something else
    act(() => {
      password.props.onChangeText('456')
    })

    // Confirm field should be re-validated and show error
    expect(confirm.props.errorMessage).toBe('Mismatch')

    // Fix password
    act(() => {
      password.props.onChangeText('123')
    })
    expect(confirm.props.errorMessage).toBeUndefined()
  })

  it('resets fields', () => {
    let formRef: any
    const tree = create(
      <Form initialValues={{ name: 'init' }} ref={ref => (formRef = ref)}>
        <FormItem name="name">
          <Input />
        </FormItem>
      </Form>
    )

    const input = tree.root.findByType(TextInput)

    // Change value
    act(() => {
      input.props.onChangeText('changed')
    })
    expect(input.props.value).toBe('changed')

    // Reset
    act(() => {
      formRef.resetFields()
    })
    expect(input.props.value).toBe('init')
  })

  it('useWatch updates correctly', () => {
    const Watcher = () => {
      const value = useWatch('name')
      return <Text testID="watcher">{value}</Text>
    }

    const tree = create(
      <Form>
        <FormItem name="name">
          <Input />
        </FormItem>
        <Watcher />
      </Form>
    )

    const input = tree.root.findByType(TextInput)
    const watcher = tree.root.findByProps({ testID: 'watcher' })

    act(() => {
      input.props.onChangeText('hello')
    })

    expect(watcher.props.children).toBe('hello')
  })
})
