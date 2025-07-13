import { StyleSheet } from 'react-native';
import { Theme, Size } from '../types';
import { pt, getSizeValue } from '../theme/utils';

const getBadgeDimensions = (size: Size) => {
  switch (size) {
    case 'sm':
      return { 
        minWidth: pt(16), 
        height: pt(16), 
        fontSize: 10, 
        dotSize: pt(8),
        paddingHorizontal: pt(4)
      };
    case 'lg':
      return { 
        minWidth: pt(24), 
        height: pt(24), 
        fontSize: 14, 
        dotSize: pt(12),
        paddingHorizontal: pt(6)
      };
    default: // md
      return { 
        minWidth: pt(20), 
        height: pt(20), 
        fontSize: 12, 
        dotSize: pt(10),
        paddingHorizontal: pt(5)
      };
  }
};

export const createBadgeStyles = (theme: Theme, size: Size = 'md' as Size) => {
  const dimensions = getBadgeDimensions(size);
  
  return StyleSheet.create({
    container: {
      position: 'relative',
    },
    
    badge: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: dimensions.height / 2,
    },
    
    count: {
      minWidth: dimensions.minWidth,
      height: dimensions.height,
      paddingHorizontal: dimensions.paddingHorizontal,
    },
    
    dot: {
      width: dimensions.dotSize,
      height: dimensions.dotSize,
      borderRadius: dimensions.dotSize / 2,
    },
    
    absolute: {
      position: 'absolute',
      top: -dimensions.height / 2,
      right: -dimensions.minWidth / 2,
      zIndex: 1,
    },
    
    text: {
      fontSize: dimensions.fontSize,
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: dimensions.fontSize + 2,
    },
  });
};