import React from 'react'
import { Platform, Pressable, Text, TextInput, View } from 'react-native'
import type { TextInputProps } from 'react-native'
import { Clear } from '../../internal/icons'
import { isText } from '../../utils/validate'
import type { FieldProps, FieldTooltipProps } from '../../components/field/types'
import type { FieldTokens } from '../../components/field/tokens'
import type { DialogShowOptions } from '../../components/dialog'

export const alignMap: Record<'left' | 'center' | 'right', 'flex-start' | 'center' | 'flex-end'> = { left: 'flex-start', center: 'center', right: 'flex-end' }
export const mapKeyboardType = (type: FieldProps['type']): TextInputProps['keyboardType'] => { switch (type) { case 'number': return 'decimal-pad'; case 'digit': return 'number-pad'; case 'tel': return 'phone-pad'; default: return undefined } }

type FieldSlotProps = { onPress?: () => void; style?: React.ComponentProps<typeof View>['style']; children?: React.ReactNode; accessibilityRole?: React.ComponentProps<typeof Pressable>['accessibilityRole'] }
export const FieldSlot = ({ onPress, style, children, accessibilityRole = 'button' }: FieldSlotProps) => { if (!children) return null; return onPress ? <Pressable onPress={onPress} accessibilityRole={accessibilityRole} style={style}>{children}</Pressable> : <View style={style}>{children}</View> }

type FieldClearButtonProps = { show: boolean; tokens: FieldTokens; clearIcon?: React.ReactNode; onPressIn?: () => void; onPressOut?: () => void; onPress?: () => void }
export const FieldClearButton = ({ show, tokens, clearIcon, onPressIn, onPressOut, onPress }: FieldClearButtonProps) => { if (!show) return null; const webMDProps = Platform.OS === 'web' ? ({ onMouseDown: (e: { preventDefault?: () => void; stopPropagation?: () => void }) => { e.preventDefault?.(); e.stopPropagation?.() } } as unknown as React.ComponentProps<typeof Pressable>) : undefined; return <Pressable style={[tokens.layout.clearIcon, { paddingHorizontal: tokens.spacing.rightIconGap }]} {...webMDProps} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} accessibilityRole="button">{React.isValidElement(clearIcon) ? clearIcon : <Clear size={tokens.sizes.clearIcon} fill={tokens.colors.clear} color={tokens.colors.clear} />}</Pressable> }

type FieldInputProps = { inputRef: React.RefObject<TextInput | null>; tokens: FieldTokens; isTextarea: boolean; disabled: boolean; error: boolean; finalTextAlign: 'left' | 'center' | 'right'; lineHeight: number; textareaHeight?: number; minHeight?: number; inputStyle?: React.ComponentProps<typeof TextInput>['style']; value: string; onChangeText: (text: string) => void; onFocus: (event: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => void; onBlur: (event: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => void; onPressIn: (event: Parameters<NonNullable<TextInputProps['onPressIn']>>[0]) => void; rows: number; placeholderTextColor?: TextInputProps['placeholderTextColor']; keyboardType?: TextInputProps['keyboardType']; onContentSizeChange?: (event: { nativeEvent: { contentSize: { height: number } } }) => void; describedBy?: string[]; secureTextEntry?: boolean; editable: boolean; restInputProps: TextInputProps }
export const FieldInput = ({ inputRef, tokens, isTextarea, disabled, error, finalTextAlign, lineHeight, textareaHeight, minHeight, inputStyle, value, onChangeText, onFocus, onBlur, onPressIn, rows, placeholderTextColor, keyboardType, onContentSizeChange, describedBy, secureTextEntry, editable, restInputProps }: FieldInputProps) => { const inputStyleArray = [isTextarea ? tokens.layout.textarea : tokens.layout.input, { color: disabled ? tokens.colors.disabled : error ? tokens.colors.error : tokens.colors.input, fontSize: tokens.typography.inputSize, textAlign: finalTextAlign, ...(isTextarea ? { lineHeight, height: textareaHeight, minHeight } : { minHeight: tokens.sizes.controlMinHeight }) }, inputStyle]; return <TextInput ref={inputRef} style={inputStyleArray} value={value} onChangeText={onChangeText} onFocus={onFocus} onBlur={onBlur} onPressIn={onPressIn} editable={editable} secureTextEntry={secureTextEntry} multiline={isTextarea} numberOfLines={isTextarea ? rows : undefined} keyboardType={keyboardType} placeholderTextColor={placeholderTextColor} onContentSizeChange={isTextarea ? onContentSizeChange : undefined} {...(describedBy ? ({ accessibilityDescribedBy: describedBy } as any) : null)} clearButtonMode="never" {...restInputProps} /> }

type FieldControlRowProps = { tokens: FieldTokens; prefixNode?: React.ReactNode; leftIconNode?: React.ReactNode; controlNode: React.ReactNode; clearNode?: React.ReactNode; rightIconNode?: React.ReactNode; suffixNode?: React.ReactNode }
export const FieldControlRow = ({ tokens, prefixNode, leftIconNode, controlNode, clearNode, rightIconNode, suffixNode }: FieldControlRowProps) => <View style={tokens.layout.body}>{prefixNode}{leftIconNode}<View style={[tokens.layout.controlWrapper, { minHeight: tokens.sizes.controlMinHeight }]}>{controlNode}{clearNode}</View>{rightIconNode}{suffixNode}</View>

export const resolveTooltipDialog = (tooltip: React.ReactNode | FieldTooltipProps, defaultIcon: React.ReactNode): { icon: React.ReactNode; dialogProps: DialogShowOptions } => {
  if (!React.isValidElement(tooltip) && !isText(tooltip)) {
    const { icon: customIcon, ...rest } = tooltip as FieldTooltipProps
    return { icon: customIcon ?? defaultIcon, dialogProps: rest as DialogShowOptions }
  }
  return { icon: defaultIcon, dialogProps: { message: tooltip as React.ReactNode } }
}
