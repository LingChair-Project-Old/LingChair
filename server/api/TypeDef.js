/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

module.exports.FriendTypeDef = {
    /**
     * 好友ID
     * @type { String }
     */
    id: '',
    /**
     * 添加此好友的时间戳
     * @type { Number }
     */
    addedTime: 0,
    /**
     * 好友昵称
     * @type { String }
     */
    nickName: '',
}

module.exports.GroupTypeDef = {
    /**
     * 群聊ID
     * @type { String }
     */
    id: '',
    /**
     * 创建此群时的时间戳
     * @type { Number }
     */
    createdTime: 0,
    /**
     * 群名称
     * @type { String }
     */
    name: '',
}

module.exports.MessageTypeDef = {
    /**
     * 消息内容
     * @type { String }
     */
    msg: '',
    /**
     * 发送者ID
     * @type { String }
     */
    senderId: '',
    /**
     * 消息类型(默认文本)
     * @type { String }
     */
    type: '',
    /**
     * 成功发送时的时间戳
     * @type { Number }
     */
    time: 0,
}
