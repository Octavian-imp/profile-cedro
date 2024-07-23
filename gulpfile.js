const { src, dest, watch, parallel, series } = require("gulp");

//css imports
const tailwind = require("tailwindcss");
const postcss = require("gulp-postcss");
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
//images
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const svgSprite = require("gulp-svg-sprite");
const imagemin = require("gulp-imagemin");
//fonts
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
//utils
const uglify = require("gulp-uglify-es").default;
const include = require("gulp-file-include");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
//server & cache
const newer = require("gulp-newer");
const browserSync = require("browser-sync").create();

//include files
function pages() {
  return src("app/pages/*.html")
    .pipe(include())
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

//fonts
function fonts() {
  return src("app/assets/fonts/src/*.*")
    .pipe(fonter({ formats: ["woff", "ttf"] }))
    .pipe(src("app/assets/fonts/dist/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("app/assets/fonts/dist"));
}

//images
function images() {
  return (
    src(["app/assets/images/src/*.*", "!app/assets/images/src/*.svg"])
      //avif
      .pipe(newer("app/assets/images/dist"))
      .pipe(avif({ quality: 50 }))
      //webp
      .pipe(src("app/assets/images/src/*.*"))
      .pipe(newer("app/assets/images/dist"))
      .pipe(webp())
      //imagemin
      .pipe(src("app/assets/images/src/*.*"))
      .pipe(newer("app/assets/images/dist"))
      .pipe(imagemin())
      //deploy folder
      .pipe(dest("app/assets/images/dist"))
  );
}

function sprite() {
  return src("app/assets/images/dist/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("app/assets/images/dist"));
}

//scripts
function scripts() {
  return src(["app/js/*.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/minify/js"))
    .pipe(browserSync.stream());
}

//styles
function styles() {
  return src("app/scss/**/*.scss")
    .pipe(postcss([tailwind, autoprefixer]))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(dest("app/minify/css"))
    .pipe(browserSync.stream());
}

//server
function watcher() {
  watch(["app/assets/images/src/"], images);
  watch(["app/scss/*.scss"], styles);
  watch(["app/js/*.js"], scripts);
  watch(["app/components/**/*.html", "app/pages/**/*.html"], pages);
  watch([
    "app/*.html",
    "!app/js",
    "!app/scss",
    "!app/css",
    "!app/assets/images",
  ]).on("change", browserSync.reload);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

//build
function build() {
  return src(
    [
      "app/minify/css/style.min.css",
      "app/minify/js/**/*.min.js",
      "app/assets/images/dist/*.*",
      "!app/assets/images/dist/*.svg",
      "app/assets/images/dist/sprite.svg",
      "app/assets/fonts/dist/*.*",
      "app/*.html",
    ],
    {
      base: "app",
    }
  ).pipe(dest("build"));
}

function cleanBuild() {
  return src("build").pipe(clean());
}

exports.styles = styles;
exports.fonts = fonts;
exports.images = images;
exports.sprite = sprite;
exports.scripts = scripts;
exports.pages = pages;
exports.watcher = watcher;
exports.serve = serve;
exports.prebuild = series(styles, scripts, pages, images, fonts);
exports.build = series(cleanBuild, build);
exports.default = parallel(styles, scripts, pages, serve, watcher);
