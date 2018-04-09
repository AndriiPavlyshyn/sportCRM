var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync'),

		//Custom
		fileinclude		= require('gulp-file-include'),
		gcmq					= require('gulp-group-css-media-queries'),
		smartgrid 		= require('smart-grid');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('fileinclude', function() {
	gulp.src(['app/[^_]*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
	.pipe(gulp.dest('dist'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('copyimg', function () {
  return gulp.src('app/img/**/*')
  .pipe(gulp.dest('dist/img'))
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	// .pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('gulp-group-css-media-queries', function () {
	gulp.src('app/css/main.css')
    .pipe(gcmq())
      .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	return gulp.src([
		// 'app/libs/jquery/dist/jquery.min.js',
		// 'app/js/materialize.min.js',
		// 'app/js/wow.js',
		// 'app/js/owl.carousel.min.js',
		// 'app/js/jquery.maskedinput.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('dist/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1170px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
        /*
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./app/sass', settings);

gulp.task('watch', ['fileinclude', 'styles', 'gulp-group-css-media-queries', 'js', 'copyimg', 'browser-sync'], function() {
	gulp.watch('app/**/*.html', ['fileinclude']);
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch('app/css/**/*', ['gulp-group-css-media-queries']);
	gulp.watch('app/js/common.js', ['js']);
	gulp.watch('app/img', ['copyimg']);
	gulp.watch('app/**/*.html', browsersync.reload)
});

gulp.task('default', ['watch']);
