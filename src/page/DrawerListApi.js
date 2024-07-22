import { changeChatLayout, getCurrentChatLayout } from "./ChatContainerApi.js"

/**
 * 最近聊天点击事件
 * @param { Object } e 事件对象
 * @param { Element } e.target 触发的元素
 */
function handleRecentClick(e) {
    let a = e.target
    let id = a.targetId
    let type = a.targetType

    changeChatLayout(`lc_${type}_${id}`)
    console.log(getCurrentChatLayout() .reactRef)
}

export {
    handleRecentClick,
}
