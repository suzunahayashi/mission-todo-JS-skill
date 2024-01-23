exports.html = function html() {
  const { src, dest } = require('gulp');
  const prettier = require('gulp-prettier');
  const htmlhint = require('gulp-htmlhint');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  return src(config.src.html)
    .pipe(
      plumber(
        notify.onError('⚠️ HTML のエラーが出ています ⚠️ <%= error.message %>')
      )
    )
    .pipe(prettier())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failAfterError())
    .pipe(dest(config.dest.root));
};
