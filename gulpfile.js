"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cssmin = require('gulp-cssmin');

// Load package.json for banner
const pkg = require('./package.json');


var paths = {
    dist: {
        base: 'static',
        img: 'static/img',
        libs: 'static/vendor',
        css: 'static/css/',
        js: 'static/js/',
    },
    base: {
        base: './',
        node: 'node_modules'
    },
    src: {
        base: './',
        scss: 'static/assets/scss/**/*.scss',
    }
};


//--- COMPILE SASS FILES ---///
gulp.task('sass', function () {
    console.log("-- gulp is running task 'SASS'");

    return gulp.src(paths.src.scss)
        .pipe(
            sass({
                outputStyle: 'compact'
            }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 8 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.css));
});

// Watch for changes

gulp.task('watch', ['sass',], function () {
    gulp.watch(paths.src.scss, ['sass']);
});
