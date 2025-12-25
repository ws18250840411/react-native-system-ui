import React from 'react'
import renderer from 'react-test-renderer'
import { Pressable, StyleSheet } from 'react-native'

import { ConfigProvider, useLocale, zhCN } from '..'
import { Button } from '../../index'
import { defaultTokens } from '../../../design-system'

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

    const localeNode = tree.root.findByType(LocaleConsumer)
    expect(localeNode.children).toContain('测试')
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

    const pressable = tree.root.findByType(Pressable)
    const styleValue = typeof pressable.props.style === 'function'
      ? pressable.props.style({ pressed: false })
      : pressable.props.style
    const flattened = StyleSheet.flatten(styleValue)

    expect(flattened.backgroundColor).toBe(defaultTokens.palette.success[500])
  })

  it('inherits locale from parent provider if not specified', () => {
    const CustomLocale = { ...zhCN, name: 'Custom' }
    const tree = renderer.create(
      <ConfigProvider locale={CustomLocale}>
        <ConfigProvider>
          <LocaleConsumer />
        </ConfigProvider>
      </ConfigProvider>
    )

    const localeNode = tree.root.findByType(LocaleConsumer)
    expect(localeNode.children).toContain('Custom')
  })

  it('overrides parent locale when specified', () => {
    const ParentLocale = { ...zhCN, name: 'Parent' }
    const ChildLocale = { ...zhCN, name: 'Child' }
    
    const tree = renderer.create(
      <ConfigProvider locale={ParentLocale}>
        <ConfigProvider locale={ChildLocale}>
          <LocaleConsumer />
        </ConfigProvider>
      </ConfigProvider>
    )

    const localeNode = tree.root.findByType(LocaleConsumer)
    expect(localeNode.children).toContain('Child')
  })
})
