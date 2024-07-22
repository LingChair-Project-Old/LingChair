/**
 * 获取当前聊天页面
 * @returns { Element } element 页面对象
 */
function getCurrentChatLayout() {
    return $('#ChatContainer').get(0).getLayout()
}

/**
 * 切换到某个聊天页面
 * @param { String } id 唯一ID
 */
function changeChatLayout(id) {
    $('#ChatContainer').get(0).changeLayout(id)
}

export {
    getCurrentChatLayout,
    changeChatLayout,
}
