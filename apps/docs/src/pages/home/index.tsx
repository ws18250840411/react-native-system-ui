import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-system-ui';
import DocLayout from '@/components/DocLayout';
import { useLocale } from '@/context/LocaleContext';
import { getComponentDocs, getMenuGroups } from '@/docs/components';
import MarkdownComponent from '@/docs/demo.md';

const FEATURE_CARDS = [
  {
    title: '原子化设计体系',
    description: '通过统一的设计变量与组件范式，让跨平台视觉和交互保持一致。',
  },
  {
    title: '移动优先体验',
    description: '所有组件以移动端体验为核心，兼顾 Web 场景的像素级效果。',
  },
  {
    title: '按需加载',
    description: '提供树摇友好的导出方式，帮助你打造极致轻量的运行包体。',
  },
  {
    title: 'TypeScript 强类型',
    description: '完整的类型提示与文档，在 IDE 中也能获得丝滑的开发体验。',
  },
];

const QUICK_LINKS = [
  { title: '安装指引', description: '两步完成环境准备，快速集成设计体系。' },
  { title: '主题定制', description: '结合 tokens 与 hooks，自定义品牌色彩与字体。' },
  { title: '设计资源', description: '同步提供 Figma/Sketch 资源，加速设计开发协同。' },
];

export default function Home() {
  const navigation = useNavigation<any>();
  const { locale } = useLocale();
  const menuGroups = useMemo(
    () =>
      getMenuGroups(locale).map((group) => ({
        title: group.title,
        items: group.items,
      })),
    [locale],
  );
  const firstDoc = useMemo(() => getComponentDocs()[0], []);

  return (
    <DocLayout
      activeMenu="getting-started"
      menuGroups={menuGroups}
      onSelectMenu={(key) => navigation.navigate('ComponentDoc', { slug: key })}
    >
      {/* <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>React Native System UI</Text>
        </View>
        <Text style={styles.heroTitle}>跨平台原子化组件库</Text>
        <Text style={styles.heroDescription}>
          一套为 React Native 打造的系统级 UI 解决方案。保持设计一致性、支持深浅色模式，并在移动与 Web 端都拥有一致的交互体验。
        </Text>
        <View style={styles.ctaRow}>
          <Button
            title="开始使用"
            style={styles.primaryCta}
            onPress={() =>
              navigation.navigate('ComponentDoc', {
                slug: firstDoc?.slug ?? 'button',
              })
            }
          />
          <Button
            title="浏览组件"
            variant="ghost"
            style={styles.secondaryCta}
            textStyle={styles.secondaryCtaText}
            onPress={() =>
              navigation.navigate('ComponentDoc', {
                slug: firstDoc?.slug ?? 'button',
              })
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>核心特性</Text>
        <View style={styles.featureGrid}>
          {FEATURE_CARDS.map((card) => (
            <View key={card.title} style={styles.featureCard}>
              <Text style={styles.featureTitle}>{card.title}</Text>
              <Text style={styles.featureDescription}>{card.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>快速入口</Text>
        <View style={styles.quickLinks}>
          {QUICK_LINKS.map((item) => (
            <View key={item.title} style={styles.quickLinkCard}>
              <Text style={styles.quickLinkTitle}>{item.title}</Text>
              <Text style={styles.quickLinkDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View> */}
      <MarkdownComponent />
    </DocLayout>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#EEF2FF',
    borderRadius: 32,
    paddingVertical: 48,
    paddingHorizontal: 48,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#C7D2FE',
    shadowColor: '#4338CA',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59,130,246,0.12)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(59,130,246,0.18)',
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 18,
    lineHeight: 28,
    color: '#374151',
    maxWidth: 560,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  primaryCta: {
    marginRight: 16,
  },
  secondaryCta: {
    borderColor: '#93C5FD',
  },
  secondaryCtaText: {
    color: '#1D4ED8',
  },
  section: {
    marginTop: 56,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  featureCard: {
    width: '50%',
    minWidth: 260,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4B5563',
  },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  quickLinkCard: {
    width: '33.3333%',
    minWidth: 240,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  quickLinkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  quickLinkDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
});
