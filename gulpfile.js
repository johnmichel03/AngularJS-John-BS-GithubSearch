// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['app/app.js', 'app/report/*.js', 'app/search/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('dist/css'));
// });

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['app/app.js', 'app/report/*.js', 'app/search/*.js', 'app/common_services/*.js', 'app/components/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/app'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/app/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/*.js', ['lint', 'scripts']);
    // gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('copy', function() {
    gulp.src(['app/index.html']).pipe(gulp.dest('dist/app/'));
    gulp.src(['app/css/*.*']).pipe(gulp.dest('dist/app/css'));
    gulp.src(['app/images/*.*']).pipe(gulp.dest('dist/app/images'));

})


// Default Task
gulp.task('default', ['lint', 'scripts', 'watch', 'copy']);