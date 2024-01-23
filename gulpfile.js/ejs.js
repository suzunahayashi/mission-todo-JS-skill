exports.ejs = function ejs() {
  const { src, dest } = require('gulp');
  const ejs = require('gulp-ejs');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const rename = require('gulp-rename');
  const config = require('./config');

  return src(config.src.ejs)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ EJS のエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    .pipe(
      // 引数詳細は https://github.com/rogeriopvl/gulp-ejs
      ejs()
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(dest(config.dest.root));
};
