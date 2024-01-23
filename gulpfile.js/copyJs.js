// jsファイルをdistにコピーするだけ

exports.copyJs = function copyJs(cb) {
  const { src, dest } = require('gulp');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  src(config.src.js)
    .pipe(
      plumber(
        notify.onError('⚠️ copyJs のエラーが出ています ⚠️ <%= error.message %>')
      )
    )
    .pipe(dest(config.dest.js));

  // タスク完了
  cb();
};
