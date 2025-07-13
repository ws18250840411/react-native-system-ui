import React, { memo, useState, useCallback } from 'react';
import { TouchableOpacity, TouchableHighlight, Text, ActivityIndicator, View } from 'react-native';
import { ButtonProps } from '../types';
import { useTheme } from '../theme';
import { Icon } from '../Icon/Icon';
import { createButtonStyles } from './styles';

export const Button: React.FC<ButtonProps> = memo(({
  title,
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  shape = 'round',
  disabled = false,
  loading = false,
  block = false,
  plain = false,
  icon,
  iconPosition = 'left',
  activeStyle,
  onPress,
  onPressIn,
  onPressOut,
  children,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createButtonStyles(theme, color, plain);
  const [pressIn, setPressIn] = useState(false);

  const handlePress = useCallback(() => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  }, [disabled, loading, onPress]);

  const handlePressIn = useCallback(() => {
    setPressIn(true);
    if (onPressIn) {
      onPressIn();
    }
  }, [onPressIn]);

  const handlePressOut = useCallback(() => {
    setPressIn(false);
    if (onPressOut) {
      onPressOut();
    }
  }, [onPressOut]);

  const buttonStyle = [
    styles.base,
    styles[variant],
    !plain && styles[`${variant}_${color}`],
    plain && styles[`plain_${variant}`],
    plain && styles[`plain_${variant}_${color}`],
    styles[size],
    styles[shape],
    block && styles.block,
    disabled && styles.disabled,
    pressIn && styles[`${variant}_pressed`],
    style,
  ];

  const textStyle = [
    styles.textBase,
    styles[`text_${variant}`],
    !plain && styles[`text_${variant}_${color}`],
    plain && styles[`text_plain_${variant}_${color}`],
    styles[`text_${size}`],
    disabled && styles.textDisabled,
  ];

  const getIconColor = () => {
    if (plain) {
      return typeof color === 'string' ? color : theme.colors[color as keyof typeof theme.colors];
    }
    return variant === 'filled' ? theme.colors.white : (typeof color === 'string' ? color : theme.colors[color as keyof typeof theme.colors]);
  };

  const renderIcon = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={getIconColor()}
          style={styles.loadingIcon}
        />
      );
    }

    if (icon) {
      return (
        <Icon
          name={icon}
          size={size === 'small' ? 14 : size === 'large' ? 18 : 16}
          color={getIconColor()}
          style={iconPosition === 'right' ? styles.iconRight : styles.iconLeft}
        />
      );
    }

    return null;
  };

  const renderContent = () => {
    const content = children || title;
    
    if (iconPosition === 'right') {
      return (
        <>
          {content && <Text style={textStyle}>{content}</Text>}
          {renderIcon()}
        </>
      );
    }

    return (
      <>
        {renderIcon()}
        {content && <Text style={textStyle}>{content}</Text>}
      </>
    );
  };

  const TouchableComponent = activeStyle ? TouchableHighlight : TouchableOpacity;
  const touchableProps = activeStyle ? {
    underlayColor: activeStyle.backgroundColor || 'rgba(0,0,0,0.1)',
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
  } : {
    activeOpacity: 0.7,
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
  };

  return (
    <TouchableComponent
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      {...touchableProps}
      {...rest}
    >
      <View style={styles.content}>
        {renderContent()}
      </View>
    </TouchableComponent>
  );
});

Button.displayName = 'Button';