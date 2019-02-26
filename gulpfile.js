var gulp = require("gulp");
var browserify = require('browserify');
var babelify = require("babelify");
var sourcemaps = require("gulp-sourcemaps");
var tap = require('gulp-tap');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var log = require('gulplog');
var envify = require('envify/custom');


var debug = (process.env.NODE_ENV !== 'production');

var jsFiles = {
  source: [
    "./source/javascripts/**/*.js",
    "!./source/javascripts/lib/**"
  ],
  no_browserify: [
    "./source/javascripts/lib/**"
  ]
};

var dataFiles = {
  source: [
    "./data/*.json"
  ]
};

function swallowError(error) {

  if (debug) {
    // If you want details of the error in the console
    console.log(error.toString())

    this.emit('end')
  }
}

gulp.task('data_files', function () {
  return gulp.src(dataFiles.source)
    .pipe(gulp.dest("./dist/javascripts/data/"));
});

gulp.task("browserify", function () {
  return gulp.src(jsFiles.source, {read: false})
    .pipe(tap(function (file) {
      if (debug) {
        log.info("bundling " + file.path);
      }

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: debug})
        .transform(babelify, {presets: ["@babel/preset-env", "@babel/preset-react"]})
        .transform(envify({ROOT_URL: process.env.ROOT_URL}))
        .bundle();
    }))
    .on('error', swallowError)
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(tap(function (file) {
      if (debug == false) {
        uglify(file);
      }
    }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/javascripts/"));
});
gulp.task("concat", function () {
  return gulp.src(jsFiles.no_browserify)
    .pipe(gulp.dest("./dist/javascripts/lib/"));
});

gulp.task("watch", function () {
  gulp.watch("./source/javascripts/**/*", gulp.parallel("concat", "browserify"));
  gulp.watch("./data/*.json", gulp.series("data_files"));
});

gulp.task("default", gulp.parallel("concat", "browserify", "data_files", "watch"));
gulp.task("production", gulp.parallel("concat", "browserify", "data_files"));
