/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

import io from '../core/iolib.js'

import vals from "../core/vals.js"
import { GroupTypeDef, FriendTypeDef, MessageTypeDef } from './TypeDef.js'
import MessageList from './MessageList.js'

export default class User {
    // ==================================================
    //                     构造函数
    // ==================================================

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
        return io.open(this.getDataPath(id) + "/user.json", "rw")
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

    // ==================================================
    //                     账号安全
    // ==================================================

    /**
     * 注册用户配置
     * @param { Object } param
     * @param { String } param.nickName 昵称
     * @param { String } param.passwd 客户端加密后的密码
     */
    register({nickName, passwd}) {
        io.mkdirs(this.getDataPath())

        this.userConfigFile.checkExistsOrWriteJson({
            id: this.id,
        }).writeAllJson({
            passwd: passwd,
            nickName: nickName,
        })
    }

    /**
     * 获取此账号的密码
     * @returns { String } 密码
     */
    getPassword() {
        return this.userConfigFile.readAllJson().passwd
    }

    // ==================================================
    //                     账号资料
    // ==================================================

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

    // ==================================================
    //                     联系人相关
    // ==================================================

    /**
     * 获取联系人列表
     * @returns { contacts } 群聊和好友列表
     */
    getContacts() {
        let contacts = {
            /**
             * 好友列表
             * @type { FriendTypeDef[] }
             */
            friends: io.open(this.getDataPath() + '/friends.json', 'rw').checkExistsOrWriteJson([]).readAllJsonAndClose(),
            /**
             * 群聊列表
             * @type { GroupTypeDef[] }
             */
            groups: io.open(this.getDataPath() + '/groups.json', 'rw').checkExistsOrWriteJson([]).readAllJsonAndClose(),
        }
        return contacts
    }

    // ==================================================
    //                     消息功能
    // ==================================================

    /**
     * 向某人发送消息
     * @param { String | User } user 用户
     * @param { MessageTypeDef } msg 消息
     */
    sendToUser(user, msg) {
        if (!user instanceof User) user = new User(user)

        let m = MessageList.fromSingle(this, user)

        msg.senderId = user.id

        m.append(msg)
    }

    /**
     * 获取与某人的消息记录
     * @param { String | User } user 用户
     * @param { Object } param
     * @param { Number } param.limit 获取数量
     * @param { Number } param.offset 获取偏移
     * @returns { MessageTypeDef[] } 消息列表
     */
    getMessageHistroyOfUser(user, param = {}) {
        if (!user instanceof User) user = new User(user)

        return MessageList.fromSingle(this, user).getHistroy(param)
    }
}
