import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import type { DropdownMenuProps } from './types'
import { DropdownMenuContext } from './DropdownMenuContext'
import { useDropdownMenuTokens } from './tokens'

const DropdownMenu: React.FC<DropdownMenuProps> = props => {
  const { children, activeColor, style, ...rest } = props
  const tokens = useDropdownMenuTokens()
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [panel, setPanel] = React.useState<React.ReactNode>(null)
  const [barHeight, setBarHeight] = React.useState(0)

  const closeMenu = React.useCallback(() => {
    setActiveIndex(null)
    setPanel(null)
  }, [])

  const toggleItem = React.useCallback(
    (index: number, content: React.ReactNode) => {
      setActiveIndex(prev => {
        if (prev === index) {
          setPanel(null)
          return null
        }
        setPanel(content)
        return index
      })
    },
    []
  )

  const updatePanel = React.useCallback(
    (index: number, content: React.ReactNode) => {
      setPanel(prev => (index === activeIndex ? content : prev))
    },
    [activeIndex]
  )

  const contextValue = React.useMemo(
    () => ({
      activeIndex,
      toggleItem,
      updatePanel,
      closeMenu,
      activeColor,
    }),
    [activeColor, activeIndex, closeMenu, toggleItem, updatePanel]
  )

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <View {...rest} style={[styles.container, style]}>
        <View
          style={[styles.bar, { paddingHorizontal: tokens.spacing.horizontal }]}
          onLayout={event => setBarHeight(event.nativeEvent.layout.height)}
        >
          {React.Children.map(children, (child, index) => (
            React.isValidElement(child)
              ? React.cloneElement(child, { index })
              : child
          ))}
        </View>
        {activeIndex !== null ? (
          <>
            <Pressable
              style={[styles.mask, { top: barHeight }]}
              onPress={closeMenu}
              testID="rv-dropdown-mask"
            />
            <View
              style={[
                styles.panel,
                {
                  top: barHeight,
                  backgroundColor: tokens.colors.panelBackground,
                  maxHeight: tokens.sizing.panelMaxHeight,
                },
              ]}
            >
              {panel}
            </View>
          </>
        ) : null}
      </View>
    </DropdownMenuContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
})

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu
