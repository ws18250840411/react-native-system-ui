import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { InputProps } from '../types';
import { createInputStyle } from '../utils';

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
    return createInputStyle({
      size: 'medium',
      error,
      isFocused,
      disabled,
      multiline,
      theme
    });
  }, [error, isFocused, disabled, multiline, theme]);

  // 处理焦点事件
  const handleFocus = React.useCallback((e: any) => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = React.useCallback((e: any) => {
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