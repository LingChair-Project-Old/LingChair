/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

const io = require('../core/iolib')

const vals = require("../core/vals")

const Group = require('./Group')
const User = require('./User')

const { MessageTypeDef } = require('./TypeDef')

module.exports = class MessageList {
    // ==================================================
    //                     构造函数
    // ==================================================

    /**
     * 构造函数
     * @param { String } id 消息列表ID
     */
    constructor(id) {
        this.id = id
        io.mkdirs(this.getDataPath())
    }
    /**
     * 创建群聊的实例
     * @param { Group } group 
     * @returns { MessageList }
     */
    static fromGroup(group) {
        return new MessageList(group.id)
    }
    /**
     * 创建私聊的实例
     * @param { User } a 
     * @param { User } b 
     * @returns { MessageList }
     */
    static fromSingle(a, b) {
        return new MessageList([a.id, b.id].sort().join(''))
    }
    /**
     * 获取消息列表文件夹目录
     * @returns { String } path
     */
     getDataPath() {
        return MessageList.getDataPath(this.id)
    }
    /**
     * 获取消息列表文件夹目录
     * @param { String } id 
     * @returns { String } path
     */
    static getDataPath(id) {
        return vals.LINGCHAIR_DATA_DIR + "/messages/" + id
    }

    // ==================================================
    //                     消息功能
    // ==================================================

    /**
     * 添加一条消息到列表
     * @param { Object } args
     * @param { String } args.senderId 消息发送者
     * @param { String } args.msg 消息内容
     * @param { String } args.type 消息类型(默认文字)
     */
    append({ msg, type, senderId }) {
        const countFile = io.open(this.getDataPath() + '/count', 'rw').checkExistsOrWrite(0)
        let count = parseInt(countFile.readAll())
        count++

        io.open(this.getDataPath() + '/msg' + count, 'w').writeAllJson({
            senderId: senderId,
            msg: msg,
            type: type,
            time: Date.now(),
        }).close()

        countFile.writeAll(count).close()
    }
    /**
     * 从最新开始, 获取历史消息
     * @param { Object } param 
     * @param { Number } param.limit 获取数量
     * @param { Number } param.offset 获取偏移
     * @returns { MessageTypeDef[] } 消息列表
     */
    getHistroy({ limit = 13, offset = 0 }) {
        const countFile = io.open(this.getDataPath() + '/count', 'rw').checkExistsOrWrite(0)
        let count = parseInt(countFile.readAll()) - offset

        /**
         * @type { MessageTypeDef[] }
         */
        let histroy = []

        if (count >= 1)
            do {
                histroy.unshift(io.open(this.getDataPath() + '/msg' + count, 'r').readAllJsonAndClose())
                count--
                limit--
            } while (count > 0 || limit > 0)

        return histroy
    }
}
