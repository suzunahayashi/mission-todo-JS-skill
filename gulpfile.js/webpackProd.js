// WebpackによってJSをビルド

exports.webpackProd = function webpackProd() {
  const { src, dest } = require('gulp');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const webpack = require('webpack');
  const webpackStream = require('webpack-stream');
  const webpackConfig = require('../webpack.prod');
  const config = require('./config');

  return src(config.src.js)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ Webpack のエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    // 書き出し
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest(config.dest.js));
};
