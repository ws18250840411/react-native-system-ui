import React, { useImperativeHandle } from 'react'
import renderer from 'react-test-renderer'

import {
  type UseAriaToggleOptions,
  type UseAriaToggleResult,
  useAriaToggle,
} from '../useAriaToggle'

const mockUseToggleState = jest.fn()
const mockUseToggle = jest.fn()

jest.mock('@react-stately/toggle', () => ({
  useToggleState: (...args: any[]) => mockUseToggleState(...args),
}))

jest.mock('@react-native-aria/toggle', () => ({
  useToggle: (...args: any[]) => mockUseToggle(...args),
}))

const TestComponent = React.forwardRef<UseAriaToggleResult | null, { options: UseAriaToggleOptions }>(
  ({ options }, ref) => {
    const value = useAriaToggle(options)
    useImperativeHandle(ref, () => value, [value])
    return null
  }
)

describe('useAriaToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('返回 state、inputProps 以及内部 ref', () => {
    const toggleState: any = { isSelected: false }
    const inputProps = { onPress: jest.fn() }
    mockUseToggleState.mockReturnValue(toggleState)
    mockUseToggle.mockReturnValue({ inputProps })

    const ref = React.createRef<UseAriaToggleResult>()

    renderer.create(<TestComponent ref={ref} options={{ 'aria-label': 'toggle' }} />)

    expect(mockUseToggleState).toHaveBeenCalledWith({ 'aria-label': 'toggle' })
    expect(mockUseToggle).toHaveBeenCalledTimes(1)
    expect(mockUseToggle.mock.calls[0][0]).toEqual({ 'aria-label': 'toggle' })
    expect(mockUseToggle.mock.calls[0][1]).toBe(toggleState)
    expect(ref.current?.state).toBe(toggleState)
    expect(ref.current?.inputProps).toBe(inputProps)
    expect(mockUseToggle.mock.calls[0][2]).toBe(ref.current?.inputRef)
  })

  it('使用传入的 inputRef', () => {
    const toggleState: any = { isSelected: true }
    const inputProps = { onPress: jest.fn() }
    const externalRef = React.createRef<any>()
    mockUseToggleState.mockReturnValue(toggleState)
    mockUseToggle.mockReturnValue({ inputProps })

    const ref = React.createRef<UseAriaToggleResult>()

    renderer.create(
      <TestComponent
        ref={ref}
        options={{ inputRef: externalRef, 'aria-label': 'external' }}
      />
    )

    expect(ref.current?.inputRef).toBe(externalRef)
    expect(mockUseToggle.mock.calls[0][2]).toBe(externalRef)
  })
})
