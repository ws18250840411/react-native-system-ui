import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TagProps } from '../types';
import { useTheme } from '../theme';
import { Icon } from '../Icon';
import { createTagStyles } from './styles';

export const Tag: React.FC<TagProps> = memo(({
  children,
  variant = 'filled',
  color = 'primary',
  size = 'md',
  shape = 'rounded',
  closable = false,
  disabled = false,
  onClose,
  onPress,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createTagStyles(theme, variant, color, size, shape);
  
  const handleClose = () => {
    if (disabled) return;
    onClose?.();
  };
  
  const handlePress = () => {
    if (disabled) return;
    onPress?.();
  };
  
  const containerStyle = [
    styles.container,
    disabled && styles.disabled,
    style,
  ];
  
  const content = (
    <View style={containerStyle} testID={testID} {...rest}>
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {children}
      </Text>
      
      {closable && (
        <TouchableOpacity
          onPress={handleClose}
          disabled={disabled}
          style={styles.closeButton}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <Icon
            name="close"
            size={styles.closeIcon.fontSize}
            color={styles.text.color}
          />
        </TouchableOpacity>
      )}
    </View>
  );
  
  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
});

Tag.displayName = 'Tag';