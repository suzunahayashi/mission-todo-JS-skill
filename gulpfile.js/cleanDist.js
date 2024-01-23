exports.cleanDist = function cleanDist(cb) {
  const del = require('del');
  const config = require('./config');
  del.sync([config.tmp, config.dest.root])
  cb();
};
