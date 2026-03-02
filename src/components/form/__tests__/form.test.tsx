import React from 'react'
import { act, create } from 'react-test-renderer'
import { TextInput, Text, type TextInputProps } from 'react-native'
import Form, { useWatch } from '..'
import { FormItem } from '../FormItem'
import type { FormInstance } from '../types'

const globalWithDoc = global as unknown as {
  document?: {
    createElement: () => { style: Record<string, unknown> }
    body: { appendChild: () => void }
  }
}
if (!globalWithDoc.document) {
  globalWithDoc.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => { } },
  }
}

type InputProps = Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur' | 'testID'> & {
  value?: string
  onChangeText?: (text: string) => void
  onBlur?: () => void
  testID?: string
  error?: boolean
  errorMessage?: string
}

const TestTextInput = TextInput as unknown as React.ComponentType<
  TextInputProps & { testID?: string; error?: boolean; errorMessage?: string }
>

const Input: React.FC<InputProps> = ({
  testID,
  value,
  onChangeText,
  onBlur,
  error,
  errorMessage,
  ...rest
}) => (
  <TestTextInput
    {...rest}
    value={value}
    onChangeText={onChangeText}
    onBlur={onBlur}
    testID={testID || 'input'}
    error={error}
    errorMessage={errorMessage}
  />
)

describe('Form', () => {
  it('binds field value and trigger onValuesChange', () => {
    
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
    let formRef: FormInstance | null = null
    const tree = create(
      <Form
        ref={ref => {
          formRef = ref
        }}
        onFinish={onFinish}
      >
        <FormItem name="username" rules={[{ required: true, message: 'Required' }]}>
          <Input />
        </FormItem>
      </Form>
    )

    
    let result
    await act(async () => {
      result = await formRef?.submit()
    })
    void result
    expect(onFinish).not.toHaveBeenCalled()

    
    const input = tree.root.findByType(TextInput)
    expect(input.props.error).toBe(true)
    expect(input.props.errorMessage).toBe('Required')

    
    act(() => {
      input.props.onChangeText('valid')
    })

    await act(async () => {
      result = await formRef?.submit()
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

    
    act(() => {
      input.props.onChangeText('invalid')
    })
    expect(input.props.error).toBeUndefined()

    
    act(() => {
      input.props.onBlur()
    })
    expect(input.props.error).toBe(true)
    expect(input.props.errorMessage).toBe('Invalid email')
  })

  it('clears existing error when value becomes valid on change', () => {
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

    act(() => {
      input.props.onChangeText('invalid')
      input.props.onBlur()
    })
    expect(tree.root.findByType(TextInput).props.errorMessage).toBe('Invalid email')

    act(() => {
      input.props.onChangeText('a@b')
    })
    expect(tree.root.findByType(TextInput).props.errorMessage).toBeUndefined()
  })

  it('keeps last async validation result and avoids stale errors', async () => {
    jest.useFakeTimers()
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const tree = create(
      <Form>
        <FormItem
          name="phone"
          rules={[
            {
              validator: async (value) => {
                const str = String(value ?? '')
                const valid = /^1\d{10}$/.test(str)
                await delay(valid ? 10 : 50)
                return valid ? true : 'Invalid phone'
              },
            },
          ]}
        >
          <Input />
        </FormItem>
      </Form>
    )

    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onChangeText('bad')
    })
    act(() => {
      input.props.onChangeText('13800138000')
    })

    await act(async () => {
      jest.advanceTimersByTime(60)
      await Promise.resolve()
    })

    expect(tree.root.findByType(TextInput).props.errorMessage).toBeUndefined()
    jest.useRealTimers()
  })

  it('supports async validator and validateFields', async () => {
    let formRef: FormInstance | null = null
    const tree = create(
      <Form
        ref={ref => {
          formRef = ref
        }}
      >
        <FormItem
          name="username"
          rules={[
            {
              validator: async (value) => {
                if (value === 'taken') return 'Taken'
                return
              }
            }
          ]}
        >
          <Input />
        </FormItem>
      </Form>
    )

    const input = tree.root.findByType(TextInput)

    
    act(() => {
      input.props.onChangeText('taken')
    })

    await act(async () => {
      try {
        await formRef?.validateFields()
      } catch (e) {
        
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

    
    expect(nameInput.props.value).toBe('initial')

    
    act(() => {
      nameInput.props.onChangeText('updated')
    })
    expect(onValuesChange).toHaveBeenCalledWith(
      expect.objectContaining({ user: { name: 'updated' } }),
      'user.name',
      'updated'
    )

    
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
                return
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

    
    act(() => {
      confirm.props.onChangeText('123')
    })
    
    act(() => {
      password.props.onChangeText('456')
    })

    
    expect(confirm.props.errorMessage).toBe('Mismatch')

    
    act(() => {
      password.props.onChangeText('123')
    })
    expect(confirm.props.errorMessage).toBeUndefined()
  })

  it('resets fields', () => {
    let formRef: FormInstance | null = null
    const tree = create(
      <Form
        initialValues={{ name: 'init' }}
        ref={ref => {
          formRef = ref
        }}
      >
        <FormItem name="name">
          <Input />
        </FormItem>
      </Form>
    )

    const input = tree.root.findByType(TextInput)

    
    act(() => {
      input.props.onChangeText('changed')
    })
    expect(input.props.value).toBe('changed')

    
    act(() => {
      formRef?.resetFields()
    })
    expect(input.props.value).toBe('init')
  })

  it('resetFields keeps field initialValue stable across repeated resets', () => {
    let formRef: FormInstance | null = null
    const tree = create(
      <Form
        initialValues={{}}
        ref={ref => {
          formRef = ref
        }}
      >
        <FormItem name="name" initialValue="field-init">
          <Input />
        </FormItem>
      </Form>
    )

    const input = tree.root.findByType(TextInput)
    expect(input.props.value).toBe('field-init')

    act(() => {
      input.props.onChangeText('changed')
    })
    expect(input.props.value).toBe('changed')

    act(() => {
      formRef?.resetFields()
    })
    expect(input.props.value).toBe('field-init')

    act(() => {
      input.props.onChangeText('changed-again')
    })
    expect(input.props.value).toBe('changed-again')

    act(() => {
      formRef?.resetFields()
    })
    expect(input.props.value).toBe('field-init')
  })

  it('useWatch updates correctly', () => {
    const Watcher = () => {
      const value = useWatch('name')
      return <Text testID="watcher">{String(value ?? '')}</Text>
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

  it('does not crash when footer is a string', () => {
    expect(() => {
      create(
        <Form footer="提交">
          <FormItem name="name">
            <Input />
          </FormItem>
        </Form>
      )
    }).not.toThrow()
  })
})
