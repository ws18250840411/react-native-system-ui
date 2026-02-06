import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Easing, Pressable, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native'

import { useControllableValue } from '../../hooks'
import { nativeDriverEnabled } from '../../platform'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { parseNumberLike } from '../../utils/number'
import Loading from '../loading'
import Portal from '../portal/Portal'
import { SafeAreaView } from '../safe-area-view'
import type { NumberKeyboardKeyType, NumberKeyboardProps } from './types'
import { useNumberKeyboardTokens } from './tokens'

const keyboardRegistry = new Set<() => void>()

const NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const ZERO_KEY = '0'

const shuffle = <T,>(list: T[]) => {
  const next = [...list]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

interface KeyboardKey {
  text?: string
  type: NumberKeyboardKeyType
  wider?: boolean
}

const NumberKeyboard = React.memo((props: NumberKeyboardProps) => {
  const {
    visible,
    title,
    tokensOverride,
    theme = 'default',
    extraKey,
    randomKeyOrder,
    showDeleteKey = true,
    closeButtonText,
    deleteButtonText,
    closeButtonLoading,
    onChange,
    onInput,
    onDelete,
    onClose,
    onBlur,
    onHide,
    onShow,
    value: _value,
    defaultValue: _defaultValue,
    maxlength: maxlengthProp,
    blurOnClose = true,
    safeAreaInsetBottom = true,
    transition = true,
    transitionDuration = 300,
    numberKeyRender,
    deleteRender,
    extraKeyRender,
    style,
    ...rest
  } = props

  const tokens = useNumberKeyboardTokens(tokensOverride)
  const { colors, radii, shadow, sizing, spacing } = tokens

  const [mergedValue, setMergedValue] = useControllableValue<string>(props, {
    defaultValue: '',
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })
  const value = mergedValue ?? ''
  const parsedMaxlength = parseNumberLike(maxlengthProp, undefined)
  const maxlength = parsedMaxlength !== undefined && Number.isFinite(parsedMaxlength) && parsedMaxlength >= 0
    ? Math.floor(parsedMaxlength)
    : undefined
  const valueRef = useRef(value)
  const maxlengthRef = useRef(maxlength)
  valueRef.current = value
  maxlengthRef.current = maxlength

  const isCustomTheme = theme === 'custom'
  const resolvedCloseText = isCustomTheme ? closeButtonText ?? '完成' : closeButtonText

  const closeSelf = useCallback(() => {
    onClose?.()
    if (blurOnClose) {
      onBlur?.()
    }
  }, [blurOnClose, onBlur, onClose])

  const prevVisible = useRef(visible)
  useEffect(() => {
    if (visible && !prevVisible.current) {
      onShow?.()
    }
    if (!visible && prevVisible.current) {
      onHide?.()
    }
    prevVisible.current = visible
  }, [visible, onShow, onHide])

  useEffect(() => {
    if (visible) {
      keyboardRegistry.add(closeSelf)
      keyboardRegistry.forEach(fn => {
        if (fn !== closeSelf) {
          fn()
        }
      })
    } else {
      keyboardRegistry.delete(closeSelf)
    }
    return () => {
      keyboardRegistry.delete(closeSelf)
    }
  }, [visible, closeSelf])

  const keys = useMemo(() => {
    const shouldShuffle = randomKeyOrder && visible
    const numbers = shouldShuffle ? shuffle(NUMBER_KEYS) : NUMBER_KEYS
    const main: KeyboardKey[] = numbers.map(text => ({ text, type: '' }))

    if (isCustomTheme) {
      const extras = Array.isArray(extraKey) ? extraKey : extraKey ? [extraKey] : []
      if (extras.length === 1) {
        main.push({ text: ZERO_KEY, type: '', wider: true }, { text: extras[0], type: 'extra' })
      } else if (extras.length >= 2) {
        main.push(
          { text: extras[0], type: 'extra' },
          { text: ZERO_KEY, type: '' },
          { text: extras[1], type: 'extra' },
        )
      } else {
        main.push({ text: ZERO_KEY, type: '' })
      }
      return main
    }

    const normalizedExtra = Array.isArray(extraKey) ? extraKey[0] ?? '' : extraKey ?? ''
    main.push({ text: normalizedExtra, type: 'extra' })
    main.push({ text: ZERO_KEY, type: '' })
    main.push({ type: showDeleteKey ? 'delete' : '', text: showDeleteKey ? undefined : '' })
    return main
  }, [extraKey, isCustomTheme, randomKeyOrder, showDeleteKey, visible])

  const handleInput = useCallback(
    (text?: string, type?: NumberKeyboardKeyType) => {
      if (type === 'delete') {
        const currentValue = valueRef.current
        if (!currentValue) return
        onDelete?.()
        setMergedValue(currentValue.slice(0, -1))
        return
      }
      if (type === 'close' || (type === 'extra' && !text)) {
        closeSelf()
        return
      }
      if (!text) return
      const currentValue = valueRef.current
      const currentMaxlength = maxlengthRef.current
      if (currentMaxlength !== undefined && currentValue.length >= currentMaxlength) return
      onInput?.(text)
      setMergedValue(`${currentValue}${text}`)
    },
    [closeSelf, onDelete, onInput, setMergedValue],
  )

  const wrapperShadow = useMemo(() => createPlatformShadow(shadow), [shadow.color, shadow.elevation, shadow.offsetY, shadow.opacity, shadow.radius])

  const renderKey = useCallback(
    (key: KeyboardKey, index: number, isClose = false, fullWidth = false, customHeight?: number) => {
      const isPlaceholder = key.type === '' && !key.text
      const disabled = isPlaceholder || (isClose && closeButtonLoading)
      const onPress = disabled ? undefined : () => handleInput(key.text, key.type)
      const backgroundColor = isClose ? colors.closeBackground : colors.keyBackground
      const activeBackground = isClose ? colors.closeActiveBackground : colors.keyActiveBackground
      const inactiveTextColor = isClose ? colors.closeText : colors.keyText
      const pressedTextColor = isClose ? colors.closeText : colors.keyTextActive
      const keyHeight = customHeight ?? (isClose ? sizing.closeHeight : sizing.keyHeight)
      const actionFontSize = Math.round(sizing.fontSize * 0.64)
      const textFontSize =
        key.type === 'close' || key.type === 'extra' || key.type === 'delete'
          ? actionFontSize
          : sizing.fontSize

      const keyText = key.text ?? ''
      const contentNode =
        key.type === 'delete'
          ? deleteRender?.() ?? deleteButtonText ?? '⌫'
          : key.type === 'extra'
            ? extraKeyRender
              ? extraKeyRender(keyText)
              : keyText || '⌨︎'
            : key.type === 'close'
              ? resolvedCloseText ?? '完成'
              : numberKeyRender
                ? numberKeyRender(keyText)
                : keyText

      return (
        <Pressable
          key={`${key.type}-${index}-${key.text ?? index}`}
          onPress={onPress}
          disabled={disabled}
          style={[
            {
              opacity: isPlaceholder ? 1 : disabled ? 0.6 : 1,
            },
            fullWidth
              ? { width: '100%', flexBasis: 'auto' as unknown as number, flexGrow: 0, alignSelf: 'stretch' }
              : {
                flexBasis: 0,
                flexGrow: key.wider ? 2 : 1,
                flexShrink: 1,
                minWidth: 0,
              },
          ]}
          accessible={!isPlaceholder}
          accessibilityRole={isPlaceholder ? undefined : 'button'}
          accessibilityLabel={
            isPlaceholder
              ? undefined
              : key.type === 'delete'
                ? 'delete'
                : key.type === 'close'
                  ? resolvedCloseText ?? 'close'
                  : key.type === 'extra'
                    ? keyText || 'collapse'
                    : keyText
          }
          accessibilityState={isPlaceholder ? undefined : { disabled: !!disabled }}
          accessibilityElementsHidden={isPlaceholder}
          importantForAccessibility={isPlaceholder ? 'no-hide-descendants' : undefined}
        >
          {({ pressed }) => {
            const isPressed = pressed && !disabled
            const keyBackground = disabled
              ? colors.keyBackground
              : isPressed
                ? activeBackground
                : backgroundColor
            const textColor = isPressed ? pressedTextColor : inactiveTextColor

            return (
              <View
                style={[
                  styles.key,
                  {
                    height: keyHeight,
                    backgroundColor: keyBackground,
                    borderRadius: radii.key,
                  },
                ]}
              >
                {isClose && closeButtonLoading ? (
                  <Loading size={18} color={textColor} />
                ) : typeof contentNode === 'string' || typeof contentNode === 'number' ? (
                  <Text style={[styles.keyText, { color: textColor, fontSize: textFontSize }]}>
                    {contentNode}
                  </Text>
                ) : contentNode == null || contentNode === false ? null : (
                  contentNode
                )}
              </View>
            )
          }}
        </Pressable>
      )
    },
    [
      closeButtonLoading,
      colors.closeActiveBackground,
      colors.closeBackground,
      colors.closeText,
      colors.keyActiveBackground,
      colors.keyBackground,
      colors.keyText,
      colors.keyTextActive,
      deleteButtonText,
      deleteRender,
      extraKeyRender,
      handleInput,
      numberKeyRender,
      radii.key,
      sizing.closeHeight,
      sizing.fontSize,
      sizing.keyHeight,
      resolvedCloseText,
    ],
  )

  const animated = useRef(new Animated.Value(visible ? 1 : 0)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)
  const animationSeqRef = useRef(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [shouldRender, setShouldRender] = useState(visible)

  const effectiveDuration = transition === false ? 0 : transitionDuration

  useEffect(() => {
    animationSeqRef.current += 1
    const currentSeq = animationSeqRef.current
    if (visible) {
      setShouldRender(true)
    }
    animationRef.current?.stop()
    const animation = Animated.timing(animated, {
      toValue: visible ? 1 : 0,
      duration: effectiveDuration,
      useNativeDriver: nativeDriverEnabled,
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
    })
    animationRef.current = animation
    animation.start(({ finished }) => {
      if (finished && !visible && animationSeqRef.current === currentSeq) {
        setShouldRender(false)
      }
    })
    return () => {
      animationRef.current?.stop()
      animationRef.current = null
    }
  }, [animated, visible, effectiveDuration])

  const translateY = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [contentHeight || 320, 0],
  })

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout
    setContentHeight(prev => (Math.abs(height - prev) > 0.5 ? height : prev))
  }, [])

  const hasHeader = !isCustomTheme && (title || closeButtonText)
  const doubleKeyHeight = sizing.keyHeight * 2 + spacing.keyGap
  const memo = useMemo(() => {
    const headerPaddingStyle = { paddingHorizontal: spacing.titlePadding }
    const defaultContainerStyle = [
      styles.defaultRow,
      {
        flexDirection: 'column' as const,
        flexWrap: 'nowrap' as const,
        paddingHorizontal: spacing.paddingHorizontal,
        paddingTop: spacing.keyGap,
        paddingBottom: spacing.keyGap,
        gap: spacing.keyGap,
      },
    ]
    const defaultLineStyle = { flexDirection: 'row' as const, gap: spacing.keyGap }

    const customRowStyle = [
      styles.customRow,
      {
        paddingHorizontal: spacing.paddingHorizontal,
        paddingTop: hasHeader ? 0 : spacing.keyGap,
        paddingBottom: spacing.keyGap,
        width: '100%' as const,
      },
    ]
    const customMainStyle = [
      styles.customMain,
      {
        flexDirection: 'column' as const,
        flexWrap: 'nowrap' as const,
        gap: spacing.keyGap,
      },
    ]
    const customSidebarStyle = [
      styles.customSidebar,
      { gap: spacing.keyGap, marginLeft: spacing.keyGap },
    ]

    const entries: Array<{ key: KeyboardKey; index: number }> = keys.map((key, index) => ({ key, index }))
    const defaultLines: Array<Array<{ key: KeyboardKey; index: number }>> = []
    for (let i = 0; i < entries.length; i += 3) {
      defaultLines.push(entries.slice(i, i + 3))
    }
    const defaultNode = (
      <View style={defaultContainerStyle}>
        {defaultLines.map((line, lineIndex) => (
          <View key={`l-${lineIndex}`} style={defaultLineStyle}>
            {line.map(item => renderKey(item.key, item.index))}
          </View>
        ))}
      </View>
    )

    const customLines: Array<Array<{ key: KeyboardKey; index: number }>> = []
    for (let i = 0; i < 9 && i < entries.length; i += 3) {
      customLines.push(entries.slice(i, i + 3))
    }
    const tail = entries.slice(9)
    if (tail.length === 1) {
      customLines.push([
        { key: { type: '' }, index: 1000001 },
        tail[0],
        { key: { type: '' }, index: 1000002 },
      ])
    } else if (tail.length) {
      customLines.push(tail)
    }
    const customMainNode = (
      <View style={customMainStyle}>
        {customLines.map((line, lineIndex) => (
          <View key={`cl-${lineIndex}`} style={defaultLineStyle}>
            {line.map(item => renderKey(item.key, item.index))}
          </View>
        ))}
      </View>
    )
    const deleteNode = showDeleteKey
      ? renderKey({ type: 'delete' }, 999, false, true, doubleKeyHeight)
      : null
    const closeNode = renderKey({ type: 'close' }, 1000, true, true, doubleKeyHeight)
    const headerNode = hasHeader ? (
      <View style={[styles.header, headerPaddingStyle]}>
        <Text
          style={[
            styles.title,
            styles.titleOverlay,
            { color: colors.title, fontSize: sizing.titleFontSize },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {resolvedCloseText ? (
          <Pressable
            onPress={closeSelf}
            style={styles.headerClose}
            accessibilityRole="button"
            accessibilityLabel={resolvedCloseText}
          >
            <Text style={{ color: colors.title }}>{resolvedCloseText}</Text>
          </Pressable>
        ) : null}
      </View>
    ) : null
    const bodyNode = isCustomTheme ? (
      <View style={customRowStyle}>
        {customMainNode}
        <View style={customSidebarStyle}>
          {deleteNode}
          {closeNode}
        </View>
      </View>
    ) : (
      defaultNode
    )
    const safeAreaNode = safeAreaInsetBottom && <SafeAreaView edge="bottom" />
    return { headerNode, bodyNode, safeAreaNode }
  }, [
    closeSelf,
    colors.title,
    doubleKeyHeight,
    extraKeyRender,
    hasHeader,
    isCustomTheme,
    keys,
    renderKey,
    resolvedCloseText,
    safeAreaInsetBottom,
    sizing.titleFontSize,
    spacing.keyGap,
    spacing.paddingHorizontal,
    spacing.titlePadding,
    title,
  ])

  if (!shouldRender && !visible) {
    return null
  }

  return (
    <Portal>
      <Animated.View
        {...rest}
        pointerEvents={visible ? 'auto' : 'none'}
        onLayout={handleLayout}
        style={[
          styles.wrapper,
          wrapperShadow,
          style,
          {
            transform: [{ translateY }],
            backgroundColor: colors.background,
          },
        ]}
      >
        {memo.headerNode}
        {memo.bodyNode}
        {memo.safeAreaNode}
      </Animated.View>
    </Portal>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 44,
    position: 'relative',
  },
  title: {
    fontWeight: '600',
  },
  titleOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    textAlign: 'center',
  },
  headerClose: {
    minWidth: 56,
    alignItems: 'flex-end',
  },
  key: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    includeFontPadding: false,
    textAlign: 'center',
  },
  defaultRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  customRow: {
    flexDirection: 'row',
  },
  customMain: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  customSidebar: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
})

NumberKeyboard.displayName = 'NumberKeyboard'

export default NumberKeyboard
