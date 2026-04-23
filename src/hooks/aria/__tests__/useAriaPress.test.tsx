import React, { useImperativeHandle } from 'react'
import renderer from 'react-test-renderer'
import { type UseAriaPressOptions, type UseAriaPressResult, useAriaPress } from '../useAriaPress'
const mockUsePress = jest.fn()
jest.mock('../../../internal/aria/interactions', () => ({ usePress: (...a: any[]) => mockUsePress(...a) }))
const TC = React.forwardRef<UseAriaPressResult | null, { options?: UseAriaPressOptions }>(({ options }, r) => {
  const v = useAriaPress(options); useImperativeHandle(r, () => v, [v]); return null
})
describe('useAriaPress', () => {
  beforeEach(() => { jest.clearAllMocks(); mockUsePress.mockReturnValue({ pressProps: { onPress: jest.fn(), testID: 'pressable' }, isPressed: true }) })
  it('合并 press 与 extraProps', () => {
    const r = React.createRef<UseAriaPressResult>()
    renderer.create(<TC ref={r} options={{ extraProps: { accessibilityRole: 'button' } }} />)
    expect(mockUsePress).toHaveBeenCalledWith({ isDisabled: false })
    expect(r.current?.states).toEqual({ hovered: false, pressed: true, focused: false, focusVisible: false, disabled: false })
    expect(r.current?.interactionProps.onPress).toBeDefined(); expect(r.current?.interactionProps.accessibilityRole).toBe('button')
  })
  it('disabled 时透传 isDisabled', () => {
    mockUsePress.mockReturnValue({ pressProps: { onPress: jest.fn() }, isPressed: false })
    const r = React.createRef<UseAriaPressResult>()
    renderer.create(<TC ref={r} options={{ disabled: true }} />)
    expect(mockUsePress).toHaveBeenCalledWith({ isDisabled: true }); expect(r.current?.states.disabled).toBe(true)
  })
})
