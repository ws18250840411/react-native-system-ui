import type { ComponentType } from 'react';

export type MarkdownAnchor = {
  id: string;
  label: string;
  depth: number;
};

export type MarkdownDemoMeta = {
  id: string;
  title: string;
  anchor: string;
  language: string;
};

export type MarkdownDemo = {
  id: string;
  anchor: string;
  title: string;
  descriptionHtml: string;
  codeHtml: string;
  rawCode: string;
  language: string;
  Component: ComponentType;
};

export type MarkdownMetadata = {
  anchors: MarkdownAnchor[];
  demos: MarkdownDemoMeta[];
};

export type MarkdownDocModule = {
  default: ComponentType;
  metadata: MarkdownMetadata;
  raw: string;
  demoList: MarkdownDemo[];
};
