const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  devServer: {
    port: 3000,
    hot: true,
    // open: true,
    historyApiFallback: true,
  },
  entry: './index.web.js',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: (modulePath) => {
          if (!modulePath) return false;
          if (modulePath.includes(`node_modules${path.sep}react-native-css-interop`)) {
            return false;
          }
          return /node_modules/.test(modulePath);
        },
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      },
      // {
      //   test: /\.md$/,
      //   type: 'asset/source',
      // }
      {
        test: /\.md$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ['@babel/plugin-transform-class-properties', { loose: true }],
                ['@babel/plugin-transform-private-methods', { loose: true }],
                ['@babel/plugin-transform-private-property-in-object', { loose: true }],
              ],
            },
          },
          path.resolve(__dirname, 'markdown-loader.js'), // 引用自定义 loader 变量
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-native$': path.resolve(__dirname, 'src/polyfills/react-native-web.tsx'),
      'react-native-css-interop$': path.resolve(__dirname, 'src/polyfills/react-native-css-interop.ts'),
      'react-native-css-interop/jsx-runtime$': path.resolve(__dirname, 'src/polyfills/react-native-css-interop-jsx-runtime.ts'),
      'react-native-css-interop/jsx-dev-runtime$': path.resolve(__dirname, 'src/polyfills/react-native-css-interop-jsx-dev-runtime.ts'),
      '@': path.resolve(__dirname, 'src'),
      'react-native-system-ui': path.resolve(__dirname, '../packages/ui/src'),
      'react-native-system-utils': path.resolve(__dirname, '../packages/utils/src'),
      '@ui-src': path.resolve(__dirname, '../packages/ui/src'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  stats: 'errors-warnings',
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "all",
        },
        default: {
          minChunks: 2,
          chunks: "all",
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
