exports.revision = function revision() {
  const { src, dest } = require('gulp');
  const rev = require('gulp-rev');
  const revDel = require('gulp-rev-delete-original');
  const config = require('./config');
  return src(config.src.assets)
    .pipe(rev())
    .pipe(dest(config.dest.assets))
    .pipe(revDel())
    .pipe(rev.manifest())
    .pipe(dest(config.tmp))
};
