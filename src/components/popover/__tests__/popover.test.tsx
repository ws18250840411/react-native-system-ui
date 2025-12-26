import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import Popover from '..'
import { PortalHost } from '../../portal'

describe('Popover', () => {
  it('toggles visibility when trigger pressed', () => {
    const tree = renderer.create(
      <PortalHost>
        <Popover reference={<Pressable testID="rv-popover-reference" />}>
          <Text>content</Text>
        </Popover>
      </PortalHost>
    )

    const wrapper = tree.root.findByProps({ testID: 'rv-popover-wrapper' })
    act(() => {
      wrapper.props.onLayout?.({
        nativeEvent: { layout: { x: 10, y: 20, width: 40, height: 20 } },
      })
    })

    const reference = tree.root.findByProps({ testID: 'rv-popover-reference' })
    act(() => {
      reference.props.onPress?.({})
    })

    const backdrops = tree.root.findAll(
      node => node.type === Pressable && node.props.testID === 'rv-popover-backdrop'
    )
    expect(backdrops.length).toBe(1)

    expect(tree).toBeTruthy()
  })

  it('renders actions', () => {
    const onSelect = jest.fn()
    // Start invisible so we can set layout first
    const tree = renderer.create(
      <PortalHost>
        <Popover
          reference={<Text>Trigger</Text>}
          visible={false}
          actions={[{ text: 'Option 1' }, { text: 'Option 2', disabled: true }]}
          onSelect={onSelect}
        />
      </PortalHost>
    )

    // Set layout
    const wrapper = tree.root.findByProps({ testID: 'rv-popover-wrapper' })
    act(() => {
      wrapper.props.onLayout?.({
        nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 100 } },
      })
    })

    // Now set visible
    act(() => {
      tree.update(
        <PortalHost>
          <Popover
            reference={<Text>Trigger</Text>}
            visible={true}
            actions={[{ text: 'Option 1' }, { text: 'Option 2', disabled: true }]}
            onSelect={onSelect}
          />
        </PortalHost>
      )
    })

    // ...

    // Wait for animations/effects if any
    // Mounted state update is inside useEffect or sync? 
    // setInternalVisible -> setMounted(true)
    // useEffect -> requestMeasure -> setAnchor -> position -> render

    // We might need to wait for anchor state update

    const action1 = tree.root.findByProps({ testID: 'rv-popover-action-0' })
    const action2 = tree.root.findByProps({ testID: 'rv-popover-action-1' })

    expect(action1).toBeDefined()
    expect(action2.props.disabled).toBe(true)

    act(() => {
      action1.props.onPress()
    })
    expect(onSelect).toHaveBeenCalledWith({ text: 'Option 1' }, 0)

    act(() => {
      action2.props.onPress()
    })
    expect(onSelect).toHaveBeenCalledTimes(1) // Should not call for disabled
  })

  it('applies dark theme', () => {
    const tree = renderer.create(
      <PortalHost>
        <Popover reference={<Text>Trigger</Text>} visible={false} theme="dark">
          <Text>Content</Text>
        </Popover>
      </PortalHost>
    )

    const wrapper = tree.root.findByProps({ testID: 'rv-popover-wrapper' })
    act(() => {
      wrapper.props.onLayout?.({
        nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 100 } },
      })
    })

    act(() => {
      tree.update(
        <PortalHost>
          <Popover reference={<Text>Trigger</Text>} visible={true} theme="dark">
            <Text>Content</Text>
          </Popover>
        </PortalHost>
      )
    })

    // Content background should be dark (#4a4a4a)
    const content = tree.root.findAll(node => {
      const style = node.props.style
      if (!style) return false
      const flat = Array.isArray(style) ? Object.assign({}, ...style) : style
      return flat.backgroundColor === '#4a4a4a'
    })

    expect(content.length).toBeGreaterThan(0)
  })
})
