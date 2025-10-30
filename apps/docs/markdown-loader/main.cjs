const { marked } = require('marked');

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

// 在文件级作用域初始化 marked 配置，防止重复创建
const renderer = new marked.Renderer();
marked.setOptions({
  renderer,
  breaks: true,
  gfm: true,
  xhtml: true,
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
            // 将 Example 替换为唯一组件名
            const value = sourceBlock[2]
              .replace('export default Example', '')
              .replace(/Example/g, cName);
            importChildrenCode += value;

            // 渲染 code block
            const codeMarked = marked(document[2] || '');
            const codeHtml = `<div className="code-block" dangerouslySetInnerHTML={{__html: ${JSON.stringify(codeMarked)}}} />`;

            // 展开/折叠控制
            const controlHtml = `<div className="control-block"><span onClick={()=>{
             const ele = document.getElementById("${id}");
             if (!ele) return;
             if (ele.classList.contains("show")) {
               ele.classList.replace("show", "hide");
             } else {
               ele.classList.replace("hide", "show");
             }
           }} /></div>`;

            // 标题
            const titleMarked = marked(document[1] || '');
            demoHtml = `<div className="demo-block">
             <div className="demo-block-title" dangerouslySetInnerHTML={{__html: ${JSON.stringify(titleMarked)}}} />
             <div className="demo-block-content"><${cName} /></div>
           </div>`;

            return `<div className="card hide" id="${id}">${demoHtml}${codeHtml}${controlHtml}</div>`;
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

  console.log(mdCodeHtml)
  console.log(mdApiHtml)
  console.log(demoHTML)
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
        <div className="doc-container">
          <div className="code-container">
            <div className="md-code">${mdCodeHtml}</div>
            <div className="md-api" dangerouslySetInnerHTML={{__html: ${JSON.stringify(cardWrapper(mdApiHtml))}}} />
          </div>
          <div className="demo-container">
            <div className="md-demo">${demoHTML}</div>
            <div className="md-api" dangerouslySetInnerHTML={{__html: ${JSON.stringify(cardWrapper(apiHTML))}}} />
          </div>
        </div>
      );
    }
    `
}
module.exports = markdownLoader;