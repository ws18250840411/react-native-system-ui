import React from 'react'
import renderer from 'react-test-renderer'

import {
  type UseAriaListBoxOptions,
  type UseAriaListBoxResult,
  useAriaListBox,
} from '../useAriaListBox'

const mockUseListState = jest.fn()
const mockUseListBox = jest.fn()

jest.mock('@react-stately/list', () => ({
  useListState: (...args: any[]) => mockUseListState(...args),
}))

jest.mock('@react-native-aria/listbox', () => ({
  useListBox: (...args: any[]) => mockUseListBox(...args),
}))

const TestComponent = React.forwardRef<
  UseAriaListBoxResult<any> | null,
  { options: UseAriaListBoxOptions<any> }
>(({ options }, ref) => {
  const value = useAriaListBox(options)
  React.useImperativeHandle(ref, () => value, [value])
  return null
})

describe('useAriaListBox', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns state/listBoxProps/labelProps and passes ref through', () => {
    const state: any = { collection: [] }
    const listBoxProps = { role: 'listbox', testID: 'listbox' }
    const labelProps = { id: 'label-id' }

    mockUseListState.mockReturnValue(state)
    mockUseListBox.mockReturnValue({ listBoxProps, labelProps })

    const ref = React.createRef<UseAriaListBoxResult<any>>()
    const options = { 'aria-label': 'ListBox' } as any

    renderer.create(<TestComponent ref={ref} options={options} />)

    expect(mockUseListState).toHaveBeenCalledWith(options)
    expect(mockUseListBox).toHaveBeenCalledTimes(1)
    expect(mockUseListBox.mock.calls[0][0]).toBe(options)
    expect(mockUseListBox.mock.calls[0][1]).toBe(state)
    expect(mockUseListBox.mock.calls[0][2]).toBe(ref.current?.ref)

    expect(ref.current?.state).toBe(state)
    expect(ref.current?.listBoxProps).toBe(listBoxProps)
    expect(ref.current?.labelProps).toBe(labelProps)
  })
})

