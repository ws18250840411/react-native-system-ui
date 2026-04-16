import React from 'react'
import renderer from 'react-test-renderer'
import { AccessibilityInfo, Platform, View } from 'react-native'
import { useReducedMotion, getReducedMotion, _resetForTesting } from '../useReducedMotion'
const originalOS = Platform.OS
afterEach(() => { Platform.OS = originalOS; _resetForTesting(); jest.restoreAllMocks() })
const Host = () => { const val = useReducedMotion(); return React.createElement(View, { testID: String(val) }) }
describe('useReducedMotion', () => {
  it('defaults to false', () => { expect(renderer.create(React.createElement(Host)).root.findByProps({ testID: 'false' })).toBeTruthy() })
  it('getReducedMotion returns boolean', () => { expect(typeof getReducedMotion()).toBe('boolean') })
  it('_resetForTesting resets state', () => { _resetForTesting(); expect(getReducedMotion()).toBe(false) })
  it('calls AccessibilityInfo.isReduceMotionEnabled on native', () => {
    Platform.OS = 'ios'; _resetForTesting()
    const spy = jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
    jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() } as any)
    renderer.create(React.createElement(Host)); expect(spy).toHaveBeenCalled()
  })
})
