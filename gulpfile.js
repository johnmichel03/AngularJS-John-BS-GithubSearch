// Include gulp
var gulp = require('gulp');
// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');


// Lint Task
gulp.task('lint', function() {
    return gulp.src(['app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
            'app/app.js',
            'app/common_services/*.js',
            'app/components/directives/*.js',
            'app/search/*.js',
            'app/issue/*.js',
            'app/report/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/app/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/app/js'));
});

/* Copy  the static files */
gulp.task('copy', function() {
    gulp.src(['app/css/*.*']).pipe(gulp.dest('dist/app/css'));
    gulp.src(['app/images/*.*']).pipe(gulp.dest('dist/app/images'));
    gulp.src('app/search/**/*.html').pipe(gulp.dest('dist/app/search'));
    gulp.src('app/report/**/*.html').pipe(gulp.dest('dist/app/report'));
    gulp.src('app/issue/**/*.html').pipe(gulp.dest('dist/app/issue'));

    /* Copy all the bower components  */
    gulp.src('bower_components/**/*').pipe(gulp.dest('dist/app/bower_components'));
});

/* Modify index.html file with min.js file */
gulp.task('replace', function() {
    gulp.src('app/index.html')
        .pipe(htmlreplace({
            'js': 'js/all.min.js'
        }))
        .pipe(gulp.dest('dist/app/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'copy', 'replace', 'watch']);