import React from 'react'
import renderer from 'react-test-renderer'
import { Pressable, StyleSheet, Text } from 'react-native'

import Button from '..'
import {
  ThemeProvider,
  defaultTokens,
  type ThemeProviderProps,
} from '../../../design-system'
import { createButtonTokens } from '../tokens'

const renderWithProvider = (
  ui: React.ReactElement,
  overrides?: ThemeProviderProps['value']
) => {
  return renderer.create(<ThemeProvider value={overrides}>{ui}</ThemeProvider>)
}

const getStyleFromPressable = (
  pressable: renderer.ReactTestInstance,
  state: Parameters<Pressable['props']['style']>[0] = { pressed: false }
) => {
  const styleProp = pressable.props.style
  const styleValue = typeof styleProp === 'function' ? styleProp(state) : styleProp
  return StyleSheet.flatten(styleValue)
}

describe('Button', () => {
  it('matches type tokens for primary buttons', () => {
    const tree = renderWithProvider(<Button text="Primary" type="primary" />)
    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)

    const defaultButtonTokens = createButtonTokens(defaultTokens)

    expect(flattened.backgroundColor).toBe(
      defaultButtonTokens.toneMap.primary.background
    )
    expect(flattened.borderColor).toBe(
      defaultButtonTokens.toneMap.primary.border
    )
  })

  it('renders plain buttons using color overrides just like react-vant', () => {
    const tree = renderWithProvider(
      <Button text="Plain" plain color="#ff5500" />
    )
    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)
    const label = tree.root.findByType(Text)
    const textStyle = StyleSheet.flatten(label.props.style)

    expect(flattened.backgroundColor).toBe('#ffffff')
    expect(flattened.borderColor).toBe('#ff5500')
    expect(textStyle.color).toBe('#ff5500')
  })

  it('accepts component-level token overrides', () => {
    const tree = renderWithProvider(
      <Button text="Custom" size="normal" />,
      {
        components: {
          button: {
            sizes: {
              normal: {
                height: 60,
              },
            },
          },
        },
      }
    )

    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)

    expect(flattened.minHeight).toBe(60)
  })
})
