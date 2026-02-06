import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { Image, Text, View, useWindowDimensions } from 'react-native'

import type { WaterMarkProps } from './types'
import { isFiniteNumber, isString } from '../../utils'
import { useWaterMarkTokens } from './tokens'

const resolveFiniteNumber = (value: unknown, fallback: number) =>
  isFiniteNumber(value) ? (value as number) : fallback
const resolveNonNegativeNumber = (value: unknown, fallback: number) =>
  Math.max(0, resolveFiniteNumber(value, fallback))
const resolvePositiveNumber = (value: unknown, fallback: number) =>
  Math.max(1, resolveFiniteNumber(value, fallback))

const WaterMarkImpl: React.FC<WaterMarkProps> = props => {
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
  const zIndex = resolveFiniteNumber(zIndexProp, tokens.defaults.zIndex)
  const fullPage = fullPageProp ?? tokens.defaults.fullPage
  const window = useWindowDimensions()
  const [layoutSize, setLayoutSize] = useState({ width: 0, height: 0 })
  const lastLayoutRef = useRef({ width: 0, height: 0 })
  const size = fullPage ? window : layoutSize

  const resolvedGapX = resolveNonNegativeNumber(gapX, tokens.defaults.gapX)
  const resolvedGapY = resolveNonNegativeNumber(gapY, tokens.defaults.gapY)
  const resolvedRotate = resolveFiniteNumber(rotate, tokens.defaults.rotate)
  const resolvedOpacity = Math.max(
    0,
    Math.min(1, resolveFiniteNumber(opacity, tokens.defaults.opacity))
  )

  const fontSizeFromFont = isFiniteNumber(font?.size)
    ? font!.size as number
    : isString(font?.size)
      ? Number.parseFloat(font!.size as string)
      : undefined
  const normalizedFontSize = Math.max(0, resolveFiniteNumber(
    (Number.isFinite(fontSizeFromFont ?? Number.NaN) ? fontSizeFromFont : undefined) ?? fontSize,
    tokens.defaults.fontSize
  ))
  const resolvedColor = font?.color ?? color ?? tokens.colors.mark

  const markWidth = resolvePositiveNumber(image?.width ?? width, tokens.defaults.width)
  const markHeight = resolvePositiveNumber(image?.height ?? height, tokens.defaults.height)
  const cellWidth = Math.max(1, markWidth + resolvedGapX)
  const cellHeight = Math.max(1, markHeight + resolvedGapY)

  const rows = size.height ? Math.ceil(size.height / cellHeight) + 1 : 1
  const cols = size.width ? Math.ceil(size.width / cellWidth) + 1 : 1

  const onLayoutCalculatedRef = useRef(onLayoutCalculated)
  onLayoutCalculatedRef.current = onLayoutCalculated

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
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
    onLayoutCalculatedRef.current?.({ width: nextWidth, height: nextHeight })
  }, [fullPage])

  useEffect(() => {
    if (!fullPage) return
    if (!isFiniteNumber(window.width) || !isFiniteNumber(window.height)) return
    if (window.width <= 0 || window.height <= 0) return
    onLayoutCalculatedRef.current?.({ width: window.width, height: window.height })
  }, [fullPage, window.width, window.height])

  const zIndexStyle = useMemo(() => ({ zIndex }), [zIndex])
  const cellStyle = useMemo(() => ({ width: cellWidth, height: cellHeight }), [cellWidth, cellHeight])
  const oddRowStyle = useMemo(() => ({ paddingLeft: cellWidth / 2 }), [cellWidth])
  const markStyle = useMemo(() => ({
    width: markWidth,
    height: markHeight,
    transform: [{ rotate: `${resolvedRotate}deg` }],
  }), [markWidth, markHeight, resolvedRotate])
  const imageStyle = useMemo(() => ({
    width: markWidth,
    height: markHeight,
    opacity: resolvedOpacity,
  }), [markWidth, markHeight, resolvedOpacity])
  const textBaseStyle = useMemo(() => ({
    fontSize: normalizedFontSize,
    color: resolvedColor,
    opacity: resolvedOpacity,
    fontFamily: font?.family,
    fontWeight: font?.weight,
  }), [normalizedFontSize, resolvedColor, resolvedOpacity, font?.family, font?.weight])
  const rowIndexes = Array.from({ length: rows }, (_, i) => i)
  const colIndexes = Array.from({ length: cols }, (_, i) => i)

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

const WaterMark = React.memo(WaterMarkImpl)
WaterMark.displayName = 'WaterMark'

export default WaterMark
