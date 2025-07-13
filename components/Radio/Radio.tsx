import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RadioProps } from '../types';
import { useTheme } from '../theme';
import { createRadioStyles } from './styles';

export const Radio: React.FC<RadioProps> = memo(({
  checked = false,
  defaultChecked = false,
  disabled = false,
  size = 'md',
  color,
  label,
  labelPosition = 'right',
  value,
  onChange,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createRadioStyles(theme, size);
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  
  const isChecked = checked !== undefined ? checked : internalChecked;
  
  const handlePress = useCallback(() => {
    if (disabled || isChecked) return;
    
    if (checked === undefined) {
      setInternalChecked(true);
    }
    onChange?.(value);
  }, [disabled, isChecked, checked, onChange, value]);
  
  const radioColor = color || theme.colors.primary;
  
  const radioStyle = [
    styles.radio,
    isChecked && { borderColor: radioColor },
    disabled && styles.radioDisabled,
  ];
  
  const dotStyle = [
    styles.dot,
    { backgroundColor: radioColor },
    !isChecked && styles.dotHidden,
  ];
  
  const containerStyle = [
    styles.container,
    labelPosition === 'left' && styles.containerReverse,
    style,
  ];
  
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
      {...rest}
    >
      <View style={radioStyle}>
        <View style={dotStyle} />
      </View>
      
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
});

Radio.displayName = 'Radio';