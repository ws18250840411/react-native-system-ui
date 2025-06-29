import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { PickerOption, PickerProps } from '../types';
import { getBottomSafeAreaHeight, responsive } from '../utils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PickerColumn: React.FC<{
  options: PickerOption[];
  selectedValue?: any;
  onSelect: (option: PickerOption, index: number) => void;
}> = ({ options, selectedValue, onSelect }) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const itemHeight = responsive(44);

  useEffect(() => {
    // 滚动到选中项
    const selectedIndex = options.findIndex(option => option.value === selectedValue);
    if (selectedIndex >= 0 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: selectedIndex * itemHeight,
        animated: false,
      });
    }
  }, [selectedValue, options]);

  const styles = StyleSheet.create({
    column: {
      flex: 1,
      height: itemHeight * 5, // 显示5个选项
    },
    item: {
      height: itemHeight,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: responsive(16),
    },
    itemText: {
      fontSize: responsive(16),
      color: theme.colors.text,
    },
    selectedItem: {
      backgroundColor: theme.colors.backgroundSecondary,
    },
    selectedItemText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    disabledItem: {
      opacity: 0.5,
    },
  });

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.column}
      showsVerticalScrollIndicator={false}
      snapToInterval={itemHeight}
      decelerationRate="fast"
    >
      {options.map((option, index) => {
        const isSelected = option.value === selectedValue;
        const isDisabled = option.disabled;
        
        return (
          <TouchableOpacity
            key={option.value || index}
            style={[
              styles.item,
              isSelected && styles.selectedItem,
              isDisabled && styles.disabledItem,
            ]}
            onPress={() => !isDisabled && onSelect(option, index)}
            disabled={isDisabled}
          >
            <Text
              style={[
                styles.itemText,
                isSelected && styles.selectedItemText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export const Picker: React.FC<PickerProps> = ({
  visible = false,
  title = '请选择',
  columns = [],
  value,
  confirmText = '确认',
  cancelText = '取消',
  onConfirm,
  onCancel,
  onClose,
  style,
}) => {
  const { theme } = useTheme();
  const [selectedValues, setSelectedValues] = useState<any[]>(value || []);
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const maskOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      showPicker();
    } else {
      hidePicker();
    }
  }, [visible]);

  useEffect(() => {
    if (value) {
      setSelectedValues(value);
    }
  }, [value]);

  const showPicker = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(maskOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hidePicker = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(maskOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleColumnSelect = (columnIndex: number, option: PickerOption, optionIndex: number) => {
    const newValues = [...selectedValues];
    newValues[columnIndex] = option.value;
    setSelectedValues(newValues);
  };

  const handleConfirm = () => {
    onConfirm?.(selectedValues);
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const handleMaskPress = () => {
    handleCancel();
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    mask: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: responsive(16),
      borderTopRightRadius: responsive(16),
      paddingBottom: getBottomSafeAreaHeight(),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive(16),
      paddingVertical: responsive(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerButton: {
      paddingHorizontal: responsive(8),
      paddingVertical: responsive(4),
    },
    cancelText: {
      fontSize: responsive(16),
      color: theme.colors.textSecondary,
    },
    confirmText: {
      fontSize: responsive(16),
      color: theme.colors.primary,
      fontWeight: '600',
    },
    title: {
      fontSize: responsive(18),
      fontWeight: '600',
      color: theme.colors.text,
    },
    content: {
      flexDirection: 'row',
      paddingHorizontal: responsive(16),
      paddingVertical: responsive(20),
    },
    separator: {
      width: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: responsive(8),
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={handleMaskPress}>
          <Animated.View
            style={[
              styles.mask,
              {
                opacity: maskOpacity,
              },
            ]}
          />
        </TouchableWithoutFeedback>
        
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            
            <Text style={styles.title}>{title}</Text>
            
            <TouchableOpacity style={styles.headerButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            {columns.map((column, columnIndex) => (
              <React.Fragment key={columnIndex}>
                <PickerColumn
                  options={column}
                  selectedValue={selectedValues[columnIndex]}
                  onSelect={(option, optionIndex) => handleColumnSelect(columnIndex, option, optionIndex)}
                />
                {columnIndex < columns.length - 1 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Picker;