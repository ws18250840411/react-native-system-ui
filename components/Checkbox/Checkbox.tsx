import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckboxProps } from '../types';
import { useTheme } from '../theme';
import { Icon } from '../Icon';
import { createCheckboxStyles } from './styles';

export const Checkbox: React.FC<CheckboxProps> = memo(({
  checked = false,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  size = 'md',
  color,
  label,
  labelPosition = 'right',
  onChange,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createCheckboxStyles(theme, size);
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  
  const isChecked = checked !== undefined ? checked : internalChecked;
  
  const handlePress = useCallback(() => {
    if (disabled) return;
    
    const newChecked = !isChecked;
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  }, [disabled, isChecked, checked, onChange]);
  
  const checkboxColor = color || theme.colors.primary;
  
  const checkboxStyle = [
    styles.checkbox,
    isChecked && { backgroundColor: checkboxColor, borderColor: checkboxColor },
    indeterminate && { backgroundColor: checkboxColor, borderColor: checkboxColor },
    disabled && styles.checkboxDisabled,
  ];
  
  const containerStyle = [
    styles.container,
    labelPosition === 'left' && styles.containerReverse,
    style,
  ];
  
  const getIconName = () => {
    if (indeterminate) return 'minus';
    return isChecked ? 'check' : '';
  };
  
  const iconName = getIconName();
  
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
      {...rest}
    >
      <View style={checkboxStyle}>
        {iconName && (
          <Icon
            name={iconName}
            size={styles.icon.fontSize}
            color={theme.colors.background}
          />
        )}
      </View>
      
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
});

Checkbox.displayName = 'Checkbox';