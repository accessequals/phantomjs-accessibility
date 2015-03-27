var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	compass = require('gulp-compass'),
	minifyCSS = require('gulp-minify-css');

gulp.task('serve', function() {
	browserSync({
		server: {
			host: '192.168.1.111',
			baseDir: './'
		}
	});

	// gulp.watch('sass/**/*.scss', ['sass']);
	gulp.watch('*.html').on('change', reload);
});

// gulp.task('compass', function() {
// 	gulp.src('./sass/**/*.scss')
// 		.pipe(compass({
// 			config_file: './config.rb',
// 			css: 'css',
// 			sass: 'sass',
// 			image: 'img'
// 		}))
// 		//.pipe(minifyCSS())
// 		.pipe(gulp.dest('css'))
// });
gulp.task('default', ['serve']);