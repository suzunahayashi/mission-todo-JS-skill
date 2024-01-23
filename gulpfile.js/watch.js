// 対象ファイルの変更監視

exports.watch = function watch(cb) {
  const { series, watch } = require('gulp');
  const { htmlValidator } = require('./htmlValidator');
  const { reload } = require('./server');
  const config = require('./config');
  const { templateEngine, preprocessor, jsVersion } = config;
  const watchTasks = [];

  if (templateEngine === 'pug') {
    const { pug } = require('./pug');
    watchTasks.push(() => watch(config.watch.pug, series(pug, htmlValidator, reload)));
  }

  if (templateEngine === 'ejs') {
    const { ejs } = require('./ejs');
    watchTasks.push(() => watch(config.watch.ejs, series(ejs, htmlValidator, reload)));
  }

  if (templateEngine === 'html') {
    const { html } = require('./html');
    watchTasks.push(() => watch(config.watch.html, series(html, htmlValidator, reload)));
  }

  if (preprocessor === 'scss') {
    const { scss } = require('./scss');
    watchTasks.push(() => watch(config.watch.scss, series(scss, reload)));
  } else {
    const { css } = require('./css');
    watchTasks.push(() => watch(config.watch.css, series(css, reload)));
  }

  // esnextのときはwebpack側でwatchしているため、gulpでのwatchはしない
  if (jsVersion === 'es5') {
    const { copyJs } = require('./copyJs');
    watchTasks.push(() => watch(config.watch.js, series(copyJs, reload)));
  }

  const { images } = require('./images');
  watchTasks.push(() => watch(config.watch.images, series(images, reload)));

  // watch task 実行
  watchTasks.forEach((fn) => fn());

  // タスク完了
  cb();
};
