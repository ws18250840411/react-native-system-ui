const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("md", "mdx");

config.transformer.babelTransformerPath = require.resolve(
  "./metro.transformer.js"
);

module.exports = config;


// // metro.config.js
// const { getDefaultConfig } = require('@expo/metro-config');
// const withMarkdown = require('./markdown-plugin.js');

// const config = getDefaultConfig(__dirname);

// // 添加对 ESM 的支持
// config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'md');
// config.resolver.sourceExts = [...config.resolver.sourceExts, 'md', 'mjs', 'jsx', 'cjs'];

// // 应用 Markdown 处理插件
// module.exports = withMarkdown(config);