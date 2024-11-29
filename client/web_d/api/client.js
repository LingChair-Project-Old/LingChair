/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

/**
 * 获取当前令牌
 * @returns { String } accessToken
 */
function getCurrentToken() {
    return data.current_token
}

class Client {
    static io
    /**
     * 初始化
     * @param { String } addr
     * @param { {transports: [], path: "", auth: {}} } options
     */
    static setup(addr, options) {
        if (this.io)
            this.io.disconnect()

        this.io = io(addr, options)
    }
    /**
     * 提交事件
     * @param { String } event
     * @param { Object } args
     * @param { Number } [timeout]
     * @returns { Promise<Object> } response
     */
    static emit(event, args, timeout) {
        return new Promise((res, rej) => {
            let a = this.io
            if (timeout) a = a.timeout(timeout * 1000)
            a.emit(event, args, (err, re) => {
                if (err) rej(err)
                res(re)
            })
        })
    }
    /**
     * 接收事件
     * @param { String } eventName
     * @param { Function<Object, Function<Object>> } callback
     */
    static on(eventName, callback) {
        this.io.on(eventName, (arg, call) => {
            callback(arg, call)
        })
    }
}

window.Client = Client

class RemoteUser {
    constructor(id) {
        this.id = id
    }
    static asAPI(id) {
        return new RemoteUser(id)
    }
    async signUp({ nickName, password }) {
        try {
            return await Client.emit('lingchair.user.signUp', {
                id: this.id,
                password: password,
                nickName: nickName,
            }, 4)
        } catch (e) {
            return { code: -4, msg: e }
        }
    }
    async signIn({ password }) {
        try {
            return await Client.emit('lingchair.user.signIn', {
                id: this.id,
                password: password,
            }, 4)
        } catch (e) {
            return { code: -4, msg: e }
        }
    }
    async getNewerToken() {
        try {
            return await Client.emit('lingchair.user.getNewerToken', {
                id: this.id,
                accessToken: getCurrentToken(),
            }, 4)
        } catch (e) {
            return { code: -4, msg: e }
        }
    }
    async checkToken() {
        try {
            return await Client.emit('lingchair.user.checkToken', {
                id: this.id,
                accessToken: getCurrentToken(),
            }, 4)
        } catch (e) {
            return { code: -4, msg: e }
        }
    }
}

window.RemoteUser = RemoteUser
