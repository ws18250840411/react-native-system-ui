import { StyleSheet } from 'react-native';
import { Theme, TagVariant, Color, Size, TagShape } from '../types';
import { pt, getSizeValue } from '../theme/utils';

const getTagDimensions = (size: Size) => {
  switch (size) {
    case 'sm':
      return { 
        paddingHorizontal: pt(8), 
        paddingVertical: pt(2), 
        fontSize: 10,
        iconSize: 10
      };
    case 'lg':
      return { 
        paddingHorizontal: pt(16), 
        paddingVertical: pt(8), 
        fontSize: 16,
        iconSize: 14
      };
    default: // md
      return { 
        paddingHorizontal: pt(12), 
        paddingVertical: pt(4), 
        fontSize: 12,
        iconSize: 12
      };
  }
};

const getTagColors = (theme: Theme, variant: TagVariant, color: Color) => {
  const colorValue = (theme.colors as any)[color] || color;
  
  switch (variant) {
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderColor: colorValue,
        textColor: colorValue,
        borderWidth: 1,
      };
    case 'text':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textColor: colorValue,
        borderWidth: 0,
      };
    default: // filled
      return {
        backgroundColor: colorValue,
        borderColor: colorValue,
        textColor: theme.colors.background,
        borderWidth: 1,
      };
  }
};

const getTagBorderRadius = (theme: Theme, shape: TagShape) => {
  switch (shape) {
    case 'square':
      return 0;
    case 'round':
      return 999;
    default: // rounded
      return theme.borderRadius.sm;
  }
};

export const createTagStyles = (
  theme: Theme, 
  variant: TagVariant = 'filled', 
  color: Color = 'primary', 
  size: Size = 'md' as Size,
  shape: TagShape = 'rounded'
) => {
  const dimensions = getTagDimensions(size);
  const colors = getTagColors(theme, variant, color);
  const borderRadius = getTagBorderRadius(theme, shape);
  
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: dimensions.paddingHorizontal,
      paddingVertical: dimensions.paddingVertical,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      borderWidth: colors.borderWidth,
      borderRadius,
      alignSelf: 'flex-start',
    },
    
    disabled: {
      opacity: 0.5,
    },
    
    text: {
      fontSize: dimensions.fontSize,
      color: colors.textColor,
      fontWeight: '500',
      lineHeight: dimensions.fontSize + 2,
    },
    
    textDisabled: {
      color: theme.colors.textSecondary,
    },
    
    closeButton: {
      marginLeft: pt(4),
      padding: pt(2),
    },
    
    closeIcon: {
      fontSize: dimensions.iconSize,
    },
  });
};