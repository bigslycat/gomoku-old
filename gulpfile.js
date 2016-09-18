'use strict';

const gulp = require('gulp');

const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

const webpackStream = require('webpack-stream');
const entries = require('object.entries');

if (!Object.entries) entries.shim();

const webpackConfig = require('./webpackConfig');

gulp.task('app', () =>
  gulp.src('./src/js/app.jsx')
  .pipe(webpackStream(webpackConfig))
  .pipe(gulp.dest('./docs/js'))
);

gulp.task('styles', () =>
  gulp.src([
    './node_modules/normalize.css/normalize.css',
    './src/styles/fonts.less',
    './src/styles/reset.less',

    './src/components/*/*.less',
    './src/components/*/--*/*.less',
    './src/components/*/-!(-)*/*.less',
    './src/components/*/-!(-)*/--*/*.less',
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('main.css'))
  .pipe(less())
  .pipe(autoprefixer({ browsers: [
    'last 5 Chrome versions',
    'last 5 Firefox versions',
    'iOS >= 8',
    'ie >= 8',
  ] }))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./docs/css'))
);
