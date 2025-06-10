const upstreamTransformer = require("@expo/metro-config/babel-transformer");
const { marked } = require("marked");

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
      if (fragment.indexOf('<h3') !== -1) {
        return `<div class="card">${fragment}</div>`;
      }
      return fragment;
    })
    .join('');
}

function transformMarked(code, options) { 
  // const { mode = 'mobile', className = '' } = options;

  let importChildrenCode = '';
  let codeHTML = '';
  let demoHTML = '';

  // api html
  const apiMatch = code.match(/## API\s?([^]+)/g);
  const apiHTML = marked(apiMatch && apiMatch[0] || '', { xhtml: true, renderer: new marked.Renderer() });

  // demo html
  demoHTML = marked(code
  .replace(/## API\s?([^]+)/g, '')
  .replace(/###\s?([^]+?)((?=###)|$)/g, c => { 
    const id = parseInt((Math.random() * 1e9), 10).toString(36).toUpperCase();
    const document = c.match(/([^]*)\n?(```[^]+```)/);
    const cName = `C${id}`;

    // demo html
    let demoHtml = ``
    if (document) { 
      const source = document && document[2].match(/```(.*)\n?([^]+)```/);
      if (source && source[2].indexOf('export default Example') !== -1) { 
        const value = source[2].replace('export default Example', '').replace('Example', `${cName}`);
        importChildrenCode = importChildrenCode += value;

        // code html
        const codeMarked = marked.parse(document && document[2] || '');
        const codeHtml = `<div className="code-block" dangerouslySetInnerHTML={{__html: ${JSON.stringify(codeMarked)}}} />`;
        
        // control html
        const controlHtml = `<div className="control-block"><span onClick={()=>{
          const ele = document.getElementById("${id}");
          let classNames = ele.className;
          if(ele.className.indexOf('show') !== -1){
            classNames = ele.className.replace('show', 'hide')
          }
          else if(ele.className.indexOf('hide') !== -1){
            classNames = ele.className.replace('hide', 'show')
          }
          ele.className = classNames;
        }} /></div>`;

        // demo html
        const titleMarked = marked.parse(document && document[1] || '');
        demoHtml = `<div className="demo-block"><div className="demo-block-title" dangerouslySetInnerHTML={{__html: ${JSON.stringify(titleMarked)}}} /><div className="demo-block-content"><${cName} /></div></div>`;

        return `<div className="card hide" id="${id}">${demoHtml}${codeHtml}${controlHtml}</div>`;
      }
    }

    const otherCode = marked(c);
    return `<div className="md-section" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(cardWrapper(otherCode))} }} ></div>`;
  }), { xhtml: true, renderer: new marked.Renderer() });

  // code html
  codeHTML = marked(code
    .replace(/## API\s?([^]+)/g, '')
    .replace(/###\s?([^]+?)((?=###)|$)/g, c => { 
      const otherCode = marked(c);
      return `<div className="md-section" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(cardWrapper(otherCode))} }} ></div>`;
    })
  , { xhtml: true, renderer: new marked.Renderer() });

  const template = `
    import React, {useState,useEffect,useContext,useReducer,useCallback,useMemo,useRef,useImperativeHandle,useLayoutEffect,useDebugValue} from "react"
    ${importChildrenCode}
    function ReactComponent(props) {
      return (
        <div className="doc-container">
          <div className="code-container">
            <div className="md-code">${codeHTML}</div>
            <div className="md-api" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(cardWrapper(apiHTML))} }} />
          </div>
          <div className="demo-container">
            <div className="md-demo">${demoHTML}</div>
            <div className="md-api" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(cardWrapper(apiHTML))} }} />
          </div>
        </div>
      )
    }
    export default ReactComponent
  `
  return { code: template };
}

module.exports.transform = async (props) => {
  const { filename, src } = props;
  
  if (filename.endsWith('.md')) {
    // 将Markdown转换为HTML
    const { code } = transformMarked(src)
    return upstreamTransformer.transform({
      ...props,
      src: code,
    });
  }
  
  return upstreamTransformer.transform(props);
};
