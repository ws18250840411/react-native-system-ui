import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from '../Icon';
import { Picker } from '../Picker';
import { useTheme } from '../theme/ThemeProvider';
import { DatePickerProps, PickerOption } from '../types';
import { formatDate, responsive } from '../utils';

const generateYears = (startYear: number, endYear: number): PickerOption[] => {
  const years: PickerOption[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ label: `${year}年`, value: year });
  }
  return years;
};

const generateMonths = (): PickerOption[] => {
  const months: PickerOption[] = [];
  for (let month = 1; month <= 12; month++) {
    months.push({ label: `${month}月`, value: month });
  }
  return months;
};

const generateDays = (year: number, month: number): PickerOption[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days: PickerOption[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ label: `${day}日`, value: day });
  }
  return days;
};

const generateHours = (): PickerOption[] => {
  const hours: PickerOption[] = [];
  for (let hour = 0; hour < 24; hour++) {
    hours.push({ label: `${hour.toString().padStart(2, '0')}时`, value: hour });
  }
  return hours;
};

const generateMinutes = (): PickerOption[] => {
  const minutes: PickerOption[] = [];
  for (let minute = 0; minute < 60; minute++) {
    minutes.push({ label: `${minute.toString().padStart(2, '0')}分`, value: minute });
  }
  return minutes;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  visible = false,
  mode = 'date',
  value,
  minDate,
  maxDate,
  title,
  confirmText = '确认',
  cancelText = '取消',
  placeholder = '请选择日期',
  format,
  disabled = false,
  onConfirm,
  onCancel,
  onClose,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());

  const currentYear = new Date().getFullYear();
  const startYear = minDate ? minDate.getFullYear() : currentYear - 50;
  const endYear = maxDate ? maxDate.getFullYear() : currentYear + 50;

  useEffect(() => {
    setPickerVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  const getColumns = (): PickerOption[][] => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    
    const columns: PickerOption[][] = [];
    
    // 年份列
    columns.push(generateYears(startYear, endYear));
    
    // 月份列
    columns.push(generateMonths());
    
    // 日期列
    if (mode === 'date' || mode === 'datetime') {
      columns.push(generateDays(year, month));
    }
    
    // 时间列
    if (mode === 'time' || mode === 'datetime') {
      columns.push(generateHours());
      columns.push(generateMinutes());
    }
    
    return columns;
  };

  const getSelectedValues = (): any[] => {
    const values: any[] = [];
    
    values.push(selectedDate.getFullYear());
    values.push(selectedDate.getMonth() + 1);
    
    if (mode === 'date' || mode === 'datetime') {
      values.push(selectedDate.getDate());
    }
    
    if (mode === 'time' || mode === 'datetime') {
      values.push(selectedDate.getHours());
      values.push(selectedDate.getMinutes());
    }
    
    return values;
  };

  const handleConfirm = (values: any[]) => {
    let newDate: Date;
    
    if (mode === 'date') {
      newDate = new Date(values[0], values[1] - 1, values[2]);
    } else if (mode === 'time') {
      newDate = new Date();
      newDate.setHours(values[2], values[3], 0, 0);
    } else {
      newDate = new Date(values[0], values[1] - 1, values[2], values[3], values[4]);
    }
    
    // 检查日期范围
    if (minDate && newDate < minDate) {
      newDate = minDate;
    }
    if (maxDate && newDate > maxDate) {
      newDate = maxDate;
    }
    
    setSelectedDate(newDate);
    onConfirm?.(newDate);
    setPickerVisible(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setPickerVisible(false);
  };

  const handleClose = () => {
    onClose?.();
    setPickerVisible(false);
  };

  const getDisplayText = (): string => {
    if (!value && !selectedDate) {
      return placeholder;
    }
    
    const dateToFormat = value || selectedDate;
    
    if (format) {
      return formatDate(dateToFormat, format);
    }
    
    switch (mode) {
      case 'date':
        return formatDate(dateToFormat, 'YYYY-MM-DD');
      case 'time':
        return formatDate(dateToFormat, 'HH:mm');
      case 'datetime':
        return formatDate(dateToFormat, 'YYYY-MM-DD HH:mm');
      default:
        return formatDate(dateToFormat, 'YYYY-MM-DD');
    }
  };

  const getPickerTitle = (): string => {
    if (title) {
      return title;
    }
    
    switch (mode) {
      case 'date':
        return '选择日期';
      case 'time':
        return '选择时间';
      case 'datetime':
        return '选择日期时间';
      default:
        return '请选择';
    }
  };

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: responsive(8),
      paddingHorizontal: responsive(12),
      paddingVertical: responsive(10),
      backgroundColor: disabled ? theme.colors.backgroundSecondary : theme.colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: responsive(16),
      color: value || selectedDate ? theme.colors.text : theme.colors.textSecondary,
      flex: 1,
    },
    icon: {
      marginLeft: responsive(8),
    },
    disabled: {
      opacity: 0.6,
    },
  });

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          disabled && styles.disabled,
          style,
        ]}
        onPress={() => !disabled && setPickerVisible(true)}
        disabled={disabled}
        {...props}
      >
        <Text style={styles.text}>{getDisplayText()}</Text>
        <Icon
          name="calendar"
          size={responsive(20)}
          color={theme.colors.textSecondary}
          style={styles.icon}
        />
      </TouchableOpacity>
      
      <Picker
        visible={pickerVisible}
        title={getPickerTitle()}
        columns={getColumns()}
        value={getSelectedValues()}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={handleClose}
      />
    </>
  );
};

export default DatePicker;