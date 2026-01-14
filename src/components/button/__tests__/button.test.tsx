import React from 'react'
import renderer from 'react-test-renderer'
import { Platform, Pressable, StyleSheet, Text } from 'react-native'

import Button from '..'
import {
  ThemeProvider,
  defaultTokens,
  type ThemeProviderProps,
} from '../../../design-system'
import Loading from '../../loading'

const hexToRgb = (hex: string): [number, number, number] => {
  const normalized =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex
  const intVal = parseInt(normalized.slice(1), 16)
  return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255]
}

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map(value => {
      const clamped = Math.max(0, Math.min(255, Math.round(value)))
      const hex = clamped.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    })
    .join('')}`

const lighten = (hex: string, amount = 0.85) => {
  const [r, g, b] = hexToRgb(hex)
  const mix = [
    r * (1 - amount) + 255 * amount,
    g * (1 - amount) + 255 * amount,
    b * (1 - amount) + 255 * amount,
  ]
  return rgbToHex(mix[0], mix[1], mix[2])
}

const renderWithProvider = (
  ui: React.ReactElement,
  overrides?: ThemeProviderProps['value']
) => {
  return renderer.create(<ThemeProvider value={overrides}>{ui}</ThemeProvider>)
}

const getStyleFromPressable = (
  pressable: renderer.ReactTestInstance,
  state: any = { pressed: false }
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

    expect(flattened.backgroundColor).toBe(
      defaultTokens.palette.primary[500]
    )
    expect(flattened.borderColor).toBe(defaultTokens.palette.primary[500])
  })

  it('matches react-vant default button styles by default', () => {
    const tree = renderWithProvider(<Button text="Default" />)
    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)
    const label = tree.root.findByType(Text)
    const textStyle = StyleSheet.flatten(label.props.style)

    expect(flattened.backgroundColor).toBe('#ffffff')
    expect(flattened.borderColor).toBe('#ebedf0')
    expect(flattened.borderWidth).toBe(1)
    expect(flattened.borderRadius).toBe(2)
    expect(textStyle.color).toBe('#323233')
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
            sizing: {
              sizes: {
                normal: {
                  height: 60,
                },
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

  it('parses gradient color tokens on native platforms', () => {
    const originalOS = Platform.OS
      ; (Platform as unknown as { OS: typeof Platform.OS }).OS = 'ios'
    try {
      const gradient = 'linear-gradient(90deg, #be99ff, #7232dd)'
      const tree = renderWithProvider(<Button text="Gradient" color={gradient} />)
      const pressable = tree.root.findByType(Pressable)
      const flattened = getStyleFromPressable(pressable)

      expect(flattened.backgroundColor).toBe('#be99ff')
      expect(flattened.borderWidth).toBe(0)
    } finally {
      ; (Platform as unknown as { OS: typeof Platform.OS }).OS = originalOS
    }
  })

  it('switches to spinner loading indicator when requested', () => {
    const tree = renderWithProvider(
      <Button text="Loading" loading loadingType="spinner" />
    )

    const spinner = tree.root.findByType(Loading)
    expect(spinner.props.type).toBe('spinner')
  })

  it('uses loading opacity when loading', () => {
    const tree = renderWithProvider(<Button text="Loading" loading />)
    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)
    expect(flattened.opacity).toBe(defaultTokens.opacity.loading)
  })

  it('defaults accessibility label to text content', () => {
    const tree = renderWithProvider(<Button text="提交" />)
    const pressable = tree.root.findByType(Pressable)
    expect(pressable.props.accessibilityLabel).toBe('提交')
  })

  it('merges accessibilityState with disabled and busy', () => {
    const tree = renderWithProvider(
      <Button
        text="提交"
        loading
        accessibilityState={{ selected: true }}
      />
    )
    const pressable = tree.root.findByType(Pressable)
    expect(pressable.props.accessibilityState).toEqual(
      expect.objectContaining({
        selected: true,
        disabled: true,
        busy: true,
      })
    )
    expect(pressable.props.accessibilityRole).toBe('button')
  })

  it('allows configuring font scaling props', () => {
    const tree = renderWithProvider(
      <Button text="Text" allowFontScaling={false} maxFontSizeMultiplier={2} />
    )
    const label = tree.root.findByType(Text)
    expect(label.props.allowFontScaling).toBe(false)
    expect(label.props.maxFontSizeMultiplier).toBe(2)
  })

  it('applies default ripple color on Android when not provided', () => {
    const originalOS = Platform.OS
      ; (Platform as unknown as { OS: typeof Platform.OS }).OS = 'android'
    try {
      const tree = renderWithProvider(<Button text="波纹" type="primary" />)
      const pressable = tree.root.findByType(Pressable)
      expect(pressable.props.android_ripple).toEqual(
        expect.objectContaining({ color: 'rgba(255,255,255,0.35)' })
      )
    } finally {
      ; (Platform as unknown as { OS: typeof Platform.OS }).OS = originalOS
    }
  })

  it('clips Android ripple when not showing shadow', () => {
    const originalOS = Platform.OS
      ; (Platform as unknown as { OS: typeof Platform.OS }).OS = 'android'
    try {
      const tree = renderWithProvider(<Button text="默认" />)
      const pressable = tree.root.findByType(Pressable)
      const flattened = getStyleFromPressable(pressable)
      expect(flattened.overflow).toBe('hidden')
    } finally {
      ; (Platform as unknown as { OS: typeof Platform.OS }).OS = originalOS
    }
  })

  it('does not clip Android ripple when elevated shadow is enabled', () => {
    const originalOS = Platform.OS
      ; (Platform as unknown as { OS: typeof Platform.OS }).OS = 'android'
    try {
      const tree = renderWithProvider(<Button text="Elevated" mode="elevated" type="primary" />)
      const pressable = tree.root.findByType(Pressable)
      const flattened = getStyleFromPressable(pressable)
      expect(flattened.overflow).toBeUndefined()
    } finally {
      ; (Platform as unknown as { OS: typeof Platform.OS }).OS = originalOS
    }
  })

  it('supports outlined mode with transparent background', () => {
    const tree = renderWithProvider(<Button text="Outlined" mode="outlined" type="primary" />)
    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)
    expect(flattened.backgroundColor).toBe('transparent')
    expect(flattened.borderWidth).toBe(1)
    expect(flattened.borderColor).toBe(defaultTokens.palette.primary[500])
  })

  it('applies contained-tonal palette colors', () => {
    const tree = renderWithProvider(<Button text="Tonal" mode="contained-tonal" type="primary" />)
    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)
    const expectedTonal =
      defaultTokens.palette.primary[100] ?? lighten(defaultTokens.palette.primary[500])
    expect(flattened.backgroundColor).toBe(expectedTonal)
  })

  it('respects uppercase prop for text labels', () => {
    const tree = renderWithProvider(<Button text="text" uppercase />)
    const label = tree.root.findByType(Text)
    const flattened = StyleSheet.flatten(label.props.style)
    expect(flattened.textTransform).toBe('uppercase')
  })

  it('applies themed default mode overrides when provided', () => {
    const tree = renderWithProvider(
      <Button text="ThemeOutlined" type="primary" />,
      {
        components: {
          button: {
            defaults: {
              mode: 'outlined',
            },
          },
        },
      }
    )
    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)
    expect(flattened.backgroundColor).toBe('transparent')
    expect(flattened.borderWidth).toBe(1)
  })

  it('inherits mode from Button.Group context', () => {
    const tree = renderWithProvider(
      <Button.Group mode="outlined">
        <Button text="GroupItem" type="primary" />
      </Button.Group>
    )
    const pressable = tree.root.findByType(Pressable)
    const flattened = getStyleFromPressable(pressable)
    expect(flattened.backgroundColor).toBe('transparent')
    expect(flattened.borderWidth).toBe(1)
  })

  it('catches errors in custom icon render function', () => {
    const previousDev = (global as any).__DEV__
      ; (global as any).__DEV__ = true
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { })
    const ThrowingIcon = () => {
      throw new Error('Icon render failed')
    }

    try {
      renderWithProvider(<Button text="Error Icon" icon={ThrowingIcon} />)
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Button] Failed to render icon:',
        expect.any(Error)
      )
    } finally {
      consoleSpy.mockRestore()
        ; (global as any).__DEV__ = previousDev
    }
  })

  it('uses white text color for custom background colors', () => {
    const tree = renderWithProvider(<Button text="Custom" color="#123456" />)
    const label = tree.root.findByType(Text)
    const style = StyleSheet.flatten(label.props.style)
    expect(style.color).toBe('#ffffff')
  })

  it('respects textColor prop even with custom background color', () => {
    const tree = renderWithProvider(
      <Button text="Custom" color="#123456" textColor="#ff0000" />
    )
    const label = tree.root.findByType(Text)
    const style = StyleSheet.flatten(label.props.style)
    expect(style.color).toBe('#ff0000')
  })
})
