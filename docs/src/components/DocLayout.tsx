import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { getComponentDocs } from '@/docs/components';

export type DocMenuItem = { key: string; label: string };
export type DocMenuGroup = { title: string; items: DocMenuItem[] };
export type DocAnchorItem = { id: string; label: string; depth?: number };

export type SearchItem = DocMenuItem & { group: string };

type DocLayoutProps = {
  children: React.ReactNode;
  activeMenu?: string;
  activeNav?: 'home' | 'docs' | 'components';
  menuGroups?: DocMenuGroup[];
  anchors?: DocAnchorItem[];
  onSelectMenu?: (key: string) => void;
  showSidebar?: boolean;
  showAnchors?: boolean;
  searchItems?: SearchItem[];
};

const NAV_ITEMS: Array<{ key: DocLayoutProps['activeNav']; label: string }> = [
  { key: 'home', label: '首页' },
  { key: 'docs', label: '文档' },
  { key: 'components', label: '组件' },
];

const DEFAULT_ANCHORS: DocAnchorItem[] = [
  { id: 'overview', label: '概览', depth: 1 },
  { id: 'usage', label: '用法', depth: 2 },
  { id: 'api', label: 'API', depth: 2 },
];

const GITHUB_URL = 'https://github.com/wangwenshan/react-native-system-ui';

const DocLayout: React.FC<DocLayoutProps> = ({
  children,
  activeMenu,
  activeNav,
  menuGroups,
  anchors,
  onSelectMenu,
  showSidebar = true,
  showAnchors = true,
  searchItems,
}) => {
  const navigation = useNavigation<any>();
  const { locale, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const resolvedMenuGroups = menuGroups ?? [];
  const resolvedAnchors = anchors ?? DEFAULT_ANCHORS;

  const [searchValue, setSearchValue] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const blurTimer = useRef<NodeJS.Timeout | null>(null);

  const componentDocs = useMemo(() => getComponentDocs(), []);

  const defaultSearchSource = useMemo<SearchItem[]>(() => {
    const base = searchItems
      ? searchItems
      : resolvedMenuGroups.flatMap((group) =>
          group.items.map((item) => ({ ...item, group: group.title })),
        );
    if (base.length > 0) {
      return base;
    }
    return componentDocs.map((doc) => ({
      key: doc.slug,
      label: doc.titles[locale] ?? doc.titles['zh-CN'],
      group: doc.group,
    }));
  }, [componentDocs, locale, resolvedMenuGroups, searchItems]);

  const searchResults = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    if (!term) {
      return defaultSearchSource.slice(0, 15);
    }
    return defaultSearchSource
      .filter((item) => item.label.toLowerCase().includes(term))
      .slice(0, 30);
  }, [defaultSearchSource, searchValue]);

  const showSearchPanel = searchFocused || searchValue.trim().length > 0;

  const handleAnchorPress = useCallback((id: string) => {
    if (typeof document === 'undefined') return;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectMenu = useCallback(
    (key: string) => {
      if (blurTimer.current) {
        clearTimeout(blurTimer.current);
        blurTimer.current = null;
      }
      onSelectMenu?.(key);
      setSearchValue('');
      setSearchFocused(false);
    },
    [onSelectMenu],
  );

  const handleSearchFocus = useCallback(() => {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
      blurTimer.current = null;
    }
    setSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
    }
    blurTimer.current = setTimeout(() => {
      setSearchFocused(false);
    }, 160);
  }, []);

  const handleSubmitSearch = useCallback(() => {
    if (searchResults.length > 0) {
      handleSelectMenu(searchResults[0].key);
    }
  }, [handleSelectMenu, searchResults]);

  const openGitHub = useCallback(() => {
    Linking.openURL(GITHUB_URL).catch(() => undefined);
  }, []);

  const headerBlurStyle = useMemo(() => {
    if (Platform.OS !== 'web') return null;
    return { backdropFilter: 'saturate(180%) blur(18px)' } as any;
  }, []);

  const handleNavigate = useCallback(
    (key: DocLayoutProps['activeNav']) => {
      switch (key) {
        case 'home':
          navigation.navigate('Home');
          break;
        case 'docs':
          navigation.navigate('Docs');
          break;
        case 'components': {
          const first = componentDocs[0];
          navigation.navigate('ComponentDoc', { slug: first?.slug ?? 'button' });
          break;
        }
        default:
          break;
      }
    },
    [componentDocs, navigation],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={[styles.header, headerBlurStyle || undefined]}>
          <View style={styles.headerLeft}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>RN</Text>
            </View>
            <View style={styles.brandInfo}>
              <Text style={styles.brandTitle}>RN System UI</Text>
              <Text style={styles.brandSubtitle}>Design System for React Native</Text>
            </View>
            <View style={styles.topNav}>
              {NAV_ITEMS.map((item) => (
                <Pressable
                  key={item.key}
                  style={[styles.topNavItem, activeNav === item.key && styles.topNavItemActive]}
                  onPress={() => handleNavigate(item.key)}
                >
                  <Text
                    style={[styles.topNavText, activeNav === item.key && styles.topNavTextActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder={locale === 'zh-CN' ? '搜索组件或文档' : 'Search components or docs'}
                placeholderTextColor="var(--doc-text-tertiary)"
                value={searchValue}
                onChangeText={setSearchValue}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onSubmitEditing={handleSubmitSearch}
              />
              {showSearchPanel && searchResults.length > 0 ? (
                <View style={styles.searchPanel as any}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                    {searchResults.map((item) => (
                      <Pressable
                        key={`${item.group}-${item.key}`}
                        style={styles.searchItem}
                        onPress={() => handleSelectMenu(item.key)}
                      >
                        <Text style={styles.searchItemLabel}>{item.label}</Text>
                        <Text style={styles.searchItemMeta}>{item.group}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              ) : null}
            </View>

            <View style={styles.actionRow}>
              <Pressable style={styles.actionChip} onPress={toggleLocale}>
                <Text style={styles.actionChipText}>{locale === 'zh-CN' ? '中文' : 'EN'}</Text>
              </Pressable>
              <Pressable style={styles.actionChip} onPress={toggleTheme}>
                <Text style={styles.actionChipText}>{theme === 'light' ? '🌙' : '☀️'}</Text>
              </Pressable>
              <Pressable style={styles.actionChip} onPress={openGitHub}>
                <Text style={styles.actionChipText}>GitHub ↗</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {showSidebar ? (
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
                          onPress={() => handleSelectMenu(item.key)}
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
          ) : null}

          <ScrollView
            style={styles.content}
            contentContainerStyle={[styles.contentInner, !showAnchors && styles.contentInnerFull]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          {showAnchors ? (
            <View style={styles.aside}>
              <Text style={styles.asideTitle}>{locale === 'zh-CN' ? '目录' : 'On this page'}</Text>
              {resolvedAnchors.map((anchor) => (
                <Pressable
                  key={anchor.id}
                  style={[
                    styles.anchorItem,
                    anchor.depth && anchor.depth > 1 ? styles.anchorItemSub : null,
                  ]}
                  onPress={() => handleAnchorPress(anchor.id)}
                >
                  <Text style={styles.anchorText}>{anchor.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<any>({
  safeArea: {
    flex: 1,
    backgroundColor: 'var(--doc-bg)',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    height: 72,
    paddingHorizontal: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'var(--doc-border)',
    backgroundColor: 'var(--doc-surface-subtle)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'transparent',
    zIndex: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandBadge: {
    width: 46,
    height: 46,
    borderRadius: 18,
    backgroundColor: 'var(--brand-primary-soft)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  brandBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'var(--brand-primary)',
  },
  brandInfo: {
    marginRight: 28,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
  },
  brandSubtitle: {
    fontSize: 12,
    color: 'var(--doc-text-tertiary)',
  },
  topNav: {
    flexDirection: 'row',
    marginLeft: 32,
  },
  topNavItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 18,
  },
  topNavItemActive: {
    backgroundColor: 'var(--brand-primary-soft)',
  },
  topNavText: {
    fontSize: 14,
    color: 'var(--doc-text-secondary)',
  },
  topNavTextActive: {
    color: 'var(--brand-primary)',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchWrapper: {
    position: 'relative',
    width: 280,
    marginRight: 20,
  },
  searchInput: {
    width: '100%',
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: 'var(--control-bg)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    color: 'var(--doc-text-primary)',
    fontSize: 14,
  },
  searchPanel: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    maxHeight: 280,
    borderRadius: 18,
    backgroundColor: 'var(--doc-surface)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    overflow: 'hidden',
    boxShadow: 'var(--doc-shadow-md)',
    zIndex: 40,
  },
  searchItem: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'var(--doc-border)',
  },
  searchItemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--doc-text-primary)',
  },
  searchItemMeta: {
    fontSize: 12,
    color: 'var(--doc-text-tertiary)',
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionChip: {
    minWidth: 40,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'var(--brand-primary-soft)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  actionChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--brand-primary)',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 264,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'var(--doc-border)',
    backgroundColor: 'var(--doc-surface)',
  },
  sidebarContent: {
    paddingVertical: 36,
    paddingBottom: 60,
  },
  menuGroup: {
    paddingHorizontal: 28,
    marginBottom: 28,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: 'var(--doc-text-tertiary)',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuItemActive: {
    backgroundColor: 'var(--brand-primary-soft)',
  },
  menuItemText: {
    fontSize: 14,
    color: 'var(--doc-text-secondary)',
  },
  menuItemTextActive: {
    color: 'var(--brand-primary)',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentInner: {
    paddingHorizontal: 72,
    paddingVertical: 56,
  },
  contentInnerFull: {
    paddingRight: 72,
  },
  aside: {
    width: 220,
    paddingHorizontal: 28,
    paddingVertical: 48,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: 'var(--doc-border)',
    backgroundColor: 'var(--doc-surface)',
  },
  asideTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: 'var(--doc-text-tertiary)',
    marginBottom: 16,
  },
  anchorItem: {
    paddingVertical: 10,
    marginBottom: 6,
  },
  anchorItemSub: {
    paddingLeft: 12,
  },
  anchorText: {
    fontSize: 14,
    color: 'var(--doc-text-secondary)',
  },
});

export default DocLayout;
