/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

import io from './libraries/iolib.js'

let vals = {}

// 主要数据目录
vals.dataDir = "data"

// 配置目录
vals.configDir = vals.dataDir + "/config"

// 创建目录
io.mkdirs(vals.dataDir)
io.mkdirs(vals.configDir)
io.mkdirs(vals.dataDir + "/users")

// 生成服务端配置文件
io.open(vals.configDir + "/server.json", "w").checkExistsOrWriteJson({
    useHttps: false,
    port: 3601,
    bindAddress: "0.0.0.0",
    https: {
        key: "",
        cert: "",
    },
}).close()

// 生成客户端配置文件
io.open(vals.configDir + "/client_config.json", "w").checkExistsOrWriteJson({
    title: "铃之椅",
}).close()

/**
 * 服务端配置文件
 * @type { {useHttps: false,port: 3601,bindAddress: "0.0.0.0",https: {key: "",cert: ""}} }
 */
vals.serverConfig = io.open(vals.configDir + "/server.json", "r").readAllJsonAndClose()

export default vals
