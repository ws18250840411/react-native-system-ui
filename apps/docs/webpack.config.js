const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  entry: './index.web.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      }
    ]
  },
  resolve: {
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-native$': 'react-native-web',
      '@': path.resolve(__dirname, 'src'),
      'react-native-system-ui': path.resolve(__dirname, '../../packages/ui/src'),
      'react-native-system-utils': path.resolve(__dirname, '../../packages/utils/src'),
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
