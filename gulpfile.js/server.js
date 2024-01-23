const browserSync = require('browser-sync').create();

// ローカルサーバー起動
exports.server = function server(cb) {
  const config = require('./config');

  // 実行環境がWindowsであるかの判定
  // see: https://nodejs.org/api/process.html#process_process_platform
  const isWindows = process.platform === 'win32';

  // browserSync の起動
  browserSync.init({
    port: config.server.port,
    server: {
      baseDir: config.dest.root,
    },
    startPath: config.server.startPath,
    browser: isWindows ? 'chrome' : 'google chrome',
    ghostMode: false,
    ui: false,
  });

  // タスク完了
  cb();
};

// リロード
exports.reload = function reload(cb) {
  browserSync.reload();
  // タスク完了
  cb();
};
