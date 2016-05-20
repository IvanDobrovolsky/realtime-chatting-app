//Gulp configuration
const config = require('./gulp.config');

const gulp = require('gulp');                           //Main package
const notify = require('gulp-notify');                  //Notifies about successful build
const less = require('gulp-less');                      //Compiles less -> css
const autoprefixer = require('gulp-autoprefixer');      //Adds vendor prefixes
const concat = require('gulp-concat');                  //Concatenates files
const sourcemaps = require('gulp-sourcemaps');          //Adds sourcemaps to our file
const browserify = require('browserify');
const babelify = require('babelify');                   //Transforms es6 -> es5
const watchify = require('watchify');                   //Listens to update events
const source = require('vinyl-source-stream');          //Uses conventional text streams with gulp, gives streaming vinyl file object //Notifies about changes
const buffer = require('gulp-buffer');                  //Converts from streaming to buffered vinyl file object

const browserSync = require('browser-sync');              //Browser synchronization
const nodemon = require('gulp-nodemon');


//Gulp css task - handles css stuff(compiling less, autoprefixer, bundling with library files, minification and concatenation )
gulp.task('css', () => {
    gulp.src(config.paths.stylesheets)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(notify({title: "CSS", message: "Bundled: " +  new Date().toLocaleTimeString()}))
});


//Gulp img task - transfers images to dist folder
gulp.task('img', () => {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/img'));
});

gulp.task('js', () => {

    const b = browserify({
        entries: config.paths.entry,
        debug: true,
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });

    function bundle(){
        b
            .transform(babelify, {presets: ['es2015', 'stage-0']})
            .bundle()
            .on('error', (error) => {
                console.log(error.message);
                browserSync.notify("Browserify Error!");
            })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulp.dest(config.paths.dist + '/js'))
            .pipe(notify({title: "JS", message: "Bundled: " +  new Date().toLocaleTimeString()}))
    }

    b.on('update', () => {
        bundle();
    });
    bundle();
});


//Gulp nodemon task - starts express server
gulp.task('nodemon', ['css', 'img', 'js'], (cb) => {

    let started = false;

    return nodemon({
        script: 'server/server.js',
        ignore: 'client/**/*.*'
    }).on('start', () => {

        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }

    });
});


//Gulp watch task - watches for changes and updates specified files in the project
gulp.task('watch', ['nodemon'], () => {
    gulp.watch(config.watch.stylesheets, ['css']);
    gulp.watch(config.paths.images, ['img']);
});

//Gulp default task - runs the whole sequence of tasks
gulp.task('default', ['watch']);