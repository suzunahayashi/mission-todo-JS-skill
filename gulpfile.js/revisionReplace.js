exports.revisionReplace = function revisionReplace() {
  const { src, dest } = require('gulp');
  const revReplace = require('gulp-rev-replace');
  const config = require('./config');
  const manifest = src('./.tmp/rev-manifest.json');
  return src('./dist/**/*.+(html|css|js)')
    .pipe(revReplace({ manifest }))
    .pipe(dest(config.dest.root));
};
