import User from "../api/User.js"
import { showErrorImage } from "../utils.js"

/**
 * 消息列表视图
 * @param { Object } prop 参数
 */
function ChatLayout(prop = {}) {
    const element = React.useRef(null)
    const [list, setList] = React.useState([])

    /**
     * 映射 添加一条消息
     * @param { Object } obj 参数
     * @param { String } obj.msg 消息内容
     * @param { String } obj.senderName 发送者名称
     * @param { String } obj.senderId 发送者ID
     * @param { String } obj.senderImage 发送者头像图片链接
     */
    function addMsg(obj) {
        obj.type = "normal"
        let l = [...list]
        l.push(obj)
        setList(l)
    }

    /**
     * 映射 添加一条系统消息
     * @param { String } msg 消息内容
     */
    function addSystemMsg(msg) {
        let obj = { msg: msg, type: "system" }
        let l = [...list]
        l.push(obj)
        setList(l)
    }

    React.useEffect(() => {
        element.current.addMsg = addMsg
        element.current.addSystemMsg = addSystemMsg
        return () => {
            delete element.current.addMsg
            delete element.current.addSystemMsg
        }
    })

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingTop: '10px',
            // height: 'calc(var(--lingchair-window-height) - 26px)', // 暂时移除: 加了会导致页面无法滑动
        }} ref={element}>
            {prop ? prop.children : null}
            {list.map((item, _index) => item.type == "system" ? (
                <ChatLayout.SystemMsgView
                    msg={item.msg} />
            ) : (
                <ChatLayout.MsgView
                    headImage={item.headImage}
                    msg={item.msg}
                    senderName={item.senderName}
                    senderId={item.senderId} />
            ))}
        </div>
    )
}

/**
 * 一段消息
 * @param { Object } prop 参数
 * @param { String } prop.headImage 头像链接
 * @param { String } prop.senderName 发送者名称
 * @param { String } prop.senderId 发送者唯一ID
 * @param { String } prop.msg 消息
 */
ChatLayout.MsgView = function (prop) {
    const [headImageUrl, setHeadImage] = React.useState(prop.headImage)
    const [senderName, setSenderName] = React.useState(prop.senderName)
    const [senderId, setSenderId] = React.useState(prop.senderId)
    const [msg, setMsg] = React.useState(prop.msg)
    const element = React.useRef(null)

    React.useEffect(() => {
        element.current.setHeadImage = setHeadImage
        element.current.setSenderName = setSenderName
        element.current.setSenderId = setSenderId
        element.current.setMsg = setMsg
        return () => {
            delete element.current.setHeadImage
            delete element.current.setSenderName
            delete element.current.setMsg
            delete element.current.setSenderId
        }
    }, [])

    console.log(User.myId,senderId,prop)

    let _senderName = <span style={{ alignSelf: 'center' }}>{senderName}</span>
    let _senderImage = <mdui-avatar
        src={headImageUrl ? headImageUrl : '../res/default_avatar.png'}
        onError={() => showErrorImage('../res/default_avatar.png', senderName + ' 的头像')}
        style={{
            width: '50px',
            height: '50px',
            margin: '15px',
        }}>{senderName.substring(0, 1)}</mdui-avatar>

    return (
        <div ref={element} style={{
            width: '99%',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: User.myId == senderId ? 'flex-end' : 'flex-start',
            }}>
                {User.myId == senderId ? <>{_senderName}{_senderImage}</> : <>{_senderImage}{_senderName}</>}
            </div>
            <mdui-card style={{
                width: '80%',
                [User.myId == senderId ? 'marginRight' : 'marginLeft']: '55px',
                marginTop: '-5px',
                padding: '20px',
                alignSelf: User.myId == senderId ? 'flex-end' : 'flex-start',
            }}>{msg}</mdui-card>
        </div>
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