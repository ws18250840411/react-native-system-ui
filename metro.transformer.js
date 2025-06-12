const upstreamTransformer = require("@expo/metro-config/babel-transformer");
const { marked } = require("marked");
const hljs = require("highlight.js");

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => hljs.highlightAuto(code).value,
});

const TITLE_REGEX = /^#\s([^\n]+)/g;
const API_REGEX = /## API\s?([^]+)/g;
const HEADING_SECTION_REGEX = /###\s?([^]+?)((?=###)|$)/g;
const CODE_BLOCK_REGEX = /([^]*)\n?(```[^]+```)/;
const CODE_CONTENT_REGEX = /```(.*)\n?([^]+)```/;
const IMPORT_REGEX = /import.*?;/g;
const FIRST_LINE_REGEX = /^([^\n]+)/;
const transformCache = new Map();

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const cardWrapper = memoize((html) => {
  if (!html) return "";

  const group = html
    .replace(/<h([1-6])/g, (match, level) => `:::${match}`)
    .split(":::");

  return group
    .map((fragment) => {
      return fragment.indexOf("<h3") !== -1
        ? `<div class="card">${fragment}</div>`
        : fragment;
    })
    .join("");
});

function transformMarked(code) {
  if (!code) return { code: "" };

  let importChildrenCode = "";
  let importedModules = new Set();

  // 提取标题
  const titleMatch = code.match(TITLE_REGEX);
  const titleHTML = titleMatch ? marked(titleMatch[0], { xhtml: true }) : "";

  // 提取 API 部分
  const apiMatch = code.match(API_REGEX);
  const apiHTML = marked((apiMatch && apiMatch[0]) || "", { xhtml: true });
  const wrappedApiHTML = cardWrapper(apiHTML);

  // 处理内容部分 - 提取代码前的内容
  const contentWithoutTitle = code
    .replace(TITLE_REGEX, "")
    .replace(API_REGEX, "");

  // 处理 demo HTML
  const demoHTML = marked(
    contentWithoutTitle.replace(HEADING_SECTION_REGEX, (c) => {
      const id = Math.random().toString(36).substring(2, 8).toUpperCase();
      const document = c.match(CODE_BLOCK_REGEX);
      const cName = `C${id}`;

      if (!document) return "";

      const source = document[2].match(CODE_CONTENT_REGEX);
      if (!source || source[2].indexOf("export default Example") === -1)
        return "";

      // 处理导入语句
      const imports = source[2].match(IMPORT_REGEX) || [];
      const newImports = imports.filter((imp) => !importedModules.has(imp));
      newImports.forEach((imp) => importedModules.add(imp));

      // 处理组件代码
      const codeWithoutImports = source[2].replace(IMPORT_REGEX, "");
      const value = codeWithoutImports
        .replace("export default Example", "")
        .replace(/\bExample\b/g, cName);

      importChildrenCode += newImports.join("\n") + value;

      // 生成 demo HTML
      const titleContent = document[1] || "";
      const titleMatch = titleContent.match(FIRST_LINE_REGEX);
      const titleMarked = marked.parse(titleMatch ? titleMatch[1] : "");

      return `<div className="demo-block">
        <div className="demo-block-title" dangerouslySetInnerHTML={{__html: ${JSON.stringify(
          titleMarked
        )}}} />
        <div className="demo-block-content"><${cName} /></div>
      </div>`;
    }),
    { xhtml: true }
  );

  // 处理代码 HTML
  const codeHTML = marked(
    contentWithoutTitle.replace(HEADING_SECTION_REGEX, (c) => {
      const otherCode = marked(c);
      return `<div className="md-section" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
        cardWrapper(otherCode)
      )} }} ></div>`;
    }),
    { xhtml: true }
  );

  // 生成模板
  const demoTemplate = demoHTML
    ? `
    <div className="demo-container">
      <div className="demo-container-wraper">
        <div className="demo-container-title" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
          titleHTML
        )} }} />
        <div className="demo-container-content">${demoHTML}</div>
      </div>
    </div>
  `
    : "";
  const template = `
    import React, {useState,useEffect,useContext,useReducer,useCallback,useMemo,useRef,useImperativeHandle,useLayoutEffect,useDebugValue} from "react"
    ${importChildrenCode}
    function ReactComponent(props) {
      return (
        <div className="doc-container md-mobile">
          <div className="code-container">
            <div className="code-container-title" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
              titleHTML
            )} }} />
            <div className="code-container-content">
              <div className="md-code">${codeHTML}</div>
              <div className="md-api" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                wrappedApiHTML
              )} }} />
            </div>
          </div>
          ${demoTemplate}
        </div>
      )
    }
    export default ReactComponent
  `;
  return { code: template };
}

module.exports.transform = async (props) => {
  const { filename, src } = props;

  if (filename.endsWith(".md")) {
    // 检查缓存中是否有结果
    const cacheKey = `${filename}:${src.length}:${src.slice(0, 100)}`;
    if (transformCache.has(cacheKey)) {
      return transformCache.get(cacheKey);
    }

    // 转换 Markdown 为 React 组件
    const { code } = transformMarked(src);
    const result = await upstreamTransformer.transform({
      ...props,
      src: code,
    });

    // 缓存结果
    transformCache.set(cacheKey, result);
    return result;
  }

  return upstreamTransformer.transform(props);
};
