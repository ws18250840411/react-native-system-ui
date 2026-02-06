import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, TextInput } from 'react-native'

const globalWithDoc = global as unknown as {
  document?: {
    createElement: () => { style: Record<string, unknown> }
    body: { appendChild: () => void }
  }
}
if (!globalWithDoc.document) {
  globalWithDoc.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => {} },
  }
}

import Field from '..'
import Dialog from '../../dialog'

describe('Field', () => {
  it('runs formatter on blur when formatTrigger is onBlur', () => {
    const handleChange = jest.fn()

    const tree = renderer.create(
      <Field
        defaultValue="1234"
        formatter={val => `(${val})`}
        formatTrigger="onBlur"
        onChangeText={handleChange}
      />,
    )

    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onBlur?.()
    })

    expect(handleChange).toHaveBeenLastCalledWith('(1234)')
    expect(tree.root.findByType(TextInput).props.value).toBe('(1234)')
  })

  it('renders numeric label', () => {
    const tree = renderer.create(<Field label={0} colon />)
    const texts = tree.root.findAllByType(Text)
    const hasZero = texts.some(node => {
      const children = node.props.children
      return Array.isArray(children) ? children.includes(0) : children === 0
    })
    expect(hasZero).toBe(true)
  })

  it('supports tooltip number message', () => {
    const showSpy = jest.spyOn(Dialog, 'show').mockImplementation(() => () => {})

    const tree = renderer.create(<Field label="A" tooltip={0} />)
    const pressables = tree.root.findAllByType(Pressable)
    const tooltip = pressables.find(node => node.props.accessibilityRole === 'button' && typeof node.props.onPress === 'function')

    act(() => {
      tooltip?.props.onPress?.()
    })

    expect(showSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 0 }))
    showSpy.mockRestore()
  })

  it('includes errorMessage in describedBy when it is 0', () => {
    const tree = renderer.create(<Field errorMessage={0} />)
    const input = tree.root.findByType(TextInput)
    expect(Array.isArray(input.props.accessibilityDescribedBy)).toBe(true)
    expect(input.props.accessibilityDescribedBy.length).toBeGreaterThan(0)
  })

  it('formats value on change', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Field
        formatter={val => val.replace(/\d/g, '')}
        onChangeText={handleChange}
      />
    )
    const input = tree.root.findByType(TextInput)
    
    act(() => {
      input.props.onChangeText('1a2b3c')
    })
    
    expect(handleChange).toHaveBeenCalledWith('abc')
    expect(input.props.value).toBe('abc')
  })

  it('limits length with maxLength', () => {
    const handleChange = jest.fn()
    const onOverlimit = jest.fn()
    const tree = renderer.create(
      <Field
        maxLength={3}
        onChangeText={handleChange}
        onOverlimit={onOverlimit}
      />
    )
    const input = tree.root.findByType(TextInput)
    
    act(() => {
      input.props.onChangeText('1234')
    })
    
    expect(onOverlimit).toHaveBeenCalledWith('1234')
    expect(handleChange).toHaveBeenCalledWith('123')
    expect(input.props.value).toBe('123')
  })

  it('clears value when clear icon clicked', () => {
    const onClear = jest.fn()
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Field
        value="text"
        clearable
        onClear={onClear}
        onChangeText={handleChange}
      />
    )
    
    const input = tree.root.findByType(TextInput)
    act(() => {
        input.props.onFocus?.({} as any)
    })
    
    const pressables = tree.root.findAllByType(Pressable)
    const clearBtn = pressables.find(p => p.props.onMouseDown)
    
    expect(clearBtn).toBeDefined()
    
    act(() => {
        clearBtn?.props.onPress()
    })
    
    expect(onClear).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith('')
  })

  it('renders textarea with autosize props', () => {
    const tree = renderer.create(
      <Field
        type="textarea"
        autoSize={{ minRows: 2, maxRows: 5 }}
        rows={1}
      />
    )
    const input = tree.root.findByType(TextInput)
    expect(input.props.multiline).toBe(true)
    expect(input.props.onContentSizeChange).toBeDefined()
  })
})
