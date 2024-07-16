import { showErrorImage } from '../utils.js'
import ChatLayout from './ChatLayout.js'

function openDrawer(toggle) {
    let i = $('mdui-navigation-drawer[placement=left]').get(0)
    if (toggle)
        i.open = !i.open
    else
        i.open = true
}

class Main extends React.Component {
    render() {
        return (
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

                    <mdui-button-icon icon="settings" slot="bottom" onClick={function() {
                        
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
                        <mdui-list  style={{
                            height: 'calc(var(--lingchair-window-height) - 9px)',
                        }}>
                            <mdui-list-item alignment="center" description="Text" rounded style={{
                                width: '100%',
                            }}>
                                Title
                                <mdui-avatar slot="icon" src="res/default_avatar.png" onerror="showErrorImage('res/default_avatar.png', '默认头像')"></mdui-avatar>
                            </mdui-list-item>
                        </mdui-list>
                    </mdui-navigation-drawer>

                    <ChatLayout />
                </div>
            </div >
        )
    }
}

export default Main
