const { marked } = require('marked');
const hljs = require('highlight.js');

function cardWrapper(html) {
  const group = html
    .replace(/<h1/g, ':::<h1')
    .replace(/<h2/g, ':::<h2')
    .replace(/<h3/g, ':::<h3')
    .replace(/<h4/g, ':::<h4')
    .replace(/<h5/g, ':::<h5')
    .replace(/<h6/g, ':::<h6')
    .split(':::');

  return group
    .map((fragment) => {
      if (fragment.includes('<h3')) {
        return `<div class="card">${fragment}</div>`;
      }
      return fragment;
    })
    .join('');
}

function normaliseLineBreaks(code) {
  return code.replace(/\r\n/g, '\n');
}

function extractImports(code) {
  const importLines = [];
  const bodyLines = [];
  const lines = code.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^import\s+.+from\s+['"][^'"]+['"]\s*;?$/u.test(trimmed)) {
      importLines.push(trimmed.replace(/;$/, ''));
    } else {
      bodyLines.push(line);
    }
  }

  return {
    imports: importLines,
    body: bodyLines.join('\n'),
  };
}

function registerImport(registry, statement) {
  const match = statement.match(/^import\s+(.+)\s+from\s+['"]([^'"]+)['"]$/u);
  if (!match) {
    return;
  }
  const [, specifiersRaw, source] = match;
  if (source === 'react') {
    return;
  }

  if (!registry.has(source)) {
    registry.set(source, { default: null, named: new Map() });
  }
  const entry = registry.get(source);

  const specifiers = specifiersRaw.trim();
  let defaultPart = null;
  let namedPart = null;

  if (specifiers.startsWith('{')) {
    namedPart = specifiers;
  } else if (specifiers.includes('{')) {
    const [defaultImport, namedImports] = specifiers.split('{');
    defaultPart = defaultImport.trim().replace(/,$/, '');
    namedPart = `{${namedImports}`;
  } else {
    defaultPart = specifiers.replace(/,$/, '');
  }

  if (defaultPart && !entry.default) {
    entry.default = defaultPart;
  }

  if (namedPart) {
    const names = namedPart
      .replace(/^{|}$/g, '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    for (const name of names) {
      const key = name.replace(/\s+/g, ' ');
      if (!entry.named.has(key)) {
        entry.named.set(key, name);
      }
    }
  }
}

function buildImportStatements(registry) {
  const statements = [];
  for (const [source, entry] of registry.entries()) {
    const named = Array.from(entry.named.values());
    if (entry.default && named.length > 0) {
      statements.push(`import ${entry.default}, { ${named.join(', ')} } from '${source}';`);
    } else if (entry.default) {
      statements.push(`import ${entry.default} from '${source}';`);
    } else if (named.length > 0) {
      statements.push(`import { ${named.join(', ')} } from '${source}';`);
    }
  }
  return statements.join('\n');
}

function transformExampleCode(rawCode, componentName) {
  if (!rawCode) return null;

  let code = normaliseLineBreaks(rawCode);
  let matched = false;

  const replaceAll = (pattern, replacer) => {
    const next = code.replace(pattern, replacer);
    if (next !== code) {
      matched = true;
      code = next;
    }
  };

  replaceAll(/export\s+default\s+Example\s*=\s*/g, 'const Example = ');
  replaceAll(/export\s+default\s+function\s+Example/g, 'function Example');
  replaceAll(/export\s+default\s+class\s+Example/g, 'class Example');
  replaceAll(/export\s+default\s+\(\s*\)\s*=>/g, 'const Example = () =>');
  replaceAll(/export\s+default\s+async\s+\(\s*\)\s*=>/g, 'const Example = async () =>');
  replaceAll(/export\s+default\s+function\s*\(/g, 'function Example(');
  replaceAll(/export\s+default\s+async\s+function\s*\(/g, 'async function Example(');
  replaceAll(/export\s+default\s+class\s*\(/g, 'class Example(');
  replaceAll(/export\s+default\s+Example\s*;?/g, '');

  if (/export\s+default\s+/.test(code)) {
    replaceAll(/export\s+default\s+([^;]+);?/g, (_, expression) => {
      const trimmed = expression.trim().replace(/;$/, '');
      return `const Example = ${trimmed};`;
    });
  }

  if (!matched && !/\bExample\b/.test(code)) {
    return null;
  }

  const renamed = code.replace(/\bExample\b/g, componentName);
  return `\n${renamed.trim()}\n`;
}

function highlightCode(code, language) {
  const lang = (language || '').trim();
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(code, { language: lang }).value;
  }
  return hljs.highlightAuto(code).value;
}

function slugifyFallback(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\u4e00-\u9fa5\- ]+/gu, '')
    .replace(/\s+/g, '-');
}

function markdownLoader(source) {
  if (typeof this.cacheable === 'function') {
    this.cacheable(true);
  }

  const options = (typeof this.getOptions === 'function' && this.getOptions()) || {};
  const { mode = 'mobile', className = '' } = options;
  const input = typeof source === 'string' ? source : source.toString();

  const slugger = new marked.Slugger();
  const tokens = marked.lexer(input);
  const headingQueue = [];
  const importRegistry = new Map();

  tokens.forEach((token) => {
    if (token.type === 'heading') {
      const slug = slugger.slug(token.text);
      headingQueue.push({
        text: token.text,
        depth: token.depth,
        slug,
      });
    }
  });

  const anchors = headingQueue
    .filter((item) => item.depth <= 3)
    .map((item) => ({
      id: item.slug,
      label: item.text,
      depth: item.depth,
    }));

  let headingPointer = 0;

  const createRenderer = (consumeHeadings = true) => {
    const renderer = new marked.Renderer();
    renderer.heading = (text, level) => {
      let slug = slugifyFallback(text);
      if (consumeHeadings) {
        let heading = headingQueue[headingPointer];
        if (heading && heading.text === text && heading.depth === level) {
          slug = heading.slug;
          headingPointer += 1;
        } else {
          const foundIndex = headingQueue.findIndex(
            (item, index) => index >= headingPointer && item.text === text && item.depth === level,
          );
          if (foundIndex !== -1) {
            heading = headingQueue[foundIndex];
            slug = heading.slug;
            headingPointer = foundIndex + 1;
          }
        }
      }
      return `<h${level} id="${slug}">${text}</h${level}>`;
    };

    renderer.code = (code, infostring) => {
      const lang = (infostring || '').trim();
      const highlighted = highlightCode(code, lang);
      const language = lang || 'plaintext';
      return `<pre><code class="language-${language}">${highlighted}</code></pre>`;
    };

    return renderer;
  };

  const renderMarkdown = (markdown, consumeHeadings = true) => {
    if (!markdown.trim()) {
      return { html: '', headings: [] };
    }
    const localHeadings = [];
    const renderer = createRenderer(consumeHeadings);

    const originalHeading = renderer.heading.bind(renderer);
    renderer.heading = (text, level) => {
      const html = originalHeading(text, level);
      localHeadings.push({ text, depth: level, html });
      return html;
    };

    const html = marked.parse(markdown, { renderer });
    return { html, headings: localHeadings };
  };

  const renderInline = (markdown) => {
    if (!markdown || !markdown.trim()) {
      return '';
    }
    const standaloneRenderer = createRenderer(false);
    return marked.parse(markdown, { renderer: standaloneRenderer });
  };

  const apiHeadingMatch = input.match(/^##\s+API.*$/m);
  const apiIndex = apiHeadingMatch ? apiHeadingMatch.index : -1;

  const contentPart = apiIndex >= 0 ? input.slice(0, apiIndex) : input;
  const apiPart = apiIndex >= 0 ? input.slice(apiIndex) : '';

  const sectionMatches = [...contentPart.matchAll(/^###\s+(.+)$/gm)];
  const sections = sectionMatches.map((match, index) => {
    const heading = (match[1] || '').trim();
    const start = match.index ?? 0;
    const end = index + 1 < sectionMatches.length ? sectionMatches[index + 1].index ?? contentPart.length : contentPart.length;
    const slice = contentPart.slice(start, end).trim();
    const content = slice.replace(/^###\s+.+\r?\n?/, '');
    return {
      heading,
      content,
      markdown: slice,
    };
  });

  const firstSectionIndex = sectionMatches.length > 0 ? sectionMatches[0].index ?? null : null;

  const introMarkdown =
    firstSectionIndex !== null ? contentPart.slice(0, firstSectionIndex).trim() : contentPart.trim();

  const docSections = [];
  if (introMarkdown) {
    const { html } = renderMarkdown(introMarkdown, true);
    if (html.trim()) {
      docSections.push({
        type: 'intro',
        html: `<section class="md-section">${cardWrapper(html)}</section>`,
      });
    }
  }

  const processedSections = [];
  sections.forEach((section) => {
    const { html, headings } = renderMarkdown(section.markdown, true);
    const headingInfo = headings.find((item) => item.depth === 3) || headings[0] || null;
    const slug = headingInfo ? (headingInfo.html.match(/id="([^"]+)"/) || [])[1] : null;

    processedSections.push({
      slug,
      heading: section.heading,
      content: section.content,
      markdown: section.markdown,
    });

    docSections.push({
      type: 'section',
      slug,
      heading: section.heading,
      html: `<section class="md-section" data-doc-anchor="${slug || ''}">${cardWrapper(html)}</section>`,
    });
  });

  const { html: apiHtmlRaw } = renderMarkdown(apiPart, true);
  const apiHtml = apiHtmlRaw ? `<section class="md-section">${cardWrapper(apiHtmlRaw)}</section>` : '';

  let importChildrenCode = '';
  const demosData = [];
  let demoCounter = 0;

  processedSections.forEach((section) => {
    const codeBlockRegex = /```([\w-]+)?\s*\n([\s\S]*?)```/g;
    let codeMatch;
    let lastIndex = 0;
    let localDemoIndex = 0;

    while ((codeMatch = codeBlockRegex.exec(section.content)) !== null) {
      const language = (codeMatch[1] || '').trim();
      const demoCode = codeMatch[2];
      if (!/export\s+default\s+Example/.test(demoCode)) {
        lastIndex = codeBlockRegex.lastIndex;
        continue;
      }

      const componentName = `Demo${++demoCounter}`;
      const transformed = transformExampleCode(demoCode, componentName);
      if (!transformed) {
        lastIndex = codeBlockRegex.lastIndex;
        continue;
      }

      const { imports, body } = extractImports(transformed);
      imports.forEach((statement) => registerImport(importRegistry, statement));
      if (body.trim()) {
        importChildrenCode += `\n${body}\n`;
      }

      const highlighted = highlightCode(demoCode, language);
      const descriptionMarkdown = section.content.slice(lastIndex, codeMatch.index).trim();
      const descriptionHtml = renderInline(descriptionMarkdown);
      const demoId = `${section.slug || componentName}-demo${localDemoIndex + 1}`;

      demosData.push({
        id: demoId,
        anchor: section.slug || demoId,
        title: section.heading,
        descriptionHtml,
        codeHtml: highlighted,
        codeRaw: demoCode,
        language: language || 'jsx',
        componentName,
      });

      localDemoIndex += 1;
      lastIndex = codeBlockRegex.lastIndex;
    }
  });

  const codeHtml = docSections.map((section) => section.html).join('');

  const demosCode = `[${demosData
    .map(
      (demo) => `{
  id: ${JSON.stringify(demo.id)},
  anchor: ${JSON.stringify(demo.anchor)},
  title: ${JSON.stringify(demo.title)},
  descriptionHtml: ${JSON.stringify(demo.descriptionHtml)},
  codeHtml: ${JSON.stringify(demo.codeHtml)},
  rawCode: ${JSON.stringify(demo.codeRaw)},
  language: ${JSON.stringify(demo.language)},
  Component: ${demo.componentName}
}`,
    )
    .join(',\n')}]`;

  const metadata = {
    anchors,
    demos: demosData.map((demo) => ({
      id: demo.id,
      title: demo.title,
      anchor: demo.anchor,
      language: demo.language,
    })),
  };

  const docClassName = ['doc-container', `md-${mode}`, className].filter(Boolean).join(' ');
  const dedupedImports = buildImportStatements(importRegistry);

  return `
    import React from "react";
${dedupedImports ? `${dedupedImports}\n` : ''}${importChildrenCode}
    const codeHtml = ${JSON.stringify(codeHtml)};
    const apiHtml = ${JSON.stringify(apiHtml)};
    const demoList = ${demosCode};
    const docClassName = ${JSON.stringify(docClassName)};

    export const metadata = ${JSON.stringify(metadata)};
    export const raw = ${JSON.stringify(input)};

    export default function MarkdownComponent() {
      return (
        <div className={docClassName}>
          <div className="code-container">
            <div className="md-code" dangerouslySetInnerHTML={{ __html: codeHtml }} />
            {apiHtml && (
              <div className="md-api" dangerouslySetInnerHTML={{ __html: apiHtml }} />
            )}
          </div>
          <div className="demo-container">
            {demoList.length === 0 ? (
              <div className="demo-empty">暂无示例</div>
            ) : (
              demoList.map((demo) => {
                const DemoComponent = demo.Component;
                return (
                  <section key={demo.id} id={demo.id} className="demo-block">
                    <header className="demo-block-title">
                      <h3>{demo.title}</h3>
                    </header>
                    {demo.descriptionHtml ? (
                      <div
                        className="demo-block-description"
                        dangerouslySetInnerHTML={{ __html: demo.descriptionHtml }}
                      />
                    ) : null}
                    <div className="demo-block-content">
                      <DemoComponent />
                    </div>
                    <details className="demo-block-code">
                      <summary>查看代码</summary>
                      <div
                        className="demo-code"
                        dangerouslySetInnerHTML={{ __html: demo.codeHtml }}
                      />
                    </details>
                  </section>
                );
              })
            )}
          </div>
        </div>
      );
    }

    export { demoList };
  `;
}

module.exports = markdownLoader;
