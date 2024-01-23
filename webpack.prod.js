const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'common.js',
  },
  // 拡張子で利用するloaderを指定
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  target: ['web', 'es5'],
  // importの解決方法を決める
  resolve: {
    // 拡張子省略の有効化
    extensions: ['.js'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      // 環境変数の設定
      NODE_ENV: 'production',
    }),
  ],
  // LICENSE.txtを出力させない
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
