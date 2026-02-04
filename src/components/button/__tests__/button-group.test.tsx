import React from 'react'
import renderer from 'react-test-renderer'
import { Platform, StyleSheet, View } from 'react-native'

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

  it('applies margins to children on Native', () => {
    const originalOS = Platform.OS
    ;(Platform as any).OS = 'ios'

    try {
      const tree = renderWithProvider(
        <ButtonGroup spacing={10}>
          <Button text="1" />
          <Button text="2" />
        </ButtonGroup>
      )

      const buttons = tree.root.findAllByType(Button)
      const firstBtnStyle = StyleSheet.flatten(buttons[0].props.style)
      const secondBtnStyle = StyleSheet.flatten(buttons[1].props.style)

      expect(firstBtnStyle.marginRight).toBe(10)
      expect(secondBtnStyle.marginRight).toBe(0)
    } finally {
      ;(Platform as any).OS = originalOS
    }
  })

  it('applies gap style on Web', () => {
    const originalOS = Platform.OS
    ;(Platform as any).OS = 'web'

    try {
      const tree = renderWithProvider(
        <ButtonGroup spacing={20}>
          <Button text="1" />
          <Button text="2" />
        </ButtonGroup>
      )

      
      
      
      
      
      
      
      
      const views = tree.root.findAllByType(View)
      
      const container = views.find(v => {
        const s = StyleSheet.flatten(v.props.style)
        return s && s.columnGap === 20
      })

      expect(container).toBeDefined()
      const style = StyleSheet.flatten(container?.props.style)
      expect(style.flexDirection).toBe('row')

      
      const buttons = tree.root.findAllByType(Button)
      const firstBtnStyle = StyleSheet.flatten(buttons[0].props.style)
      expect(firstBtnStyle?.marginRight).toBeUndefined()
    } finally {
      ;(Platform as any).OS = originalOS
    }
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
    const originalOS = Platform.OS
    ;(Platform as any).OS = 'ios'

    try {
      const tree = renderWithProvider(
        <ButtonGroup direction="vertical" spacing={8}>
          <Button text="1" />
          <Button text="2" />
        </ButtonGroup>
      )

      const buttons = tree.root.findAllByType(Button)
      const firstBtnStyle = StyleSheet.flatten(buttons[0].props.style)
      
      expect(firstBtnStyle.marginBottom).toBe(8)
      expect(firstBtnStyle.marginRight).toBeUndefined()
    } finally {
      ;(Platform as any).OS = originalOS
    }
  })
})
