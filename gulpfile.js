var gulp = require('gulp');
var babel = require('gulp-babel');
var headerfooter = require('gulp-header-footer');
var react = require('gulp-react');
//var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var less = require('gulp-less');


/** node **/
gulp.task('babel', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
});

/** web-js **/
gulp.task('bower-init', function () {
    var path = 'public/js/main/react-dev/bower_components';
    var pattern = ['/seajs/dist/sea.js'];
    pattern = pattern.map(function (item) {
        return path + item;
    });
    return gulp.src(pattern)
        .pipe(gulp.dest('public/js/main/bower'));
});

gulp.task('react', function () {
    return gulp.src(['!public/js/main/react-dev/bower_components/**/*.js', 'public/js/main/react-dev/**/*.jsx'])
        .pipe(babel())
        .pipe(react())
        .pipe(gulp.dest('public/js/main/react'))
});

gulp.task('seajs build', ['react'], function () {
    var path = 'public/js/main/react';
    var pattern = [path + '/**/*.js',
        'public/js/main/react-dev/bower_components/react/react.js',
        'public/js/main/react-dev/bower_components/react/react-dom.js',
        'node_modules/react-redux/dist/react-redux.js',
        'node_modules/redux/dist/redux.js'
    ];

    return gulp.src(pattern)
        .pipe(headerfooter({
            header: 'define(function(require,exports,module){',
            footer: '});',
            filter: function (file) {
                return true
            }
        }))
        .pipe(gulp.dest(path))
});

/** web-css **/
gulp.task('less', function () {
    return gulp.src('public/css/main/main.less')
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/css'))
});

/** init **/
gulp.task('default', ['babel', 'seajs build', 'bower-init', 'less'], function () {
    var watcher = gulp.watch('src/**/*.js', ['babel']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var watcherReact = gulp.watch('public/js/main/react-dev/**/*.jsx', ['seajs build']);
    watcherReact.on('change', function (event) {
        console.log('React File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var watcherLess = gulp.watch('public/css/main/**/*.less', ['less']);
    watcherLess.on('change', function (event) {
        console.log('Less File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

