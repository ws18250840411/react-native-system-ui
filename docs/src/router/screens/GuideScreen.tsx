import React, { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DocLayout } from '@/layout';
import { useLocale } from '@/context/LocaleContext';
import { getGuideDoc, getGuideDocs, type GuideDocMeta } from '@/docs/guide';

const scrollToId = (id: string) => {
  if (typeof document === 'undefined') return;
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const getLocaleDoc = (doc: GuideDocMeta | undefined, locale: string) => {
  if (!doc) {
    return undefined;
  }
  return doc.locales[locale as keyof GuideDocMeta['locales']]
    ?? doc.locales['zh-CN' as keyof GuideDocMeta['locales']];
};

export default function GuideScreen() {
  const { locale } = useLocale();
  const docs = useMemo(() => getGuideDocs(), []);
  const defaultSlug = docs[0]?.slug;
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = (route.params ?? {}) as { slug?: string };
  const currentSlug = params.slug;
  const activeSlug = currentSlug ?? defaultSlug;

  useEffect(() => {
    if (!defaultSlug || !activeSlug) {
      return;
    }
    if (!getGuideDoc(activeSlug)) {
      navigation.navigate('Guide', { slug: defaultSlug });
    }
  }, [activeSlug, defaultSlug, navigation]);

  const menuGroups = useMemo(
    () => [
      {
        title: locale === 'zh-CN' ? '指南' : 'Guide',
        items: docs.map((doc) => ({
          key: doc.slug,
          label: doc.titles[locale as keyof GuideDocMeta['titles']]
            ?? doc.titles['zh-CN' as keyof GuideDocMeta['titles']]
            ?? doc.slug,
        })),
      },
    ],
    [docs, locale],
  );

  const searchItems = useMemo(
    () =>
      docs.map((doc) => ({
        key: doc.slug,
        label: doc.titles[locale as keyof GuideDocMeta['titles']]
          ?? doc.titles['zh-CN' as keyof GuideDocMeta['titles']]
          ?? doc.slug,
        group: locale === 'zh-CN' ? '文档' : 'Docs',
      })),
    [docs, locale],
  );

  const activeDoc = useMemo(() => {
    if (!activeSlug) return undefined;
    return getGuideDoc(activeSlug) ?? (defaultSlug ? getGuideDoc(defaultSlug) : undefined);
  }, [activeSlug, defaultSlug]);

  const localeDoc = useMemo(() => getLocaleDoc(activeDoc, locale), [activeDoc, locale]);
  const anchors = localeDoc?.metadata?.anchors ?? [];
  const DocComponent = localeDoc?.Component;

  useEffect(() => {
    if (!defaultSlug || currentSlug) {
      return;
    }
    navigation.navigate('Guide', { slug: defaultSlug });
  }, [currentSlug, defaultSlug, navigation]);

  useEffect(() => {
    if (!activeSlug) return;
    const nextDoc = getLocaleDoc(getGuideDoc(activeSlug), locale);
    const firstAnchor = nextDoc?.metadata?.anchors?.[0]?.id;
    if (firstAnchor) {
      scrollToId(firstAnchor);
    } else {
      scrollToId(activeSlug);
    }
  }, [activeSlug, locale]);

  const handleSelectMenu = useCallback(
    (slug: string) => {
      if (slug === activeSlug) {
        const firstAnchor = anchors[0]?.id;
        if (firstAnchor) {
          scrollToId(firstAnchor);
        } else {
          scrollToId(slug);
        }
        return;
      }
      navigation.navigate('Guide', { slug });
    },
    [activeSlug, anchors, navigation],
  );

  return (
    <DocLayout
      activeNav="docs"
      activeMenu={activeSlug}
      menuGroups={menuGroups}
      anchors={anchors}
      onSelectMenu={handleSelectMenu}
      searchItems={searchItems}
    >
      {DocComponent ? (
        <View nativeID={activeSlug ?? 'guide'} style={{ marginBottom: 48 }}>
          <DocComponent />
        </View>
      ) : null}
    </DocLayout>
  );
}
