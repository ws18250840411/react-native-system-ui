import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CardProps } from '../types';
import { useTheme } from '../theme';
import { createCardStyles } from './styles';

export const Card: React.FC<CardProps> = memo(({
  title,
  subtitle,
  description,
  imageSource,
  imageStyle,
  headerExtra,
  footerExtra,
  children,
  onPress,
  disabled = false,
  shadow = true,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createCardStyles(theme);
  
  const containerStyle = [
    styles.container,
    shadow && styles.shadow,
    disabled && styles.disabled,
    style,
  ];
  
  const content = (
    <View style={containerStyle} testID={testID} {...rest}>
      {imageSource && (
        <Image
          source={imageSource}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      )}
      
      {(title || subtitle || headerExtra) && (
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {title && (
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
          {headerExtra && (
            <View style={styles.headerExtra}>
              {headerExtra}
            </View>
          )}
        </View>
      )}
      
      {description && (
        <View style={styles.body}>
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        </View>
      )}
      
      {children && (
        <View style={styles.body}>
          {children}
        </View>
      )}
      
      {footerExtra && (
        <View style={styles.footer}>
          {footerExtra}
        </View>
      )}
    </View>
  );
  
  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
});

Card.displayName = 'Card';