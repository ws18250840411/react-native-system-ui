import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Animated, View } from 'react-native'
jest.mock('../useReducedMotion', () => ({ useReducedMotion: () => false }))
const { useAnimatedTransition } = require('../useAnimatedTransition')
let hookResult: { mounted: boolean; progress: Animated.Value }
const Host = ({ visible, duration = 0 }: { visible: boolean; duration?: number }) => {
  hookResult = useAnimatedTransition({ visible, duration }); return React.createElement(View, { testID: hookResult.mounted ? 'on' : 'off' })
}
describe('useAnimatedTransition', () => {
  it('mounted=false when visible=false', () => { renderer.create(React.createElement(Host, { visible: false })); expect(hookResult.mounted).toBe(false) })
  it('mounted=true when visible=true', () => { renderer.create(React.createElement(Host, { visible: true })); expect(hookResult.mounted).toBe(true) })
  it('progress is Animated.Value', () => { renderer.create(React.createElement(Host, { visible: true })); expect(hookResult.progress).toBeInstanceOf(Animated.Value) })
  it('transitions mounted on visibility change (duration=0)', () => {
    let tree: renderer.ReactTestRenderer
    act(() => { tree = renderer.create(React.createElement(Host, { visible: false })) }); expect(hookResult.mounted).toBe(false)
    act(() => { tree!.update(React.createElement(Host, { visible: true })) }); expect(hookResult.mounted).toBe(true)
    act(() => { tree!.update(React.createElement(Host, { visible: false })) }); expect(hookResult.mounted).toBe(false)
  })
})
