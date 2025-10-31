import React, { useMemo } from 'react';
import { View } from 'react-native';
import { DocLayout } from '@/layout';
import { useLocale } from '@/context/LocaleContext';
import HomeZh, { metadata as homeZhMeta } from '@/pages/index/index.zh-CN.md';
import HomeEn, { metadata as homeEnMeta } from '@/pages/index/index.en-US.md';

const HOME_DOCS = {
  'zh-CN': { Component: HomeZh, metadata: homeZhMeta },
  'en-US': { Component: HomeEn, metadata: homeEnMeta },
} as const;

export default function HomeScreen() {
  const { locale } = useLocale();

  const doc = useMemo(() => HOME_DOCS[locale] ?? HOME_DOCS['zh-CN'], [locale]);
  const anchors = doc.metadata?.anchors ?? [];

  const DocComponent = doc.Component;

  return (
    <DocLayout activeNav="home" showSidebar={false} showAnchors={false} anchors={anchors}>
      <View nativeID="home">
        <DocComponent />
      </View>
    </DocLayout>
  );
}
