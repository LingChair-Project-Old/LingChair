const babel = require("@babel/core")
const io = require('./io')
const CleanCSS = require('clean-css')
const uglify = require('uglify-js')
const logger = require('./logger')

function compileJs(path) {
    if (path.endsWith('.min.js'))
        return io.open(path, 'r').pipe(io.open(path, 'w')).close()
    babel.transformFileAsync(path, {
        presets: [
            [
                "@babel/preset-env",
                {
                    modules: false,
                },
            ],
            "@babel/preset-react",
        ],
        targets: {
            chrome: "67",
            android: "67",
        },
    }).then(function (result) {
        let code = result.code
        io.open(path, 'w').writeAll(uglify.minify(code, {
            compress: true,
            mangle: {
                eval: true,
                toplevel: true,
                reserved: [
                    '$',
                    'require',
                    'exports',
                    'module',
                    'import',
                    'from',
                ],
            }
        }).code).close()
        logger.info(`Compile js: ${path}`)
    })
}

function compileCss(path) {
    new CleanCSS({}).minify(io.open(path, 'r').readAllAndClose(), function (err, out) {
        if (err) return logger.error(err)
        io.open(path, 'w').writeAll(out.styles).close()
        logger.info(`Compile css: ${path}`)
    })
}

module.exports = function(path) {
    io.listFiles(path, null, true).forEach(function(v) {
        if (v.endsWith('.js'))
            compileJs(v)
        else if (v.endsWith('.jsx')) {
            let v2 = `${io.getParent(v)}//${io.getName(v).replace(/\.jsx/, '.js')}`
            io.move(v, v2)
            compileJs(v2)
        } else if (v.endsWith('.css'))
            compileCss(v)
    })
}
