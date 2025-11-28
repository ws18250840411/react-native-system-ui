import React from 'react'
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native'

import type { NumberKeyboardKeyType, NumberKeyboardProps } from './types'
import { useNumberKeyboardTokens } from './tokens'

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
}

const buildKeys = (extraKey?: string | string[], random = false): KeyboardKey[] => {
  const numbers = random ? shuffle(BASE_KEYS.slice(0, 9)) : BASE_KEYS.slice(0, 9)
  const keys: KeyboardKey[] = numbers.map(text => ({ text, type: '' }))
  if (Array.isArray(extraKey)) {
    extraKey.forEach(text => {
      keys.push({ text, type: 'extra' })
    })
    keys.push({ type: 'delete' })
  } else {
    if (extraKey) {
      keys.push({ text: extraKey, type: 'extra' })
    } else {
      keys.push({ text: '', type: 'extra' })
    }
    keys.push({ text: '0', type: '' })
    keys.push({ type: 'delete' })
  }
  return keys
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
    closeButtonText = theme === 'custom' ? '完成' : undefined,
    deleteButtonText,
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
    blurOnClose,
    safeAreaInsetBottom = true,
    numberKeyRender,
    deleteRender,
    extraKeyRender,
    style,
    ...rest
  } = props

  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp ?? '' : internalValue

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

  const keys = React.useMemo(
    () => buildKeys(extraKey, Boolean(randomKeyOrder)),
    [extraKey, randomKeyOrder],
  )

  const handleInput = (text?: string, type?: NumberKeyboardKeyType) => {
    if (type === 'delete') {
      if (!value) return
      onDelete?.()
      const next = value.slice(0, -1)
      changeValue(next)
      return
    }
    if (type === 'close') {
      onClose?.()
      if (blurOnClose) {
        onBlur?.()
      }
      return
    }
    if (!text) return
    if (maxlength !== undefined && value.length >= maxlength) {
      return
    }
    onInput?.(text)
    const next = `${value}${text}`
    changeValue(next)
  }

  const animated = React.useRef(new Animated.Value(visible ? 1 : 0)).current
  React.useEffect(() => {
    Animated.timing(animated, {
      toValue: visible ? 1 : 0,
      duration: props.transition === false ? 0 : 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start()
  }, [animated, visible, props.transition])

  if (!visible && animated.__getValue() === 0) {
    return null
  }

  const translateY = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  })

  return (
    <Animated.View
      {...rest}
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.wrapper,
        style,
        {
          transform: [{ translateY }],
          backgroundColor: tokens.colors.background,
          paddingBottom: safeAreaInsetBottom ? 12 : 0,
        },
      ]}
    >
      {(title || closeButtonText) && (
        <View style={[styles.header, { padding: tokens.spacing.titlePadding }] }>
          <Text style={[styles.title, { color: tokens.colors.title }]}>{title}</Text>
          {closeButtonText ? (
            <Pressable onPress={() => handleInput(undefined, 'close')}>
              <Text style={{ color: tokens.colors.title }}>{closeButtonText}</Text>
            </Pressable>
          ) : null}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: tokens.spacing.paddingHorizontal,
          paddingBottom: tokens.spacing.paddingVertical,
          gap: tokens.spacing.keyGap,
        }}
      >
        {keys.map((key, index) => {
          if (key.type === 'delete' && !showDeleteKey) {
            return null
          }
          const press = () => handleInput(key.text?.toString(), key.type)
          const content = (() => {
            if (key.type === 'delete') {
              if (deleteRender) return deleteRender()
              if (deleteButtonText) {
                return <Text style={styles.keyText}>{deleteButtonText}</Text>
              }
              return <Text style={styles.keyText}>⌫</Text>
            }
            if (key.type === 'extra') {
              const extraText = key.text ?? ''
              if (extraKeyRender) return extraKeyRender(extraText)
              return <Text style={styles.keyText}>{extraText}</Text>
            }
            if (numberKeyRender) {
              return numberKeyRender(key.text ?? '')
            }
            return <Text style={styles.keyText}>{key.text}</Text>
          })()
          return (
            <Pressable
              key={`${key.type}-${index}-${key.text}`}
              style={[
                styles.key,
                {
                  height: tokens.sizing.keyHeight,
                  backgroundColor: tokens.colors.keyBackground,
                  borderRadius: tokens.radii.key,
                  flexBasis: '30%',
                },
              ]}
              onPress={press}
            >
              {content}
            </Pressable>
          )
        })}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  key: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 20,
  },
})

NumberKeyboard.displayName = 'NumberKeyboard'

export default NumberKeyboard
