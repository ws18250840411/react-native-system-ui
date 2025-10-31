import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DocLayout from '@/components/DocLayout';
import { useLocale } from '@/context/LocaleContext';
import { getComponentDocs } from '@/docs/components';

interface DocSection {
  key: string;
  anchor: string;
  label: string;
  description: string;
  bullets?: string[];
}

const scrollToAnchor = (anchor: string) => {
  if (typeof document === 'undefined') return;
  const target = document.getElementById(anchor);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const DocsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { locale } = useLocale();

  const sections = useMemo<DocSection[]>(() => {
    if (locale === 'zh-CN') {
      return [
        {
          key: 'introduction',
          anchor: 'introduction',
          label: '介绍',
          description:
            'RN System UI 是一个专注于 React Native 生态的设计系统与组件库，提供统一的视觉语言、主题体系，以及工程落地方案。',
          bullets: [
            '移动优先的交互体验，覆盖 App 与 Web 场景',
            '50+ 高质量组件、700+ 主题变量，满足定制化诉求',
            '完整的 TypeScript 类型、设计资源与文档示例',
          ],
        },
        {
          key: 'quick-start',
          anchor: 'quick-start',
          label: '快速上手',
          description: '按照以下步骤，几分钟内搭建项目并渲染首个页面。',
          bullets: [
            '安装依赖：npm install react-native-system-ui',
            '在应用入口注册 <Provider> 并配置主题',
            '按需导入组件与样式，享受一致的设计体验',
          ],
        },
        {
          key: 'environment',
          anchor: 'environment',
          label: '环境支持',
          description: '我们建议在以下运行时环境中使用组件库。',
          bullets: [
            'React Native 0.82 及以上版本 / Expo SDK 51+',
            'iOS 12、Android 8 或更高版本的移动设备',
            'Web 端支持现代浏览器：Chrome、Edge、Safari、Firefox',
          ],
        },
      ];
    }

    return [
      {
        key: 'introduction',
        anchor: 'introduction',
        label: 'Introduction',
        description:
          'RN System UI is a design system and component library crafted for React Native, delivering a unified visual language and engineering workflow.',
        bullets: [
          'Mobile-first experience across apps and web surfaces',
          '50+ polished components and 700+ theme tokens ready to customize',
          'Full TypeScript typings, design assets, and detailed documentation',
        ],
      },
      {
        key: 'quick-start',
        anchor: 'quick-start',
        label: 'Quick Start',
        description: 'Get your first screen running within minutes.',
        bullets: [
          'Install dependencies: npm install react-native-system-ui',
          'Register the <Provider> at the app root and configure the theme',
          'Import components on demand and start composing experiences',
        ],
      },
      {
        key: 'environment',
        anchor: 'environment',
        label: 'Environment Support',
        description: 'Recommended runtimes for the best experience.',
        bullets: [
          'React Native 0.82+ / Expo SDK 51+',
          'Modern mobile platforms: iOS 12 / Android 8 or newer',
          'Modern desktop browsers: Chrome, Edge, Safari, Firefox',
        ],
      },
    ];
  }, [locale]);

  const menuGroups = useMemo(
    () => [
      {
        title: locale === 'zh-CN' ? '指南' : 'Guide',
        items: sections.map((section) => ({ key: section.key, label: section.label })),
      },
    ],
    [locale, sections],
  );

  const anchors = useMemo(
    () => sections.map((section) => ({ id: section.anchor, label: section.label })),
    [sections],
  );

  const componentItems = useMemo(
    () =>
      getComponentDocs().map((doc) => ({
        key: doc.slug,
        label: doc.titles[locale] ?? doc.titles['zh-CN'],
        group: locale === 'zh-CN' ? '组件' : 'Components',
      })),
    [locale],
  );

  const searchItems = useMemo(
    () => [
      ...sections.map((section) => ({
        key: section.key,
        label: section.label,
        group: locale === 'zh-CN' ? '文档' : 'Docs',
      })),
      ...componentItems,
    ],
    [componentItems, locale, sections],
  );

  const [activeMenu, setActiveMenu] = useState(sections[0]?.key);

  const handleSelectMenu = useCallback(
    (key: string) => {
      const target = sections.find((section) => section.key === key);
      if (target) {
        setActiveMenu(key);
        scrollToAnchor(target.anchor);
        return;
      }
      navigation.navigate('ComponentDoc', { slug: key });
    },
    [navigation, sections],
  );

  return (
    <DocLayout
      activeNav="docs"
      activeMenu={activeMenu}
      menuGroups={menuGroups}
      anchors={anchors}
      onSelectMenu={handleSelectMenu}
      searchItems={searchItems}
    >
      {sections.map((section) => (
        <View key={section.key} nativeID={section.anchor} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.label}</Text>
          <Text style={styles.sectionDescription}>{section.description}</Text>
          {section.bullets ? (
            <View style={styles.bulletList}>
              {section.bullets.map((item) => (
                <View key={item} style={styles.bulletItem}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ))}
    </DocLayout>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 56,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: 'var(--doc-text-secondary)',
  },
  bulletList: {
    marginTop: 16,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletDot: {
    marginRight: 8,
    fontSize: 16,
    lineHeight: 22,
    color: 'var(--brand-primary)',
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: 'var(--doc-text-secondary)',
  },
});

export default DocsScreen;
