// markdown-transformer.js
const { transformSync } = require('@babel/core');
const { promisify } = require('util');

// 动态导入 ESM 模块
async function loadMarkdownProcessor() {
  const unified = await import('unified');
  const remarkParse = await import('remark-parse');
  const remarkHtml = await import('remark-html');
  
  return unified()
    .use(remarkParse)
    .use(remarkHtml);
}

// 缓存处理器实例
let processor = null;

// 同步包装器
function syncTransform({ src, filename, options }) {
  // 只处理 Markdown 文件
  if (!filename.endsWith('.md')) {
    const defaultTransformer = require(options.defaultTransformerPath);
    return defaultTransformer({ src, filename, options });
  }

  // 如果处理器还没加载完成，先使用默认转换器
  if (!processor) {
    loadMarkdownProcessor().then(p => {
      processor = p;
    });
    
    // 返回原始内容，等待处理器加载完成
    return {
      ast: null,
      code: src,
      filename,
      map: null,
    };
  }

  // 将 Markdown 转换为 HTML
  const htmlOutput = processor.processSync(src).toString();

  // 创建一个导出 HTML 的 React 组件
  const code = `
    import React from 'react';
    import { Text, View } from 'react-native';
    
    export default function MarkdownComponent() {
      return (
        <View>
          <Text>{${JSON.stringify(htmlOutput)}}</Text>
        </View>
      );
    }
  `;

  return {
    ast: null,
    code,
    filename,
    map: null,
  };
}

// 立即初始化处理器
loadMarkdownProcessor().then(p => {
  processor = p;
});

// 导出同步函数
module.exports = syncTransform;