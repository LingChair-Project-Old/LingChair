function onResize() {
    document.body.style.setProperty('--lingchair-window-width', window.innerWidth + "px")
    document.body.style.setProperty('--lingchair-window-height', window.innerHeight + "px")
}
onResize()
window.addEventListener('resize', onResize)

window.test = async function () {
    let getCurrentChatLayout = (await requireES6('./ChatContainerApi.js')).getCurrentChatLayout
    getCurrentChatLayout().addMsg({
        msg: "元神启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动启动",
        senderName: "测试",
        senderId: "Test",
        senderImage: "",
    })
}
