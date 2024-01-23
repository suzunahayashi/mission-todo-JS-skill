exports.pug = function pug() {
  const { src, dest } = require('gulp');
  const pug = require('gulp-pug');
  const prettier = require('gulp-prettier');
  const htmlhint = require('gulp-htmlhint');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  return src(config.src.pug)
    .pipe(
      plumber(
        notify.onError('⚠️ pug のエラーが出ています ⚠️ <%= error.message %>')
      )
    )
    .pipe(
      // 引数には https://pugjs.org/api/reference.html 記載のコンパイル設定を渡せます
      pug()
    )
    .pipe(prettier())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failAfterError())
    .pipe(dest(config.dest.root));
};
