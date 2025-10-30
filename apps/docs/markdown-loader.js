const { marked } = require('marked');
const hljs = require('highlight.js');

/**
 * 包裹 h1~h6 的辅助函数，生成分组样式卡片
 */
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

  // 支持多种导出写法
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

// 在文件级作用域初始化 marked 配置，防止重复创建
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
});


function markdownLoader(source) {
  // ✅ 启用缓存（性能优化）
  this.cacheable && this.cacheable(true);

  const options = this.getOptions?.() || {};
  const { mode = 'mobile', className = '' } = options;

  let importChildrenCode = '';
  let codeHTML = '';
  let demoHTML = '';

  // --- 解析 API 文档区块 ---
  const apiMatch = source.match(/## API\s?([^]+)/g);
  const apiHTML = marked(apiMatch && apiMatch[0] || '');

  // --- 解析 Demo + 内容 ---
  demoHTML = marked(
    source
      .replace(/## API\s?([^]+)/g, '')
      .replace(/###\s?([^]+?)((?=###)|$)/g, (c) => {
        const id = Math.random().toString(36).substring(2, 10).toUpperCase();
        const document = c.match(/([^]*)\n?(```[^]+```)/);
        const cName = `C${id}`;

        // 默认纯 Markdown 渲染
        let demoHtml = '';
        if (document) {
          const sourceBlock = document[2].match(/```(.*)\n?([^]+)```/);
          if (sourceBlock && sourceBlock[2].includes('export default Example')) {
            // 将 Example 替换为唯一组件名，支持多种书写
            const transformed = transformExampleCode(sourceBlock[2], cName);
            if (!transformed) {
              return `<div className="md-section" dangerouslySetInnerHTML={{__html: ${JSON.stringify(cardWrapper(marked(c)))}}}></div>`;
            }
            importChildrenCode += transformed;
            // 标题
            const titleMarked = marked(document[1] || '');
            demoHtml = `<div className="demo-block">
             <div className="demo-block-title" dangerouslySetInnerHTML={{__html: ${JSON.stringify(titleMarked)}}} />
             <div className="demo-block-content"><${cName} /></div>
           </div>`;

            return `<div className="card hide" id="${id}">${demoHtml}</div>`;
          }
        }

        // 普通 Markdown 段落
        const otherCode = marked(c);
        return `<div className="md-section" dangerouslySetInnerHTML={{__html: ${JSON.stringify(cardWrapper(otherCode))}}}></div>`;
      })
  );

  // --- 普通 Markdown 内容 ---
  codeHTML = marked(
    source
      .replace(/## API\s?([^]+)/g, '')
      .replace(/###\s?([^]+?)((?=###)|$)/g, (c) => {
        const otherCode = marked(c);
        return `<div className="md-section" dangerouslySetInnerHTML={{__html: ${JSON.stringify(cardWrapper(otherCode))}}}></div>`;
      })
  );

  const mdCodeHtml = mode === 'mobile' ? codeHTML : '';
  const mdApiHtml = mode === 'mobile' ? apiHTML : '';
  return `
    import React, {
      useState,
      useEffect,
      useContext,
      useReducer,
      useCallback,
      useMemo,
      useRef,
      useImperativeHandle,
      useLayoutEffect,
      useDebugValue
    } from "react";
${importChildrenCode}
    export default function MarkdownComponent() {
      return (
        <div className={"doc-container md-${mode} ${className}"}>
          <div className="code-container">
            <div className="md-code">${mdCodeHtml}</div>
            <div className="md-api" dangerouslySetInnerHTML={{__html: ${JSON.stringify(cardWrapper(mdApiHtml))}}} />
          </div>
          <div className="demo-container">
            <div className="md-demo">${demoHTML}</div>
          </div>
        </div>
      );
    }
    `
}
module.exports = markdownLoader;
