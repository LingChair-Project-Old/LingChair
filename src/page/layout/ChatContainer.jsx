import ChatLayout from "./ChatLayout.js"

/**
 * 聊天页面框架
 */
function ChatContainer(prop = {}) {
    const element = React.useRef(null)
    const [contentView, setContentView] = React.useState(
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(var(--lingchair-window-height) - 16px)',
        }}>
            <span>选择联系人以开始对话</span>
        </div>
    )

    const layouts = {}

    /**
     * 切换页面
     * @param {String} id 欲切换到的页面唯一ID
     */
    function changeLayout(id) {
        if (!layouts[id])
            layouts[id] = <ChatLayout />

        setContentView(layouts[id])
    }

    React.useEffect(() => {
        element.current.changeLayout = changeLayout
        element.current.getLayout = () => element.current.childNodes[0]
        return () => {
            delete element.current.changeLayout
        }
    }, [])

    return (
        <div style={{ width: '100%', /* Flex布局可以直接用百分比 爽了~ */ }} {...prop} ref={element}>{contentView}</div>
    )
}

export default ChatContainer
