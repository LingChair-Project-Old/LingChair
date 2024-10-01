/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

import express from 'express'
import * as SocketIo from 'socket.io'
import http from 'node:http'
import https from 'node:https'

import User from './api/User.js'

import vals from './vals.js'

import { log, loge, logw } from './libraries/log.js'

const app = express()

app.use('/', express.static('./client/web/'))

const app = express()

app.put('/lingchair/user/:userId/username', (req, res) => {
    req.params.userId - req.headers['LingChair-Auth']
})

const httpServer = vals.LINGCHAIR_SERVER_CONFIG.useHttps ? https.createServer(vals.LINGCHAIR_SERVER_CONFIG.https, app) : http.createServer(app)

const io = new SocketIo.Server(httpServer, {})

/**
 * 生成一个嵌套函数保障正确的参数调用
 * @param { SocketIo.Socket } client
 * @param { [[String, Function<Object>]] } funcList
 * @returns { Function } on事件监听函数
 */
function registerCallbacks(client, funcList) {
    for (let i of funcList) {
        const func = i[1]
        const funcName = i[0]

        client.on(funcName, (...args) => {
            const cb = args[args.length - 1]
            const arg = args[0]

            if (arg instanceof Object) {
                const re = func(arg)
                log(`客户端 ${client.handshake.address} 请求 [${funcName}] with args ${JSON.stringify(arg).substring(0, 100)}`)
                cb(re)
            } else
                logw(`客户端 ${client.handshake.address} 对 [${funcName}] 进行无效请求`)
        })
    }
}

io.on('connection', (client) => {
    log(`客户端 ${client.handshake.address} 已连接`)

    registerCallbacks(client, [
        [
            "lingchair.ping",
            (_arg) => ({ msg: "success", code: 0}) ,
        ],
    ])

    client.on('disconnect', () => {
        log(`客户端 ${client.handshake.address} 已断开`)
    })
})

export { app as expressApp, httpServer, SocketIo as io }
