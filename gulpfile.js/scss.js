exports.scss = function scss() {
  const { src, dest } = require('gulp');
  const scss = require('gulp-sass')(require('sass'));
  const autoprefixer = require('gulp-autoprefixer');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  // 非モジュールファイルのみコンパイルする
  return src(config.src.scss)
    .pipe(
      plumber(
        notify.onError('⚠️ SCSS のエラーが出ています ⚠️ <%= error.message %>')
      )
    )
    .pipe(
      // 引数には 引数には https://github.com/dlmanning/gulp-sass 記載のコンパイル設定を渡せます 記載のコンパイル設定を渡せます
      scss({
        outputStyle: 'compressed',
      })
    )
    .pipe(
      // autoprefixer
      // 引数には https://github.com/postcss/autoprefixer#options 記載の設定が渡せます
      autoprefixer({
        // 非圧縮cssの場合はtrueにする
        cascade: false,
      })
    )
    .pipe(dest(config.dest.css));
};
