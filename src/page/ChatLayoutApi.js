import { getCurrentChatLayout } from "./ChatContainerApi"

/**
 * 添加一条消息
 * @param { Object } obj 参数
 * @param { String } obj.msg 消息内容
 * @param { String } obj.senderName 发送者名称
 * @param { String } obj.senderId 发送者ID
 * @param { String } obj.senderImage 发送者头像图片链接
 */
function addMsg(obj) {
    let e = getCurrentChatLayout()
    $(e).appendTo(e)
}

export {
    addMsg,
}