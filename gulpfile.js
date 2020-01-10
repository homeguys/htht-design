const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const gulpif = require('gulp-if')

function isJavaScript(file) {
  // 判断文件的扩展名是否是 '.jsx'
  return file.extname === '.jsx'
}

function isCss(file) {
  // 判断文件的扩展名是否是 '.jsx'
  return file.extname === '.scss'
}

// eslint-disable-next-line func-names
exports.default = function() {
  return src(['src/components/**/demo/index.jsx', 'src/components/**/style/*'])
    .pipe(gulpif(isJavaScript, babel()))
    .pipe(gulpif(isCss, sass()))
    .pipe(dest('lib/'))
}
