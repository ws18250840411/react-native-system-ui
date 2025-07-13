import { StyleSheet } from 'react-native';
import { Theme, Size, AvatarShape } from '../types';
import { pt, getSizeValue } from '../theme/utils';

const getAvatarDimensions = (size: Size) => {
  switch (size) {
    case 'xs':
      return { size: pt(24), fontSize: 10, iconSize: 12 };
    case 'sm':
      return { size: pt(32), fontSize: 12, iconSize: 16 };
    case 'lg':
      return { size: pt(64), fontSize: 20, iconSize: 32 };
    case 'xl':
      return { size: pt(80), fontSize: 24, iconSize: 40 };
    default: // md
      return { size: pt(48), fontSize: 16, iconSize: 24 };
  }
};

export const createAvatarStyles = (theme: Theme, size: Size = 'md' as Size, shape: AvatarShape = 'circle') => {
  const dimensions = getAvatarDimensions(size);
  const borderRadius = shape === 'circle' ? dimensions.size / 2 : theme.borderRadius.md;
  
  return StyleSheet.create({
    container: {
      width: dimensions.size,
      height: dimensions.size,
      borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    
    image: {
      width: '100%',
      height: '100%',
      borderRadius,
    },
    
    text: {
      fontSize: dimensions.fontSize,
      fontWeight: '600',
      textAlign: 'center',
    },
    
    icon: {
      fontSize: dimensions.iconSize,
    },
  });
};