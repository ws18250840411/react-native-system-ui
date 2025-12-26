import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'
import Pagination from '..'

describe('Pagination', () => {
  it('renders pages and triggers onChange', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Pagination value={3} pageCount={10} showPageSize={3} forceEllipses onChange={handleChange} />
    )

    const pages = tree.root.findAllByProps({ testID: 'rv-pagination-page-0' })
    expect(pages.length).toBeGreaterThan(0)

    const next = tree.root.findByProps({ testID: 'rv-pagination-next' })
    act(() => {
      next.props.onPress?.({})
    })

    expect(handleChange).toHaveBeenCalledWith(4)
  })

  it('disables prev button on first page', () => {
    const tree = renderer.create(
      <Pagination value={1} pageCount={5} />
    )
    const prev = tree.root.findByProps({ testID: 'rv-pagination-prev' })
    act(() => {
      prev.props.onPress?.({})
    })
    // still should not go below 1
    const pages = tree.root.findAll(node => node.props.testID?.startsWith('rv-pagination-page'))
    const active = pages.find(page => page.props.children.props.children === 1)
    expect(active).toBeTruthy()
  })

  it('renders desc in simple mode', () => {
    const tree = renderer.create(
      <Pagination mode="simple" value={2} pageCount={5} />
    )
    const desc = tree.root.findByProps({ testID: 'rv-pagination-desc' })
    expect(desc.props.children).toBe('2/5')
  })

  it('customizes prev/next text', () => {
    const tree = renderer.create(
      <Pagination value={1} pageCount={5} prevText="Back" nextText="Forward" />
    )
    const prev = tree.root.findByProps({ testID: 'rv-pagination-prev' })
    const next = tree.root.findByProps({ testID: 'rv-pagination-next' })
    // Text component is inside Pressable
    expect(prev.props.children.props.children).toBe('Back')
    expect(next.props.children.props.children).toBe('Forward')
  })

  it('supports custom page render', () => {
    const pageRender = jest.fn(({ number, active }) => (
      <Text testID={`custom-text-${number}`}>{active ? `[${number}]` : number}</Text>
    ))
    const tree = renderer.create(
      <Pagination value={1} pageCount={3} pageRender={pageRender} />
    )

    expect(pageRender).toHaveBeenCalled()
    const customText = tree.root.findByProps({ testID: 'custom-text-1' })
    expect(customText.props.children).toBe('[1]')
  })
})
