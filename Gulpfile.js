'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:8080',
    files: ['index.js', 'handlers/**/*.js'],
    port: 8081,
  })
})

gulp.task('nodemon', function() {
  process.env.DEVELOPMENT = 'true';
  return nodemon({
    script: 'index.js',
    ext: 'js'
  }).on('restart', function() {
    //HACK....
    setTimeout(function () {
      browserSync.reload();
    }, 1000);
  });
})
