import React, { useContext, useMemo } from 'react'
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native'
import { Arrow } from 'react-native-system-icon'
import { useAriaPress, useHairline } from '../../hooks'
import { isRenderable, isText, renderTextOrNode } from '../../utils'
import { useDirection } from '../config-provider/useDirection'
import { CellGroupContext } from './CellContext'
import { useCellTokens } from './tokens'
import type { CellProps } from './types'

const CellImpl = (props: CellProps, ref: React.ForwardedRef<React.ElementRef<typeof Pressable>>) => {
  const { title, value, label, extra, icon, rightIcon, border: borderP, clickable, isLink, required, center, size: sizeP, arrowDirection: arrP, tokensOverride, children, style, titleStyle, valueStyle, labelStyle, contentStyle, onPress, disabled, android_ripple, ...rest } = props
  const tokens = useCellTokens(tokensOverride); const dir = useDirection(); const grp = useContext(CellGroupContext); const border = borderP ?? tokens.defaults.border; const size = sizeP ?? tokens.defaults.size
  const arrRaw = arrP ?? tokens.defaults.arrowDirection; const arr = dir === 'rtl' ? (arrRaw === 'left' ? 'right' : arrRaw === 'right' ? 'left' : arrRaw) : arrRaw; const lh = tokens.typography.lineHeight
  const hasT = isRenderable(title); const hasV = isRenderable(value); const hasL = isRenderable(label); const hasE = isRenderable(extra); const hasCh = isRenderable(children); const hasI = isRenderable(icon); const hasRI = isRenderable(rightIcon)
  const onlyV = !hasT && !hasCh; const showB = border && grp.border && !grp.isLast; const showArr = !!isLink || !!clickable; const inter = !disabled && (clickable || !!onPress || !!rest.onLongPress || !!rest.onPressIn || !!rest.onPressOut); const large = size === 'large'
  const ctrStyle = useMemo<StyleProp<ViewStyle>>(() => [large ? tokens.layout.containerLarge : tokens.layout.container, center && tokens.layout.center, style], [size, center, tokens.layout, style]); const hair = useHairline({ show: showB, containerStyle: ctrStyle, color: tokens.colors.border, width: tokens.borders.width, defaultPaddingHorizontal: tokens.sizing.paddingHorizontal })
  const cntStyle = useMemo(() => [tokens.layout.customContent, { justifyContent: (center ? 'center' : 'flex-start') as ViewStyle['justifyContent'] }, contentStyle], [center, tokens.layout.customContent, contentStyle]); const { interactionProps, states } = useAriaPress({ disabled: !inter, onPress: onPress ?? undefined }); const Comp = inter ? Pressable : View; const compProps = inter ? { android_ripple: android_ripple ?? { color: tokens.colors.ripple }, accessibilityRole: 'button' as const, ...interactionProps } : {}
  return (
    <Comp ref={ref} style={[ctrStyle, inter && states.pressed && { opacity: tokens.defaults.activeOpacity }]} {...compProps} {...rest}>
      {hasI && <View style={[tokens.layout.iconWrapper, { marginRight: tokens.spacing.iconGap, minHeight: tokens.sizing.iconSize, minWidth: tokens.sizing.iconSize }]}>{icon}</View>}
      <View style={tokens.layout.body}>
        {(hasT || required) && <View style={[tokens.layout.titleRow, { minHeight: lh }]}>{required && <Text style={{ color: tokens.colors.required, marginRight: tokens.spacing.iconGap / 2 }}>*</Text>}{hasT && <View style={titleStyle as StyleProp<ViewStyle>}>{renderTextOrNode(title, [{ color: tokens.colors.title, fontSize: large ? tokens.typography.largeTitleSize : tokens.typography.titleSize, fontWeight: tokens.typography.titleWeight }, titleStyle], { numberOfLines: 1 })}</View>}</View>}
        {hasL && <View style={[{ marginTop: tokens.spacing.labelMarginTop }, labelStyle as StyleProp<ViewStyle>]}>{renderTextOrNode(label, [{ color: tokens.colors.label, fontSize: large ? tokens.typography.largeLabelSize : tokens.typography.labelSize }, labelStyle], { numberOfLines: 2 })}</View>}
      </View>
      <View style={[tokens.layout.valueContainer, { minHeight: lh, marginLeft: tokens.spacing.valueGap }, !center && onlyV && tokens.layout.valueOnlyContainer, center && tokens.layout.valueCenter]}>
        {hasV ? <View style={cntStyle}>{renderTextOrNode(value, [tokens.layout.value, onlyV && tokens.layout.valueOnly, { color: tokens.colors.value, fontSize: large ? tokens.typography.largeValueSize : tokens.typography.valueSize }, valueStyle], { numberOfLines: 1 })}</View> : hasCh && <View style={cntStyle}>{isText(children) ? renderTextOrNode(children, [tokens.layout.value, { color: tokens.colors.value, fontSize: large ? tokens.typography.largeValueSize : tokens.typography.valueSize }, valueStyle]) : children}</View>}
      </View>
      {hasE && <View style={{ marginLeft: tokens.spacing.extraGap }}>{renderTextOrNode(extra, { marginLeft: tokens.spacing.extraGap, color: tokens.colors.value, fontSize: large ? tokens.typography.largeValueSize : tokens.typography.valueSize })}</View>}
      {hasRI ? rightIcon : showArr && <View style={[tokens.layout.rightIconWrapper, tokens.layout.arrowTransforms[arr]]}><Arrow size={tokens.sizing.arrowSize} fill={tokens.colors.arrow} /></View>}
      {hair}
    </Comp>
  )
}

const CellForwardRef = React.forwardRef<React.ElementRef<typeof Pressable>, CellProps>(CellImpl)
CellForwardRef.displayName = 'Cell'
export const Cell = React.memo(CellForwardRef)
