import React from 'react'
import { Text, View } from 'react-native'
import { Description, Fail, Search } from '../../internal/icons'
import { isRenderable, isString, isText } from '../../utils/base'
import { renderTextOrNode } from '../../utils/render'
import Image from '../image'
import { useEmptyTokens } from './tokens'
import type { EmptyProps } from './types'

const PRESET_ICONS = { default: Description, error: Fail, network: Fail, search: Search }

const EmptyImpl: React.FC<EmptyProps> = props => {
  const { tokensOverride, image: imgP, imageSize: sizeP, imageStyle, description, descriptionStyle, children, style, gap: gapP, ...rest } = props; const tokens = useEmptyTokens(tokensOverride); const img = imgP ?? tokens.defaults.image; const gap = gapP ?? tokens.defaults.gap; const imgSize = sizeP ?? tokens.sizing.image
  const rImg = () => { if (React.isValidElement(img)) return <View style={[tokens.layout.imageWrapper, { width: imgSize, height: imgSize }, imageStyle]}>{img}</View>; if (isString(img)) { if (/^https?:/.test(img)) return <Image src={img} width={imgSize} height={imgSize} fit="contain" showLoading={false} showError={false} containerStyle={[{ backgroundColor: tokens.colors.imageBackground }, imageStyle]} />; const Icon = PRESET_ICONS[img as keyof typeof PRESET_ICONS] || PRESET_ICONS.default; return <View style={[tokens.layout.imageWrapper, { width: imgSize, height: imgSize }, imageStyle]}><Icon size={imgSize * tokens.sizing.iconScale} color={tokens.colors.icon} /></View> }; return null }
  const rDesc = () => { if (!isRenderable(description)) return null; if (isText(description)) return <Text style={[tokens.layout.descriptionText, { marginTop: gap, paddingHorizontal: tokens.spacing.descriptionPaddingHorizontal, color: tokens.colors.description, fontSize: tokens.typography.descriptionSize, lineHeight: tokens.typography.descriptionLineHeight, fontFamily: tokens.typography.descriptionFontFamily, fontWeight: tokens.typography.descriptionFontWeight }, descriptionStyle]}>{description}</Text>; return <View style={{ marginTop: gap, paddingHorizontal: tokens.spacing.descriptionPaddingHorizontal }}>{description}</View> }; const footStyle = { fontFamily: tokens.typography.descriptionFontFamily, fontSize: tokens.typography.descriptionSize, fontWeight: tokens.typography.descriptionFontWeight }; return <View accessibilityRole="summary" accessibilityLabel={isText(description) ? String(description) : undefined} style={[tokens.layout.container, style]} {...rest}>{rImg()}{rDesc()}{isRenderable(children) && <View style={{ marginTop: tokens.spacing.footerMarginTop }}>{renderTextOrNode(children, footStyle)}</View>}</View>
}

export const Empty = React.memo(EmptyImpl)
Empty.displayName = 'Empty'
