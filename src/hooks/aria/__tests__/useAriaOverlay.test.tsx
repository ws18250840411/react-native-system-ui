import React, { useImperativeHandle } from 'react'
import renderer from 'react-test-renderer'

import { type UseAriaOverlayResult, useAriaOverlay } from '../useAriaOverlay'

const mockUseOverlay = jest.fn()

jest.mock('@react-native-aria/overlays', () => ({
  useOverlay: (...args: any[]) => mockUseOverlay(...args),
}))

const TestComponent = React.forwardRef<UseAriaOverlayResult | null, Parameters<typeof useAriaOverlay>[0]>(
  (options, ref) => {
    const value = useAriaOverlay(options)
    useImperativeHandle(ref, () => value, [value])
    return null
  }
)

describe('useAriaOverlay', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseOverlay.mockReturnValue({
      overlayProps: { accessibilityRole: 'dialog' },
    })
  })

  it('把入参透传给 useOverlay 并返回 overlayRef', () => {
    const ref = React.createRef<UseAriaOverlayResult>()

    renderer.create(
      <TestComponent
        ref={ref}
        isOpen
        onClose={jest.fn()}
        isDismissable={false}
        shouldCloseOnInteractOutside={() => false}
      />
    )

    expect(mockUseOverlay).toHaveBeenCalledTimes(1)
    expect(mockUseOverlay.mock.calls[0][0]).toMatchObject({
      isOpen: true,
      isDismissable: false,
    })
    const passedRef = mockUseOverlay.mock.calls[0][1]
    expect(ref.current?.overlayRef).toBe(passedRef)
  })

  it('合并额外 overlayProps', () => {
    const ref = React.createRef<UseAriaOverlayResult>()
    renderer.create(
      <TestComponent
        ref={ref}
        isOpen
        overlayProps={{ pointerEvents: 'box-none' }}
      />
    )

    expect(ref.current?.overlayProps).toMatchObject({
      accessibilityRole: 'dialog',
      pointerEvents: 'box-none',
    })
  })
})
