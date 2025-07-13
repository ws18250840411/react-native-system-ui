import { StyleSheet } from 'react-native';
import { Theme, Size } from '../types';
import { pt, getSizeValue } from '../theme/utils';

const getSwitchDimensions = (size: Size) => {
  switch (size) {
    case 'sm':
      return { width: pt(36), height: pt(20), thumbSize: pt(16) };
    case 'lg':
      return { width: pt(56), height: pt(32), thumbSize: pt(28) };
    default: // md
      return { width: pt(46), height: pt(26), thumbSize: pt(22) };
  }
};

export const createSwitchStyles = (theme: Theme, size: Size = 'md') => {
  const dimensions = getSwitchDimensions(size);
  
  return StyleSheet.create({
    track: {
      width: dimensions.width,
      height: dimensions.height,
      borderRadius: dimensions.height / 2,
      justifyContent: 'center',
      paddingHorizontal: 2,
    },
    
    trackDisabled: {
      opacity: 0.5,
    },
    
    thumb: {
      width: dimensions.thumbSize,
      height: dimensions.thumbSize,
      borderRadius: dimensions.thumbSize / 2,
      shadowColor: theme.colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    
    thumbDisabled: {
      shadowOpacity: 0,
      elevation: 0,
    },
  });
};