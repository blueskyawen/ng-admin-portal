var gulp = require('gulp');
var through = require('through2');
var rimraf = require('gulp-rimraf');
var jsonKeyDupCheckFun = require('./tools/gulp-json-key-dup-check');
var merge = require('gulp-merge-json');
var runSequence =require('run-sequence');
var path = require('path');
var util=require('gulp-util');
var plumber=require('gulp-plumber');
var htmlhint = require("gulp-htmlhint");
//var jscpd = require('gulp-jscpd');
gulp.task('i18n-json-key-dup-check', function() {
  return gulp.src(['./src/assets/i18n/**/*.json','!./src/assets/i18n/*.json'])
    .pipe(through.obj(function(file,enc,cb){
      this.push(file);
      cb();
    })).pipe(jsonKeyDupCheckFun({ allowDuplicatedKeys: false }));
});

gulp.task('clean-i18n-en-zh-json-file', function() {
  console.log('clean-i18n-en-zh-json-file is running');
  return gulp.src('./src/assets/i18n/*.json', { read: false }).pipe(rimraf({ force: true }));
});

gulp.task('watch-i18n-json-file',function(){
  gulp.watch(['./src/assets/i18n/**/*.json','!./src/assets/i18n/*.json'],function () {
    runSequence(
      'clean-i18n-en-zh-json-file',
      'merge-i18n-zh-json',
      'merge-i18n-en-json'
    )
  });
});

gulp.task('merge-i18n-zh-json',function(){
  gulp.src(['./src/assets/i18n/**/zh*.json','!./src/assets/i18n/*.json']) .pipe(through.obj(function(file,enc,cb){
    this.push(file);
    cb();
  })).pipe( plumber({errorHandler:errorHandle}) )  //在处理前注册plumber
    .pipe(merge(
      {fileName: 'zh.json'}
      )
    ).pipe(gulp.dest('./src/assets/i18n/'));
});

gulp.task('merge-i18n-en-json',function(){
  gulp.src(['./src/assets/i18n/**/en*.json','!./src/assets/i18n/*.json']).pipe(through.obj(function(file,enc,cb){
    console.log(file.relative);
    console.log(file.path);
    this.push(file);
    cb();
  })).pipe( plumber({errorHandler:errorHandle}) )  //在处理前注册plumber
    .pipe(merge(
      {fileName: 'en.json'}
      )
    ).pipe(gulp.dest('./src/assets/i18n/'));
});

function errorHandle(e){
  util.beep(); //控制台发声,错误时beep一下
  util.log(e);
}

