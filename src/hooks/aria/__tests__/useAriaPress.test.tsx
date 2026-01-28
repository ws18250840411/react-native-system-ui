import React, { useImperativeHandle } from 'react'
import renderer from 'react-test-renderer'

import {
  type UseAriaPressOptions,
  type UseAriaPressResult,
  useAriaPress,
} from '../useAriaPress'

const mockUsePress = jest.fn()
const mockUseHover = jest.fn()
const mockUseFocus = jest.fn()
const mockUseFocusRing = jest.fn()

jest.mock('@react-native-aria/interactions', () => ({
  usePress: (...args: any[]) => mockUsePress(...args),
  useHover: (...args: any[]) => mockUseHover(...args),
}))

jest.mock('@react-native-aria/focus', () => ({
  useFocus: (...args: any[]) => mockUseFocus(...args),
  useFocusRing: (...args: any[]) => mockUseFocusRing(...args),
}))

const TestComponent = React.forwardRef<UseAriaPressResult | null, { options?: UseAriaPressOptions }>(
  ({ options }, ref) => {
    const value = useAriaPress(options)
    useImperativeHandle(ref, () => value, [value])
    return null
  }
)

describe('useAriaPress', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePress.mockReturnValue({
      pressProps: { onPress: jest.fn(), testID: 'pressable' },
      isPressed: true,
    })
    mockUseHover.mockReturnValue({
      hoverProps: { onHoverIn: jest.fn() },
      isHovered: true,
    })
    mockUseFocus.mockReturnValue({
      focusProps: { onFocus: jest.fn() },
      isFocused: true,
    })
    mockUseFocusRing.mockReturnValue({
      focusProps: { accessibilityState: { focused: true } },
      isFocusVisible: true,
    })
  })

  it('合并交互 props 并返回统一状态', () => {
    const ref = React.createRef<UseAriaPressResult>()

    renderer.create(
      <TestComponent
        ref={ref}
        options={{ allowHover: true, allowFocus: true, extraProps: { accessibilityRole: 'button' } }}
      />
    )

    expect(mockUsePress).toHaveBeenCalledWith({ isDisabled: false })
    expect(mockUseHover).toHaveBeenCalledWith({ isDisabled: false })
    expect(mockUseFocus).toHaveBeenCalledWith({ isDisabled: false })

    expect(ref.current?.states).toEqual({
      hovered: true,
      pressed: true,
      focused: true,
      focusVisible: true,
      disabled: false,
    })

    expect(ref.current?.interactionProps.onPress).toBeDefined()
    expect(ref.current?.interactionProps.onHoverIn).toBeDefined()
    expect(ref.current?.interactionProps.onFocus).toBeDefined()
    expect(ref.current?.interactionProps.accessibilityRole).toBe('button')
  })

  it('在禁用或关闭 hover/focus 时不注入相关属性', () => {
    mockUsePress.mockReturnValue({
      pressProps: { onPress: jest.fn() },
      isPressed: false,
    })
    mockUseHover.mockReturnValue({
      hoverProps: { onHoverIn: jest.fn() },
      isHovered: false,
    })
    mockUseFocus.mockReturnValue({
      focusProps: { onFocus: jest.fn() },
      isFocused: false,
    })
    mockUseFocusRing.mockReturnValue({
      focusProps: { onBlur: jest.fn() },
      isFocusVisible: false,
    })

    const ref = React.createRef<UseAriaPressResult>()

    renderer.create(
      <TestComponent
        ref={ref}
        options={{ disabled: true, allowHover: false, allowFocus: false }}
      />
    )

    expect(mockUseHover).toHaveBeenCalledWith({ isDisabled: true })
    expect(mockUseFocus).toHaveBeenCalledWith({ isDisabled: true })

    expect(ref.current?.states).toEqual({
      hovered: false,
      pressed: false,
      focused: false,
      focusVisible: false,
      disabled: true,
    })

    expect(ref.current?.interactionProps.onHoverIn).toBeUndefined()
    expect(ref.current?.interactionProps.onFocus).toBeUndefined()
  })
})
