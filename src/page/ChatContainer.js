function getCurrentChatLayout() {
    return $('#ChatContainer').get(0).getLayout()
}

function setChatLayout() {
    return $('#ChatContainer').get(0).changeLayout()
}

export {
    getCurrentChatLayout,
}
