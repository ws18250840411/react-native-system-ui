import React from 'react'
import { Text, View } from 'react-native'
import { Description, Fail, Search } from 'react-native-system-icon'
import { isRenderable, isString, isText, renderTextOrNode } from '../../utils'
import Image from '../image'
import { useEmptyTokens } from './tokens'
import type { EmptyProps } from './types'

const PRESET_ICONS = { default: Description, error: Fail, network: Fail, search: Search }

const EmptyImpl: React.FC<EmptyProps> = props => {
  const { tokensOverride, image: imageProp, imageSize: imageSizeProp, imageStyle, description, descriptionStyle, children, style, gap: gapProp, ...rest } = props
  const tokens = useEmptyTokens(tokensOverride)
  const image = imageProp ?? tokens.defaults.image
  const gap = gapProp ?? tokens.defaults.gap
  const resolvedImageSize = imageSizeProp ?? tokens.sizing.image
  const renderImage = () => {
    if (React.isValidElement(image)) return <View style={[tokens.layout.imageWrapper, { width: resolvedImageSize, height: resolvedImageSize }, imageStyle]}>{image}</View>
    if (isString(image)) {
      if (/^https?:/.test(image)) return <Image src={image} width={resolvedImageSize} height={resolvedImageSize} fit="contain" showLoading={false} showError={false} containerStyle={[{ backgroundColor: tokens.colors.imageBackground }, imageStyle]} />
      const IconComponent = PRESET_ICONS[image as keyof typeof PRESET_ICONS] || PRESET_ICONS.default
      const iconSize = resolvedImageSize * tokens.sizing.iconScale
      return <View style={[tokens.layout.imageWrapper, { width: resolvedImageSize, height: resolvedImageSize }, imageStyle]}><IconComponent size={iconSize} color={tokens.colors.icon} /></View>
    }
    return null
  }
  const renderDescription = () => {
    if (!isRenderable(description)) return null
    if (isText(description)) return <Text style={[tokens.layout.descriptionText, { marginTop: gap, paddingHorizontal: tokens.spacing.descriptionPaddingHorizontal, color: tokens.colors.description, fontSize: tokens.typography.descriptionSize, lineHeight: tokens.typography.descriptionLineHeight, fontFamily: tokens.typography.descriptionFontFamily, fontWeight: tokens.typography.descriptionFontWeight }, descriptionStyle]}>{description}</Text>
    return <View style={{ marginTop: gap, paddingHorizontal: tokens.spacing.descriptionPaddingHorizontal }}>{description}</View>
  }
  const footerTextStyle = { fontFamily: tokens.typography.descriptionFontFamily, fontSize: tokens.typography.descriptionSize, fontWeight: tokens.typography.descriptionFontWeight }
  return <View accessibilityRole="summary" accessibilityLabel={isText(description) ? String(description) : undefined} style={[tokens.layout.container, style]} {...rest}>{renderImage()}{renderDescription()}{isRenderable(children) && <View style={{ marginTop: tokens.spacing.footerMarginTop }}>{renderTextOrNode(children, footerTextStyle)}</View>}</View>
}

export const Empty = React.memo(EmptyImpl)
Empty.displayName = 'Empty'
