const { src, dest, parallel } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function js(){
    return src('./src/js/main.js')
        .pipe(webpackStream({
            output:{
                filename:'bundle.js'
            },
            resolve:{
                extensions:['.js', '.json']
            },
            module:{
                rules:[
                    {
                        test:/\.(js)$/,
                        use:'babel-loader',
                        exclude:/(node_modules)/
                    }
                ]
            },
            mode:'production'
        },webpack))
        .pipe(dest('./app/static/js'))
}

function html(){
    return src('./src/public/index.html')
        .pipe(dest('./app'))
}

function css(){
    return src('./src/css/style.scss')
    .pipe(sass())
    .pipe(dest('./app/static/css'))
}

exports.js = js
exports.html = html
exports.css = css

exports.default = parallel([js, html, css])
