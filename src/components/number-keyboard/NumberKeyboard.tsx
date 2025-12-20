import React from 'react'
import { Animated, Easing, Platform, Pressable, SafeAreaView, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native'

import { createPlatformShadow } from '../../utils/createPlatformShadow'
import Loading from '../loading'
import Portal from '../portal/Portal'
import type { NumberKeyboardKeyType, NumberKeyboardProps } from './types'
import { useNumberKeyboardTokens } from './tokens'

const keyboardRegistry = new Set<() => void>()

const BASE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

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

const NumberKeyboard: React.FC<NumberKeyboardProps> = props => {
  const tokens = useNumberKeyboardTokens()
  const {
    visible,
    title,
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
    value: valueProp,
    defaultValue = '',
    maxlength,
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

  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp ?? '' : internalValue

  const resolvedCloseText = React.useMemo(() => {
    if (theme === 'custom') return closeButtonText ?? '完成'
    return closeButtonText
  }, [closeButtonText, theme])

  const closeSelf = React.useCallback(() => {
    onClose?.()
    if (blurOnClose) {
      onBlur?.()
    }
  }, [blurOnClose, onBlur, onClose])

  const changeValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  const prevVisible = React.useRef(visible)
  React.useEffect(() => {
    if (visible && !prevVisible.current) {
      onShow?.()
    }
    if (!visible && prevVisible.current) {
      onHide?.()
    }
    prevVisible.current = visible
  }, [visible, onShow, onHide])

  // 仅允许一个键盘可见：当本实例显示时，通知其他实例关闭
  React.useEffect(() => {
    if (visible) {
      keyboardRegistry.add(closeSelf)
      // 关闭其他已注册的键盘
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

  const keys = React.useMemo(() => {
    const shouldShuffle = Boolean(randomKeyOrder) && visible
    const numbers = shouldShuffle ? shuffle(BASE_KEYS.slice(0, 9)) : BASE_KEYS.slice(0, 9)
    const main: KeyboardKey[] = numbers.map(text => ({ text, type: '' }))

    if (theme === 'custom') {
      const extras = Array.isArray(extraKey) ? extraKey : extraKey ? [extraKey] : []
      if (extras.length === 1) {
        main.push({ text: '0', type: '', wider: true }, { text: extras[0], type: 'extra' })
      } else if (extras.length >= 2) {
        main.push(
          { text: extras[0], type: 'extra' },
          { text: '0', type: '' },
          { text: extras[1], type: 'extra' },
        )
      } else {
        main.push({ text: '0', type: '' })
      }
      return main
    }

    const normalizedExtra = Array.isArray(extraKey) ? extraKey[0] ?? '' : extraKey ?? ''
    main.push({ text: normalizedExtra, type: 'extra' })
    main.push({ text: '0', type: '' })
    main.push({ type: showDeleteKey ? 'delete' : '', text: showDeleteKey ? undefined : '' })
    return main
  }, [extraKey, randomKeyOrder, showDeleteKey, theme, visible])

  const handleInput = React.useCallback((text?: string, type?: NumberKeyboardKeyType) => {
    if (type === 'delete') {
      if (!value) return
      onDelete?.()
      const next = value.slice(0, -1)
      changeValue(next)
      return
    }
    if (type === 'close') {
      closeSelf()
      return
    }
    if (type === 'extra' && !text) {
      closeSelf()
      return
    }
    if (!text) return
    if (maxlength !== undefined && value.length >= maxlength) {
      return
    }
    onInput?.(text)
    const next = `${value}${text}`
    changeValue(next)
  }, [changeValue, closeSelf, maxlength, onDelete, onInput, value])

  const wrapperShadow = React.useMemo(
    () =>
      createPlatformShadow({
        color: '#000000',
        opacity: 0.08,
        radius: 6,
        offsetY: 0,
        elevation: 6,
      }),
    []
  )

  const getKeyContent = React.useCallback((key: KeyboardKey) => {
    if (key.type === 'delete') {
      if (deleteRender) return deleteRender()
      return deleteButtonText ?? '⌫'
    }
    if (key.type === 'extra') {
      const extraText = key.text ?? ''
      if (extraKeyRender) return extraKeyRender(extraText)
      return extraText || '⌨︎'
    }
    if (key.type === 'close') {
      return resolvedCloseText ?? '完成'
    }
    const keyText = key.text ?? ''
    if (numberKeyRender) {
      return numberKeyRender(keyText)
    }
    return keyText
  }, [deleteButtonText, deleteRender, extraKeyRender, numberKeyRender, resolvedCloseText])

  const renderKey = (
    key: KeyboardKey,
    index: number,
    options?: { isClose?: boolean },
  ) => {
    const isClose = options?.isClose
    const isPlaceholder = key.type === '' && !key.text
    const disabled = isPlaceholder || (isClose && closeButtonLoading)
    const onPress = disabled ? undefined : () => handleInput(key.text?.toString(), key.type)
    const backgroundColor = isClose ? tokens.colors.closeBackground : tokens.colors.keyBackground
    const activeBackground = tokens.colors.keyActiveBackground
    const inactiveTextColor = isClose ? tokens.colors.closeText : tokens.colors.keyText
    const pressedTextColor = isClose ? tokens.colors.closeText : tokens.colors.keyTextActive

    const contentNode = getKeyContent(key)

    return (
      <Pressable
        key={`${key.type}-${index}-${key.text ?? index}`}
        onPress={onPress}
        disabled={disabled}
        style={[
          {
            flexBasis: key.wider ? '64%' : '30%',
            flexGrow: key.wider ? 2 : 1,
            opacity: isPlaceholder ? 1 : disabled ? 0.6 : 1,
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
                  ? key.text ?? 'collapse'
                  : key.text
        }
        accessibilityState={isPlaceholder ? undefined : { disabled: !!disabled }}
        accessibilityElementsHidden={isPlaceholder}
        importantForAccessibility={isPlaceholder ? 'no-hide-descendants' : undefined}
      >
        {({ pressed }) => {
          const isPressed = pressed && !disabled
          const keyBackground = disabled
            ? tokens.colors.keyBackground
            : isPressed
              ? activeBackground
              : backgroundColor
          const textColor = isPressed ? pressedTextColor : inactiveTextColor

          return (
            <View
              style={[
                styles.key,
                {
                  height: isClose ? tokens.sizing.closeHeight : tokens.sizing.keyHeight,
                  backgroundColor: keyBackground,
                  borderRadius: tokens.radii.key,
                },
              ]}
            >
              {isClose && closeButtonLoading ? (
                <Loading size={18} color={textColor} />
              ) : React.isValidElement(contentNode) ? (
                contentNode
              ) : (
                <Text style={[styles.keyText, { color: textColor, fontSize: tokens.sizing.fontSize }]}>
                  {contentNode as any}
                </Text>
              )}
            </View>
          )
        }}
      </Pressable>
    )
  }

  const animated = React.useRef(new Animated.Value(visible ? 1 : 0)).current
  const [contentHeight, setContentHeight] = React.useState(0)
  const [shouldRender, setShouldRender] = React.useState(visible)

  const effectiveDuration = transition === false ? 0 : transitionDuration

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true)
    }
    Animated.timing(animated, {
      toValue: visible ? 1 : 0,
      duration: effectiveDuration,
      useNativeDriver: Platform.OS !== 'web',
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
    }).start(({ finished }) => {
      if (finished && !visible) {
        setShouldRender(false)
      }
    })
  }, [animated, visible, effectiveDuration])

  const translateY = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [contentHeight || 320, 0],
  })

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout
    if (Math.abs(height - contentHeight) > 0.5) {
      setContentHeight(height)
    }
  }

  if (!shouldRender && !visible) {
    return null
  }

  const keyboardNode = (
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
          backgroundColor: tokens.colors.background,
        },
      ]}
    >
      {(title || closeButtonText) && theme === 'default' && (
        <View style={[styles.header, { paddingHorizontal: tokens.spacing.titlePadding }]}>
          <Text
            style={[styles.title, styles.titleOverlay, { color: tokens.colors.title }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {resolvedCloseText ? (
            <Pressable
              onPress={() => handleInput(undefined, 'close')}
              style={styles.headerClose}
              accessibilityRole="button"
              accessibilityLabel={resolvedCloseText}
            >
              <Text style={{ color: tokens.colors.title }}>{resolvedCloseText}</Text>
            </Pressable>
          ) : null}
        </View>
      )}

      {theme === 'custom' ? (
        <View
          style={[
            styles.customRow,
            {
              paddingHorizontal: tokens.spacing.paddingHorizontal,
              paddingBottom: tokens.spacing.paddingVertical,
              gap: tokens.spacing.keyGap,
            },
          ]}
        >
          <View style={[styles.customMain, { gap: tokens.spacing.keyGap }]}>
            {keys.map((key, index) => renderKey(key, index))}
          </View>
          <View style={[styles.customSidebar, { gap: tokens.spacing.keyGap }]}>
            {showDeleteKey
              ? renderKey({ type: 'delete' }, 999)
              : null}
            {renderKey({ type: 'close', text: resolvedCloseText }, 1000, { isClose: true })}
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: tokens.spacing.paddingHorizontal,
            paddingBottom: tokens.spacing.paddingVertical,
            gap: tokens.spacing.keyGap,
          }}
        >
          {keys.map((key, index) => renderKey(key, index))}
        </View>
      )}

      {safeAreaInsetBottom ? <SafeAreaView style={{ width: '100%' }} /> : null}
    </Animated.View>
  )

  return <Portal>{keyboardNode}</Portal>
}

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
    fontSize: 16,
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
    justifyContent: 'space-between',
  },
})

NumberKeyboard.displayName = 'NumberKeyboard'

export default NumberKeyboard
