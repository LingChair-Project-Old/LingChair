/**
 * 消息列表视图
 * @param { Object } prop 参数
 */
function ChatLayout(prop) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingTop: '10px',
            height: 'calc(var(--lingchair-window-height) - 26px)',
        }}>
            {prop ? prop.children : null}
        </div>
    )
}

/**
 * 一段消息
 * @param { Object } prop 参数
 * @param { String } prop.headImageUrl 头像链接
 * @param { String } prop.senderName 发送者名称
 * @param { String } prop.msg 消息
 */
ChatLayout.MsgView = function (prop) {
    const [headImageUrl, setHeadImageUrl] = React.useState(prop.headImageUrl)
    const [senderName, setSenderName] = React.useState(prop.senderName)
    const [msg, setMsg] = React.useState(prop.msg)
    const element = React.useRef(null)

    React.useEffect(() => {
        element.current.setHeadImageUrl = this.setHeadImageUrl
        element.current.setSenderName = this.setSenderName
        element.current.setMsg = this.setMsg
        return () => {
            delete element.current.setHeadImageUrl
            delete element.current.setSenderName
            delete element.current.setMsg
        }
    }, [])

    return (
        <mdui-card variant="filled" ref={element} style={{

        }}>{senderName}</mdui-card>
    )
}

/**
 * 一段系统消息
 * @param { Object } prop 参数
 * @param { String } prop.msg 内容
 */
ChatLayout.SystemMsgView = function (prop) {
    const [msg, setMsg] = React.useState(prop.msg)

    const element = React.useRef(null)

    React.useEffect(() => {
        element.current.setMsg = setMsg
        return () => {
            delete element.current.setMsg
        }
    }, [])

    return (
        <mdui-card variant="filled" ref={element} style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
        }}>{msg}</mdui-card>
    )
}

export default ChatLayout