import React, { useMemo } from 'react';
import { marked } from 'marked';
import type { Token, Tokens } from 'marked';

marked.setOptions({
  gfm: true,
});

export type MarkdownViewProps = {
  markdown: string;
  compiled?: MarkdownResult;
  className?: string;
};

export type MarkdownAnchor = {
  id: string;
  label: string;
  depth: number;
};

export type MarkdownResult = {
  html: string;
  anchors: MarkdownAnchor[];
};

const NON_LATIN_WORD_BOUNDARY = /[^\p{Letter}\p{Number}\u4e00-\u9fa5\- ]+/gu;
const WHITESPACE = /\s+/g;

const slugify = (value: string) => {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(NON_LATIN_WORD_BOUNDARY, '')
    .replace(WHITESPACE, '-');

  return normalized || 'section';
};

const createSlugger = () => {
  const counts = new Map<string, number>();
  return (value: string) => {
    const base = slugify(value);
    const count = counts.get(base) ?? 0;
    const slug = count === 0 ? base : `${base}-${count}`;
    counts.set(base, count + 1);
    return slug;
  };
};

const isHeading = (token: Token): token is Tokens.Heading => token.type === 'heading';

export function compileMarkdown(markdown: string): MarkdownResult {
  const tokens = marked.lexer(markdown);
  const anchorSlugger = createSlugger();
  const renderSlugger = createSlugger();

  const anchors: MarkdownAnchor[] = tokens
    .filter((token): token is import('marked').Tokens.Heading => isHeading(token))
    .filter((token) => token.depth <= 3)
    .map((token) => ({
      id: anchorSlugger(token.text),
      label: token.text,
      depth: token.depth,
    }));

  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    const slug = renderSlugger(text);
    return `<h${level} id="${slug}">${text}</h${level}>`;
  };

  const html = marked.parser(tokens, { renderer });

  return { html, anchors };
}

export function useMarkdown(markdown: string) {
  return useMemo(() => compileMarkdown(markdown), [markdown]);
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({
  markdown,
  compiled,
  className,
}) => {
  const { html } = useMemo(() => compiled ?? compileMarkdown(markdown), [compiled, markdown]);

  return (
    <div
      className={className ? `markdown-body ${className}` : 'markdown-body'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
