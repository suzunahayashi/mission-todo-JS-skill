// 画像ファイルを圧縮してコピー

exports.images = function images() {
  const { src, dest } = require('gulp');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const imagemin = require('gulp-imagemin');
  const pngquant = require('imagemin-pngquant');
  const config = require('./config');

  return src(config.src.images)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ images のエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    /**
     * 圧縮の詳細設定を行う場合は引数を渡す
     * see: https://github.com/sindresorhus/gulp-imagemin
     * 渡せる値はそれぞれ下記を参照 (フォーマットが異なるので注意)
     * gif: https://github.com/imagemin/imagemin-gifsicle
     * jpg: https://github.com/imagemin/imagemin-mozjpeg
     * png: https://github.com/imagemin/imagemin-pngquant
     * svg: https://github.com/imagemin/imagemin-svgo
     */
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80 }),
        pngquant({ quality: [0.8, 0.9] }),
        imagemin.svgo(),
      ])
    )
    .pipe(dest(config.dest.images));
};
