// markdown-plugin.js
function withMarkdown(config) {
    // 扩展文件扩展名支持
    config.resolver.sourceExts = [
      ...config.resolver.sourceExts,
      'md',
    ];
  
    // 指向同步转换器
    config.transformer.babelTransformerPath = require.resolve('./markdown-transformer.js');
  
    return config;
  }
  
  module.exports = withMarkdown;