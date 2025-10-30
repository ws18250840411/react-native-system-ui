import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import DocLayout from '@/components/DocLayout';
import {
  MarkdownView,
  compileMarkdown,
} from '@/components/MarkdownView';
import { useLocale } from '@/context/LocaleContext';
import {
  getComponentDoc,
  getComponentDocs,
  getMenuGroups,
} from '@/docs/components';

interface ComponentRouteParams {
  slug?: string;
}

export default function ComponentDocScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { locale } = useLocale();

  const allDocs = useMemo(() => getComponentDocs(), []);
  const fallbackDoc = allDocs[0];
  const routeParams = (route.params ?? {}) as ComponentRouteParams;
  const doc = useMemo(() => {
    if (routeParams.slug) {
      return getComponentDoc(routeParams.slug) ?? fallbackDoc;
    }
    return fallbackDoc;
  }, [routeParams.slug, fallbackDoc]);

  const markdown = useMemo(() => {
    if (!doc) {
      return '';
    }
    return doc.locales[locale] ?? doc.locales['zh-CN'];
  }, [doc, locale]);

  const compiled = useMemo(() => compileMarkdown(markdown), [markdown]);

  const menuGroups = useMemo(
    () =>
      getMenuGroups(locale).map((group) => ({
        title: group.title,
        items: group.items,
      })),
    [locale],
  );

  const handleSelectMenu = useCallback(
    (key: string) => {
      if (key === doc?.slug) {
        return;
      }
      navigation.navigate('ComponentDoc' as never, { slug: key } as never);
    },
    [doc?.slug, navigation],
  );

  return (
    <DocLayout
      activeMenu={doc?.slug}
      menuGroups={menuGroups}
      anchors={compiled.anchors.map((anchor) => ({
        id: anchor.id,
        label: anchor.label,
        depth: anchor.depth,
      }))}
      onSelectMenu={handleSelectMenu}
    >
      <MarkdownView markdown={markdown} compiled={compiled} />
    </DocLayout>
  );
}
