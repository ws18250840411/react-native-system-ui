import React from 'react'
import renderer from 'react-test-renderer'

import { ConfigProvider, useLocale, zhCN } from '..'
import { Button } from '../../components'

const LocaleConsumer = () => {
  const locale = useLocale()
  return <>{locale.name}</>
}

describe('ConfigProvider', () => {
  it('provides locale context', () => {
    const tree = renderer.create(
      <ConfigProvider locale={{ ...zhCN, name: '测试' }}>
        <LocaleConsumer />
      </ConfigProvider>
    )

    expect(tree.toJSON()).toBe('测试')
  })

  it('passes theme overrides', () => {
    const tree = renderer.create(
      <ConfigProvider
        theme={{
          components: {
            button: {
              defaults: {
                type: 'success',
              },
            },
          },
        }}
      >
        <Button text="按钮" />
      </ConfigProvider>
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
