import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, View } from 'react-native'

import Button from '..'
import { ButtonGroup } from '../ButtonGroup'
import { ThemeProvider } from '../../../design-system'

const renderWithProvider = (ui: React.ReactElement) => {
  return renderer.create(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('ButtonGroup', () => {
  it('renders children correctly', () => {
    const tree = renderWithProvider(
      <ButtonGroup>
        <Button text="1" />
        <Button text="2" />
      </ButtonGroup>
    )
    expect(tree.root.findAllByType(Button)).toHaveLength(2)
  })

  it('applies gap style to container', () => {
    const tree = renderWithProvider(
      <ButtonGroup spacing={10}>
        <Button text="1" />
        <Button text="2" />
      </ButtonGroup>
    )

    const views = tree.root.findAllByType(View)
    const container = views.find(v => {
      const s = StyleSheet.flatten(v.props.style)
      return s && s.gap === 10
    })
    expect(container).toBeDefined()
    const style = StyleSheet.flatten(container?.props.style)
    expect(style.flexDirection).toBe('row')
  })

  it('handles block prop', () => {
    const tree = renderWithProvider(
      <ButtonGroup block>
        <Button text="1" />
      </ButtonGroup>
    )

    const views = tree.root.findAllByType(View)
    const container = views.find(v => {
      const s = StyleSheet.flatten(v.props.style)
      return s && s.width === '100%'
    })
    
    expect(container).toBeDefined()
  })
  
  it('supports vertical direction', () => {
    const tree = renderWithProvider(
      <ButtonGroup direction="vertical" spacing={8}>
        <Button text="1" />
        <Button text="2" />
      </ButtonGroup>
    )

    const views = tree.root.findAllByType(View)
    const container = views.find(v => {
      const s = StyleSheet.flatten(v.props.style)
      return s && s.gap === 8 && s.flexDirection === 'column'
    })
    expect(container).toBeDefined()
  })
})
