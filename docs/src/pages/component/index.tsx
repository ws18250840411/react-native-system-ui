import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import DocLayout from '@/components/DocLayout';
import { useLocale } from '@/context/LocaleContext';
import {
  getComponentDoc,
  getComponentDocs,
  getMenuGroups,
} from '@/docs/components';
import type { ComponentDocMeta } from '@/docs/components';

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
  const doc = useMemo<ComponentDocMeta | undefined>(() => {
    if (routeParams.slug) {
      return getComponentDoc(routeParams.slug) ?? fallbackDoc;
    }
    return fallbackDoc;
  }, [routeParams.slug, fallbackDoc]);

  const localeDoc = useMemo(() => {
    if (!doc) {
      return undefined;
    }
    return doc.locales[locale] ?? doc.locales['zh-CN'];
  }, [doc, locale]);

  const menuGroups = useMemo(
    () =>
      getMenuGroups(locale).map((group) => ({
        title: group.label,
        items: group.items,
      })),
    [locale],
  );

  const searchItems = useMemo(
    () =>
      allDocs.map((item) => ({
        key: item.slug,
        label: item.titles[locale] ?? item.titles['zh-CN'],
        group: item.group,
      })),
    [allDocs, locale],
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

  const anchors = localeDoc?.metadata.anchors ?? [];
  const DocContent = localeDoc?.Component ?? null;

  return (
    <DocLayout
      activeMenu={doc?.slug}
      activeNav="components"
      menuGroups={menuGroups}
      anchors={anchors}
      onSelectMenu={handleSelectMenu}
      searchItems={searchItems}
    >
      {DocContent ? <DocContent /> : null}
    </DocLayout>
  );
}
