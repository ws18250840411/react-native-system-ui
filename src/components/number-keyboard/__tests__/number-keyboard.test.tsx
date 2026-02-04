import React from "react"
import renderer, { act } from "react-test-renderer"
import { Pressable, Text } from "react-native"

import NumberKeyboard from ".."
import { PortalHost } from "../../portal"
import { SafeAreaView } from "../../safe-area-view"
import Loading from "../../loading"

const mountedTrees: renderer.ReactTestRenderer[] = []

const renderInHost = (node: React.ReactElement) => {
  const tree = renderer.create(<PortalHost>{node}</PortalHost>)
  mountedTrees.push(tree)
  return tree
}

afterEach(() => {
  act(() => {
    while (mountedTrees.length) {
      mountedTrees.pop()?.unmount()
    }
  })
})

describe("NumberKeyboard", () => {
  it("[Updated] emits input events and updates value when uncontrolled", () => {
    const handleInput = jest.fn()
    const handleChange = jest.fn()
    const tree = renderInHost(
      <NumberKeyboard visible onInput={handleInput} onChange={handleChange} />
    )

    const key = tree.root.findAllByType(Pressable).find(pressable => {
      const texts = pressable.findAllByType(Text)
      return texts.some(node => typeof node.props.children === "string" && /\d/.test(node.props.children))
    })
    expect(key).toBeDefined()
    act(() => {
      key?.props.onPress()
    })

    expect(handleInput).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith(expect.stringMatching(/\d/))
  })

  it("calls delete handler", () => {
    const onDelete = jest.fn()
    const tree = renderInHost(
      <NumberKeyboard visible defaultValue="12" onDelete={onDelete} />
    )
    const keys = tree.root.findAllByType(Pressable)
    const deleteKey = keys[keys.length - 1]
    act(() => {
      deleteKey.props.onPress()
    })
    expect(onDelete).toHaveBeenCalled()
  })

  it("keeps number 0 and extra keys when custom theme with multiple extraKey", () => {
    const tree = renderInHost(
      <NumberKeyboard visible theme="custom" extraKey={["X", "Y"]} />
    )
    const texts = tree.root.findAllByType(Text).map(node => node.props.children)
    expect(texts).toContain("0")
    expect(texts).toContain("X")
    expect(texts).toContain("Y")
  })

  it("renders loading state on close button in custom theme", () => {
    const tree = renderInHost(
      <NumberKeyboard
        visible
        theme="custom"
        closeButtonLoading
        closeButtonText="关闭"
      />
    )
    const loading = tree.root.findAllByType(Loading)
    expect(loading.length).toBeGreaterThan(0)
  })

  it("renders SafeAreaView when safeAreaInsetBottom is true", () => {
    const tree = renderInHost(
      <NumberKeyboard visible safeAreaInsetBottom />
    )
    expect(tree.root.findAllByType(SafeAreaView).length).toBe(1)
  })

  it("does not render SafeAreaView when safeAreaInsetBottom is false", () => {
    const tree = renderInHost(
      <NumberKeyboard visible safeAreaInsetBottom={false} />
    )
    expect(tree.root.findAllByType(SafeAreaView).length).toBe(0)
  })

  it("disables placeholder key when showDeleteKey is false", () => {
    const tree = renderInHost(
      <NumberKeyboard visible showDeleteKey={false} />
    )
    const disabledKeys = tree.root.findAllByType(Pressable).filter(node => node.props.disabled)
    expect(disabledKeys.length).toBe(1)
  })

  it('respects maxlength', () => {
    const onInput = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <NumberKeyboard visible maxlength={3} value="12" onInput={onInput} />
      </PortalHost>
    )

    const pressables = tree.root.findAllByType(Pressable)
    const pressable3 = pressables.find(p => {
      const texts = p.findAllByType(Text)
      return texts.some(t => t.props.children === '3')
    })

    
    act(() => {
      pressable3?.props.onPress()
    })
    expect(onInput).toHaveBeenCalledWith('3')

    
    const pressable4 = pressables.find(p => {
      const texts = p.findAllByType(Text)
      return texts.some(t => t.props.children === '4')
    })

    onInput.mockClear()
    act(() => {
      pressable4?.props.onPress()
    })
    
    
    
    
    expect(onInput).toHaveBeenCalledWith('4')
  })

  it('respects maxlength (controlled)', () => {
    const onInput = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <NumberKeyboard visible maxlength={2} value="12" onInput={onInput} />
      </PortalHost>
    )

    const pressables = tree.root.findAllByType(Pressable)
    const pressable3 = pressables.find(p => {
      const texts = p.findAllByType(Text)
      return texts.some(t => t.props.children === '3')
    })

    act(() => {
      pressable3?.props.onPress()
    })
    
    expect(onInput).not.toHaveBeenCalled()
  })

  it('triggers onShow and onHide', () => {
    const onShow = jest.fn()
    const onHide = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <NumberKeyboard visible={false} onShow={onShow} onHide={onHide} />
      </PortalHost>
    )

    act(() => {
      tree.update(
        <PortalHost>
          <NumberKeyboard visible={true} onShow={onShow} onHide={onHide} />
        </PortalHost>
      )
    })
    expect(onShow).toHaveBeenCalled()

    act(() => {
      tree.update(
        <PortalHost>
          <NumberKeyboard visible={false} onShow={onShow} onHide={onHide} />
        </PortalHost>
      )
    })
    expect(onHide).toHaveBeenCalled()
  })
})
