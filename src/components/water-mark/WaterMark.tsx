import React from 'react'
import { Image, StyleSheet, Text, View, useWindowDimensions, type LayoutChangeEvent } from 'react-native'

import type { WaterMarkProps } from './types'
import { useWaterMarkTokens } from './tokens'

const DEFAULT_MARK_WIDTH = 120
const DEFAULT_MARK_HEIGHT = 64

const toNumber = (value: number | string | undefined): number | undefined => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

const WaterMark: React.FC<WaterMarkProps> = props => {
  const {
    content = 'WaterMark',
    width,
    height,
    gapX,
    gapY,
    rotate,
    image,
    font,
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
  const tokens = useWaterMarkTokens()
  const window = useWindowDimensions()
  const [size, setSize] = React.useState(() => ({ width: fullPage ? window.width : 0, height: fullPage ? window.height : 0 }))

  const resolvedGapX = gapX ?? tokens.gapX
  const resolvedGapY = gapY ?? tokens.gapY
  const resolvedRotate = rotate ?? tokens.rotate
  const resolvedOpacity = opacity ?? tokens.opacity

  const resolvedFontSize = toNumber(font?.size) ?? fontSize ?? tokens.fontSize
  const resolvedColor = font?.color ?? color ?? tokens.color

  const markWidth = image?.width ?? width ?? DEFAULT_MARK_WIDTH
  const markHeight = image?.height ?? height ?? DEFAULT_MARK_HEIGHT
  const cellWidth = Math.max(1, markWidth + resolvedGapX)
  const cellHeight = Math.max(1, markHeight + resolvedGapY)

  const rows = size.height ? Math.ceil(size.height / cellHeight) + 1 : 1
  const cols = size.width ? Math.ceil(size.width / cellWidth) + 1 : 1

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
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
              paddingLeft: rowIndex % 2 === 0 ? 0 : cellWidth / 2,
            }}
          >
            {Array.from({ length: cols }).map((_, colIndex) => (
              <View
                key={`col-${rowIndex}-${colIndex}`}
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: markWidth,
                    height: markHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ rotate: `${resolvedRotate}deg` }],
                  }}
                >
                  {image ? (
                    <Image
                      source={{ uri: image.src }}
                      style={{
                        width: image.width,
                        height: image.height,
                        opacity: resolvedOpacity,
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={[
                        {
                          fontSize: resolvedFontSize,
                          color: resolvedColor,
                          opacity: resolvedOpacity,
                          fontFamily: font?.family,
                          fontWeight: font?.weight,
                        },
                        textStyle,
                      ]}
                    >
                      {content}
                    </Text>
                  )}
                </View>
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
