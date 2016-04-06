var gulp = require('gulp'),
		ts = require('gulp-typescript'),
		bs = require('browser-sync').create(),
		plumber = require('gulp-plumber'),
		jade = require('gulp-jade'),
		autoprefixer = require('gulp-autoprefixer'),
		sass = require('gulp-sass'),
		path = require('path');

/**
 * Compiles Sass files to css
 */
gulp.task('sass', function() {
	gulp.src('src/sass/**/*.{sass, scss}')
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(gulp.dest('dis/css'))
			.pipe(bs.stream());
});

/**
 * Compiles jade files to html 
 */
gulp.task('templates', function() {
	var locals = {};

	gulp.src('*.jade')
			.pipe(plumber())
			.pipe(jade({
				locals: locals,
				pretty: true
			}))
			.pipe(gulp.dest('.'))
});

/**
 * Browser Sync task
 */
gulp.task('bs', function() {
	bs.init({
		server: './'
	});

	gulp.watch('*.html', bs.reload);
	gulp.watch('dist/js/*.js', bs.reload);
	gulp.watch('dist/css/*.css', bs.reload);
});

gulp.task('build-ts', function() {
	gulp.src('src/ts/*.ts')
			.pipe(ts({
				noImplicitAny: true,
				// out: "final.js"
			}))
			.pipe(gulp.dest("dist/js"));
});

/**
 * Watch task
 */
gulp.task('watch', ['bs'], function() {
	gulp.watch('*.jade', ['templates']);
	gulp.watch('src/sass/*.{sass, scss}', ['sass']);
	gulp.watch('src/ts/*.ts', ['build-ts']);
});

gulp.task('default', ['watch']);