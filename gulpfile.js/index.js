const { series, parallel } = require('gulp');
const { cleanDist } = require('./cleanDist');
const { images } = require('./images');
const { htmlValidator } = require('./htmlValidator');
const { watch } = require('./watch');
const { server } = require('./server');
const { revision } = require('./revision');
const { revisionReplace } = require('./revisionReplace');
const config = require('./config');
const { templateEngine, preprocessor, jsVersion, useAudio } = config;
const devTasks = [];
const buildTasks = [];

if (templateEngine === 'pug') {
  const { pug } = require('./pug');
  devTasks.push(pug);
  buildTasks.push(pug);
}

if (templateEngine === 'ejs') {
  const { ejs } = require('./ejs');
  devTasks.push(ejs);
  buildTasks.push(ejs);
}

if (templateEngine === 'html') {
  const { html } = require('./html');
  devTasks.push(html);
  buildTasks.push(html);
}

if (preprocessor === 'scss') {
  const { scss } = require('./scss');
  devTasks.push(scss);
  buildTasks.push(scss);
}

if (preprocessor === 'css') {
  const { css } = require('./css');
  devTasks.push(css);
  buildTasks.push(css);
}


if (useAudio) {
  const { audio } = require('./audio');
  devTasks.push(audio);
  buildTasks.push(audio);
}

if (jsVersion === 'esnext') {
  const { webpackDev } = require('./webpackDev');
  const { webpackProd } = require('./webpackProd');
  devTasks.push(webpackDev);
  buildTasks.push(webpackProd);
}

if (jsVersion === 'es5') {
  const { copyJs } = require('./copyJs');
  devTasks.push(copyJs);
  buildTasks.push(copyJs);
}

// 並行で各種buildタスクを実行し、完了後にローカルサーバーを起動
exports.default = series(cleanDist, parallel(...devTasks, images, watch), server, htmlValidator);

// build コマンドでは、サーバーを立てずにビルドを実行 ( cache busting 無 )
exports.build = series(cleanDist, parallel(...buildTasks, images), htmlValidator);

// revbuild コマンドでは、サーバーを立てずにビルドを実行 ( cache busting 有 )
exports.revbuild = series(cleanDist, parallel(...buildTasks, images), htmlValidator, revision, revisionReplace);
