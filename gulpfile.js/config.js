// コンフィグ

module.exports = {
  // ビルド対象ファイルのパス
  src: {
    root: './src',
    pug: ['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'],
    ejs: ['./src/ejs/**/*.ejs', '!./src/ejs/**/_*.ejs'],
    html: './src/html/**/*.html',
    scss: ['./src/scss/**/*.scss', '!./src/scss/**/_*.scss'],
    // モジュールのscssファイルも対象に含めたいときはこちらを指定(lintなど)
    allScss: ['./src/scss/**/*.scss', '!./src/scss/**/_reset.scss'],
    css: './src/css/**/*.css',
    js: './src/js/**/*.js',
    // lib 配下のjsを対象に含めたくないときはこちらを指定
    userJs: ['./src/js/**/*.js', '!./src/js/lib/*.js'],
    audio: './src/audio/**/*',
    images: './src/images/**/*',
    destHtml: './dist/**/*.html',
    destCss: './dist/assets/css/**/*.css',
    assets: './dist/assets/**',
  },
  // ビルドファイルの出力先パス
  dest: {
    root: './dist/',
    css: './dist/assets/css/',
    js: './dist/assets/js/',
    audio: './dist/assets/audio/',
    images: './dist/assets/images/',
    assets: './dist/assets/',
  },
  tmp: './.tmp/',
  // ウォッチ設定
  watch: {
    pug: './src/pug/**/*.pug',
    ejs: './src/ejs/**/*.ejs',
    images: './src/images/**/*',
    html: './src/**/*.html',
    scss: './src/scss/**/*.scss',
    css: './src/css/*.css',
    js: './src/js/*.js',
  },
  // ローカルサーバー
  server: {
    port: 3000,
    // 起動時に表示するパスを変えたい場合はここを変更しましょう
    startPath: './',
  },
  // 利用している環境
  templateEngine: 'ejs',
  preprocessor: 'scss',
  jsVersion: 'esnext',
};
