import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

import type { WaterMarkProps } from './types'
import { useWaterMarkTokens } from './tokens'

const WaterMark: React.FC<WaterMarkProps> = props => {
  const {
    content = 'WaterMark',
    gapX,
    gapY,
    rotate,
    fontSize,
    color,
    opacity,
    zIndex = 2000,
    fullPage = true,
    style,
    onLayoutCalculated,
    textStyle,
    ...rest
  } = props
  const tokens = useWaterMarkTokens({ gapX, gapY, rotate, fontSize, color, opacity })
  const window = useWindowDimensions()
  const [size, setSize] = React.useState(() => ({ width: fullPage ? window.width : 0, height: fullPage ? window.height : 0 }))

  const rows = size.height ? Math.ceil(size.height / tokens.gapY) : 1
  const cols = size.width ? Math.ceil(size.width / tokens.gapX) : 1

  const handleLayout = React.useCallback((event) => {
    if (fullPage) return
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
    onLayoutCalculated?.({ width, height })
  }, [fullPage, onLayoutCalculated])

  React.useEffect(() => {
    if (fullPage) {
      setSize({ width: window.width, height: window.height })
      onLayoutCalculated?.({ width: window.width, height: window.height })
    }
  }, [fullPage, onLayoutCalculated, window.width, window.height])

  return (
    <View
      pointerEvents="none"
      style={[
        fullPage ? StyleSheet.absoluteFill : null,
        { zIndex },
        style,
      ]}
      onLayout={handleLayout}
      {...rest}
    >
      <View style={styles.wrapper}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <View
            key={`row-${rowIndex}`}
            style={{
              flexDirection: 'row',
              marginTop: rowIndex === 0 ? 0 : tokens.gapY,
              marginLeft: rowIndex % 2 === 0 ? 0 : tokens.gapX / 2,
            }}
          >
            {Array.from({ length: cols }).map((_, colIndex) => (
              <View
                key={`col-${rowIndex}-${colIndex}`}
                style={{
                  width: tokens.gapX,
                  height: tokens.gapY,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ rotate: `${tokens.rotate}deg` }],
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={[{
                    fontSize: tokens.fontSize,
                    color: tokens.color,
                    opacity: tokens.opacity,
                  }, textStyle]}
                >
                  {content}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

WaterMark.displayName = 'WaterMark'

export default WaterMark
