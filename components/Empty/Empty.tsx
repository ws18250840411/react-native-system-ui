import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { EmptyProps } from '../types';
import { useTheme } from '../theme';
import { Icon } from '../Icon';
import { createEmptyStyles } from './styles';

export const Empty: React.FC<EmptyProps> = memo(({
  image,
  imageStyle,
  icon = 'empty',
  title = '暂无数据',
  description,
  children,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createEmptyStyles(theme);
  
  const containerStyle = [
    styles.container,
    style,
  ];
  
  const renderImage = () => {
    if (image) {
      const imageSource = typeof image === 'string' ? { uri: image } : image as any;
      return (
        <Image
          source={imageSource}
          style={[styles.image, imageStyle]}
          resizeMode="contain"
        />
      );
    }
    
    if (icon) {
      return (
        <Icon
          name={icon}
          size={styles.icon.fontSize}
          color={theme.colors.textSecondary}
        />
      );
    }
    
    return null;
  };
  
  return (
    <View style={containerStyle} testID={testID} {...rest}>
      <View style={styles.imageContainer}>
        {renderImage()}
      </View>
      
      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}
      
      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
      
      {children && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
});

Empty.displayName = 'Empty';