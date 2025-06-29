import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import Icon from '../Icon';
import { useTheme } from '../theme/ThemeProvider';
import { ActionSheetOption, ActionSheetProps } from '../types';

const { height: screenHeight } = Dimensions.get('window');

const ActionSheet: React.FC<ActionSheetProps> = ({
  visible = false,
  title,
  description,
  options = [],
  cancelText = '取消',
  showCancel = true,
  destructiveIndex,
  onSelect,
  onCancel,
  onClose,
  style,
}) => {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // 计算样式
  const styles = React.useMemo(() => {
    const overlayStyle: ViewStyle = {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    };

    const containerStyle: ViewStyle = {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.borderRadius.lg,
      borderTopRightRadius: theme.borderRadius.lg,
      maxHeight: screenHeight * 0.8,
    };

    const headerStyle: ViewStyle = {
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      alignItems: 'center',
    };

    const titleStyle: TextStyle = {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: description ? theme.spacing.xs : 0,
    };

    const descriptionStyle: TextStyle = {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: theme.fontSize.sm * 1.4,
    };

    const optionsContainerStyle: ViewStyle = {
      maxHeight: screenHeight * 0.5,
    };

    const optionStyle: ViewStyle = {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const optionTextStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      textAlign: 'center',
    };

    const destructiveTextStyle: TextStyle = {
      ...optionTextStyle,
      color: theme.colors.danger,
    };

    const disabledTextStyle: TextStyle = {
      ...optionTextStyle,
      color: theme.colors.textSecondary,
      opacity: 0.5,
    };

    const cancelContainerStyle: ViewStyle = {
      marginTop: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      marginHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
    };

    const cancelStyle: ViewStyle = {
      paddingVertical: theme.spacing.lg,
      alignItems: 'center',
    };

    const cancelTextStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
    };

    return {
      overlayStyle,
      containerStyle,
      headerStyle,
      titleStyle,
      descriptionStyle,
      optionsContainerStyle,
      optionStyle,
      optionTextStyle,
      destructiveTextStyle,
      disabledTextStyle,
      cancelContainerStyle,
      cancelStyle,
      cancelTextStyle,
    };
  }, [theme, description]);

  // 显示动画
  const showActionSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity]);

  // 隐藏动画
  const hideActionSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  }, [translateY, opacity, onClose]);

  // 处理选项点击
  const handleOptionPress = useCallback((option: ActionSheetOption, index: number) => {
    if (option.disabled) return;
    
    onSelect?.(option, index);
    hideActionSheet();
  }, [onSelect, hideActionSheet]);

  // 处理取消
  const handleCancel = useCallback(() => {
    onCancel?.();
    hideActionSheet();
  }, [onCancel, hideActionSheet]);

  // 处理背景点击
  const handleBackdropPress = useCallback(() => {
    handleCancel();
  }, [handleCancel]);

  // 监听visible变化
  useEffect(() => {
    if (visible) {
      showActionSheet();
    } else {
      hideActionSheet();
    }
  }, [visible, showActionSheet, hideActionSheet]);

  // 渲染选项
  const renderOption = (option: ActionSheetOption, index: number) => {
    const isDestructive = destructiveIndex === index;
    const textStyle = option.disabled 
      ? styles.disabledTextStyle 
      : isDestructive 
        ? styles.destructiveTextStyle 
        : styles.optionTextStyle;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionStyle,
          index === options.length - 1 && { borderBottomWidth: 0 },
        ]}
        onPress={() => handleOptionPress(option, index)}
        disabled={option.disabled}
        activeOpacity={0.7}
      >
        {option.icon && (
          <Icon
            name={option.icon}
            size={20}
            color={textStyle.color}
            style={{ marginRight: theme.spacing.sm }}
          />
        )}
        <Text style={textStyle}>{option.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleCancel}
    >
      <Animated.View style={[styles.overlayStyle, { opacity }]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={handleBackdropPress}
          activeOpacity={1}
        />
        
        <Animated.View
          style={[
            styles.containerStyle,
            style,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          {(title || description) && (
            <View style={styles.headerStyle}>
              {title && (
                <Text style={styles.titleStyle}>{title}</Text>
              )}
              {description && (
                <Text style={styles.descriptionStyle}>{description}</Text>
              )}
            </View>
          )}
          
          <ScrollView style={styles.optionsContainerStyle}>
            {options.map(renderOption)}
          </ScrollView>
        </Animated.View>
        
        {showCancel && (
          <Animated.View
            style={[
              styles.cancelContainerStyle,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.cancelStyle}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelTextStyle}>{cancelText}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </Modal>
  );
};

export default ActionSheet;