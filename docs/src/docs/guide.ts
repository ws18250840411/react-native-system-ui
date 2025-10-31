import type { ComponentType } from 'react';

import type { Locale } from '@/context/LocaleContext';

import aboutZh, { metadata as aboutZhMeta } from '../pages/guide/about.zh-CN.md';
import aboutEn, { metadata as aboutEnMeta } from '../pages/guide/about.en-US.md';
import quickstartZh, { metadata as quickstartZhMeta } from '../pages/guide/quickstart.zh-CN.md';
import quickstartEn, { metadata as quickstartEnMeta } from '../pages/guide/quickstart.en-US.md';

export type GuideDocMeta = {
  slug: string;
  order: number;
  titles: Record<Locale, string | undefined>;
  locales: Record<
    Locale,
    {
      Component: ComponentType;
      metadata: typeof aboutZhMeta;
    }
  >;
};

const GUIDE_DOCS: GuideDocMeta[] = [
  {
    slug: 'about',
    order: 1,
    titles: {
      'zh-CN': '介绍',
      'en-US': 'Introduction',
    },
    locales: {
      'zh-CN': { Component: aboutZh, metadata: aboutZhMeta },
      'en-US': { Component: aboutEn, metadata: aboutEnMeta },
    },
  },
  {
    slug: 'quickstart',
    order: 2,
    titles: {
      'zh-CN': '快速上手',
      'en-US': 'Quick Start',
    },
    locales: {
      'zh-CN': { Component: quickstartZh, metadata: quickstartZhMeta },
      'en-US': { Component: quickstartEn, metadata: quickstartEnMeta },
    },
  },
];

export function getGuideDocs() {
  return [...GUIDE_DOCS].sort((a, b) => a.order - b.order);
}

export function getGuideDoc(slug: string) {
  return GUIDE_DOCS.find((doc) => doc.slug === slug);
}
