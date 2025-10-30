// import avatarEn from '/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/components/avatar/index.en-US.md';
// import avatarZh from '/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/components/avatar/index.zh-CN.md';
// import buttonEn from '/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/components/button/index.en-US.md';
// import buttonZh from '/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/components/button/index.zh-CN.md';

import avatarEn from './avatar/index.en-US.md';
import avatarZh from './avatar/index.zh-CN.md';
import buttonEn from './button/index.en-US.md';
import buttonZh from './button/index.zh-CN.md';
import type { Locale } from '@/context/LocaleContext';


export type ComponentDocMeta = {
  slug: string;
  group: string;
  titles: Record<Locale, string> & { 'zh-CN': string; 'en-US': string };
  locales: Record<Locale, string> & { 'zh-CN': string; 'en-US': string };
};

const DOCS: ComponentDocMeta[] = [
  {
    slug: 'button',
    group: 'basic',
    titles: {
      'zh-CN': 'Button 按钮',
      'en-US': 'Button',
    },
    locales: {
      'zh-CN': buttonZh,
      'en-US': buttonEn,
    },
  },
  {
    slug: 'avatar',
    group: 'basic',
    titles: {
      'zh-CN': 'Avatar 头像',
      'en-US': 'Avatar',
    },
    locales: {
      'zh-CN': avatarZh,
      'en-US': avatarEn,
    },
  },
];

const GROUP_LABELS: Record<string, { 'zh-CN': string; 'en-US': string }> = {
  getting: {
    'zh-CN': '起步',
    'en-US': 'Getting Started',
  },
  basic: {
    'zh-CN': '基础组件',
    'en-US': 'Base Components',
  },
};

export function getComponentDocs() {
  return DOCS;
}

export function getComponentDoc(slug: string) {
  return DOCS.find((doc) => doc.slug === slug);
}

export function getMenuGroups(locale: Locale) {
  const groups = Object.keys(GROUP_LABELS).map((groupKey) => ({
    key: groupKey,
    title: GROUP_LABELS[groupKey][locale] ?? GROUP_LABELS[groupKey]['zh-CN'],
    items: DOCS.filter((doc) => doc.group === groupKey).map((doc) => ({
      key: doc.slug,
      label: doc.titles[locale] ?? doc.titles['zh-CN'],
    })),
  }));

  return groups.filter((group) => group.items.length > 0);
}
