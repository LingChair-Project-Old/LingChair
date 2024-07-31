const child_process = require('node:child_process')
const logger = require('./src/logger')
const io = require('./src/io')
const { lingChairConfig } = require('./src/config')
const babel = require("@babel/core")

function fork(a) {
    let isWindows = process.platform == 'win32'
    let c = child_process.fork(a, {
        silent: isWindows ? true : false,
    })
    if (!isWindows) return c
    // 完美解决 Windows 下控制台日志乱码
    c.stdout.setEncoding('utf8')
    c.stdout.on('data', function (data) {
        console.log(data.toString().trim())
    })
    return c
}

// 清理编译所得文件
if (process.argv.includes("--clear-http")) {
    io.remove(lingChairConfig.http.pathName)
}

// (编译/复制文件并)运行服务
if (process.argv.includes("--build") || !io.exists(lingChairConfig.http.pathName))
    if (process.argv.includes("--skip-compile")) {
        logger.info('正在复制网页运行时所需文件!')
        io.copyDir('./src/page', lingChairConfig.http.pathName)
        logger.info('编译.jsx...')
        io.listFiles(lingChairConfig.http.pathName, null, true).forEach(function(v) {
            if (v.endsWith('.jsx')) {
            let v2 = `${io.getParent(v)}//${io.getName(v).replace(/\.jsx/, '.js')}`
            io.move(v, v2)
            babel.transformFileAsync(v2, {
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
                io.open(v2, 'w').writeAll(code).close()
                logger.info(`Compile jsx: ${v2}`)
            })
        }
    })
        fork('./src/starter.js')
    } else fork('./src/builder.js').once('exit', (code) => {
        if (code != 0) {
            logger.error(`构建网页失败! 请查看日志寻找原因, 若多次无法解决请寻找他人解决`)
            process.exit(1)
        }
        fork('./src/starter.js')
    })
else
    fork('./src/starter.js')
