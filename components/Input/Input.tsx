import React, { memo, useState, useCallback } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { InputProps } from '../types';
import { useTheme } from '../theme';
import { Icon } from '../Icon';
import { createInputStyles } from './styles';

export const Input: React.FC<InputProps> = memo(({
  value,
  defaultValue,
  placeholder,
  type = 'text',
  disabled = false,
  readonly = false,
  clearable = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  error = false,
  errorMessage,
  label,
  required = false,
  textAlign = 'left',
  onChangeText,
  onFocus,
  onBlur,
  onSubmitEditing,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createInputStyles(theme);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  
  const inputValue = value !== undefined ? value : internalValue;
  
  const handleChangeText = useCallback((text: string) => {
    if (value === undefined) {
      setInternalValue(text);
    }
    onChangeText?.(text);
  }, [value, onChangeText]);
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);
  
  const handleClear = useCallback(() => {
    handleChangeText('');
  }, [handleChangeText]);
  
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default';
    }
  };
  
  const containerStyle = [
    styles.container,
    isFocused && styles.focused,
    error && styles.error,
    disabled && styles.disabled,
    style,
  ];
  
  const inputStyle = [
    styles.input,
    multiline && styles.multilineInput,
    { textAlign },
    disabled && styles.inputDisabled,
    error && styles.inputError,
  ];
  
  const showClearButton = clearable && inputValue.length > 0 && !disabled && !readonly;
  
  return (
    <View>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}
      
      <View style={containerStyle}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={error ? theme.colors.danger : theme.colors.textSecondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={inputStyle}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          editable={!disabled && !readonly}
          secureTextEntry={type === 'password'}
          keyboardType={getKeyboardType()}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          testID={testID}
          {...rest}
        />
        
        {showClearButton && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon
              name="close"
              size={16}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !showClearButton && (
          <Icon
            name={rightIcon}
            size={20}
            color={error ? theme.colors.danger : theme.colors.textSecondary}
            style={styles.rightIcon}
          />
        )}
      </View>
      
      {error && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';