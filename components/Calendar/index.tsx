import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from '../Icon';
import { useTheme } from '../theme/ThemeProvider';
import { CalendarProps } from '../types';

export interface CalendarRef {
  scrollToDate: (date: string) => void;
}

interface Day {
  day: string | number;
  type: 'prev' | 'current' | 'next' | 'disabled';
  date: Date;
  selected?: boolean;
  isToday?: boolean;
}

const Calendar = forwardRef<CalendarRef, CalendarProps>((
  {
    visible = false,
    type = 'single',
    title = '日历选择',
    defaultValue,
    startDate,
    endDate,
    showToday = true,
    confirmText = '确认',
    showTitle = true,
    poppable = true,
    onClose,
    onConfirm,
    onChange,
    style,
  },
  ref
) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | Date[]>(() => {
    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        return defaultValue.map(d => new Date(d));
      }
      return new Date(defaultValue);
    }
    return type === 'range' ? [] : new Date();
  });
  
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 计算样式
  const styles = useMemo(() => {
    const containerStyle: ViewStyle = {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.borderRadius.lg,
      borderTopRightRadius: theme.borderRadius.lg,
      maxHeight: '80%',
    };

    const headerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    };

    const titleStyle: TextStyle = {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
    };

    const monthHeaderStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
    };

    const monthTitleStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      fontWeight: '500',
      color: theme.colors.text,
    };

    const weekHeaderStyle: ViewStyle = {
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    };

    const weekDayStyle: TextStyle = {
      flex: 1,
      textAlign: 'center',
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    };

    const calendarGridStyle: ViewStyle = {
      paddingHorizontal: theme.spacing.md,
    };

    const weekRowStyle: ViewStyle = {
      flexDirection: 'row',
    };

    const dayStyle: ViewStyle = {
      flex: 1,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 1,
    };

    const footerStyle: ViewStyle = {
      flexDirection: 'row',
      padding: theme.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      gap: theme.spacing.md,
    };

    return {
      containerStyle,
      headerStyle,
      titleStyle,
      monthHeaderStyle,
      monthTitleStyle,
      weekHeaderStyle,
      weekDayStyle,
      calendarGridStyle,
      weekRowStyle,
      dayStyle,
      footerStyle,
    };
  }, [theme]);

  // 生成日历数据
  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days: Day[] = [];
    const today = new Date();
    
    // 上个月的日期
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startWeekDay - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      days.push({
        day,
        type: 'prev',
        date: new Date(year, month - 1, day),
      });
    }
    
    // 当前月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      
      days.push({
        day,
        type: 'current',
        date,
        isToday,
      });
    }
    
    // 下个月的日期
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        type: 'next',
        date: new Date(year, month + 1, day),
      });
    }
    
    return days;
  }, [currentMonth]);

  // 处理日期选择
  const handleDateSelect = useCallback((day: Day) => {
    if (day.type !== 'current') return;
    
    if (type === 'single') {
      setSelectedDate(day.date);
      onChange?.(day.date.toISOString().split('T')[0]);
    } else if (type === 'range') {
      const currentSelected = selectedDate as Date[];
      if (currentSelected.length === 0 || currentSelected.length === 2) {
        setSelectedDate([day.date]);
      } else {
        const [start] = currentSelected;
        const end = day.date;
        const range = start <= end ? [start, end] : [end, start];
        setSelectedDate(range);
        onChange?.(range.map(d => d.toISOString().split('T')[0]));
      }
    }
  }, [type, selectedDate, onChange]);

  // 月份导航
  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  }, []);

  // 渲染日期单元格
  const renderDay = useCallback((day: Day) => {
    const isSelected = useMemo(() => {
      if (type === 'single') {
        const selected = selectedDate as Date;
        return selected && day.date.toDateString() === selected.toDateString();
      } else {
        const selected = selectedDate as Date[];
        return selected.some(d => d.toDateString() === day.date.toDateString());
      }
    }, [day.date, selectedDate, type]);

    const dayContainerStyle: ViewStyle = {
      ...styles.dayStyle,
      backgroundColor: isSelected ? theme.colors.primary : 'transparent',
      borderRadius: theme.borderRadius.md,
    };

    const dayTextStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      color: day.type === 'current' 
        ? (isSelected ? '#FFFFFF' : (day.isToday ? theme.colors.primary : theme.colors.text))
        : theme.colors.textSecondary,
      fontWeight: day.isToday ? '600' : 'normal',
    };

    return (
      <TouchableOpacity
        key={`${day.date.getTime()}`}
        style={dayContainerStyle}
        onPress={() => handleDateSelect(day)}
        disabled={day.type !== 'current'}
      >
        <Text style={dayTextStyle}>{day.day}</Text>
      </TouchableOpacity>
    );
  }, [styles.dayStyle, theme, handleDateSelect]);

  // 渲染周行
  const renderWeeks = useMemo(() => {
    const weeks: Day[][] = [];
    for (let i = 0; i < calendarData.length; i += 7) {
      weeks.push(calendarData.slice(i, i + 7));
    }
    
    return weeks.map((week, index) => (
      <View key={index} style={styles.weekRowStyle}>
        {week.map(renderDay)}
      </View>
    ));
  }, [calendarData, styles.weekRowStyle, renderDay]);

  // 处理确认
  const handleConfirm = useCallback(() => {
    onConfirm?.(selectedDate);
    onClose?.();
  }, [selectedDate, onConfirm, onClose]);

  // 暴露方法
  useImperativeHandle(ref, () => ({
    scrollToDate: (date: string) => {
      setCurrentMonth(new Date(date));
    },
  }));

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const calendarContent = (
    <View style={styles.containerStyle}>
      {showTitle && (
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.monthHeaderStyle}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <Icon name="chevron-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.monthTitleStyle}>
          {currentMonth.getFullYear()}年{monthNames[currentMonth.getMonth()]}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <Icon name="chevron-right" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekHeaderStyle}>
        {weekDays.map(day => (
          <Text key={day} style={styles.weekDayStyle}>{day}</Text>
        ))}
      </View>
      
      <ScrollView style={styles.calendarGridStyle}>
        {renderWeeks}
      </ScrollView>
      
      <View style={styles.footerStyle}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: theme.spacing.md,
            backgroundColor: theme.colors.border,
            borderRadius: theme.borderRadius.md,
            alignItems: 'center',
          }}
          onPress={onClose}
        >
          <Text style={{ color: theme.colors.text }}>取消</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: theme.spacing.md,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.md,
            alignItems: 'center',
          }}
          onPress={handleConfirm}
        >
          <Text style={{ color: '#FFFFFF' }}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!poppable) {
    return <View style={style}>{calendarContent}</View>;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
      }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={onClose}
          activeOpacity={1}
        />
        {calendarContent}
      </View>
    </Modal>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;