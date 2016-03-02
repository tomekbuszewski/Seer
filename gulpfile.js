// Requirements
//——————————————————————————————————————————————————
var gulp					= require('gulp'),
		browserSync		= require('browser-sync'),
		sass					= require('gulp-ruby-sass'),
		prefix				= require('gulp-autoprefixer'),
		csso 					= require('gulp-csso'),
		sourcemaps		= require('gulp-sourcemaps');

// Variables
//——————————————————————————————————————————————————
var sassDir = '_sass',
		cssTempDir = '_dev/css',
		cssDir = '_css',
		cssSeer = 'seer',
		cssTheme = 'style';

// Sass
//——————————————————————————————————————————————————
gulp.task('sass', function() {
	return sass(sassDir+'/**', {
		stopOnError: false
	})
		.pipe(sourcemaps.write('maps', {
			sourceRoot: cssDir
		}))
		.pipe(prefix('last 2 version'))
		.pipe(csso())
		.pipe(gulp.dest(cssDir));
		// .pipe(gulp.dest(cssTempDir));
});

// CSS
//——————————————————————————————————————————————————
gulp.task('css', ['sass'], function() {
	return gulp.src(cssTempDir+'/**')
		.pipe(prefix('last 2 version'))
		.pipe(csso())
		.pipe(gulp.dest(cssDir));
});

// BrowserSync
//——————————————————————————————————————————————————
gulp.task('browser-sync', function() {
	browserSync.init({
		browser: [],
		server: {
			baseDir: './'
		}
	});

	gulp.watch(sassDir+'/**', ['sass']);
	gulp.watch(cssDir+'/**', browserSync.reload);
	// gulp.watch(cssTempDir+'/**', ['css']);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass','browser-sync']);
