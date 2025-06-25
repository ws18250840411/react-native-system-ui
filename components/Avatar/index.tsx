import React, { useMemo, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { AvatarProps, ComponentSize } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { responsive } from '../utils';

const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  source,
  name,
  onPress,
  style,
  children,
}) => {
  const theme = useTheme();

  // 计算尺寸
  const getAvatarSize = () => {
    if (typeof size === 'number') {
      return responsive(size);
    }

    const sizeMap: Record<ComponentSize, number> = {
      small: responsive(32),
      medium: responsive(40),
      large: responsive(56),
    };

    return sizeMap[size];
  };

  // 计算样式
  const styles = useMemo(() => {
    const avatarSize = getAvatarSize();
    const fontSize = avatarSize * 0.4;

    const containerStyle: ViewStyle = {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    };

    const imageStyle: ImageStyle = {
      width: avatarSize,
      height: avatarSize,
    };

    const textStyle: TextStyle = {
      fontSize,
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
    };

    return {
      containerStyle,
      imageStyle,
      textStyle,
    };
  }, [theme, size]);

  // 处理点击事件
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  // 获取名称首字母
  const getInitials = () => {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // 渲染内容
  const renderContent = () => {
    if (children) {
      return children;
    }

    if (source) {
      return <Image source={source} style={styles.imageStyle} />;
    }

    if (name) {
      return <Text style={styles.textStyle}>{getInitials()}</Text>;
    }

    return null;
  };

  // 如果有点击事件，使用TouchableOpacity包装
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.containerStyle, style]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // 否则直接渲染View
  return (
    <View style={[styles.containerStyle, style]}>
      {renderContent()}
    </View>
  );
};

export default React.memo(Avatar);