'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jscpd = require('gulp-jscpd');
var KarmaServer = require('karma').Server;

var paths = {
  projectFiles: ['./app/geoutils.js']
};

gulp.task('default', ['lint', 'jscpd', 'test']);

gulp.task('test', function(done) {
  KarmaServer.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

gulp.task('jscpd', function() {
  return gulp.src(paths.projectFiles)
  .pipe(jscpd({
    'min-lines': 6,
    'verbose': true
  }));
});

gulp.task('lint', function() {
  return gulp.src(paths.projectFiles)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('release', function() {
  console.log('0. make release branch from master.');
  console.log('1. verify code pass tests.');
  console.log('2. extract release notes from git log --oneline.');
  console.log('3. add commit with release notes changed, and incremented package.json according to semver.org.');
  console.log('4. merge branch to master.');
  console.log('4. tag branch with version number in package.json.');
});

gulp.task('watch', function() {
  gulp.watch(paths.projectFiles, ['default']);
});
