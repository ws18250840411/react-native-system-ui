import React, { useCallback } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocale } from '@/context/LocaleContext';

export type DocMenuItem = { key: string; label: string };
export type DocMenuGroup = { title: string; items: DocMenuItem[] };
export type DocAnchorItem = { id: string; label: string; depth?: number };

type DocLayoutProps = {
  children: React.ReactNode;
  /**
   * 当前激活的菜单项，用于侧边栏高亮。
   */
  activeMenu?: string;
  /**
   * 自定义菜单分组；未提供时使用默认占位数据。
   */
  menuGroups?: DocMenuGroup[];
  /**
   * 目录锚点数据。
   */
  anchors?: DocAnchorItem[];
  /**
   * 菜单选择回调。
   */
  onSelectMenu?: (key: string) => void;
};

const PRIMARY_NAV = [
  { key: 'guide', label: '指南' },
  { key: 'components', label: '组件' },
  { key: 'resources', label: '资源' },
];

const DEFAULT_MENU_GROUPS: DocMenuGroup[] = [
  {
    title: '起步',
    items: [
      { key: 'getting-started', label: '快速开始' },
      { key: 'changelog', label: '更新日志' },
      { key: 'dark-mode', label: '深色模式' },
    ],
  },
  {
    title: '基础组件',
    items: [
      { key: 'button', label: 'Button 按钮' },
      { key: 'avatar', label: 'Avatar 头像' },
      { key: 'typography', label: 'Typography 排版' },
    ],
  },
  {
    title: '反馈组件',
    items: [
      { key: 'toast', label: 'Toast 轻提示' },
      { key: 'dialog', label: 'Dialog 弹窗' },
      { key: 'loading', label: 'Loading 加载' },
    ],
  },
];

const DEFAULT_ANCHORS: DocAnchorItem[] = [
  { id: 'intro', label: '介绍', depth: 1 },
  { id: 'examples', label: '示例', depth: 2 },
  { id: 'api', label: 'API', depth: 2 },
];

export const DocLayout: React.FC<DocLayoutProps> = ({
  children,
  activeMenu,
  menuGroups,
  anchors,
  onSelectMenu,
}) => {
  const { locale, toggleLocale } = useLocale();
  const resolvedMenuGroups = menuGroups ?? DEFAULT_MENU_GROUPS;
  const resolvedAnchors = anchors ?? DEFAULT_ANCHORS;

  const handleAnchorPress = useCallback((id: string) => {
    if (typeof document === 'undefined') {
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Text style={styles.logo}>RN System UI</Text>
            <View style={styles.topNav}>
              {PRIMARY_NAV.map((item, index) => (
                <Pressable
                  key={item.key}
                  style={[styles.topNavItem, index === 0 && styles.firstTopNav]}
                >
                  <Text style={styles.topNavText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.headerRight}>
            <TextInput
              placeholder="搜索组件"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
            <View style={styles.actionRow}>
              <Pressable style={styles.actionChip} onPress={toggleLocale}>
                <Text style={styles.actionChipText}>
                  {locale === 'zh-CN' ? '中文' : 'English'}
                </Text>
              </Pressable>
              <Pressable style={styles.actionChip}>
                <Text style={styles.actionChipText}>🌙</Text>
              </Pressable>
              <Pressable style={styles.actionChip}>
                <Text style={styles.actionChipText}>GitHub</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.sidebar}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sidebarContent}
            >
              {resolvedMenuGroups.map((group) => (
                <View key={group.title} style={styles.menuGroup}>
                  <Text style={styles.groupTitle}>{group.title}</Text>
                  {group.items.map((item) => {
                    const isActive = activeMenu === item.key;
                    return (
                      <Pressable
                        key={item.key}
                        style={[styles.menuItem, isActive && styles.menuItemActive]}
                        onPress={() => onSelectMenu?.(item.key)}
                      >
                        <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>
                          {item.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </ScrollView>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentInner}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    height: 68,
    paddingHorizontal: 32,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFFCC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  topNav: {
    flexDirection: 'row',
    marginLeft: 24,
  },
  topNavItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  firstTopNav: {
    marginLeft: 0,
  },
  topNavText: {
    fontSize: 14,
    color: '#4B5563',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    width: 200,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    color: '#111827',
    fontSize: 14,
    marginRight: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    marginLeft: 8,
  },
  actionChipText: {
    fontSize: 13,
    color: '#4338CA',
    fontWeight: '600',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 256,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  sidebarContent: {
    paddingVertical: 24,
  },
  menuGroup: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  menuItemActive: {
    backgroundColor: '#EEF2FF',
  },
  menuItemText: {
    fontSize: 14,
    color: '#4B5563',
  },
  menuItemTextActive: {
    color: '#4338CA',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingHorizontal: 48,
    paddingVertical: 40,
  },
  aside: {
    width: 220,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  asideTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 16,
  },
  anchorItem: {
    paddingVertical: 8,
  },
  anchorItemSub: {
    paddingLeft: 12,
  },
  anchorText: {
    fontSize: 14,
    color: '#4B5563',
  },
});

export default DocLayout;
