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

/**
 * 检查成员参数是否全部存在
 * @param { Object } object 
 * @param { Array<String> } attrs 
 * @returns { Boolean } allExists
 */
function checkArgv(object, attrs) {
    for (const k of Object.keys(object)) {
        if (!attrs.includes(attrs))
            return false
    }
    return true
}

/**
 * 返回一个错误数据
 * @param { String } reason 
 * @returns { Object } 数据
 */
function returnErrorApi(reason) {
    return { msg: reason, code: -1 }
}

const app = express()

app.use('/', express.static('./client/web/'))

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
        /**
         * 通讯检测
         */
        [
            "lingchair.ping",
            (_arg) => ({ msg: "success", code: 0}) ,
        ],
        /**
         * 用户登录
         */
        [
            "lingchair.user.signIn",
            /**
             * 登录
             * @param { Object } arg
             * @param { String } arg.id 用户ID
             * @param { String } arg.password 用户密码
             * @returns { Object } successOrFailure
             */
            function(arg) {
                if (!checkArgv(argv, ['id', 'password'])) return returnErrorApi("参数缺失")

                
            }
        ],
        /**
         * 用户注册
         */
         [
            "lingchair.user.signUp",
            /**
             * 注册
             * @param { Object } arg
             * @param { String } arg.id 用户ID
             * @param { String } arg.password 用户密码
             * @param { String } [arg.nickName] 用户昵称
             * @returns { Object } successOrFailure
             */
            function(arg) {
                if (!checkArgv(arg, ['id', 'password'])) return returnErrorApi("参数缺失")

                let u = new User(arg.id)
                u.register(arg.nickName, arg.password)

                return {
                    msg: 'success',
                    code: 0,
                }
            }
        ]
    ])

    client.on('disconnect', () => {
        log(`客户端 ${client.handshake.address} 已断开`)
    })
})

export { app as expressApp, httpServer, SocketIo as io }
