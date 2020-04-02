const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');

gulp.task('imgmin', () => {
    return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('minify', ()=> {
    return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
})

gulp.task('compress', function () {
    return gulp.src('src/js/*.js')
          .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', gulp.series(
    gulp.parallel('css', 'compress', 'minify', 'imgmin')
));