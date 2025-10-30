module.exports = {
  presets: [
    [
      'module:@react-native/babel-preset',
      {
        // Let webpack handle ES module transforms so `exports` stays defined.
        disableImportExportTransform: true,
      },
    ],
    'nativewind/babel',
  ],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
