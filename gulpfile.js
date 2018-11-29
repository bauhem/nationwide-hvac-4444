var gulp = require("gulp");
var browserify = require('browserify');
var babelify = require("babelify");
var sourcemaps = require("gulp-sourcemaps");
var tap = require('gulp-tap');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var log = require('gulplog');

var debug = (process.env.NODE_ENV !== 'production');

var jsFiles = {
  source: [
    "./source/javascripts/**/*.js",
    "!./source/javascripts/lib/webflow.js"
  ]
};

var dataFiles = {
  source: [
    "./data/*.json"
  ]
};

gulp.task('data_files', function () {
  return gulp.src(dataFiles.source)
    .pipe(gulp.dest("./dist/javascripts/data/"));
});

gulp.task("concat", function () {
  return gulp.src(jsFiles.source, {read: false})
    .pipe(tap(function (file) {
      if (debug) {
        log.info("bundling " + file.path);
      }

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: debug})
        .transform(babelify, {presets: ["@babel/preset-env", "@babel/preset-react"]})
        .bundle();
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(tap(function(file) {
      if (debug == false) {
        uglify(file);
      }
    }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/javascripts/"));
});

gulp.task("watch", function () {
  gulp.watch("./source/javascripts/**/*", gulp.series("concat"));
  gulp.watch("./data/*.json", gulp.series("data_files"));
});

gulp.task("default", gulp.parallel("concat", "data_files", "watch"));
gulp.task("production", gulp.parallel("concat", "data_files"));
