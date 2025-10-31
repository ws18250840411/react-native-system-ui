import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DocLayout from '@/components/DocLayout';
import { useLocale } from '@/context/LocaleContext';
import { getComponentDocs } from '@/docs/components';

const FEATURE_CARDS = [
  {
    title: '设计统一',
    description: '统一的视觉语言与组件语义，跨端保持品牌一致性。',
  },
  {
    title: '高性能',
    description: '面向移动端的轻量实现，启用按需加载、Tree Shaking。',
  },
  {
    title: 'TypeScript 原生',
    description: '完整的类型定义与 IDE 提示，放心扩展自定义主题。',
  },
  {
    title: '深色模式',
    description: '内置主题变量，可一键切换浅色 / 深色体验。',
  },
];

const QUICK_LINKS = [
  {
    title: '快速上手',
    description: '两分钟完成安装配置，体验组件库能力。',
    target: 'quick-start',
  },
  {
    title: '设计资产',
    description: 'Figma / Sketch 设计文件，与工程同步更新。',
    target: 'design-assets',
  },
  {
    title: '主题定制',
    description: '超过 700 个主题变量，满足品牌化诉求。',
    target: 'theme',
  },
];

export default function Home() {
  const navigation = useNavigation<any>();
  const { locale } = useLocale();
  const componentDocs = useMemo(() => getComponentDocs(), []);
  const firstDoc = useMemo(() => componentDocs[0], [componentDocs]);
  const searchItems = useMemo(
    () =>
      componentDocs.map((doc) => ({
        key: doc.slug,
        label: doc.titles[locale] ?? doc.titles['zh-CN'],
        group: doc.group,
      })),
    [componentDocs, locale],
  );

  const anchors = useMemo(
    () => [
      { id: 'hero', label: locale === 'zh-CN' ? '概览' : 'Overview' },
      { id: 'features', label: locale === 'zh-CN' ? '特性' : 'Highlights' },
      { id: 'quick-links', label: locale === 'zh-CN' ? '快速入口' : 'Quick Links' },
    ],
    [locale],
  );

  const navigateToComponents = () => {
    navigation.navigate('ComponentDoc', {
      slug: firstDoc?.slug ?? 'button',
    });
  };

  return (
    <DocLayout
      activeNav="home"
      menuGroups={[]}
      anchors={anchors}
      onSelectMenu={(key) => navigation.navigate('ComponentDoc', { slug: key })}
      showSidebar={false}
      showAnchors={false}
      searchItems={searchItems}
    >
      <View nativeID="hero" style={styles.heroContainer}>
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>全端体验设计系统</Text>
          <Text style={styles.heroTitle}>RN System UI</Text>
          <Text style={styles.heroSubtitle}>
            一个针对 React Native 打造的高质量组件库，覆盖应用搭建的核心场景，提供设计到工程的完整协作语言。
          </Text>
          <View style={styles.heroCtas}>
            <Pressable style={styles.primaryButton} onPress={navigateToComponents}>
              <Text style={styles.primaryButtonText}>开始使用</Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('ComponentDoc', { slug: 'button' })}
            >
              <Text style={styles.secondaryButtonText}>组件列表</Text>
            </Pressable>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>50+</Text>
              <Text style={styles.statLabel}>组件数量</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>700+</Text>
              <Text style={styles.statLabel}>主题变量</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>TypeScript</Text>
              <Text style={styles.statLabel}>完全支持</Text>
            </View>
          </View>
        </View>

        <View style={styles.heroPreview}>
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>组件态</Text>
            <Text style={styles.previewDescription}>即时预览不同状态与主题组合</Text>
            <View style={styles.previewPills}>
              <Text style={styles.previewPill}>React</Text>
              <Text style={styles.previewPillHighlight}>系统</Text>
              <Text style={styles.previewPill}>Next</Text>
            </View>
          </View>
          <View style={styles.phoneMockup}>
            <View style={styles.phoneContent}>
              <Text style={styles.phoneSectionTitle}>预约日程</Text>
              <View style={styles.phoneButtonsRow}>
                <Text style={[styles.phoneButton, styles.phoneButtonActive]}>昨天</Text>
                <Text style={styles.phoneButton}>今天</Text>
                <Text style={styles.phoneButton}>明天</Text>
              </View>
              <View style={styles.phoneSlider}>
                <View style={styles.phoneSliderTrack} />
                <View style={styles.phoneSliderThumb} />
                <View style={[styles.phoneSliderThumb, styles.phoneSliderThumbLower]} />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View nativeID="features" style={styles.section}>
        <Text style={styles.sectionTitle}>{locale === 'zh-CN' ? '核心特性' : 'Key Highlights'}</Text>
        <View style={styles.featureGrid}>
          {FEATURE_CARDS.map((card) => (
            <View key={card.title} style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>{card.title}</Text>
              <Text style={styles.featureCardDesc}>{card.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View nativeID="quick-links" style={styles.section}>
        <Text style={styles.sectionTitle}>{locale === 'zh-CN' ? '快速入口' : 'Quick Links'}</Text>
        <View style={styles.linksGrid}>
          {QUICK_LINKS.map((item) => (
            <Pressable key={item.title} style={styles.linkCard}>
              <Text style={styles.linkTitle}>{item.title}</Text>
              <Text style={styles.linkDesc}>{item.description}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </DocLayout>
  );
}

const styles = StyleSheet.create<any>({
  heroContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 64,
  },
  heroContent: {
    flex: 1,
    paddingRight: 32,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'var(--brand-primary-soft)',
    color: 'var(--brand-primary)',
    fontWeight: '600',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: '800',
    color: 'var(--doc-text-primary)',
    marginBottom: 18,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: 'var(--doc-text-secondary)',
    marginBottom: 32,
    maxWidth: 560,
  },
  heroCtas: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  primaryButton: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundImage: 'var(--brand-gradient)',
    shadowColor: 'rgba(79, 70, 229, 0.35)',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  secondaryButton: {
    marginLeft: 16,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'var(--brand-primary)',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'var(--brand-primary)',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCard: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: 'var(--doc-surface)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    marginRight: 18,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    color: 'var(--doc-text-tertiary)',
  },
  heroPreview: {
    width: 380,
    flexShrink: 0,
    flexDirection: 'column',
  },
  previewCard: {
    padding: 24,
    borderRadius: 28,
    backgroundColor: 'var(--doc-surface)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    boxShadow: 'var(--doc-shadow-md)',
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: 14,
    color: 'var(--doc-text-secondary)',
    marginBottom: 18,
  },
  previewPills: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'var(--control-bg)',
    color: 'var(--doc-text-secondary)',
    marginRight: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  previewPillHighlight: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'var(--brand-primary-soft)',
    color: 'var(--brand-primary)',
    marginRight: 12,
    fontSize: 12,
    fontWeight: '700',
  },
  phoneMockup: {
    borderRadius: 36,
    padding: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    backgroundColor: 'var(--doc-surface)',
    boxShadow: 'var(--doc-shadow-md)',
  },
  phoneContent: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    borderRadius: 24,
    padding: 20,
  },
  phoneSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
    marginBottom: 16,
  },
  phoneButtonsRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  phoneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'var(--control-bg)',
    color: 'var(--doc-text-secondary)',
    marginRight: 10,
    fontSize: 12,
  },
  phoneButtonActive: {
    backgroundColor: 'var(--brand-primary)',
    color: '#ffffff',
  },
  phoneSlider: {
    marginTop: 12,
    height: 80,
    justifyContent: 'center',
  },
  phoneSliderTrack: {
    position: 'absolute',
    left: 32,
    right: 32,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
  },
  phoneSliderThumb: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'var(--brand-primary)',
    top: 10,
    left: 60,
  },
  phoneSliderThumbLower: {
    left: 150,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: 'var(--brand-primary)',
  },
  section: {
    marginBottom: 72,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
    marginBottom: 24,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  featureCard: {
    width: '50%',
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  featureCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'var(--doc-text-primary)',
    marginBottom: 8,
  },
  featureCardDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: 'var(--doc-text-secondary)',
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  linkCard: {
    width: '33%',
    minWidth: 240,
    paddingHorizontal: 12,
    marginBottom: 24,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    backgroundColor: 'var(--doc-surface)',
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--doc-text-primary)',
    marginBottom: 8,
  },
  linkDesc: {
    fontSize: 14,
    color: 'var(--doc-text-secondary)',
    lineHeight: 20,
  },
});
