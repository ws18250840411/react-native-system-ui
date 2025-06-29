import React, { useCallback, useMemo } from 'react';
import {
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import Icon from '../Icon';
import { useTheme } from '../theme/ThemeProvider';
import { TableColumn, TableProps } from '../types';

const Table: React.FC<TableProps> = ({
  columns = [],
  data = [],
  bordered = true,
  striped = false,
  sortable = false,
  loading = false,
  emptyText = '暂无数据',
  onSort,
  onRowPress,
  style,
}) => {
  const { theme } = useTheme();
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  // 计算样式
  const styles = useMemo(() => {
    const containerStyle: ViewStyle = {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      ...(bordered && {
        borderWidth: 1,
        borderColor: theme.colors.border,
      }),
    };

    const headerStyle: ViewStyle = {
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    };

    const headerCellStyle: ViewStyle = {
      padding: theme.spacing.md,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRightWidth: bordered ? 1 : 0,
      borderRightColor: theme.colors.border,
    };

    const headerTextStyle: TextStyle = {
      fontSize: theme.fontSize.sm,
      fontWeight: '600',
      color: theme.colors.text,
    };

    const rowStyle: ViewStyle = {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    };

    const cellStyle: ViewStyle = {
      padding: theme.spacing.md,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRightWidth: bordered ? 1 : 0,
      borderRightColor: theme.colors.border,
    };

    const cellTextStyle: TextStyle = {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
    };

    const emptyStyle: ViewStyle = {
      padding: theme.spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const emptyTextStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
    };

    const sortButtonStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    };

    return {
      containerStyle,
      headerStyle,
      headerCellStyle,
      headerTextStyle,
      rowStyle,
      cellStyle,
      cellTextStyle,
      emptyStyle,
      emptyTextStyle,
      sortButtonStyle,
    };
  }, [theme, bordered]);

  // 处理排序
  const handleSort = useCallback((column: TableColumn) => {
    if (!sortable || !column.sortable) return;

    const newDirection = sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column.key);
    setSortDirection(newDirection);
    onSort?.(column.key, newDirection);
  }, [sortable, sortColumn, sortDirection, onSort]);

  // 渲染表头
  const renderHeader = () => (
    <View style={styles.headerStyle}>
      {columns.map((column, index) => {
        const isLastColumn = index === columns.length - 1;
        const cellStyle = {
          ...styles.headerCellStyle,
          flex: column.flex || 1,
          width: column.width,
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          alignItems: (column.align === 'center' ? 'center' : column.align === 'right' ? 'flex-end' : 'flex-start') as 'flex-start' | 'flex-end' | 'center',
          borderRightWidth: isLastColumn ? 0 : (bordered ? 1 : 0),
        };

        const content = sortable && column.sortable ? (
          <TouchableOpacity
            style={styles.sortButtonStyle}
            onPress={() => handleSort(column)}
          >
            <Text style={styles.headerTextStyle}>{column.title}</Text>
            {sortColumn === column.key && (
              <Icon
                name={sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={theme.colors.primary}
              />
            )}
          </TouchableOpacity>
        ) : (
          <Text style={styles.headerTextStyle}>{column.title}</Text>
        );

        return (
          <View key={`header-${column.key}`} style={cellStyle}>
            {content}
          </View>
        );
      })}
    </View>
  );

  // 渲染单元格内容
  const renderCellContent = (column: TableColumn, record: any, index: number) => {
    if (column.render) {
      return column.render(record[column.dataIndex || column.key], record, index);
    }
    
    const value = record[column.dataIndex || column.key];
    return (
      <Text style={styles.cellTextStyle} numberOfLines={1}>
        {value?.toString() || ''}
      </Text>
    );
  };

  // 渲染数据行
  const renderRow = (record: any, rowIndex: number) => {
    const rowBackgroundColor = striped && rowIndex % 2 === 1 
      ? theme.colors.surface 
      : 'transparent';

    const rowStyleWithBackground = {
      ...styles.rowStyle,
      backgroundColor: rowBackgroundColor,
    };

    return (
      <TouchableOpacity
        key={rowIndex}
        style={rowStyleWithBackground}
        onPress={() => onRowPress?.(record, rowIndex)}
        disabled={!onRowPress}
        activeOpacity={onRowPress ? 0.7 : 1}
      >
        {columns.map((column, colIndex) => {
          const isLastColumn = colIndex === columns.length - 1;
          const cellStyle = {
            ...styles.cellStyle,
            flex: column.flex || 1,
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            alignItems: (column.align === 'center' ? 'center' : column.align === 'right' ? 'flex-end' : 'flex-start') as 'flex-start' | 'flex-end' | 'center',
            borderRightWidth: isLastColumn ? 0 : (bordered ? 1 : 0),
          };

          return (
            <View key={`cell-${rowIndex}-${column.key}`} style={cellStyle}>
              {renderCellContent(column, record, rowIndex)}
            </View>
          );
        })}
      </TouchableOpacity>
    );
  };

  // 渲染空状态
  const renderEmpty = () => (
    <View style={styles.emptyStyle}>
      <Text style={styles.emptyTextStyle}>{emptyText}</Text>
    </View>
  );

  // 渲染加载状态
  const renderLoading = () => (
    <View style={styles.emptyStyle}>
      <Text style={styles.emptyTextStyle}>加载中...</Text>
    </View>
  );

  return (
    <View style={[styles.containerStyle, style]}>
      {renderHeader()}
      <ScrollView>
        {loading ? (
          renderLoading()
        ) : data.length === 0 ? (
          renderEmpty()
        ) : (
          data.map((record, index) => renderRow(record, index))
        )}
      </ScrollView>
    </View>
  );
};

export default Table;