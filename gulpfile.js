var syntax        = 'scss'; // Syntax: sass or scss;

var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
    rsync         = require('gulp-rsync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // open: false,
        // online: false, // Work Offline Without Internet Connection
        // ghostMode: false //Disable clicks,scrolls & form inpust on any devices
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    })
});

gulp.task('styles', function() {
    return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});

gulp.task('scripts', function() {
    return gulp.src([
        // Without JQuery dependensies
        // JQuery dependent
        'app/js/vendors/jquery-3.5.1.slim.min.js',
        'app/js/vendors/jquery-3.5.1.min.js',
        'app/js/vendors/bootstrap.min.js',
        'app/js/vendors/bootstrap.bundle.min.js',
        'app/js/vendors/jquery.smartmenus.min.js',
        'app/js/vendors/swiper.min.js',
        'app/js/vendors/jquery.fancybox.min.js',
        'app/js/common.js', // Always at the end
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

//gulp.task('rsync', function() {
//	return gulp.src('app/**')
//	.pipe(rsync({
//		root: 'app/',
//		hostname: 'username@yousite.com',
//		destination: 'yousite/public_html/',
//		// include: ['*.htaccess'], // Includes files to deploy
//		exclude: ['*Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
//		recursive: true,
//		archive: true,
//		silent: false,
//		compress: true
//	}))
//});

gulp.task('watch', function() {
    gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
    gulp.watch(['app/libs/**/*.js', 'app/js/common.js', 'app/js/vendors/**/*.js'], gulp.parallel('scripts'));
    gulp.watch('app/*.html', gulp.parallel('code'))
});
gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));