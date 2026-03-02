import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import { createHairlineView } from '../../utils/hairline'
import { renderTextOrNode } from '../../utils'
import type { DialogTokens } from '../../components/dialog/tokens'

interface ActionButtonProps { text: React.ReactNode; color?: string; tokens: DialogTokens; dividerPosition?: 'left' | 'right' | 'none'; loading?: boolean; disabled?: boolean; onPress?: () => void }

export const ActionButton = (props: ActionButtonProps) => {
  const { text, color, tokens, dividerPosition = 'none', loading, disabled, onPress } = props
  const txtColor = color ?? tokens.colors.confirm
  const divStyle = dividerPosition === 'none' ? null : [S.btnDiv, { width: 0 }, createHairlineView({ position: dividerPosition, color: tokens.colors.divider, top: 0, bottom: 0, [dividerPosition]: 0 })]
  return <Pressable accessibilityRole="button" disabled={disabled || loading} style={({ pressed }) => [S.btn, { height: tokens.sizes.actionHeight, opacity: pressed && !disabled && !loading ? 0.8 : 1 }]} onPress={disabled || loading ? undefined : onPress}>{divStyle && <View style={divStyle} pointerEvents="none" />}{loading ? <ActivityIndicator size="small" color={txtColor} /> : renderTextOrNode(text ?? '', { color: txtColor, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.actionSize, fontWeight: tokens.typography.actionWeight })}</Pressable>
}

const S = StyleSheet.create({ btn: { flex: 1, alignItems: 'center', justifyContent: 'center' }, btnDiv: { position: 'absolute', pointerEvents: 'none' } })
