// Gulp and node
const gulp = require('gulp');
const cp = require('child_process');

// Basic workflow plugins
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Performance workflow plugins
const htmlmin = require('gulp-htmlmin');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const critical = require('critical');

// Image Generation TODO
const responsive = require('gulp-responsive');
const $ = require('gulp-load-plugins')();
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

const src = {
  css: '_sass/main.scss',
  js: '_js/**/*.js',
}
const dist = {
  css: '_site/assets/css',
  js: '_site/assets/js',
}

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build', '--drafts'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('deploy', gulp.series('jekyll-build', function () {
    return gulp.src('./_site/**/*')
        .pipe(deploy());
}));

// Rebuild Jekyll & do page reload
gulp.task('rebuild', gulp.series('jekyll-build', function (done) {
    browserSync.reload();
    done();
}));

// Complie SCSS to CSS & Prefix
gulp.task('sass', function() {
  return gulp.src(src.css)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['scss'],
      // functions: sassFunctions(),
      onError: browserSync.notify
    }))
    .pipe(prefix())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/css'));
});

// Uglify JS
gulp.task('js', function() {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js',
      'node_modules/lazysizes/lazysizes.js',
      'node_modules/velocity-animate/velocity.js',
      src.js
    ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist.js))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('assets/js'))
    .on('error', function(err){
      console.error('Error in uglify taks', err.toString());
    });
});

// Rebuild Jekyll & do page reload
gulp.task('browser-sync', gulp.series('sass', 'js', 'jekyll-build', function() {
  browserSync({
      server: {
          baseDir: '_site'
      }
  });
}));

gulp.task('critical', function (cb) {
  critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['assets/css/main.css'],
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    dest: '../_includes/critical.css',
    minify: true,
    extract: false,
    ignore: ['@font-face']
  });
});

gulp.task('watch', function() {
  gulp.watch('_sass/**/*.scss', gulp.series('sass'));
  gulp.watch(['*.html', '*.md', '_layouts/*.html', '_includes/*.html', '_posts/*.md', '_posts/*/*.md', '_posts/*/*/*.md', '_drafts/*.md', '_drafts/*/*.md', '_drafts/*/*/*.md', '_pages/*.md', '_include/*html'], gulp.series('rebuild'));
  gulp.watch('_js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));

// Minify HTML
gulp.task('html', function() {
    gulp.src('./_site/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./_site'))
    gulp.src('./_site/*/*html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./_site/./'))
});

// Images
gulp.task('img', function() {
  return gulp.src('_img/posts/*.{png,jpg}')
    .pipe($.responsive({
      // For all the images in the folder
      '*': [{
        width: 230,
        rename: {suffix: '_placehold'},
      }, {
        // thubmnail
        width: 535,
        rename: { suffix: '_thumb' },
      }, {
        // thumbnail @2x
        width: 535 * 2,
        rename: { suffix: '_thumb@2x' },
      }, {
        width: 575,
        rename: { suffix: '_xs'}
      }, {
        width: 767,
        rename: {suffix: '_sm'}
      }, {
        width: 991,
        rename: { suffix: '_md' }
      }, {
        width: 1999,
        rename: { suffix: '_lg' }
      }, {
        // max-width hero
        width: 1920,
      }],
    }, {
      quality: 70,
      progressive: true,
      withMetadata: false,
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img/posts/'));
});
