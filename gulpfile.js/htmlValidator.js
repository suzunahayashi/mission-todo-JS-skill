exports.htmlValidator = function htmlValidator() {
  const { src } = require('gulp');
  const htmlValidator = require('gulp-html');
  const notify = require('gulp-notify');
  const plumber = require('gulp-plumber');
  const config = require('./config');
  return src(config.src.destHtml)
    .pipe(
      plumber(
        notify.onError('⚠️ Nu Html Checker (v.Nu) のエラーが出ています ⚠️\n<%= error.message %>')
      )
    )
    .pipe(htmlValidator({ 'errors-only': true }));
};
