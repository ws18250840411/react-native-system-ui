import React, { memo, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AvatarProps } from '../types';
import { useTheme } from '../theme';
import { Icon } from '../Icon';
import { createAvatarStyles } from './styles';

export const Avatar: React.FC<AvatarProps> = memo(({
  size = 'md',
  shape = 'circle',
  src,
  alt,
  icon,
  text,
  backgroundColor,
  textColor,
  onPress,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createAvatarStyles(theme, size, shape);
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const avatarBackgroundColor = backgroundColor || theme.colors.primary;
  const avatarTextColor = textColor || theme.colors.background;
  
  const containerStyle = [
    styles.container,
    { backgroundColor: avatarBackgroundColor },
    style,
  ];
  
  const renderContent = () => {
    // 优先显示图片
    if (src && !imageError) {
      return (
        <Image
          source={typeof src === 'string' ? { uri: src } : src}
          style={styles.image}
          onError={handleImageError}
          alt={alt}
        />
      );
    }
    
    // 其次显示图标
    if (icon) {
      return (
        <Icon
          name={icon}
          size={styles.icon.fontSize}
          color={avatarTextColor}
        />
      );
    }
    
    // 最后显示文字
    if (text) {
      const displayText = text.length > 2 ? text.substring(0, 2) : text;
      return (
        <Text style={[styles.text, { color: avatarTextColor }]}>
          {displayText.toUpperCase()}
        </Text>
      );
    }
    
    // 默认显示用户图标
    return (
      <Icon
        name="user"
        size={styles.icon.fontSize}
        color={avatarTextColor}
      />
    );
  };
  
  const content = (
    <View style={containerStyle} testID={testID} {...rest}>
      {renderContent()}
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
});

Avatar.displayName = 'Avatar';