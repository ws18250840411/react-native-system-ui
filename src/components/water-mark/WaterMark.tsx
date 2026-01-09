import React from 'react'
import { Image, Text, View, useWindowDimensions } from 'react-native'

import type { WaterMarkProps } from './types'
import { isFiniteNumber, isString } from '../../utils/validate'
import { useWaterMarkTokens } from './tokens'

const WaterMark: React.FC<WaterMarkProps> = props => {
  const {
    content: contentProp,
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
    zIndex: zIndexProp,
    fullPage: fullPageProp,
    tokensOverride,
    style,
    onLayoutCalculated,
    textStyle,
    ...rest
  } = props
  const tokens = useWaterMarkTokens(tokensOverride)
  const content = contentProp ?? tokens.defaults.content
  const zIndex = zIndexProp ?? tokens.defaults.zIndex
  const fullPage = fullPageProp ?? tokens.defaults.fullPage
  const window = useWindowDimensions()
  const [layoutSize, setLayoutSize] = React.useState({ width: 0, height: 0 })
  const lastLayoutRef = React.useRef({ width: 0, height: 0 })
  const size = fullPage ? window : layoutSize

  const resolvedGapX = Math.max(0, gapX ?? tokens.defaults.gapX)
  const resolvedGapY = Math.max(0, gapY ?? tokens.defaults.gapY)
  const resolvedRotate = rotate ?? tokens.defaults.rotate
  const resolvedOpacity = Math.max(0, Math.min(1, opacity ?? tokens.defaults.opacity))

  const fontSizeFromFont =
    isFiniteNumber(font?.size)
      ? font?.size
      : isString(font?.size)
        ? Number.parseFloat(font?.size as string)
        : undefined
  const resolvedFontSize =
    (Number.isFinite(fontSizeFromFont ?? Number.NaN) ? fontSizeFromFont : undefined) ??
    fontSize ??
    tokens.defaults.fontSize
  const normalizedFontSize = Math.max(0, resolvedFontSize)
  const resolvedColor = font?.color ?? color ?? tokens.colors.mark

  const markWidth = Math.max(1, image?.width ?? width ?? tokens.defaults.width)
  const markHeight = Math.max(1, image?.height ?? height ?? tokens.defaults.height)
  const cellWidth = Math.max(1, markWidth + resolvedGapX)
  const cellHeight = Math.max(1, markHeight + resolvedGapY)

  const rows = size.height ? Math.ceil(size.height / cellHeight) + 1 : 1
  const cols = size.width ? Math.ceil(size.width / cellWidth) + 1 : 1

  const handleLayout = (event: any) => {
    if (fullPage) return
    const { width, height } = event.nativeEvent.layout
    if (lastLayoutRef.current.width === width && lastLayoutRef.current.height === height) return
    lastLayoutRef.current = { width, height }
    setLayoutSize({ width, height })
    onLayoutCalculated?.({ width, height })
  }

  React.useEffect(() => {
    if (!fullPage) return
    onLayoutCalculated?.({ width: window.width, height: window.height })
  }, [fullPage, onLayoutCalculated, window.width, window.height])

  return (
    <View
      pointerEvents="none"
      style={[
        fullPage ? tokens.layout.absoluteFill : null,
        { zIndex },
        style,
      ]}
      onLayout={handleLayout}
      {...rest}
    >
      <View style={tokens.layout.wrapper}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <View
            key={`row-${rowIndex}`}
            style={[tokens.layout.row, { paddingLeft: rowIndex % 2 === 0 ? 0 : cellWidth / 2 }]}
          >
            {Array.from({ length: cols }).map((_, colIndex) => (
              <View
                key={`col-${rowIndex}-${colIndex}`}
                style={[tokens.layout.cell, { width: cellWidth, height: cellHeight }]}
              >
                <View
                  style={[
                    tokens.layout.mark,
                    {
                      width: markWidth,
                      height: markHeight,
                      transform: [{ rotate: `${resolvedRotate}deg` }],
                    },
                  ]}
                >
                  {image ? (
                    <Image
                      source={{ uri: image.src }}
                      style={{
                        width: markWidth,
                        height: markHeight,
                        opacity: resolvedOpacity,
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={[
                        {
                          fontSize: normalizedFontSize,
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

WaterMark.displayName = 'WaterMark'

export default WaterMark
