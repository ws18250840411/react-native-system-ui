import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { TextInput } from 'react-native'

import { Form, FormItem } from '..'
import Field from '../../field'

const globalAny: any = global
if (!globalAny.document) {
  globalAny.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => {} },
  }
}

describe('Form', () => {
  it('binds field value and trigger onValuesChange', async () => {
    const onValuesChange = jest.fn()
    const onFinish = jest.fn()
    const formRef = React.createRef<any>()
    const tree = renderer.create(
      <Form
        ref={formRef}
        initialValues={{ username: 'Jack' }}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
      >
        <FormItem name="username">
          <Field placeholder="请输入用户名" />
        </FormItem>
      </Form>,
    )

    const input = tree.root.findByType(TextInput)
    act(() => {
      input.props.onChangeText('Lucy')
    })
    expect(onValuesChange).toHaveBeenCalledWith({ username: 'Lucy' }, 'username', 'Lucy')

    await act(async () => {
      await formRef.current?.submit()
    })
    expect(onFinish).toHaveBeenCalledWith({ username: 'Lucy' })
  })

  it('prevents submit when required rule fails until the value is corrected', async () => {
    const onFinish = jest.fn()
    const formRef = React.createRef<any>()
    const tree = renderer.create(
      <Form ref={formRef} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Field label="用户名" placeholder="请输入用户名" />
        </Form.Item>
      </Form>
    )

    await act(async () => {
      await formRef.current?.submit()
    })

    const field = tree.root.findByType(Field)
    expect(field.props.errorMessage).toBe('请输入用户名')
    expect(onFinish).not.toHaveBeenCalled()

    const input = tree.root.findByType(TextInput)
    act(() => {
      input.props.onChangeText('Lucy')
    })

    await act(async () => {
      await formRef.current?.submit()
    })

    expect(onFinish).toHaveBeenCalledWith({ username: 'Lucy' })
  })

  it('validates pattern on blur trigger', () => {
    const tree = renderer.create(
      <Form>
        <Form.Item
          name="phone"
          validateTrigger="onBlur"
          rules={[{ pattern: /^1\d{10}$/, message: '手机号格式错误', validateTrigger: 'onBlur' }]}
        >
          <Field label="手机号" placeholder="请输入手机号" />
        </Form.Item>
      </Form>
    )

    const input = tree.root.findByType(TextInput)
    act(() => {
      input.props.onChangeText('123456')
    })

    let field = tree.root.findByType(Field)
    expect(field.props.errorMessage).toBeUndefined()

    act(() => {
      input.props.onBlur?.({} as any)
    })

    field = tree.root.findByType(Field)
    expect(field.props.errorMessage).toBe('手机号格式错误')
  })

  it('supports async validator and validateFields', async () => {
    const asyncValidator = jest.fn(async (value: string) => {
      if (value !== 'ok') {
        return '值需要为 ok'
      }
      return undefined
    })
    const formRef = React.createRef<any>()
    const tree = renderer.create(
      <Form ref={formRef}>
        <Form.Item
          name="code"
          rules={[{ validator: asyncValidator, message: '校验失败' }]}
        >
          <Field label="验证码" placeholder="请输入验证码" />
        </Form.Item>
      </Form>
    )

    const input = tree.root.findByType(TextInput)
    await act(async () => {
      input.props.onChangeText('bad')
      await Promise.resolve()
    })

    let field = tree.root.findByType(Field)
    expect(field.props.errorMessage).toBe('值需要为 ok')

    await act(async () => {
      await expect(formRef.current?.validateFields()).rejects.toBeTruthy()
    })

    await act(async () => {
      input.props.onChangeText('ok')
      await Promise.resolve()
    })

    field = tree.root.findByType(Field)
    expect(field.props.errorMessage).toBeUndefined()

    await act(async () => {
      const values = await formRef.current?.validateFields()
      expect(values).toEqual({ code: 'ok' })
    })
  })
})
