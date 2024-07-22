import ChatContainer from './ChatContainer.js'
import ListItem from './ListItem.js'
import BottomBar from './BottomBar.js'
import { handleRecentClick } from '../DrawerListApi.js'

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

function MainPC() {
    let a = function () {
        updateChatLayoutWidth()
        window.removeEventListener('load', a)
    }
    window.addEventListener('load', a)
    return (
        <div id="app-inner" style={{
            fontFamily: '-apple-system, system-ui, -webkit-system-font',
        }}>
            <BottomBar value="recent" alignment="center" style={{
                height: 'calc(var(--lingchair-window-height) - 9px)',
            }}>
                <mdui-button-icon icon="menu" slot="top" onClick={() => openDrawer(true)}></mdui-button-icon>

                <BottomBar.Item icon="watch_later--outlined" onClick={() => openDrawer()} value="recent"></BottomBar.Item>
                <BottomBar.Item icon="contacts" onClick={() => openDrawer()} value="contects"></BottomBar.Item>
                <BottomBar.Item icon="group" onClick={() => openDrawer()} value="groups"></BottomBar.Item>

                <mdui-button-icon icon="settings" slot="bottom" onClick={function () {

                }}></mdui-button-icon>
            </BottomBar>

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
                        <ListItem
                            title="测试"
                            content="测试"
                            targetId="Test"
                            targetType="single"
                            errorImage="res/default_avatar.png"
                            imageAlt="测试的头像"
                            onClick={handleRecentClick} />
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
    )
}

export default MainPC
