"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var run = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");

// gulp.task("style", function() {
//   gulp.src("sass/style.scss")
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(gulp.dest("/css"))
//     .pipe(minify())
//     .pipe(rename("style.min.css"))
//     .pipe(gulp.dest("/css"))
//     .pipe(server.stream());
// });

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

// gulp.task("images", function () {
// //   return gulp.src("img/**/*.{png,jpg,svg}")
// //     .pipe(imagemin([
// //       imagemin.optipng({optimizationLevel: 3}),
// //       imagemin.jpegtran({progressive: true})
// //       ]))
// //     .pipe(gulp.dest("img"));
// // });

// // gulp.task("webp", function () {
// //   return gulp.src("img/**/*.{png,jpg}")
// //     .pipe(webp({quality: 90}))
// //     .pipe(gulp.dest("img"));
// // });

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

// gulp.task("build", function(done) {
//   run("clean", "copy", "style", "minjs", done);
// });

// gulp.task("clean",function () {
//   return del("build");
// });

// gulp.task("copy", function () {
//   return gulp.src([
//     "*.html",
//     "fonts/**/*.woff",
//     "fonts/**/*.woff2",
//     "img/**",
//     "js/**"
//     ], {
//       base: "."
//     })
//     .pipe(gulp.dest("build"));
// });

// gulp.task("minjs", function () {
//   gulp.src("js/script.js")
//     .pipe(uglify())
//     .pipe(rename("script.min.js"))
//     .pipe(gulp.dest("build/js"))
// });
