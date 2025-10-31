declare module '*.md' {
  import type { MarkdownDocModule } from './markdown-module';

  const Component: MarkdownDocModule['default'];
  export const metadata: MarkdownDocModule['metadata'];
  export const raw: MarkdownDocModule['raw'];
  export const demoList: MarkdownDocModule['demoList'];
  export default Component;
}
