import { StyleSheet } from 'react-native';
import { Theme, Size } from '../types';
import { pt, getSizeValue } from '../theme/utils';

const getLoadingDimensions = (size: Size) => {
  switch (size) {
    case 'sm':
      return { size: pt(16), borderWidth: 2 };
    case 'lg':
      return { size: pt(32), borderWidth: 3 };
    default: // md
      return { size: pt(24), borderWidth: 2 };
  }
};

export const createLoadingStyles = (theme: Theme, size: Size = 'md' as Size) => {
  const dimensions = getLoadingDimensions(size);
  
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    horizontal: {
      flexDirection: 'row',
    },
    
    vertical: {
      flexDirection: 'column',
    },
    
    spinner: {
      width: dimensions.size,
      height: dimensions.size,
      borderWidth: dimensions.borderWidth,
      borderColor: theme.colors.border,
      borderTopColor: theme.colors.primary, // 这个会被覆盖
      borderRadius: dimensions.size / 2,
    },
    
    text: {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
    },
    
    textVertical: {
      marginLeft: 0,
      marginTop: theme.spacing.sm,
    },
  });
};