const upstreamTransformer = require("@expo/metro-config/babel-transformer");
const { marked } = require("marked");
const hljs = require("highlight.js");

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

function cardWrapper(html) {
  const group = html
    .replace(/<h1/g, ":::<h1")
    .replace(/<h2/g, ":::<h2")
    .replace(/<h3/g, ":::<h3")
    .replace(/<h4/g, ":::<h4")
    .replace(/<h5/g, ":::<h5")
    .replace(/<h6/g, ":::<h6")
    .split(":::");

  return group
    .map((fragment) => {
      if (fragment.indexOf("<h3") !== -1) {
        return `<div class="card">${fragment}</div>`;
      }
      return fragment;
    })
    .join("");
}

function transformMarked(code) {
  let importChildrenCode = "";
  let codeHTML = "";
  let demoHTML = "";
  let titleHTML = "";
  let importedModules = new Set();

  // title
  const titleMatch = code.match(/^#\s([^\n]+)/g);
  if (titleMatch) {
    titleHTML = marked(titleMatch[0], {
      xhtml: true,
      renderer: new marked.Renderer(),
    });
  }

  // api html
  const apiMatch = code.match(/## API\s?([^]+)/g);
  const apiHTML = marked((apiMatch && apiMatch[0]) || "", {
    xhtml: true,
    renderer: new marked.Renderer(),
  });

  // demo html
  demoHTML = marked(
    code
      .replace(/^#\s[^\n]+\n/g, "")
      .replace(/## API\s?([^]+)/g, "")
      .replace(/###\s?([^]+?)((?=###)|$)/g, (c) => {
        const id = parseInt(Math.random() * 1e9, 10)
          .toString(36)
          .toUpperCase();
        const document = c.match(/([^]*)\n?(```[^]+```)/);
        const cName = `C${id}`;

        // demo html
        let innerHtml = ``;
        if (document) {
          const source = document && document[2].match(/```(.*)\n?([^]+)```/);
          if (source && source[2].indexOf("export default Example") !== -1) {
            const imports = source[2].match(/import.*?;/g) || [];
            const newImports = imports.filter(
              (imp) => !importedModules.has(imp)
            );
            newImports.forEach((imp) => importedModules.add(imp));

            const codeWithoutImports = source[2].replace(/import.*?;/g, "");
            const value = codeWithoutImports
              .replace("export default Example", "")
              .replace("Example", `${cName}`);

            importChildrenCode =
              importChildrenCode + newImports.join("\n") + value;

            // demo html
            const titleContent = (document && document[1]) || "";
            const titleMatch = titleContent.match(/^([^\n]+)/);
            const titleMarked = marked.parse(titleMatch ? titleMatch[1] : "");

            innerHtml = `<div className="demo-block"><div className="demo-block-title" dangerouslySetInnerHTML={{__html: ${JSON.stringify(
              titleMarked
            )}}} /><div className="demo-block-content"><${cName} /></div></div>`;

            return innerHtml;
          }
        }
        return innerHtml;
      }),
    { xhtml: true, renderer: new marked.Renderer() }
  );

  // code html
  codeHTML = marked(
    code
      .replace(/^#\s[^\n]+\n/g, "")
      .replace(/## API\s?([^]+)/g, "")
      .replace(/###\s?([^]+?)((?=###)|$)/g, (c) => {
        const otherCode = marked(c);
        return `<div className="md-section" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
          cardWrapper(otherCode)
        )} }} ></div>`;
      }),
    {
      xhtml: true,
      renderer: new marked.Renderer(),
    }
  );

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
                cardWrapper(apiHTML)
              )} }} />
            </div>
          </div>
          <div className="demo-container">
            <div className="demo-container-title" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
              titleHTML
            )} }} />
            <div className="demo-container-content">${demoHTML}</div>
          </div>
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
    // 将Markdown转换为HTML
    const { code } = transformMarked(src);
    return upstreamTransformer.transform({
      ...props,
      src: code,
    });
  }

  return upstreamTransformer.transform(props);
};
