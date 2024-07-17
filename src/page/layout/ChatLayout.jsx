class ChatLayout extends React.Component {
    static MsgView = class extends React.Component {
        render(prop) {
            const { headImage, senderName, extra } = prop ? prop : {}
            return (
                <mdui-card variant="filled" style="width: 200px;height: 124px">{ senderName }</mdui-card>
            )
        }
    }
    render(prop) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}>
                { prop ? prop.children : null }
            </div>
        )
    }
}

export default ChatLayout