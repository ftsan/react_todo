var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var node = require('node-dev');
var source = require('vinyl-source-stream');

var sourceDir = 'public/';

function errorHandler(err) {
  console.log('Error: ' + err.message);
}

// 自動ブラウザリロード
gulp.task('browser-sync', function() {
  browserSync({
    proxy: {
      target: 'http://localhost:3000'
    },
    port: 8080
  });
});

// Javascriptへのビルド
// ES6かつJSXなファイル群をbuild/bundle.jsへ変換する
gulp.task('build', function() {
  browserify({entries: [sourceDir + './index.js']})
    .transform(babelify)
    .bundle()
    .on('error', errorHandler)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest(sourceDir + './build'))
    .pipe(browserSync.reload({stream: true}));
});

// ローカルサーバーの起動
gulp.task('server', function() {
  node(['./server.js']);
});

// ファイル監視
// ファイルに更新があったらビルドしてブラウザをリロードする
gulp.task('watch', function() {
  gulp.watch(sourceDir + './index.js', ['build']);
  gulp.watch(sourceDir + './index.html', ['build']);
  gulp.watch(sourceDir + './components/*.js', ['build']);
});

// gulpコマンドで起動したときのデフォルトタスク
// gulp.task('default', ['server', 'build', 'watch', 'browser-sync']);
gulp.task('default', ['build', 'watch', 'browser-sync']);
