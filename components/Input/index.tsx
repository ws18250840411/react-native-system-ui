import React, { forwardRef, useImperativeHandle, useRef, useMemo, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { InputProps } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { responsive } from '../utils';

export interface InputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

const Input = forwardRef<InputRef, InputProps & TextInputProps>((
  {
    value,
    placeholder = '请输入',
    disabled = false,
    error = false,
    multiline = false,
    secureTextEntry = false,
    onChangeText,
    onFocus,
    onBlur,
    style,
    ...restProps
  },
  ref
) => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
  }));

  // 计算样式
  const styles = useMemo(() => {
    const containerStyle: ViewStyle = {
      borderWidth: 1,
      borderColor: error 
        ? theme.colors.danger 
        : isFocused 
        ? theme.colors.primary 
        : theme.colors.border,
      borderRadius: theme.borderRadius.md,
      backgroundColor: disabled ? theme.colors.light : theme.colors.background,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: multiline ? theme.spacing.md : theme.spacing.sm,
      minHeight: multiline ? responsive(80) : responsive(44),
    };

    const inputStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      color: disabled ? theme.colors.textSecondary : theme.colors.text,
      flex: 1,
      textAlignVertical: multiline ? 'top' : 'center',
      padding: 0, // 移除默认padding
    };

    return { containerStyle, inputStyle };
  }, [theme, error, isFocused, disabled, multiline]);

  // 处理焦点事件
  const handleFocus = useCallback((e: any) => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback((e: any) => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  return (
    <View style={[styles.containerStyle, style]}>
      <TextInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        editable={!disabled}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.inputStyle}
        {...restProps}
      />
    </View>
  );
});

Input.displayName = 'Input';

export default React.memo(Input);