import Loading from './Loading.js'
import ChatContainer from './ChatContainer.js'

function updateChatLayoutWidth() {
    let c = $('#ChatContainer')
    let left = c.get(0).getBoundingClientRect().left
    c.css('width', `calc(var(--lingchair-window-width) - ${left - window.innerWidth}px)`)
}

function openDrawer(toggle) {
    let i = $('mdui-navigation-drawer[placement=left]').get(0)
    if (toggle)
        i.open = !i.open
    else
        i.open = true

    if (i.open)
        $('#divider').css('marginLeft', '10px')
    else
        $('#divider').css('marginLeft', '-8px')
    
    updateChatLayoutWidth()
}

function Main() {
    let a = function() {
        updateChatLayoutWidth()
        window.removeEventListener(a)
    }
    window.addEventListener('load', a)
    return (
        <React.Suspense fallback={<Loading />}>
            <div id="app-inner" style={{
                fontFamily: '-apple-system, system-ui, -webkit-system-font',
            }}>
                <mdui-navigation-rail value="recent" alignment="center" style={{
                    height: 'calc(var(--lingchair-window-height) - 9px)',
                }}>
                    <mdui-button-icon icon="menu" slot="top" onClick={() => openDrawer(true)}></mdui-button-icon>

                    <mdui-navigation-rail-item icon="watch_later--outlined" onClick={() => openDrawer()} value="recent"></mdui-navigation-rail-item>
                    <mdui-navigation-rail-item icon="contacts" onClick={() => openDrawer()} value="contects"></mdui-navigation-rail-item>
                    <mdui-navigation-rail-item icon="group" onClick={() => openDrawer()} value="groups"></mdui-navigation-rail-item>

                    <mdui-button-icon icon="settings" slot="bottom" onClick={function () {

                    }}></mdui-button-icon>
                </mdui-navigation-rail>

                <div style={{
                    position: 'relative',
                    paddingLeft: 'inhert'
                }}>
                    <mdui-navigation-drawer contained placement="left" close-on-overlay-click open style={{
                        height: 'calc(var(--lingchair-window-height) - 9px)',
                        width: '22%',
                    }}>
                        <mdui-list style={{
                            height: 'calc(var(--lingchair-window-height) - 9px)',
                        }}>
                            <mdui-list-subheader>Subheader</mdui-list-subheader>
                            <mdui-list-item alignment="center" description="Text" rounded style={{
                                width: '100%',
                            }}>

                                Title
                                <mdui-avatar slot="icon" src="res/default_avatar.png" onerror="showErrorImage('res/default_avatar.png', '默认头像')"></mdui-avatar>
                            </mdui-list-item>
                        </mdui-list>
                    </mdui-navigation-drawer>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <mdui-divider id='divider' vertical style={{
                            height: 'calc(var(--lingchair-window-height) - 16px)',
                            marginLeft: '10px',
                        }}></mdui-divider>
                        <ChatContainer id='ChatContainer' />
                    </div>
                </div>
            </div >
        </React.Suspense>
    )
}

export default Main
