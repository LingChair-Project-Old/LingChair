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
import process from 'node:process'

import User from './api/User.js'

import vals from './vals.js'

import { log, loge, logw } from './libraries/log.js'
import UserAuth from './api/UserAuth.js'

/**
 * 检查成员参数是否全部存在
 * @param { Object } object 
 * @param { Array<String> } attrs 
 * @returns { Boolean } allExists
 */
function checkArgv(object, attrs) {
    for (const k of Object.keys(object)) {
        if (!attrs.includes(k) || attrs[k] == '')
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
    return { msg: reason, code: 5 }
}

/**
 * 返回一个无效令牌数据
 * @returns { Object } 数据
 */
function returnToken401Api() {
    return { msg: '令牌无效', code: -401 }
}

const app = express()

app.use('/', express.static('./client/web/'))

app.get('/client_config.json', (req, res) => {
    res.sendFile(vals.configDir + "/client_config.json", { root: process.cwd() })
})

const httpServer = vals.serverConfig.useHttps ? https.createServer(vals.serverConfig.https, app) : http.createServer(app)

const io = new SocketIo.Server(httpServer, {})

/**
 * 生成一个嵌套函数保障正确的参数调用
 * @param { SocketIo.Socket } client
 * @param { Object } funcList
 * @returns { Function } on事件监听函数
 */
function registerCallbacks(client, funcList) {
    /* for (let )
 */
    for (let i of funcList) {
        const func = i[1]
        const funcName = i[0]

        client.on(funcName, (...args) => {
            const cb = args[args.length - 1]
            const arg = args[0]

            try {
                if (arg instanceof Object) {
                    const re = func(arg)
                    log(`客户端 ${client.handshake.address} 请求 [${funcName}] with args ${JSON.stringify(arg).substring(0, 300)}, returned ${JSON.stringify(re).substring(0, 300)}`)
                    cb(re)
                } else
                    logw(`客户端 ${client.handshake.address} 对 [${funcName}] 进行无效请求`)
            } catch (e) {
                loge(e)
                cb(returnErrorApi(e + ""))
            }
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
            (_arg) => ({ msg: "success", code: 0 }),
        ],
        /** =================================================
         *                        用户
         * ================================================== */
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
            function (arg) {
                if (!checkArgv(arg, ['id', 'password'])) return returnErrorApi("参数缺失")

                let usr = new User(arg.id)

                if (!usr.exists()) return returnErrorApi('用户不存在')
                if (!usr.compareWithPassword(arg.password)) return returnErrorApi('密码错误')

                return {
                    msg: 'sucess',
                    code: 0,
                    accessToken: UserAuth.getAccessToken(arg.id)
                }
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
            function (arg) {
                if (!checkArgv(arg, ['id', 'password'])) return returnErrorApi("参数缺失")

                let u = new User(arg.id)
                if (u.exists()) return returnErrorApi('用户已存在')
                u.register({
                    nickName: arg.nickName,
                    password: arg.password,
                })

                return {
                    msg: 'success',
                    code: 0,
                }
            }
        ],
        /**
         * 获取更新的令牌
         */
        [
            "lingchair.user.getNewerToken",
            /**
             * 获取更新的令牌
             * @param { Object } arg
             * @param { String } arg.id 用户ID
             * @param { String } arg.accessToken 用户令牌
             * @returns { Object } successOrFailure
             */
            function (arg) {
                if (!checkArgv(arg, ['id', 'accessToken'])) return returnErrorApi("参数缺失")

                if (!UserAuth.checkAvailable(arg.id, arg.accessToken)) return returnToken401Api()

                return {
                    msg: 'success',
                    code: 0,
                    accessToken: UserAuth.makeNewerToken(arg.id, arg.accessToken)
                }
            }
        ],
        /**
         * 检测令牌状态
         */
        [
            "lingchair.user.checkToken",
            /**
             * 获取更新的令牌
             * @param { Object } arg
             * @param { String } arg.id 用户ID
             * @param { String } arg.accessToken 用户令牌
             * @returns { Object } successOrFailure
             */
            function (arg) {
                if (!checkArgv(arg, ['id', 'accessToken'])) return returnErrorApi("参数缺失")

                let u = new User(arg.id)

                return {
                    msg: 'success',
                    code: 0,
                    status: UserAuth.checkAvailable(arg.id, arg.accessToken),
                }
            }
        ]
    ])

    client.on('disconnect', () => {
        log(`客户端 ${client.handshake.address} 已断开`)
    })
})

export { app as expressApp, httpServer, SocketIo as io }
