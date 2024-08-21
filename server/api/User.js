/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

const io = require('../core/iolib')

const vals = require("./val")

class User {
    /**
     * 构造函数
     * @param { String } id 用户ID
     */
    constructor(id) {
        /**
         * 用户ID
         * @type { String }
         */
        this.id = id
    }
    /**
     * 某个用户是否存在
     * @param { String } id 用户ID
     */
    static exists(id) {
        io.exists(getUserPath(name))
    }
    /**
     * 此用户是否存在
     */
    exists() {
        return User.exists(this.id)
    }
    /**
     * 获取某个账号使用的数据目录
     */
    static getDataPath(id) {
        return vals.LINGCHAIR_DATA_DIR + "/users/" + id
    }
    /**
     * 获取此账号使用的数据目录
     */
    getDataPath() {
        return User.getDataPath(this.id)
    }
    /**
     * 获取此账号的密码
     * @description 注意: 非明文, 是经过哈希运算的
     */
    getPassword() {
        return io.open(getUserPath(name) + "/user.json").readJson().passwd
    }
}
