var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-minify-css')
var uglify  	  = require('gulp-uglify');
var newer       = require('gulp-newer');
var path        = require('path');
var del         = require('del');


function handleError (error) {
  console.log(error.toString())
  this.emit('end')
}
 

//setup browerSync to serve from both src and dist directories.
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ["./", "src"] //  ./ signifies root of folder, allows to load files from dist and src folders.
    },
  })
});


//font copier, if needed
gulp.task('fonts', function() {
  return gulp.src('src/assets/fonts/**/*')
  .pipe(gulp.dest('dist/assets/fonts'))
})


//manual image copy
gulp.task('images', function() {
  return gulp.watch('src/assets/img/**/*', function(obj) {
   gulp.src( obj.path, { "base": "src/assets/img/"})
   .pipe(gulp.dest('dist/assets/img'))
 });
});


//one way sync of root folder
gulp.task('syncHtmlRootDir', function(done) {
    return gulp.src(['src/*.html'])
        .pipe(newer('dist/'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
          stream: true
        }))
});


//one way sync of app folder
gulp.task('syncHtmlAppDir', function(done) {
    return gulp.src(['src/app/**/*'])
        .pipe(newer('dist/app/'))
        .pipe(gulp.dest('dist/app/'))
        .pipe(browserSync.reload({
          stream: true
        }))
});

//one way sync of image folder
gulp.task('syncImgDir', function(done) {
    return gulp.src(['src/assets/img/**/*'])
        .pipe(newer('dist/assets/img/'))
        .pipe(gulp.dest('dist/assets/img/'))
        .pipe(browserSync.reload({
          stream: true
        }))
});


//copy and compile SCSS code
 gulp.task('compileSass', function() {
  return gulp.src('src/assets/css/**/*.scss')
    .pipe(sass())
    .on('error', handleError)
    .pipe(minifyCss()) 
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


//minify JS
gulp.task('uglifyJS', function() {
  gulp.src('src/assets/js/**/*.js')
  .pipe(uglify())
  .on('error', handleError)
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(browserSync.reload({
    stream: true
  }))
});



//watch tasks
gulp.task('watch', ['browserSync'], function() {
  var rootDir = gulp.watch('src/*.html', ['syncHtmlRootDir']);
  rootDir.on('change', function(ev) {
      if(ev.type === 'deleted') {
          del(path.relative('./', ev.path).replace('src','dist'));
      }
  }); 

  var appDir = gulp.watch('src/app/**/*', ['syncHtmlAppDir']);
  appDir.on('change', function(ev) {
      if(ev.type === 'deleted') {
          del(path.relative('./', ev.path).replace('src/app/','dist/app/'));
      }
  }); 

  var imgDir = gulp.watch('src/assets/img/**/*', ['syncImgDir']);
  imgDir.on('change', function(ev) {
      if(ev.type === 'deleted') {
          del(path.relative('./', ev.path).replace('src/assets/img/','dist/assets/img/'));
      }
  });

  var jsDir = gulp.watch('src/assets/js/**/*', ['uglifyJS']);
  jsDir.on('change', function(ev) {
      if(ev.type === 'deleted') {
          del(path.relative('./', ev.path).replace('src/assets/js/','dist/assets/js/'));
      }
  });

  var cssDir = gulp.watch('src/assets/css/**/*', ['compileSass']);
  cssDir.on('change', function(ev) {
      if(ev.type === 'deleted') {
          del(path.relative('./', ev.path).replace('src/assets/css/','dist/assets/css/'));
      }
  });  

});