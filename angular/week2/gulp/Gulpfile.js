var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'), // minifies CSS files
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'), // style JSHint's console log
    ngannotate = require('gulp-ng-annotate'); // remove comments
    uglify = require('gulp-uglify'), // minifies JS files
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'), // Replaces references to scripts or stylesheets into HTMLs
    del = require('del'); // remove directories & files
    notify = require('gulp-notify'), // console log
    cache = require('gulp-cache'),
    rev = require('gulp-rev'), // revisions static assets 
    //rename = require('gulp-rename'),
    //concat = require('gulp-concat'),
    //changed = require('gulp-changed'),
    //browserSync = require('browser-sync'), 
    

/* 
  Default task 
  - $ gulp # Run default task
  - $ gulp <task> <task...> # Run other task(s)
});
*/
gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('default', ['clean'], function() { 
    gulp.start('usemin', 'imagemin','copyfonts'); // The tasks will run in a parallel.
}); // JS, CSS, HTML; Image; Font


gulp.task('usemin',['jshint'], function () {
  return gulp.src('./app/**/*.html') // Serve up  all the .html files in the app folder.
      .pipe(usemin({
        css:[minifycss(),rev()], // css -> css in blocks
        js: [ngannotate(),uglify(),rev()] // js -> js in blocks
      }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copyfonts', ['clean'], function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

/* ----------------End of default task -----*/


/*
  Browser-sync task
*/

//gulp.task('watch', ['browser-sync'], function() {

 // gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']); 
//  gulp.watch('app/images/**/*', ['imagemin']);

//});

//gulp.task('browser-sync', ['default'], function () {
 //  var files = [
 //     'app/**/*.html',
 //     'app/styles/**/*.css',
 //     'app/images/**/*.png',
 //     'app/scripts/**/*.js',
 //     'dist/**/*'
 //  ];

/*
   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "index.html"
      }
   });
        // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
}); */
/*----------------End of Browser-sync task--------------*/