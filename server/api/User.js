/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

const io = require('../core/io')

const vals = require("../core/vals")

let FriendTypeDef = {
    /**
     * 好友ID
     * @type { String }
     */
    id,
    /**
     * 添加此好友的时间戳
     * @type { Number }
     */
    addedTime,
    /**
     * 好友昵称
     * @type { String }
     */
    nickName,
}

let GroupTypeDef = {
    /**
     * 群聊ID
     * @type { String }
     */
    id,
    /**
     * 创建此群时的时间戳
     * @type { Number }
     */
    createdTime,
    /**
     * 群名称
     * @type { String }
     */
    name,
}

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
        this.userConfigFile = User.openUserConfigFile(id)
    }
    /**
     * 获取用户主配置文件
     * @param { String } id 
     * @returns { io }
     */
    static openUserConfigFile(id) {
        return io.open(this.getDataPath() + "/user.json", "rw")
    }
    /**
     * 某个用户是否存在
     * @param { String } id 用户ID
     * @returns { Boolean } 用户是否存在
     */
    static exists(id) {
        return io.exists(this.getDataPath(id))
    }
    /**
     * 此用户是否存在
     * @returns { Boolean } 用户是否存在
     */
    exists() {
        return User.exists(this.id)
    }
    /**
     * 获取某个账号使用的数据目录
     * @param { String } id 用户ID
     * @returns { String } 数据目录
     */
    static getDataPath(id) {
        return vals.LINGCHAIR_DATA_DIR + "/users/" + id
    }
    /**
     * 获取此账号使用的数据目录
     * @returns { String } 数据目录
     */
    getDataPath() {
        return User.getDataPath(this.id)
    }
    /**
     * 获取此账号的密码
     * @returns { String } 密码
     * @description 注意: 非明文, 是经过哈希运算的
     */
    getPassword() {
        return this.userConfigFile.readAllJson().passwd
    }
    /**
     * 设置头像
     * @param { Buffer } bin 图片数据
     */
    setAvatarImage(bin) {
        io.open(this.getDataPath() + "/avatar", "w").writeAll(head).close()
    }
    /**
     * 设置用户昵称
     * @param { String } nick 
     */
    setNickName(nick) {
        let configIo = this.userConfigFile

        let config = configIo.readAllJson()
        config.nickName = nick
        configIo.writeAllJson(config)
    }
    /**
     * 获取某用户昵称
     * @param { String } id 用户ID
     * @returns { String } 用户昵称
     */
    static getNickName(id) {
        return User.openUserConfigFile(id).readAllJsonAndClose().nickName
    }
    /**
     * 获取用户昵称
     * @returns { String } 用户昵称
     */
    getNickName() {
        return this.userConfigFile.readAllJson().nickName
    }
    /**
     * 
     * @returns { contacts } 群聊和好友列表
     */
    getContacts() {
        let contacts = {
            /**
             * 好友列表
             * @type { FriendTypeDef[] }
             */
            friends: io.open(this.getDataPath() + '/friends.json', 'rw').readAllJsonAndClose(),
            /**
             * 群聊列表
             * @type { GroupTypeDef[] }
             */
            groups: io.open(this.getDataPath() + '/groups.json', 'rw').readAllJsonAndClose()
        }
        return contacts
    }
}
