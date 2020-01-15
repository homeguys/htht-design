const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const gulpif = require('gulp-if')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const through2 = require('through2')

function isJavaScript(file) {
  return file.extname === '.jsx'
}

function isCss(file) {
  const cssRegex = /\.(scss|sass|css)$/
  return cssRegex.test(file.extname)
}

function isStyleIndexJs(file) {
  return isJavaScript(file) && file.path.match(/(\/|\\)style(\/|\\)index\.jsx/)
}

// const componentPath = [
//   'src/components/**/demo/index.jsx',
//   'src/components/**/utils/*.jsx',
//   'src/components/index.jsx',
//   'src/components/**/demo/style/*'
// ]

const publishPath = [
  'src/publish/**/demo/index.jsx',
  'src/publish/**/utils/*.jsx',
  'src/publish/index.jsx',
  'src/publish/**/demo/style/*'
]

exports.default = () => {
  return src(publishPath)
    .pipe(
      gulpif(
        isStyleIndexJs,
        through2.obj(function(chunk, enc, callback) {
          let { contents } = chunk
          const copyChunk = chunk
          const bf = Buffer.from('import "./index.css";')
          contents = bf
          copyChunk.contents = contents
          this.push(copyChunk)
          callback()
        })
      )
    )
    .pipe(gulpif(isJavaScript, babel()))
    .pipe(gulpif(isJavaScript, uglify()))
    .pipe(gulpif(isCss, sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError)))
    .pipe(gulpif(isCss, autoprefixer()))
    .pipe(dest('lib/'))
}
