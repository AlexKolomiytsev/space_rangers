const gulp = require('gulp'),
    del = require('del'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
//uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    browserify = require('gulp-browserify'),
    stringify = require('stringify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
//template = require('gulp-lodash-template');
    concat = require('gulp-concat');

var path = {
    build: {
        prod: {
            css: 'public/prod/less/',
            js: 'public/prod/js/secondform/',
            html: 'public/prod/',
            img: 'public/prod/img/secondform/',
            libs: 'public/prod/libs/',
            fonts: 'public/prod/fonts/'
        },
        dev: {
            style: 'public/dev/less/',
            js: 'public/dev/js/',
            img: 'public/dev/img/',
            //libs: 'public/dev/libs/',
            fonts: 'public/dev/fonts/',
            html: 'public/dev/',
            sound: 'public/dev/sound/'
        }
    },
    src: {
        style: 'resources/assets/less/main.less',
        js: 'resources/assets/js/main.js',
        img: 'resources/assets/img/**/*',
        //libs: 'resources/assets/libs/**/*',
        fonts: 'resources/assets/fonts/**/*',
        html: 'resources/assets/*.html',
        sound: 'resources/assets/sound/**/*'
    },
    watch: {
        style: 'resources/assets/less/**/*',
        js: 'resources/assets/js/**/*',
        img: 'resources/assets/img/**/*',
        //libs: 'resources/assets/libs/**/*',
        fonts: 'resources/assets/fonts/**/*',
        templates: 'resources/assets/templates/**/*',
        html: 'resources/assets/*.html',
        sound: 'resources/assets/**/*'
    },
    clean: {
        //libs: 'public/dev/libs/**/*',
        style: 'public/dev/less/**/*',
        js: 'public/dev/js/**/*',
        sound: 'public/dev/sound/**/*'
    }
};

gulp.task('less:dev', function () {
    return gulp.src(path.src.style)
        .pipe(less({}))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.dev.style));
});

gulp.task('js:dev', function () {
    return gulp.src(path.src.js)
        .pipe(browserify({
            insertGlobals: true,
            transform: stringify(['.html']),
            debug: true
        }))
        .pipe(gulp.dest(path.build.dev.js));
});

gulp.task('imgmin:dev', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.dev.img));
});

gulp.task('html:dev', function () {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.dev.html));
});

gulp.task('fonts', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.dev.fonts));
});

gulp.task('sound:dev', function () {
   return gulp.src(path.src.sound)
       .pipe(gulp.dest(path.build.dev.sound));
});

gulp.task('clean', function () {
    return del([path.clean.style, path.clean.js, path.clean.sound]);
});

gulp.task('build:dev',
    gulp.series('clean',
        gulp.parallel(
            'less:dev',
            'js:dev',
            'imgmin:dev',
            'fonts',
            'html:dev',
            'sound:dev'
        )));

gulp.task('watch', function () {
    watch(path.watch.style, gulp.series('less:dev'));
    watch(path.watch.js, gulp.series('js:dev'));
    watch(path.watch.templates, gulp.series('js:dev'));
    watch(path.watch.img, gulp.series('imgmin:dev'));
    watch(path.watch.fonts, gulp.series('fonts'));
    watch(path.watch.html, gulp.series('html:dev'));
    watch(path.watch.sound, gulp.series('sound:dev'))
});

gulp.task('dev', gulp.series('build:dev', 'watch'));