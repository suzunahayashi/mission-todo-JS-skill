// audio 配下のファイルをコピー

exports.audio = function audio() {
  const { src, dest } = require('gulp');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  return src(config.src.audio)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ images のエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    .pipe(dest(config.dest.audio));
};
