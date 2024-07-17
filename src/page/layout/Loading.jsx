class Loading extends React.Component {
    render() {
        return (
            <div style={{
                width: 'calc(var(--lingchair-window-width))',
                height: 'calc(var(--lingchair-window-height))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <mdui-circular-progress></mdui-circular-progress>
            </div>
        )
    }
}

export default Loading
