import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { DocAnchorItem } from '@/layout/DocLayout';
import { useTheme } from '@/context/ThemeContext';

type Locale = 'zh-CN' | 'en-US';

type Metric = {
  value: string;
  label: string;
};

type CardItem = {
  title: string;
  description: string;
  accent: string;
  badge?: string;
};

type TimelineItem = {
  date: string;
  title: string;
  summary: string;
};

type HomeCopy = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  metrics: Metric[];
  features: {
    title: string;
    subtitle: string;
    items: CardItem[];
  };
  ecosystem: {
    title: string;
    subtitle: string;
    items: CardItem[];
  };
  timeline: {
    title: string;
    subtitle: string;
    items: TimelineItem[];
  };
  cta: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const HOME_COPY: Record<Locale, HomeCopy> = {
  'zh-CN': {
    hero: {
      eyebrow: '3.0 正式版已发布',
      title: 'RN System UI',
      highlight: '移动端设计体系',
      description:
        '开箱即用的高质量组件与主题体系，专为 React Native 打造。助力团队在 iOS / Android / Web 三端保持一致体验。',
      primaryCta: '开始使用',
      secondaryCta: '查看组件',
    },
    metrics: [
      { value: '50+', label: '生产级组件' },
      { value: '700+', label: '主题变量可配置' },
      { value: '99%', label: '类型覆盖率' },
    ],
    features: {
      title: '性能与体验两全',
      subtitle: '覆盖复杂业务场景的高质量组件体系。',
      items: [
        {
          title: '响应式体验',
          description: '专注移动端，支持平板与 Web，自适应暗色与动态主题。',
          accent: 'rgba(79, 70, 229, 0.18)',
          badge: 'Adaptive',
        },
        {
          title: '工程集成友好',
          description: 'TypeScript 原生设计，伴随 ESLint / Tailwind 等主流方案。',
          accent: 'rgba(37, 99, 235, 0.16)',
          badge: 'DX',
        },
        {
          title: '运维可观测',
          description: '可视化主题变量、性能监控与版本矩阵，一站式落地。',
          accent: 'rgba(16, 185, 129, 0.16)',
        },
      ],
    },
    ecosystem: {
      title: '生态协同',
      subtitle: '设计、工程与交付的闭环能力。',
      items: [
        {
          title: '设计资产同步',
          description: 'Figma / Sketch 设计资源实时同步，与组件输出一对一映射。',
          accent: 'rgba(14, 116, 144, 0.18)',
          badge: 'Design',
        },
        {
          title: 'CLI 项目脚手架',
          description: '一行命令创建企业模板，预置主题、路由与最佳实践。',
          accent: 'rgba(217, 119, 6, 0.16)',
          badge: 'CLI',
        },
        {
          title: '多云部署',
          description: '内建灰度发布、国际化与权限策略，助力规模化交付。',
          accent: 'rgba(59, 130, 246, 0.14)',
        },
      ],
    },
    timeline: {
      title: '最近更新',
      subtitle: '保持快速迭代的节奏，让体验持续进化。',
      items: [
        {
          date: '2025-10-18',
          title: 'v3.0 发布',
          summary: '全新的主题系统与 8 套移动端模板正式上线。',
        },
        {
          date: '2025-09-02',
          title: '动画引擎升级',
          summary: '底层升级至 Reanimated 4，交互性能提升 25%。',
        },
        {
          date: '2025-07-16',
          title: '主题资产开放',
          summary: '支持导入 Figma Tokens，同步更新 React Native 端样式。',
        },
      ],
    },
    cta: {
      title: '准备好让产品体验再提升一个维度了吗？',
      description:
        '使用 RN System UI 构建下一代移动体验，让设计与开发保持高度一致。',
      primaryCta: '立即创建模板',
      secondaryCta: '阅读升级指南',
    },
  },
  'en-US': {
    hero: {
      eyebrow: 'v3.0 is live',
      title: 'RN System UI',
      highlight: 'Design System for Mobile',
      description:
        'A production-ready component and theming system tailored for React Native. Deliver consistent UX across iOS, Android, and Web with ease.',
      primaryCta: 'Get Started',
      secondaryCta: 'Browse Components',
    },
    metrics: [
      { value: '50+', label: 'Production components' },
      { value: '700+', label: 'Theme tokens' },
      { value: '99%', label: 'Type coverage' },
    ],
    features: {
      title: 'Build delightful experiences',
      subtitle: 'A curated set of components covering real mobile scenarios.',
      items: [
        {
          title: 'Responsive by default',
          description: 'Optimised for phones, tablets, and the web with automatic dark mode.',
          accent: 'rgba(79, 70, 229, 0.18)',
          badge: 'Adaptive',
        },
        {
          title: 'Developer centric',
          description: 'First-class TypeScript support and tooling for ESLint, Tailwind, and CI.',
          accent: 'rgba(37, 99, 235, 0.16)',
          badge: 'DX',
        },
        {
          title: 'Operational insights',
          description: 'Theme dashboards, perf tracing, and release matrix all in one place.',
          accent: 'rgba(16, 185, 129, 0.16)',
        },
      ],
    },
    ecosystem: {
      title: 'Ecosystem ready',
      subtitle: 'Connect design, engineering, and delivery without friction.',
      items: [
        {
          title: 'Design sources',
          description: 'Figma and Sketch assets mirror code components with zero drift.',
          accent: 'rgba(14, 116, 144, 0.18)',
          badge: 'Design',
        },
        {
          title: 'CLI automation',
          description: 'Scaffold enterprise apps with routing, theming, and opinions pre-wired.',
          accent: 'rgba(217, 119, 6, 0.16)',
          badge: 'CLI',
        },
        {
          title: 'Cloud native',
          description: 'Gradual rollouts, localisation, and policy control across regions.',
          accent: 'rgba(59, 130, 246, 0.14)',
        },
      ],
    },
    timeline: {
      title: 'Latest updates',
      subtitle: 'We ship fast so your team can iterate even faster.',
      items: [
        {
          date: '2025-10-18',
          title: 'v3.0 release',
          summary: 'The redesigned theming core and eight mobile starter kits are out.',
        },
        {
          date: '2025-09-02',
          title: 'Animation overhaul',
          summary: 'Upgraded to Reanimated 4 with a 25% interaction performance gain.',
        },
        {
          date: '2025-07-16',
          title: 'Design token bridge',
          summary: 'Import Figma Tokens and sync them instantly to React Native styles.',
        },
      ],
    },
    cta: {
      title: 'Ready to elevate your product experience?',
      description:
        'Ship gorgeous, consistent mobile interfaces powered by RN System UI.',
      primaryCta: 'Create a project',
      secondaryCta: 'View upgrade guide',
    },
  },
};

type PhonePreviewProps = {
  locale: Locale;
  theme: 'light' | 'dark';
};

const PhonePreview: React.FC<PhonePreviewProps> = ({ locale, theme }) => {
  const isZh = locale === 'zh-CN';
  const statusBarText = isZh ? '周二 · 11:20' : 'Tue · 11:20';
  const reminderTitle = isZh ? '组件主题调色' : 'Theme accents';
  const reminderDesc = isZh ? '今晚前提交深色模式验收' : 'Submit dark mode QA by tonight';
  const calendarTitle = isZh ? '日期选择' : 'Calendar';
  const calendarMonth = isZh ? '2025 年 11 月' : 'Nov 2025';
  const toggleLabelPrimary = isZh ? 'React' : 'React';
  const toggleLabelSecondary = isZh ? 'TypeScript' : 'TypeScript';
  const scheduleLabel = isZh ? '今日待办' : 'Today';
  const scheduleAction = isZh ? '去完成' : 'Review';

  return (
    <View
      style={[
        styles.phoneShell,
        theme === 'dark' ? styles.phoneShellDark : styles.phoneShellLight,
        Platform.OS === 'web' ? styles.phoneShadowWeb : null,
      ]}
    >
      <View style={styles.phoneInner}>
        <View style={styles.phoneStatusBar}>
          <Text style={styles.phoneStatusText}>{statusBarText}</Text>
          <View style={styles.phoneStatusIcons}>
            <View style={styles.phoneStatusDot} />
            <View style={[styles.phoneStatusDot, styles.phoneStatusDotSpacing]} />
            <View
              style={[styles.phoneStatusDot, styles.phoneStatusDotWide, styles.phoneStatusDotSpacing]}
            />
          </View>
        </View>

        <View style={[styles.phoneCard, styles.phoneCardPrimary]}>
          <Text style={styles.phoneCardEyebrow}>{isZh ? 'March 25th' : 'March 25th'}</Text>
          <Text style={styles.phoneCardTitle}>{reminderTitle}</Text>
          <Text style={styles.phoneCardDescription}>{reminderDesc}</Text>
          <View style={styles.phoneProgressBar}>
            <View style={styles.phoneProgressFill} />
          </View>
        </View>

        <View style={[styles.phoneCard, styles.phoneCardSecondary]}>
          <Text style={styles.phoneCardLabel}>{calendarTitle}</Text>
          <Text style={styles.phoneCardMeta}>{calendarMonth}</Text>
          <View style={styles.phoneCalendar}>
            {[1, 2, 3, 4, 5].map((week) => (
              <View key={week} style={styles.phoneCalendarRow}>
                {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                  const day = (week - 1) * 7 + dayIndex + 1;
                  const isActive = day === 11;
                  return (
                    <View
                      key={`${week}-${dayIndex}`}
                      style={[styles.phoneCalendarCell, isActive ? styles.phoneCalendarCellActive : null]}
                    >
                      <Text
                        style={[styles.phoneCalendarText, isActive ? styles.phoneCalendarTextActive : null]}
                      >
                        {day <= 30 ? day : ''}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.phoneSegmentGroup}>
          <View style={[styles.phoneSegmentItem, styles.phoneSegmentItemActive]}>
            <Text style={styles.phoneSegmentTextActive}>{toggleLabelPrimary}</Text>
          </View>
          <View style={styles.phoneSegmentItem}>
            <Text style={styles.phoneSegmentText}>{toggleLabelSecondary}</Text>
          </View>
          <View style={styles.phoneSegmentItem}>
            <Text style={styles.phoneSegmentText}>{isZh ? 'Next' : 'Next'}</Text>
          </View>
        </View>

        <View style={styles.phoneSwitchRow}>
          <View style={[styles.phoneSwitch, styles.phoneSwitchActive]}>
            <View style={styles.phoneSwitchKnob} />
          </View>
          <View style={styles.phoneSwitch}>
            <View style={[styles.phoneSwitchKnob, styles.phoneSwitchKnobRight]} />
          </View>
          <View style={styles.phoneRadioGroup}>
            <View style={[styles.phoneRadio, styles.phoneRadioActive]} />
            <Text style={styles.phoneRadioLabel}>{toggleLabelPrimary}</Text>
          </View>
        </View>

        <View style={styles.phoneTimelineCard}>
          <View style={styles.phoneTimelineHeader}>
            <Text style={styles.phoneTimelineTitle}>{scheduleLabel}</Text>
            <Text style={styles.phoneTimelineAction}>{scheduleAction}</Text>
          </View>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.phoneTimelineRow}>
              <View style={styles.phoneTimelineDot} />
              <View style={styles.phoneTimelineContent}>
                <Text style={styles.phoneTimelineText}>
                  {isZh ? '交互验收 · ' : 'Interaction QA · '}
                  <Text style={styles.phoneTimelineTextStrong}>{item === 1 ? 'Button' : item === 2 ? 'Tabs' : 'Toast'}</Text>
                </Text>
                <Text style={styles.phoneTimelineMeta}>{isZh ? '今天 16:00 前完成' : 'Finish before 4 PM today'}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const HOME_ANCHORS: Record<Locale, DocAnchorItem[]> = {
  'zh-CN': [
    { id: 'overview', label: '概览', depth: 1 },
    { id: 'features', label: '核心特性', depth: 1 },
    { id: 'ecosystem', label: '生态能力', depth: 1 },
    { id: 'updates', label: '最近更新', depth: 1 },
    { id: 'cta', label: '快速上手', depth: 1 },
  ],
  'en-US': [
    { id: 'overview', label: 'Overview', depth: 1 },
    { id: 'features', label: 'Features', depth: 1 },
    { id: 'ecosystem', label: 'Ecosystem', depth: 1 },
    { id: 'updates', label: 'Updates', depth: 1 },
    { id: 'cta', label: 'Get Started', depth: 1 },
  ],
};

export const getHomeAnchors = (locale: Locale): DocAnchorItem[] => {
  return HOME_ANCHORS[locale] ?? HOME_ANCHORS['zh-CN'];
};

type HomePageProps = {
  locale: Locale;
};

const HomePage: React.FC<HomePageProps> = ({ locale }) => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const copy = useMemo(() => HOME_COPY[locale] ?? HOME_COPY['zh-CN'], [locale]);

  const handlePrimaryCta = () => {
    navigation.navigate('Guide');
  };

  const handleSecondaryCta = () => {
    navigation.navigate('ComponentDoc', { slug: 'button' });
  };

  return (
    <View style={styles.page}>
      <View style={styles.heroSection} nativeID="overview">
        <View style={[styles.heroCard, theme === 'dark' ? styles.heroCardDark : styles.heroCardLight]}>
          <View style={styles.heroGlow} />
          <View style={styles.heroContent}>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>{copy.hero.eyebrow}</Text>
            </View>
            <Text style={styles.heroTitle}>
              {copy.hero.title}
              {'\n'}
              <Text style={styles.heroHighlight}>{copy.hero.highlight}</Text>
            </Text>
            <Text style={styles.heroDescription}>{copy.hero.description}</Text>
            <View style={styles.heroActions}>
              <Pressable
                onPress={handlePrimaryCta}
                style={({ pressed }) => [
                  styles.buttonBase,
                  styles.buttonPrimary,
                  styles.buttonPrimarySpacing,
                  pressed ? styles.buttonPrimaryPressed : null,
                ]}
              >
                <Text style={styles.buttonPrimaryText}>{copy.hero.primaryCta}</Text>
              </Pressable>
              <Pressable
                onPress={handleSecondaryCta}
                style={({ pressed }) => [
                  styles.buttonBase,
                  styles.buttonGhost,
                  styles.buttonGhostSpacing,
                  pressed ? styles.buttonGhostPressed : null,
                ]}
              >
                <Text style={styles.buttonGhostText}>{copy.hero.secondaryCta}</Text>
              </Pressable>
            </View>
            <View style={styles.metricsRow}>
              {copy.metrics.map((metric) => (
                <View key={metric.label} style={styles.metricCard}>
                  <Text style={styles.metricValue}>{metric.value}</Text>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.heroPreview}>
            <PhonePreview locale={locale} theme={theme} />
          </View>
        </View>
      </View>

      <View style={styles.section} nativeID="features">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{copy.features.title}</Text>
          <Text style={styles.sectionSubtitle}>{copy.features.subtitle}</Text>
        </View>
        <View style={styles.cardGrid}>
          {copy.features.items.map((item) => (
            <View key={item.title} style={styles.featureCard}>
              <View style={[styles.featureBadge, { backgroundColor: item.accent }]}>
                <Text style={styles.featureBadgeText}>{item.badge ?? 'UI'}</Text>
              </View>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section} nativeID="ecosystem">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{copy.ecosystem.title}</Text>
          <Text style={styles.sectionSubtitle}>{copy.ecosystem.subtitle}</Text>
        </View>
        <View style={styles.cardGrid}>
          {copy.ecosystem.items.map((item) => (
            <View key={item.title} style={[styles.featureCard, styles.featureCardSoft]}>
              <View style={[styles.featureBadge, { backgroundColor: item.accent }]}>
                <Text style={styles.featureBadgeText}>{item.badge ?? 'Toolkit'}</Text>
              </View>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section} nativeID="updates">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{copy.timeline.title}</Text>
          <Text style={styles.sectionSubtitle}>{copy.timeline.subtitle}</Text>
        </View>
        <View style={styles.timelineList}>
          {copy.timeline.items.map((item, index) => (
            <View key={item.date} style={styles.timelineItem}>
              <View style={styles.timelineRail}>
                <View style={styles.timelineDot} />
                {index !== copy.timeline.items.length - 1 ? <View style={styles.timelineLine} /> : null}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineDate}>{item.date}</Text>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                <Text style={styles.timelineSummary}>{item.summary}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.ctaSection} nativeID="cta">
        <View style={[styles.ctaCard, theme === 'dark' ? styles.ctaCardDark : styles.ctaCardLight]}>
          <View style={styles.ctaGlow} />
          <Text style={styles.ctaTitle}>{copy.cta.title}</Text>
          <Text style={styles.ctaDescription}>{copy.cta.description}</Text>
          <View style={styles.heroActions}>
            <Pressable
              onPress={handlePrimaryCta}
              style={({ pressed }) => [
                styles.buttonBase,
                styles.buttonPrimary,
                styles.buttonPrimarySpacing,
                pressed ? styles.buttonPrimaryPressed : null,
              ]}
            >
              <Text style={styles.buttonPrimaryText}>{copy.cta.primaryCta}</Text>
            </Pressable>
            <Pressable
              onPress={handleSecondaryCta}
              style={({ pressed }) => [
                styles.buttonBase,
                styles.buttonGhost,
                styles.buttonGhostSpacing,
                pressed ? styles.buttonGhostPressed : null,
              ]}
            >
              <Text style={styles.buttonGhostText}>{copy.cta.secondaryCta}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    paddingBottom: 40,
    width: '100%',
  },
  heroSection: {
    width: '100%',
    marginBottom: 72,
  },
  heroCard: {
    position: 'relative',
    flexDirection: 'row',
    padding: 48,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    shadowColor: 'rgba(79, 70, 229, 0.25)',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 32 },
    shadowRadius: 48,
    elevation: 12,
    backgroundColor: 'var(--doc-surface)',
  },
  heroCardLight: {
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  heroCardDark: {
    backgroundColor: 'rgba(17, 28, 52, 0.82)',
  },
  heroGlow: {
    position: 'absolute',
    top: -120,
    right: -160,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: 'rgba(99, 102, 241, 0.28)',
    filter: Platform.OS === 'web' ? 'blur(72px)' : undefined,
  } as any,
  heroContent: {
    flex: 1,
    paddingRight: 48,
  },
  heroPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'var(--brand-primary-soft)',
    marginBottom: 20,
  },
  heroPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--brand-primary)',
  },
  heroTitle: {
    fontSize: 44,
    lineHeight: 52,
    fontWeight: '800',
    color: 'var(--doc-text-primary)',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroHighlight: {
    color: 'var(--brand-primary)',
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 26,
    color: 'var(--doc-text-secondary)',
    maxWidth: 520,
    marginBottom: 28,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    flexWrap: 'wrap',
  },
  buttonBase: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
  },
  buttonPrimarySpacing: {
    marginRight: 16,
  },
  buttonPrimary: {
    backgroundColor: 'var(--brand-primary)',
  },
  buttonPrimaryPressed: {
    backgroundColor: 'var(--brand-primary-active)',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonGhost: {
    backgroundColor: 'var(--control-bg)',
    borderColor: 'var(--brand-primary)',
  },
  buttonGhostSpacing: {
    marginRight: 0,
    marginLeft: 12,
  },
  buttonGhostPressed: {
    backgroundColor: 'var(--control-bg-hover)',
  },
  buttonGhostText: {
    color: 'var(--brand-primary)',
    fontSize: 15,
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  metricCard: {
    marginRight: 28,
    marginBottom: 14,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
  },
  metricLabel: {
    fontSize: 14,
    color: 'var(--doc-text-tertiary)',
  },
  heroPreview: {
    width: 320,
    alignItems: 'flex-end',
  },
  section: {
    backgroundColor: 'transparent',
    marginBottom: 72,
  },
  sectionHeader: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'var(--doc-text-secondary)',
    maxWidth: 580,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -14,
  },
  featureCard: {
    width: 320,
    marginHorizontal: 14,
    marginBottom: 28,
    padding: 24,
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    backgroundColor: 'var(--doc-surface)',
    shadowColor: 'rgba(15, 23, 42, 0.08)',
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 18 },
    shadowRadius: 28,
  },
  featureCardSoft: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  featureBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  featureBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#1f2937',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
    marginBottom: 10,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: 'var(--doc-text-secondary)',
  },
  timelineList: {
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
    backgroundColor: 'var(--doc-surface)',
    padding: 32,
    shadowColor: 'rgba(15, 23, 42, 0.08)',
    shadowOpacity: 0.25,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 24 },
  },
  timelineItem: {
    flexDirection: 'row',
    paddingBottom: 28,
  },
  timelineRail: {
    width: 32,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'var(--brand-primary)',
    marginTop: 4,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: 'var(--brand-primary-soft)',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 16,
  },
  timelineDate: {
    fontSize: 13,
    color: 'var(--doc-text-tertiary)',
    marginBottom: 6,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--doc-text-primary)',
    marginBottom: 8,
  },
  timelineSummary: {
    fontSize: 14,
    lineHeight: 22,
    color: 'var(--doc-text-secondary)',
  },
  ctaSection: {
    marginBottom: 40,
  },
  ctaCard: {
    position: 'relative',
    borderRadius: 36,
    padding: 48,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'var(--doc-border)',
  },
  ctaCardLight: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  ctaCardDark: {
    backgroundColor: 'rgba(79, 70, 229, 0.24)',
  },
  ctaGlow: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 20% -10%, rgba(96, 165, 250, 0.35), transparent 60%)',
    pointerEvents: 'none',
  } as any,
  ctaTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: 'var(--doc-text-primary)',
    marginBottom: 16,
  },
  ctaDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: 'var(--doc-text-secondary)',
    marginBottom: 28,
    maxWidth: 600,
  },
  phoneShell: {
    width: 240,
    borderRadius: 40,
    padding: 12,
    borderWidth: 2,
  },
  phoneShellLight: {
    borderColor: 'rgba(148, 163, 184, 0.3)',
    backgroundColor: '#f1f5f9',
  },
  phoneShellDark: {
    borderColor: 'rgba(148, 163, 184, 0.45)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  phoneShadowWeb: {
    boxShadow: '0 24px 48px rgba(15, 23, 42, 0.22)',
  } as any,
  phoneInner: {
    flex: 1,
    borderRadius: 32,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
  phoneStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  phoneStatusText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  phoneStatusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5f5',
  },
  phoneStatusDotSpacing: {
    marginLeft: 4,
  },
  phoneStatusDotWide: {
    width: 14,
  },
  phoneCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  phoneCardPrimary: {
    backgroundColor: '#4338ca',
  },
  phoneCardSecondary: {
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
  phoneCardEyebrow: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  phoneCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  phoneCardDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  phoneProgressBar: {
    height: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  phoneProgressFill: {
    width: '70%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#c4b5fd',
  },
  phoneCardLabel: {
    fontSize: 12,
    color: '#312e81',
    fontWeight: '600',
  },
  phoneCardMeta: {
    fontSize: 11,
    color: '#475569',
    marginBottom: 12,
  },
  phoneCalendar: {
    marginBottom: 6,
  },
  phoneCalendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  phoneCalendarCell: {
    width: 22,
    height: 22,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneCalendarCellActive: {
    backgroundColor: '#4338ca',
  },
  phoneCalendarText: {
    fontSize: 10,
    color: '#475569',
  },
  phoneCalendarTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  phoneSegmentGroup: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    padding: 4,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  phoneSegmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 999,
  },
  phoneSegmentItemActive: {
    backgroundColor: '#4338ca',
  },
  phoneSegmentText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  phoneSegmentTextActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  phoneSwitchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  phoneSwitch: {
    width: 44,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
    padding: 2,
    flexDirection: 'row',
  },
  phoneSwitchActive: {
    backgroundColor: '#4338ca',
    justifyContent: 'flex-end',
  },
  phoneSwitchKnob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
  },
  phoneSwitchKnobRight: {
    marginLeft: 'auto',
  },
  phoneRadioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneRadio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#4338ca',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneRadioActive: {
    backgroundColor: '#4338ca',
  },
  phoneRadioLabel: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
    marginLeft: 8,
  },
  phoneTimelineCard: {
    marginTop: 6,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    padding: 14,
  },
  phoneTimelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  phoneTimelineTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1f2937',
  },
  phoneTimelineAction: {
    fontSize: 11,
    color: '#4338ca',
    fontWeight: '600',
  },
  phoneTimelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  phoneTimelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4338ca',
    marginTop: 4,
    marginRight: 8,
  },
  phoneTimelineContent: {
    flex: 1,
  },
  phoneTimelineText: {
    fontSize: 11,
    color: '#1f2937',
    marginBottom: 2,
  },
  phoneTimelineTextStrong: {
    fontWeight: '700',
    color: '#4338ca',
  },
  phoneTimelineMeta: {
    fontSize: 10,
    color: '#475569',
  },
});
