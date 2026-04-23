import React, { useImperativeHandle } from 'react'
import renderer from 'react-test-renderer'
import { type UseAriaOverlayResult, useAriaOverlay } from '../useAriaOverlay'
const mockUseOverlay = jest.fn()
jest.mock('../../../internal/aria/overlays', () => ({ useOverlay: (...a: any[]) => mockUseOverlay(...a) }))
const TC = React.forwardRef<UseAriaOverlayResult | null, Parameters<typeof useAriaOverlay>[0]>((o, r) => {
  const v = useAriaOverlay(o); useImperativeHandle(r, () => v, [v]); return null
})
describe('useAriaOverlay', () => {
  beforeEach(() => { jest.clearAllMocks(); mockUseOverlay.mockReturnValue({ overlayProps: { accessibilityRole: 'dialog' } }) })
  it('把入参透传给 useOverlay 并返回 overlayRef', () => {
    const r = React.createRef<UseAriaOverlayResult>()
    renderer.create(<TC ref={r} isOpen onClose={jest.fn()} isDismissable={false} shouldCloseOnInteractOutside={() => false} />)
    expect(mockUseOverlay).toHaveBeenCalledTimes(1); expect(mockUseOverlay.mock.calls[0][0]).toMatchObject({ isOpen: true, isDismissable: false })
    expect(r.current?.overlayRef).toBe(mockUseOverlay.mock.calls[0][1])
  })
  it('合并额外 overlayProps', () => {
    const r = React.createRef<UseAriaOverlayResult>()
    renderer.create(<TC ref={r} isOpen overlayProps={{ pointerEvents: 'box-none' }} />)
    expect(r.current?.overlayProps).toMatchObject({ accessibilityRole: 'dialog', pointerEvents: 'box-none' })
  })
})
