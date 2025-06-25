import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme';
import { TabsProps, TabPaneProps } from '../types';
import { getResponsiveSize } from '../utils';

export const TabPane: React.FC<TabPaneProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[{ flex: 1 }, style]}>
      {children}
    </View>
  );
};

export const Tabs: React.FC<TabsProps> = ({
  activeKey,
  onChange,
  tabPosition = 'top',
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = getResponsiveSize();
  
  const tabs = React.Children.toArray(children) as React.ReactElement<TabPaneProps>[];
  const [internalActiveKey, setInternalActiveKey] = useState(activeKey || tabs[0]?.props.key || '');
  
  const currentActiveKey = activeKey || internalActiveKey;
  
  const handleTabPress = (key: string) => {
    if (onChange) {
      onChange(key);
    } else {
      setInternalActiveKey(key);
    }
  };
  
  const renderTabBar = () => {
    const isVertical = tabPosition === 'left' || tabPosition === 'right';
    
    const tabBarStyle = {
      flexDirection: isVertical ? 'column' as const : 'row' as const,
      backgroundColor: theme.colors.background,
      borderBottomWidth: !isVertical && (tabPosition === 'top') ? 1 : 0,
      borderTopWidth: !isVertical && (tabPosition === 'bottom') ? 1 : 0,
      borderRightWidth: isVertical && (tabPosition === 'left') ? 1 : 0,
      borderLeftWidth: isVertical && (tabPosition === 'right') ? 1 : 0,
      borderColor: theme.colors.border,
    };
    
    const TabBarComponent = isVertical ? View : ScrollView;
    const scrollProps = isVertical ? {} : {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
    };
    
    return (
      <TabBarComponent style={tabBarStyle} {...scrollProps}>
        {tabs.map((tab) => {
          const isActive = tab.props.key === currentActiveKey;
          const isDisabled = tab.props.disabled;
          
          const tabStyle = {
            paddingHorizontal: theme.spacing.md * responsiveSize,
            paddingVertical: theme.spacing.sm * responsiveSize,
            borderBottomWidth: !isVertical && isActive ? 2 : 0,
            borderRightWidth: isVertical && isActive ? 2 : 0,
            borderColor: theme.colors.primary,
            opacity: isDisabled ? 0.5 : 1,
          };
          
          const tabTextStyle = {
            fontSize: theme.fontSize.md * responsiveSize,
            color: isActive ? theme.colors.primary : theme.colors.text,
            fontWeight: isActive ? 'bold' as const : 'normal' as const,
          };
          
          return (
            <TouchableOpacity
              key={tab.props.key}
              style={tabStyle}
              onPress={() => !isDisabled && handleTabPress(tab.props.key)}
              disabled={isDisabled}
            >
              {typeof tab.props.tab === 'string' ? (
                <Text style={tabTextStyle}>{tab.props.tab}</Text>
              ) : (
                tab.props.tab
              )}
            </TouchableOpacity>
          );
        })}
      </TabBarComponent>
    );
  };
  
  const renderContent = () => {
    const activeTab = tabs.find(tab => tab.props.key === currentActiveKey);
    
    const contentStyle = {
      flex: 1,
      backgroundColor: theme.colors.background,
    };
    
    return (
      <View style={contentStyle}>
        {activeTab ? activeTab.props.children : null}
      </View>
    );
  };
  
  const isVertical = tabPosition === 'left' || tabPosition === 'right';
  const containerStyle = {
    flex: 1,
    flexDirection: isVertical ? 'row' as const : 'column' as const,
  };
  
  const shouldRenderTabBarFirst = tabPosition === 'top' || tabPosition === 'left';
  
  return (
    <View style={[containerStyle, style]}>
      {shouldRenderTabBarFirst && renderTabBar()}
      {renderContent()}
      {!shouldRenderTabBarFirst && renderTabBar()}
    </View>
  );
};

export default Tabs;