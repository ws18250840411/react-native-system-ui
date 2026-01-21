import React from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { Image, Text, View, useWindowDimensions } from 'react-native'

import type { WaterMarkProps } from './types'
import { isFiniteNumber, isString } from '../../utils'
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
  const resolveFiniteNumber = (value: unknown, fallback: number) =>
    isFiniteNumber(value) ? (value as number) : fallback
  const resolveNonNegativeNumber = (value: unknown, fallback: number) =>
    Math.max(0, resolveFiniteNumber(value, fallback))
  const resolvePositiveNumber = (value: unknown, fallback: number) =>
    Math.max(1, resolveFiniteNumber(value, fallback))

  const content = contentProp ?? tokens.defaults.content
  const zIndex = resolveFiniteNumber(zIndexProp, tokens.defaults.zIndex)
  const fullPage = fullPageProp ?? tokens.defaults.fullPage
  const window = useWindowDimensions()
  const [layoutSize, setLayoutSize] = React.useState({ width: 0, height: 0 })
  const lastLayoutRef = React.useRef({ width: 0, height: 0 })
  const size = fullPage ? window : layoutSize

  const resolvedGapX = resolveNonNegativeNumber(gapX, tokens.defaults.gapX)
  const resolvedGapY = resolveNonNegativeNumber(gapY, tokens.defaults.gapY)
  const resolvedRotate = resolveFiniteNumber(rotate, tokens.defaults.rotate)
  const resolvedOpacity = Math.max(
    0,
    Math.min(1, resolveFiniteNumber(opacity, tokens.defaults.opacity))
  )

  const fontSizeFromFont =
    isFiniteNumber(font?.size)
      ? font?.size
      : isString(font?.size)
        ? Number.parseFloat(font?.size as string)
        : undefined
  const resolvedFontSize = resolveFiniteNumber(
    (Number.isFinite(fontSizeFromFont ?? Number.NaN) ? fontSizeFromFont : undefined) ?? fontSize,
    tokens.defaults.fontSize
  )
  const normalizedFontSize = Math.max(0, resolvedFontSize)
  const resolvedColor = font?.color ?? color ?? tokens.colors.mark

  const markWidth = resolvePositiveNumber(image?.width ?? width, tokens.defaults.width)
  const markHeight = resolvePositiveNumber(image?.height ?? height, tokens.defaults.height)
  const cellWidth = Math.max(1, markWidth + resolvedGapX)
  const cellHeight = Math.max(1, markHeight + resolvedGapY)

  const rows = size.height ? Math.ceil(size.height / cellHeight) + 1 : 1
  const cols = size.width ? Math.ceil(size.width / cellWidth) + 1 : 1

  const handleLayout = (event: LayoutChangeEvent) => {
    if (fullPage) return
    const { width, height } = event.nativeEvent.layout
    if (!isFiniteNumber(width) || !isFiniteNumber(height)) return
    const nextWidth = Math.max(0, width)
    const nextHeight = Math.max(0, height)
    if (
      lastLayoutRef.current.width === nextWidth &&
      lastLayoutRef.current.height === nextHeight
    )
      return
    lastLayoutRef.current = { width: nextWidth, height: nextHeight }
    setLayoutSize({ width: nextWidth, height: nextHeight })
    onLayoutCalculated?.({ width: nextWidth, height: nextHeight })
  }

  React.useEffect(() => {
    if (!fullPage) return
    if (!isFiniteNumber(window.width) || !isFiniteNumber(window.height)) return
    if (window.width <= 0 || window.height <= 0) return
    onLayoutCalculated?.({ width: window.width, height: window.height })
  }, [fullPage, onLayoutCalculated, window.width, window.height])

  const zIndexStyle = React.useMemo(() => ({ zIndex }), [zIndex])
  const cellStyle = React.useMemo(
    () => ({ width: cellWidth, height: cellHeight }),
    [cellWidth, cellHeight]
  )
  const oddRowStyle = React.useMemo(() => ({ paddingLeft: cellWidth / 2 }), [cellWidth])
  const markStyle = React.useMemo(
    () => ({
      width: markWidth,
      height: markHeight,
      transform: [{ rotate: `${resolvedRotate}deg` }],
    }),
    [markHeight, markWidth, resolvedRotate]
  )
  const imageStyle = React.useMemo(
    () => ({
      width: markWidth,
      height: markHeight,
      opacity: resolvedOpacity,
    }),
    [markHeight, markWidth, resolvedOpacity]
  )
  const textBaseStyle = React.useMemo(
    () => ({
      fontSize: normalizedFontSize,
      color: resolvedColor,
      opacity: resolvedOpacity,
      fontFamily: font?.family,
      fontWeight: font?.weight,
    }),
    [font?.family, font?.weight, normalizedFontSize, resolvedColor, resolvedOpacity]
  )
  const rowIndexes = React.useMemo(() => Array.from({ length: rows }, (_, i) => i), [rows])
  const colIndexes = React.useMemo(() => Array.from({ length: cols }, (_, i) => i), [cols])

  return (
    <View
      pointerEvents="none"
      style={[
        fullPage ? tokens.layout.absoluteFill : null,
        zIndexStyle,
        style,
      ]}
      onLayout={handleLayout}
      {...rest}
    >
      <View style={tokens.layout.wrapper}>
        {rowIndexes.map(rowIndex => (
          <View
            key={`row-${rowIndex}`}
            style={[tokens.layout.row, rowIndex % 2 === 0 ? null : oddRowStyle]}
          >
            {colIndexes.map(colIndex => (
              <View
                key={`col-${rowIndex}-${colIndex}`}
                style={[tokens.layout.cell, cellStyle]}
              >
                <View
                  style={[
                    tokens.layout.mark,
                    markStyle,
                  ]}
                >
                  {image ? (
                    <Image
                      source={{ uri: image.src }}
                      style={imageStyle}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={[
                        textBaseStyle,
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
